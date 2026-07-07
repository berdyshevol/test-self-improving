# Automation Opportunities

Repetitive work worth automating. Maintained by the Learning Agent and the Evolution Agent.

> Format:
> - **<opportunity>** — the repeated manual effort, and a proposed automation. _source: ..._

- **"Does this already exist?" pre-check in the Task Agent** — an "add X" task where X already
  exists led to an ambiguous re-add. A lightweight existence check early in the task workflow
  could detect this and prompt for enhance-vs-recreate before any changes. The same check
  would also catch "modify X" tasks where X is *absent* (blocked-task case). _sources:
  reports/task_reports/2026-07-07-readme-expand.md, reports/task_reports/2026-07-07-refactor-api-routes.md_
- **Markdown lint + internal-link check** — every documentation task so far has been verified
  *manually* for valid Markdown and working internal links. A Markdown linter plus a link
  checker (runnable locally or as a GitHub Actions workflow) would automate this recurring
  manual step and give the repo its first real verification tooling. _sources:
  reports/task_reports/2026-07-07-readme-project-purpose.md,
  reports/task_reports/2026-07-07-contributing-guide.md, reports/task_reports/2026-07-07-readme-expand.md_
