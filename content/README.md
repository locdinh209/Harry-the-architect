# 📦 Content Repository

> Single source of truth for all content production

## Directory Structure

```
/content
├── 📝 /articles/           # Long-form technical articles (SOURCE OF TRUTH)
├── 📹 /videos/             # YouTube scripts, timestamps, assets
├── 📢 /social/             # Platform-specific posts
│   ├── /linkedin/          # Professional network posts
│   └── /facebook/          # Community discussion posts
└── 🎨 /assets/             # Shared resources
    ├── /diagrams/          # Mermaid diagrams, visuals
    └── /templates/         # Article and post templates
```

## Content Flow

```
Article (Source) ────┬──▶ GitHub Pages (Full)
                     │
                     ├──▶ LinkedIn (Summary)
                     │
                     ├──▶ Facebook (Discussion)
                     │
                     └──▶ YouTube (Video Script)
```

## Quick Start

### 1. Create New Article

```bash
# Copy template
cp content/assets/templates/article-template.md \
   content/articles/$(date +%Y-%m-%d)-topic-slug.md
```

### 2. Generate Social Posts

Use the `content-automation` skill to transform article into platform posts.

### 3. Publish

1. Push article to `main` branch
2. GitHub Actions builds and deploys
3. Social posts generated automatically

## Naming Conventions

| Content Type | Format | Example |
|--------------|--------|---------|
| Article | `YYYY-MM-DD-slug.md` | `2026-01-18-multi-agent.md` |
| Video | `YYYY-MM-slug/` (folder) | `2026-01-multi-agent-demo/` |
| Social | `YYYY-MM-DD-slug.md` | `2026-01-18-multi-agent.md` |

## Cross-Linking

Always maintain bidirectional links:

- **In Article**: Link to YouTube video
- **In YouTube**: Link to full article
- **In Social**: Link to article

Update frontmatter with URLs after publishing each platform.

## Related

- [Content Strategy](/content-strategy.md)
- [Automation Strategy](/docs/content-automation-strategy.md)
- [Content Automation Skill](/.agent/skills/content-automation/SKILL.md)
