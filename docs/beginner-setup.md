# Beginner Dev Environment Setup Guide

> A simple, focused setup for developers working with AI coding assistants.
> Based on analysis of your current macOS environment.
>
> **Last updated:** January 4, 2026

---

## Your Current Setup (Already Installed)

| Tool | Status | Purpose |
|------|--------|---------|
| **Homebrew** | ✅ | Package manager for installing tools |
| **Zsh** | ✅ | Your shell (command line interface) |
| **Git** | ✅ | Version control for tracking code changes |
| **GitHub CLI (gh)** | ✅ | Interact with GitHub from terminal |
| **Node.js** | ✅ | JavaScript runtime |
| **Python 3** | ✅ | Python runtime |
| **Cursor** | ✅ | AI-powered code editor |
| **Claude Code** | ✅ | AI coding assistant in terminal |

---

## Tier 1: Essential Tools (Install These First)

### 1. Ghostty — Modern Terminal Emulator ✅ COMPLETED

A fast, GPU-accelerated terminal built by one of the HashiCorp co-founders. It's minimal, beautiful, and has sensible defaults out of the box.

```bash
# Install
brew install --cask ghostty
```

**Why Ghostty over the default Terminal.app:**
- **Faster rendering** — GPU-accelerated, noticeably smoother
- **True color support** — Better syntax highlighting in tools like bat
- **Native macOS feel** — Doesn't look like a port from Linux
- **Simple config** — Plain text file, easy to customize later
- **Active development** — Modern codebase, quick updates

#### Your Ghostty Config

**Location:** `~/Library/Application Support/com.mitchellh.ghostty/config`

**Settings configured:**
```
# Padding - space between text and window edges
window-padding-x = 10
window-padding-y = 5

# macOS: Make Option key work as Alt for CLI shortcuts
macos-option-as-alt = true

# Auto-copy text when selected (no Cmd+C needed)
copy-on-select = clipboard

# Automatically download updates (still asks before installing)
auto-update = download

# Shift+Enter sends Escape+Return (useful for multi-line input)
keybind = shift+enter=text:\x1b\r
```

**Key settings explained:**
| Setting | What It Does |
|---------|--------------|
| `window-padding-x/y` | Adds breathing room between text and window edges |
| `macos-option-as-alt` | Makes Option key work as Alt for CLI shortcuts (essential!) |
| `copy-on-select` | Selecting text automatically copies it |
| `auto-update` | Ghostty downloads updates automatically |

**Reload config:** Press `Cmd+Shift+,` in Ghostty

---

### 2. fzf — Fuzzy Finder ⏳ PENDING

A tool that lets you search by typing partial matches. Most useful for finding previous commands.

```bash
# Install
brew install fzf

# Run the install script to enable keybindings
$(brew --prefix)/opt/fzf/install
```

**How to use:**
- Press `Ctrl+R` in terminal to search your command history
- Start typing any part of a previous command to find it
- Use arrow keys to select, Enter to run

---

### 3. bat — Better File Viewer ⏳ PENDING

Like `cat` but with syntax highlighting and line numbers.

```bash
# Install
brew install bat
```

**How to use:**
```bash
bat filename.py      # View a file with syntax highlighting
bat -n filename.js   # Show line numbers only (no decorations)
```

---

### 4. Shell Aliases (.zshrc) ✅ COMPLETED

Your shell config file controls how your terminal behaves.

**Location:** `~/.zshrc`

#### Aliases Configured

**Navigation:**
| Alias | Command | What It Does |
|-------|---------|--------------|
| `ll` | `ls -lah` | Detailed listing with human-readable sizes |
| `la` | `ls -A` | List all except . and .. |
| `c` | `clear` | Quick clear screen |
| `..` | `cd ..` | Go up one directory |
| `...` | `cd ../..` | Go up two directories |
| `....` | `cd ../../..` | Go up three directories |

**Git:**
| Alias | Command | What It Does |
|-------|---------|--------------|
| `gs` | `git status` | Check git status |
| `ga` | `git add` | Stage files |
| `gc` | `git commit` | Commit changes |
| `gp` | `git push` | Push to remote |
| `gl` | `git log --oneline -10 --decorate` | View last 10 commits |

**Safety:**
| Alias | Command | What It Does |
|-------|---------|--------------|
| `rm` | `rm -i` | Confirm before deleting |
| `mv` | `mv -i` | Confirm before overwriting |
| `cp` | `cp -i` | Confirm before overwriting |

**Claude Code:**
| Alias | Command | What It Does |
|-------|---------|--------------|
| `cc` | `claude` | Quick access to Claude Code |
| `claude-yolo` | `claude --dangerously-skip-permissions --chrome` | Claude with all permissions |

**Reload config:** Run `source ~/.zshrc` or open a new terminal

---

### 5. Git Identity Configuration ⏳ PENDING

Set your name and email for commits:

```bash
# Replace with your actual name and email
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# Helpful defaults
git config --global init.defaultBranch main    # Use 'main' for new repos
git config --global pull.rebase false          # Use merge for pulls (simpler)
```

Verify your settings:
```bash
git config --global --list
```

---

## Tier 2: Nice to Have (Install Later)

These are helpful but not essential when starting out.

### fd — Better File Finder

Faster, simpler alternative to the `find` command.

```bash
brew install fd
```

**Usage:**
```bash
fd readme           # Find files containing "readme" in name
fd .py              # Find all Python files
fd . --type d       # Find all directories
```

---

### ripgrep (rg) — Fast Code Search

Search through code files extremely fast.

```bash
brew install ripgrep
```

**Usage:**
```bash
rg "function"       # Find "function" in all files
rg "TODO" --type py # Find TODOs in Python files only
rg -i "error"       # Case-insensitive search
```

---

### tree — Directory Visualization

See folder structure as a tree.

```bash
brew install tree
```

**Usage:**
```bash
tree                # Show current directory as tree
tree -L 2           # Limit to 2 levels deep
tree -I node_modules # Ignore node_modules folder
```

---

## Skip These For Now

| Tool | Why Skip (For Beginners) |
|------|--------------------------|
| **tmux** | Terminal multiplexer — powerful but complex. Learn after you're comfortable with basics. |
| **vim/neovim** | Steep learning curve. Cursor is much more beginner-friendly. |
| **oh-my-zsh** | Adds complexity and can slow down terminal. A simple .zshrc is better to start. |
| **iTerm2** | Older terminal with many features you won't need. Ghostty is simpler and faster. |

---

## Quick Reference: Common Commands

### Navigation
```bash
pwd                 # Print current directory
cd ~/Documents      # Go to Documents folder
cd -                # Go back to previous directory
ll                  # List all files with details (your alias!)
```

### Git Basics
```bash
git clone <url>     # Download a repository
gs                  # Check git status (your alias!)
ga .                # Stage all changes (your alias!)
gc -m "message"     # Commit with message (your alias!)
gp                  # Push to remote (your alias!)
git pull            # Download latest changes
```

### Using GitHub CLI
```bash
gh auth login       # Sign into GitHub
gh repo clone owner/repo  # Clone a repo
gh repo create      # Create new repo
gh pr create        # Create pull request
```

---

## Your AI Development Workflow

```
┌──────────────────────────────────────────────────────────────┐
│                      YOUR WORKFLOW                            │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│                    Ghostty (Terminal)                        │
│   ┌────────────────────────────────────────────────────┐    │
│   │  Your main terminal app — fast, clean, modern      │    │
│   └────────────────────────────────────────────────────┘    │
│                           │                                  │
│            ┌──────────────┴──────────────┐                  │
│            ▼                             ▼                  │
│   ┌──────────────┐              ┌──────────────────┐        │
│   │ Claude Code  │              │  Direct shell    │        │
│   │ (AI tasks)   │              │  (git, npm, etc) │        │
│   └──────────────┘              └──────────────────┘        │
│            │                             │                  │
│            └──────────────┬──────────────┘                  │
│                           ▼                                  │
│                    Cursor (Editor)                           │
│                  (Write & edit code)                         │
│                           │                                  │
│                           ▼                                  │
│                    Git + GitHub                              │
│                (Save & share your work)                      │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Ghostty**: Your terminal app — where you run Claude Code and shell commands
- **Claude Code**: AI assistant for terminal tasks, multi-file changes, running builds
- **Cursor**: Best for writing and editing code with AI assistance
- **Git/GitHub**: Save your work and collaborate

---

## Installation Checklist

- [x] Install Ghostty: `brew install --cask ghostty`
- [x] Configure Ghostty (padding, option-as-alt, copy-on-select, auto-update)
- [x] Create ~/.zshrc with aliases (navigation, git, safety, claude)
- [x] Reload shell: `source ~/.zshrc`
- [ ] Install fzf: `brew install fzf && $(brew --prefix)/opt/fzf/install`
- [ ] Install bat: `brew install bat`
- [ ] Configure git identity
- [ ] (Optional) Install fd: `brew install fd`
- [ ] (Optional) Install ripgrep: `brew install ripgrep`

---

## Resources

- [Ghostty Website](https://ghostty.org)
- [Homebrew Documentation](https://brew.sh)
- [Git Basics](https://git-scm.com/book/en/v2/Getting-Started-Git-Basics)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Cursor Documentation](https://cursor.sh/docs)
- [Claude Code Documentation](https://docs.anthropic.com/claude-code)

---

*Generated from analysis of elithrar/dotfiles repository, simplified for beginners.*
