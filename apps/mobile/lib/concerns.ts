/**
 * The onboarding concern (§5.12 q5) → which templates Préparer proposes first.
 *
 * Lives here rather than in the onboarding route: two screens need it (onboarding writes it,
 * Préparer reads it), and importing from a route file makes expo-router's require.context
 * evaluate a screen just to read a constant.
 *
 * This only ever RE-RANKS what the suggestion engine already proposed. It never surfaces a
 * template whose window has not opened — a concern is a preference, not an override.
 */
import type { Concern } from '@/store/useSettingsStore';

export const CONCERN_TEMPLATE_ORDER: Record<Concern, string[]> = {
  admin: ['tpl-admin-fr'],
  organisation: ['tpl-valise', 'tpl-admin-fr'],
  shopping: ['tpl-nid'],
  // "Un peu tout" is a real answer, not a non-answer: it means keep the engine's own
  // week-based order, which is already the sensible default.
  everything: [],
};
