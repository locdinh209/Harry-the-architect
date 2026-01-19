# Artifacts

Artifacts are structured documents that communicate agent work to users.

## Location

All artifacts go in: `<appDataDir>/brain/<conversation-id>/`

## Artifact Types

### task.md

**Purpose:** Track work progress with checklist

**Format:**
```markdown
# Task Title

## Phase 1
- [x] Completed item
- [/] In progress item
- [ ] Pending item

## Phase 2
- [ ] Future work
```

**When to Create:** At task start, update throughout

---

### implementation_plan.md

**Purpose:** Document technical approach for user approval

**Format:**
```markdown
# [Goal Description]

Brief problem description and what the change accomplishes.

## User Review Required

> [!IMPORTANT]
> Breaking changes or decisions needing approval

## Proposed Changes

### [Component Name]

#### [MODIFY] [file.py](file:///path/to/file.py)
- Change description

#### [NEW] [new-file.py](file:///path/to/new-file.py)
- What this file does

## Verification Plan

### Automated Tests
- `npm test`
- Browser verification

### Manual Verification
- Steps for user to verify
```

**When to Create:** During PLANNING mode

---

### walkthrough.md

**Purpose:** Document completed work with proof

**Format:**
```markdown
# Feature Walkthrough

## Summary
What was built and why.

## Changes Made
| File | Change |
|------|--------|
| api.py | Added auth endpoint |

## Verification Results
- Tests: 12/12 passing
- Manual: Verified in browser

![Screenshot](./screenshot.png)
```

**When to Create:** During VERIFICATION mode

---

## Embedding Media

```markdown
![Caption](/absolute/path/to/image.png)
```

**Rules:**
- Use absolute paths
- Copy files to artifacts directory first
- Caption appears below image

## Best Practices

1. **Keep artifacts concise** - Under 500 lines
2. **Use tables** for structured data
3. **Link to files** with `file:///` URIs
4. **Update task.md** as work progresses
5. **Embed screenshots** in walkthroughs
