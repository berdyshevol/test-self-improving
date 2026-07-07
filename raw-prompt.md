You are Claude Code acting as a senior AI systems engineer.

Your task is to set up a self-improving Claude Code engineering system inside this repository.

Goal:
Create a lightweight recursive self-improvement workflow where Claude can:

1. Execute engineering tasks
2. Generate a task report
3. Extract lessons after each task
4. Store durable engineering knowledge
5. Periodically analyze accumulated knowledge
6. Recommend improvements to prompts, workflows, agents, tools, and architecture

Do not over-engineer.
Do not build a full application.
Create a practical file-based system that works immediately inside this repo.

Set up the following structure:

.claude/
  commands/
    task.md
    learn.md
    evolve.md
  agents/
    task-agent.md
    learning-agent.md
    evolution-agent.md

memory/
  lessons.md
  best_practices.md
  patterns.md
  anti_patterns.md
  troubleshooting.md
  technical_debt.md
  automation_opportunities.md
  agent_ideas.md
  workflow.md
  adr/
    README.md

reports/
  task_reports/
    README.md
  learning_reports/
    README.md
  evolution_reports/
    README.md

docs/
  self_improvement_system.md

Create all missing directories and files.

Content requirements:

1. .claude/commands/task.md

Create a slash command that accepts a user task and runs the Task Agent.

The command should instruct Claude to:
- read CLAUDE.md if it exists
- read memory/workflow.md
- read memory/best_practices.md
- inspect the codebase
- plan the implementation
- implement the task
- run lint/typecheck/tests where available
- produce a task report in reports/task_reports/YYYY-MM-DD-task-slug.md
- include summary, files changed, decisions, problems, workarounds, future improvements

2. .claude/commands/learn.md

Create a slash command that runs the Learning Agent after a completed task.

The command should instruct Claude to:
- find the latest task report
- extract durable lessons
- update memory/lessons.md
- update memory/best_practices.md
- update memory/patterns.md
- update memory/anti_patterns.md
- update memory/troubleshooting.md
- update memory/technical_debt.md
- update memory/automation_opportunities.md
- create a learning report in reports/learning_reports/YYYY-MM-DD-learning-slug.md
- only store knowledge that is reusable

3. .claude/commands/evolve.md

Create a slash command that runs the Evolution Agent periodically.

The command should instruct Claude to:
- review all memory files
- review recent task and learning reports
- find recurring mistakes, bottlenecks, duplicated work, weak workflows, missing tools, and missing agents
- recommend improvements to memory/workflow.md
- recommend updates to .claude/agents/*
- recommend new automation tools
- recommend new specialized agents
- update memory/agent_ideas.md
- update memory/automation_opportunities.md
- create an evolution report in reports/evolution_reports/YYYY-MM-DD-evolution.md
- do not make risky changes automatically without clearly marking them as proposed

4. .claude/agents/task-agent.md

Create the Task Agent prompt.

The Task Agent should focus only on completing the assigned engineering task.
It should not spend time on system evolution.
At the end it must create a structured task report.

5. .claude/agents/learning-agent.md

Create the Learning Agent prompt.

The Learning Agent should never write production code.
It should extract reusable knowledge from completed tasks.
It should update memory files carefully.
It should avoid duplicates.
It should distinguish between:
- lesson
- best practice
- pattern
- anti-pattern
- troubleshooting note
- technical debt
- automation opportunity

6. .claude/agents/evolution-agent.md

Create the Evolution Agent prompt.

The Evolution Agent should analyze accumulated memory and reports.
It should identify recurring system-level problems.
It should recommend improvements to:
- workflow
- prompts
- agents
- tools
- documentation
- architecture
- memory structure

7. memory/workflow.md

Create the default workflow:

Understand task
Inspect existing code
Search for prior lessons
Plan
Implement
Run lint
Run typecheck
Run tests
Fix failures
Write task report
Run learning step
Update memory

8. docs/self_improvement_system.md

Document how to use the system.

Include:

- What this system is
- What RSI means in this repo
- How to run /task
- How to run /learn
- How to run /evolve
- When to run each command
- What files are updated
- Safety rules
- How to review proposed improvements

Important safety rules:

- Never automatically rewrite core architecture without explicit approval.
- Never delete memory unless clearly obsolete or duplicated.
- Never store secrets.
- Never store private credentials.
- Never invent lessons.
- Never mark untested assumptions as facts.
- Prefer small incremental improvements.
- Keep user approval for major workflow, architecture, or agent changes.

After creating the files:

1. Show the directory tree.
2. Summarize what was created.
3. Explain the normal usage loop:

/task <task>
/learn
/task <next task>
/learn
/evolve after 10–20 tasks

4. Do not implement any unrelated application code.
