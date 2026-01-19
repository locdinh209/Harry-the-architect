---
name: agent-builder-expert
description: >-
  Expert guidance for building production-quality AI agents. Use when designing
  agent architectures, implementing tool integrations (MCP/function calling),
  building orchestration layers, evaluating agent quality, or deploying agents
  to production. Covers agent taxonomy, core patterns, quality frameworks,
  evaluation strategies, and production deployment.
---

# Agent Builder Expert

Build production-quality AI agents with expert guidance from Google Cloud's agent development whitepapers and industry best practices.

## When to Activate

- Designing agent architectures or multi-agent systems
- Implementing tool calling or MCP integrations
- Building orchestration layers (ReAct, Chain-of-Thought)
- Evaluating and testing agent quality
- Deploying agents from prototype to production

## Core Architecture

Every agent has three components:

1. **Model** - The reasoning "brain" (LLM that processes, plans, decides)
2. **Tools** - The "hands" (APIs, functions, data stores for action)
3. **Orchestration** - The coordinator (manages the agentic loop)

## Agent Taxonomy (5 Levels)

| Level | Name | Capability |
|-------|------|------------|
| 0 | Core Reasoning | Pure LLM, no tools, single-turn reasoning |
| 1 | Connected | Single tool access, basic retrieval/action |
| 2 | Strategic | Multi-tool, planning, multi-step workflows |
| 3 | Collaborative | Multi-agent coordination, delegation |
| 4 | Self-Evolving | Learns from experience, adapts strategies |

## The Agentic Loop

```
Mission → Scene → Think → Act → Observe → (repeat until done)
```

1. **Mission**: Receive goal from user
2. **Scene**: Gather environment context
3. **Think**: Reason and plan next action
4. **Act**: Execute via tool calls
5. **Observe**: Process results, update state

## Quick Reference

| Topic | When to Use | Reference |
|-------|-------------|-----------|
| **Fundamentals** | Understanding agent types, architecture | [agent-fundamentals.md](./references/agent-fundamentals.md) |
| **Tool Design** | Implementing function calling, MCP servers | [tool-design.md](./references/tool-design.md) |
| **Orchestration** | ReAct, planning, multi-agent patterns | [orchestration-patterns.md](./references/orchestration-patterns.md) |
| **Quality** | Evaluation, testing, reliability metrics | [agent-quality.md](./references/agent-quality.md) |
| **Production** | Deployment, scaling, monitoring | [production-deployment.md](./references/production-deployment.md) |
| **Examples** | Practical templates and implementations | [examples.md](./references/examples.md) |

## Design Principles

1. **Build for workflows, not APIs** - Consolidate related operations
2. **Optimize for limited context** - Return high-signal info only
3. **Design actionable errors** - Guide recovery, suggest next steps
4. **Fail gracefully** - Implement retries, fallbacks, checkpoints
5. **Measure everything** - Latency, tokens, success rate, cost

## Quality Pillars

| Pillar | Key Metrics |
|--------|-------------|
| **Correctness** | Task success rate, output accuracy |
| **Reliability** | Error recovery rate, consistency |
| **Efficiency** | Latency, token usage, cost per task |
| **Safety** | Guardrail compliance, harm prevention |

## Pre-Production Checklist

- [ ] All tool schemas validated with proper types/descriptions
- [ ] Error handling tested for each failure mode
- [ ] Token budget defined and enforced
- [ ] Evaluation suite with 10+ realistic scenarios
- [ ] Monitoring and logging configured
- [ ] Rate limiting and throttling in place
- [ ] Security review completed (injection, access control)
- [ ] Fallback strategies defined for external dependencies

## Anti-Patterns to Avoid

- Exhaustive context loading (curate, don't dump)
- Single-turn design for multi-step tasks
- Vague tool descriptions (be specific, include examples)
- No error recovery (always plan for failure)
- Skipping evaluation (test before production)

## Related Skills

- [context-engineering](../context-engineering/SKILL.md) - Deep dive on context optimization
- [mcp-builder](../mcp-builder/SKILL.md) - Building MCP servers
- [skill-creator](../skill-creator/SKILL.md) - Creating Claude skills
