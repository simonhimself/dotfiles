---
description: Create or update agent skills
---

Help create a new skill or update an existing one.

## Workflow

### Step 1: Load skill

```
skill({ name: 'skill-creator' })
```

### Step 2: Determine the task

- **Creating new skill** -> Follow full 6-step process
- **Updating existing skill** -> Skip to Step 4 (Edit)
- **Packaging skill** -> Skip to Step 5 (Package)

### Step 3: Follow the skill creation process

**Step 1 - Understand**: Gather concrete examples of how the skill will be used
**Step 2 - Plan**: Identify scripts, references, and assets needed
**Step 3 - Initialize**: Run `scripts/init_skill.py <skill-name> --path <dir>`
**Step 4 - Edit**: Implement resources and write SKILL.md
**Step 5 - Package**: Run `scripts/package_skill.py <path/to/skill>`
**Step 6 - Iterate**: Test and refine based on usage

### Step 4: Reference design patterns as needed

- Multi-step processes -> Read `references/workflows.md`
- Output formats -> Read `references/output-patterns.md`

<user-request>
$ARGUMENTS
</user-request>
