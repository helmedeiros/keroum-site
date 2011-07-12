#!/usr/bin/env bash
# Assemble the served output into dist/ alongside the compiled sass.
set -euo pipefail

DIST="dist"
mkdir -p "$DIST/js" "$DIST/imagens" "$DIST/locales"

# HTML
cp index.html "$DIST/"
[ -f demo.html ] && cp demo.html "$DIST/" || true

# JS (vendor + app)
cp -R js/. "$DIST/js/"

# Images
cp -R imagens/. "$DIST/imagens/"

# Locales
cp -R locales/. "$DIST/locales/"

# Strip dev-only files that may have been copied
rm -rf "$DIST/js/app/.gitkeep" 2>/dev/null || true

echo "dist/ assembled."
