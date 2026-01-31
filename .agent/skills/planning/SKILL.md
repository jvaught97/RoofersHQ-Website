---
name: planning
description: Generates comprehensive implementation plans for multi-step tasks. Use when you have a spec or requirements and need to breakdown the work into bite-sized, testable tasks before coding.
---

# Creating Implementation Plans

## When to use this skill
- After brainstorming and validating a design.
- When you have clear requirements but need a step-by-step guide.
- Before writing complex code.
- To provide a roadmap for execution (either by you or another agent).

## Workflow

1.  **Initialize Plan**
    - [ ] Create a new plan file (e.g., `docs/plans/YYYY-MM-DD-feature.md`).
    - [ ] Add the standard header with Goal, Architecture, and Tech Stack.

2.  **Break Down Tasks**
    - [ ] Divide work into bite-sized tasks (2-5 minutes execution time each).
    - [ ] Ensure each task follows TDD (Test, Fail, Implement, Pass, Commit).

3.  **Review & Save**
    - [ ] Verify that exact file paths are used.
    - [ ] Ensure commands are copy-pasteable.
    - [ ] Save and commit the plan.

## Instructions

### Plan Document Header
Every plan should start with:
```markdown
# [Feature Name] Implementation Plan

**Goal:** [One sentence describing what this builds]
**Architecture:** [2-3 sentences about approach]
**Tech Stack:** [Key technologies/libraries]
```

### Task Granularity
Each task should be granular. Example structure:

```markdown
### Task N: [Component Name]

**Files:**
- Create: `src/path/to/file.py`
- Modify: `src/path/to/existing.py:10-20`

**Steps:**
1.  **Write Failing Test:** `tests/path/test_feature.py`
2.  **Verify Failure:** `pytest ...`
3.  **Minimal Implementation:** `src/path/feature.py`
4.  **Verify Pass:** `pytest ...`
5.  **Commit:** `git commit -m "feat: ..."`
```

### Principles
- **DRY & YAGNI:** Do not over-engineer the plan.
- **TDD:** Test-Driven Development is mandatory for these plans.
- **Exact Paths:** Never use placeholders like `path/to/file`. Use real paths.

## Resources
- N/A
