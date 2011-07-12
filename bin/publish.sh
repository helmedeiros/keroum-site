#!/usr/bin/env bash
# Publish dist/ to the gh-pages branch.
# - Preserves gh-pages history (commits on top, force-pushes only if needed).
# - The published commit's author/committer dates match the current source HEAD.
# - Uses a temporary git worktree, never touches the active working tree.
set -euo pipefail

DIST="dist"
REMOTE="${REMOTE:-origin}"
BRANCH="${BRANCH:-gh-pages}"

if [ ! -d "$DIST" ]; then
	echo "publish: $DIST/ missing. Run 'make build' first." >&2
	exit 1
fi

SOURCE_SHA=$(git rev-parse --short HEAD)
SOURCE_SUBJECT=$(git log -1 --format=%s)
SOURCE_DATE=$(git log -1 --format=%aI)

git fetch --quiet "$REMOTE" "$BRANCH:refs/remotes/$REMOTE/$BRANCH" 2>/dev/null || true

WORKTREE=$(mktemp -d -t kerohum-publish.XXXX)
PUBLISH_BRANCH="publish-tmp-$$"
trap 'git worktree remove --force "'"$WORKTREE"'" >/dev/null 2>&1 || rm -rf "'"$WORKTREE"'"; git branch -D "'"$PUBLISH_BRANCH"'" >/dev/null 2>&1 || true' EXIT

if git rev-parse --verify --quiet "refs/remotes/$REMOTE/$BRANCH" >/dev/null; then
	git worktree add -B "$PUBLISH_BRANCH" "$WORKTREE" "refs/remotes/$REMOTE/$BRANCH" >/dev/null
else
	git worktree add --detach "$WORKTREE" >/dev/null
	(cd "$WORKTREE" && git checkout --orphan "$PUBLISH_BRANCH" >/dev/null && git rm -rf . >/dev/null 2>&1 || true)
fi

find "$WORKTREE" -mindepth 1 -maxdepth 1 -not -name '.git' -exec rm -rf {} +
cp -R "$DIST"/. "$WORKTREE"/

(
	cd "$WORKTREE"
	git add -A
	if git diff --cached --quiet; then
		echo "publish: dist/ matches origin/$BRANCH, nothing to push."
		exit 0
	fi
	GIT_AUTHOR_DATE="$SOURCE_DATE" GIT_COMMITTER_DATE="$SOURCE_DATE" \
		git commit -m "publish: $SOURCE_SUBJECT" -m "Source: $SOURCE_SHA" >/dev/null
	git push --quiet "$REMOTE" "HEAD:$BRANCH"
	echo "publish: pushed $(git rev-parse --short HEAD) to $REMOTE/$BRANCH"
)
