# Task Report — Mechanical RSI verification

- Date: 2026-07-07
- Status: completed
- Outcome: memory/outcomes/2026-07-07-rsi-mechanical-verification.json

## Summary
Upgraded the repo from a self-documenting workflow into a mechanically verifiable
self-improving system by adding: (1) an outcome-signal per task, (2) a dependency-free Node
checker enforcing five RSI invariants plus internal-link validation, and (3) a GitHub Actions
workflow that runs the checker on every push/PR. The three commands and the docs were updated
to use these checks.

## Files changed
- `scripts/verify-rsi.js` — new; the mechanical checker (5 invariants + Markdown links).
- `scripts/rsi-outcome-template.json` — new; outcome-signal schema.
- `memory/outcomes/README.md` — new; explains the outcome directory.
- `memory/outcomes/2026-07-07-*.json` — new; outcome files (4 backfilled + this task).
- `reports/task_reports/2026-07-07-*.md` — added an `Outcome:` line to the 4 prior reports.
- `memory/lessons.md` — added `[L-NNN]` IDs to existing lessons for the duplicate-ID check.
- `.github/workflows/rsi-check.yml` — new; runs `node scripts/verify-rsi.js` in CI.
- `.claude/commands/task.md`, `learn.md`, `evolve.md` — wired the checks into each command.
- `docs/self_improvement_system.md` — added "Documentation vs. verified improvement".

## Decisions
- **Dependency-free** checker (Node built-ins only) — no `npm install`, so CI is trivial and
  the repo stays lightweight, per the "prefer simple Node.js scripts" requirement.
- **Backfilled** outcome files for the 4 existing reports (`method: "manual"`) so the
  outcome-linkage invariant is universal rather than grandfathered.
- **Markdown link check** is the first real mechanical verification the repo has; it doubles
  as the `markdown` outcome status source.
- Enforcement is **heuristic but real** — validated with a negative test (below), not assumed.

## Problems
- The agent-boundary checks are text-heuristic (regex over prompt files), so a cleverly
  reworded violation could slip past. Acceptable for a lightweight guard; noted as debt.

## Workarounds
- Used negation-aware line scanning so legitimate "do not edit memory" statements are not
  flagged as violations.

## Verification
- `node scripts/verify-rsi.js` → **13 passed, 0 failed** (recorded in the outcome file).
- **Negative test:** injected a duplicate `[L-001]` ID and a broken link into a throwaway
  memory file; the checker failed on both (`duplicate-lesson-ids`, `markdown-links`), then
  passed again after cleanup. Confirms the enforcement is not vacuous.

## Future improvements
- Replace regex boundary heuristics with a stricter structured convention (e.g. a machine-
  readable "boundaries" block per agent file) for more robust enforcement.
- Add a `--new-outcome <slug>` helper to scaffold outcome files from the template.
- Extend mechanical verification with real lint/test once non-Markdown code is introduced.
