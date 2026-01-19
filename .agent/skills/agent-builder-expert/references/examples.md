# Examples

Practical agent implementations and templates.

## Example 1: Customer Support Agent

A Level 2 agent (Strategic Problem-Solver) handling order inquiries.

### Agent Configuration

```yaml
name: customer-support-agent
model: claude-3-5-sonnet
tools:
  - search_orders
  - get_order_details
  - get_tracking_info
  - create_support_ticket
```

### Execution Trace

**User:** "Where is my order #12345?"

```
Thought: User wants order status. I need to:
  1. Verify the order exists
  2. Get tracking information
  3. Provide clear status update

Action: get_order_details(order_id="12345")
Observation: {
  "order_id": "12345",
  "status": "shipped",
  "carrier": "FedEx",
  "tracking": "789456123"
}

Thought: Order is shipped. Get live tracking.

Action: get_tracking_info(carrier="FedEx", tracking="789456123")
Observation: {
  "status": "In Transit",
  "location": "Chicago, IL",
  "estimated_delivery": "2024-01-15"
}

Thought: I have all the info. Synthesize response.

Response: "Your order #12345 is on its way! It's currently in Chicago, IL
           and should arrive by January 15th. Track it here: [FedEx link]"
```

---

## Example 2: Research Assistant Agent

A Level 2 agent performing multi-source research.

### Agent Configuration

```yaml
name: research-assistant
model: claude-3-5-sonnet
tools:
  - web_search
  - read_document
  - summarize_text
  - save_notes
```

### Execution Trace

**User:** "What are the latest developments in quantum computing?"

```
Thought: This is a research task. I'll:
  1. Search for recent news/papers
  2. Read top sources
  3. Synthesize findings

Action: web_search(query="quantum computing breakthroughs 2024", limit=5)
Observation: [
  {title: "IBM announces 1000-qubit processor", url: "..."},
  {title: "Google achieves error correction milestone", url: "..."},
  ...
]

Thought: Found relevant sources. Read top 2 for details.

Action: read_document(url="ibm-announcement-url")
Observation: "IBM unveiled the Condor processor with 1,121 qubits..."

Action: read_document(url="google-error-correction-url")
Observation: "Google demonstrated quantum error correction below threshold..."

Thought: Have key info from major players. Synthesize.

Response: "Recent quantum computing highlights:

1. **IBM Condor** (Dec 2024): 1,121-qubit processor
2. **Google Error Correction**: First below-threshold demonstration
3. **Hardware Focus**: Shift from qubit count to error rates

Sources: [IBM], [Google]"
```

---

## Example 3: Code Review Agent

Trajectory-based evaluation example.

### Evaluation Scenario

```xml
<qa_pair>
  <question>Review this Python function for issues:
    def get_user(id):
      return db.query(f"SELECT * FROM users WHERE id={id}")
  </question>
  <answer>SQL injection vulnerability, missing type hints, no error handling</answer>
</qa_pair>
```

### Trajectory Evaluation

| Step | Action | Score | Notes |
|------|--------|-------|-------|
| 1 | Read code | ✓ | Correctly identified function |
| 2 | Identify SQL injection | ✓ | Critical issue found |
| 3 | Note missing types | ✓ | Good practice identified |
| 4 | Suggest fixes | ✓ | Provided parameterized query |

**Trajectory Score:** 4/4 steps correct

---

## Agent Design Template

Use this template when designing a new agent.

### 1. Define the Agent

```yaml
# Agent Specification
name: [agent-name]
purpose: [one-line description]
level: [0-4, from taxonomy]

# Success Criteria
primary_goal: [what success looks like]
constraints:
  - [max latency]
  - [max tokens]
  - [safety requirements]
```

### 2. Define Tools

```yaml
tools:
  - name: [tool_name]
    purpose: [when to use this tool]
    inputs: [key parameters]
    outputs: [what it returns]
```

### 3. Define Orchestration

```yaml
pattern: [ReAct | Plan-and-Execute | Custom]

termination_conditions:
  - [goal achieved]
  - [max steps reached]
  - [error threshold exceeded]

error_handling:
  - [retry strategy]
  - [fallback approach]
```

### 4. Define Evaluation

```yaml
test_scenarios:
  - name: [scenario name]
    input: [test input]
    expected: [expected output/behavior]
    
metrics:
  - success_rate: [target %]
  - latency_p99: [target ms]
  - cost_per_task: [target $]
```

---

## Quick Start Checklist

New agent project:

1. [ ] Define clear, measurable goal
2. [ ] Choose appropriate agent level (0-4)
3. [ ] List required tools
4. [ ] Select orchestration pattern
5. [ ] Create 10+ evaluation scenarios
6. [ ] Implement basic version
7. [ ] Run evaluations
8. [ ] Iterate based on results
9. [ ] Add error handling
10. [ ] Deploy with monitoring
