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

/**
 * Décisions. The highest-leverage project: these gate everything downstream, and none of
 * them is a task you "do" — they are choices a couple has to actually make, at a moment
 * when it is easy to let them drift until someone else decides by default.
 */
const DECISIONS: ProjectTemplate = {
  id: 'tpl-decisions',
  titleKey: 'templates.decisions.title',
  descriptionKey: 'templates.decisions.description',
  glyph: 'chemin',
  locales: ['fr'],
  tasks: [
    {
      titleKey: 'templates.decisions.tasks.suivi',
      notesKey: 'templates.decisions.tasks.suiviNote',
      weekStart: 6,
      weekEnd: 12,
      effort: 'S',
      domain: 'sante',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.decisions.tasks.maternite',
      notesKey: 'templates.decisions.tasks.materniteNote',
      weekStart: 6,
      weekEnd: 12,
      effort: 'M',
      domain: 'sante',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F1105',
    },
    {
      titleKey: 'templates.decisions.tasks.nom',
      notesKey: 'templates.decisions.tasks.nomNote',
      weekStart: 20,
      weekEnd: 41,
      effort: 'M',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F868',
    },
    {
      titleKey: 'templates.decisions.tasks.prenom',
      notesKey: 'templates.decisions.tasks.prenomNote',
      weekStart: 24,
      weekEnd: 41,
      effort: 'M',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F882',
    },
    {
      // Must be decided BEFORE 32 SA, because one of the two options happens at 32-36.
      titleKey: 'templates.decisions.tasks.vrs',
      notesKey: 'templates.decisions.tasks.vrsNote',
      weekStart: 28,
      weekEnd: 34,
      effort: 'M',
      domain: 'sante',
      essential: true,
      href: 'https://www.has-sante.fr',
    },
    {
      titleKey: 'templates.decisions.tasks.projetNaissance',
      notesKey: 'templates.decisions.tasks.projetNaissanceNote',
      weekStart: 28,
      weekEnd: 36,
      effort: 'L',
      domain: 'sante',
      essential: false,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.decisions.tasks.congeQui',
      notesKey: 'templates.decisions.tasks.congeQuiNote',
      weekStart: 30,
      weekEnd: 40,
      effort: 'M',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/actualites/A18939',
    },
    {
      titleKey: 'templates.decisions.tasks.visites',
      notesKey: 'templates.decisions.tasks.visitesNote',
      weekStart: 34,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.decisions.tasks.photos',
      notesKey: 'templates.decisions.tasks.photosNote',
      weekStart: 34,
      weekEnd: 45,
      effort: 'S',
      domain: 'entourage',
      essential: false,
      href: 'https://www.cnil.fr',
    },
  ],
};

/**
 * Achats essentiels.
 *
 * Note the deliberate SPLIT between buying the car seat and fitting it. The research is
 * blunt: ~95% of parents make at least one installation error and 91% a serious one. A
 * seat bought is not a seat that works, and merging the two into "acheter le siège-auto"
 * is how the fitting silently never happens.
 */
const ACHATS: ProjectTemplate = {
  id: 'tpl-achats',
  titleKey: 'templates.achats.title',
  descriptionKey: 'templates.achats.description',
  glyph: 'bag',
  tasks: [
    {
      titleKey: 'templates.achats.tasks.siegeAuto',
      notesKey: 'templates.achats.tasks.siegeAutoNote',
      weekStart: 28,
      weekEnd: 34,
      effort: 'L',
      domain: 'achats',
      essential: true,
    },
    {
      titleKey: 'templates.achats.tasks.installer',
      notesKey: 'templates.achats.tasks.installerNote',
      weekStart: 34,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.achats.tasks.liste',
      notesKey: 'templates.achats.tasks.listeNote',
      weekStart: 20,
      weekEnd: 26,
      effort: 'M',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.poussette',
      notesKey: 'templates.achats.tasks.poussetteNote',
      weekStart: 26,
      weekEnd: 34,
      effort: 'L',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.occasion',
      notesKey: 'templates.achats.tasks.occasionNote',
      weekStart: 26,
      weekEnd: 36,
      effort: 'M',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.tailleNaissance',
      notesKey: 'templates.achats.tasks.tailleNaissanceNote',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.trousse',
      notesKey: 'templates.achats.tasks.trousseNote',
      weekStart: 34,
      weekEnd: 39,
      effort: 'M',
      domain: 'achats',
      essential: true,
    },
  ],
};

/**
 * Sécurité.
 *
 * Only two items here are actually the law (smoke detector, boiler service). The CO
 * detector is recommended and NOT mandatory — the 2024 bill was never voted — and saying
 * otherwise would be the kind of small false urgency this product exists not to create.
 */
const SECURITE: ProjectTemplate = {
  id: 'tpl-securite',
  titleKey: 'templates.securite.title',
  descriptionKey: 'templates.securite.description',
  glyph: 'stamp',
  locales: ['fr'],
  tasks: [
    {
      titleKey: 'templates.securite.tasks.fumee',
      notesKey: 'templates.securite.tasks.fumeeNote',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'maison',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F19950',
    },
    {
      titleKey: 'templates.securite.tasks.chaudiere',
      notesKey: 'templates.securite.tasks.chaudiereNote',
      weekStart: 24,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.securite.tasks.tabac',
      notesKey: 'templates.securite.tasks.tabacNote',
      weekStart: 20,
      weekEnd: 41,
      effort: 'S',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.securite.tasks.secours',
      notesKey: 'templates.securite.tasks.secoursNote',
      weekStart: 24,
      weekEnd: 34,
      effort: 'L',
      domain: 'entourage',
      essential: false,
    },
    {
      // Deliberately says NOT to buy anything yet — the need arrives at 6-9 months.
      titleKey: 'templates.securite.tasks.reperer',
      notesKey: 'templates.securite.tasks.repererNote',
      weekStart: 36,
      weekEnd: 41,
      effort: 'M',
      domain: 'maison',
      essential: false,
    },
  ],
};

/** Jumeaux. Gated: everything here is noise for a single pregnancy. */
const JUMEAUX: ProjectTemplate = {
  id: 'tpl-jumeaux',
  titleKey: 'templates.jumeaux.title',
  descriptionKey: 'templates.jumeaux.description',
  glyph: 'members',
  locales: ['fr'],
  appliesTo: (profile) => profile.multiples === true,
  tasks: [
    {
      titleKey: 'templates.jumeaux.tasks.signaler',
      notesKey: 'templates.jumeaux.tasks.signalerNote',
      weekStart: 12,
      weekEnd: 20,
      effort: 'S',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.jumeaux.tasks.aideDomicile',
      notesKey: 'templates.jumeaux.tasks.aideDomicileNote',
      weekStart: 28,
      weekEnd: 36,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.jumeaux.tasks.association',
      notesKey: 'templates.jumeaux.tasks.associationNote',
      weekStart: 28,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.jumeaux.tasks.equipement',
      notesKey: 'templates.jumeaux.tasks.equipementNote',
      weekStart: 30,
      weekEnd: 38,
      effort: 'L',
      domain: 'achats',
      essential: true,
    },
  ],
};

/**
 * Solo. Gated on `companionship === 'solo'`.
 *
 * Not a lesser version of the couple flow: the levers are genuinely different. The whole
 * point is that "ask your partner" is not available, so every item here is about naming a
 * specific person or a specific right instead.
 */
const SOLO: ProjectTemplate = {
  id: 'tpl-solo',
  titleKey: 'templates.solo.title',
  descriptionKey: 'templates.solo.description',
  glyph: 'leaf',
  locales: ['fr'],
  appliesTo: (profile) => profile.companionship === 'solo',
  tasks: [
    {
      titleKey: 'templates.solo.tasks.priorite',
      notesKey: 'templates.solo.tasks.prioriteNote',
      weekStart: 30,
      weekEnd: 46,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.aideDomicile',
      notesKey: 'templates.solo.tasks.aideDomicileNote',
      weekStart: 34,
      weekEnd: 46,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.conducteur',
      notesKey: 'templates.solo.tasks.conducteurNote',
      weekStart: 34,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.isole',
      notesKey: 'templates.solo.tasks.isoleNote',
      weekStart: 41,
      weekEnd: 46,
      effort: 'S',
      domain: 'finances',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.asf',
      notesKey: 'templates.solo.tasks.asfNote',
      weekStart: 41,
      weekEnd: 46,
      effort: 'M',
      domain: 'finances',
      essential: false,
    },
  ],
};

export const PROJECT_TEMPLATES: ProjectTemplate[] = [
  ADMIN_FR,
  DECISIONS,
  GARDE,
  VALISE,
  NID,
  ACHATS,
  SECURITE,
  JUMEAUX,
  SOLO,
];

export function templateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((t) => t.id === id);
}

/** Templates offered for a locale — see `ProjectTemplate.locales` and spec §7.1. */
export function templatesForLocale(locale: string): ProjectTemplate[] {
  const lang = locale.split('-')[0];
  return PROJECT_TEMPLATES.filter((t) => !t.locales || t.locales.includes(lang));
}
