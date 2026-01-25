# ============================================
# NAVIGATION
# ============================================
alias ll="ls -lah"          # Detailed listing with human-readable sizes
alias la="ls -A"            # List all except . and ..
alias c="clear"             # Quick clear screen
alias ..="cd .."            # Go up one directory
alias ...="cd ../.."        # Go up two directories
alias ....="cd ../../.."    # Go up three directories

# ============================================
# GIT
# ============================================
alias gs="git status"
alias ga="git add"
alias gc="git commit"
alias gp="git push"
alias gl="git log --oneline -10 --decorate"

# ============================================
# SAFETY
# ============================================
alias rm="rm -i"            # Confirm before deleting
alias mv="mv -i"            # Confirm before overwriting
alias cp="cp -i"            # Confirm before overwriting

# ============================================
# CLAUDE CODE
# ============================================
alias cc="claude"           # Quick access to Claude Code
alias claude-yolo="claude --dangerously-skip-permissions --chrome"


export PATH="$HOME/.local/bin:$PATH"
