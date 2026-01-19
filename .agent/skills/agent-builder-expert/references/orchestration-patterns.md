# Orchestration Patterns

Strategies for coordinating agent reasoning, planning, and multi-agent systems.

## Single-Agent Patterns

### ReAct (Reasoning + Acting)

The foundational agentic loop pattern:

```
Thought: I need to find the user's recent orders
Action: search_orders(user_id="123", limit=5)
Observation: [Order #456, #457, #458...]
Thought: I found 5 orders. User asked about the latest one.
Action: get_order_details(order_id="458")
Observation: {status: "shipped", tracking: "..."}
Thought: I have all the info. Ready to respond.
Answer: Your latest order #458 shipped yesterday...
```

**When to use:** Most general-purpose agents, tool-using tasks.

### Chain-of-Thought (CoT)

Explicit step-by-step reasoning before action:

```
Let me break this down:
1. First, I need to identify the customer
2. Then, check their order history
3. Finally, look up the specific product

Starting with step 1...
```

**When to use:** Complex reasoning, math, multi-step logic.

### Plan-and-Execute

Upfront planning before any execution:

```
Plan:
1. Get customer profile → 2. Fetch orders → 3. Filter by date → 4. Summarize

Executing plan...
Step 1: get_customer_profile(id="123") ✓
Step 2: list_orders(customer_id="123") ✓
...
```

**When to use:** Predictable multi-step workflows, when order matters.

## Planning Strategies

### Sequential Planning
Execute steps one at a time, wait for results:
```
Step 1 → Result 1 → Step 2 → Result 2 → ...
```
**Use when:** Each step depends on previous results.

### Parallel Planning
Execute independent steps concurrently:
```
     ┌→ Step 1
Start ├→ Step 2 → All Complete → Final
     └→ Step 3
```
**Use when:** Steps are independent, speed matters.

### Dynamic Replanning
Revise plan based on new information:
```
Original Plan: A → B → C
After A: New info suggests D is better
Revised Plan: A → D → E
```
**Use when:** High uncertainty, exploration tasks.

## Multi-Agent Patterns

### Supervisor Pattern

One coordinator agent delegates to specialists:

```
┌─────────────┐
│ Supervisor  │ ← Receives user request
└─────┬───────┘
      │ delegates
  ┌───┴───┬───────┐
  ▼       ▼       ▼
┌───┐   ┌───┐   ┌───┐
│ A │   │ B │   │ C │  ← Specialist agents
└───┘   └───┘   └───┘
```

**Supervisor responsibilities:**
- Parse goals into sub-tasks
- Route to appropriate specialist
- Aggregate and synthesize results

### Peer-to-Peer Pattern

Agents communicate directly without central coordinator:

```
Agent A ←→ Agent B
    ↕         ↕
Agent C ←→ Agent D
```

**Use when:** Collaborative problem-solving, negotiation.

### Hierarchical Pattern

Multi-level delegation with sub-coordinators:

```
     Top Supervisor
      /          \
  Manager A    Manager B
   /    \        /    \
Agent  Agent  Agent  Agent
```

**Use when:** Very complex tasks requiring deep specialization.

## State Management

### Working Memory (Short-term)
- Current session context
- Recent tool results
- Active plan state
- Expires with session

### Long-term Memory
- Cross-session persistence
- User preferences
- Historical interactions
- Requires explicit storage (DB, files)

### Checkpointing
Save state at key points for recovery:
```python
def execute_with_checkpoints(plan):
    for i, step in enumerate(plan):
        result = execute(step)
        save_checkpoint(i, result)  # Recovery point
        if failed(result):
            return recover_from(i)
```

## Error Recovery Patterns

### Retry with Backoff
```
Attempt 1: Failed → Wait 1s
Attempt 2: Failed → Wait 2s
Attempt 3: Failed → Wait 4s
Attempt 4: Success!
```

### Fallback Strategy
```python
try:
    result = primary_tool(args)
except ToolError:
    result = fallback_tool(args)  # Alternate approach
except Exception:
    result = graceful_failure_message()
```

### Self-Correction
Agent detects and fixes own errors:
```
Observation: Tool returned error "invalid date format"
Thought: I used MM/DD/YYYY but the tool expects YYYY-MM-DD
Action: Retry with corrected format...
```

## Orchestration Anti-Patterns

❌ **No termination condition** → Infinite loops
❌ **Unbounded retries** → Resource exhaustion
❌ **Silent failures** → User confusion
❌ **Monolithic agents** → Context overflow
❌ **Over-delegation** → Coordination overhead

## Choosing the Right Pattern

| Use Case | Recommended Pattern |
|----------|---------------------|
| Simple Q&A with tools | ReAct |
| Complex reasoning | Chain-of-Thought |
| Multi-step workflow | Plan-and-Execute |
| Parallelizable tasks | Parallel Planning |
| Domain specialists needed | Supervisor + Workers |
| Dynamic exploration | Dynamic Replanning |

## Orchestration Checklist

- [ ] Clear termination conditions defined
- [ ] Maximum iterations/retries bounded
- [ ] Error handling at each step
- [ ] Progress observable (logging)
- [ ] State recoverable (checkpoints)
- [ ] Resource limits enforced (tokens, time)
