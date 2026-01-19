# 📊 Diagrams

> Mermaid diagrams and visual assets

## Diagram Types

| Type | Use Case | Mermaid Syntax |
|------|----------|----------------|
| Flowchart | Processes, workflows | `graph TD` or `graph LR` |
| Sequence | Interactions, APIs | `sequenceDiagram` |
| Class | Relationships, structures | `classDiagram` |
| Mindmap | Concept maps | `mindmap` |
| Timeline | Roadmaps, history | `timeline` |

## Example: Flowchart

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action 1]
    B -->|No| D[Action 2]
    C --> E[End]
    D --> E
```

## Example: Sequence Diagram

```mermaid
sequenceDiagram
    participant U as User
    participant A as Agent
    participant T as Tool
    
    U->>A: Request
    A->>T: Execute
    T-->>A: Result
    A-->>U: Response
```

## Rendering

Diagrams are rendered automatically in:
- GitHub Pages (Astro with mermaid plugin)
- README files (GitHub native support)
- Markdown preview in VSCode

## Storage

- **Source**: Keep `.mmd` files for complex diagrams
- **Rendered**: Export PNG for social media sharing
- **Embedded**: Use inline mermaid blocks in articles
