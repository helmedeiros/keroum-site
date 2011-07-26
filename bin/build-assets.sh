#!/usr/bin/env bash
# Assemble the served output into dist/ alongside the compiled sass.
# Mirrors the source tree: stale files in dist/ are removed before the copy
# so a delete in source propagates to the publish target.
set -euo pipefail

DIST="dist"

# Clean the served sub-trees so deletes propagate (keep dist/principal.css from sass build).
rm -rf "$DIST/js" "$DIST/imagens" "$DIST/locales" "$DIST/index.html" "$DIST/demo.html"
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
