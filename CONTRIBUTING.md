# Contributing

This repository is driven by a self-improving Claude Code workflow. Most changes should go
through its three commands rather than being made ad hoc. For the full design, see
[`docs/self_improvement_system.md`](docs/self_improvement_system.md).

## The commands

### `/task <description>`
Run this to perform an engineering task. It loads context from `memory/`, plans, implements,
verifies where tooling exists, and writes a report to `reports/task_reports/`.

- Keep each task small and focused.
- Do not perform system evolution inside a task.

### `/learn`
Run this **right after** a completed `/task`. It reads the latest task report, extracts only
**reusable** knowledge, and updates the relevant `memory/` files, writing a report to
`reports/learning_reports/`.

- Never writes production code.
- Only records reusable knowledge; avoids duplicates.

### `/evolve`
Run this **periodically** (roughly every 10–20 tasks), not after every task. It reviews all
memory and recent reports, then proposes system-level improvements in
`reports/evolution_reports/`.

- Non-trivial changes are **proposed**, not auto-applied — review them before accepting.

## Normal loop

```
/task <task>
/learn
/task <next task>
/learn
...
/evolve        # after 10–20 tasks
```

## Basic rules

- Read `memory/` before starting work so past lessons are applied, not re-learned.
- Prefer small, incremental changes.
- Link to canonical docs instead of duplicating their content.
- This repo has **no automated lint/typecheck/test tooling** (it is Markdown-only) —
  verify changes manually and say so; never imply automated checks passed.
- Never commit secrets or credentials.
- Major workflow, architecture, or agent changes require explicit human approval.
