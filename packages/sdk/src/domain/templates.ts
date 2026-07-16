/**
 * Project templates (spec §5.3/§5.4).
 *
 * Templates are CODE (so `appliesTo` can be a predicate), but their copy is i18n keys
 * resolved at instantiation — the resulting Task carries a literal, editable title.
 *
 * Every task sits on a WEEK-WINDOW in SA, never a date. Instantiating against a due date
 * therefore needs no date maths at all: the windows are already in the same units the
 * Journey and the suggestion engine speak, and correcting the due date after a scan
 * silently re-times every task with no rescheduling pass.
 *
 * Regulatory line (§7.3): every task here schedules *preparation*, never care. No triage,
 * no diagnosis, no monitoring — that is what keeps Bulle outside EU MDR scope.
 */

import type { ProjectTemplate } from './types.js';

/**
 * The flagship (§5.4). Nearly absent from competitors and, per the spec, the single
 * highest-value checklist content for the launch market.
 *
 * Amounts and delays are deliberately NOT encoded: the spec treats them as content data
 * reviewed each January. Only stable statutory deadlines appear ("avant la fin du 3e mois",
 * "≤ 5 jours"), and each task links to the official source rather than restating it.
 */
const ADMIN_FR: ProjectTemplate = {
  id: 'tpl-admin-fr',
  titleKey: 'templates.adminFr.title',
  descriptionKey: 'templates.adminFr.description',
  glyph: 'stamp',
  locales: ['fr'],
  tasks: [
    {
      titleKey: 'templates.adminFr.tasks.declaration',
      notesKey: 'templates.adminFr.tasks.declarationNote',
      weekStart: 8,
      weekEnd: 15,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.maternite',
      weekStart: 10,
      weekEnd: 18,
      effort: 'M',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.consultations',
      notesKey: 'templates.adminFr.tasks.consultationsNote',
      weekStart: 10,
      weekEnd: 40,
      effort: 'S',
      domain: 'sante',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.echographies',
      weekStart: 10,
      weekEnd: 32,
      effort: 'S',
      domain: 'sante',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.mutuelle',
      weekStart: 12,
      weekEnd: 24,
      effort: 'S',
      domain: 'finances',
      essential: false,
    },
    {
      titleKey: 'templates.adminFr.tasks.congeMaternite',
      weekStart: 16,
      weekEnd: 24,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.congePaternite',
      weekStart: 20,
      weekEnd: 30,
      effort: 'S',
      domain: 'administratif',
      essential: false,
      href: 'https://www.service-public.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.reconnaissance',
      notesKey: 'templates.adminFr.tasks.reconnaissanceNote',
      weekStart: 12,
      weekEnd: 30,
      effort: 'S',
      domain: 'administratif',
      essential: false,
    },
    {
      titleKey: 'templates.adminFr.tasks.garde',
      notesKey: 'templates.adminFr.tasks.gardeNote',
      weekStart: 12,
      weekEnd: 24,
      effort: 'L',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.paje',
      weekStart: 14,
      weekEnd: 28,
      effort: 'S',
      domain: 'finances',
      essential: false,
      href: 'https://www.caf.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.postNaissance',
      notesKey: 'templates.adminFr.tasks.postNaissanceNote',
      weekStart: 36,
      weekEnd: 41,
      effort: 'S',
      domain: 'postpartum',
      essential: true,
    },
  ],
};

/** Versioned by bag owner, per §5.3 (maman / bébé / co-parent). */
const VALISE: ProjectTemplate = {
  id: 'tpl-valise',
  titleKey: 'templates.valise.title',
  descriptionKey: 'templates.valise.description',
  glyph: 'bag',
  tasks: [
    {
      titleKey: 'templates.valise.tasks.maman',
      weekStart: 34,
      weekEnd: 37,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.bebe',
      weekStart: 34,
      weekEnd: 37,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.coparent',
      weekStart: 35,
      weekEnd: 38,
      effort: 'S',
      domain: 'maison',
      essential: false,
      // Solo mode must never surface a co-parent bag.
    },
    {
      titleKey: 'templates.valise.tasks.documents',
      notesKey: 'templates.valise.tasks.documentsNote',
      weekStart: 32,
      weekEnd: 36,
      effort: 'S',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.siegeAuto',
      notesKey: 'templates.valise.tasks.siegeAutoNote',
      weekStart: 34,
      weekEnd: 38,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.trajet',
      weekStart: 35,
      weekEnd: 39,
      effort: 'S',
      domain: 'maison',
      essential: false,
    },
  ],
};

const NID: ProjectTemplate = {
  id: 'tpl-nid',
  titleKey: 'templates.nid.title',
  descriptionKey: 'templates.nid.description',
  glyph: 'nest',
  tasks: [
    {
      titleKey: 'templates.nid.tasks.emplacement',
      weekStart: 20,
      weekEnd: 26,
      effort: 'S',
      domain: 'maison',
      essential: false,
    },
    {
      titleKey: 'templates.nid.tasks.lit',
      notesKey: 'templates.nid.tasks.litNote',
      weekStart: 24,
      weekEnd: 30,
      effort: 'M',
      domain: 'achats',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.installerLit',
      weekStart: 30,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.laverVetements',
      notesKey: 'templates.nid.tasks.laverVetementsNote',
      weekStart: 30,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.change',
      weekStart: 26,
      weekEnd: 32,
      effort: 'S',
      domain: 'maison',
      essential: false,
    },
    {
      titleKey: 'templates.nid.tasks.securite',
      weekStart: 28,
      weekEnd: 38,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
  ],
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [ADMIN_FR, VALISE, NID];

export function templateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((t) => t.id === id);
}

/** Templates offered for a locale — see `ProjectTemplate.locales` and spec §7.1. */
export function templatesForLocale(locale: string): ProjectTemplate[] {
  const lang = locale.split('-')[0];
  return PROJECT_TEMPLATES.filter((t) => !t.locales || t.locales.includes(lang));
}
