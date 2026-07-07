# Learning Report — readme-expand

- Date: 2026-07-07
- Source task report: reports/task_reports/2026-07-07-readme-expand.md

## Lessons extracted
- **Check whether a target already exists before creating it** (best practice) — the "Add
  README" task hit an already-existing README; the correct move was to enhance and surface the
  ambiguity, not overwrite or duplicate. → `memory/best_practices.md`.
- **A "does this already exist?" pre-check is an automation candidate** — this ambiguity is
  detectable and could be handled automatically by the Task Agent. → `memory/automation_opportunities.md`.

## Memory files updated
- `memory/best_practices.md` — added a "Handling ambiguous tasks" section.
- `memory/automation_opportunities.md` — added the existence pre-check opportunity (first
  entry in this file).

## Nothing-to-learn note
No new patterns, anti-patterns, troubleshooting notes, or technical debt were evidenced.

## Signal for future `/evolve`
Combined with the earlier note about repeated documentation tasks, there is now a concrete
automation opportunity (existence pre-check) worth evaluating during the next `/evolve` pass.
