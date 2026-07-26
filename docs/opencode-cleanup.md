# OpenCode Cleanup Checklist

Last reviewed: 2026-07-26

## Completed

- Removed obsolete OpenCode binaries, beta artifacts, duplicate integrations, and legacy local skill copies.
- Removed obsolete skill-wrapper commands while retaining `project-summary.md`.
- Reinstalled managed skills in the flat `~/.agents/skills/<name>/` layout and verified discovery.
- Repaired Claude skill symlinks and verified no broken symlinks remain.
- Replaced the legacy Cloudflare skill installation with official Cloudflare skills and MCP servers.
- Verified the enabled Cloudflare MCP servers connect successfully.
- Deleted the unused `partnerlabs` Pages project.
- Removed the `research` agent; retained `deploy`, `review`, and `writer`.
- Updated retained agents to `mode: all`; expanded `deploy` with Cloudflare skill, Wrangler, MCP, validation, and production-safety guidance.
- Removed obsolete V2 client state, OpenChamber backup, service credential, and Finder metadata.
- Rebuilt local plugin dependencies. OpenCode `1.18.5` restored `@opencode-ai/plugin@1.18.5` and its required transitive dependencies.
- Removed `package-lock.json` from Git tracking. It remains generated locally and ignored.
- Verified stable OpenCode configuration and all enabled MCP connections.

## Remaining

### Rotate Tickrtime Credentials

- Replace the exposed Finnhub key, Resend key, and JWT secret with newly issued values.
- Store their replacements as encrypted Cloudflare secrets, not Pages plain-text values.
- Verify the deployed `tickrtime` application after the replacement.

### Reconcile Git State

- Review the staged OpenCode cleanup diff before committing.
- Include the staged `.claude/settings.json` permission for `mcp__pencil`; leave its unrelated unstaged settings changes separate.
- Preserve the intentional Markdown trailing spaces in the imported `vercel-react-best-practices` skill files.
- Keep unrelated `.config/git/`, `.config/gh/`, Ghostty, README, and installer changes out of the OpenCode cleanup commit unless explicitly intended.
- Confirm the target branch. The current branch is `chore/add-git-gh-config`, not the earlier cleanup branch.

### Final Review And Commit

- Review the complete staged diff for unintended files and secrets.
- Run final OpenCode configuration and MCP validation.
- Commit the cleanup only after explicit approval.
