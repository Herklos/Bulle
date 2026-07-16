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
      // 6–16 SA, NOT 8–15. The deadline is "avant la fin du 3e mois de grossesse", which is
      // 14 weeks of GESTATION = 16 SA. Bulle counts in SA everywhere (§7.2), and conflating
      // the two scales here shortens the single most consequential deadline in the app by a
      // week — miss it and the prime à la naissance can be refused outright.
      weekStart: 6,
      weekEnd: 16,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      // In force 01/07/2026 (LFSS 2026, C. trav. L1225-46-2 s.). An INDIVIDUAL,
      // non-transferable right per parent: what one parent does not take is simply lost,
      // which is exactly why it belongs in a preparation app rather than an HR page.
      titleKey: 'templates.adminFr.tasks.congeSupplementaire',
      notesKey: 'templates.adminFr.tasks.congeSupplementaireNote',
      weekStart: 34,
      weekEnd: 40,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/actualites/A18939',
    },
    {
      titleKey: 'templates.adminFr.tasks.employeurGrossesse',
      notesKey: 'templates.adminFr.tasks.employeurGrossesseNote',
      weekStart: 12,
      weekEnd: 30,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2265',
    },
    {
      titleKey: 'templates.adminFr.tasks.verifierDeclaration',
      notesKey: 'templates.adminFr.tasks.verifierDeclarationNote',
      weekStart: 16,
      weekEnd: 22,
      effort: 'S',
      domain: 'administratif',
      essential: false,
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
    // ── After the birth ──
    //
    // These sit at 41+ SA, i.e. past the DPA. The window is a display convenience: the real
    // clocks here run from the BIRTH DATE, not from a gestational week, and two of them are
    // strict (5 days for the mairie, 60 days for the impôts). See the note in
    // domain/tasks.ts — SA cannot express a post-birth deadline, so these must not be the
    // only reminder a parent gets.
    {
      titleKey: 'templates.adminFr.tasks.declarationNaissance',
      notesKey: 'templates.adminFr.tasks.declarationNaissanceNote',
      weekStart: 41,
      weekEnd: 42,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F961',
    },
    {
      titleKey: 'templates.adminFr.tasks.acteNaissance',
      notesKey: 'templates.adminFr.tasks.acteNaissanceNote',
      weekStart: 41,
      weekEnd: 44,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F11991',
    },
    {
      titleKey: 'templates.adminFr.tasks.rattachementVitale',
      notesKey: 'templates.adminFr.tasks.rattachementVitaleNote',
      weekStart: 41,
      weekEnd: 43,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      // Mutuelle AFTER the CPAM rattachement, never before — the reverse order is rejected.
      titleKey: 'templates.adminFr.tasks.rattachementMutuelle',
      notesKey: 'templates.adminFr.tasks.rattachementMutuelleNote',
      weekStart: 41,
      weekEnd: 45,
      effort: 'S',
      domain: 'finances',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.impots',
      notesKey: 'templates.adminFr.tasks.impotsNote',
      weekStart: 41,
      weekEnd: 49,
      effort: 'S',
      domain: 'finances',
      essential: true,
      href: 'https://www.impots.gouv.fr',
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

/**
 * Mode de garde. Its own project rather than one line in Administratif, because it is not
 * one step — it is a months-long parallel process with a municipal calendar you do not
 * control, and it is the single place French parents most often lose an entire cycle.
 *
 * The rule that costs the most, and that nobody is told: the CMG must be filed **the month
 * of hiring**, not after — and it is what triggers Pajemploi registration, so a late filing
 * blocks the whole declarative chain.
 */
const GARDE: ProjectTemplate = {
  id: 'tpl-garde',
  titleKey: 'templates.garde.title',
  descriptionKey: 'templates.garde.description',
  glyph: 'members',
  locales: ['fr'],
  tasks: [
    {
      titleKey: 'templates.garde.tasks.guichet',
      notesKey: 'templates.garde.tasks.guichetNote',
      weekStart: 12,
      weekEnd: 20,
      effort: 'S',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      titleKey: 'templates.garde.tasks.recenser',
      weekStart: 12,
      weekEnd: 22,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      titleKey: 'templates.garde.tasks.preinscription',
      notesKey: 'templates.garde.tasks.preinscriptionNote',
      weekStart: 14,
      weekEnd: 24,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://www.caf.fr',
    },
    {
      // Never mentioned spontaneously, and it runs on a calendar of its own.
      titleKey: 'templates.garde.tasks.crecheEntreprise',
      notesKey: 'templates.garde.tasks.crecheEntrepriseNote',
      weekStart: 20,
      weekEnd: 30,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.garde.tasks.relais',
      notesKey: 'templates.garde.tasks.relaisNote',
      weekStart: 16,
      weekEnd: 28,
      effort: 'S',
      domain: 'entourage',
      essential: false,
      href: 'https://monenfant.fr',
    },
    {
      titleKey: 'templates.garde.tasks.assistants',
      notesKey: 'templates.garde.tasks.assistantsNote',
      weekStart: 20,
      weekEnd: 32,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      titleKey: 'templates.garde.tasks.confirmer',
      notesKey: 'templates.garde.tasks.confirmerNote',
      weekStart: 24,
      weekEnd: 34,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.garde.tasks.cmg',
      notesKey: 'templates.garde.tasks.cmgNote',
      weekStart: 45,
      weekEnd: 50,
      effort: 'M',
      domain: 'finances',
      essential: true,
      href: 'https://www.caf.fr',
    },
    {
      titleKey: 'templates.garde.tasks.finaliser',
      notesKey: 'templates.garde.tasks.finaliserNote',
      weekStart: 48,
      weekEnd: 52,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
  ],
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [ADMIN_FR, GARDE, VALISE, NID];

export function templateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((t) => t.id === id);
}

/** Templates offered for a locale — see `ProjectTemplate.locales` and spec §7.1. */
export function templatesForLocale(locale: string): ProjectTemplate[] {
  const lang = locale.split('-')[0];
  return PROJECT_TEMPLATES.filter((t) => !t.locales || t.locales.includes(lang));
}
