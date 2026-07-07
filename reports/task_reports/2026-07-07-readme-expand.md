# Task Report — Add / expand README

- Date: 2026-07-07
- Status: completed
- Outcome: memory/outcomes/2026-07-07-readme-expand.json

## Summary
The task "Add README" was requested, but a `README.md` already existed (with a Project
Purpose section from an earlier task). Rather than overwrite or duplicate it, the existing
README was rounded out into a fuller README by adding **Repository structure** and **Usage**
sections that link to `CONTRIBUTING.md` and `docs/self_improvement_system.md`.

## Files changed
- `README.md` — added "Repository structure" (path table) and "Usage" (command loop +
  links) sections; existing Project Purpose section left unchanged.

## Decisions
- **Did not overwrite the existing README.** The task was ambiguous and a README was already
  present, so the non-destructive interpretation (enhance it) was chosen and surfaced to the user.
- Followed the recorded best practice: linked to `CONTRIBUTING.md` and the system docs
  instead of duplicating their content.

## Problems
- The task description ("Add README") conflicted with the current state (README already
  exists). This is an ambiguity, not an error.

## Workarounds
- Interpreted the task as "make the README complete" and enhanced the existing file rather
  than creating a duplicate or overwriting prior work.

## Verification
- No lint/typecheck/test tooling exists in this Markdown-only repo, so automated checks are
  not available.
- Manual check: valid Markdown; internal links `CONTRIBUTING.md` and
  `docs/self_improvement_system.md` both resolve to existing files.

## Future improvements
- If task inputs frequently restate work already done, a lightweight "does this already
  exist?" pre-check in the Task Agent could prevent ambiguous re-adds (candidate for `/evolve`).
