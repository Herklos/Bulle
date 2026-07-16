# FR corpus audit — what the research found

Researched against service-public.gouv.fr, ameli.fr, caf.fr, legifrance and paris.fr.
Every claim below carries its source. Anything that could not be verified is marked
**UNVERIFIED** and must be sourced or removed rather than shipped.

The corpus is strong: déclaration de grossesse, the 7 consultations, the 3 échographies,
reconnaissance anticipée, congés, déclaration de naissance, rattachement, impôts, CMG,
PRADO and the postnatal EPP are all already there. What follows is what remains.

**Any task added must land in `templates.ts` + `fr.ts` + `en.ts`, or
`__tests__/i18n-parity.test.ts` fails. That test is the guard rail; do not route around it.**

---

## Fix first: these are wrong today, and they cost the user

**All four in this section are now FIXED.** The reasoning is kept because it is the
evidence, and because §4's declaration question below is still open.

### 1. ~~The congé supplémentaire transitional rule is missing~~ — FIXED

**Fixed.** `congeSupplementaireDetails` now states the transitional rule and the
must-follow condition. The rest of this section is kept as the reasoning.

`adminFr.tasks.congeSupplementaireDetails[2]` said the congé must start within nine months
of the birth. True for a child born **from 1 July 2026**. For a child born between
**1 January and 30 June 2026** the nine months are counted from **1 July 2026**, so the
deadline is **31 March 2027**.

A parent of a January 2026 baby currently reads in Bulle that their right expires in
October 2026. It expires in March 2027. **Bulle tells them they have five months less than
they do.** This is the worst class of bug this app can have: not a missing feature, an app
that talks someone out of a right they hold.

Also missing, and it constrains the whole calendar the task asks the user to set: the congé
"ne peut démarrer qu'après expiration des congés de maternité, de paternité et d'accueil de
l'enfant ou d'adoption". It cannot be interleaved, only chained.

Source: https://www.service-public.gouv.fr/particuliers/actualites/A18939

### 2. ~~`garde.tasks.preinscription` fires before the guichet opens~~ — FIXED (24-32 SA)

Window is 14-24 SA. Paris: "La demande d'inscription se fait **à partir du 6e mois de
grossesse**" (~26 SA). The window sits **entirely before** the desk opens in the largest
city of the launch market. The task fires, the user tries, the portal refuses them.

That is worse than a late reminder. A late reminder is a miss; this manufactures a failure
and then blames the user for it.

Proposed: `weekStart: 24, weekEnd: 32`, and copy saying the opening date varies by commune
and some do not open before the 6th month. `garde.tasks.guichet` (12-20 SA) already does
the upstream job correctly — find out your own commune's calendar.

Source: https://www.paris.fr/pages/petite-enfance-les-demarches-217

### 3. ~~`garde.tasks.confirmer` is structurally impossible~~ — FIXED (afterBirthDays: 14)

Window is 24-34 SA. The confirmation must happen **after the birth**, and the required
document is the copie intégrale de l'acte de naissance — which does not exist at 34 SA.

Its own note reads "Une confirmation oubliée fait perdre le rang". The mistiming produces
exactly the outcome the note warns about: a place bought with six months of anticipation,
lost in the two weeks after coming home, which is precisely when nobody does paperwork.

Proposed: `afterBirthDays: 14` with an inert `weekStart: 41`, the pattern
`adminFr.tasks.acteNaissance` already uses. The mechanism exists (`domain/postnatal.ts`);
this task simply does not use it.

Source: https://www.paris.fr/pages/petite-enfance-les-demarches-217

### 4. ~~`decisions.tasks.vrs` contradicts itself~~ — FIXED (weekEnd: 32)

Note and details both say "à trancher avant 32 SA". The window runs to 34, so the task can
show as live two weeks after its own deadline. Proposed: `weekEnd: 32`.

---

## The declaration deadline: the code comment optimized against the wrong risk

`templates.ts:38-42` argues in a comment that "fin du 3e mois" = 14 weeks of gestation =
16 SA, and treats 15 SA as a bug that "raccourcit d'une semaine le délai le plus conséquent
de l'app".

What is actually verifiable: service-public F968 uses **two** phrasings as equivalent,
"avant la fin du 3e mois de grossesse" and "dans les 14 premières semaines", and **never
states the scale**. caf.fr writes "avant la fin de la 14ème semaine". No official source
resolves SA vs weeks-of-gestation. Secondary sources contradict each other head-on.

**UNVERIFIED — and the asymmetry runs the other way.** A parent acting at 14 SA is covered
under both readings. A parent who waits until 16 SA on Bulle's word is exposed if their CAF
reads 14 SA, and the penalty is losing the prime à la naissance (1 093,11 € after the April
2026 revalorisation). The comment reasoned about which reading is *correct*; the question
that matters is which reading is *safe when wrong*.

Recommendation: keep `weekEnd: 16` if the wide reading is preferred, but make the copy say
"avant 14 SA" rather than "avant la fin du 3e mois".

Sources: https://www.service-public.gouv.fr/particuliers/vosdroits/F968 ;
https://www.caf.fr/allocataires/vies-de-famille/articles/futures-mamans-n-oubliez-pas-de-declarer-votre-grossesse

---

## Missing tasks

| # | Task | Template | Window | Essential |
|---|---|---|---|---|
| A1 | Prendre l'entretien prénatal précoce | `tpl-admin-fr` | 14-20 SA | yes |
| A2 | Planifier les 7 séances de préparation | `tpl-admin-fr` | 22-34 SA | no |
| A3 | Poser vos absences examens (+ 3 du co-parent) | `tpl-admin-fr` | 12-20 SA | yes |
| A4 | Vérifier que l'employeur organise la visite de reprise | `tpl-admin-fr` | `afterBirthDays: ~150` | yes |
| A5 | Déclarer la naissance à la CAF | `tpl-admin-fr` | `afterBirthDays: 7` | yes |
| A6 | Préparer la question vaccination coqueluche | `tpl-decisions` | 18-24 SA | no |
| A7 | Prévoir vos temps d'allaitement à la reprise | `tpl-postnatal` | `afterBirthDays: 120` | no |

**A1 is the sharpest gap.** The **postnatal** EPP exists (`postnatal.tasks.epp`); the
**prénatal** one does not, though it has been mandatory since 1 May 2020 and is the
appointment where the rest of the parcours gets decided.
https://www.ameli.fr/medecin/actualites/lentretien-prenatal-precoce-un-accompagnement-desormais-obligatoire-pour-les-futurs-parents

**A5**: the corpus declares the birth to the mairie, CPAM, mutuelle and impôts, but never
to the CAF — the step that flips the file from pregnancy to allocation de base.
https://www.caf.fr/allocataires/aides-et-demarches/ma-situation/vie-personnelle/j-attends-un-enfant

**A3**: L1225-16 covers the pregnant employee for all 7 exams AND the co-parent for three
of them, as actual working time. https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051829294

**A6** mirrors `decisions.tasks.vrs` exactly — a question to prepare for an appointment,
never a recommendation Bulle makes (§7.3). https://www.has-sante.fr/jcms/p_3590575/fr/grossesse-les-vaccins-recommandes

**A4**: https://www.service-public.gouv.fr/particuliers/vosdroits/F2871 ·
**A2**: https://www.ameli.fr/assure/sante/themes/grossesse/preparation-parentalite ·
**A7**: https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900911

---

## Other content fixes

- **`declarationNaissanceDetails[0]`** omits that if the 5th day is a Saturday, Sunday or
  jour férié the deadline extends to the next jour ouvrable — the most useful and most
  reassuring part. Also: 8 days in some Guyane communes; the penalty is up to 6 months and
  3 750 €. https://www.service-public.gouv.fr/particuliers/vosdroits/F961
- **`congePaterniteDetails[2]`** — the "huit jours" deadline for the justificatif to the
  employer is **UNVERIFIED**. Source it or cut it.
- **`reeducationDetails[1]`** — "jusqu'à dix séances" is **UNVERIFIED**. Widely repeated,
  not confirmed on ameli in this audit.
- **Bare-domain hrefs are not sources, they are homepages.** `declaration`,
  `consultations`, `rattachementVitale`, `decisions.suivi`, `projetNaissance`,
  `postnatal.reeducation`, `postnatal.consultation` → `https://www.ameli.fr`;
  `congeMaternite`, `congePaternite` → `https://www.service-public.fr`;
  `garde.preinscription`, `paje` → `https://www.caf.fr`. Also `service-public.fr` **301s to**
  `service-public.gouv.fr`; the rest of the corpus already uses `.gouv.fr`.
- **`adminFr.tasks.garde` (12-24 SA) duplicates `tpl-garde` wholesale**, as does
  `budget.tasks.garde` (16-26 SA). Instantiate Administratif + Budget + Mode de garde and
  you get three desynchronised reminders for one action. `tpl-garde` is the full treatment;
  the other two should point at it.

---

## Blog material (sourced, and genuinely counterintuitive)

1. **It is not "8 séances remboursées". It is 7, plus an entretien that is not one of them.**
   ameli: "Vous bénéficiez de **sept** séances". The EPP is a distinct act, also 100%
   covered, and it is **during** the EPP that the seven get scheduled. Missing the EPP is
   not losing one appointment of eight, it is losing the one that orders the other seven.
2. **Born January-June 2026? Your congé supplémentaire is not counted from the birth.**
   Counted from 1 July 2026 → 31 March 2027. The general rule says October 2026. See §1.
3. **The co-parent has three paid absences for prenatal exams, and almost nobody takes them.**
   L1225-16. Not RTT, not a favour, not a negotiation: working time.
4. **In Paris "sign up as early as possible" is bad advice — the desk is shut before the 6th
   month. And the real deadline is after the birth.** See §2 and §3.
5. **"Avant la fin du 3e mois": the State does not say whether that is 14 SA or 16 SA, and
   the prime à la naissance rides on it.** See the declaration section.
6. **After maternity leave it is the employer's job to arrange the visite de reprise — and
   until it happens they cannot make you resume.** F2871.
