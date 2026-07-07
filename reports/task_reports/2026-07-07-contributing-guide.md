# Task Report — Add CONTRIBUTING.md

- Date: 2026-07-07
- Status: completed

## Summary
Added a `CONTRIBUTING.md` with basic rules for using the `/task`, `/learn`, and `/evolve`
commands, the normal usage loop, and core safety rules. It links to
`docs/self_improvement_system.md` for full detail rather than duplicating it.

## Files changed
- `CONTRIBUTING.md` — new file; concise contributor rules for the three commands plus a
  "Basic rules" section.

## Decisions
- Applied the existing best practice "link to the canonical doc instead of duplicating":
  the file summarizes each command briefly and points to `docs/self_improvement_system.md`.
- Included the recorded lesson that this repo has no automated tooling, so contributors know
  verification is manual.

## Problems
- None.

## Workarounds
- None.

## Verification
- No lint/typecheck/test tooling exists in this Markdown-only repo, so automated checks are
  not available.
- Manual check: valid Markdown; the internal link `docs/self_improvement_system.md` matches
  an existing file.

## Future improvements
- If a `CLAUDE.md` is added later, cross-link it from `CONTRIBUTING.md` so contributors and
  Claude share the same entry point.
