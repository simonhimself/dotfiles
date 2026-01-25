---
description: Review UI code for Web Interface Guidelines compliance
---

Review files for compliance with Web Interface Guidelines, checking accessibility, UX, and design best practices.

First, invoke the skill tool to load the web-design-guidelines skill:

```
skill({ name: 'web-design-guidelines' })
```

Then:
1. Fetch the latest guidelines from:
   ```
   https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```
2. Read the specified files (or ask user for files/pattern if not provided)
3. Check against all rules in the fetched guidelines
4. Output findings in terse `file:line` format

<user-request>
$ARGUMENTS
</user-request>
