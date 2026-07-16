/**
 * Generates dist/llms.txt, and asserts it.
 *
 * Same side-effecting-test pattern as the sitemap: generation and its assertions are one
 * artifact, so a broken llms.txt fails the build rather than shipping quietly.
 */
import { describe, expect, it } from 'vitest';
import { mkdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { buildBlogSection, injectBlogSection, writeLlmsTxtFile } from '@/lib/llms-txt';
import { BLOG_FIRST_PUBLISH_DATE, BLOG_PUBLISH_PRIORITY } from '@/lib/blog-publish-dates';

const APP = path.resolve(__dirname, '..');
const DIST = path.join(APP, 'dist');

describe('llms.txt', () => {
  const firstSlug = BLOG_PUBLISH_PRIORITY[0];
  const lastSlug = BLOG_PUBLISH_PRIORITY[BLOG_PUBLISH_PRIORITY.length - 1];

  it('lists only published articles', () => {
    const section = buildBlogSection(BLOG_FIRST_PUBLISH_DATE);
    expect(section).toContain(`/fr/blog/${firstSlug}`);
    expect(section).not.toContain(`/fr/blog/${lastSlug}`);
  });

  it('says so plainly before launch rather than emitting an empty section', () => {
    expect(buildBlogSection('2026-07-19')).toContain('20 juillet 2026');
  });

  it('grows by one article a day', () => {
    const count = (asOf: string) =>
      (buildBlogSection(asOf).match(/^- \[/gm) ?? []).length;
    expect(count('2026-07-20')).toBe(1);
    expect(count('2026-07-21')).toBe(2);
  });

  it('injects between the markers and leaves the rest of the file intact', () => {
    const source = readFileSync(path.join(APP, 'public', 'llms.txt'), 'utf8');
    const out = injectBlogSection(source, '2026-07-21');
    expect(out).toContain('# Bulle');
    expect(out).toContain('## Authors');
    // The generated marker comment is replaced, not duplicated.
    expect(out).not.toContain('do not hand-edit');
    expect((out.match(/<!-- BLOG:START -->/g) ?? []).length).toBe(1);
  });

  it('throws rather than silently producing a file with no blog section', () => {
    expect(() => injectBlogSection('# Bulle\n\nno markers here')).toThrow(/markers/);
  });

  it('writes dist/llms.txt', () => {
    mkdirSync(DIST, { recursive: true });
    const written = writeLlmsTxtFile();
    expect(readFileSync(written, 'utf8')).toContain('# Bulle');
  });
});
