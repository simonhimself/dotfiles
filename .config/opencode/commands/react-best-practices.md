---
description: Apply Vercel's React and Next.js performance optimization guidelines
---

Apply React and Next.js performance best practices from Vercel Engineering.

## Workflow

### Step 1: Load skill

```
skill({ name: 'vercel-react-best-practices' })
```

### Step 2: Identify relevant rule categories

Based on $ARGUMENTS, determine which categories apply:

| Priority | Category | When to Apply |
|----------|----------|---------------|
| 1 (CRITICAL) | `async-*` | Data fetching, API calls, waterfalls |
| 2 (CRITICAL) | `bundle-*` | Bundle size, imports, code splitting |
| 3 (HIGH) | `server-*` | Server components, caching, serialization |
| 4 (MEDIUM-HIGH) | `client-*` | Client data fetching, SWR, events |
| 5 (MEDIUM) | `rerender-*` | Re-render optimization, memo, state |
| 6 (MEDIUM) | `rendering-*` | DOM rendering, SVG, hydration |
| 7 (LOW-MEDIUM) | `js-*` | JavaScript performance patterns |
| 8 (LOW) | `advanced-*` | Advanced patterns |

### Step 3: Read relevant rules

- For specific issues: Read individual `rules/<rule-name>.md` files
- For comprehensive review: Read `AGENTS.md` (full compiled document)

### Step 4: Apply guidelines

Apply the relevant rules when writing, reviewing, or refactoring code.

<user-request>
$ARGUMENTS
</user-request>
