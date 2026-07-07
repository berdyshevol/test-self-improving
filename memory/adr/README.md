# Architecture Decision Records (ADR)

This directory holds Architecture Decision Records — short documents that capture a
significant architectural decision, its context, and its consequences.

## When to add an ADR

Add one when a decision meaningfully shapes the system's architecture, workflow, or
tooling, and future contributors would benefit from knowing *why* it was made.

## Naming

`NNNN-short-title.md` — e.g. `0001-file-based-memory.md` (zero-padded, incrementing).

## Suggested template

```markdown
# NNNN. <Title>

- Status: <proposed | accepted | superseded by NNNN>
- Date: YYYY-MM-DD

## Context
<the forces and constraints at play>

## Decision
<what was decided>

## Consequences
<positive and negative results of the decision>
```

## Safety

Architectural decisions that change core behavior require explicit user approval before
being marked `accepted`. See `docs/self_improvement_system.md`.
