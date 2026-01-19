# Tool Design

Expert guidance for implementing tool calling, function design, and MCP integrations.

## Tool Categories

| Category | Description | Control | Examples |
|----------|-------------|---------|----------|
| **Extensions** | Pre-built, platform-provided | Platform manages | Google Search, Code Execution |
| **Functions** | Custom-defined by developer | Agent/client manages | Internal APIs, custom logic |
| **Data Stores** | Retrieval from knowledge bases | Platform indexes | Vector DBs, document stores |

## Function Calling Lifecycle

```
1. DECLARE: Define function schemas with names, descriptions, parameters
2. SELECT: Agent reasons and chooses appropriate function(s)
3. INVOKE: System/client executes function with agent-provided args
4. RETURN: Results sent back to agent for next reasoning step
```

## Function Schema Best Practices

### Names
- Use clear, action-oriented names: `get_weather`, `send_email`
- Follow consistent naming: `verb_noun` pattern
- Group related functions: `calendar_list`, `calendar_create`

### Descriptions
```json
{
  "name": "search_orders",
  "description": "Search customer orders by status, date range, or customer ID. Returns order summaries with IDs for detail lookup. Use when user asks about order status, history, or needs to find specific orders."
}
```

**Include:**
- What the function does
- When to use it (triggers)
- What it returns
- Relationship to other tools

### Parameters
```json
{
  "parameters": {
    "type": "object",
    "properties": {
      "query": {
        "type": "string",
        "description": "Search query. Examples: 'pending orders', 'order #12345', 'last week orders'"
      },
      "limit": {
        "type": "integer",
        "description": "Max results to return (1-100). Default: 10",
        "minimum": 1,
        "maximum": 100
      }
    },
    "required": ["query"]
  }
}
```

## Design Principles

### 1. Build for Workflows, Not APIs

Don't just wrap endpoints. Consolidate operations:

**Bad:** Separate `check_availability` + `create_event`
**Good:** Single `schedule_meeting` that checks and books

### 2. Optimize for Limited Context

Agents have constrained context windows:
- Return high-signal info, not data dumps
- Provide `format: "concise" | "detailed"` option
- Use human-readable identifiers (names over IDs)
- Default to summary, offer expansion

### 3. Design Actionable Errors

```json
{
  "error": "Rate limit exceeded",
  "suggestion": "Wait 60 seconds and retry, or use 'limit: 10' to reduce results",
  "retry_after": 60
}
```

### 4. Use Natural Task Subdivisions

Group by how humans think about tasks:
- `email_*` for all email operations
- `calendar_*` for scheduling
- Not by backend structure

## MCP Integration Patterns

### MCP Server Structure

```typescript
// Register tool with proper annotations
server.registerTool({
  name: "search_documents",
  description: "...",
  inputSchema: { /* Zod/JSON Schema */ },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: true
  }
});
```

### Tool Annotations

| Annotation | Meaning |
|------------|---------|
| `readOnlyHint: true` | Tool only reads, doesn't modify |
| `destructiveHint: false` | Tool is safe, non-destructive |
| `idempotentHint: true` | Repeated calls have same effect |
| `openWorldHint: true` | Interacts with external systems |

### Response Formats

Provide flexible output:

```python
def get_data(query: str, format: str = "json"):
    """
    Args:
        format: Output format - 'json' for structured, 'markdown' for readable
    """
    if format == "markdown":
        return format_as_markdown(results)
    return json.dumps(results)
```

## Error Handling Patterns

### Graceful Degradation
```python
try:
    result = call_primary_api()
except APIError:
    result = call_fallback_api()
except Exception as e:
    return {"error": str(e), "suggestion": "Try with fewer parameters"}
```

### Retry with Backoff
```python
@retry(tries=3, delay=1, backoff=2)
def call_external_service():
    ...
```

## Anti-Patterns

❌ **Vague descriptions**: "Handles data operations"
✅ **Specific descriptions**: "Queries user purchase history by date range. Returns order IDs, amounts, item counts."

❌ **Massive response payloads**: Return all 10,000 records
✅ **Paginated, filtered responses**: Return 10 most relevant with pagination

❌ **Technical error messages**: "Error 500: NullPointerException"
✅ **Actionable errors**: "User not found. Verify the email address and try again."

❌ **Overlapping tools**: Multiple tools that do similar things
✅ **Clear tool boundaries**: Each tool has distinct purpose

## Tool Quality Checklist

- [ ] Description explains what, when, and returns
- [ ] Parameters have types, constraints, examples
- [ ] Required vs optional parameters clearly marked
- [ ] Error responses guide next actions
- [ ] Response size bounded (pagination, limits)
- [ ] Annotations set correctly (read-only, destructive)
- [ ] Related tools grouped with naming prefix
- [ ] Edge cases handled (empty input, invalid params)
