# Task Modes

Antigravity uses three modes to structure agent work.

## PLANNING Mode

**Purpose:** Research, design, get user approval before implementing.

**When to Use:**
- Starting new feature implementation
- Complex multi-file changes
- Architectural decisions
- When user feedback is needed

**Actions:**
1. Research codebase structure
2. Create `implementation_plan.md`
3. Request review via `notify_user`
4. Iterate until approved

**Example:**
```python
task_boundary(
    Mode="PLANNING",
    TaskName="Implementing Authentication",
    TaskStatus="Researching existing auth patterns",
    TaskSummary="Starting auth implementation."
)
```

---

## EXECUTION Mode

**Purpose:** Implement the approved plan.

**When to Use:**
- After PLANNING is approved
- Simple, well-understood changes
- Bug fixes with clear scope

**Actions:**
1. Write code
2. Update `task.md` checklist
3. Create/modify files
4. Run tests

**Example:**
```python
task_boundary(
    Mode="EXECUTION",
    TaskName="%SAME%",
    TaskStatus="Writing JWT middleware",
    TaskSummary="Plan approved. Implementing auth flow."
)
```

---

## VERIFICATION Mode

**Purpose:** Test, validate, document completed work.

**When to Use:**
- After EXECUTION is complete
- Before claiming "done"
- When creating proof of work

**Actions:**
1. Run verification commands
2. Take screenshots (browser subagent)
3. Create `walkthrough.md`
4. Report results to user

**Example:**
```python
task_boundary(
    Mode="VERIFICATION",
    TaskName="%SAME%",
    TaskStatus="Running tests and creating walkthrough",
    TaskSummary="Implementation complete. All code written."
)
```

---

## Mode Transitions

```
PLANNING → (approved) → EXECUTION → (complete) → VERIFICATION
    ↑                        ↓
    └── (issues found) ──────┘
```

**Key Rules:**
- Always start with PLANNING for complex tasks
- Stay in EXECUTION for minor bugs or adjustments
- Return to PLANNING if scope changes significantly
- VERIFICATION creates proof of work (walkthrough.md)
