#!/usr/bin/env node
/**
 * Copies the exported not-found route to the filename Cloudflare expects.
 *
 * Expo names its not-found route `+not-found.html`. Cloudflare's `not_found_handling =
 * "404-page"` looks for `404.html` and nothing else, so without this copy the setting
 * silently falls back to serving a bare 404 with no page at all.
 *
 * Why not `single-page-application` instead, which needs no copy: Bulle is a static export
 * where every route is a real prerendered file. SPA handling returns index.html with a 200
 * for anything unmatched, so every typo and every dead backlink becomes a soft 404 that
 * Google indexes as a duplicate of the home page. A real 404 status is the whole point.
 */
import { copyFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const APP = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const DIST = path.join(APP, 'dist');

const source = path.join(DIST, '+not-found.html');
const target = path.join(DIST, '404.html');

if (!existsSync(source)) {
  // Fail loudly. A missing 404 is exactly the kind of thing nobody notices until a crawler
  // reports thousands of soft 404s, months later.
  console.error(`[404] Missing ${source}. Did the web export run?`);
  process.exit(1);
}

copyFileSync(source, target);
console.log('[404] dist/+not-found.html -> dist/404.html');
