/**
 * The country guard.
 *
 * `templateAppliesInCountry` fails OPEN: a template with no `countries` applies everywhere.
 * That default is right — most templates (valise, nid, achats) are genuinely universal, and
 * making authors opt in to "this is normal" would be noise.
 *
 * It also means forgetting the field is silent. `tpl-jumeaux` and `tpl-solo` shipped with
 * `locales: ['fr']` and no `countries`, so a francophone bulle in Belgium was offered tasks
 * telling it to file with the CPAM, the CAF and the ASF. Nothing failed. The template just
 * quietly applied somewhere its content is wrong about the law.
 *
 * The heuristic below is the cheapest thing that would have caught it: a template restricted
 * to French SPEAKERS is about a French-speaking place, not about everywhere. That is not a
 * law of nature — a genuinely pan-francophone template could exist — but it does not today,
 * and this test failing is the right moment to think about it rather than to discover it from
 * a Belgian user.
 */
import { describe, expect, it } from 'vitest';
import { PROJECT_TEMPLATES, templateAppliesInCountry, DEFAULT_COUNTRY } from './templates.js';

describe('template country flags', () => {
  it('every locale-restricted template declares the countries it is about', () => {
    const offenders = PROJECT_TEMPLATES.filter((t) => t.locales?.length && !t.countries?.length).map(
      (t) => t.id,
    );
    expect(offenders).toEqual([]);
  });

  it('does not offer French administrative templates outside France', () => {
    // The actual bug, stated as the user's experience rather than as a field check.
    const frOnly = PROJECT_TEMPLATES.filter((t) => t.countries?.includes('FR') && t.countries.length === 1);
    expect(frOnly.length).toBeGreaterThan(0);
    for (const t of frOnly) {
      expect(templateAppliesInCountry(t, 'BE'), `${t.id} leaked into BE`).toBe(false);
      expect(templateAppliesInCountry(t, 'FR'), `${t.id} vanished from FR`).toBe(true);
    }
  });

  it('keeps universal templates universal', () => {
    // The other half of the guard: over-tagging would quietly empty the plan outside France,
    // and a valise is a valise everywhere.
    const universal = PROJECT_TEMPLATES.filter((t) => !t.countries?.length);
    expect(universal.length).toBeGreaterThan(0);
    for (const t of universal) {
      expect(templateAppliesInCountry(t, 'BE')).toBe(true);
      expect(templateAppliesInCountry(t, DEFAULT_COUNTRY)).toBe(true);
    }
  });
});
