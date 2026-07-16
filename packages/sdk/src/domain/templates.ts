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

import type { BulleProfile, ProjectTemplate } from './types.js';

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
  countries: ['FR'],
  tasks: [
    {
      titleKey: 'templates.adminFr.tasks.declaration',
      notesKey: 'templates.adminFr.tasks.declarationNote',
      detailsKey: 'templates.adminFr.tasks.declarationDetails',
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
      detailsKey: 'templates.adminFr.tasks.congeSupplementaireDetails',
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
      detailsKey: 'templates.adminFr.tasks.employeurGrossesseDetails',
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
      detailsKey: 'templates.adminFr.tasks.verifierDeclarationDetails',
      weekStart: 16,
      weekEnd: 22,
      effort: 'S',
      domain: 'administratif',
      essential: false,
    },
    {
      titleKey: 'templates.adminFr.tasks.maternite',
      detailsKey: 'templates.adminFr.tasks.materniteDetails',
      weekStart: 10,
      weekEnd: 18,
      effort: 'M',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.consultations',
      notesKey: 'templates.adminFr.tasks.consultationsNote',
      detailsKey: 'templates.adminFr.tasks.consultationsDetails',
      weekStart: 10,
      weekEnd: 40,
      effort: 'S',
      domain: 'sante',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.echographies',
      detailsKey: 'templates.adminFr.tasks.echographiesDetails',
      weekStart: 10,
      weekEnd: 32,
      effort: 'S',
      domain: 'sante',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.mutuelle',
      detailsKey: 'templates.adminFr.tasks.mutuelleDetails',
      weekStart: 12,
      weekEnd: 24,
      effort: 'S',
      domain: 'finances',
      essential: false,
    },
    {
      titleKey: 'templates.adminFr.tasks.congeMaternite',
      detailsKey: 'templates.adminFr.tasks.congeMaterniteDetails',
      weekStart: 16,
      weekEnd: 24,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.fr',
    },
    {
      titleKey: 'templates.adminFr.tasks.congePaternite',
      detailsKey: 'templates.adminFr.tasks.congePaterniteDetails',
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
      detailsKey: 'templates.adminFr.tasks.reconnaissanceDetails',
      weekStart: 12,
      weekEnd: 30,
      effort: 'S',
      domain: 'administratif',
      essential: false,
    },
    {
      titleKey: 'templates.adminFr.tasks.garde',
      notesKey: 'templates.adminFr.tasks.gardeNote',
      detailsKey: 'templates.adminFr.tasks.gardeDetails',
      weekStart: 12,
      weekEnd: 24,
      effort: 'L',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.adminFr.tasks.paje',
      detailsKey: 'templates.adminFr.tasks.pajeDetails',
      weekStart: 14,
      weekEnd: 28,
      effort: 'S',
      domain: 'finances',
      essential: false,
      href: 'https://www.caf.fr',
    },
    // ── After the birth ──
    //
    // `afterBirthDays` is what actually times these; the 41+ SA window is inert and kept
    // only so they sort to the end of a week-grouped list. SA cannot express "5 days after
    // the birth" — the baby does not arrive on the DPA, so a window computed from an
    // estimate is simply the wrong date. See domain/postnatal.ts.
    {
      // 5 days, jour de l'accouchement non compté (Art. 55 du Code civil). The single
      // hardest deadline in the app: miss it and the birth can only be recorded by a
      // jugement déclaratif de naissance.
      titleKey: 'templates.adminFr.tasks.declarationNaissance',
      notesKey: 'templates.adminFr.tasks.declarationNaissanceNote',
      detailsKey: 'templates.adminFr.tasks.declarationNaissanceDetails',
      afterBirthDays: 5,
      weekStart: 41,
      weekEnd: 42,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F961',
    },
    {
      // No statutory deadline of its own — it follows the déclaration. A fortnight is a
      // practical prompt, not a legal one.
      titleKey: 'templates.adminFr.tasks.acteNaissance',
      notesKey: 'templates.adminFr.tasks.acteNaissanceNote',
      detailsKey: 'templates.adminFr.tasks.acteNaissanceDetails',
      afterBirthDays: 14,
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
      detailsKey: 'templates.adminFr.tasks.rattachementVitaleDetails',
      afterBirthDays: 30,
      weekStart: 41,
      weekEnd: 43,
      effort: 'S',
      domain: 'administratif',
      essential: true,
      href: 'https://www.ameli.fr',
    },
    {
      // Mutuelle AFTER the CPAM rattachement, never before — the reverse order is rejected.
      //
      // 30 days is a PROMPT, not a rule: research found no universal legal deadline for
      // adding a newborn to a mutuelle. It is purely contractual and ranges from 15 days to
      // 6 months by insurer, so the copy tells people to check their own contract rather
      // than quoting a number the app cannot stand behind.
      titleKey: 'templates.adminFr.tasks.rattachementMutuelle',
      notesKey: 'templates.adminFr.tasks.rattachementMutuelleNote',
      detailsKey: 'templates.adminFr.tasks.rattachementMutuelleDetails',
      afterBirthDays: 30,
      weekStart: 41,
      weekEnd: 45,
      effort: 'S',
      domain: 'finances',
      essential: true,
    },
    {
      // 60 days to report the birth to the impôts (prélèvement à la source).
      titleKey: 'templates.adminFr.tasks.impots',
      notesKey: 'templates.adminFr.tasks.impotsNote',
      detailsKey: 'templates.adminFr.tasks.impotsDetails',
      afterBirthDays: 60,
      weekStart: 41,
      weekEnd: 49,
      effort: 'S',
      domain: 'finances',
      essential: true,
      href: 'https://www.impots.gouv.fr',
    },
    {
      // THE reason this whole model exists (Art. L1225-35 du Code du travail): the 25 days
      // (32 for multiples) must be taken within 6 MONTHS of the birth. It is an individual,
      // non-transferable right — what a parent does not take is not deferred, it is lost.
      // A 41+ SA window gave it no real clock at all, so the app could watch someone forfeit
      // it in silence. ~182 days rather than "6 months" because the model counts days.
      titleKey: 'templates.adminFr.tasks.prendreCongePaternite',
      notesKey: 'templates.adminFr.tasks.prendreCongePaterniteNote',
      detailsKey: 'templates.adminFr.tasks.prendreCongePaterniteDetails',
      afterBirthDays: 182,
      weekStart: 41,
      weekEnd: 41,
      effort: 'M',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F583',
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
      detailsKey: 'templates.valise.tasks.mamanDetails',
      weekStart: 34,
      weekEnd: 37,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.bebe',
      detailsKey: 'templates.valise.tasks.bebeDetails',
      weekStart: 34,
      weekEnd: 37,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.coparent',
      detailsKey: 'templates.valise.tasks.coparentDetails',
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
      detailsKey: 'templates.valise.tasks.documentsDetails',
      weekStart: 32,
      weekEnd: 36,
      effort: 'S',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.siegeAuto',
      notesKey: 'templates.valise.tasks.siegeAutoNote',
      detailsKey: 'templates.valise.tasks.siegeAutoDetails',
      weekStart: 34,
      weekEnd: 38,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.valise.tasks.trajet',
      detailsKey: 'templates.valise.tasks.trajetDetails',
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
      detailsKey: 'templates.nid.tasks.emplacementDetails',
      weekStart: 20,
      weekEnd: 26,
      effort: 'S',
      domain: 'maison',
      essential: false,
    },
    {
      titleKey: 'templates.nid.tasks.lit',
      notesKey: 'templates.nid.tasks.litNote',
      detailsKey: 'templates.nid.tasks.litDetails',
      weekStart: 24,
      weekEnd: 30,
      effort: 'M',
      domain: 'achats',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.installerLit',
      detailsKey: 'templates.nid.tasks.installerLitDetails',
      weekStart: 30,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.laverVetements',
      notesKey: 'templates.nid.tasks.laverVetementsNote',
      detailsKey: 'templates.nid.tasks.laverVetementsDetails',
      weekStart: 30,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.nid.tasks.change',
      detailsKey: 'templates.nid.tasks.changeDetails',
      weekStart: 26,
      weekEnd: 32,
      effort: 'S',
      domain: 'maison',
      essential: false,
    },
    {
      titleKey: 'templates.nid.tasks.securite',
      detailsKey: 'templates.nid.tasks.securiteDetails',
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
  countries: ['FR'],
  tasks: [
    {
      titleKey: 'templates.garde.tasks.guichet',
      notesKey: 'templates.garde.tasks.guichetNote',
      detailsKey: 'templates.garde.tasks.guichetDetails',
      weekStart: 12,
      weekEnd: 20,
      effort: 'S',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      titleKey: 'templates.garde.tasks.recenser',
      detailsKey: 'templates.garde.tasks.recenserDetails',
      weekStart: 12,
      weekEnd: 22,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      // 24, not 14. Paris does not accept a demande before the 6th month (~26 SA), so the
      // old 14-24 window sat ENTIRELY before the desk opens in the biggest city of the only
      // shipped country. The task fired, the user went, the portal refused them.
      //
      // That is worse than a late reminder. A late reminder is a miss; this manufactured a
      // failure and then let the user read it as their own. `garde.tasks.guichet` (12-20 SA)
      // already does the honest upstream job: find out YOUR commune's calendar.
      titleKey: 'templates.garde.tasks.preinscription',
      notesKey: 'templates.garde.tasks.preinscriptionNote',
      detailsKey: 'templates.garde.tasks.preinscriptionDetails',
      weekStart: 24,
      weekEnd: 32,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://www.caf.fr',
    },
    {
      // Never mentioned spontaneously, and it runs on a calendar of its own.
      titleKey: 'templates.garde.tasks.crecheEntreprise',
      notesKey: 'templates.garde.tasks.crecheEntrepriseNote',
      detailsKey: 'templates.garde.tasks.crecheEntrepriseDetails',
      weekStart: 20,
      weekEnd: 30,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.garde.tasks.relais',
      notesKey: 'templates.garde.tasks.relaisNote',
      detailsKey: 'templates.garde.tasks.relaisDetails',
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
      detailsKey: 'templates.garde.tasks.assistantsDetails',
      weekStart: 20,
      weekEnd: 32,
      effort: 'M',
      domain: 'entourage',
      essential: true,
      href: 'https://monenfant.fr',
    },
    {
      // POST-BIRTH, and it always was: the confirmation requires the copie intégrale de
      // l'acte de naissance, which does not exist at 34 SA. The old 24-34 window asked for a
      // document the pregnancy had not produced yet, so the task was not merely early, it was
      // impossible — and its own note says "une confirmation oubliée fait perdre le rang",
      // which is exactly what the mistiming caused. A place bought with six months of
      // anticipation, lost in the fortnight after coming home: the one stretch when nobody
      // does paperwork, and precisely why this needs to be a real deadline rather than a
      // week window.
      //
      // `weekStart: 41` is inert padding, the same shape adminFr.tasks.acteNaissance uses:
      // afterBirthDays is what actually drives it (domain/postnatal.ts).
      titleKey: 'templates.garde.tasks.confirmer',
      notesKey: 'templates.garde.tasks.confirmerNote',
      detailsKey: 'templates.garde.tasks.confirmerDetails',
      afterBirthDays: 14,
      weekStart: 41,
      weekEnd: 44,
      effort: 'S',
      domain: 'entourage',
      // Left optional, though it is arguably the most expensive miss in the template.
      // Promoting it would change the readiness denominator, which is a product decision
      // about what the orb measures rather than part of fixing the window, and the audit
      // did not ask for it. Worth revisiting on its own.
      essential: false,
    },
    {
      titleKey: 'templates.garde.tasks.cmg',
      notesKey: 'templates.garde.tasks.cmgNote',
      detailsKey: 'templates.garde.tasks.cmgDetails',
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
      detailsKey: 'templates.garde.tasks.finaliserDetails',
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
  glyph: 'check',
  locales: ['fr'],
  countries: ['FR'],
  tasks: [
    {
      titleKey: 'templates.decisions.tasks.suivi',
      notesKey: 'templates.decisions.tasks.suiviNote',
      detailsKey: 'templates.decisions.tasks.suiviDetails',
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
      detailsKey: 'templates.decisions.tasks.materniteDetails',
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
      detailsKey: 'templates.decisions.tasks.nomDetails',
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
      detailsKey: 'templates.decisions.tasks.prenomDetails',
      weekStart: 24,
      weekEnd: 41,
      effort: 'M',
      domain: 'administratif',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F882',
    },
    {
      // Must be decided BEFORE 32 SA, because one of the two options happens at 32-36.
      // weekEnd is therefore 32 and not 34: at 34 the task went on presenting itself as
      // live for two weeks AFTER the deadline its own note and details both state, which is
      // the one thing a window must never do. A window that outlives its own deadline
      // teaches the user that the deadlines are decorative.
      titleKey: 'templates.decisions.tasks.vrs',
      notesKey: 'templates.decisions.tasks.vrsNote',
      detailsKey: 'templates.decisions.tasks.vrsDetails',
      weekStart: 28,
      weekEnd: 32,
      effort: 'M',
      domain: 'sante',
      essential: true,
      href: 'https://www.has-sante.fr',
    },
    {
      titleKey: 'templates.decisions.tasks.projetNaissance',
      notesKey: 'templates.decisions.tasks.projetNaissanceNote',
      detailsKey: 'templates.decisions.tasks.projetNaissanceDetails',
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
      detailsKey: 'templates.decisions.tasks.congeQuiDetails',
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
      detailsKey: 'templates.decisions.tasks.visitesDetails',
      weekStart: 34,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.decisions.tasks.photos',
      notesKey: 'templates.decisions.tasks.photosNote',
      detailsKey: 'templates.decisions.tasks.photosDetails',
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
      detailsKey: 'templates.achats.tasks.siegeAutoDetails',
      weekStart: 28,
      weekEnd: 34,
      effort: 'L',
      domain: 'achats',
      essential: true,
    },
    {
      titleKey: 'templates.achats.tasks.installer',
      notesKey: 'templates.achats.tasks.installerNote',
      detailsKey: 'templates.achats.tasks.installerDetails',
      weekStart: 34,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.achats.tasks.liste',
      notesKey: 'templates.achats.tasks.listeNote',
      detailsKey: 'templates.achats.tasks.listeDetails',
      weekStart: 20,
      weekEnd: 26,
      effort: 'M',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.poussette',
      notesKey: 'templates.achats.tasks.poussetteNote',
      detailsKey: 'templates.achats.tasks.poussetteDetails',
      weekStart: 26,
      weekEnd: 34,
      effort: 'L',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.occasion',
      notesKey: 'templates.achats.tasks.occasionNote',
      detailsKey: 'templates.achats.tasks.occasionDetails',
      weekStart: 26,
      weekEnd: 36,
      effort: 'M',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.tailleNaissance',
      notesKey: 'templates.achats.tasks.tailleNaissanceNote',
      detailsKey: 'templates.achats.tasks.tailleNaissanceDetails',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.achats.tasks.trousse',
      notesKey: 'templates.achats.tasks.trousseNote',
      detailsKey: 'templates.achats.tasks.trousseDetails',
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
  glyph: 'shield',
  locales: ['fr'],
  countries: ['FR'],
  tasks: [
    {
      titleKey: 'templates.securite.tasks.fumee',
      notesKey: 'templates.securite.tasks.fumeeNote',
      detailsKey: 'templates.securite.tasks.fumeeDetails',
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
      detailsKey: 'templates.securite.tasks.chaudiereDetails',
      weekStart: 24,
      weekEnd: 36,
      effort: 'M',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.securite.tasks.tabac',
      notesKey: 'templates.securite.tasks.tabacNote',
      detailsKey: 'templates.securite.tasks.tabacDetails',
      weekStart: 20,
      weekEnd: 41,
      effort: 'S',
      domain: 'maison',
      essential: true,
    },
    {
      titleKey: 'templates.securite.tasks.secours',
      notesKey: 'templates.securite.tasks.secoursNote',
      detailsKey: 'templates.securite.tasks.secoursDetails',
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
      detailsKey: 'templates.securite.tasks.repererDetails',
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
      detailsKey: 'templates.jumeaux.tasks.signalerDetails',
      weekStart: 12,
      weekEnd: 20,
      effort: 'S',
      domain: 'administratif',
      essential: true,
    },
    {
      titleKey: 'templates.jumeaux.tasks.aideDomicile',
      notesKey: 'templates.jumeaux.tasks.aideDomicileNote',
      detailsKey: 'templates.jumeaux.tasks.aideDomicileDetails',
      weekStart: 28,
      weekEnd: 36,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.jumeaux.tasks.association',
      notesKey: 'templates.jumeaux.tasks.associationNote',
      detailsKey: 'templates.jumeaux.tasks.associationDetails',
      weekStart: 28,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.jumeaux.tasks.equipement',
      notesKey: 'templates.jumeaux.tasks.equipementNote',
      detailsKey: 'templates.jumeaux.tasks.equipementDetails',
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
      detailsKey: 'templates.solo.tasks.prioriteDetails',
      weekStart: 30,
      weekEnd: 46,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.aideDomicile',
      notesKey: 'templates.solo.tasks.aideDomicileNote',
      detailsKey: 'templates.solo.tasks.aideDomicileDetails',
      weekStart: 34,
      weekEnd: 46,
      effort: 'M',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.conducteur',
      notesKey: 'templates.solo.tasks.conducteurNote',
      detailsKey: 'templates.solo.tasks.conducteurDetails',
      weekStart: 34,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.isole',
      notesKey: 'templates.solo.tasks.isoleNote',
      detailsKey: 'templates.solo.tasks.isoleDetails',
      weekStart: 41,
      weekEnd: 46,
      effort: 'S',
      domain: 'finances',
      essential: true,
    },
    {
      titleKey: 'templates.solo.tasks.asf',
      notesKey: 'templates.solo.tasks.asfNote',
      detailsKey: 'templates.solo.tasks.asfDetails',
      weekStart: 41,
      weekEnd: 46,
      effort: 'M',
      domain: 'finances',
      essential: false,
    },
  ],
};


/**
 * Budget (§5.3) — the money side of an arrival, in France.
 *
 * FR-only, like the admin module and for the same reason (§7.1): almost every task here is
 * a French institution (IJ, CAF, PAJE, CMG, convention collective). An English version
 * would be a translation of a system the reader is not in, which is worse than not shipping
 * one.
 *
 * NO EUROS ANYWHERE, deliberately. The prime à la naissance, the allocation de base and the
 * IJ ceiling are all revalorised (usually each April), so a figure encoded here is a figure
 * that goes silently wrong. Every task carries the official link instead and lets the
 * source state the number.
 */
const BUDGET: ProjectTemplate = {
  id: 'tpl-budget',
  titleKey: 'templates.budget.title',
  descriptionKey: 'templates.budget.description',
  glyph: 'purse',
  locales: ['fr'],
  countries: ['FR'],
  tasks: [
    {
      // The single biggest financial surprise: IJ are computed from the last 3 gross
      // salaries and capped at the plafond, so they do not reproduce the usual net.
      titleKey: 'templates.budget.tasks.revenu',
      notesKey: 'templates.budget.tasks.revenuNote',
      detailsKey: 'templates.budget.tasks.revenuDetails',
      weekStart: 20,
      weekEnd: 30,
      effort: 'M',
      domain: 'finances',
      essential: true,
      href: 'https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee',
    },
    {
      // NOT a legal right: the Code du travail does not oblige an employer to top IJ up to
      // 100%. It is conventional, which is exactly why it has to be checked rather than
      // assumed.
      titleKey: 'templates.budget.tasks.maintienSalaire',
      notesKey: 'templates.budget.tasks.maintienSalaireNote',
      detailsKey: 'templates.budget.tasks.maintienSalaireDetails',
      weekStart: 20,
      weekEnd: 30,
      effort: 'S',
      domain: 'finances',
      essential: true,
      href: 'https://code.travail.gouv.fr/contribution/quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite',
    },
    {
      // Secteur 2 dépassements are never reimbursed by l'Assurance Maladie. Worth knowing
      // BEFORE choosing the maternité, not on the bill.
      titleKey: 'templates.budget.tasks.secteur',
      notesKey: 'templates.budget.tasks.secteurNote',
      detailsKey: 'templates.budget.tasks.secteurDetails',
      weekStart: 16,
      weekEnd: 28,
      effort: 'M',
      domain: 'finances',
      essential: true,
      href: 'https://annuairesante.ameli.fr/',
    },
    {
      // The largest recurring cost after the birth, and the one with real queues. The
      // window is a practical prompt, NOT a rule: no official source fixes a week to start
      // looking, so the copy says "tôt" rather than inventing a deadline.
      titleKey: 'templates.budget.tasks.garde',
      notesKey: 'templates.budget.tasks.gardeNote',
      detailsKey: 'templates.budget.tasks.gardeDetails',
      weekStart: 16,
      weekEnd: 26,
      effort: 'L',
      domain: 'finances',
      essential: true,
      href: 'https://monenfant.fr/choisir-un-mode-d-accueil-collectif',
    },
    {
      titleKey: 'templates.budget.tasks.simulateur',
      notesKey: 'templates.budget.tasks.simulateurNote',
      detailsKey: 'templates.budget.tasks.simulateurDetails',
      weekStart: 14,
      weekEnd: 30,
      effort: 'S',
      domain: 'finances',
      essential: false,
      href: 'https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil',
    },
    {
      // Paid BEFORE the birth (7e mois), and conditional on the grossesse having been
      // declared in time — which is why the declaration task is the flagship of the admin
      // template. The window is an approximate conversion from a calendar month, so the
      // copy does not quote a week.
      titleKey: 'templates.budget.tasks.prime',
      notesKey: 'templates.budget.tasks.primeNote',
      detailsKey: 'templates.budget.tasks.primeDetails',
      weekStart: 28,
      weekEnd: 34,
      effort: 'S',
      domain: 'finances',
      essential: false,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F2550',
    },
    {
      titleKey: 'templates.budget.tasks.paje',
      notesKey: 'templates.budget.tasks.pajeNote',
      detailsKey: 'templates.budget.tasks.pajeDetails',
      weekStart: 28,
      weekEnd: 34,
      effort: 'S',
      domain: 'finances',
      essential: false,
      href: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/l-allocation-de-base-ab',
    },
    {
      titleKey: 'templates.budget.tasks.equipement',
      notesKey: 'templates.budget.tasks.equipementNote',
      detailsKey: 'templates.budget.tasks.equipementDetails',
      weekStart: 25,
      weekEnd: 35,
      effort: 'M',
      domain: 'achats',
      essential: false,
    },
    {
      titleKey: 'templates.budget.tasks.foyer',
      notesKey: 'templates.budget.tasks.foyerNote',
      detailsKey: 'templates.budget.tasks.foyerDetails',
      weekStart: 32,
      weekEnd: 38,
      effort: 'M',
      domain: 'finances',
      essential: false,
    },
    {
      // Post-birth and strict: the CMG must be claimed in the month the employment starts,
      // and each Pajemploi déclaration is due by the 5th of the following month. A late
      // month is simply not reimbursed. 30 days is the prompt for the first one.
      titleKey: 'templates.budget.tasks.cmg',
      notesKey: 'templates.budget.tasks.cmgNote',
      detailsKey: 'templates.budget.tasks.cmgDetails',
      afterBirthDays: 30,
      weekStart: 41,
      weekEnd: 41,
      effort: 'M',
      domain: 'finances',
      essential: true,
      href: 'https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde',
    },
    {
      // Notice runs from the END of the congé maternité/paternité, which itself runs from
      // the birth. ~120 days is a prompt well inside any of those chains, not the deadline
      // itself — the note carries the real rule because the app cannot know the leave dates.
      titleKey: 'templates.budget.tasks.prepare',
      notesKey: 'templates.budget.tasks.prepareNote',
      detailsKey: 'templates.budget.tasks.prepareDetails',
      afterBirthDays: 120,
      weekStart: 41,
      weekEnd: 41,
      effort: 'M',
      domain: 'finances',
      essential: true,
      href: 'https://code.travail.gouv.fr/fiche-ministere-travail/le-conge-parental-deducation',
    },
  ],
};


/**
 * Le retour à la maison (§5.3) — preparing, during the pregnancy, for after it.
 *
 * FR-only: PRADO, the PMI, the 20 examens obligatoires and the 3114 are French
 * institutions, and the whole point of the project is knowing which door to knock on.
 *
 * REGULATORY LINE (§7.3), and this template is where it is thinnest: every task here
 * schedules PREPARATION, never care. It says "this appointment exists, here is its window"
 * and "here is who to call", never "here is what you might be feeling". Specifically, the
 * mal-être task lists CONTACTS and nothing else: some French sites offer a post-partum
 * depression self-assessment quiz, and replicating one would put Bulle squarely inside EU
 * MDR scope as well as being the wrong thing to hand someone at 3am.
 */
const POSTNATAL: ProjectTemplate = {
  id: 'tpl-postnatal',
  titleKey: 'templates.postnatal.title',
  descriptionKey: 'templates.postnatal.description',
  glyph: 'nest',
  locales: ['fr'],
  countries: ['FR'],
  tasks: [
    {
      // Offered AT the maternité, not requested in advance — so the task is to know it
      // exists before someone asks you to decide while holding a newborn.
      titleKey: 'templates.postnatal.tasks.prado',
      notesKey: 'templates.postnatal.tasks.pradoNote',
      detailsKey: 'templates.postnatal.tasks.pradoDetails',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'postpartum',
      essential: false,
      href: 'https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile',
    },
    {
      titleKey: 'templates.postnatal.tasks.reeducation',
      notesKey: 'templates.postnatal.tasks.reeducationNote',
      detailsKey: 'templates.postnatal.tasks.reeducationDetails',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'postpartum',
      essential: false,
      href: 'https://www.ameli.fr',
    },
    {
      titleKey: 'templates.postnatal.tasks.pediatre',
      notesKey: 'templates.postnatal.tasks.pediatreNote',
      detailsKey: 'templates.postnatal.tasks.pediatreDetails',
      weekStart: 25,
      weekEnd: 35,
      effort: 'M',
      domain: 'postpartum',
      essential: false,
      href: 'https://www.ameli.fr/assure/droits-demarches/principes/choisir-et-declarer-votre-medecin-traitant',
    },
    {
      titleKey: 'templates.postnatal.tasks.examens',
      notesKey: 'templates.postnatal.tasks.examensNote',
      detailsKey: 'templates.postnatal.tasks.examensDetails',
      weekStart: 34,
      weekEnd: 38,
      effort: 'S',
      domain: 'postpartum',
      essential: true,
      href: 'https://www.service-public.gouv.fr/particuliers/vosdroits/F967',
    },
    {
      titleKey: 'templates.postnatal.tasks.allaitement',
      notesKey: 'templates.postnatal.tasks.allaitementNote',
      detailsKey: 'templates.postnatal.tasks.allaitementDetails',
      weekStart: 30,
      weekEnd: 38,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.postnatal.tasks.repas',
      notesKey: 'templates.postnatal.tasks.repasNote',
      detailsKey: 'templates.postnatal.tasks.repasDetails',
      weekStart: 32,
      weekEnd: 38,
      effort: 'M',
      domain: 'maison',
      essential: false,
    },
    {
      titleKey: 'templates.postnatal.tasks.aide',
      notesKey: 'templates.postnatal.tasks.aideNote',
      detailsKey: 'templates.postnatal.tasks.aideDetails',
      weekStart: 32,
      weekEnd: 40,
      effort: 'M',
      domain: 'entourage',
      essential: false,
    },
    {
      titleKey: 'templates.postnatal.tasks.visites',
      notesKey: 'templates.postnatal.tasks.visitesNote',
      detailsKey: 'templates.postnatal.tasks.visitesDetails',
      weekStart: 32,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      // Solo bulles never see this: `.coparent` is the suffix instantiateTemplate filters on.
      titleKey: 'templates.postnatal.tasks.nuits.coparent',
      notesKey: 'templates.postnatal.tasks.nuitsNote',
      detailsKey: 'templates.postnatal.tasks.nuitsDetails',
      weekStart: 32,
      weekEnd: 40,
      effort: 'S',
      domain: 'entourage',
      essential: false,
    },
    {
      // CONTACTS ONLY. No symptom list, no self-assessment — see the header.
      titleKey: 'templates.postnatal.tasks.malEtre',
      notesKey: 'templates.postnatal.tasks.malEtreNote',
      detailsKey: 'templates.postnatal.tasks.malEtreDetails',
      weekStart: 32,
      weekEnd: 40,
      effort: 'S',
      domain: 'postpartum',
      essential: true,
      href: 'https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/baby-blues-depression-post-partum-grossesse',
    },
    {
      // The professional must OFFER it (art. 86 LFSS 2022, C. santé publique L2122-1);
      // the parent is under no obligation and faces no penalty. Window: weeks 4 to 8.
      titleKey: 'templates.postnatal.tasks.epp',
      notesKey: 'templates.postnatal.tasks.eppNote',
      detailsKey: 'templates.postnatal.tasks.eppDetails',
      afterBirthDays: 56,
      weekStart: 41,
      weekEnd: 41,
      effort: 'S',
      domain: 'postpartum',
      essential: true,
      href: 'https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628790',
    },
    {
      // 6 to 8 weeks after the birth; 56 days is the far end of that window.
      titleKey: 'templates.postnatal.tasks.consultation',
      notesKey: 'templates.postnatal.tasks.consultationNote',
      detailsKey: 'templates.postnatal.tasks.consultationDetails',
      afterBirthDays: 56,
      weekStart: 41,
      weekEnd: 41,
      effort: 'S',
      domain: 'postpartum',
      essential: true,
      href: 'https://www.ameli.fr',
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
  BUDGET,
  POSTNATAL,
  JUMEAUX,
  SOLO,
];

export function templateById(id: string): ProjectTemplate | undefined {
  return PROJECT_TEMPLATES.find((t) => t.id === id);
}

/** The launch market. A bulle with no country stated lives under the French system. */
export const DEFAULT_COUNTRY = 'FR';

/**
 * Does this template's system apply in `country`?
 *
 * A template with no `countries` applies anywhere: a hospital bag is a hospital bag. One
 * that names its countries is describing institutions, and outside them it is not merely
 * untranslated, it is FALSE.
 */
export function templateAppliesInCountry(template: ProjectTemplate, country: string): boolean {
  return !template.countries || template.countries.includes(country.toUpperCase());
}

/**
 * Templates offered for a locale — see `ProjectTemplate.locales` and spec §7.1.
 *
 * Locale ONLY, and locale is a LANGUAGE question. Prefer `templatesFor()` in app code: this
 * ignores both `appliesTo` and the country, so on its own it hands the CAF to a French
 * speaker in Montréal.
 */
export function templatesForLocale(locale: string): ProjectTemplate[] {
  const lang = locale.split('-')[0];
  return PROJECT_TEMPLATES.filter((t) => !t.locales || t.locales.includes(lang));
}

/**
 * Templates offered for a locale AND a country AND a profile. The one app code should call.
 *
 * All three filters have to be applied together or the gated templates leak:
 *
 *  - `appliesTo` keeps Jumeaux away from a single pregnancy and Solo away from a couple.
 *    Being offered "ce qui double" when you are expecting one baby is the kind of thing
 *    that makes an app feel like it is not listening.
 *  - `countries` keeps the French system inside France. Language cannot do this job:
 *    `locale.split('-')[0]` reads fr-BE, fr-CH and fr-CA as "fr", so filtering on language
 *    alone tells a parent in Brussels to declare their pregnancy to the CAF within three
 *    months. That is not a bad translation, it is false information about their rights.
 */
export function templatesFor(locale: string, profile: BulleProfile): ProjectTemplate[] {
  const country = profile.country ?? DEFAULT_COUNTRY;
  return templatesForLocale(locale)
    .filter((t) => templateAppliesInCountry(t, country))
    .filter((t) => !t.appliesTo || t.appliesTo(profile));
}
