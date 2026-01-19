---
name: knowledge-graph
description: >-
  Persistent memory and knowledge graph for AI agents. Use when needing to
  remember information across conversations, building entity-relationship graphs,
  storing user preferences, tracking project context, or creating structured
  knowledge bases that persist beyond single sessions.
license: MIT
version: 1.0.0
---

# Knowledge Graph

Persistent memory system using knowledge graphs for AI agents.

## When to Use

- Remember context across conversations
- Build entity-relationship knowledge bases
- Store and retrieve user preferences
- Track project state and history
- Create structured notes and connections

## Core Concepts

### Entities
Named nodes with types:
```json
{"name": "John", "type": "person", "attributes": {"role": "developer"}}
```

### Relations
Connections between entities:
```json
{"from": "John", "to": "ProjectX", "type": "works_on"}
```

### Observations
Facts about entities:
```json
{"entity": "John", "observation": "Prefers Python over JavaScript"}
```

## MCP Server Configuration

```json
{
  "mcpServers": {
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## Available Tools (MCP)

| Tool | Purpose |
|------|---------|
| `create_entities` | Add new entities |
| `create_relations` | Connect entities |
| `add_observations` | Add facts |
| `search_nodes` | Query knowledge |
| `open_nodes` | Get entity details |
| `delete_entities` | Remove entities |

## Common Patterns

### Remember User Preference
```
create_entities: [{"name": "user", "type": "person"}]
add_observations: [{"entity": "user", "observation": "Uses dark mode"}]
```

### Track Project Context
```
create_entities: [{"name": "CurrentProject", "type": "project"}]
create_relations: [{"from": "CurrentProject", "to": "FastAPI", "type": "uses"}]
```

### Query Knowledge
```
search_nodes: {"query": "user preferences"}
```

## Best Practices

1. **Use consistent entity names:** Normalize naming
2. **Define entity types:** person, project, concept, tool
3. **Add observations incrementally:** Build over time
4. **Search before creating:** Avoid duplicates
5. **Clean up stale data:** Remove outdated entities

## Use Cases

| Use Case | Implementation |
|----------|----------------|
| User preferences | Store as observations |
| Project context | Entities + relations |
| Conversation memory | Time-stamped observations |
| Code relationships | Module → function relations |

## Workflow Checklist

Copy and track progress:
```
Knowledge Graph Task:
- [ ] Search existing entities
- [ ] Create/update entities
- [ ] Define relationships
- [ ] Add observations
- [ ] Verify knowledge stored
```

## Resources

- **MCP Server:** https://github.com/modelcontextprotocol/servers/tree/main/src/memory
- **Knowledge Graphs:** https://en.wikipedia.org/wiki/Knowledge_graph
