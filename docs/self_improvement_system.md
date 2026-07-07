# Self-Improvement System

A lightweight, file-based recursive self-improvement (RSI) workflow for Claude Code inside
this repository. No application, no services — just Markdown files, three slash commands,
and three agents.

## What this system is

A loop that turns everyday engineering work into durable, compounding knowledge:

1. **Execute** an engineering task.
2. **Report** what happened.
3. **Learn** reusable lessons from the report.
4. **Store** that knowledge in structured memory.
5. **Analyze** the accumulated memory periodically.
6. **Recommend** improvements to prompts, workflows, agents, tools, and architecture.

## What RSI means here

"Recursive self-improvement" in this repo is deliberately modest: the system improves the
*way it works* over time by (a) capturing lessons after each task and (b) periodically
reviewing those lessons to propose better workflows, prompts, agents, and tools. Improvements
to the system itself are **proposed for human approval**, not applied blindly. There is no
autonomous self-modification of core architecture.

## Components

```
.claude/commands/   task.md · learn.md · evolve.md      # slash commands
.claude/agents/     task-agent.md · learning-agent.md · evolution-agent.md
memory/             durable knowledge (see below)
reports/            task_reports · learning_reports · evolution_reports
docs/               this file
```

### Memory files

| File | Holds |
|------|-------|
| `memory/lessons.md` | Durable lessons that change future behavior |
| `memory/best_practices.md` | Recommended, repeatable ways of working |
| `memory/patterns.md` | Reusable solution shapes |
| `memory/anti_patterns.md` | Approaches to avoid |
| `memory/troubleshooting.md` | Symptom → cause → fix notes |
| `memory/technical_debt.md` | Known shortcuts and gaps to revisit |
| `memory/automation_opportunities.md` | Repetitive work worth automating |
| `memory/agent_ideas.md` | Proposals for new specialized agents |
| `memory/workflow.md` | The default engineering workflow |
| `memory/adr/` | Architecture Decision Records |

## The commands

### `/task <task>`
Runs the **Task Agent**. Loads context (`CLAUDE.md`, `memory/workflow.md`,
`memory/best_practices.md`), inspects the codebase, plans, implements, runs
lint/typecheck/tests where available, and writes a report to
`reports/task_reports/YYYY-MM-DD-task-slug.md`.

### `/learn`
Runs the **Learning Agent**. Reads the latest task report, extracts reusable knowledge,
updates the relevant `memory/*` files (avoiding duplicates), and writes a report to
`reports/learning_reports/YYYY-MM-DD-learning-slug.md`. **Never writes production code.**

### `/evolve`
Runs the **Evolution Agent**. Reviews all memory and recent reports, finds recurring
mistakes / bottlenecks / duplicated work / weak workflows / missing tools / missing agents,
and writes recommendations to `reports/evolution_reports/YYYY-MM-DD-evolution.md`. Updates
`memory/agent_ideas.md` and `memory/automation_opportunities.md`. Non-trivial changes are
**proposed**, not applied.

## When to run each command

- **`/task`** — every time you want an engineering task done through the system.
- **`/learn`** — right after each completed `/task`, while the work is fresh.
- **`/evolve`** — periodically, roughly every **10–20 tasks**, or when you sense recurring friction.

## What files get updated

| Command | Writes reports to | Updates memory |
|---------|-------------------|----------------|
| `/task` | `reports/task_reports/` | none (implementation only) |
| `/learn` | `reports/learning_reports/` | `lessons`, `best_practices`, `patterns`, `anti_patterns`, `troubleshooting`, `technical_debt`, `automation_opportunities` |
| `/evolve` | `reports/evolution_reports/` | `agent_ideas`, `automation_opportunities` (+ proposals for `workflow`, agents, docs) |

## Safety rules

- Never automatically rewrite core architecture without explicit approval.
- Never delete memory unless it is clearly obsolete or duplicated.
- Never store secrets or private credentials anywhere.
- Never invent lessons; never mark untested assumptions as facts.
- Prefer small, incremental improvements.
- Keep user approval for major workflow, architecture, or agent changes.

## How to review proposed improvements

1. Open the latest `reports/evolution_reports/YYYY-MM-DD-evolution.md`.
2. Read the **Recommendations** section; each item is tagged `[SAFE]` or
   `[PROPOSED — needs approval]`.
3. For proposed items, decide accept / reject / defer. Only after you approve should the
   corresponding change be applied to `memory/workflow.md`, `.claude/agents/*`, docs, or
   architecture.
4. Significant architectural decisions should be captured as an ADR under `memory/adr/`.

## The normal usage loop

```
/task <task>
/learn
/task <next task>
/learn
...
/evolve            # after 10–20 tasks
```
