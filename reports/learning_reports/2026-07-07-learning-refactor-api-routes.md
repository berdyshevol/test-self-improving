# Learning Report — refactor-api-routes (blocked task)

- Date: 2026-07-07
- Source task report: reports/task_reports/2026-07-07-refactor-api-routes.md

## Lessons extracted
- **Verify referenced code/artifacts exist before attempting a task; report blocked rather
  than fabricating** (lesson) → `memory/lessons.md`.
- **Fabricating missing code to satisfy an inapplicable task** (anti-pattern) → `memory/anti_patterns.md`.

## Memory files updated
- `memory/lessons.md` — added the "verify existence / report blocked / never fabricate" lesson.
- `memory/anti_patterns.md` — added the "fabricating missing code" anti-pattern (first entry).
- `memory/automation_opportunities.md` — **strengthened** the existing "does this already
  exist?" pre-check with a second occurrence, noting it also covers the absent-target (blocked) case.

## Nothing-to-learn note
No new patterns, troubleshooting notes, or technical debt were evidenced. The blocked task
itself was handled correctly, so there was no failure to troubleshoot.

## Signal for future `/evolve`
The existence pre-check now has **two** supporting task reports (ambiguous re-add + blocked
absent-target). This is a strong, evidence-backed candidate to formalize into the Task Agent
workflow at the next `/evolve`.
