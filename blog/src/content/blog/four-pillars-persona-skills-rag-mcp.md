---
title: 'The 4 Pillars: Persona, Skills, RAG, MCP'
description: 'A decision framework for what goes where in your agent context—Persona, Skills, RAG, or MCP?'
pubDate: 'Jan 19 2026'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

> "Should I put this in RAG, a Skill, or the Persona?" — A decision framework for what goes where.

## The Problem

You're building an AI agent. You have domain knowledge to add. Where does it go?

This is one of the most common questions I hear. And the wrong answer leads to:

- **Confused agents** that hallucinate because context is missing
- **Slow agents** that burn tokens on irrelevant information
- **Brittle agents** that break when you update one piece of knowledge
- **Expensive agents** that cost more than they should

The truth is: **there are four pillars** of agent context, and each serves a different purpose.

## The Concept

Every piece of knowledge in your agent system belongs to one of four pillars:

> 💡 **Key Insight**: The right pillar isn't about where it fits—it's about when and how the agent needs it.

### The Four Pillars Compared

| Aspect | Persona | Skills | RAG | MCP |
|--------|---------|--------|-----|-----|
| **Question** | WHO is the agent? | HOW to do things? | WHAT to know? | What ACTIONS to take? |
| **Content** | Identity, tone, values | Procedures, workflows | Facts, documents | Tool definitions, APIs |
| **When Loaded** | Always in prompt | At task start | Query-time retrieval | On tool invocation |
| **Token Cost** | ~500 (always) | ~1K (per task) | Variable (per query) | ~200/tool |
| **Changes** | Rarely | Occasionally | Frequently | When APIs change |

## Pillar 1: Persona 🎭

**Purpose**: Define WHO the agent IS.

The persona sets identity, communication style, and decision frameworks. It's always present in the system prompt.

**What belongs here**:
- Behavioral guidelines ("Always explain trade-offs")
- Communication style ("Frame designs as storytelling journeys")
- Decision frameworks ("Prioritize simplicity over completeness")
- Core values ("Never compromise on security")

**The difference a persona makes**:

| Without Persona | With Persona |
|-----------------|--------------|
| "Here is the architecture document." | "Here's the thing about great architecture. It doesn't start with technology. It starts with the problem worth solving." |

## Pillar 2: Skills 📚

**Purpose**: Teach HOW to do things.

Skills are modular knowledge packages that agents load on demand. They solve the context overflow problem.

**What belongs here**:
- Step-by-step procedures
- Domain-specific workflows
- Templates and examples
- Best practices for specific tasks

**Example skills**:
- `c4-diagrams`: How to create C4 architecture diagrams
- `security-design`: Security patterns and considerations
- `sequential-thinking`: Structured reasoning approach

## Pillar 3: RAG 📖

**Purpose**: Access WHAT to know—facts and documents.

RAG (Retrieval-Augmented Generation) gives agents access to external knowledge they weren't trained on.

**What belongs here**:
- Company policies and standards
- Past project documentation
- Domain-specific data
- Reference materials

## Pillar 4: MCP 🔌

**Purpose**: Connect to external ACTIONS.

MCP (Model Context Protocol) is the standardized way for agents to interact with external tools and services.

**What belongs here**:
- Database queries
- File operations
- API integrations
- External service calls

**Think of it as "USB for AI"**—a universal interface that any tool can implement.

## Decision Examples

| Scenario | Best Choice | Why |
|----------|-------------|-----|
| "Our company uses PostgreSQL, not MySQL" | **RAG** | Factual constraint that may change |
| "How to generate a C4 diagram correctly" | **Skill** | Procedural knowledge, step-by-step |
| "Always explain trade-offs" | **Persona** | Behavioral guideline |
| "Query the project database" | **MCP** | External system action |
| "List of approved vendors" | **RAG** | Document that updates periodically |
| "When to use microservices vs monolith" | **Skill** | Decision framework |
| "Frame designs as storytelling" | **Persona** | Communication style |

## The Priority Order

When content could fit in multiple places:

1. **Persona First**: If it defines WHO the agent is → Persona
2. **Skill Second**: If it's HOW to do something repeatedly → Skill
3. **RAG Third**: If it's WHAT to know (facts, data) → RAG
4. **MCP Fourth**: If it's an ACTION on external systems → MCP

## Key Takeaways

- ✅ **Persona** = Identity and behavior (always present)
- ✅ **Skills** = Procedures and workflows (loaded on demand)
- ✅ **RAG** = Facts and documents (retrieved at query time)
- ✅ **MCP** = External actions (invoked when needed)
- ✅ **Use the decision tree**: WHO → HOW → ACTION → WHAT

## What's Next

- 📖 **Previous article**: [The Orchestra: Why Multi-Agent AI Works](/Harry-the-architect/blog/the-orchestra-why-multi-agent-works/) — Why specialized agents working together outperform monolithic models
- 📖 **Next article**: Skills — Deep dive into Claude/Antigravity skill patterns
- 💬 **Discuss**: How do you organize context in your agents?
