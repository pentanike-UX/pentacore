#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="$ROOT/docs/08_prompt-log.md"

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <tool> <purpose> [prompt_summary]" >&2
  echo "Example: $0 \"Cursor\" \"Explore 필터 개선\"" >&2
  exit 1
fi

TOOL="$1"
PURPOSE="$2"
PROMPT="${3:-TODO}"
TS="$(date '+%Y-%m-%d %H:%M %Z')"

CHANGED=$(
  if git -C "$ROOT" rev-parse --git-dir >/dev/null 2>&1; then
    git -C "$ROOT" diff --name-only 2>/dev/null
    git -C "$ROOT" diff --cached --name-only 2>/dev/null
  fi | sort -u | sed '/^$/d' | head -80
)

if [[ -z "${CHANGED// }" ]]; then
  CHANGED_LINES="- (변경 파일 없음 또는 git 미사용)"
else
  CHANGED_LINES="$(printf '%s\n' "$CHANGED" | sed 's/^/- /')"
fi

BLOCK=$(cat <<EOF

### $TS
- **tool**: $TOOL
- **목적**: $PURPOSE
- **prompt**: $PROMPT
- **changed files**:
$CHANGED_LINES
- **result**: TODO
- **next action**: TODO

---
EOF
)

printf '%s' "$BLOCK" >>"$LOG_FILE"
echo "Appended work log to docs/08_prompt-log.md"
