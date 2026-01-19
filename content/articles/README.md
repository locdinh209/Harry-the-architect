# 📝 Articles

> Source of truth for all long-form technical content

## Naming Convention

```
YYYY-MM-DD-topic-slug.md
```

Example: `2026-01-18-multi-agent-architecture.md`

## Frontmatter Template

```yaml
---
title: "Article Title"
date: 2026-01-18
author: Harry Dinh
tags: [multi-agent, architecture, ai]
status: draft | review | published
youtube: null  # Link to related video
linkedin: null # Link to LinkedIn post
facebook: null # Link to Facebook post
---
```

## Article Lifecycle

```
draft → review → published
  │        │         │
  └────────┴─────────┴──▶ Triggers social post generation
```

## Quick Start

1. Copy template from `/content/assets/templates/article-template.md`
2. Fill in frontmatter
3. Write content following the structure
4. Generate social posts using content-automation skill
5. Update frontmatter with cross-links after publishing
