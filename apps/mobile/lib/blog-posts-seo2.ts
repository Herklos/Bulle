/**
 * SEO batch 2 — congés et indemnités, les variations que la fiche générale n'aborde pas.
 *
 * Same house rules. Durations (weeks/days) are stated because they are the substance and are
 * stable; indemnity amounts and rates are linked, never printed (§7.3). Verified against
 * ameli, service-public and fonction-publique. Note handled in copy: maternity daily
 * allowances are capped at the PMSS, not the 1.4x SMIC cap that governs sickness leave.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'conge-maternite-fonctionnaire-duree-remuneration',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité dans la fonction publique : durée et traitement maintenu',
    titleEn: 'Maternity leave in the public sector: duration and maintained salary',
    excerptFr:
      'La durée est la même que dans le privé, mais pas l’indemnisation : la fonctionnaire garde son plein traitement, versé par l’employeur, sans passer par les indemnités de la Sécurité sociale.',
    excerptEn:
      'The duration is the same as in the private sector, but not the pay: a civil servant keeps her full salary, paid by the employer, without going through social-security allowances.',
    readingMinutes: 3,
    heroAltFr: 'Le congé maternité dans la fonction publique',
    heroAltEn: 'Maternity leave in the public sector',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé maternité d’une fonctionnaire ressemble beaucoup à celui d’une salariée du privé sur la durée, et s’en distingue nettement sur l’indemnisation. Confondre les deux mène à chercher des indemnités là où il n’y en a pas, parce qu’il y a mieux.',
          'La différence tient en un mot : le traitement est maintenu.',
        ],
      },
      {
        type: 'text',
        title: 'Une durée alignée sur le régime général',
        paragraphs: [
          'La durée suit la même grille que le régime général : seize semaines pour un premier ou deuxième enfant, environ six semaines avant et dix après, et davantage pour un troisième enfant ou des naissances multiples, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F519).',
          'Sur ce plan, rien ne change entre public et privé. C’est la question du salaire qui sépare les deux régimes.',
        ],
      },
      {
        type: 'text',
        title: 'Le plein traitement, pas des indemnités',
        paragraphs: [
          'Contrairement à une salariée du privé, qui perçoit des indemnités journalières de l’Assurance Maladie, la fonctionnaire conserve son plein traitement, versé directement par son employeur, sans délai de carence.',
          'Le maintien couvre le traitement indiciaire, l’indemnité de résidence et le supplément familial de traitement le cas échéant. Le congé compte comme du service actif pour la retraite et l’avancement, et le droit à réintégration est garanti au retour.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Durée : 16 semaines pour un 1er ou 2e enfant, plus pour un 3e ou des multiples',
          'Indemnisation : plein traitement maintenu par l’employeur, pas d’indemnités CPAM',
          'Pas de délai de carence',
          'Compte comme service actif pour la retraite et l’avancement',
          'Droit à réintégration au retour',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A civil servant\'s maternity leave closely resembles a private-sector employee\'s in duration, and differs sharply in pay. Confusing the two leads people to look for allowances where there are none, because there is something better.',
          'The difference holds in one word: the salary is maintained.',
        ],
      },
      {
        type: 'text',
        title: 'A duration aligned with the general scheme',
        paragraphs: [
          'The duration follows the same grid as the general scheme: sixteen weeks for a first or second child, about six before and ten after, and more for a third child or multiple births, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F519).',
          'On this point, nothing changes between public and private. It is the salary question that separates the two.',
        ],
      },
      {
        type: 'text',
        title: 'Full salary, not allowances',
        paragraphs: [
          'Unlike a private-sector employee, who receives daily allowances from the health insurance system, a civil servant keeps her full salary, paid directly by her employer, with no waiting period.',
          'The maintained pay covers the index salary, the residence allowance and the family salary supplement where applicable. The leave counts as active service for pension and advancement, and the right to reinstatement is guaranteed on return.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Duration: 16 weeks for a 1st or 2nd child, more for a 3rd or multiples',
          'Pay: full salary maintained by the employer, no CPAM allowances',
          'No waiting period',
          'Counts as active service for pension and advancement',
          'Right to reinstatement on return',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-independante-allocation-forfaitaire',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité d’une travailleuse indépendante : deux aides, une condition',
    titleEn: 'Maternity leave for a self-employed woman: two benefits, one condition',
    excerptFr:
      'Une indépendante n’a pas de salaire à maintenir, mais deux prestations : une allocation de repos maternel et des indemnités journalières. Le tout suppose d’arrêter réellement son activité.',
    excerptEn:
      'A self-employed woman has no salary to maintain, but two benefits: a maternity rest allowance and daily allowances. Both require actually stopping work.',
    readingMinutes: 3,
    heroAltFr: 'Le congé maternité d’une travailleuse indépendante',
    heroAltEn: 'Maternity leave for a self-employed woman',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé maternité d’une travailleuse indépendante suit une logique à part. Il n’y a pas de salaire à maintenir, mais deux prestations distinctes, et une condition qui pèse dans la décision : arrêter réellement son activité.',
          'Connaître ce cadre évite de croire qu’une indépendante n’a droit à rien, ce qui est faux, ou qu’elle peut cumuler activité et indemnités, ce qui l’est aussi.',
        ],
      },
      {
        type: 'text',
        title: 'Deux prestations',
        paragraphs: [
          'La première est l’allocation forfaitaire de repos maternel, versée en deux fois, autour de la fin du 7e mois puis après l’accouchement. La seconde est une indemnité journalière forfaitaire, versée pendant l’arrêt, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-independante).',
          'Les montants se révisent et se lisent sur ameli. Ce qui est stable, c’est l’existence de ces deux aides, et le fait qu’elles répondent à des logiques différentes : l’une pour le repos, l’autre pour la perte de revenu.',
        ],
      },
      {
        type: 'text',
        title: 'La condition : arrêter son activité',
        paragraphs: [
          'Pour percevoir les indemnités journalières, il faut cesser toute activité professionnelle pendant la période indemnisée. L’arrêt minimum est de huit semaines au total, dont au moins six après l’accouchement.',
          'C’est la contrepartie logique du dispositif : ces indemnités remplacent un revenu d’activité, elles ne s’y ajoutent pas. Une indépendante qui continue de travailler n’y a pas droit.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Allocation forfaitaire de repos maternel, versée en deux fois',
          'Indemnités journalières forfaitaires pendant l’arrêt',
          'Condition : cesser toute activité professionnelle',
          'Arrêt minimum : 8 semaines, dont au moins 6 après l’accouchement',
          'Montants révisables, à vérifier sur ameli.fr',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A self-employed woman\'s maternity leave follows its own logic. There is no salary to maintain, but two distinct benefits, and one condition that weighs in the decision: actually stopping work.',
          'Knowing this framework avoids believing a self-employed woman is entitled to nothing, which is false, or that she can combine work and allowances, which is also false.',
        ],
      },
      {
        type: 'text',
        title: 'Two benefits',
        paragraphs: [
          'The first is the flat-rate maternity rest allowance, paid in two instalments, around the end of the 7th month and after the birth. The second is a flat-rate daily allowance, paid during the stop, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-independante).',
          'The amounts are revised and read on ameli. What is stable is the existence of these two benefits, and that they answer different logics: one for rest, the other for lost income.',
        ],
      },
      {
        type: 'text',
        title: 'The condition: stopping work',
        paragraphs: [
          'To receive the daily allowances, you must cease all professional activity during the indemnified period. The minimum stop is eight weeks in total, of which at least six after the birth.',
          'It is the logical counterpart of the scheme: these allowances replace an activity income, they do not add to it. A self-employed woman who keeps working is not entitled to them.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Flat-rate maternity rest allowance, paid in two instalments',
          'Flat-rate daily allowances during the stop',
          'Condition: cease all professional activity',
          'Minimum stop: 8 weeks, of which at least 6 after the birth',
          'Amounts are revisable, to be checked on ameli.fr',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-troisieme-enfant-26-semaines',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité pour un 3e enfant : 26 semaines, et la condition',
    titleEn: 'Maternity leave for a 3rd child: 26 weeks, and the condition',
    excerptFr:
      'À partir du troisième enfant, le congé maternité passe à 26 semaines au lieu de 16. Encore faut-il remplir la condition, qui ne tient pas au rang de naissance mais aux enfants déjà là.',
    excerptEn:
      'From the third child, maternity leave rises to 26 weeks instead of 16. But you must meet the condition, which is not about birth order but about the children already there.',
    readingMinutes: 3,
    heroAltFr: 'Le congé maternité pour un troisième enfant',
    heroAltEn: 'Maternity leave for a third child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé maternité n’a pas une durée unique. À partir du troisième enfant, il s’allonge nettement, et c’est une bonne nouvelle que beaucoup de familles découvrent tard, parfois après avoir posé leurs dates sur la base des seize semaines habituelles.',
          'La durée change, mais elle est soumise à une condition qu’il faut lire avec attention.',
        ],
      },
      {
        type: 'text',
        title: 'Vingt-six semaines au lieu de seize',
        paragraphs: [
          'Pour un troisième enfant, le congé passe à vingt-six semaines : huit avant la naissance et dix-huit après, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee). Soit dix semaines de plus que la grille de seize semaines d’un premier ou deuxième enfant.',
          'C’est une différence considérable sur l’organisation, et sur le budget du foyer pendant cette période.',
        ],
      },
      {
        type: 'text',
        title: 'La condition, qui n’est pas le rang de naissance',
        paragraphs: [
          'La durée allongée suppose que vous ayez déjà au moins deux enfants nés viables, ou deux enfants à charge. Ce n’est donc pas strictement le rang du bébé à naître qui compte, mais les enfants déjà présents dans le foyer.',
          'La nuance a son importance dans les familles recomposées ou après un parcours particulier. En cas de doute sur votre situation précise, c’est l’Assurance Maladie qui确 tranche, et il vaut mieux vérifier avant de poser les dates.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Durée : 26 semaines (8 avant, 18 après) pour un 3e enfant',
          'Soit 10 semaines de plus que la grille de 16 semaines',
          'Condition : avoir déjà au moins 2 enfants nés viables ou à charge',
          'Ce n’est pas le rang de naissance seul qui compte',
          'À vérifier auprès de l’Assurance Maladie avant de poser les dates',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Maternity leave does not have a single duration. From the third child, it lengthens noticeably, and it is good news many families discover late, sometimes after setting their dates on the usual sixteen weeks.',
          'The duration changes, but it is subject to a condition that must be read carefully.',
        ],
      },
      {
        type: 'text',
        title: 'Twenty-six weeks instead of sixteen',
        paragraphs: [
          'For a third child, the leave rises to twenty-six weeks: eight before the birth and eighteen after, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee). That is ten weeks more than the sixteen-week grid for a first or second child.',
          'It is a considerable difference for the organisation, and for the household budget during this period.',
        ],
      },
      {
        type: 'text',
        title: 'The condition, which is not birth order',
        paragraphs: [
          'The longer duration requires that you already have at least two children born viable, or two dependent children. So it is not strictly the rank of the baby to come that counts, but the children already present in the household.',
          'The nuance matters in blended families or after a particular path. In case of doubt about your precise situation, it is the health insurance system that decides, and it is better to check before setting the dates.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Duration: 26 weeks (8 before, 18 after) for a 3rd child',
          'That is 10 weeks more than the 16-week grid',
          'Condition: already having at least 2 children born viable or dependent',
          'It is not birth order alone that counts',
          'To check with the health insurance system before setting dates',
        ],
      },
    ],
  }),

  postPair({
    slug: 'ijss-conge-maternite-calcul-salaire-journalier',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Indemnités journalières de maternité : comment le montant est calculé',
    titleEn: 'Maternity daily allowances: how the amount is calculated',
    excerptFr:
      'Le montant ne sort pas de nulle part : il part d’une moyenne de vos derniers salaires, plafonnée, moins un forfait. Comprendre le calcul évite la surprise sur le premier versement.',
    excerptEn:
      'The amount does not come from nowhere: it starts from an average of your last salaries, capped, minus a flat deduction. Understanding it avoids surprise on the first payment.',
    readingMinutes: 4,
    heroAltFr: 'Le calcul des indemnités journalières de maternité',
    heroAltEn: 'How maternity daily allowances are calculated',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Beaucoup de futures mères découvrent le montant de leurs indemnités journalières de maternité au premier versement, et sont surprises qu’il ne corresponde pas à leur salaire net habituel. Le calcul n’a rien d’arbitraire, mais il comporte deux étapes qu’il vaut mieux connaître.',
          'Cet article explique la mécanique, pas les montants : ceux-ci se révisent et se vérifient sur ameli.',
        ],
      },
      {
        type: 'text',
        title: 'Un salaire journalier de base, plafonné',
        paragraphs: [
          'Le point de départ est le salaire journalier de base : la somme de vos trois derniers salaires bruts avant l’arrêt, divisée par 91,25 (ou vos douze derniers mois en cas d’activité discontinue), selon [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
          'Ce salaire est retenu dans la limite du plafond mensuel de la Sécurité sociale. C’est ce plafond qui explique qu’un salaire élevé ne se traduit pas par des indemnités proportionnelles : au-delà, la part supplémentaire n’est pas prise en compte.',
        ],
      },
      {
        type: 'text',
        title: 'Puis un forfait déduit',
        paragraphs: [
          'Sur ce salaire journalier de base, un forfait de 21 % est déduit pour obtenir l’indemnité. Il représente l’équivalent des cotisations et contributions sociales. C’est la deuxième raison de l’écart avec le salaire net habituel.',
          'À noter, pour éviter une confusion fréquente : le plafond de référence des indemnités de maternité est celui de la Sécurité sociale, et non le plafond de 1,4 SMIC qui s’applique aux arrêts maladie. Les deux dispositifs ne suivent pas la même règle.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Base : somme des 3 derniers salaires bruts ÷ 91,25',
          'Activité discontinue : les 12 derniers mois',
          'Salaire retenu dans la limite du plafond de la Sécurité sociale',
          'Puis un forfait de 21 % déduit',
          'Le plafond de 1,4 SMIC concerne les arrêts maladie, pas la maternité',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Many mothers-to-be discover the amount of their maternity daily allowances on the first payment, and are surprised it does not match their usual net salary. The calculation is not arbitrary, but it has two steps worth knowing.',
          'This article explains the mechanics, not the amounts: those are revised and checked on ameli.',
        ],
      },
      {
        type: 'text',
        title: 'A capped daily reference salary',
        paragraphs: [
          'The starting point is the daily reference salary: the sum of your last three gross salaries before the stop, divided by 91.25 (or your last twelve months for discontinuous activity), according to [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
          'This salary is taken within the limit of the monthly social-security ceiling. That ceiling explains why a high salary does not translate into proportional allowances: above it, the extra part is not counted.',
        ],
      },
      {
        type: 'text',
        title: 'Then a flat deduction',
        paragraphs: [
          'From this daily reference salary, a flat 21% is deducted to give the allowance. It represents the equivalent of social contributions. It is the second reason for the gap with your usual net salary.',
          'One note, to avoid a common confusion: the reference ceiling for maternity allowances is the social-security one, not the 1.4 x minimum-wage cap that applies to sick leave. The two schemes do not follow the same rule.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Base: sum of the last 3 gross salaries ÷ 91.25',
          'Discontinuous activity: the last 12 months',
          'Salary taken within the social-security ceiling',
          'Then a flat 21% deducted',
          'The 1.4 x minimum-wage cap concerns sick leave, not maternity',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-chomage-demandeuse-emploi',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité au chômage : l’indemnisation des demandeuses d’emploi',
    titleEn: 'Maternity leave while unemployed: cover for jobseekers',
    excerptFr:
      'Être au chômage ne prive pas du congé maternité. Sous conditions, l’Assurance Maladie verse des indemnités, et l’allocation chômage est mise en pause, pas perdue.',
    excerptEn:
      'Being unemployed does not remove maternity leave. Under conditions, the health insurance system pays allowances, and unemployment benefit is paused, not lost.',
    readingMinutes: 3,
    heroAltFr: 'Le congé maternité pour une demandeuse d’emploi',
    heroAltEn: 'Maternity leave for a jobseeker',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Être au chômage au moment d’une grossesse fait souvent craindre de n’avoir droit à rien. C’est faux : le congé maternité existe aussi pour les demandeuses d’emploi, sous conditions, et le mécanisme est plutôt protecteur.',
          'Le point à comprendre est l’articulation entre deux versements : l’allocation chômage et les indemnités de maternité.',
        ],
      },
      {
        type: 'text',
        title: 'Des indemnités de maternité, sous conditions',
        paragraphs: [
          'Une demandeuse d’emploi peut percevoir des indemnités journalières de maternité de l’Assurance Maladie si elle remplit les conditions habituelles d’ouverture de droits et qu’elle perçoit l’allocation chômage, en a perçu dans les douze derniers mois, ou a cessé son activité salariée il y a moins de douze mois, selon [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
          'Autrement dit, un droit récemment ouvert par une activité salariée continue de protéger, même après la fin du contrat.',
        ],
      },
      {
        type: 'text',
        title: 'L’allocation chômage est mise en pause, pas perdue',
        paragraphs: [
          'Pendant le congé maternité, l’allocation chômage est suspendue, car on n’est plus considérée comme disponible pour un emploi. L’Assurance Maladie prend le relais avec les indemnités de maternité. Les droits au chômage ne sont pas perdus : ils sont gelés le temps du congé.',
          'À la fin du congé, l’indemnisation chômage peut reprendre. Il faut pour cela avoir pris l’intégralité du congé maternité et être de nouveau inscrite comme disponible. Prévenir sa caisse et France Travail des dates évite les ruptures de versement.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Indemnités de maternité possibles si les droits sont ouverts et le lien récent au chômage établi',
          'Condition : ARE en cours, dans les 12 derniers mois, ou activité cessée depuis moins de 12 mois',
          'L’allocation chômage est suspendue pendant le congé, pas supprimée',
          'L’Assurance Maladie verse les indemnités à la place',
          'Prévenir sa caisse et France Travail des dates',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Being unemployed at the time of a pregnancy often raises the fear of being entitled to nothing. That is false: maternity leave also exists for jobseekers, under conditions, and the mechanism is rather protective.',
          'The point to grasp is how two payments fit together: unemployment benefit and maternity allowances.',
        ],
      },
      {
        type: 'text',
        title: 'Maternity allowances, under conditions',
        paragraphs: [
          'A jobseeker can receive maternity daily allowances from the health insurance system if she meets the usual rights-opening conditions and receives unemployment benefit, has received it in the last twelve months, or ceased salaried activity less than twelve months ago, according to [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
          'In other words, a right recently opened by salaried work keeps protecting, even after the contract ends.',
        ],
      },
      {
        type: 'text',
        title: 'Unemployment benefit is paused, not lost',
        paragraphs: [
          'During maternity leave, unemployment benefit is suspended, because you are no longer considered available for work. The health insurance system takes over with maternity allowances. Unemployment rights are not lost: they are frozen for the duration of the leave.',
          'At the end of the leave, unemployment benefit can resume. For that you must have taken the whole maternity leave and be registered as available again. Telling your fund and France Travail the dates avoids gaps in payment.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Maternity allowances possible if rights are open and the recent link to unemployment is established',
          'Condition: current benefit, within the last 12 months, or activity ceased less than 12 months ago',
          'Unemployment benefit is suspended during the leave, not removed',
          'The health insurance system pays the allowances instead',
          'Tell your fund and France Travail the dates',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-paternite-independant-indemnisation',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé paternité d’un travailleur indépendant : même durée, une condition',
    titleEn: 'Paternity leave for a self-employed worker: same duration, one condition',
    excerptFr:
      'La durée est la même que pour un salarié, 25 jours, avec 7 jours obligatoires au départ. La différence est l’indemnité forfaitaire, et l’obligation de cesser son activité.',
    excerptEn:
      'The duration is the same as for an employee, 25 days, with 7 mandatory days at the start. The difference is the flat-rate allowance, and the duty to stop work.',
    readingMinutes: 3,
    heroAltFr: 'Le congé paternité d’un travailleur indépendant',
    heroAltEn: 'Paternity leave for a self-employed worker',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Un travailleur indépendant a droit au congé paternité, exactement comme un salarié sur la durée. Ce qui change, c’est la façon dont il est indemnisé, et une condition qui découle du statut d’indépendant.',
          'Le savoir évite de renoncer à un droit par méconnaissance, ce qui est fréquent chez les indépendants persuadés que ces dispositifs ne les concernent pas.',
        ],
      },
      {
        type: 'text',
        title: 'La même durée que pour un salarié',
        paragraphs: [
          'Le congé paternité et d’accueil de l’enfant dure vingt-cinq jours calendaires pour une naissance simple, trente-deux pour des naissances multiples, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/conge-paternite-accueil-enfant).',
          'Il comprend une première période de sept jours autour de la naissance, puis un solde que l’on peut fractionner et prendre dans les six mois. La structure est identique à celle d’un salarié.',
        ],
      },
      {
        type: 'text',
        title: 'Une indemnité forfaitaire, en cessant l’activité',
        paragraphs: [
          'Pendant le congé, l’indépendant perçoit une indemnité journalière forfaitaire, sous conditions d’ouverture de droits. Le montant se révise et se lit sur ameli.',
          'La condition est logique : il faut cesser son activité pendant le congé. L’indemnité remplace un revenu d’activité interrompu, elle ne se cumule pas avec la poursuite du travail.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Durée : 25 jours (32 pour des multiples), comme pour un salarié',
          '7 jours autour de la naissance, puis un solde fractionnable dans les 6 mois',
          'Indemnité journalière forfaitaire, sous conditions',
          'Condition : cesser son activité pendant le congé',
          'Montant révisable, à vérifier sur ameli.fr',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A self-employed worker is entitled to paternity leave, exactly like an employee in duration. What changes is how it is paid, and one condition that follows from self-employed status.',
          'Knowing it avoids giving up a right through ignorance, common among self-employed people convinced these schemes do not concern them.',
        ],
      },
      {
        type: 'text',
        title: 'The same duration as an employee',
        paragraphs: [
          'Paternity and welcome leave lasts twenty-five calendar days for a single birth, thirty-two for multiples, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/conge-paternite-accueil-enfant).',
          'It includes a first seven-day period around the birth, then a balance that can be split and taken within six months. The structure is identical to an employee\'s.',
        ],
      },
      {
        type: 'text',
        title: 'A flat allowance, by stopping work',
        paragraphs: [
          'During the leave, the self-employed worker receives a flat-rate daily allowance, subject to rights-opening conditions. The amount is revised and read on ameli.',
          'The condition is logical: you must cease your activity during the leave. The allowance replaces an interrupted activity income, it does not combine with continued work.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Duration: 25 days (32 for multiples), like an employee',
          '7 days around the birth, then a splittable balance within 6 months',
          'Flat-rate daily allowance, under conditions',
          'Condition: cease your activity during the leave',
          'Amount is revisable, to be checked on ameli.fr',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-report-prenatal-postnatal',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité : reporter des semaines prénatales après la naissance',
    titleEn: 'Maternity leave: moving prenatal weeks to after the birth',
    excerptFr:
      'On peut décaler jusqu’à trois semaines de congé prénatal vers l’après-naissance, avec l’accord du professionnel qui suit la grossesse. Une souplesse utile, avec une limite à connaître.',
    excerptEn:
      'You can shift up to three weeks of prenatal leave to after the birth, with the agreement of the professional following the pregnancy. A useful flexibility, with a limit to know.',
    readingMinutes: 3,
    heroAltFr: 'Reporter une partie du congé prénatal',
    heroAltEn: 'Moving part of the prenatal leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le découpage du congé maternité entre avant et après la naissance n’est pas totalement figé. Il existe une souplesse peu connue : reporter une partie du congé prénatal sur la période postnatale, pour passer plus de temps avec le bébé.',
          'C’est une option, pas une obligation, et elle obéit à des règles précises.',
        ],
      },
      {
        type: 'text',
        title: 'Jusqu’à trois semaines, sur avis médical',
        paragraphs: [
          'Avec l’avis favorable du médecin ou de la sage-femme qui suit la grossesse, jusqu’à trois semaines du congé prénatal peuvent être reportées après l’accouchement, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee).',
          'Le report peut se faire en un bloc de trois semaines au maximum, ou en périodes plus courtes dans cette limite. La demande écrite se transmet à la caisse d’Assurance Maladie avec le certificat médical, au plus tard la veille de la date de début du congé initialement prévue.',
        ],
      },
      {
        type: 'text',
        title: 'La limite : un arrêt annule le report',
        paragraphs: [
          'Il y a un garde-fou important : si un arrêt maladie survient pendant la période prénatale reportée, le report est annulé. Le congé prénatal reprend alors sa forme habituelle.',
          'La logique est protectrice : le report suppose que la fin de grossesse se passe bien. Dès qu’un problème de santé impose un arrêt, la priorité redevient le repos avant la naissance.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Report possible : jusqu’à 3 semaines du prénatal vers le postnatal',
          'Condition : avis favorable du médecin ou de la sage-femme',
          'En un bloc ou en périodes plus courtes dans la limite de 3 semaines',
          'Demande écrite à la caisse, au plus tard la veille du début prévu',
          'Un arrêt maladie pendant la période reportée annule le report',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The split of maternity leave between before and after the birth is not entirely fixed. There is a little-known flexibility: moving part of the prenatal leave to the postnatal period, to spend more time with the baby.',
          'It is an option, not an obligation, and it follows precise rules.',
        ],
      },
      {
        type: 'text',
        title: 'Up to three weeks, on medical advice',
        paragraphs: [
          'With the favourable opinion of the doctor or midwife following the pregnancy, up to three weeks of prenatal leave can be moved to after the birth, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee).',
          'The move can be a block of up to three weeks, or shorter periods within that limit. The written request goes to the health insurance fund with the medical certificate, at the latest the day before the initially planned start of the leave.',
        ],
      },
      {
        type: 'text',
        title: 'The limit: a sick leave cancels the move',
        paragraphs: [
          'There is an important safeguard: if a sick leave occurs during the moved prenatal period, the move is cancelled. The prenatal leave then returns to its usual shape.',
          'The logic is protective: the move assumes the end of pregnancy goes well. As soon as a health problem requires a stop, the priority becomes rest before the birth again.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Move possible: up to 3 weeks of prenatal to postnatal',
          'Condition: favourable opinion of the doctor or midwife',
          'In one block or shorter periods within the 3-week limit',
          'Written request to the fund, at the latest the day before the planned start',
          'A sick leave during the moved period cancels the move',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-adoption-duree-indemnisation',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé d’adoption : durée, partage entre parents et indemnisation',
    titleEn: 'Adoption leave: duration, sharing between parents and pay',
    excerptFr:
      'Le congé d’adoption dure au moins 16 semaines, s’allonge selon la famille, et se partage entre les deux parents, avec un bonus de jours à la clé quand il est partagé.',
    excerptEn:
      'Adoption leave lasts at least 16 weeks, lengthens with the family, and can be shared between both parents, with a bonus of days when it is.',
    readingMinutes: 3,
    heroAltFr: 'Le congé d’adoption',
    heroAltEn: 'Adoption leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé d’adoption est moins documenté que le congé maternité, alors qu’il répond aux mêmes besoins : accueillir l’enfant et souffler. Sa durée dépend de la famille, et il a une particularité intéressante quand les deux parents le partagent.',
          'Voici ses repères, sans les montants, qui se vérifient au moment venu.',
        ],
      },
      {
        type: 'text',
        title: 'Une durée qui dépend de la famille',
        paragraphs: [
          'La durée de base est de seize semaines pour l’accueil d’un enfant, portée à dix-huit semaines si le foyer avait déjà au moins deux enfants à charge, et à vingt-deux semaines en cas d’adoption d’au moins deux enfants, selon [travail-emploi.gouv.fr](https://travail-emploi.gouv.fr/le-conge-dadoption).',
          'Le congé doit se terminer au plus tard huit mois après l’arrivée de l’enfant au foyer. C’est une fenêtre large, qui laisse le temps de s’organiser.',
        ],
      },
      {
        type: 'text',
        title: 'Le bonus quand il est partagé',
        paragraphs: [
          'Le congé peut être partagé entre les deux parents s’ils remplissent tous deux les conditions. Et le partage est encouragé : il ouvre vingt-cinq jours supplémentaires à répartir entre eux, trente-deux pour des adoptions multiples, comme le précise [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A16755).',
          'Il peut être pris simultanément par les deux parents ou en deux fractions. L’indemnisation prend la forme d’indemnités journalières, sous conditions d’ouverture de droits.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Base : 16 semaines, 18 si déjà 2 enfants à charge, 22 pour 2 enfants adoptés',
          'À terminer au plus tard 8 mois après l’arrivée de l’enfant',
          'Partage possible entre les deux parents',
          'Partage encouragé : 25 jours en plus (32 pour des adoptions multiples)',
          'Indemnités journalières sous conditions',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Adoption leave is less documented than maternity leave, though it answers the same needs: welcoming the child and catching your breath. Its duration depends on the family, and it has an interesting feature when both parents share it.',
          'Here are its markers, without the amounts, which are checked at the time.',
        ],
      },
      {
        type: 'text',
        title: 'A duration that depends on the family',
        paragraphs: [
          'The base duration is sixteen weeks to welcome a child, raised to eighteen if the household already had at least two dependent children, and to twenty-two for the adoption of at least two children, according to [travail-emploi.gouv.fr](https://travail-emploi.gouv.fr/le-conge-dadoption).',
          'The leave must end at the latest eight months after the child arrives in the home. It is a wide window, leaving time to organise.',
        ],
      },
      {
        type: 'text',
        title: 'The bonus when it is shared',
        paragraphs: [
          'The leave can be shared between both parents if both meet the conditions. And sharing is encouraged: it opens twenty-five extra days to split between them, thirty-two for multiple adoptions, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A16755) specifies.',
          'It can be taken simultaneously by both parents or in two fractions. Pay takes the form of daily allowances, subject to rights-opening conditions.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Base: 16 weeks, 18 if already 2 dependent children, 22 for 2 adopted children',
          'To end at the latest 8 months after the child arrives',
          'Sharing possible between both parents',
          'Sharing encouraged: 25 extra days (32 for multiple adoptions)',
          'Daily allowances under conditions',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-jumeaux-duree',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité pour des jumeaux : 34 semaines, et plus pour des triplés',
    titleEn: 'Maternity leave for twins: 34 weeks, and more for triplets',
    excerptFr:
      'Attendre des jumeaux allonge nettement le congé maternité : 34 semaines au lieu de 16. Pour des triplés ou plus, il grimpe encore, avec une souplesse propre sur la partie prénatale.',
    excerptEn:
      'Expecting twins lengthens maternity leave a lot: 34 weeks instead of 16. For triplets or more, it rises further, with its own flexibility on the prenatal part.',
    readingMinutes: 3,
    heroAltFr: 'Le congé maternité pour des jumeaux',
    heroAltEn: 'Maternity leave for twins',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une grossesse multiple change beaucoup de choses, et le congé maternité en fait partie. Sa durée est nettement plus longue que pour un enfant unique, ce qui est une bonne nouvelle souvent découverte tardivement.',
          'Les chiffres valent d’être connus tôt, parce qu’ils changent l’organisation et le calendrier de reprise.',
        ],
      },
      {
        type: 'text',
        title: 'Jumeaux : 34 semaines',
        paragraphs: [
          'Pour des jumeaux, le congé maternité passe à trente-quatre semaines : douze avant la naissance et vingt-deux après, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee).',
          'Une souplesse propre aux grossesses gémellaires existe : on peut anticiper le congé prénatal jusqu’à quatre semaines, la partie postnatale étant réduite d’autant, ou au contraire reporter jusqu’à trois semaines de prénatal après la naissance.',
        ],
      },
      {
        type: 'text',
        title: 'Triplés ou plus : 46 semaines',
        paragraphs: [
          'Pour des triplés ou davantage, la durée grimpe encore : quarante-six semaines, dont vingt-quatre avant la naissance et vingt-deux après.',
          'Ces durées longues répondent à une réalité : une grossesse multiple est plus exigeante, et l’accueil de plusieurs bébés demande plus de temps. Le repos prénatal est particulièrement renforcé.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Jumeaux : 34 semaines (12 avant, 22 après)',
          'Triplés ou plus : 46 semaines (24 avant, 22 après)',
          'Jumeaux : anticipation possible du prénatal jusqu’à 4 semaines',
          'Ou report de 3 semaines du prénatal vers l’après-naissance',
          'À confirmer auprès de l’Assurance Maladie',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A multiple pregnancy changes a lot, and maternity leave is part of it. Its duration is much longer than for a single child, which is good news often discovered late.',
          'The figures are worth knowing early, because they change the organisation and the return calendar.',
        ],
      },
      {
        type: 'text',
        title: 'Twins: 34 weeks',
        paragraphs: [
          'For twins, maternity leave rises to thirty-four weeks: twelve before the birth and twenty-two after, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/duree-du-conge-maternite/conge-maternite-salariee).',
          'A flexibility specific to twin pregnancies exists: you can bring the prenatal leave forward by up to four weeks, with the postnatal part reduced accordingly, or on the contrary move up to three weeks of prenatal to after the birth.',
        ],
      },
      {
        type: 'text',
        title: 'Triplets or more: 46 weeks',
        paragraphs: [
          'For triplets or more, the duration rises further: forty-six weeks, of which twenty-four before the birth and twenty-two after.',
          'These long durations answer a reality: a multiple pregnancy is more demanding, and welcoming several babies takes more time. Prenatal rest is particularly reinforced.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Twins: 34 weeks (12 before, 22 after)',
          'Triplets or more: 46 weeks (24 before, 22 after)',
          'Twins: prenatal can be brought forward by up to 4 weeks',
          'Or 3 weeks of prenatal moved to after the birth',
          'To confirm with the health insurance system',
        ],
      },
    ],
  }),

  postPair({
    slug: 'subrogation-employeur-conge-maternite',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Subrogation pendant le congé maternité : comment ça marche',
    titleEn: 'Salary subrogation during maternity leave: how it works',
    excerptFr:
      'Avec la subrogation, l’employeur continue de verser le salaire et récupère les indemnités à votre place. Cela évite l’attente et le décalage de trésorerie. Tout dépend de votre convention.',
    excerptEn:
      'With subrogation, the employer keeps paying your salary and collects the allowances in your place. It avoids the wait and the cash gap. It all depends on your agreement.',
    readingMinutes: 3,
    heroAltFr: 'La subrogation pendant le congé maternité',
    heroAltEn: 'Subrogation during maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La subrogation est un mot technique pour une idée simple et confortable : pendant le congé maternité, c’est l’employeur qui continue de vous verser votre salaire, et qui récupère les indemnités journalières à votre place.',
          'Pour vous, cela change surtout une chose : le rythme des versements, et donc la trésorerie du foyer pendant le congé.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que la subrogation change',
        paragraphs: [
          'Sans subrogation, vous percevez directement les indemnités journalières de l’Assurance Maladie, avec le délai de traitement que cela suppose. Avec subrogation, l’employeur avance le salaire habituel et perçoit les indemnités directement, selon [ameli.fr](https://www.ameli.fr/entreprise/vos-salaries/arret-de-travail/subrogation-salaire).',
          'Le confort est réel : pas d’attente du premier versement de la caisse, pas de rupture dans le salaire. C’est souvent ce qui fait la différence en début de congé.',
        ],
      },
      {
        type: 'text',
        title: 'Cela dépend de votre convention',
        paragraphs: [
          'La subrogation s’applique quand l’employeur maintient tout ou partie de la rémunération, ce maintien devant être au moins égal aux indemnités. Ses modalités sont fixées par la convention collective ou le contrat de travail.',
          'C’est donc un point à vérifier dans sa convention, comme le maintien de salaire lui-même. À noter : pour la maternité, les indemnités sont versées dès le premier jour, sans délai de carence, week-ends et jours fériés compris.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Principe : l’employeur verse le salaire et récupère les indemnités à votre place',
          'Avantage : pas d’attente ni de rupture de versement',
          'Condition : maintien de rémunération au moins égal aux indemnités',
          'Modalités fixées par la convention collective ou le contrat',
          'Maternité : indemnités dès le 1er jour, sans carence',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Subrogation is a technical word for a simple and comfortable idea: during maternity leave, the employer keeps paying your salary and collects the daily allowances in your place.',
          'For you, it mainly changes one thing: the rhythm of payments, and so the household\'s cash flow during the leave.',
        ],
      },
      {
        type: 'text',
        title: 'What subrogation changes',
        paragraphs: [
          'Without subrogation, you receive the daily allowances directly from the health insurance system, with the processing time that implies. With subrogation, the employer advances your usual salary and collects the allowances directly, according to [ameli.fr](https://www.ameli.fr/entreprise/vos-salaries/arret-de-travail/subrogation-salaire).',
          'The comfort is real: no waiting for the fund\'s first payment, no break in salary. That is often what makes the difference at the start of the leave.',
        ],
      },
      {
        type: 'text',
        title: 'It depends on your agreement',
        paragraphs: [
          'Subrogation applies when the employer maintains all or part of the pay, that maintained amount having to be at least equal to the allowances. Its terms are set by the collective agreement or the employment contract.',
          'So it is a point to check in your agreement, like salary maintenance itself. Note: for maternity, allowances are paid from the first day, with no waiting period, weekends and holidays included.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Principle: the employer pays the salary and collects the allowances in your place',
          'Benefit: no wait or break in payment',
          'Condition: maintained pay at least equal to the allowances',
          'Terms set by the collective agreement or the contract',
          'Maternity: allowances from day 1, no waiting period',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO2_FR, en: POSTS_SEO2_EN } = pairsToArrays(pairs);
