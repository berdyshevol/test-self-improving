# Evolution Report

- Date: 2026-07-07
- Reports reviewed: 4 task reports + 4 learning reports (the full history to date)

## Findings

### F1. The Task Agent workflow has no "is this task applicable?" step (HIGH)
Two of four tasks ran into a target-existence problem:
- `readme-expand` — "Add README" when a README already existed (ambiguous re-add).
- `refactor-api-routes` — "Refactor API routes" in a repo with no API (blocked).

Both were handled correctly by judgment, but the **workflow itself never instructs** the agent
to confirm the target exists (for "add") or is present (for "modify/refactor") before planning.
Evidence: `memory/lessons.md` (verify-existence lesson), `memory/best_practices.md` (Handling
ambiguous tasks), `memory/automation_opportunities.md` (existence pre-check, now 2 sources).

### F2. A documentation pattern has recurred three times (MEDIUM)
"Summarize and link to the canonical doc" was applied in `readme-project-purpose`,
`contributing-guide`, and `readme-expand`. It lived only as a best practice; it is now also
recorded as a reusable **pattern** (applied safely this pass).

### F3. Verification is manual every time; the repo has no tooling (MEDIUM)
Every documentation task was verified by hand (valid Markdown, working links). This is a
standing automation gap and the repo's *only* verification method. Recorded as a new automation
opportunity (Markdown lint + link check) this pass.

### F4. No new specialized agent is justified yet (INFO)
With four tasks, the only recurring need (applicability checks) fits better as a workflow step
than a new agent. Recorded honestly in `memory/agent_ideas.md` rather than inventing an agent.

## Recommendations

### [SAFE] — applied this pass (memory only)
1. Added the **Summarize-and-link documentation** pattern to `memory/patterns.md`. (F2)
2. Added the **Markdown lint + internal-link check** automation opportunity to
   `memory/automation_opportunities.md`. (F3)
3. Recorded the **no-new-agent-yet** assessment in `memory/agent_ideas.md`. (F4)

### [PROPOSED — needs approval] — not applied
These modify core workflow/agent prompts, so they await your approval.

**P1. Add an applicability / existence check to the workflow.** (addresses F1)
Insert a step between "Understand task" and "Inspect existing code" in `memory/workflow.md`:

> **2. Confirm applicability** — verify the task's target actually exists in the expected state:
> for "add X", check X is absent (else enhance, don't duplicate); for "modify/refactor X", check
> X is present (else report the task **blocked**). Surface any mismatch before planning.

And add a matching bullet to `.claude/agents/task-agent.md` (Responsibilities) and
`.claude/commands/task.md` (Step 2).

**P2. (Optional, depends on P1 + F3) Add Markdown verification tooling.**
Introduce a Markdown linter + link checker, optionally wired as a GitHub Actions workflow, to
replace manual doc verification. This would be delivered as its own `/task` once approved.

## Applied now (safe only)
- `memory/patterns.md` — new documentation pattern.
- `memory/automation_opportunities.md` — new Markdown-verification opportunity.
- `memory/agent_ideas.md` — no-new-agent-yet note.

## Awaiting approval
- **P1** — add an applicability/existence-check step to `memory/workflow.md`,
  `.claude/agents/task-agent.md`, and `.claude/commands/task.md`.
- **P2** — add Markdown lint + link-check tooling (a future `/task`).
