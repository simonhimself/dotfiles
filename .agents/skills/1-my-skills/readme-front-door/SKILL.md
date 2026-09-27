---
name: readme-front-door
description: Create or improve a project README with a benefit-first introduction, useful visual or example, clear try/install path, and linked technical details, and keep the GitHub About section (description, website, topics) in sync. Use when asked to write, rewrite, standardize, or improve a README or repository showcase.
---

# Give the project a clear introduction

Make it easy for a first-time visitor to understand what the project does, see a
useful result, and try it. Keep technical documentation accurate and discoverable.

## Inspect before writing

1. Read the current README, applicable agent instructions, manifests, scripts,
   public interfaces, and relevant architecture/setup docs.
2. Identify the actual audience, useful outcome, project type, current status,
   available demonstration, and three concrete capabilities.
3. Check the working tree and preserve user changes. Follow the project's branch
   and validation conventions.
4. If `docs/README_STANDARD.md` or `templates/README.md` exists, read it as well.
   Otherwise use the self-contained standard below; this skill does not require
   the template repository to be checked out.
5. Ask only for facts that cannot be determined reliably and affect the result.
   Never invent features, performance, usage statistics, test results, or releases.

## Recommended structure

1. **Name + one-sentence benefit:** explain the useful outcome before the stack.
2. **Visual or example:** show a completed task with a current screenshot, short
   demo, terminal transcript, or minimal working code example.
3. **Try/install:** give the real live link or shortest verified installation path.
4. **Three useful capabilities:** specific actions and benefits, not dependencies.
5. **Usage:** the shortest realistic path to a first result.
6. **How it works:** explain the flow and meaningful engineering decisions.
7. **Local setup + validation:** prerequisites, actual commands, expected outcomes.
8. **Limitations:** supported inputs/platforms, external services, retention, and gaps.
9. **Further documentation:** links to operations and useful project references.

Adapt rather than fill a quota. Web apps benefit from a completed-result screenshot;
CLIs from a command/output example; libraries from working code; infrastructure
from a workflow diagram; templates from an outline and a clear way to use it.
Keep existing API, contribution, license, and attribution material where useful.

## Writing and assets

- Use direct, specific language. Avoid hype and unsupported guarantees.
- Keep the opening short and the primary action prominent.
- Store durable assets under `docs/assets/` with relative links and meaningful alt
  text. Avoid private-session URLs, expiring artifacts, and broken placeholders.
- Inspect screenshots for readability, clipping, and private information.
- Clearly label illustrative content, mocked responses, and prototypes. Never
  imply a fixture screenshot is a real production summary or verified output.
- If a suitable capture is unavailable, use an accurate text/code example rather
  than fabricating evidence or silently leaving a broken image.
- Move detailed deployment procedures, account-specific configuration, migration
  history, and recovery notes into linked docs (usually `docs/OPERATIONS.md`).
  Preserve the information and fix relative links after moving it.
- Document credentials by name, not value. Explain external-service requirements
  and distinguish UI-only or mocked development from full operation.
- Do not overwrite existing agent configuration to install this standard.

## GitHub About section

Always update the repository's About section along with the README, so the two
describe the project the same way. Skip this step only if the project has no
GitHub remote or `gh` is not authenticated. If you skip it, say why.

1. Read the current values:
   `gh repo view <owner/repo> --json description,homepageUrl,repositoryTopics`.
2. Draft values from the README you just wrote:
   - **Description:** the one-sentence benefit, optionally followed by a short
     stack hint. Keep it under about 150 characters with no emoji or hype.
   - **Website:** the real live link from the Try/install section. Leave it empty
     if there is none. Never use a local or preview URL.
   - **Topics:** 4–8 lowercase, hyphenated topics covering the problem domain
     and the main platform/language. Skip generic tags such as `project`.
3. Keep existing values that are accurate. Replace only values that are empty,
   stale, or contradict the README. Add topics rather than removing them unless
   they are clearly wrong.
4. Apply the changes:
   `gh repo edit <owner/repo> --description "…" --homepage "…" --add-topic …`,
   then re-read with `gh repo view` to confirm they saved.

## Verify and finish

- Check local link targets, asset paths, code fences, and any diagrams.
- Match commands to the project's real scripts and supported prerequisites.
- Run safe, relevant checks when feasible; report limitations honestly. Do not
  execute deployment, destructive setup, or paid-service commands merely because
  they appear in the README.
- Review the rendered result when a suitable preview is available.
- Check the diff for accidental deletions, placeholders, secrets, and unsupported claims.
- Summarize the revised structure, moved docs, new assets, About section changes
  (old → new), and verification.
- Commit, push, publish, or deploy only when the user requests it. The About
  section update above is the one exception, because it is part of this skill.

Reference style: https://github.com/simonhimself/ytdw#readme
Canonical kit: https://github.com/simonhimself/project-template
