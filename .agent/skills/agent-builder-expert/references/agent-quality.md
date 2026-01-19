# Agent Quality

Framework for evaluating, testing, and ensuring AI agent reliability.

## Why Agent Quality is Different

Traditional software: Deterministic, testable with unit tests
AI Agents: Non-deterministic, multi-step, tool-using, evolving

**Key challenges:**
- Same input can produce different outputs
- Errors compound across reasoning steps
- Tool interactions add failure points
- "Correct" is often subjective

## Quality Pillars

| Pillar | Definition | Key Metrics |
|--------|------------|-------------|
| **Correctness** | Agent achieves intended goal | Task success rate, output accuracy |
| **Reliability** | Consistent performance over time | Error recovery rate, consistency |
| **Efficiency** | Resource-conscious execution | Latency, token usage, cost/task |
| **Safety** | Operates within defined bounds | Guardrail compliance, harm prevention |

## Evaluation Strategies

### End-to-End Evaluation (Black Box)

Test final output only, ignore internal reasoning:

```
Input: "What's the weather in Paris?"
Expected: Contains temperature, conditions for Paris
Actual: "Paris is currently 18°C and sunny"
Result: PASS ✓
```

**Pros:** Simple, mirrors user experience
**Cons:** No insight into reasoning failures

### Trajectory Evaluation (Glass Box)

Examine the full reasoning chain:

```
Step 1: Thought="Need weather API" → Good reasoning
Step 2: Action=get_weather(city="Paris") → Correct tool
Step 3: Observation={"temp": 18, "cond": "sunny"} → Valid data
Step 4: Response="Paris is 18°C and sunny" → Accurate synthesis
```

**Pros:** Diagnose where failures occur
**Cons:** More complex, requires logging

## Evaluator Types

### 1. Automated Metrics

Deterministic, fast, limited scope:

| Metric | What It Measures |
|--------|------------------|
| Latency | Time to complete task |
| Token Usage | Context efficiency |
| Tool Call Count | Efficiency of reasoning |
| Success Rate | % of tasks completed correctly |
| Error Rate | % of tasks with failures |

### 2. LLM-as-Judge

Use another LLM to evaluate output quality:

```python
judge_prompt = """
Evaluate this agent response on a scale of 1-5:

User Query: {query}
Agent Response: {response}

Criteria:
- Accuracy: Is the information correct?
- Completeness: Does it fully answer the question?
- Clarity: Is it easy to understand?

Provide score and reasoning.
"""
```

**Best for:** Subjective quality, nuanced evaluation

### 3. Agent-as-Judge

A dedicated evaluator agent that:
- Uses tools to verify claims
- Checks sources for accuracy
- Validates reasoning steps

**Best for:** Deep verification, fact-checking

### 4. Human-in-the-Loop (HITL)

Expert human review for:
- Edge cases
- High-stakes decisions
- Training data curation
- Evaluation calibration

## Testing Patterns

### Unit Testing (Tool Level)
```python
def test_weather_tool():
    result = get_weather("Paris")
    assert "temp" in result
    assert isinstance(result["temp"], (int, float))
```

### Integration Testing (Agent Level)
```python
def test_weather_agent():
    response = agent.run("What's the weather in Paris?")
    assert "Paris" in response
    assert any(word in response for word in ["°C", "°F", "degrees"])
```

### End-to-End Testing (System Level)
```python
def test_full_workflow():
    # Simulate realistic user interaction
    result = system.process("Plan a trip to Paris next week")
    assert result.status == "completed"
    assert "itinerary" in result.output
```

### Chaos Testing
Deliberately inject failures:
- API timeouts
- Invalid responses
- Rate limiting
- Partial data

## Building an Evaluation Suite

### 10+ Scenarios Rule

Create at least 10 diverse test cases:

```xml
<evaluation>
  <qa_pair>
    <question>Find orders over $100 from last month</question>
    <answer>Order #123 ($150), Order #456 ($200)</answer>
  </qa_pair>
  <!-- 9 more diverse scenarios... -->
</evaluation>
```

### Scenario Diversity

Include:
- Happy path (normal usage)
- Edge cases (empty results, max limits)
- Error conditions (invalid input)
- Complex multi-step tasks
- Ambiguous requests

## Quality Metrics Dashboard

Track over time:

| Metric | Target | Current | Trend |
|--------|--------|---------|-------|
| Success Rate | >95% | 92% | ↑ |
| Avg Latency | <3s | 2.4s | → |
| Token/Task | <2000 | 1800 | ↓ |
| Error Recovery | >80% | 75% | ↑ |

## Anti-Patterns

❌ **Testing only happy path** → Misses edge cases
❌ **Manual testing only** → Doesn't scale
❌ **No baseline metrics** → Can't track improvement
❌ **Ignoring trajectory** → Can't diagnose issues
❌ **Static test set** → Model drift undetected

## Quality Checklist

- [ ] Defined success criteria for each task type
- [ ] 10+ evaluation scenarios covering diversity
- [ ] Automated metrics pipeline
- [ ] LLM-as-Judge for subjective quality
- [ ] Trajectory logging enabled
- [ ] Baseline metrics established
- [ ] Regular evaluation runs scheduled
- [ ] Human review for edge cases
