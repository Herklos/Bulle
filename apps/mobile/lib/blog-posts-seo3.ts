/**
 * SEO batch 3 — aides de la CAF et budget familial.
 *
 * Same house rules. Every euro amount, plafond and rate here revalorises (annually, on
 * 1 April), so the mechanism is described and the barème linked, never printed (§7.3). Two
 * live changes are featured because they are current and stable facts: the allocations
 * familiales majoration now applies from age 18 (décret of 27 February 2026, effective
 * 1 March 2026), and the prime à la naissance has been paid during the 7th month of
 * pregnancy since 1 April 2021.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'complement-familial-conditions-montant',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Complément familial : les conditions à partir de 3 enfants',
    titleEn: 'Family supplement: the conditions from 3 children',
    excerptFr:
      'Le complément familial est une aide pour les familles d’au moins trois enfants, sous condition de ressources, et versée automatiquement. Voici qui y a droit, et pourquoi il n’y a rien à demander.',
    excerptEn:
      'The family supplement is a benefit for families with at least three children, income-tested, and paid automatically. Here is who is entitled, and why there is nothing to request.',
    readingMinutes: 3,
    heroAltFr: 'Le complément familial à partir de trois enfants',
    heroAltEn: 'The family supplement from three children',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le complément familial est une aide de la CAF souvent ignorée des familles qui viennent d’atteindre le seuil de trois enfants. Elle s’ajoute aux allocations familiales, et beaucoup ne savent pas qu’ils y ont droit parce qu’il n’y a précisément rien à demander.',
          'Voici les conditions, sans les montants, qui se révisent chaque année et se lisent sur le barème officiel.',
        ],
      },
      {
        type: 'text',
        title: 'À partir de trois enfants, sous condition de ressources',
        paragraphs: [
          'Le complément familial concerne les foyers ayant au moins trois enfants à charge, chacun âgé de trois ans ou plus et de moins de vingt et un ans, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F13214). C’est donc une aide qui prend le relais quand les plus jeunes ont dépassé la petite enfance.',
          'Elle est soumise à un plafond de ressources qui varie selon la configuration du foyer. Une majoration existe pour les revenus les plus modestes, sous un plafond plus bas.',
        ],
      },
      {
        type: 'text',
        title: 'Rien à demander',
        paragraphs: [
          'C’est le point pratique le plus utile : le complément familial est versé automatiquement par la CAF si vous êtes déjà allocataire et que vous remplissez les conditions. Aucune démarche spécifique n’est nécessaire.',
          'Son montant dépend uniquement des ressources du foyer, pas du nombre d’enfants au-delà du seuil de trois. Deux foyers de trois ou cinq enfants aux mêmes revenus touchent le même complément.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Condition : au moins 3 enfants à charge, de 3 à moins de 21 ans',
          'Soumis à un plafond de ressources selon la configuration du foyer',
          'Une majoration existe sous un plafond plus bas',
          'Versé automatiquement par la CAF, sans démarche',
          'Montant lié aux ressources, pas au nombre d’enfants au-delà de 3',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The family supplement is a CAF benefit often overlooked by families who have just reached the three-child threshold. It adds to family allowances, and many do not know they are entitled because there is precisely nothing to request.',
          'Here are the conditions, without the amounts, which are revised each year and read on the official scale.',
        ],
      },
      {
        type: 'text',
        title: 'From three children, income-tested',
        paragraphs: [
          'The family supplement concerns households with at least three dependent children, each aged three or older and under twenty-one, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F13214). So it is a benefit that takes over once the youngest have passed early childhood.',
          'It is subject to an income ceiling that varies with the household\'s configuration. A higher rate exists for the most modest incomes, under a lower ceiling.',
        ],
      },
      {
        type: 'text',
        title: 'Nothing to request',
        paragraphs: [
          'This is the most useful practical point: the family supplement is paid automatically by the CAF if you are already a claimant and meet the conditions. No specific step is needed.',
          'Its amount depends only on the household\'s resources, not on the number of children beyond the threshold of three. Two households of three or five children on the same income receive the same supplement.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Condition: at least 3 dependent children, aged 3 to under 21',
          'Subject to an income ceiling by household configuration',
          'A higher rate exists under a lower ceiling',
          'Paid automatically by the CAF, no step needed',
          'Amount tied to resources, not the number of children beyond 3',
        ],
      },
    ],
  }),

  postPair({
    slug: 'allocations-familiales-modulation-revenus',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Allocations familiales : le montant selon les revenus, et le changement de 2026',
    titleEn: 'Family allowances: the amount by income, and the 2026 change',
    excerptFr:
      'Les allocations familiales commencent au deuxième enfant et varient selon les revenus. Depuis mars 2026, la majoration par enfant s’applique à partir de 18 ans, non plus 14.',
    excerptEn:
      'Family allowances start at the second child and vary by income. Since March 2026 the per-child increase applies from age 18, no longer 14.',
    readingMinutes: 3,
    heroAltFr: 'Les allocations familiales selon les revenus',
    heroAltEn: 'Family allowances by income',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les allocations familiales sont l’aide la plus connue, et pourtant leur fonctionnement réserve deux surprises : elles ne commencent qu’au deuxième enfant, et leur montant dépend des revenus depuis quelques années. Un changement récent, en 2026, mérite en plus d’être signalé.',
          'Voici la logique, sans les montants, qui se révisent et se lisent sur le barème de la CAF.',
        ],
      },
      {
        type: 'text',
        title: 'À partir de deux enfants, modulées par les revenus',
        paragraphs: [
          'En métropole, les allocations familiales sont versées à partir du deuxième enfant à charge de moins de vingt ans, selon [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/les-allocations-familiales-af). Dans les départements d’outre-mer, elles commencent dès le premier enfant.',
          'Leur montant est modulé selon les revenus, répartis en trois tranches, et augmente avec le nombre d’enfants à charge. Deux foyers au même nombre d’enfants mais à des revenus différents ne touchent pas la même somme.',
        ],
      },
      {
        type: 'text',
        title: 'Le changement de mars 2026',
        paragraphs: [
          'Depuis le 1er mars 2026, la majoration versée pour un enfant s’applique à partir de ses dix-huit ans, au lieu de quatorze auparavant, pour les familles d’au moins deux enfants, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A18828). Le changement est automatique, sans démarche.',
          'Une règle transitoire protège les enfants nés avant mars 2012, qui conservent la majoration à quatorze ans. Pour un foyer de deux enfants, l’aîné ne déclenche pas cette majoration.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'À partir du 2e enfant en métropole, du 1er en outre-mer',
          'Montant modulé selon les revenus, en 3 tranches',
          'Augmente avec le nombre d’enfants à charge',
          'Depuis le 1er mars 2026 : majoration par enfant à partir de 18 ans (au lieu de 14)',
          'Changement automatique, règle transitoire pour les enfants nés avant mars 2012',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Family allowances are the best-known benefit, and yet how they work holds two surprises: they only start at the second child, and their amount has depended on income for a few years. A recent change, in 2026, is also worth flagging.',
          'Here is the logic, without the amounts, which are revised and read on the CAF scale.',
        ],
      },
      {
        type: 'text',
        title: 'From two children, modulated by income',
        paragraphs: [
          'In mainland France, family allowances are paid from the second dependent child under twenty, according to [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/les-allocations-familiales-af). In the overseas departments, they start with the first child.',
          'Their amount is modulated by income, split into three brackets, and rises with the number of dependent children. Two households with the same number of children but different incomes do not receive the same sum.',
        ],
      },
      {
        type: 'text',
        title: 'The March 2026 change',
        paragraphs: [
          'Since 1 March 2026, the increase paid for a child applies from age eighteen, instead of fourteen before, for families with at least two children, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A18828). The change is automatic, with no step needed.',
          'A transitional rule protects children born before March 2012, who keep the increase at fourteen. For a two-child household, the eldest does not trigger this increase.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'From the 2nd child in mainland France, the 1st overseas',
          'Amount modulated by income, in 3 brackets',
          'Rises with the number of dependent children',
          'Since 1 March 2026: per-child increase from age 18 (instead of 14)',
          'Automatic change, transitional rule for children born before March 2012',
        ],
      },
    ],
  }),

  postPair({
    slug: 'allocation-base-paje-conditions-plafonds',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Allocation de base de la Paje : conditions, plafonds et durée',
    titleEn: 'Paje base benefit: conditions, ceilings and duration',
    excerptFr:
      'L’allocation de base accompagne les trois premières années de l’enfant, sous condition de ressources. Elle se déclenche par la déclaration de grossesse, pas par une demande à part.',
    excerptEn:
      'The base benefit accompanies the child’s first three years, income-tested. It is triggered by the pregnancy declaration, not a separate request.',
    readingMinutes: 3,
    heroAltFr: 'L’allocation de base de la Paje',
    heroAltEn: 'The Paje base benefit',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’allocation de base de la Paje est le versement mensuel qui accompagne les premières années de l’enfant. On la confond souvent avec la prime à la naissance, alors que ce sont deux aides distinctes, déclenchées au même moment mais versées différemment.',
          'Voici ses conditions et sa durée, sans les montants, qui se révisent chaque année.',
        ],
      },
      {
        type: 'text',
        title: 'Sous condition de ressources, jusqu’aux 3 ans de l’enfant',
        paragraphs: [
          'L’allocation de base est versée sous condition de ressources, avec un plafond qui varie selon la situation du foyer, ce qui donne un montant à taux plein ou à taux partiel, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2552).',
          'Elle est versée chaque mois, de la naissance jusqu’au mois précédant le troisième anniversaire de l’enfant. Elle concerne un enfant à la fois par foyer, mais en cas de naissances multiples, elle est versée pour chaque enfant.',
        ],
      },
      {
        type: 'text',
        title: 'Déclenchée par la déclaration de grossesse',
        paragraphs: [
          'Le droit s’ouvre avec la déclaration de grossesse à la CAF, faite dans les quatorze premières semaines, puis la déclaration de naissance. C’est cet enchaînement qui déclenche l’allocation, pas une demande spécifique.',
          'C’est pourquoi déclarer sa grossesse dans les temps compte autant : c’est la porte d’entrée de toute la Paje, prime à la naissance comprise.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Sous condition de ressources, taux plein ou partiel selon le plafond',
          'Versée chaque mois, de la naissance jusqu’aux 3 ans de l’enfant',
          'Un enfant à la fois, mais versée pour chaque enfant en cas de multiples',
          'Déclenchée par la déclaration de grossesse puis de naissance',
          'Montants révisables, à vérifier sur service-public et caf.fr',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The Paje base benefit is the monthly payment that accompanies the child\'s early years. It is often confused with the birth grant, though they are two distinct benefits, triggered at the same moment but paid differently.',
          'Here are its conditions and duration, without the amounts, which are revised each year.',
        ],
      },
      {
        type: 'text',
        title: 'Income-tested, until the child turns 3',
        paragraphs: [
          'The base benefit is paid subject to income, with a ceiling that varies by household situation, giving a full-rate or partial-rate amount, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2552).',
          'It is paid monthly, from birth until the month before the child\'s third birthday. It concerns one child at a time per household, but for multiple births it is paid for each child.',
        ],
      },
      {
        type: 'text',
        title: 'Triggered by the pregnancy declaration',
        paragraphs: [
          'The right opens with the pregnancy declaration to the CAF, made within the first fourteen weeks, then the birth declaration. It is this sequence that triggers the benefit, not a specific request.',
          'That is why declaring your pregnancy on time matters so much: it is the gateway to the whole Paje, birth grant included.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Income-tested, full or partial rate by ceiling',
          'Paid monthly, from birth until the child turns 3',
          'One child at a time, but paid for each in case of multiples',
          'Triggered by the pregnancy then birth declaration',
          'Amounts revisable, to be checked on service-public and caf.fr',
        ],
      },
    ],
  }),

  postPair({
    slug: 'allocation-soutien-familial-parent-seul',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Allocation de soutien familial : une aide pour élever un enfant seul',
    titleEn: 'Family support allowance: help for raising a child alone',
    excerptFr:
      'L’allocation de soutien familial aide un parent qui élève son enfant seul, et elle n’est pas soumise aux ressources. Elle peut aussi avancer une pension alimentaire impayée.',
    excerptEn:
      'The family support allowance helps a parent raising a child alone, and it is not income-tested. It can also advance an unpaid child-support payment.',
    readingMinutes: 3,
    heroAltFr: 'L’allocation de soutien familial',
    heroAltEn: 'The family support allowance',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’allocation de soutien familial est une aide de la CAF pensée pour les parents qui élèvent un enfant seuls, ou pour ceux qui accueillent un enfant privé de l’aide de ses parents. Elle a une particularité rare : elle ne dépend pas des revenus.',
          'C’est une aide qui rassure, parce qu’elle existe précisément dans les situations où l’équilibre du foyer est le plus fragile.',
        ],
      },
      {
        type: 'text',
        title: 'Pour qui, et sans condition de ressources',
        paragraphs: [
          'Elle s’adresse au parent qui élève seul son enfant, ou à toute personne qui recueille un enfant privé de l’aide de l’un ou de ses deux parents, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F815). Elle est versée chaque mois par la CAF, sans être soumise aux ressources.',
          'C’est ce dernier point qui la distingue de la plupart des aides : le montant ne dépend pas de ce que vous gagnez, mais de votre situation familiale.',
        ],
      },
      {
        type: 'text',
        title: 'Elle peut aussi avancer une pension impayée',
        paragraphs: [
          'L’allocation de soutien familial a une seconde fonction, moins connue : elle peut compléter une pension alimentaire fixée trop basse, ou être versée en avance quand l’autre parent ne paie pas, la CAF se chargeant ensuite de la récupérer.',
          'Le versement s’arrête le mois des vingt ans de l’enfant, ou si le parent qui élève seul se met en couple, sauf dans certains cas particuliers. C’est un point à signaler à la CAF pour éviter les indus.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour un parent élevant son enfant seul, ou un enfant privé de l’aide d’un parent',
          'Non soumise aux ressources',
          'Versée chaque mois par la CAF',
          'Peut compléter ou avancer une pension alimentaire impayée',
          'S’arrête aux 20 ans de l’enfant, ou en cas de remise en couple',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The family support allowance is a CAF benefit designed for parents raising a child alone, or for those taking in a child deprived of their parents\' help. It has a rare feature: it does not depend on income.',
          'It is a reassuring benefit, because it exists precisely in the situations where a household\'s balance is most fragile.',
        ],
      },
      {
        type: 'text',
        title: 'For whom, and not income-tested',
        paragraphs: [
          'It is for the parent raising a child alone, or anyone who takes in a child deprived of the help of one or both parents, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F815). It is paid monthly by the CAF, without being income-tested.',
          'It is this last point that sets it apart from most benefits: the amount does not depend on what you earn, but on your family situation.',
        ],
      },
      {
        type: 'text',
        title: 'It can also advance unpaid support',
        paragraphs: [
          'The family support allowance has a second, less-known function: it can top up child support set too low, or be paid in advance when the other parent does not pay, with the CAF then recovering it.',
          'Payment stops the month the child turns twenty, or if the lone parent re-partners, save in certain particular cases. It is a point to report to the CAF to avoid overpayments.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'For a parent raising a child alone, or a child deprived of a parent\'s help',
          'Not income-tested',
          'Paid monthly by the CAF',
          'Can top up or advance unpaid child support',
          'Stops at the child\'s 20th birthday, or on re-partnering',
        ],
      },
    ],
  }),

  postPair({
    slug: 'quotient-familial-caf-tarifs-petite-enfance',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Quotient familial CAF : comment il fixe vos tarifs de crèche et de cantine',
    titleEn: 'CAF family quotient: how it sets your crèche and canteen fees',
    excerptFr:
      'Le quotient familial de la CAF n’est pas celui des impôts. C’est lui qui détermine vos tarifs de crèche, de cantine et de loisirs. Voici comment il se calcule, et pourquoi il bouge.',
    excerptEn:
      'The CAF family quotient is not the tax one. It sets your crèche, canteen and leisure fees. Here is how it is calculated, and why it moves.',
    readingMinutes: 3,
    heroAltFr: 'Le quotient familial de la CAF',
    heroAltEn: 'The CAF family quotient',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Il existe deux quotients familiaux en France, et les confondre mène à des surprises. Celui de la CAF n’a rien à voir avec celui des impôts : c’est lui qui fixe une grande partie de vos tarifs de petite enfance.',
          'Le comprendre évite de s’étonner qu’une place de crèche ou un repas de cantine coûte plus ou moins cher d’une famille à l’autre.',
        ],
      },
      {
        type: 'text',
        title: 'À quoi il sert',
        paragraphs: [
          'De nombreuses communes et structures s’appuient sur le quotient familial de la CAF pour fixer les tarifs des crèches, des cantines, des accueils de loisirs, selon [caf.fr](https://www.caf.fr/allocataires/vies-de-famille/articles/quotient-familial-caf-impots-quelles-differences). Plus il est bas, plus les tarifs le sont, dans les grilles qui l’utilisent.',
          'C’est donc un chiffre qui pèse concrètement sur le budget de garde et de restauration, bien au-delà des seules allocations.',
        ],
      },
      {
        type: 'text',
        title: 'Comment il se calcule, et pourquoi il bouge',
        paragraphs: [
          'Il se calcule à partir de vos ressources annuelles imposables, diminuées de certains abattements, divisées par le nombre de parts, puis par douze pour obtenir un montant mensuel. Il est distinct du quotient des impôts, qui sert à atténuer la progressivité de l’impôt et ignore les prestations.',
          'Point important : le quotient familial de la CAF est recalculé à chaque changement de situation, une naissance par exemple, ou de ressources. Il ne se fige pas une fois par an. Une naissance peut donc le faire baisser, et alléger vos tarifs, dès qu’elle est déclarée.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Sert à fixer les tarifs de crèche, cantine, accueils de loisirs',
          'Calcul : ressources imposables moins abattements, ÷ parts, ÷ 12',
          'Distinct du quotient familial des impôts',
          'Recalculé à chaque changement de situation ou de ressources',
          'Une naissance déclarée peut le faire baisser',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'There are two family quotients in France, and confusing them leads to surprises. The CAF one has nothing to do with the tax one: it sets a large part of your early-childhood fees.',
          'Understanding it avoids being surprised that a crèche place or a canteen meal costs more or less from one family to the next.',
        ],
      },
      {
        type: 'text',
        title: 'What it is for',
        paragraphs: [
          'Many communes and facilities use the CAF family quotient to set fees for crèches, canteens and leisure centres, according to [caf.fr](https://www.caf.fr/allocataires/vies-de-famille/articles/quotient-familial-caf-impots-quelles-differences). The lower it is, the lower the fees, in the scales that use it.',
          'So it is a figure that weighs concretely on the childcare and catering budget, well beyond allowances alone.',
        ],
      },
      {
        type: 'text',
        title: 'How it is calculated, and why it moves',
        paragraphs: [
          'It is calculated from your taxable annual resources, less certain deductions, divided by the number of shares, then by twelve for a monthly figure. It is distinct from the tax quotient, which softens income-tax progressivity and ignores benefits.',
          'Important point: the CAF family quotient is recalculated at each change of situation, a birth for instance, or of resources. It does not freeze once a year. A birth can therefore lower it, and ease your fees, as soon as it is declared.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Used to set crèche, canteen and leisure-centre fees',
          'Calculation: taxable resources less deductions, ÷ shares, ÷ 12',
          'Distinct from the tax family quotient',
          'Recalculated at each change of situation or resources',
          'A declared birth can lower it',
        ],
      },
    ],
  }),

  postPair({
    slug: 'apl-arrivee-enfant-recalcul-droits',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'APL et arrivée d’un enfant : faire recalculer vos droits',
    titleEn: 'Housing benefit and a new child: getting your rights recalculated',
    excerptFr:
      'Un enfant qui arrive change le calcul de l’APL. Encore faut-il le signaler à la CAF, car c’est ce qui met à jour le nombre de personnes à charge dans la formule.',
    excerptEn:
      'A new child changes the housing-benefit calculation. But you must report it to the CAF, since that updates the number of dependants in the formula.',
    readingMinutes: 3,
    heroAltFr: 'L’APL et l’arrivée d’un enfant',
    heroAltEn: 'Housing benefit and a new child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’arrivée d’un enfant peut modifier votre aide au logement, et c’est une bonne nouvelle trop souvent laissée de côté dans la série des démarches post-naissance. L’APL n’est pas figée : elle se recalcule quand le foyer change.',
          'Le point clé, c’est qu’elle ne se met pas à jour toute seule sur ce plan précis : il faut signaler l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'Signaler l’enfant pour déclencher le recalcul',
        paragraphs: [
          'Ajouter un enfant à charge augmente le nombre de personnes prises en compte dans la formule de l’APL, ce qui recalcule le montant, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F12006). Encore faut-il déclarer l’enfant à la CAF, dans votre espace, rubrique profil.',
          'C’est une démarche distincte des ressources : celles-ci sont actualisées automatiquement, mais la composition du foyer, elle, se déclare.',
        ],
      },
      {
        type: 'text',
        title: 'Les ressources, elles, se mettent à jour seules',
        paragraphs: [
          'L’APL se base sur les douze derniers mois de ressources du foyer, actualisés automatiquement tous les trois mois. Vous n’avez pas de déclaration trimestrielle de revenus à faire pour cela : la CAF récupère l’information.',
          'La distinction est utile : les revenus sont suivis automatiquement, mais un changement de composition, comme une naissance, doit être déclaré pour être pris en compte.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Un enfant à charge en plus recalcule le montant de l’APL',
          'À faire : déclarer l’enfant à la CAF, dans votre profil',
          'Les ressources sont actualisées automatiquement tous les 3 mois',
          'Base : les 12 derniers mois de ressources du foyer',
          'La composition du foyer se déclare, les revenus se suivent seuls',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A new child can change your housing benefit, and it is good news too often set aside in the run of post-birth steps. Housing benefit is not fixed: it recalculates when the household changes.',
          'The key point is that it does not update on its own for this specific matter: you must report the child.',
        ],
      },
      {
        type: 'text',
        title: 'Report the child to trigger the recalculation',
        paragraphs: [
          'Adding a dependent child raises the number of people counted in the housing-benefit formula, which recalculates the amount, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F12006). But you must declare the child to the CAF, in your account, under your profile.',
          'It is a step distinct from resources: those are updated automatically, but the household\'s composition is declared.',
        ],
      },
      {
        type: 'text',
        title: 'Resources update on their own',
        paragraphs: [
          'Housing benefit is based on the household\'s last twelve months of resources, refreshed automatically every three months. You have no quarterly income declaration to make for that: the CAF retrieves the information.',
          'The distinction is useful: income is tracked automatically, but a change of composition, such as a birth, must be declared to be taken into account.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'One more dependent child recalculates the housing-benefit amount',
          'To do: declare the child to the CAF, under your profile',
          'Resources are refreshed automatically every 3 months',
          'Base: the household\'s last 12 months of resources',
          'Household composition is declared, income is tracked on its own',
        ],
      },
    ],
  }),

  postPair({
    slug: 'rsa-parent-isole-grossesse-majoration',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'RSA majoré pour parent isolé : un droit dès la déclaration de grossesse',
    titleEn: 'Increased income support for a lone parent: a right from the pregnancy declaration',
    excerptFr:
      'Une femme enceinte vivant seule peut obtenir le RSA majoré dès la déclaration de grossesse, avant même la naissance. Voici la condition et la durée de cette majoration.',
    excerptEn:
      'A pregnant woman living alone can get the increased income support from the pregnancy declaration, before the birth. Here is the condition and the duration.',
    readingMinutes: 3,
    heroAltFr: 'Le RSA majoré pour parent isolé pendant la grossesse',
    heroAltEn: 'Increased income support for a lone parent during pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le RSA majoré pour parent isolé est l’une des rares aides qui peut s’ouvrir avant même la naissance, dès la déclaration de grossesse. C’est un point crucial pour une femme enceinte vivant seule, dont les besoins ne commencent pas le jour de l’accouchement.',
          'Le connaître tôt permet de ne pas passer à côté de plusieurs mois de droits.',
        ],
      },
      {
        type: 'text',
        title: 'Dès la grossesse déclarée',
        paragraphs: [
          'Une femme enceinte qui vit seule, sans être en couple stable, peut être considérée comme parent isolé et obtenir le RSA majoré dès la déclaration de grossesse, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F15553).',
          'La grossesse peut même ouvrir un droit au RSA pour une personne de moins de vingt-cinq ans, une fois déclarée. C’est une exception notable au régime habituel du RSA.',
        ],
      },
      {
        type: 'text',
        title: 'Une majoration pour une durée précise',
        paragraphs: [
          'La majoration parent isolé s’applique pendant douze mois, continus ou non, sur une période de dix-huit mois suivant l’événement qui l’a déclenchée. Si le plus jeune enfant a moins de trois ans, elle est accordée jusqu’à ses trois ans.',
          'C’est donc une aide qui accompagne la période la plus intense, celle où l’on élève un tout-petit seul. Elle est versée par la CAF, et son montant se vérifie sur le site officiel.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour une femme enceinte vivant seule, considérée comme parent isolé',
          'Droit ouvert dès la déclaration de grossesse',
          'Peut ouvrir le RSA aux moins de 25 ans une fois la grossesse déclarée',
          'Majoration : 12 mois sur une période de 18 mois, ou jusqu’aux 3 ans du plus jeune enfant',
          'Versée par la CAF, montant à vérifier sur service-public',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The increased income support for a lone parent is one of the few benefits that can open before the birth, from the pregnancy declaration. It is crucial for a pregnant woman living alone, whose needs do not begin on the day of the birth.',
          'Knowing it early avoids missing several months of entitlement.',
        ],
      },
      {
        type: 'text',
        title: 'From the declared pregnancy',
        paragraphs: [
          'A pregnant woman living alone, not in a stable couple, can be considered a lone parent and obtain the increased income support from the pregnancy declaration, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F15553).',
          'Pregnancy can even open a right to income support for someone under twenty-five, once declared. It is a notable exception to the usual income-support rules.',
        ],
      },
      {
        type: 'text',
        title: 'An increase for a precise duration',
        paragraphs: [
          'The lone-parent increase applies for twelve months, continuous or not, over an eighteen-month period following the triggering event. If the youngest child is under three, it is granted until they turn three.',
          'So it is a benefit that accompanies the most intense period, that of raising a very young child alone. It is paid by the CAF, and its amount is checked on the official site.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'For a pregnant woman living alone, considered a lone parent',
          'Right opened from the pregnancy declaration',
          'Can open income support for under-25s once pregnancy is declared',
          'Increase: 12 months over an 18-month period, or until the youngest child turns 3',
          'Paid by the CAF, amount to check on service-public',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prime-naissance-calendrier-versement',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Prime à la naissance : quand elle est versée, avant ou après la naissance',
    titleEn: 'Birth grant: when it is paid, before or after the birth',
    excerptFr:
      'Depuis 2021, la prime à la naissance est versée pendant le 7e mois de grossesse, plus après la naissance. Un changement qui aide à préparer les achats au bon moment.',
    excerptEn:
      'Since 2021, the birth grant is paid during the 7th month of pregnancy, no longer after the birth. A change that helps prepare purchases at the right time.',
    readingMinutes: 3,
    heroAltFr: 'Le calendrier de versement de la prime à la naissance',
    heroAltEn: 'The birth grant payment calendar',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La prime à la naissance est une aide connue, mais son calendrier de versement a changé, et beaucoup de parents l’ignorent encore. Ce n’est pas un détail : cela change le moment où l’argent arrive, donc le moment où l’on peut préparer les achats.',
          'Voici le calendrier à jour, sans le montant, qui se révise et se vérifie sur le site de la CAF.',
        ],
      },
      {
        type: 'text',
        title: 'Versée pendant le 7e mois, depuis 2021',
        paragraphs: [
          'Depuis le 1er avril 2021, la prime à la naissance est versée pendant le septième mois de grossesse, alors qu’elle l’était auparavant dans les deux mois suivant la naissance, comme l’indique [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2550).',
          'Le changement est utile : la prime arrive avant l’arrivée du bébé, au moment où l’on constitue l’essentiel de la layette et du matériel. C’est plus cohérent avec la réalité des dépenses.',
        ],
      },
      {
        type: 'text',
        title: 'Déclenchée par la déclaration de grossesse',
        paragraphs: [
          'Le versement est conditionné à la déclaration de grossesse à la CAF et à la CPAM dans les quatorze premières semaines. C’est cette déclaration qui déclenche la prime, versée en une seule fois, sous condition de ressources.',
          'Autrement dit, une déclaration de grossesse tardive peut faire décaler ou perdre la prime. C’est l’une des raisons pour lesquelles cette démarche compte autant, et se fait tôt.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Versée pendant le 7e mois de grossesse depuis le 1er avril 2021',
          'Auparavant : dans les deux mois après la naissance',
          'Déclenchée par la déclaration de grossesse, dans les 14 premières semaines',
          'Versée en une seule fois, sous condition de ressources',
          'Montant révisable, à vérifier sur caf.fr',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The birth grant is a well-known benefit, but its payment calendar has changed, and many parents still do not know it. It is not a detail: it changes when the money arrives, and so when you can prepare purchases.',
          'Here is the up-to-date calendar, without the amount, which is revised and checked on the CAF site.',
        ],
      },
      {
        type: 'text',
        title: 'Paid during the 7th month, since 2021',
        paragraphs: [
          'Since 1 April 2021, the birth grant is paid during the seventh month of pregnancy, whereas it was previously paid in the two months after the birth, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2550) states.',
          'The change is useful: the grant arrives before the baby, when you are building most of the layette and equipment. It is more in line with the reality of spending.',
        ],
      },
      {
        type: 'text',
        title: 'Triggered by the pregnancy declaration',
        paragraphs: [
          'Payment is conditional on declaring the pregnancy to the CAF and the CPAM within the first fourteen weeks. It is this declaration that triggers the grant, paid as a single sum, subject to income.',
          'In other words, a late pregnancy declaration can delay or lose the grant. It is one of the reasons this step matters so much, and is done early.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Paid during the 7th month of pregnancy since 1 April 2021',
          'Previously: in the two months after the birth',
          'Triggered by the pregnancy declaration, within the first 14 weeks',
          'Paid as a single sum, subject to income',
          'Amount revisable, to be checked on caf.fr',
        ],
      },
    ],
  }),

  postPair({
    slug: 'livret-a-bebe-ouvrir-epargne',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Livret A pour bébé : l’ouvrir et commencer à épargner',
    titleEn: 'A savings passbook for baby: opening one and starting to save',
    excerptFr:
      'Un bébé peut avoir son Livret A dès la naissance, ouvert par ses parents. Un seul par personne, des intérêts sans impôt : voici les règles avant d’en ouvrir un.',
    excerptEn:
      'A baby can have their own savings passbook from birth, opened by the parents. One per person, tax-free interest: here are the rules before opening one.',
    readingMinutes: 3,
    heroAltFr: 'Ouvrir un Livret A pour un bébé',
    heroAltEn: 'Opening a savings passbook for a baby',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Ouvrir un Livret A à son enfant est un geste d’épargne simple et fréquent, souvent alimenté par les cadeaux de naissance. Quelques règles valent d’être connues avant, pour éviter les fausses idées et les erreurs.',
          'Voici l’essentiel, sans le taux ni le plafond, qui se révisent et se vérifient sur le site officiel.',
        ],
      },
      {
        type: 'text',
        title: 'Dès la naissance, ouvert par les parents',
        paragraphs: [
          'Un mineur peut détenir un Livret A, ouvert par son représentant légal, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2365). Il peut donc l’avoir dès la naissance, à son nom.',
          'Attention à une règle stricte : un seul Livret A par personne. En détenir deux est interdit et sanctionné. Avant d’en ouvrir un au bébé, mieux vaut vérifier qu’aucun n’a été ouvert ailleurs, par exemple par un grand-parent.',
        ],
      },
      {
        type: 'text',
        title: 'Retraits encadrés, intérêts sans impôt',
        paragraphs: [
          'Les retraits avant les seize ans de l’enfant nécessitent l’accord du représentant légal. À partir de seize ans, le mineur peut retirer seul, sauf opposition de son représentant.',
          'L’atout du Livret A reste sa simplicité fiscale : les intérêts sont exonérés d’impôt sur le revenu et de prélèvements sociaux. C’est ce qui en fait un premier support d’épargne commode pour un enfant.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Un mineur peut détenir un Livret A dès la naissance',
          'Ouvert par le représentant légal',
          'Un seul par personne : en détenir deux est interdit',
          'Retraits avant 16 ans avec l’accord du représentant légal',
          'Intérêts exonérés d’impôt sur le revenu et de prélèvements sociaux',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Opening a savings passbook for your child is a simple, common saving gesture, often fed by birth gifts. A few rules are worth knowing beforehand, to avoid misconceptions and mistakes.',
          'Here are the essentials, without the rate or ceiling, which are revised and checked on the official site.',
        ],
      },
      {
        type: 'text',
        title: 'From birth, opened by the parents',
        paragraphs: [
          'A minor can hold a Livret A savings passbook, opened by their legal representative, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2365). So they can have one from birth, in their name.',
          'Beware a strict rule: one passbook per person. Holding two is prohibited and penalised. Before opening one for the baby, it is better to check none was opened elsewhere, for instance by a grandparent.',
        ],
      },
      {
        type: 'text',
        title: 'Framed withdrawals, tax-free interest',
        paragraphs: [
          'Withdrawals before the child turns sixteen require the legal representative\'s consent. From sixteen, the minor can withdraw alone, unless their representative objects.',
          'The passbook\'s strength remains its tax simplicity: interest is exempt from income tax and social levies. That is what makes it a convenient first savings vehicle for a child.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A minor can hold a savings passbook from birth',
          'Opened by the legal representative',
          'One per person: holding two is prohibited',
          'Withdrawals before 16 with the legal representative\'s consent',
          'Interest exempt from income tax and social levies',
        ],
      },
    ],
  }),

  postPair({
    slug: 'naissance-prelevement-source-ajuster-taux',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Naissance et prélèvement à la source : ajuster votre taux sans attendre',
    titleEn: 'A birth and withholding tax: adjusting your rate without waiting',
    excerptFr:
      'Une naissance baisse votre impôt, mais pas tout de suite si vous ne faites rien. Signaler l’événement sous 60 jours ajuste votre prélèvement à la source dès les mois qui suivent.',
    excerptEn:
      'A birth lowers your tax, but not straight away if you do nothing. Reporting the event within 60 days adjusts your withholding in the months that follow.',
    readingMinutes: 3,
    heroAltFr: 'Ajuster le prélèvement à la source après une naissance',
    heroAltEn: 'Adjusting withholding tax after a birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une naissance ouvre une demi-part fiscale supplémentaire, mais l’administration ne l’applique pas d’elle-même à votre prélèvement à la source. Sans démarche, la baisse n’arrive qu’un an plus tard, lors de la régularisation.',
          'Il existe pourtant un moyen simple d’en profiter tout de suite. Cet article porte sur ce geste précis, distinct de la déclaration annuelle.',
        ],
      },
      {
        type: 'text',
        title: 'Signaler le changement sous 60 jours',
        paragraphs: [
          'Il faut signaler la naissance dans les soixante jours, en ligne, via « Gérer mon prélèvement à la source » puis « Signaler un changement » sur [impots.gouv.fr](https://www.impots.gouv.fr/particulier/naissance-adoption). Le service recalcule alors votre taux, et le cas échéant vos acomptes, à la baisse.',
          'L’effet est rapide : votre prélèvement mensuel diminue dès les mois qui suivent, au lieu d’attendre. C’est de la trésorerie récupérée au moment où les dépenses arrivent.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi le taux baisse',
        paragraphs: [
          'La raison tient aux parts : un enfant ajoute une demi-part pour les deux premiers, une part entière à partir du troisième. Plus de parts, c’est un impôt estimé plus faible, donc un taux de prélèvement plus bas. En résidence alternée, l’augmentation est partagée entre les deux parents.',
          'Signaler le changement, c’est simplement demander à l’administration de tenir compte tout de suite de cette nouvelle situation, sans attendre la déclaration du printemps suivant.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'À faire : signaler la naissance dans les 60 jours',
          'Où : « Gérer mon prélèvement à la source » sur impots.gouv.fr',
          'Effet : taux et acomptes ajustés à la baisse rapidement',
          'Raison : l’enfant ajoute des parts (½ pour les 2 premiers, une part dès le 3e)',
          'Résidence alternée : augmentation partagée entre les deux parents',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A birth opens an extra half-share of tax, but the administration does not apply it to your withholding on its own. Without a step, the reduction only comes a year later, at the annual adjustment.',
          'Yet there is a simple way to benefit right away. This article is about that specific gesture, distinct from the annual return.',
        ],
      },
      {
        type: 'text',
        title: 'Report the change within 60 days',
        paragraphs: [
          'You must report the birth within sixty days, online, via "Gérer mon prélèvement à la source" then "Signaler un changement" on [impots.gouv.fr](https://www.impots.gouv.fr/particulier/naissance-adoption). The service then recalculates your rate, and where applicable your instalments, downward.',
          'The effect is quick: your monthly withholding drops in the months that follow, rather than waiting. That is cash recovered when the spending arrives.',
        ],
      },
      {
        type: 'text',
        title: 'Why the rate drops',
        paragraphs: [
          'The reason is the shares: a child adds a half-share for the first two, a full share from the third. More shares means a lower estimated tax, and so a lower withholding rate. In shared custody, the increase is split between the two parents.',
          'Reporting the change is simply asking the administration to take this new situation into account immediately, without waiting for the following spring\'s return.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'To do: report the birth within 60 days',
          'Where: "Gérer mon prélèvement à la source" on impots.gouv.fr',
          'Effect: rate and instalments adjusted downward quickly',
          'Reason: the child adds shares (½ for the first 2, a full share from the 3rd)',
          'Shared custody: the increase is split between the two parents',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO3_FR, en: POSTS_SEO3_EN } = pairsToArrays(pairs);
