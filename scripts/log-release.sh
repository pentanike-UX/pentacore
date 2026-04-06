#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="$ROOT/docs/11_release-log.md"

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <version> <summary_one_line>" >&2
  echo "Example: $0 \"v0.1.3\" \"필터 개선, 저장 버그 수정\"" >&2
  exit 1
fi

VERSION="$1"
shift
SUMMARY="$*"
TS="$(date '+%Y-%m-%d')"

BLOCK=$(cat <<EOF

### $VERSION — $TS
- **요약**: $SUMMARY

---
EOF
)

printf '%s' "$BLOCK" >>"$LOG_FILE"
echo "Appended release to docs/11_release-log.md"
