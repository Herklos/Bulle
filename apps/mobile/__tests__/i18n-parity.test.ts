/**
 * FR and EN must define the same keys.
 *
 * A missing key is invisible in every other check: i18next has no types here and returns
 * the KEY itself when it misses, so the app renders the literal string
 * "settings.premium" to the user and nothing fails. That shipped once already, on the More
 * screen, and was only caught by looking at a screenshot.
 *
 * The DELIBERATE gaps are listed below. §7.1: EN ships without the French administrative
 * module rather than with a bad translation of it, and several templates are FR-only for
 * the same reason. Everything else must match in both directions.
 */
import { describe, expect, it } from 'vitest';
import { en } from '@/i18n/en';
import { fr } from '@/i18n/fr';

/**
 * Keys allowed to exist in FR and not in EN (§7.1). Prefix match.
 *
 * Adding to this list is a product decision, not a maintenance chore: it means an English
 * user will not see that feature at all.
 */
const FR_ONLY_PREFIXES = [
  'templates.adminFr',
  'templates.garde',
  'templates.decisions',
  'templates.securite',
  'templates.jumeaux',
  'templates.solo',
  'templates.budget',
  'templates.postnatal',
];

/** Every leaf path in a nested translation object. */
function leaves(node: unknown, prefix = ''): string[] {
  if (node === null || typeof node !== 'object') return [prefix];
  // An array leaf (a details body) is a value, not a branch.
  if (Array.isArray(node)) return [prefix];
  return Object.entries(node as Record<string, unknown>).flatMap(([key, value]) =>
    leaves(value, prefix ? `${prefix}.${key}` : key),
  );
}

const frKeys = new Set(leaves(fr));
const enKeys = new Set(leaves(en));
const isFrOnly = (key: string) => FR_ONLY_PREFIXES.some((p) => key.startsWith(p));

describe('i18n parity', () => {
  it('has no EN key missing from FR', () => {
    // This direction is the one that bit us: FR is the default language, so a key present
    // only in EN renders as raw text to the primary audience.
    const missing = [...enKeys].filter((k) => !frKeys.has(k)).sort();
    expect(missing).toEqual([]);
  });

  it('has no FR key missing from EN, outside the deliberate §7.1 gaps', () => {
    const missing = [...frKeys].filter((k) => !enKeys.has(k) && !isFrOnly(k)).sort();
    expect(missing).toEqual([]);
  });

  it('really does keep the FR admin module out of EN (§7.1)', () => {
    // Guards the exception list itself: if someone "fixes" the gap by machine-translating
    // adminFr into EN, that is a product decision and this test should be the thing that
    // makes them say so out loud.
    expect([...enKeys].some((k) => k.startsWith('templates.adminFr'))).toBe(false);
  });

  it('lists no stale exception', () => {
    // An exception whose keys no longer exist in FR is dead config that quietly widens the
    // hole for the next person.
    for (const prefix of FR_ONLY_PREFIXES) {
      expect([...frKeys].some((k) => k.startsWith(prefix)), `${prefix} matches nothing`).toBe(
        true,
      );
    }
  });
});
