#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

if ! git rev-parse --git-dir >/dev/null 2>&1; then
  echo "Not a git repository; skipping hook install." >&2
  exit 0
fi

git config core.hooksPath .githooks
echo "Set core.hooksPath to .githooks (repo: $ROOT)"
