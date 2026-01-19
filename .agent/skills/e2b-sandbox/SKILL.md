---
name: e2b-sandbox
description: >-
  Execute code in secure cloud sandboxes using E2B. Use when running untrusted
  code, testing code generation output, creating isolated execution environments,
  running data analysis scripts, or needing ephemeral compute resources without
  local installation. Supports Python, JavaScript, TypeScript, and custom containers.
license: MIT
version: 1.0.0
---

# E2B Sandbox

Run code in secure, isolated cloud sandboxes. Perfect for:
- Executing AI-generated code safely
- Testing without local environment pollution
- Running untrusted or experimental code
- Data analysis with pre-installed packages

## When to Use

- Need to run code that might be unsafe
- Testing code generation output
- Want isolated environment (no local side effects)
- Running compute-heavy tasks
- Need specific runtime without local setup

## Quick Start

### Via MCP Server
```json
{
  "mcpServers": {
    "e2b": {
      "command": "npx",
      "args": ["-y", "@e2b/mcp-server"],
      "env": {
        "E2B_API_KEY": "your-api-key"
      }
    }
  }
}
```

### Direct SDK Usage
```python
from e2b_code_interpreter import Sandbox

with Sandbox() as sandbox:
    result = sandbox.run_code("print('Hello from sandbox!')")
    print(result.logs.stdout)
```

## Available Sandboxes

| Sandbox | Pre-installed | Use Case |
|---------|---------------|----------|
| `code-interpreter` | Python, numpy, pandas | Data analysis |
| `base` | Minimal | Custom setups |
| Custom | User-defined | Specific needs |

## Key Features

- **Ephemeral:** Sandboxes are destroyed after use
- **Isolated:** No access to host system
- **Fast:** Sub-second startup
- **Persistent:** Optional filesystem persistence
- **Timeout:** Automatic cleanup after timeout

## Common Patterns

### Execute Python
```python
sandbox.run_code("""
import pandas as pd
df = pd.DataFrame({'a': [1,2,3]})
print(df.describe())
""")
```

### Install Packages
```python
sandbox.run_code("!pip install requests")
```

### File Operations
```python
sandbox.files.write("/tmp/data.txt", "content")
content = sandbox.files.read("/tmp/data.txt")
```

## Best Practices

1. **Set timeouts:** Prevent runaway processes
2. **Use templates:** Pre-bake common dependencies
3. **Handle errors:** Sandbox failures are possible
4. **Clean up:** Sandboxes auto-destruct but verify

## Workflow Checklist

Copy and track progress:
```
Sandbox Task:
- [ ] Configure E2B API key
- [ ] Create sandbox instance
- [ ] Run code in sandbox
- [ ] Capture output/results
- [ ] Handle any errors
- [ ] Verify sandbox cleanup
```

## Resources

- **Docs:** https://e2b.dev/docs
- **MCP Server:** https://github.com/e2b-dev/mcp-server
- **API Key:** https://e2b.dev/dashboard
