/**
 * dist/llms.txt — the LLM-facing summary of the site.
 *
 * The blog section is GENERATED from lib/blog.ts and injected between the BLOG markers in
 * public/llms.txt, rather than hand-written and filtered.
 *
 * That is a deliberate divergence from the reference app, which hand-authors every blog line
 * and drops the unpublished ones with a regex. Two lines of its checked-in llms.txt carry
 * the wrong label and the wrong language as a result — exactly the drift you get when the
 * same fact is written down twice. Generating the section means an article's title can only
 * be wrong in one place.
 *
 * The publish gate applies here as everywhere else: an unpublished article must not be
 * advertised to a crawler before its page exists.
 */

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { getPublishedBlogPosts } from './blog';
import { localizedUrl } from './seo-urls';

const START = '<!-- BLOG:START -->';
const END = '<!-- BLOG:END -->';

/** One markdown line per published FR article. */
export function buildBlogSection(asOf?: string): string {
  const posts = getPublishedBlogPosts('fr', asOf);
  if (posts.length === 0) {
    return '_Le Carnet ouvre le 20 juillet 2026, un article par jour._';
  }
  return posts
    .map((post) => `- [${post.title}](${localizedUrl('fr', `/blog/${post.slug}`)}): ${post.excerpt}`)
    .join('\n');
}

/** Replace everything between the markers with the generated section. */
export function injectBlogSection(content: string, asOf?: string): string {
  const start = content.indexOf(START);
  const end = content.indexOf(END);
  if (start === -1 || end === -1 || end < start) {
    throw new Error('llms.txt is missing its BLOG:START / BLOG:END markers');
  }
  return (
    content.slice(0, start + START.length) +
    '\n' +
    buildBlogSection(asOf) +
    '\n' +
    content.slice(end)
  );
}

/**
 * Writes dist/llms.txt from public/llms.txt.
 *
 * Reads the SOURCE file, not dist/, so this is safe to run before or after `expo export`
 * has populated dist — the ordering of the two is otherwise a silent trap.
 */
export function writeLlmsTxtFile(options?: {
  distDir?: string;
  publicDir?: string;
  asOf?: string;
}): string {
  const publicPath = join(options?.publicDir ?? join(__dirname, '..', 'public'), 'llms.txt');
  const distDir = options?.distDir ?? join(__dirname, '..', 'dist');
  const distPath = join(distDir, 'llms.txt');
  writeFileSync(distPath, injectBlogSection(readFileSync(publicPath, 'utf8'), options?.asOf), 'utf8');
  return distPath;
}
