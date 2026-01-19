# 📹 Videos

> YouTube video scripts, timestamps, and assets

## Directory Structure

Each video gets its own folder:

```
/videos
├── 2026-01-multi-agent-demo/
│   ├── script.md           # Full video script with timing
│   ├── timestamps.md       # Chapter markers for YouTube
│   ├── thumbnail.png       # Video thumbnail (1280x720)
│   ├── description.md      # YouTube description text
│   └── assets/             # B-roll, slides, etc.
└── ...
```

## Script Template

```markdown
# [Video Title]

**Duration**: ~10 min
**Related Article**: /articles/YYYY-MM-DD-topic.md

## Hook (0:00 - 0:30)
[Attention-grabbing opening]

## Problem (0:30 - 2:00)
[Why this matters]

## Solution (2:00 - 6:00)
[Main content]

## Demo (6:00 - 9:00)
[Live walkthrough]

## CTA (9:00 - 10:00)
[Call to action]
```

## Timestamps Format

```markdown
0:00 - Intro
0:30 - The Problem
2:00 - Solution Overview
4:00 - Deep Dive
6:00 - Live Demo
9:00 - Summary & Next Steps
```

## Workflow

1. Create article first (or use video as source)
2. Generate script from article
3. Record video
4. Upload to YouTube with timestamps
5. Cross-link in article
