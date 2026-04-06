#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
LOG_FILE="$ROOT/docs/09_decision-log.md"

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 \"ADR 제목 한 줄\"" >&2
  echo "Example: $0 \"지도는 Leaflet으로 시작\"" >&2
  exit 1
fi

TITLE="$*"
TS="$(date '+%Y-%m-%d')"

BLOCK=$(cat <<EOF

### ADR — $TS — $TITLE
- **상태**: 제안
- **맥락**: TODO
- **결정**: $TITLE
- **결과**: TODO

---
EOF
)

printf '%s' "$BLOCK" >>"$LOG_FILE"
echo "Appended ADR to docs/09_decision-log.md"
