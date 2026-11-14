#!/usr/bin/env node
/**
 * Añade issues concretas al Project y rellena Priority/Area/Size.
 * Uso: node scripts/backlog/add-to-project.mjs 57 58 59 ...
 */

import { execFileSync } from 'node:child_process';
import { backlog } from './backlog.mjs';

const OWNER = 'brian-studio-system';
const REPO = `${OWNER}/portal-pedido-mybakery`;
const PROJECT = '1';

const numbers = process.argv.slice(2).map(Number).filter(Boolean);

const run = (argv) => execFileSync('gh', argv, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
const tryRun = (argv) => {
  try {
    return run(argv);
  } catch (error) {
    const message = (error.stderr?.toString?.() || error.message).split('\n')[0];
    console.warn(`  ! ${message}`);
    return null;
  }
};

const fieldsByTitle = new Map();
for (const story of backlog) {
  fieldsByTitle.set(story.title, story);
  for (const child of story.children) fieldsByTitle.set(child.title, child);
}

let added = 0;
for (const number of numbers) {
  const issue = JSON.parse(run(['api', `repos/${REPO}/issues/${number}`]));
  const fields = fieldsByTitle.get(issue.title);
  if (!fields) {
    console.warn(`#${number} sin datos en backlog: ${issue.title}`);
    continue;
  }
  console.log(`#${number} ${issue.title}`);
  tryRun(['project', 'item-add', PROJECT, '--owner', OWNER, '--url', issue.html_url, '--format', 'json']);
  for (const [field, value] of [
    ['Priority', fields.priority],
    ['Area', fields.area],
    ['Size', fields.size],
  ]) {
    tryRun(['project', 'item-edit', PROJECT, '--owner', OWNER, '--url', issue.html_url, '--field', field, '--value', value]);
  }
  added += 1;
}

console.log(`\nProcesadas: ${added}`);
