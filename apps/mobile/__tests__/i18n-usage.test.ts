/**
 * Every STATIC `t('a.b.c')` key used in the app must resolve in the locale.
 *
 * The parity test guards FR against EN, but neither guards the CODE against the locale:
 * i18next returns the key itself on a miss, so a `t('task.countHint')` whose key actually
 * lives at `plan.countHint` renders the literal string "task.countHint" to the user and
 * nothing fails. That has now shipped twice — `settings.premium` on the More screen, and
 * `task.countHint` on the task screen — each caught only by eye. This is the check that
 * turns "invisible until a screenshot" into "red in CI".
 *
 * SCOPE: only statically-analysable keys — `t('literal.string')`. Keys built from a
 * template literal (`t(`plan.effort.${effort}`)`) or a variable (`t(item.labelKey)`) can't
 * be resolved here and are covered by the enum-vs-locale shape instead.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { en } from '@/i18n/en';
import { fr } from '@/i18n/fr';

/** Every leaf path in a nested translation object (arrays and strings are leaves). */
function leaves(node: unknown, prefix = ''): string[] {
  if (node === null || typeof node !== 'object') return [prefix];
  if (Array.isArray(node)) return [prefix];
  return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) =>
    leaves(value, prefix ? `${prefix}.${key}` : key),
  );
}

const frKeys = new Set(leaves(fr));
const enKeys = new Set(leaves(en));

// i18next resolves a plural call `t('birth.deadlineDays', { count })` against suffixed
// leaves (`birth.deadlineDays_one`, `_other`, …) — the base key is never a leaf itself.
const PLURAL_SUFFIXES = ['_zero', '_one', '_two', '_few', '_many', '_other'];
const resolves = (key: string, set: Set<string>) =>
  set.has(key) || PLURAL_SUFFIXES.some((s) => set.has(key + s));

const APP_ROOT = fileURLToPath(new URL('..', import.meta.url));

function sourceFiles(dir: string): string[] {
  let out: string[] = [];
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '__tests__') continue;
    const full = `${dir}/${entry}`;
    if (statSync(full).isDirectory()) out = out.concat(sourceFiles(full));
    else if (/\.(ts|tsx)$/.test(entry) && !/\.test\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

/** Static `t('a.b')` / `t("a.b")` keys, per file. Template-literal keys are skipped. */
function usedKeys(): Map<string, string> {
  const re = /\bt\(\s*'([^']+)'|\bt\(\s*"([^"]+)"/g;
  const found = new Map<string, string>();
  for (const dir of ['app', 'components', 'lib']) {
    for (const file of sourceFiles(`${APP_ROOT}/${dir}`)) {
      const src = readFileSync(file, 'utf8');
      let m: RegExpExecArray | null;
      while ((m = re.exec(src))) {
        const key = m[1] ?? m[2];
        // Namespaced keys only; a bare word like t('save') is not a translation path here.
        if (key.includes('.') && !found.has(key)) found.set(key, file.slice(APP_ROOT.length));
      }
    }
  }
  return found;
}

describe('i18n usage', () => {
  const used = usedKeys();

  it('found a meaningful number of keys (the scanner still works)', () => {
    expect(used.size).toBeGreaterThan(100);
  });

  it('every static t() key resolves in FR (the default language)', () => {
    const missing = [...used].filter(([k]) => !resolves(k, frKeys)).map(([k, f]) => `${k}  (${f})`);
    expect(missing).toEqual([]);
  });

  it('every static t() key resolves in EN', () => {
    const missing = [...used].filter(([k]) => !resolves(k, enKeys)).map(([k, f]) => `${k}  (${f})`);
    expect(missing).toEqual([]);
  });
});
