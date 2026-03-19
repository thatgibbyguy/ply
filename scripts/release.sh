#!/usr/bin/env bash
set -euo pipefail

# Clean up stale git lock files on exit/interrupt
cleanup() {
  rm -f "$PLY_ROOT/.git/index.lock" 2>/dev/null
  rm -f "$PLY_ROOT/.git/modules/plygrid-web-and-docs/index.lock" 2>/dev/null
}
PLY_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
trap cleanup EXIT INT TERM

# ply release script
# Usage: ./scripts/release.sh 1.0.11 "Bug fixes, Sass loops, modernization"
#
# Steps:
#   1. Validate inputs and clean working state
#   2. Bump version in package.json
#   3. Update README roadmap (remove completed items)
#   4. Build + lint
#   5. Commit, tag, push ply
#   6. npm publish (interactive — will prompt for 2FA)
#   7. Wait for npm availability
#   8. Create GitHub release
#   9. Bump plygrid version in web-docs
#  10. Commit + push web-docs → Vercel auto-deploys

VERSION="${1:-}"
DESCRIPTION="${2:-}"

if [[ -z "$VERSION" ]]; then
  echo "Usage: ./scripts/release.sh <version> [\"description\"]"
  echo "  e.g. ./scripts/release.sh 1.0.11 \"Bug fixes and Sass loops\""
  exit 1
fi

WEBDOCS="$PLY_ROOT/plygrid-web-and-docs"
OLD_VERSION=$(node -e "console.log(require('$PLY_ROOT/package.json').version)")

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ply release: v$OLD_VERSION → v$VERSION"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ─── Preflight checks ───────────────────────────────────────────────────────
echo "▸ Preflight checks..."

if ! gh auth status &>/dev/null; then
  echo "  ✗ GitHub CLI not authenticated. Run: gh auth login"
  exit 1
fi
echo "  ✓ GitHub CLI authenticated"

if ! npm whoami &>/dev/null; then
  echo "  ✗ npm not authenticated. Run: npm login"
  exit 1
fi
echo "  ✓ npm authenticated as $(npm whoami)"

if [[ ! -e "$WEBDOCS/.git" ]]; then
  echo "  ✗ plygrid-web-and-docs submodule not initialized"
  exit 1
fi
echo "  ✓ web-docs submodule present"

# Check for uncommitted changes in web-docs (ignore auto-generated files)
WEBDOCS_DIRTY=$(cd "$WEBDOCS" && git diff --name-only HEAD 2>/dev/null | grep -v '\.astro/types\.d\.ts' || true)
if [[ -n "$WEBDOCS_DIRTY" ]]; then
  echo "  ⚠ web-docs has uncommitted changes:"
  echo "$WEBDOCS_DIRTY" | sed 's/^/    /'
  echo "  Commit or stash them first."
  exit 1
fi
echo "  ✓ web-docs working tree clean"
echo ""

# ─── Step 1: Bump version ───────────────────────────────────────────────────
echo "▸ Bumping version: $OLD_VERSION → $VERSION"
cd "$PLY_ROOT"
npm version "$VERSION" --no-git-tag-version --allow-same-version
echo "  ✓ package.json updated"
echo ""

# ─── Step 2: Build + lint ───────────────────────────────────────────────────
echo "▸ Building..."
npm run build
echo "  ✓ Build complete"

echo "▸ Linting..."
npm run lint
echo "  ✓ Lint passed"
echo ""

# ─── Step 3: Commit + tag + push ply ────────────────────────────────────────
echo "▸ Committing ply..."

# Stage source, dist, package.json, README, and JSON
git add \
  package.json package-lock.json \
  src/scss/ \
  dist/css/ \
  ply-classes.json \
  CLAUDE.md \
  README.md \
  PLY.md \
  scripts/ \
  2>/dev/null || true

# Check if there's anything to commit
if git diff --cached --quiet; then
  echo "  ⚠ Nothing to commit — skipping"
else
  git commit -m "v$VERSION — ${DESCRIPTION:-release}"
  echo "  ✓ Committed"
fi

git tag -a "v$VERSION" -m "v$VERSION"
echo "  ✓ Tagged v$VERSION"

git push origin master --tags
echo "  ✓ Pushed to origin/master"
echo ""

# ─── Step 4: npm publish ────────────────────────────────────────────────────
echo "▸ Publishing to npm..."
echo "  (You may be prompted for 2FA)"
echo ""
npm publish
echo ""
echo "  ✓ npm publish completed"
echo ""

# ─── Step 5: Wait for npm availability ──────────────────────────────────────
echo "▸ Waiting for plygrid@$VERSION to appear on npm registry..."
MAX_WAIT=120
WAITED=0
while [[ $WAITED -lt $MAX_WAIT ]]; do
  LIVE=$(npm view plygrid@"$VERSION" version 2>/dev/null || echo "")
  if [[ "$LIVE" == "$VERSION" ]]; then
    echo "  ✓ plygrid@$VERSION is live on npm (${WAITED}s)"
    break
  fi
  sleep 5
  WAITED=$((WAITED + 5))
  echo "  … waiting (${WAITED}s)"
done

if [[ "$LIVE" != "$VERSION" ]]; then
  echo "  ✗ Timed out after ${MAX_WAIT}s. Check npm manually."
  echo "  Skipping web-docs update — run manually when npm is ready."
  exit 1
fi
echo ""

# ─── Step 6: Create GitHub release ──────────────────────────────────────────
echo "▸ Creating GitHub release..."

# Build release notes from commits since last tag
PREV_TAG=$(git tag --sort=-v:refname | grep -v "v$VERSION" | head -1 || echo "")
if [[ -n "$PREV_TAG" ]]; then
  NOTES=$(git log "$PREV_TAG"..HEAD --oneline --no-decorate | sed 's/^/- /')
else
  NOTES=$(git log --oneline -10 --no-decorate | sed 's/^/- /')
fi

RELEASE_BODY="## v$VERSION"
if [[ -n "$DESCRIPTION" ]]; then
  RELEASE_BODY="$RELEASE_BODY

$DESCRIPTION"
fi
RELEASE_BODY="$RELEASE_BODY

### Changes
$NOTES

\`\`\`
npm install plygrid@$VERSION
\`\`\`"

gh release create "v$VERSION" \
  --repo thatgibbyguy/ply \
  --title "v$VERSION" \
  --notes "$RELEASE_BODY"
echo "  ✓ GitHub release created"
echo ""

# ─── Step 7: Update web-docs ────────────────────────────────────────────────
echo "▸ Updating plygrid-web-and-docs..."
cd "$WEBDOCS"

# Bump plygrid dependency
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.dependencies.plygrid = '^$VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"
echo "  ✓ plygrid dependency → ^$VERSION"

# Install to update lockfile
npm install plygrid@"$VERSION"
echo "  ✓ npm install complete"

# Commit and push
git add package.json package-lock.json
if ! git diff --cached --quiet; then
  git commit -m "bump plygrid to v$VERSION"
  git push origin HEAD
  echo "  ✓ Pushed web-docs → Vercel will auto-deploy"
else
  echo "  ⚠ No changes to commit in web-docs"
fi
echo ""

# ─── Step 8: Update submodule ref in ply ─────────────────────────────────────
cd "$PLY_ROOT"
git add plygrid-web-and-docs
if ! git diff --cached --quiet; then
  git commit -m "update submodule — v$VERSION"
  git push origin master
  echo "  ✓ Submodule reference updated"
fi

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║  ✓ Release v$VERSION complete!"
echo "║"
echo "║  npm:    https://www.npmjs.com/package/plygrid"
echo "║  GitHub: https://github.com/thatgibbyguy/ply/releases/tag/v$VERSION"
echo "║  Docs:   https://plycss.com"
echo "╚══════════════════════════════════════════════╝"
