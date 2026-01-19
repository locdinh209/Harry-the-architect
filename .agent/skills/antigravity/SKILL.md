---
name: antigravity
description: >-
  Master Google Antigravity IDE, the agent-first AI coding environment powered by
  Gemini 3. Use when working with task boundaries, artifacts (implementation plans,
  walkthroughs, task checklists), Manager View for multi-agent coordination, Editor
  View for AI-enhanced coding, MCP server integration, browser subagents, skill
  creation, or understanding Antigravity-specific workflows and best practices.
license: MIT
version: 1.0.0
---

# Antigravity IDE

Google Antigravity is an agent-first AI coding environment that transforms development from prompt-based assistance to goal-oriented autonomous execution.

## When to Use

- Understanding Antigravity features and workflows
- Working with task boundaries and modes (PLANNING, EXECUTION, VERIFICATION)
- Creating artifacts (implementation_plan.md, walkthrough.md, task.md)
- Coordinating multiple agents in Manager View
- Configuring MCP servers for external tool integration
- Creating or managing Agent Skills
- Using browser subagents for testing
- Optimizing agentic workflows

## Core Concepts

### Agent-First Design

Instead of prompts, you provide **high-level goals**. The agent:
1. Plans the approach (PLANNING mode)
2. Executes changes (EXECUTION mode)
3. Verifies results (VERIFICATION mode)

### Dual Interface System

| View | Purpose |
|------|---------|
| **Editor View** | Traditional IDE + AI (autocomplete, sidebar agent) |
| **Manager View** | "Mission control" - coordinate multiple agents |

### Verifiable Artifacts

Artifacts are structured documents in: `<appDataDir>/brain/<conversation-id>/`

| Artifact | Purpose |
|----------|---------|
| `task.md` | Checklist tracking work progress |
| `implementation_plan.md` | Technical plan for PLANNING mode |
| `walkthrough.md` | Summary of completed work |

## Quick Reference

| Topic | When to Use | Reference |
|-------|-------------|-----------|
| **Task Modes** | PLANNING/EXECUTION/VERIFICATION | [task-modes.md](references/task-modes.md) |
| **Artifacts** | Creating plans, walkthroughs | [artifacts.md](references/artifacts.md) |
| **Skills** | Creating/managing agent skills | [skills.md](references/skills.md) |
| **MCP Integration** | External tools, servers | [mcp-integration.md](references/mcp-integration.md) |
| **Browser Subagent** | Testing, screenshots | [browser-subagent.md](references/browser-subagent.md) |
| **Manager View** | Multi-agent coordination | [manager-view.md](references/manager-view.md) |

## Task Boundary Pattern

```python
# Start a task
task_boundary(
    Mode="PLANNING",
    TaskName="Implementing Feature X",
    TaskStatus="Researching existing code",
    TaskSummary="Starting implementation of feature X."
)

# Update progress
task_boundary(
    Mode="EXECUTION",
    TaskName="%SAME%",
    TaskStatus="Writing core logic",
    TaskSummary="Completed research, found 3 relevant files."
)
```

## Artifact Guidelines

### implementation_plan.md
- Create during PLANNING mode
- Include proposed changes, verification plan
- Request user review via `notify_user`

### walkthrough.md
- Create after VERIFICATION mode
- Document what was built, tested, validated
- Embed screenshots/recordings

### task.md
- Checklist format: `[ ]`, `[/]`, `[x]`
- Update as work progresses

## Best Practices

1. **Use modes correctly:**
   - PLANNING: Research, design, get approval
   - EXECUTION: Implement changes
   - VERIFICATION: Test, validate, document

2. **Notify user for approvals:** Use `notify_user` with `BlockedOnUser=true`

3. **Keep artifacts concise:** Under 500 lines

4. **Progressive disclosure:** Link to references, don't dump context

5. **Use `%SAME%`** for unchanged task boundary fields

## Anti-Patterns

❌ Skipping PLANNING for complex tasks
❌ Not creating artifacts for multi-step work
❌ Ignoring task mode guidance
❌ Overloading context with unnecessary files
