---
description: Prepare an offline recovery after a project folder rename
agent: build
subtask: false
---

Prepare recovery for a renamed or moved project folder.

- If `$ARGUMENTS` is empty, call `session_list_orphans`, report the stale root sessions, and stop so the user can rerun with two paths.
- Otherwise pass the two paths from `$ARGUMENTS` directly to `session_plan_fix_rename` as `oldPath` and `newPath`.
- If either session mover tool is unavailable or returns an error, report it and stop immediately.
- Show the source and target roots, affected session count, project ID, plan ID, and exact apply command.
- Explain that no database changes have occurred yet.
- Tell the user to fully quit OpenCode/OpenChamber before running the apply command in another terminal.

Do not invoke any other tool. Never inspect `opencode.db` or attempt to reproduce the planning operation manually.
