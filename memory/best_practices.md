# Best Practices

Recommended, repeatable ways of working in this repository. Maintained by the Learning Agent.

> Format:
> - **<practice>** — rationale. _source: ..._

## Starting practices

- **Read `memory/` before starting a task** so past lessons are applied, not re-learned.
- **Follow existing code conventions** over personal preference.
- **State when a verification step (lint/typecheck/tests) is unavailable** instead of implying it passed.
- **Keep changes small and focused** on the task at hand.

## Handling ambiguous tasks

- **Check whether a target already exists before creating it** — if a task says "add X" and X
  is already present, do not overwrite or duplicate. Enhance the existing file and surface the
  ambiguity to the user instead. _source: reports/task_reports/2026-07-07-readme-expand.md_

## Documentation

- **Link to the canonical doc instead of duplicating its content** — when new documentation
  would repeat information that already lives elsewhere (e.g. `docs/`), reference it rather
  than copying, to avoid the two copies drifting apart. Applied to both `README.md` and
  `CONTRIBUTING.md`. _sources: reports/task_reports/2026-07-07-readme-project-purpose.md,
  reports/task_reports/2026-07-07-contributing-guide.md_
