import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * pnpm has autoInstallPeers on. If @bulle/ui asks for a different React Native,
 * Reanimated, or @expo/ui than the app, pnpm installs that second copy under
 * packages/ui/node_modules. Metro resolves from the file it is compiling, so UI
 * source then loads the stale copy instead of the Expo SDK version the app ships.
 * Keeping the specifiers identical is what lets the workspace hoist one copy.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

type PackageJson = {
  dependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

function readPkg(rel: string): PackageJson {
  return JSON.parse(readFileSync(resolve(root, rel), 'utf8')) as PackageJson;
}

describe('@bulle/ui peer dependencies', () => {
  it('use the same specifiers as the mobile app', () => {
    const ui = readPkg('packages/ui/package.json');
    const app = readPkg('apps/mobile/package.json');
    const peers = ui.peerDependencies ?? {};
    const deps = app.dependencies ?? {};
    const mismatches = Object.entries(peers)
      .filter(([name, range]) => deps[name] !== range)
      .map(([name, range]) => `${name}: ui ${range}, app ${deps[name] ?? 'missing'}`);

    expect(mismatches).toEqual([]);
  });
});
