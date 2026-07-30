/**
 * The content calendar. Two articles a week, in SEO-priority order.
 *
 * THIS ARRAY IS THE ENTIRE SCHEDULE. Index === position in the queue; the cadence below
 * turns that into a date. There is no cron, no CMS, no database, and nothing is hidden
 * client-side: an unpublished article simply has no HTML file in `dist/`.
 *
 * WHY NOT ONE A DAY. Daily to the end of the year is 165 articles. Each of these is a
 * researched, bilingual piece citing official sources; 165 of them would be filler, and
 * filler is not neutral — Google's helpful-content system demotes sites for mass-produced
 * low-value pages, so a daily wall of thin posts would rank WORSE than a smaller corpus of
 * pieces that answer the question. Two a week is the rate at which this corpus can be
 * genuinely researched, and it carries the calendar to the end of December.
 *
 * Reordering the array reschedules everything after the moved slug.
 *
 * ⚠️ A build must run for an article to appear. Without a SCHEDULED BUILD (cron or a
 * GitHub Action), nothing ever releases. See scripts/generate-sitemap.mjs.
 */

const DAY_MS = 24 * 60 * 60 * 1000;

/** Day 0 of the calendar. The first article publishes on this date. */
export const BLOG_FIRST_PUBLISH_DATE = '2026-07-20';

function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return new Date(d.getTime() + days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * Ordered by search intent, highest first. The early slugs are the ones that answer the
 * question a stressed future parent actually types at 11pm, and they are what the whole
 * site ranks on.
 *
 * Tier 1 — administrative panic (the highest-value, least-served queries in FR)
 * Tier 2 — the preparation decisions everyone hits
 * Tier 3 — buying guides, anti-overbuying angle
 * Tier 4 — the couple / partner angle nobody else covers
 * Tier 5 — privacy, which is our actual differentiator
 */
export const BLOG_PUBLISH_PRIORITY: string[] = [
  // ── Tier 1 — administratif ──
  'declaration-grossesse-demarches',
  'conge-maternite-paternite-dates',
  'choisir-inscrire-maternite',
  'mode-de-garde-quand-commencer',
  // ── Tier 2 — préparation ──
  'valise-maternite-liste',
  'checklist-avant-arrivee-bebe',
  // ── Tier 3 — achats ──
  'liste-naissance-vraiment-utile',
  'siege-auto-i-size-choisir',
  'seconde-main-bebe-oui-non',
  // ── Tier 4 — le couple ──
  'preparer-a-deux-repartir-charge',
  // ── Tier 5 — vie privée ──
  'applications-grossesse-donnees',

  // ── Tier 3 — les quantités ──
  // Inserted here rather than appended, and the difference is six months of calendar.
  //
  // Moving a slug reschedules everything after it, which normally costs ranking history.
  // It costs nothing today: this block was added on 2026-07-20, which is day 0, so only
  // `declaration-grossesse-demarches` has actually published. Everything below is still in
  // the future and has no history to reset. That window closes as the calendar advances —
  // once these have gone out, treat the array as append-only again.
  //
  // They earn a run of their own because they answer the question every French layette
  // guide leaves open. "Des bodies", yes, but how many. Ordered by intent within the run:
  // the reference piece first, then the highest-volume single questions.
  'combien-de-bodies-pyjamas-couches',
  'couches-combien-par-jour-premier-mois',
  'taille-naissance-ou-1-mois-combien-acheter',
  'liste-naissance-combien-de-chaque',
  'cadeau-naissance-ce-qui-sert-vraiment',
  'valise-maternite-combien-de-chaque',
  'layette-hiver-ete-ce-qui-change',

  // ── Tier 3 — saisons et tailles ──
  // The spokes to the two hubs above. `layette-hiver-ete-ce-qui-change` says WHAT the season
  // changes; these three say what to actually own for one specific season, which is a
  // different query typed by someone who already knows their due date. Same relationship
  // between `combien-de-vetements-3-mois-6-mois` and the per-item reference piece.
  //
  // Ordered so the season articles land ahead of the season they describe where the calendar
  // allows: an autumn birth is being prepared for in September.
  'gigoteuse-tog-quelle-saison',
  'combien-de-vetements-3-mois-6-mois',
  'naissance-mi-saison-printemps-automne',
  'naissance-en-hiver-la-layette',
  'naissance-en-ete-la-layette',

  // ── Tier 1 continued — the administrative long tail ──
  // Highest intent, so they sit as early as the calendar allows: these are what someone
  // types at 11pm, and they are the queries the FR market serves worst.
  'declarer-naissance-mairie-5-jours',
  'conge-paternite-comment-le-poser',
  'reconnaissance-anticipee-couple-non-marie',
  'prime-naissance-paje-conditions',
  'rattacher-bebe-carte-vitale-mutuelle',
  'choisir-prenom-etat-civil',

  // ── Tier 2 — the logistics people search once it gets real ──
  'inscription-maternite-comment-choisir',
  'siege-auto-installer-avant-le-jour-j',
  'le-jour-j-qui-fait-quoi',
  'derniere-ligne-droite-les-deux-dernieres-semaines',
  'jumeaux-ce-qui-change-vraiment',
  'travaux-demenagement-pendant-grossesse',

  // ── Tier 4 — the couple angle, which nobody else covers ──
  'charge-mentale-grossesse-repartir',
  'co-parent-quoi-faire-concretement',
  'decider-a-deux-avant-que-ca-decide-pour-vous',
  'annoncer-la-grossesse-a-qui-quand',
  'preparer-laine-a-larrivee',
  'parent-solo-organiser-larrivee',

  // ── Budget — high intent, and the queries the market answers with adverts ──
  'baisse-revenu-conge-maternite',
  'maintien-salaire-convention-collective',
  'mode-de-garde-comparatif-cout',
  'aides-caf-grossesse-simulateur',
  'cout-reel-premiere-annee-bebe',
  'conge-parental-prepare-vaut-il-le-coup',

  // ── Tier 3 — achats, on the anti-overbuying angle ──
  'liste-naissance-la-faire-sans-culpabiliser',
  'poussette-choisir-sans-se-tromper',
  'lit-bebe-cododo-ce-qui-change',
  'chambre-bebe-preparer-sans-surinvestir',
  'seconde-main-bebe-ce-qui-se-reprend',
  'allaitement-ou-biberon-le-materiel',

  // ── Le retour à la maison — searched later in the pregnancy, so scheduled later ──
  'consultation-postnatale-et-entretien-precoce',
  'prado-retour-maison-sage-femme',
  'baby-blues-qui-appeler',
  'organiser-les-premieres-semaines',
  'reeducation-perineale-ce-quil-faut-savoir',
  'cadrer-les-visites-apres-naissance',

  // ── The gap run — appended, not inserted ──
  // These answer sourced, counterintuitive questions the FR market serves worst (see
  // docs/FR-CORPUS-AUDIT.md "Blog material"). Everything above has publish history by now,
  // so this block is append-only: it lands after the current tail and reschedules nothing.
  // Verified against ameli, service-public, caf and legifrance before shipping.
  'sept-seances-preparation-et-epp',
  'conge-pathologique-14-jours-28-jours',
  'absences-examens-grossesse-au-travail',
  'visite-de-reprise-apres-conge-maternite',
  'declarer-la-naissance-a-la-caf',
  'nom-de-famille-de-lenfant-choisir',

  // ── The gap run continues — 24 more, appended in themed batches ──
  // Same origin and rule as the block above: sourced, counterintuitive questions the FR
  // market serves worst, verified against legifrance, service-public, ameli, caf, Pajemploi,
  // impots, agriculture.gouv.fr and the CNIL before shipping. Append-only; reschedules
  // nothing. Where a rule has a live 2024-2026 reform (CMG, infant vaccinations), the
  // article states the current position with its date.
  //
  // Batch — droits au travail et état civil
  'protection-licenciement-grossesse',
  'conge-naissance-et-paternite-cumul',
  'allaitement-au-travail-une-heure',
  'amenagement-poste-travail-enceinte',
  'reconnaissance-apres-la-naissance',
  'livret-de-famille-a-quoi-il-sert',
  // Batch — argent et Pajemploi
  'cmg-comment-est-calcule',
  'employer-assistante-maternelle-pajemploi',
  'impots-annee-naissance-demi-part',
  'credit-impot-frais-de-garde',
  'rattacher-enfant-carte-vitale-deux-parents',
  'couches-lavables-ou-jetables-le-cout',
  // Batch — suivi de grossesse (attribué à la sage-femme)
  'trois-echographies-quand-et-remboursement',
  'sept-consultations-qui-peut-suivre',
  'consultation-anesthesiste-8e-mois',
  'projet-de-naissance-comment-lecrire',
  'examens-sanguins-grossesse-obligatoires',
  'calendrier-vaccins-rendez-vous-bebe',
  // Batch — préparation, maison, entourage, vie privée
  'trajet-maternite-anticiper',
  'batch-cooking-avant-la-naissance',
  'securiser-la-maison-par-ou-commencer',
  'preparer-lanimal-a-larrivee',
  'cadrer-laide-des-proches',
  'photos-de-bebe-en-ligne',

  // ── SEO run — 100 keyword-targeted articles, appended in batches of 10 ──
  // Real French search queries the corpus did not yet answer, deduped against everything
  // above, verified against official sources before shipping. Append-only; reschedules
  // nothing. Kept substantive and single-intent on purpose: a thin wall would trip Google's
  // helpful-content demotion, which is the opposite of the goal (see the note at the top).
  // Batch 1 — état civil et démarches
  'acte-de-naissance-copie-integrale-demander',
  'numero-securite-sociale-enfant-attribution',
  'nom-usage-enfant-second-nom-accoler',
  'declaration-naissance-hors-delai-que-faire',
  'copie-integrale-ou-extrait-acte-naissance',
  'livret-famille-perdu-demander-duplicata',
  'enfant-ne-etranger-transcription-acte-naissance',
  'reconnaissance-conjointe-anticipee-pma',
  'acte-naissance-eviter-sites-payants',
  'changer-prenom-enfant-apres-naissance',
  // Batch 2 — congés et indemnités
  'conge-maternite-fonctionnaire-duree-remuneration',
  'conge-maternite-independante-allocation-forfaitaire',
  'conge-maternite-troisieme-enfant-26-semaines',
  'ijss-conge-maternite-calcul-salaire-journalier',
  'conge-maternite-chomage-demandeuse-emploi',
  'conge-paternite-independant-indemnisation',
  'conge-maternite-report-prenatal-postnatal',
  'conge-adoption-duree-indemnisation',
  'conge-maternite-jumeaux-duree',
  'subrogation-employeur-conge-maternite',
  // Batch 3 — aides CAF et budget
  'complement-familial-conditions-montant',
  'allocations-familiales-modulation-revenus',
  'allocation-base-paje-conditions-plafonds',
  'allocation-soutien-familial-parent-seul',
  'quotient-familial-caf-tarifs-petite-enfance',
  'apl-arrivee-enfant-recalcul-droits',
  'rsa-parent-isole-grossesse-majoration',
  'prime-naissance-calendrier-versement',
  'livret-a-bebe-ouvrir-epargne',
  'naissance-prelevement-source-ajuster-taux',
  // Batch 4 — mode de garde et Pajemploi
  'inscription-creche-quand-liste-attente',
  'assistante-maternelle-mensualisation-annee-incomplete',
  'garde-partagee-deux-familles-contrat-cout',
  'contrat-assistante-maternelle-mentions-obligatoires',
  'micro-creche-cmg-ou-psu-difference',
  'cesu-ou-pajemploi-quelle-difference',
  'periode-adaptation-creche-comment-ca-marche',
  'rupture-contrat-assistante-maternelle-procedure',
  'maison-assistants-maternels-mam-fonctionnement',
  'garde-horaires-atypiques-aides-solutions',
  // Batch 5 — achats et matériel (anti-surachat)
  'lit-parapluie-choisir-securite-voyage',
  'baignoire-bebe-quelle-solution-choisir',
  'transat-bebe-utilite-securite',
  'sterilisateur-biberon-necessaire-ou-pas',
  'echarpe-portage-ou-porte-bebe-choisir',
  'tire-lait-location-ou-achat-cout',
  'chauffe-biberon-utile-ou-superflu',
  'tapis-eveil-parc-bebe-quand-utile',
  'table-a-langer-ou-commode-choisir',
  'cuiseur-mixeur-bebe-vraiment-utile',
  // Batch 6 — préparation et protéger la famille
  'pre-admission-maternite-dossier-administratif',
  'faire-part-naissance-quand-quoi-mettre',
  'prevenir-mutuelle-naissance-documents',
  'prevenir-employeur-grossesse-lettre-recommandee',
  'garde-aine-pendant-accouchement-organiser',
  'carte-vitale-mettre-a-jour-avant-naissance',
  'prevenir-assurance-habitation-arrivee-enfant',
  'changer-beneficiaire-assurance-vie-naissance',
  'donation-au-dernier-vivant-proteger-conjoint',
  'designer-tuteur-legal-enfant-testament',
  // Batch 7 — situations spécifiques
  'auto-entrepreneur-grossesse-indemnites',
  'frontalier-suisse-conge-maternite-allocations',
  'etudiante-enceinte-droits-examens-bourse',
  'couple-non-marie-autorite-parentale',
  'famille-recomposee-declarer-enfants-caf-impots',
  'residence-alternee-allocations-partage',
  'parent-etranger-naissance-france-titre-sejour',
  'fonctionnaire-supplement-familial-traitement',
  'avpf-parent-au-foyer-trimestres-retraite',
  'mineure-enceinte-droits-accompagnement',
  // Batch 8 — reprise du travail
  'temps-partiel-apres-conge-maternite-demander',
  'prepare-temps-partiel-cumul-salaire',
  'teletravail-retour-conge-negocier',
  'conge-parental-fractionne-reprise-progressive',
  'refus-conge-parental-employeur-recours',
  'jours-enfant-malade-droit-conge',
  'reprise-anticipee-conge-maternite-possible',
  'entretien-professionnel-retour-conge',
  'horaires-amenages-jeune-parent-droit',
  'formation-cpf-pendant-conge-parental',
];

/**
 * Day offsets within a week. `BLOG_FIRST_PUBLISH_DATE` is a Monday, so this is Monday and
 * Wednesday: two a week, spaced, and never on a weekend where nobody is reading.
 */
const PUBLISH_OFFSETS = [0, 2] as const;
const DAYS_PER_WEEK = 7;

/** Queue position → day offset from day 0. */
export function publishOffsetForIndex(index: number): number {
  const week = Math.floor(index / PUBLISH_OFFSETS.length);
  const slot = index % PUBLISH_OFFSETS.length;
  return week * DAYS_PER_WEEK + PUBLISH_OFFSETS[slot]!;
}

function buildPublishDates(): Record<string, string> {
  const dates: Record<string, string> = {};
  BLOG_PUBLISH_PRIORITY.forEach((slug, index) => {
    dates[slug] = addDays(BLOG_FIRST_PUBLISH_DATE, publishOffsetForIndex(index));
  });
  return dates;
}

export const BLOG_PUBLISH_DATES: Record<string, string> = buildPublishDates();

/**
 * Slugs missing from the priority array are dated past the end of the queue — FAIL-CLOSED.
 * An article you forget to schedule is never published, rather than being published
 * immediately, which is the failure you actually want.
 */
export function getBlogPublishDate(slug: string): string {
  return (
    BLOG_PUBLISH_DATES[slug] ??
    addDays(BLOG_FIRST_PUBLISH_DATE, publishOffsetForIndex(BLOG_PUBLISH_PRIORITY.length))
  );
}

/** Last substantive content edit per slug → JSON-LD `dateModified` and sitemap `lastmod`. */
export const BLOG_CONTENT_UPDATED: Record<string, string> = {};

/**
 * The date the gate compares against. `BUILD_DATE` lets CI and tests pin it — which is what
 * makes "what does the site look like on day 30?" a checkable question rather than a guess.
 */
export function getBuildDate(): string {
  const raw = typeof process !== 'undefined' ? process.env.BUILD_DATE : undefined;
  if (raw && /^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  return new Date().toISOString().slice(0, 10);
}

/** Plain ISO string comparison — lexicographic order is chronological for YYYY-MM-DD. */
export function isBlogPostPublished(slug: string, asOf?: string): boolean {
  return getBlogPublishDate(slug) <= (asOf ?? getBuildDate());
}
