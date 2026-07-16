/**
 * What Bulle Complète unlocks (spec §10).
 *
 * THE DECISION THAT SHAPES EVERYTHING HERE: **couple sync is FREE.**
 *
 * The north-star metric is "both parents acted in the last 7 days". Putting sync behind the
 * paywall would tax the exact behaviour that drives retention and word of mouth, to protect
 * a cost measured in centimes of encrypted object storage per couple. So the free tier is a
 * genuinely useful two-person app, and Complète sells depth rather than access to your
 * partner.
 *
 * One-time purchase per bulle, both parents included. No subscription — the product's whole
 * pitch is that it does not rent you your own data.
 *
 * Gates are placed at VALUE MOMENTS, not on a generic "upgrade" screen (§10):
 *   - the Admin FR template, offered around week 8-16, which is the paperwork-anxiety peak
 *   - the 3rd project
 */

import type { Project } from '@bulle/sdk';

/** The RevenueCat entitlement identifier. Must match the dashboard exactly. */
export const PREMIUM_ENTITLEMENT = 'complete';

/** The offering to fetch. */
export const PREMIUM_OFFERING = 'default';

/**
 * Free tier: two projects.
 *
 * Two, not one: one project is a demo, and a free tier that cannot demonstrate the product
 * does not convert, it just annoys. Two is enough to genuinely prepare (say Valise + Nid)
 * and to feel the shape of the thing.
 */
export const FREE_PROJECT_LIMIT = 2;

/**
 * Templates that require Complète.
 *
 * Admin FR only. It is the flagship (§5.4), it is the thing no competitor has, and it is
 * what justifies the price — so it is the gate. Everything else, including the whole
 * preparation flow, works free.
 */
export const PREMIUM_TEMPLATE_IDS = new Set(['tpl-admin-fr']);

export function isPremiumTemplate(templateId: string): boolean {
  return PREMIUM_TEMPLATE_IDS.has(templateId);
}

/** Why a gate is being shown. Drives which three benefits the paywall lists (§10). */
export type GateReason = 'adminTemplate' | 'projectLimit';

/**
 * Whether adding another project needs Complète.
 *
 * Counts EXISTING projects, so the limit bites when adding the third — the user gets two
 * whole projects before ever seeing a paywall.
 */
export function needsPremiumForProject(projects: Project[], isPremium: boolean): boolean {
  return !isPremium && projects.length >= FREE_PROJECT_LIMIT;
}

/** Whether a given template needs Complète. */
export function needsPremiumForTemplate(templateId: string, isPremium: boolean): boolean {
  return !isPremium && isPremiumTemplate(templateId);
}
