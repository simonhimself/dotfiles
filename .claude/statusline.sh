#!/bin/bash

# Read JSON input from stdin
input=$(cat)

# Extract values from JSON
cwd=$(echo "$input" | jq -r '.workspace.current_dir')
model_name=$(echo "$input" | jq -r '.model.display_name')
usage=$(echo "$input" | jq '.context_window.current_usage')

# Format directory path (replace home with ~)
dir_path="${cwd/#$HOME/\~}"

# ANSI color codes
CYAN='\033[36m'
GREEN='\033[32m'
YELLOW='\033[33m'
RED='\033[31m'
BLUE='\033[34m'
DIM_WHITE='\033[2;37m'
RESET='\033[0m'

# Build status line
status_line=""

# Add directory path (cyan)
status_line="${status_line}${CYAN}${dir_path}${RESET}"

# Add git branch if in a git repo
if git -C "$cwd" rev-parse --git-dir > /dev/null 2>&1; then
  branch=$(git -C "$cwd" --no-optional-locks branch --show-current 2>/dev/null)
  if [ -n "$branch" ]; then
    # Color based on branch name
    if [ "$branch" = "main" ] || [ "$branch" = "master" ]; then
      branch_color="${GREEN}"
    else
      branch_color="${YELLOW}"
    fi
    status_line="${status_line} ${branch_color}[${branch}]${RESET}"
  fi
fi

# Add separator and model name (blue)
status_line="${status_line} ${DIM_WHITE}|${RESET} ${BLUE}${model_name}${RESET}"

# Add context window percentage
if [ "$usage" != "null" ]; then
  current=$(echo "$usage" | jq '.input_tokens + .cache_creation_input_tokens + .cache_read_input_tokens')
  size=$(echo "$input" | jq '.context_window.context_window_size')
  pct=$((current * 100 / size))

  # Color based on percentage
  if [ "$pct" -lt 50 ]; then
    context_color="${GREEN}"
  elif [ "$pct" -lt 75 ]; then
    context_color="${YELLOW}"
  else
    context_color="${RED}"
  fi

  status_line="${status_line} ${DIM_WHITE}|${RESET} ${context_color}${pct}% context${RESET}"
fi

# Print the status line
printf "%b" "$status_line"
