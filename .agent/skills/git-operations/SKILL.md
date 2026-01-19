---
name: git-operations
description: >-
  Read, search, and manipulate Git repositories. Use when viewing commit history,
  creating branches, staging changes, viewing diffs, searching commit messages,
  understanding repository structure, or performing Git operations programmatically.
  Supports local repositories and integration with GitHub/GitLab.
license: MIT
version: 1.0.0
---

# Git Operations

Git repository manipulation for AI agents.

## When to Use

- Viewing commit history and diffs
- Understanding repository structure
- Searching through commits
- Creating branches and commits
- Staging and reviewing changes
- Git blame and file history

## Quick Reference

| Operation | Tool/Command |
|-----------|--------------|
| View history | `git log` |
| Show diff | `git diff` |
| Search commits | `git log --grep` |
| File history | `git log -- file` |
| Blame | `git blame` |
| Branch ops | `git branch/checkout` |

## Common Patterns

### View Recent Commits
```bash
git log -n 10 --oneline
```

### Search Commit Messages
```bash
git log --grep="fix" --oneline
```

### View File History
```bash
git log --follow -p -- path/to/file
```

### Show Diff Between Branches
```bash
git diff main..feature-branch
```

### Git Blame with Context
```bash
git blame -L 10,20 path/to/file
```

### Find Who Changed a Line
```bash
git log -S "search_string" --oneline
```

## MCP Server Configuration

```json
{
  "mcpServers": {
    "git": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-git"]
    }
  }
}
```

## Available Tools (MCP)

| Tool | Purpose |
|------|---------|
| `git_status` | Repository status |
| `git_log` | Commit history |
| `git_diff` | Changes between refs |
| `git_show` | Commit details |
| `git_branch` | Branch operations |

## Best Practices

1. **Use `--oneline`** for compact output
2. **Limit results** with `-n` flag
3. **Use `--follow`** for renamed files
4. **Search with `-S`** for code archeology
5. **Prefer non-destructive** operations

## Workflow Checklist

Copy and track progress:
```
Git Analysis Task:
- [ ] Identify target repository
- [ ] Check current status (git status)
- [ ] View relevant history (git log)
- [ ] Examine specific changes (git diff/show)
- [ ] Document findings
```

## Resources

- **MCP Server:** https://github.com/modelcontextprotocol/servers/tree/main/src/git
- **Git Docs:** https://git-scm.com/docs
