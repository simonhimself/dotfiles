#!/bin/bash

# Dotfiles Installation Script
# This script creates symlinks from your home directory to the dotfiles repo

set -e  # Exit on error

DOTFILES_DIR="$HOME/.dotfiles"

echo "Installing dotfiles from $DOTFILES_DIR"
echo "========================================"

# Function to create symlink with backup
create_symlink() {
    local source="$1"
    local target="$2"

    # Check if target already exists and is not a symlink
    if [ -e "$target" ] && [ ! -L "$target" ]; then
        echo "  Backing up existing $target to ${target}.backup"
        mv "$target" "${target}.backup"
    fi

    # Remove existing symlink if it exists
    if [ -L "$target" ]; then
        rm "$target"
    fi

    # Create parent directory if needed
    mkdir -p "$(dirname "$target")"

    # Create the symlink
    ln -s "$source" "$target"
    echo "  Created symlink: $target → $source"
}

echo ""
echo "Creating symlinks..."
echo ""

# Shell config
create_symlink "$DOTFILES_DIR/.zshrc" "$HOME/.zshrc"

# Git config
create_symlink "$DOTFILES_DIR/.gitconfig" "$HOME/.gitconfig"

# Ghostty config (macOS location)
if [[ "$OSTYPE" == "darwin"* ]]; then
    GHOSTTY_CONFIG="$HOME/Library/Application Support/com.mitchellh.ghostty/config"
    mkdir -p "$(dirname "$GHOSTTY_CONFIG")"
    create_symlink "$DOTFILES_DIR/.config/ghostty/config" "$GHOSTTY_CONFIG"
fi

# Claude Code config
mkdir -p "$HOME/.claude"
create_symlink "$DOTFILES_DIR/.claude/settings.json" "$HOME/.claude/settings.json"
create_symlink "$DOTFILES_DIR/.claude/statusline.sh" "$HOME/.claude/statusline.sh"

echo ""
echo "========================================"
echo "Done! Dotfiles installed successfully."
echo ""
echo "You may need to restart your terminal or run:"
echo "  source ~/.zshrc"
echo ""
