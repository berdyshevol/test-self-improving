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
