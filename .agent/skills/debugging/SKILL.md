---
name: debugging
description: >-
  Systematic debugging techniques for software issues. Use when diagnosing bugs,
  tracing root causes, implementing defense-in-depth patterns, or verifying fixes
  before claiming completion. Includes systematic debugging, root cause tracing,
  defense strategies, and verification checkpoints.
license: MIT
version: 1.0.0
---

# Debugging Skills

Systematic approaches to diagnosing and fixing software issues.

## When to Use

- Diagnosing unexpected behavior
- Tracing root causes of bugs
- Preventing regressions
- Verifying fixes are complete

## Techniques

| Technique | When to Use | Reference |
|-----------|-------------|-----------|
| Systematic Debugging | General debugging workflow | [systematic-debugging/](systematic-debugging/) |
| Root Cause Tracing | Finding underlying causes | [root-cause-tracing/](root-cause-tracing/) |
| Defense in Depth | Preventing regressions | [defense-in-depth/](defense-in-depth/) |
| Verification | Before claiming "fixed" | [verification-before-completion/](verification-before-completion/) |

## Quick Decision Guide

```
Bug reported
    ↓
Reproduce → Can't reproduce? → [root-cause-tracing]
    ↓ (reproducible)
Isolate → Complex? → [systematic-debugging]
    ↓ (isolated)
Fix → Risk of regression? → [defense-in-depth]
    ↓ (fixed)
Verify → Skip this? → NO! → [verification-before-completion]
```

## Anti-Patterns

❌ Claiming "fixed" without verification
❌ Treating symptoms instead of root cause
❌ Not adding regression tests
❌ Debugging without reproduction steps
