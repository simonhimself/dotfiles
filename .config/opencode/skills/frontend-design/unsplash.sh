#!/bin/bash
# Fetch images from Unsplash API
# Usage: ./unsplash.sh <command> [options]
#
# Commands:
#   random <query> [count]     Get random photo(s) matching query
#   search <query> [count]     Search photos by query
#   download <url> <output>    Download image to file
#
# Examples:
#   ./unsplash.sh random mountains
#   ./unsplash.sh random "office workspace" 3
#   ./unsplash.sh search nature 5
#   ./unsplash.sh download "https://images.unsplash.com/photo-xxx?w=800" hero.jpg

set -e
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
source "$SCRIPT_DIR/.env"

API="https://api.unsplash.com"
AUTH="Authorization: Client-ID $UNSPLASH_ACCESS_KEY"

case "${1:-}" in
  random)
    query="${2:?Usage: unsplash.sh random <query> [count]}"
    count="${3:-1}"
    curl -s "$API/photos/random?query=$(printf %s "$query" | jq -sRr @uri)&count=$count" \
      -H "$AUTH" | jq -r '
      (if type == "array" then . else [.] end) | .[] |
      "# \(.user.name) (@\(.user.username))",
      "raw: \(.urls.raw)",
      "small: \(.urls.small)",
      "thumb: \(.urls.thumb)",
      ""'
    ;;
  search)
    query="${2:?Usage: unsplash.sh search <query> [count]}"
    count="${3:-5}"
    curl -s "$API/search/photos?query=$(printf %s "$query" | jq -sRr @uri)&per_page=$count" \
      -H "$AUTH" | jq -r '
      .results[] |
      "# \(.user.name) (@\(.user.username))",
      "raw: \(.urls.raw)",
      "small: \(.urls.small)",
      ""'
    ;;
  download)
    url="${2:?Usage: unsplash.sh download <url> <output>}"
    output="${3:?Usage: unsplash.sh download <url> <output>}"
    curl -sL "$url" -o "$output"
    echo "Downloaded: $output ($(wc -c < "$output" | tr -d ' ') bytes)"
    ;;
  *)
    echo "Usage: unsplash.sh <random|search|download> [args]"
    echo "Run with -h or see script header for examples"
    exit 1
    ;;
esac
