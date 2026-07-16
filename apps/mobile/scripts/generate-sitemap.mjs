#!/usr/bin/env node
/**
 * Writes dist/sitemap.xml and dist/robots.txt after `expo export`.
 *
 * Runs the TS sitemap builder through vitest so the `@/` path aliases resolve without a
 * separate build step — the same trick the reference app uses. The test both asserts the
 * output and writes it, so a broken sitemap fails the build instead of shipping.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const result = spawnSync('pnpm', ['exec', 'vitest', 'run', '__tests__/generate-sitemap.test.ts'], {
  cwd: appRoot,
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status ?? (result.error ? 1 : 0));
