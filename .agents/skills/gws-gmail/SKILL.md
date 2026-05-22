---
name: gws-gmail
description: Manage Simon's Gmail account (ssteiner@cloudflare.com) via the Google Workspace CLI (gws). Use whenever the user asks to read, triage, search, archive, reply to, forward, or send Gmail messages. Includes a strict draft-first safety rule for outgoing mail.
---

# gws-gmail — Simon's Gmail account

This skill teaches you how to manage **Simon's Gmail inbox** using the
[`gws`](https://github.com/googleworkspace/cli) CLI (Google Workspace CLI).

## Account details

- **Gmail address:** `ssteiner@cloudflare.com`
- **GCP project:** `spx-partnerships`
- **Auth method:** OAuth2 (Desktop client), credentials stored encrypted at
  `~/.config/gws/credentials.enc`
- **Authorized scopes** include `gmail.modify`, `drive`, `calendar`, `docs`,
  `sheets`, `presentations`, `tasks`

Check auth at any time with `gws auth status`.

## CRITICAL SAFETY RULE — drafts first

**All outgoing email commands MUST use the `--draft` flag** unless the user
has explicitly said "send it" (or equivalent) for that specific message.
This applies to:

- `gws gmail +send`
- `gws gmail +reply`
- `gws gmail +reply-all`
- `gws gmail +forward`

Workflow:

1. Compose with `--draft` to create a Gmail draft (no email is sent).
2. Show the recipient, subject, and a brief summary of the body to the user.
3. Wait for explicit confirmation.
4. Only then re-run the command **without** `--draft`, or send the existing
   draft via the Gmail API.

There is no undo for sent email. The draft step is the safety net.

## Helper commands (quick reference)

The `gws gmail` namespace exposes high-level helpers (prefixed with `+`) on
top of the raw Gmail API resources:

| Command | What it does |
| --- | --- |
| `gws gmail +triage` | Show unread inbox summary (sender, subject, date) |
| `gws gmail +read` | Read a single message; extract body or headers |
| `gws gmail +send` | Send a new email (USE `--draft` FIRST) |
| `gws gmail +reply` | Reply to a message, threading preserved (USE `--draft` FIRST) |
| `gws gmail +reply-all` | Reply-all to a message (USE `--draft` FIRST) |
| `gws gmail +forward` | Forward a message to new recipients (USE `--draft` FIRST) |
| `gws gmail +watch` | Watch for new emails, stream as NDJSON |

### Triage examples

Pull the 30 most recent unread messages from the inbox:

```bash
gws gmail +triage --max 30
```

Filter triage with Gmail query syntax (any `gws gmail +triage --query '...'`):

```bash
# Unread from a specific sender, last 7 days
gws gmail +triage --query 'from:foo@example.com after:7d is:unread'

# Anything with an attachment in the last month
gws gmail +triage --query 'has:attachment newer_than:30d'
```

### Read a specific message

```bash
gws gmail +read --message-id <MSG_ID>
```

### Compose, draft-first

```bash
gws gmail +send \
  --to recipient@example.com \
  --subject 'Hello' \
  --body 'Message body here.' \
  --draft
```

After review and explicit user OK, re-run without `--draft`:

```bash
gws gmail +send \
  --to recipient@example.com \
  --subject 'Hello' \
  --body 'Message body here.'
```

### Reply, draft-first

```bash
gws gmail +reply \
  --message-id <MSG_ID> \
  --body 'Reply text here.' \
  --draft
```

## Batch processing (archive, mark as read)

For bulk mailbox operations use the raw API resources directly:

```bash
# Archive (remove from INBOX, keep in All Mail)
gws gmail users messages modify \
  --params '{"id":"<MSG_ID>"}' \
  --json   '{"removeLabelIds":["INBOX"]}'

# Mark as read
gws gmail users messages modify \
  --params '{"id":"<MSG_ID>"}' \
  --json   '{"removeLabelIds":["UNREAD"]}'

# Archive AND mark read in one call
gws gmail users messages modify \
  --params '{"id":"<MSG_ID>"}' \
  --json   '{"removeLabelIds":["INBOX","UNREAD"]}'

# Trash a message
gws gmail users messages trash \
  --params '{"id":"<MSG_ID>"}'
```

When the user has agreed on a category (e.g. "archive all these newsletters"),
process the whole batch without asking for confirmation on each individual
message. The agreement covers the batch.

## Gmail search query syntax

Useful operators for `--query`:

- `from:` `to:` — sender / recipient
- `subject:"some text"` — subject contains
- `is:unread` `is:read` `is:starred` `is:important`
- `has:attachment` `filename:pdf`
- `label:<name>` — Gmail label
- `after:YYYY/MM/DD` `before:YYYY/MM/DD`
- `newer_than:7d` `older_than:30d` (`d`/`m`/`y` units)
- `category:promotions` `category:social` `category:updates`
- Combine with space (implicit AND) or `OR`, group with `{ }`

Examples:

```text
from:noreply@github.com is:unread newer_than:14d
{ from:notion.so OR from:linear.app } is:unread
has:attachment filename:pdf older_than:1y
```

## Triage workflow (the inbox-zero flow)

1. Run `gws gmail +triage --max 30` (or higher for larger inboxes).
2. Categorize each message:
   - **Needs reply** — requires a response from Simon.
   - **FYI** — informational, archive after reading.
   - **Archive** — noise, low-priority, marketing.
   - **Junk** — spam-like; trash it.
3. Present a clean table/list so Simon can see everything at a glance.
4. Get one decision per category, then execute the batch.
5. For each "needs reply" item, draft the response (always `--draft`) and
   wait for explicit send approval.

## Common pitfalls

- Subcommands use **camelCase** (`getProfile`, not `get-profile`).
- `--params` and `--json` are separate flags: `--params` is for path/query
  params (e.g. `id`), `--json` is for the request body.
- `userId` defaults to `me` for most helper commands; specify explicitly
  when calling the raw API resources.

## Beyond Gmail

The `gws` CLI also supports Drive, Calendar, Sheets, Docs, Slides, Tasks,
and Chat. The same auth and project work for all of them. If Simon asks
for help with another Google Workspace service, you can call:

- `gws drive ...`
- `gws calendar ...`
- `gws sheets ...`
- `gws docs ...`
- etc.

Use `gws <service> --help` to discover commands.
