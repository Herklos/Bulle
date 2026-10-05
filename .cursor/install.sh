#!/usr/bin/env bash
# Idempotent bootstrap for Cursor cloud agents. Must exit.
# Login shells skip ~/.bashrc, so shims go on the default PATH.
set -euo pipefail

export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

if ! command -v node >/dev/null 2>&1; then
  echo "node is not on PATH" >&2
  exit 1
fi

if ! command -v corepack >/dev/null 2>&1; then
  echo "corepack is not on PATH" >&2
  exit 1
fi

# package.json pins pnpm@10.33.0. Workspace packages require Node >= 20.16.
node -e 'const [major, minor] = process.versions.node.split(".").map(Number); if (major < 20 || (major === 20 && minor < 16)) { console.error("Node >= 20.16 is required, got " + process.version); process.exit(1); }'

sudo env PATH="$PATH" COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack enable --install-directory /usr/local/bin
sudo env PATH="$PATH" COREPACK_ENABLE_DOWNLOAD_PROMPT=0 corepack prepare pnpm@10.33.0 --activate

hash -r
pnpm install --frozen-lockfile

# wrangler.toml and `pnpm deploy` call the CLI. It is not a workspace dependency.
# npm's global prefix on this image is "/", so install into an explicit prefix.
if ! command -v wrangler >/dev/null 2>&1; then
  sudo mkdir -p /opt/wrangler
  sudo env PATH="$PATH" npm install --prefix /opt/wrangler wrangler
  sudo ln -sfn /opt/wrangler/node_modules/.bin/wrangler /usr/local/bin/wrangler
fi
