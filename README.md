# test-self-improving

## Project Purpose

This repository is a testbed for a **self-improving Claude Code workflow**. It exercises a
lightweight, file-based loop in which Claude executes engineering tasks, reports on them,
extracts reusable lessons into durable memory, and periodically analyzes that accumulated
knowledge to propose improvements to its own prompts, workflows, agents, and tooling.

The goal is to verify that this recursive self-improvement (RSI) loop works end-to-end
inside a real repository — not to build a production application. See
[`docs/self_improvement_system.md`](docs/self_improvement_system.md) for how the system is
structured and how to use the `/task`, `/learn`, and `/evolve` commands.

## Repository structure

| Path | Contents |
|------|----------|
| `.claude/commands/` | The `/task`, `/learn`, and `/evolve` slash commands |
| `.claude/agents/` | The Task, Learning, and Evolution agent prompts |
| `memory/` | Durable knowledge: lessons, best practices, patterns, and more |
| `reports/` | Task, learning, and evolution reports |
| `docs/` | System documentation |

## Usage

Run the loop with the three commands:

```
/task <task>
/learn
...
/evolve        # after 10–20 tasks
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for the rules on using each command, and
[`docs/self_improvement_system.md`](docs/self_improvement_system.md) for the full design.

## RSI Smoke Test

This repository tests a **mechanically verifiable self-improving workflow**: Claude runs
tasks, records lessons into durable memory, and periodically proposes improvements to its own
process — but every guarantee that would otherwise be just words in a file is enforced by
code. `scripts/verify-rsi.js` (run in CI via `.github/workflows/rsi-check.yml`) checks that
each task report is backed by an outcome file, that the agents respect their boundaries, that
evolution changes stay gated behind approval, that lessons carry unique IDs, and that internal
links resolve. If any invariant is violated the check fails, so "self-improving" here means
*provably* so, not merely *claimed*.
