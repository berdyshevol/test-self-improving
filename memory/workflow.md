# Default Engineering Workflow

This is the standard loop the Task Agent follows for every task. Steps may be adapted per
task, but any skipped step should be called out explicitly.

1. **Understand task** — restate the goal; clarify scope and constraints.
2. **Inspect existing code** — read the relevant files, structure, and conventions.
3. **Search for prior lessons** — check `memory/` (lessons, patterns, anti-patterns, troubleshooting).
4. **Plan** — write a short, concrete plan; note risks and assumptions.
5. **Implement** — make focused changes following existing conventions.
6. **Run lint** — fix lint errors (or note if unavailable).
7. **Run typecheck** — fix type errors (or note if unavailable).
8. **Run tests** — run the test suite (or note if unavailable).
9. **Fix failures** — resolve failures from lint/typecheck/tests; re-run until green.
10. **Write task report** — `reports/task_reports/YYYY-MM-DD-task-slug.md`.
11. **Run learning step** — invoke `/learn` to extract durable knowledge.
12. **Update memory** — the Learning Agent updates the relevant `memory/*` files.

## Notes

- Prefer small, incremental changes.
- Never store secrets or credentials in code, reports, or memory.
- If a verification step is unavailable in the repo, state that explicitly rather than
  claiming it passed.

_This workflow may be refined by the Evolution Agent (`/evolve`), with user approval for
non-trivial changes._
