# Dotfiles

Personal configuration files for macOS development environment.

## What's Included

| File | Purpose |
|------|---------|
| `.zshrc` | Shell aliases and configuration |
| `.gitconfig` | Git user settings and preferences |
| `.config/git/` | Git XDG configuration and global ignore rules |
| `.config/gh/` | GitHub CLI configuration |
| `.config/ghostty/config` | Ghostty terminal settings |
| `.config/openchamber/preferences.json` | Portable OpenChamber preferences |
| `.config/opencode/` | OpenCode configuration |
| `.claude/settings.json` | Claude Code hooks and preferences |
| `.claude/statusline.sh` | Custom Claude Code status line |
| `.agents/skills/` | Shared agent skills used by Codex and compatible harnesses |

## Prerequisites

- macOS
- Node.js and npm, required for the tracked OpenCode plugin dependencies

## Quick Install

```bash
git clone https://github.com/simonhimself/dotfiles.git ~/.dotfiles
cd ~/.dotfiles
./install.sh
```

The install script will:
1. Back up any existing config files
2. Install the pinned OpenCode plugin dependencies
3. Create symlinks from your home directory to this repo

## Documentation

See [docs/beginner-setup.md](docs/beginner-setup.md) for a detailed setup guide.

## Manual Setup

If you prefer to set up manually:

```bash
# Clone the repo
git clone https://github.com/simonhimself/dotfiles.git ~/.dotfiles

# Create symlinks
ln -s ~/.dotfiles/.zshrc ~/.zshrc
ln -s ~/.dotfiles/.gitconfig ~/.gitconfig
ln -s ~/.dotfiles/.config/ghostty/config ~/Library/Application\ Support/com.mitchellh.ghostty/config
```

## Updating

After making changes to any config file:

```bash
cd ~/.dotfiles
git add .
git commit -m "Description of changes"
git push
```

Since the config files are symlinked, any edits you make (e.g., to `~/.zshrc`) are automatically reflected in this repo.

## OpenChamber

OpenChamber stores preferences beside device keys and runtime state. To apply the tracked preferences on a machine where OpenChamber has been started once, run:

```bash
node ~/.dotfiles/scripts/apply-openchamber-preferences.mjs
```
