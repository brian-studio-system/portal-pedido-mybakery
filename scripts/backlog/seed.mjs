#!/usr/bin/env node
/**
 * Crea el backlog de My Bakery en GitHub:
 * historias (issues padre) + tareas (sub-issues) + Project + campos + hitos.
 *
 * Uso:
 *   node scripts/backlog/seed.mjs --dry-run
 *   node scripts/backlog/seed.mjs --limit 1
 *   node scripts/backlog/seed.mjs
 *
 * Requiere: gh autenticado con scopes repo y project.
 */

import { execFileSync } from 'node:child_process';
import { backlog } from './backlog.mjs';

const OWNER = 'brian-studio-system';
const REPO = `${OWNER}/portal-pedido-mybakery`;
const PROJECT = '1';

const neededLabels = new Set();
for (const story of backlog) {
  for (const label of story.labels) neededLabels.add(label);
  for (const child of story.children) for (const label of child.labels) neededLabels.add(label);
}

const ensureLabels = () => {
  const raw = gh(['label', 'list', '--repo', REPO, '--limit', '200', '--json', 'name']);
  const existing = new Set(JSON.parse(raw).map((label) => label.name));
  for (const name of neededLabels) {
    if (!existing.has(name)) {
      gh(['label', 'create', name, '--repo', REPO, '--color', 'ededed', '--description', 'Creada por el seeder']);
      console.log(`+ label ${name}`);
    }
  }
};

const existing = new Map();
const loadExisting = () => {
  const raw = gh(['issue', 'list', '--repo', REPO, '--state', 'all', '--limit', '500', '--json', 'number,title']);
  for (const issue of JSON.parse(raw)) existing.set(issue.title, issue.number);
};

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const limitArg = args.indexOf('--limit');
const limit = limitArg >= 0 ? Number(args[limitArg + 1]) : Infinity;

const gh = (argv) =>
  execFileSync('gh', argv, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();

const tryGh = (argv) => {
  try {
    return gh(argv);
  } catch (error) {
    const msg = error.stderr?.toString?.() || error.message;
    console.warn(`  ! ${argv.slice(0, 3).join(' ')}: ${msg.split('\n')[0]}`);
    return null;
  }
};

const numberFromUrl = (url) => {
  const match = url?.match(/\/issues\/(\d+)\s*$/m);
  if (!match) throw new Error(`No se pudo extraer el número de: ${url}`);
  return Number(match[1]);
};

const createIssue = ({ title, body, labels, milestone, parent }) => {
  const argv = ['issue', 'create', '--repo', REPO, '--title', title, '--body', body];
  for (const label of labels) argv.push('--label', label);
  argv.push('--milestone', milestone);
  if (parent) argv.push('--parent', String(parent));
  return gh(argv);
};

const addToProject = (url) => {
  tryGh(['project', 'item-add', PROJECT, '--owner', OWNER, '--url', url, '--format', 'json']);
  for (const [field, value] of currentFields) {
    tryGh(['project', 'item-edit', PROJECT, '--owner', OWNER, '--url', url, '--field', field, '--value', value]);
  }
};

let currentFields = [];

const processStory = (story) => {
  console.log(`\n=== ${story.key} · ${story.title}`);
  currentFields = [
    ['Priority', story.priority],
    ['Area', story.area],
    ['Size', story.size],
  ];

  if (dryRun) {
    console.log(`  [dry-run] story + ${story.children.length} sub-issues`);
    return { number: null, created: 0 };
  }

  let created = 0;
  let number = existing.get(story.title);
  if (number) {
    console.log(`  = #${number} ${story.title} (ya existe)`);
  } else {
    const url = createIssue({
      title: story.title,
      body: story.body,
      labels: story.labels,
      milestone: story.milestone,
    });
    number = numberFromUrl(url);
    console.log(`  #${number} ${story.title}`);
    addToProject(url);
    existing.set(story.title, number);
    created += 1;
  }

  const childNumbers = [];
  for (const child of story.children) {
    currentFields = [
      ['Priority', child.priority],
      ['Area', child.area],
      ['Size', child.size],
    ];
    let childNumber = existing.get(child.title);
    if (childNumber) {
      console.log(`    = #${childNumber} ${child.title} (ya existe)`);
    } else {
      const childUrl = createIssue({
        title: child.title,
        body: child.body,
        labels: child.labels,
        milestone: story.milestone,
        parent: number,
      });
      childNumber = numberFromUrl(childUrl);
      console.log(`    #${childNumber} ${child.title}`);
      addToProject(childUrl);
      existing.set(child.title, childNumber);
      created += 1;
    }
    childNumbers.push(childNumber);
  }

  if (story.milestone === 'M0 Setup') {
    for (const n of [number, ...childNumbers]) {
      tryGh(['issue', 'close', String(n), '--repo', REPO, '--reason', 'completed']);
    }
    console.log(`  M0 cerrado (${1 + childNumbers.length} issues).`);
  }

  return { number, created };
};

console.log(`Backlog: ${backlog.length} historias, ${backlog.reduce((n, s) => n + s.children.length, 0)} tareas.`);
console.log(`Repo: ${REPO} · Project: ${PROJECT} · dry-run: ${dryRun}`);

if (!dryRun) {
  ensureLabels();
  loadExisting();
  console.log(`Issues existentes: ${existing.size}`);
}

let total = 0;
for (const story of backlog.slice(0, limit)) {
  const result = processStory(story);
  total += result.created;
}

if (!dryRun && limit === Infinity) {
  // Cerrar M0 completo (padre + hijos) al final.
  const m0 = backlog.find((s) => s.key === 'M0');
  if (m0) console.log('\nM0 creado. Ciérralo con: gh issue close <n> --repo ' + REPO);
}

console.log(`\nListo: ${total} issues procesadas.`);
