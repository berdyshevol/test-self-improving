#!/usr/bin/env node
'use strict';

/*
 * verify-rsi.js — mechanical verification for the self-improving (RSI) system.
 *
 * Dependency-free (Node built-ins only). Turns the system's prose guarantees
 * into enforced checks. Exits non-zero if any check fails.
 *
 * Usage:
 *   node scripts/verify-rsi.js              run all invariant checks + markdown links
 *   node scripts/verify-rsi.js --invariants run only the 5 RSI invariant checks
 *   node scripts/verify-rsi.js --markdown   run only the internal-link check
 *   node scripts/verify-rsi.js --help       show this help
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const results = [];

function pass(check, msg) { results.push({ check, ok: true, msg }); }
function fail(check, msg) { results.push({ check, ok: false, msg }); }

function read(p) { return fs.readFileSync(p, 'utf8'); }
function exists(p) { return fs.existsSync(p); }
function rel(p) { return path.relative(ROOT, p); }

function walk(dir, ext, acc = []) {
  if (!exists(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    if (name === '.git' || name === 'node_modules') continue;
    const full = path.join(dir, name);
    const st = fs.statSync(full);
    if (st.isDirectory()) walk(full, ext, acc);
    else if (full.endsWith(ext)) acc.push(full);
  }
  return acc;
}

function isReadme(f) { return path.basename(f).toLowerCase() === 'readme.md'; }

const NEGATION = /\b(do not|don't|never|must not|cannot|can't|no longer|without)\b/i;

// ── Check 1: every task report links to a valid outcome JSON ─────────────────
function checkOutcomeLinkage() {
  const dir = path.join(ROOT, 'reports/task_reports');
  const allowedStatus = ['pass', 'fail', 'not_applicable'];
  const keys = ['lint', 'typecheck', 'test', 'markdown'];
  for (const f of walk(dir, '.md').filter(x => !isReadme(x))) {
    const c = read(f);
    const m = c.match(/Outcome:\s*`?([^\s`)]+\.json)`?/i);
    if (!m) {
      fail('outcome-linkage', `${rel(f)}: no "Outcome:" path — a report may not claim verification without an outcome file`);
      continue;
    }
    const outPath = path.join(ROOT, m[1]);
    if (!exists(outPath)) {
      fail('outcome-linkage', `${rel(f)}: outcome file "${m[1]}" does not exist`);
      continue;
    }
    let data;
    try { data = JSON.parse(read(outPath)); }
    catch (e) { fail('outcome-linkage', `${m[1]}: invalid JSON (${e.message})`); continue; }
    let bad = false;
    const v = data.verification || {};
    for (const k of keys) {
      if (!(k in v)) { fail('outcome-linkage', `${m[1]}: verification.${k} missing`); bad = true; }
      else if (!allowedStatus.includes(v[k])) {
        fail('outcome-linkage', `${m[1]}: verification.${k}="${v[k]}" not one of ${allowedStatus.join('/')}`);
        bad = true;
      }
    }
    if (!bad) pass('outcome-linkage', `${rel(f)} → ${m[1]}`);
  }
}

// ── Check 2: Task Agent files do not instruct editing memory directly ────────
function checkTaskAgentBoundary() {
  const writeVerb = /\b(update|updates|updating|edit|edits|editing|modify|modifies|modifying|write to|writes to|writing to|append to|appends to|appending to|add to|adds to)\b/i;
  for (const rf of ['.claude/agents/task-agent.md', '.claude/commands/task.md']) {
    const p = path.join(ROOT, rf);
    if (!exists(p)) { fail('task-agent-boundary', `${rf}: missing`); continue; }
    let violation = null;
    read(p).split('\n').forEach((line, i) => {
      const mentionsMemory = /\bmemory\//i.test(line) || /\bmemory files?\b/i.test(line);
      if (mentionsMemory && writeVerb.test(line) && !NEGATION.test(line)) {
        violation = `line ${i + 1}: "${line.trim()}"`;
      }
    });
    if (violation) fail('task-agent-boundary', `${rf}: appears to instruct writing memory — ${violation}`);
    else pass('task-agent-boundary', `${rf}: no direct memory-write instruction`);
  }
}

// ── Check 3: Learning Agent files forbid writing production code ──────────────
function checkLearningAgentBoundary() {
  const forbid = /(never|do not|don't|not)\b[^.\n]*\b(write|writes|writing|modify|modifies|modifying|edit|edits|editing|touch|touches|touching|change|changes|changing)\b[^.\n]*\bproduction code\b/i;
  for (const rf of ['.claude/agents/learning-agent.md', '.claude/commands/learn.md']) {
    const p = path.join(ROOT, rf);
    if (!exists(p)) { fail('learning-agent-boundary', `${rf}: missing`); continue; }
    if (forbid.test(read(p))) pass('learning-agent-boundary', `${rf}: forbids writing production code`);
    else fail('learning-agent-boundary', `${rf}: missing explicit "never write production code" boundary`);
  }
}

// ── Check 4: Evolution changes are proposals unless explicitly approved ───────
function checkEvolutionProposalGate() {
  for (const rf of ['.claude/agents/evolution-agent.md', '.claude/commands/evolve.md']) {
    const p = path.join(ROOT, rf);
    if (!exists(p)) { fail('evolution-proposal-gate', `${rf}: missing`); continue; }
    const c = read(p);
    if (/PROPOSED/i.test(c) && /approval/i.test(c)) pass('evolution-proposal-gate', `${rf}: retains proposal/approval gate`);
    else fail('evolution-proposal-gate', `${rf}: missing PROPOSED/approval gate language`);
  }
  // Report-level: an "Applied now" section must not touch core files unless APPROVED.
  const dir = path.join(ROOT, 'reports/evolution_reports');
  for (const f of walk(dir, '.md').filter(x => !isReadme(x))) {
    const c = read(f);
    const m = c.match(/##\s*Applied now[^\n]*\n([\s\S]*?)(?:\n##\s|\n#\s|$)/i);
    if (!m) continue;
    const touchesCore = /\.claude\//i.test(m[1]) || /memory\/workflow\.md/i.test(m[1]);
    if (touchesCore && !/APPROVED/i.test(c)) {
      fail('evolution-proposal-gate', `${rel(f)}: "Applied now" changes core files without an APPROVED marker`);
    } else {
      pass('evolution-proposal-gate', `${rel(f)}: applied-now section is safe`);
    }
  }
}

// ── Check 5: memory files contain no duplicate lesson IDs ─────────────────────
function checkDuplicateLessonIds() {
  const idRe = /\[([A-Z]{1,5}-\d{2,})\]/g;
  const seen = new Map();
  const dups = [];
  for (const f of walk(path.join(ROOT, 'memory'), '.md')) {
    const c = read(f);
    let m;
    while ((m = idRe.exec(c)) !== null) {
      const id = m[1];
      if (seen.has(id)) dups.push(`${id} (${rel(seen.get(id))} & ${rel(f)})`);
      else seen.set(id, f);
    }
  }
  if (dups.length) fail('duplicate-lesson-ids', `duplicate IDs: ${dups.join('; ')}`);
  else pass('duplicate-lesson-ids', `${seen.size} lesson ID(s), all unique`);
}

// ── Mechanical verification: internal Markdown links resolve ──────────────────
function checkMarkdownLinks() {
  const linkRe = /\[[^\]]*\]\(([^)]+)\)/g;
  let broke = false;
  for (const f of walk(ROOT, '.md')) {
    const c = read(f);
    let m;
    while ((m = linkRe.exec(c)) !== null) {
      let target = m[1].trim();
      if (/^(https?:|mailto:|#)/i.test(target)) continue;
      target = target.split('#')[0];
      if (!target) continue;
      if (!exists(path.resolve(path.dirname(f), target))) {
        fail('markdown-links', `${rel(f)}: broken link → ${m[1]}`);
        broke = true;
      }
    }
  }
  if (!broke) pass('markdown-links', 'all internal Markdown links resolve');
}

function printHelp() {
  console.log(read(__filename).split('\n').slice(2, 17).join('\n').replace(/^ \*?/gm, '').trim());
}

// ── Main ─────────────────────────────────────────────────────────────────────
const invariants = [
  checkOutcomeLinkage,
  checkTaskAgentBoundary,
  checkLearningAgentBoundary,
  checkEvolutionProposalGate,
  checkDuplicateLessonIds,
];

const mode = process.argv[2] || '--all';
if (mode === '--help' || mode === '-h') { printHelp(); process.exit(0); }

if (mode === '--markdown') {
  checkMarkdownLinks();
} else if (mode === '--invariants') {
  invariants.forEach(fn => fn());
} else if (mode === '--all') {
  invariants.forEach(fn => fn());
  checkMarkdownLinks();
} else {
  console.error(`Unknown mode "${mode}". Try --help.`);
  process.exit(2);
}

const failed = results.filter(r => !r.ok);
for (const r of results.filter(r => r.ok)) console.log(`  ok   [${r.check}] ${r.msg}`);
for (const r of failed) console.error(`  FAIL [${r.check}] ${r.msg}`);
console.log(`\nRSI verification: ${results.length - failed.length} passed, ${failed.length} failed.`);
process.exit(failed.length ? 1 : 0);
