# Outcomes

One JSON file per task, recording the **mechanical** verification result for that task.
This is the system's outcome signal — the evidence behind a task report's "Verification"
claims. Without an outcome file, a report may not claim it was verified.

- **Filename:** `YYYY-MM-DD-task-slug.json` (mirrors the task report's slug).
- **Schema:** see [`scripts/rsi-outcome-template.json`](../../scripts/rsi-outcome-template.json).
- **Enforced by:** [`scripts/verify-rsi.js`](../../scripts/verify-rsi.js) (the `outcome-linkage` check).

Each file records `pass` / `fail` / `not_applicable` for `lint`, `typecheck`, `test`, and
`markdown`, plus whether verification was run by `ci` or `manual`.

> Backfilled entries (`method: "manual"`) predate the mechanical checker; from its
> introduction onward, outcomes are produced by CI.
