# MCP Integration

Model Context Protocol (MCP) servers extend Antigravity with external tools.

## Available MCP Tools

Check available tools by examining the system prompt or calling:
```python
mcp_vibe-hub_vibe_list_tools()
```

## Common MCP Servers

| Server | Purpose | Example Tools |
|--------|---------|---------------|
| `chrome-devtools` | Browser automation | `click`, `fill`, `take_screenshot` |
| `docling` | Document processing | `convert_document`, `export_to_markdown` |
| `context7` | Documentation lookup | `resolve-library-id`, `query-docs` |
| `sequential-thinking` | Structured reasoning | `sequentialthinking` |
| `vibe-hub` | AWS/Cloud operations | `aws-s3_list_buckets`, `aws-ec2_describe` |

## Using MCP Tools

```python
# Chrome DevTools - Take screenshot
mcp_chrome-devtools_take_screenshot()

# Docling - Convert PDF
mcp_docling_convert_document_into_docling_document(
    source="/path/to/document.pdf"
)

# Context7 - Query docs
mcp_context7_resolve-library-id(
    libraryName="nextjs",
    query="app router setup"
)
```

## Browser Automation Pattern

```python
# 1. Navigate
mcp_chrome-devtools_navigate_page(
    type="url",
    url="http://localhost:3000"
)

# 2. Take snapshot (understand page)
mcp_chrome-devtools_take_snapshot()

# 3. Interact
mcp_chrome-devtools_click(uid="submit-button")
mcp_chrome-devtools_fill(uid="email-input", value="test@example.com")

# 4. Screenshot for proof
mcp_chrome-devtools_take_screenshot(
    filePath="/path/to/artifacts/screenshot.png"
)
```

## Best Practices

1. **Use browser_subagent** for complex browser tasks
2. **Take snapshots** before interacting
3. **Save screenshots** to artifacts directory
4. **Handle errors** gracefully
5. **Check tool availability** before assuming
