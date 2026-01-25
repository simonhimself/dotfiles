---
description: Load Cloudflare skill and get contextual guidance for your task
---

Load the Cloudflare platform skill and help with any Cloudflare development task.

## Workflow

### Step 1: Load cloudflare skill

```
skill({ name: 'cloudflare' })
```

### Step 2: Identify task type from user request

Analyze $ARGUMENTS to determine:
- **Product(s) needed** - Use the decision trees in SKILL.md:
  - "I need to run code" -> workers, pages, durable-objects, workflows, etc.
  - "I need to store data" -> kv, d1, r2, queues, vectorize, etc.
  - "I need AI/ML" -> workers-ai, vectorize, agents-sdk, etc.
  - "I need networking" -> tunnel, spectrum, argo-smart-routing, etc.
  - "I need security" -> waf, ddos, bot-management, turnstile, etc.
  - "I need media" -> images, stream, browser-rendering, etc.
  - "I need IaC" -> pulumi, terraform, api
- **Task type** - new project, feature implementation, debugging, or configuration

### Step 3: Read relevant reference files

Based on the identified product(s), read from `references/<product>/`:

| Task Type | Files to Read |
|-----------|---------------|
| New project setup | `README.md` + `configuration.md` |
| Implement feature | `README.md` + `api.md` + `patterns.md` |
| Debug/troubleshoot | `README.md` + `gotchas.md` |
| Quick overview | `README.md` only |

### Step 4: Execute task

Apply Cloudflare-specific patterns and APIs from the references to complete the user's request.

### Step 5: Summarize

```
=== Cloudflare Task Complete ===

Product(s): <products used>
Files referenced: <list of reference files consulted>

<brief summary of what was done>
```

<user-request>
$ARGUMENTS
</user-request>
