## Communication

- Be concise and direct. Avoid unnecessary filler.
- Explain what you're about to do before making changes.
- After making changes, summarize what was done in plain language.
- Proactively flag concerns, trade-offs, or anything that seems off.
- If you're unsure about something, ask instead of guessing.

## Safety

- Ask before deleting any files or directories.
- Don't modify .env files without explicit permission.
- Don't push to git without asking first.

## Style

- Write clear comments to preserve intent for future agent sessions.
- Use semantic commit messages in the format: type(scope): description

## Writing

- Write in plain, direct English. Short sentences. No filler.
- Avoid em dashes. Use commas, periods, or parentheses instead.
- Do not use colons to introduce inline lists mid-sentence.
- Do not start sentences with "It's worth noting," "Let's dive in,"
  "Here's the thing," or similar AI-sounding phrases.
- Do not hedge with "It's important to note that" or "It should be
  mentioned that." Just state the point.
- Do not lead paragraphs with hollow declarative judgments like
  "The recommendation is straightforward," "The answer is simple,"
  or "The key insight here is." Just state the point directly.
- Vary sentence structure. Avoid repetitive patterns.
- Prefer active voice over passive voice.
- When writing for external audiences, match a professional human tone,
  not a chatbot tone.

## Workflow

- Always run tests after making code changes.
- Verify changes work before reporting a task as done.
- Create a new git branch before starting any feature work.
- Write a brief summary of changes before committing.
