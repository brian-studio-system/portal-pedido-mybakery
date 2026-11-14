#!/usr/bin/env node
/**
 * Crea el backlog restante usando la API REST (sin GraphQL).
 * Idempotente: salta las issues que ya existen por título.
 * No añade al Project; para eso usa scripts/backlog/add-to-project.mjs cuando
 * el límite de GraphQL se haya recuperado.
 */

import { execFileSync } from 'node:child_process';
import { backlog } from './backlog.mjs';

const REPO = 'brian-studio-system/portal-pedido-mybakery';
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');

const api = (argv, input) =>
  execFileSync('gh', ['api', ...argv], {
    encoding: 'utf8',
    input,
    stdio: ['pipe', 'pipe', 'pipe'],
  }).trim();

const listIssues = () => JSON.parse(api([`repos/${REPO}/issues?state=all&per_page=100`]));
const listMilestones = () => JSON.parse(api([`repos/${REPO}/milestones?state=all&per_page=100`]));

const issues = listIssues();
const existing = new Map(issues.map((issue) => [issue.title, issue]));
const milestones = new Map(listMilestones().map((m) => [m.title, m.number]));

console.log(`Existentes: ${existing.size} · hitos: ${milestones.size}`);

const createIssue = ({ title, body, labels, milestone }) => {
  const payload = JSON.stringify({ title, body, labels, milestone });
  const raw = api(['-X', 'POST', `repos/${REPO}/issues`, '--input', '-'], payload);
  return JSON.parse(raw);
};

const linkSubIssue = (parentNumber, childId) => {
  const payload = JSON.stringify({ sub_issue_id: childId });
  api(['-X', 'POST', `repos/${REPO}/issues/${parentNumber}/sub_issues`, '--input', '-'], payload);
};

let created = 0;
let linked = 0;

for (const story of backlog) {
  let parent = existing.get(story.title);

  if (!parent) {
    if (dryRun) {
      console.log(`[dry-run] crear historia: ${story.title}`);
      parent = { number: null, id: null };
    } else {
      parent = createIssue({
        title: story.title,
        body: story.body,
        labels: story.labels,
        milestone: milestones.get(story.milestone),
      });
      existing.set(story.title, parent);
      created += 1;
      console.log(`#${parent.number} ${story.title}`);
    }
  }

  for (const child of story.children) {
    let issue = existing.get(child.title);
    if (issue) continue;

    if (dryRun) {
      console.log(`  [dry-run] crear tarea: ${child.title}`);
      continue;
    }

    issue = createIssue({
      title: child.title,
      body: child.body,
      labels: child.labels,
      milestone: milestones.get(story.milestone),
    });
    existing.set(child.title, issue);
    created += 1;
    console.log(`  #${issue.number} ${child.title}`);

    if (parent.number) {
      linkSubIssue(parent.number, issue.id);
      linked += 1;
    }
  }
}

console.log(`\nCreadas: ${created} · enlazadas como sub-issue: ${linked}`);
