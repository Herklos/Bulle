import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

/**
 * `@bulle/ui`'s build used to end in `|| true`, so a failing declaration emit
 * still exited 0. CI never ran `pnpm -r build`, so that swallow was outside
 * the pull-request gate. These assertions keep both halves closed.
 */
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

describe('package build gate', () => {
  it('fails the UI build when declaration emit fails', () => {
    const pkg = JSON.parse(readFileSync(resolve(root, 'packages/ui/package.json'), 'utf8')) as {
      scripts: { build: string };
    };

    expect(pkg.scripts.build).toBe('tsup && tsc --emitDeclarationOnly --skipLibCheck');
    expect(pkg.scripts.build).not.toContain('|| true');
  });

  it('runs the package builds in CI', () => {
    const ci = readFileSync(resolve(root, '.github/workflows/ci.yml'), 'utf8');
    expect(ci).toContain('pnpm -r build');
  });
});
