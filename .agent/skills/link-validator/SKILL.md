---
name: link-validator
description: Validate internal links across content repository and blog, ensuring correct base paths and cross-references
---

# Link Validator Skill

This skill validates and fixes internal links across the content repository and blog to prevent broken links.

## Core Principles

### 1. Bidirectional Navigation

**Every article must have navigation to connect the series:**

| Article Position | Required Links |
|------------------|----------------|
| First article | Next article only |
| Middle articles | Previous + Next article |
| Last article | Previous article only |

**Example format:**
```markdown
## What's Next

- 📖 **Previous article**: [Title](/Harry-the-architect/blog/slug/) — Description
- 📖 **Next article**: [Title](/Harry-the-architect/blog/slug/) — Description
- 💬 **Discuss**: Discussion prompt
```

### 2. Absolute Paths with Base

All internal links must include the full base path:
- ✅ `/Harry-the-architect/blog/article-slug/`
- ❌ `/blog/article-slug/`
- ❌ `article-slug/`

### 3. Trailing Slashes Required

All URLs must end with trailing slashes for consistency with Astro configuration.

## When to Use

- Before deploying your blog to production
- After creating new articles or updating existing ones
- When changing URL structure or base paths
- To audit existing content for broken links

## Article Series & Navigation

### Current Article Series

| Order | Article | Slug | Status |
|-------|---------|------|--------|
| 1 | The Orchestra: Why Multi-Agent AI Works | `the-orchestra-why-multi-agent-works` | ✅ Published |
| 2 | The 4 Pillars: Persona, Skills, RAG, MCP | `four-pillars-persona-skills-rag-mcp` | ✅ Published |
| 3 | Skills: Progressive Context Disclosure | `skills-progressive-context-disclosure` | 📝 Planned |
| 4 | The 9 Principles of Intelligent Agents | `nine-principles-intelligent-agents` | 📝 Planned |
| 5 | Production Patterns: Resilience & Quality | `production-patterns-resilience-quality` | 📝 Planned |

### Link Recommendations

Based on the article series, here are the recommended navigation links:

#### Article 1: the-orchestra-why-multi-agent-works
```markdown
## What's Next

- 📖 **Next article**: [The 4 Pillars: Persona, Skills, RAG, MCP](/Harry-the-architect/blog/four-pillars-persona-skills-rag-mcp/) — A decision framework for what goes where
- 💬 **Discuss**: What multi-agent patterns have you tried?
```

#### Article 2: four-pillars-persona-skills-rag-mcp
```markdown
## What's Next

- 📖 **Previous article**: [The Orchestra: Why Multi-Agent AI Works](/Harry-the-architect/blog/the-orchestra-why-multi-agent-works/) — Why specialized agents working together outperform monolithic models
- 📖 **Next article**: [Skills: Progressive Context Disclosure](/Harry-the-architect/blog/skills-progressive-context-disclosure/) — Deep dive into skill patterns
- 💬 **Discuss**: How do you organize context in your agents?
```

## Validation Commands

### Find broken links
```bash
# Find links missing base path
grep -rn "](/blog/" blog/src/content/blog/

# Find all internal links
grep -rn "\[.*\](/Harry-the-architect/" blog/src/content/blog/
```

### Automated validation workflow
```bash
# 1. List all articles
ls -la blog/src/content/blog/*.md

# 2. Check each article has What's Next section
grep -l "## What's Next" blog/src/content/blog/*.md

# 3. Verify Previous/Next links exist
grep -rn "Previous article\|Next article" blog/src/content/blog/
```

## Fix Patterns

### Missing base path
```
Find:    ](/blog/
Replace: ](/Harry-the-architect/blog/
```

### Missing trailing slash
```
Find:    /blog/slug)
Replace: /blog/slug/)
```

### Add Previous article link
```markdown
- 📖 **Previous article**: [TITLE](/Harry-the-architect/blog/SLUG/) — DESCRIPTION
```

## Configuration Reference

**astro.config.mjs:**
```javascript
export default defineConfig({
  site: 'https://harrydinh.github.io',
  base: '/Harry-the-architect/',
  trailingSlash: 'always',
});
```

## Workflow: Adding New Article

When creating a new article:

1. **Create article** with correct frontmatter
2. **Add What's Next section** with:
   - Previous article link (if not first article)
   - Next article link (if exists)
   - Discussion prompt
3. **Update previous article** to add link to new article
4. **Update this skill** with new article in series table
5. **Run validation** before committing

## Related Skills

- `content-automation` - Content creation workflows
- `web-frameworks` - Astro configuration details
