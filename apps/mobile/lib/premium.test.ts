/**
 * The gate logic decides what people pay for, so it gets tests. Every case below is a way
 * to accidentally either give the product away or wall off the free tier.
 */
import { describe, expect, it } from 'vitest';
import {
  FREE_PROJECT_LIMIT,
  isPremiumTemplate,
  needsPremiumForProject,
  needsPremiumForTemplate,
} from './premium';
import type { Project } from '@bulle/sdk';

const project = (id: string): Project => ({
  id,
  title: id,
  glyph: 'plan',
  order: 0,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
});

const projects = (n: number) => Array.from({ length: n }, (_, i) => project(`p${i}`));

describe('project limit', () => {
  it('lets a free user create up to the limit', () => {
    expect(needsPremiumForProject(projects(0), false)).toBe(false);
    expect(needsPremiumForProject(projects(1), false)).toBe(false);
  });

  it('gates the project AFTER the limit, not at it', () => {
    // Two whole projects before anyone sees a paywall. A free tier that cannot demonstrate
    // the product does not convert, it annoys.
    expect(FREE_PROJECT_LIMIT).toBe(2);
    expect(needsPremiumForProject(projects(2), false)).toBe(true);
    expect(needsPremiumForProject(projects(3), false)).toBe(true);
  });

  it('never gates a premium user', () => {
    expect(needsPremiumForProject(projects(99), true)).toBe(false);
  });
});

describe('premium templates', () => {
  it('gates Admin FR, the flagship', () => {
    expect(isPremiumTemplate('tpl-admin-fr')).toBe(true);
    expect(needsPremiumForTemplate('tpl-admin-fr', false)).toBe(true);
  });

  it('leaves the whole preparation flow free', () => {
    // If any of these ever starts gating, the free tier stops being a usable product.
    for (const id of ['tpl-valise', 'tpl-nid', 'tpl-achats', 'tpl-securite', 'tpl-solo', 'tpl-jumeaux']) {
      expect(isPremiumTemplate(id)).toBe(false);
      expect(needsPremiumForTemplate(id, false)).toBe(false);
    }
  });

  it('never gates a premium user', () => {
    expect(needsPremiumForTemplate('tpl-admin-fr', true)).toBe(false);
  });
});

describe('what is deliberately NOT gated', () => {
  it('sync is free — it is not represented here at all', async () => {
    // The north-star metric is both parents active. Gating sync would tax the exact
    // behaviour that drives retention, to protect a cost measured in centimes. This test
    // exists so that adding a `needsPremiumForSync` has to delete an explicit assertion
    // rather than quietly slip in.
    const premium = await import('./premium');
    expect(Object.keys(premium)).not.toContain('needsPremiumForSync');
    expect(Object.keys(premium)).not.toContain('needsPremiumForInvite');
  });
});
