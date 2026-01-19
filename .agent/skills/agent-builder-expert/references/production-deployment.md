# Production Deployment

Guidance for deploying AI agents from prototype to production.

## The Prototype-to-Production Gap

Common failure modes when scaling:

| Prototype | Production Reality |
|-----------|-------------------|
| Single user | Thousands concurrent |
| Happy path only | Every edge case |
| Infinite tokens | Cost constraints |
| Manual monitoring | 24/7 automation |
| "It works for me" | Works for everyone |

## Production Readiness Checklist

### Performance
- [ ] Latency targets defined and met (<3s typical)
- [ ] Token budgets enforced per request
- [ ] Concurrent request handling tested
- [ ] Cold start optimized (if serverless)

### Reliability
- [ ] All error paths handled with fallbacks
- [ ] Retry logic with exponential backoff
- [ ] Circuit breakers for external dependencies
- [ ] Graceful degradation when services fail

### Observability
- [ ] Structured logging for all actions
- [ ] Metrics dashboard (latency, errors, costs)
- [ ] Alerts configured for anomalies
- [ ] Trace IDs for request debugging

### Security
- [ ] Input validation and sanitization
- [ ] Prompt injection defenses
- [ ] Access control for tools/data
- [ ] Secrets management (no hardcoded keys)

## AgentOps Principles

### Logging Strategy

Log at key decision points:

```python
logger.info("Agent started", extra={
    "user_id": user_id,
    "task": task_description,
    "trace_id": trace_id
})

logger.info("Tool call", extra={
    "tool": tool_name,
    "args": sanitized_args,
    "trace_id": trace_id
})

logger.info("Agent completed", extra={
    "success": success,
    "steps": step_count,
    "tokens_used": total_tokens,
    "trace_id": trace_id
})
```

### Tracing

Enable end-to-end request tracing:

```
Request → Agent → Tool 1 → Tool 2 → Response
   │         │        │        │        │
   └─────────┴────────┴────────┴────────┘
              All share trace_id
```

### Key Metrics to Track

| Metric | Why It Matters | Target |
|--------|---------------|--------|
| P99 Latency | User experience | <5s |
| Error Rate | Reliability | <1% |
| Token/Request | Cost control | <3000 |
| Success Rate | Effectiveness | >95% |
| Cost/Request | Budget | <$0.10 |

## Scaling Strategies

### Horizontal Scaling

Add more instances:
- Stateless agent design
- External state storage (Redis, DB)
- Load balancer distribution

### Async Processing

For long-running tasks:
```
Request → Queue → Worker → Callback/Webhook
    └── Return job_id immediately
```

### Caching

Cache at multiple levels:
- **Prompt cache**: Reuse system prompts
- **Response cache**: Identical queries
- **Tool cache**: Repeated API calls

## Cost Management

### Token Budgeting

```python
MAX_TOKENS_PER_REQUEST = 4000
MAX_TOKENS_PER_DAY_PER_USER = 50000

def check_budget(user_id, estimated_tokens):
    if estimated_tokens > MAX_TOKENS_PER_REQUEST:
        raise TokenLimitExceeded("Request too large")
    if get_daily_usage(user_id) + estimated_tokens > MAX_TOKENS_PER_DAY:
        raise TokenLimitExceeded("Daily limit reached")
```

### Cost Optimization

1. **Use appropriate model size** - Haiku for simple, Opus for complex
2. **Cache aggressively** - Repeated queries are free
3. **Batch where possible** - Reduce per-call overhead
4. **Prune context** - Don't carry full history
5. **Set hard limits** - Kill runaway agents

## Error Handling Patterns

### Categorize Errors

| Type | Retry? | User Action |
|------|--------|-------------|
| Transient (429, 503) | Yes | Wait and retry |
| Client (400, 401) | No | Fix request |
| Server (500) | Maybe | Fallback or fail |
| Timeout | Yes | Retry with smaller request |

### Graceful Degradation

```python
def get_answer(query):
    try:
        return full_agent.run(query)  # Best: Full agent
    except AgentError:
        return simple_llm.complete(query)  # Fallback: Direct LLM
    except LLMError:
        return cached_faq.lookup(query)  # Last resort: FAQ
```

## Security Considerations

### Prompt Injection Defense

```python
def sanitize_input(user_input):
    # Remove potential instruction overrides
    dangerous_patterns = ["ignore previous", "system:", "###"]
    for pattern in dangerous_patterns:
        if pattern.lower() in user_input.lower():
            raise SecurityError("Potentially malicious input")
    return user_input
```

### Tool Access Control

```python
def check_tool_permission(user, tool_name):
    user_role = get_user_role(user)
    allowed_tools = ROLE_TOOL_MAP.get(user_role, [])
    if tool_name not in allowed_tools:
        raise PermissionDenied(f"User cannot access {tool_name}")
```

## Deployment Anti-Patterns

❌ **No rate limiting** → Cost explosion, DDoS vulnerability
❌ **Logging PII** → Privacy violations
❌ **Unbounded retries** → Resource exhaustion
❌ **Sync long tasks** → Timeout failures
❌ **Hardcoded configs** → Deployment nightmares

## Go-Live Checklist

- [ ] Load testing completed (2x expected traffic)
- [ ] Runbook documented for common issues
- [ ] Rollback plan defined and tested
- [ ] On-call rotation established
- [ ] Cost alerts configured
- [ ] Gradual rollout plan (canary/feature flags)
