# Agent Fundamentals

Core concepts for understanding and building AI agents.

## What is an AI Agent?

An AI agent is a system that uses an LLM as its reasoning engine to:
- **Autonomously** decide what actions to take
- **Execute** actions via tools in an environment
- **Observe** outcomes and adapt behavior
- **Persist** toward achieving a defined goal

Key distinction: Agents act autonomously in loops; chatbots respond once per turn.

## Agent Taxonomy (5 Levels)

### Level 0: Core Reasoning System

- Pure LLM with no external tools
- Single-turn question answering
- Relies solely on trained knowledge
- Example: Direct chat completion

### Level 1: Connected Problem-Solver

- Access to single knowledge source or tool
- Basic RAG (retrieval-augmented generation)
- Simple action execution (one tool call)
- Example: FAQ bot with document retrieval

### Level 2: Strategic Problem-Solver

- Multi-tool access with planning capability
- Decides which tools to use and in what order
- Multi-step reasoning and execution
- Example: Research agent querying multiple APIs

### Level 3: Collaborative Multi-Agent System

- Multiple specialized agents coordinating
- Delegation and task decomposition
- Shared context or message passing
- Example: Supervisor agent orchestrating workers

### Level 4: Self-Evolving System

- Learns from experience across sessions
- Adapts strategies based on outcomes
- May modify own prompts or tool usage
- Example: Agent with feedback-driven improvement

## The Agentic Loop

```
┌─────────────────────────────────────────────────┐
│  1. MISSION: Receive goal from user             │
├─────────────────────────────────────────────────┤
│  2. SCENE: Gather environment context           │
├─────────────────────────────────────────────────┤
│  3. THINK: Reason, plan next action             │
│     - Analyze mission against current state     │
│     - Devise strategy (chain of reasoning)      │
│     - Select appropriate tool                   │
├─────────────────────────────────────────────────┤
│  4. ACT: Execute via tool call                  │
│     - Invoke API, run code, query database      │
│     - Pass structured parameters                │
├─────────────────────────────────────────────────┤
│  5. OBSERVE: Process results, update state      │
│     - Add outcome to memory/context             │
│     - Return to THINK if goal not complete      │
└─────────────────────────────────────────────────┘
```

## Core Architecture Components

### Model (The "Brain")

The LLM that processes information and makes decisions:
- Understands natural language goals
- Plans multi-step approaches
- Selects tools based on context
- Synthesizes information into responses

**Tips:**
- Match model capability to task complexity
- Use stronger models for planning, lighter for execution
- Consider cost/latency tradeoffs

### Tools (The "Hands")

Mechanisms for agents to interact with the world:

| Tool Type | Purpose | Example |
|-----------|---------|---------|
| **Extensions** | Pre-built, platform-provided | Google Search, Code Execution |
| **Functions** | Custom-defined by developer | Internal APIs, business logic |
| **Data Stores** | RAG knowledge retrieval | Vector DBs, document stores |

### Orchestration (The Coordinator)

Manages the agentic loop and state:
- Controls flow between think/act/observe
- Maintains working memory (session context)
- Handles error recovery and retries
- May coordinate multiple sub-agents

## Agent vs. Workflow

| Aspect | Workflow | Agent |
|--------|----------|-------|
| Control Flow | Predetermined | Dynamic, LLM-driven |
| Flexibility | Low | High |
| Predictability | High | Lower |
| Use Case | Known, repeatable tasks | Complex, variable tasks |

**Guidance:** Start with structured workflows, add agency when needed.

## Key Design Trade-offs

1. **Autonomy vs. Control** - More freedom = less predictability
2. **Capability vs. Cost** - More tools = more tokens = higher cost
3. **Persistence vs. Privacy** - Memory helps but risks data exposure
4. **Speed vs. Quality** - More reasoning = better results = slower

## Common Failure Modes

- **Goal drift**: Agent loses focus on original objective
- **Infinite loops**: No termination condition triggered
- **Tool confusion**: Selects wrong tool for the task
- **Context overflow**: Exceeds token limits mid-task
- **Hallucinated actions**: Claims to do things it didn't do

## Getting Started Checklist

1. [ ] Define clear, measurable goal for the agent
2. [ ] Identify required tools and data sources
3. [ ] Choose appropriate model for task complexity
4. [ ] Design orchestration with explicit termination
5. [ ] Implement error handling and fallbacks
6. [ ] Create evaluation scenarios before building
