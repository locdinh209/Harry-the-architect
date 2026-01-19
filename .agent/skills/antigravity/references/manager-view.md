# Manager View

Manager View is "mission control" for coordinating multiple AI agents.

## Overview

In Manager View, you can:
- Run multiple agents in parallel
- Work across different workspaces
- Coordinate complex projects
- Monitor agent progress

## When to Use

- Large features requiring parallel work
- Multi-repository changes
- Concurrent testing and development
- Team-style workflows

## Parallel Workflows

Manager View enables:
- Agent A: Implementing feature
- Agent B: Writing tests
- Agent C: Updating documentation

All running simultaneously.

## Best Practices

1. **Divide work clearly:** Each agent gets distinct scope
2. **Avoid conflicts:** Don't have agents modify same files
3. **Coordinate dependencies:** Agent B waits for Agent A's API
4. **Review artifacts:** Check each agent's walkthroughs

## Comparison

| Aspect | Editor View | Manager View |
|--------|-------------|--------------|
| Agents | Single | Multiple |
| Focus | One task | Project-wide |
| Style | Hands-on | Supervisory |
| Best for | Feature work | Large initiatives |
