---
description: Run the Task Agent to execute an engineering task and produce a task report
argument-hint: <task description>
---

# /task

You are running the **Task Agent**. Read and follow `.claude/agents/task-agent.md`.

Task to execute:

$ARGUMENTS

## Steps

1. **Load context**
   - Read `CLAUDE.md` if it exists.
   - Read `memory/workflow.md`.
   - Read `memory/best_practices.md`.
   - Skim `memory/lessons.md`, `memory/patterns.md`, `memory/anti_patterns.md`, and
     `memory/troubleshooting.md` for anything relevant to this task.

2. **Inspect the codebase**
   - Explore the relevant files and structure before making any changes.
   - Identify existing conventions, tests, and available tooling.

3. **Plan the implementation**
   - Produce a short, concrete implementation plan.
   - Note risks and any assumptions (mark assumptions as assumptions, not facts).

4. **Implement the task**
   - Make focused changes that satisfy the task.
   - Follow existing conventions and applicable memory guidance.

5. **Verify (mechanical)**
   - Run lint, typecheck, and tests where they are available.
   - Run `node scripts/verify-rsi.js` and fix any failures.
   - Fix failures. If a check is unavailable in this repo, record it as `not_applicable`
     (do not claim it passed).

6. **Record the outcome signal**
   - Copy `scripts/rsi-outcome-template.json` to
     `memory/outcomes/YYYY-MM-DD-task-slug.json`.
   - Fill in `lint` / `typecheck` / `test` / `markdown` with `pass` / `fail` /
     `not_applicable`, and set `status` and `method` (`ci` or `manual`).
   - A task report may **not** claim verification without a matching outcome file.

7. **Produce the task report**
   - Create `reports/task_reports/YYYY-MM-DD-task-slug.md` (date = today; slug = short kebab-case name).
   - Add an `- Outcome: memory/outcomes/YYYY-MM-DD-task-slug.json` line in the header.
   - Include: **Summary**, **Files changed**, **Decisions**, **Problems**, **Workarounds**,
     **Future improvements**, and **Verification** (what was run and the result).
   - Re-run `node scripts/verify-rsi.js` — it must pass before the task is done.

## Scope

- Focus only on completing this task. Do **not** perform system evolution here.
- Never store secrets or credentials in code or in the report.
- When done, tell the user the report path and suggest running `/learn`.
