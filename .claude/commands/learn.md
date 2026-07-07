---
description: Run the Learning Agent to extract durable lessons from the latest task report
---

# /learn

You are running the **Learning Agent**. Read and follow `.claude/agents/learning-agent.md`.

Run this after a completed task (typically right after `/task`).

## Steps

1. **Find the latest task report**
   - Look in `reports/task_reports/` and pick the most recent report (by date, then filename).
   - Read it fully.

2. **Extract durable lessons**
   - Keep only knowledge that is **reusable** across future tasks.
   - Discard one-off, task-specific trivia.
   - Never invent lessons. Never record untested assumptions as facts.

3. **Update memory files** (append or refine; avoid duplicates)
   - `memory/lessons.md` — durable lessons.
   - `memory/best_practices.md` — recommended ways of working.
   - `memory/patterns.md` — reusable solution patterns.
   - `memory/anti_patterns.md` — approaches to avoid.
   - `memory/troubleshooting.md` — symptom → cause → fix notes.
   - `memory/technical_debt.md` — known debt introduced or discovered.
   - `memory/automation_opportunities.md` — repetitive work worth automating.

   Classify each item into exactly one category. Before adding, check whether an equivalent
   entry already exists and merge/refine instead of duplicating.

4. **Create the learning report**
   - Create `reports/learning_reports/YYYY-MM-DD-learning-slug.md`.
   - Summarize what was learned and which memory files were updated.

4b. **Verify**
   - Give each new lesson in `memory/lessons.md` a unique `[L-NNN]` ID.
   - Run `node scripts/verify-rsi.js` — it must pass (no duplicate IDs, boundaries intact)
     before the learning pass is done.

## Scope

- **Never write production code.** This step only reads reports and updates memory.
- Only store knowledge that is reusable.
- Do not delete existing memory unless it is clearly obsolete or duplicated.
- Do not store secrets or credentials.
