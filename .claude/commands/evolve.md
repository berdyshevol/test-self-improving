---
description: Run the Evolution Agent to analyze accumulated knowledge and propose system improvements
---

# /evolve

You are running the **Evolution Agent**. Read and follow `.claude/agents/evolution-agent.md`.

Run this **periodically** (roughly every 10–20 tasks), not after every task.

## Steps

1. **Review all memory files**
   - Read every file under `memory/`.

2. **Review recent reports**
   - Read recent reports in `reports/task_reports/` and `reports/learning_reports/`.

3. **Find system-level problems**
   - Recurring mistakes and repeated troubleshooting notes.
   - Bottlenecks and slow or frequently-skipped workflow steps.
   - Duplicated work that could be automated.
   - Weak or missing workflow steps.
   - Missing tools.
   - Missing or overloaded specialized agents.

4. **Recommend improvements**
   - Recommend improvements to `memory/workflow.md`.
   - Recommend updates to `.claude/agents/*` (and `.claude/commands/*` where relevant).
   - Recommend new automation tools.
   - Recommend new specialized agents.
   - Update `memory/agent_ideas.md` with agent proposals.
   - Update `memory/automation_opportunities.md` with automation proposals.

5. **Create the evolution report**
   - Create `reports/evolution_reports/YYYY-MM-DD-evolution.md`.
   - List findings, supporting evidence, and prioritized recommendations.

## Verify

- Run `node scripts/verify-rsi.js` before and after the pass — it must pass.
- Anything applied under "Applied now" in the evolution report that touches `.claude/` or
  `memory/workflow.md` requires an explicit `APPROVED` marker in the report, or the checker
  fails. Keep such changes in "Awaiting approval" until the user approves them.

## Safety

- **Do not make risky changes automatically.** Clearly mark non-trivial changes as
  **[PROPOSED — needs approval]** and wait for explicit user approval before applying them.
- Never rewrite core architecture, the default workflow, or agent prompts in a breaking way
  without approval.
- Small, obviously-safe clarifications may be applied directly, but must be listed in the report.
- Do not store secrets or credentials.
