#!/usr/bin/env node
/**
 * Writes dist/sitemap.xml and dist/llms.txt after `expo export`.
 *
 * (robots.txt is static and lives in public/, which expo export copies verbatim.)
 *
 * Runs the TS builders through vitest so the `@/` path aliases resolve without a separate
 * build step. The tests both assert the output and write it, so a broken sitemap or
 * llms.txt fails the build instead of shipping quietly.
 *
 * BUILD_DATE is honoured by both, so a scheduled daily build is all that releases the next
 * article. Without that cron, nothing ever publishes.
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const result = spawnSync(
  'pnpm',
  [
    'exec',
    'vitest',
    'run',
    '__tests__/generate-sitemap.test.ts',
    '__tests__/generate-llms-txt.test.ts',
  ],
  { cwd: appRoot, stdio: 'inherit', env: process.env },
);

process.exit(result.status ?? (result.error ? 1 : 0));
