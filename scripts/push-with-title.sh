#!/usr/bin/env bash
set -euo pipefail

next_stage="$(node scripts/bump-metadata-title.mjs)"

git add src/app/layout.tsx

if git diff --cached --quiet; then
  echo "No title changes to commit."
  exit 0
fi

git commit -m "Bump metadata stage to ${next_stage}"
git push "$@"
