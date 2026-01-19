# Agent Skills

Skills extend Antigravity's capabilities for specialized domains.

## Skill Structure

```
my-skill/
├── SKILL.md           # Required - entry point
├── references/        # Optional - detailed guides
│   ├── guide-a.md
│   └── guide-b.md
└── scripts/           # Optional - utility scripts
    └── helper.py
```

## SKILL.md Format

```yaml
---
name: my-skill
description: >-
  What the skill does and when to use it. Include keywords
  that trigger activation. Use when [specific scenarios].
license: MIT
version: 1.0.0
---

# Skill Title

Brief overview.

## When to Use

- Scenario 1
- Scenario 2

## Quick Reference

| Topic | Reference |
|-------|-----------|
| Guide A | [guide-a.md](references/guide-a.md) |

## Core Instructions

Main guidance here.
```

## Best Practices

1. **Concise SKILL.md:** Under 500 lines
2. **Progressive disclosure:** Link to references
3. **Specific description:** Include "what" and "when"
4. **Hyphen-case naming:** `my-skill` not `mySkill`
5. **Forward slashes:** No Windows paths

## Creating a New Skill

```bash
mkdir -p .agent/skills/new-skill/references
```

Then create `SKILL.md` with YAML frontmatter.

## Skill Discovery

Skills are discovered by description keywords. Include:
- Domain terms (e.g., "PDF", "authentication")
- Action words (e.g., "convert", "build", "debug")
- Technology names (e.g., "React", "FastAPI")
