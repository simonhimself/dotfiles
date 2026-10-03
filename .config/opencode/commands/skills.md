---
description: List installed skills grouped by source
---

Show me this list of my installed skills exactly as-is in a code block, with no commentary. Groups come from `npx skills` (~/.agents/.skill-lock.json); "mine" is anything in ~/.agents/skills that npx skills doesn't manage.

!`L=~/.agents/.skill-lock.json; jq -r '.skills | to_entries | group_by(.value.source)[] | "\(.[0].value.source)\n\(map("  " + .key) | sort | join("\n"))"' $L; echo "mine"; cd ~/.agents/skills && find -L . -name SKILL.md -not -path '*/.*/*' | sed 's|^\./||;s|/SKILL.md$||' | sort | while read d; do jq -e --arg n "${d##*/}" '.skills[$n]' $L >/dev/null || echo "  $d"; done`
