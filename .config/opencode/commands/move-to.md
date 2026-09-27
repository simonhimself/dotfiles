---
description: Prepare an offline move of this session and its subagents to another project directory
agent: build
subtask: false
---

Prepare a move of this root session to another project directory: **$ARGUMENTS**

1. Call `session_plan_move` with `$ARGUMENTS` as the target.
2. If `session_plan_move` is unavailable or returns an error, report it and stop immediately.
3. Show the normalized destination, target project ID/type, affected session count, plan ID, and exact apply command.
4. Explain that no database changes have occurred yet.
5. Tell the user to fully quit OpenCode/OpenChamber before running the apply command in another terminal.

Do not invoke any other tool. Never inspect `opencode.db` or attempt to reproduce the planning operation manually.
