---
description: List skills from my publishers that I haven't installed
---

Show me this output exactly as-is in a code block, with no commentary. For each publisher I use via `npx skills` (from ~/.agents/.skill-lock.json), it lists the skills in their GitHub repo that I haven't installed. After the block, add one line: install with `npx skills add <publisher> --skill <name> -g`.

!`L=~/.agents/.skill-lock.json; f=0; for src in $(jq -r '[.skills[]|select(.sourceType=="github").source]|unique[]' $L); do a=$(gh api "repos/$src/git/trees/HEAD?recursive=1" --jq '.tree[].path|select(endswith("/SKILL.md"))' 2>/dev/null) || { echo "$src: could not check"; continue; }; n=$(comm -23 <(sort -u <<<"$a") <(jq -r --arg s "$src" '.skills[]|select(.source==$s).skillPath' $L | sort -u)); [ -z "$n" ] && continue; f=1; echo "$src"; sed 's|/SKILL.md$||; s|.*/||; s|^|  |' <<<"$n"; done; [ $f = 0 ] && echo "Every skill from your publishers is installed."; true`
