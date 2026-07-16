/**
 * Tier 1b articles: the French administrative track, second wave.
 *
 * Same rule as blog-posts-admin.ts (§7.3): amounts and delays that get revalorised yearly are
 * never stated as numbers. We link to the official source and describe the ACTION and its
 * TIMING, which are stable. That keeps the corpus correct without an annual rewrite.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'reconnaissance-anticipee-couple-non-marie',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Reconnaissance anticipée : pourquoi la faire avant la naissance quand vous n’êtes pas mariés',
    titleEn: 'Early recognition of a child: why do it before birth when you are not married',
    excerptFr:
      'Un acte gratuit, dans n’importe quelle mairie, qui règle la filiation et l’autorité parentale avant que la question ne se pose.',
    excerptEn:
      'A free act, at any town hall, that settles filiation and parental authority before the question even comes up.',
    readingMinutes: 5,
    heroAltFr: 'Reconnaissance anticipée d’un enfant',
    heroAltEn: 'Early recognition of a child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Quand vous n’êtes pas mariés, la filiation ne s’établit pas de la même façon pour les deux parents. Celle de la mère est automatique : son nom sur l’acte de naissance suffit. Celle du second parent, non. Sans démarche, rien ne le relie légalement à l’enfant, même s’il est présent à la maternité et sur toutes les photos.',
          'La reconnaissance anticipée règle ça avant même que le bébé soit né.',
        ],
      },
      {
        type: 'text',
        title: 'Où, quand, avec quoi',
        paragraphs: [
          'La reconnaissance peut se faire dans n’importe quelle mairie, sans lien avec votre domicile, le lieu de naissance prévu, ou votre nationalité. Vous vous présentez avec une pièce d’identité et un justificatif de domicile de moins de trois mois à votre nom.',
          'L’officier d’état civil établit l’acte immédiatement, sur place. C’est gratuit. Vous pouvez le faire dès que la grossesse est confirmée, à n’importe quel moment avant l’accouchement.',
        ],
      },
      {
        type: 'list',
        title: 'Ce que ça change concrètement',
        items: [
          'La filiation du second parent est établie avant la naissance, sans attendre',
          'Vous recevez une copie de l’acte à présenter lors de la déclaration de naissance',
          'Le second parent est inscrit sur l’acte de naissance dès le premier jour',
          'En cas de décès du père avant l’accouchement, l’enfant n’est pas déclaré de père inconnu',
        ],
      },
      {
        type: 'text',
        title: 'Le lien avec l’autorité parentale',
        paragraphs: [
          'C’est le point que beaucoup de couples non mariés ignorent. L’article 372 du Code civil pose une règle simple : si la filiation du second parent est établie avant le premier anniversaire de l’enfant, l’autorité parentale est exercée en commun, automatiquement.',
          'Passé ce délai d’un an, ce n’est plus automatique. Le parent qui a reconnu l’enfant en second reste seul titulaire, sauf déclaration conjointe adressée au greffe du tribunal judiciaire, ou décision du juge aux affaires familiales.',
          'Faire la reconnaissance avant la naissance élimine simplement ce risque de calendrier. Vous n’avez pas à vous souvenir d’une échéance dans les mois qui suivent l’accouchement, quand vous avez d’autres priorités.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Détails et démarche sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F887). Le texte de référence sur l’autorité parentale conjointe est l’[article 372 du Code civil](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043895534).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When you are not married, filiation is not established the same way for both parents. The mother’s is automatic: her name on the birth certificate is enough. The second parent’s is not. Without a specific step, nothing legally links them to the child, even if they are at every appointment and every photo.',
          'Early recognition (reconnaissance anticipée) settles this before the baby is even born.',
        ],
      },
      {
        type: 'text',
        title: 'Where, when, with what',
        paragraphs: [
          'You can do this at any town hall (mairie) in France, regardless of where you live, where the birth will take place, or your nationality. Bring an ID document and proof of address less than three months old, in your name.',
          'The registrar draws up the act on the spot, immediately. It is free. You can do it as soon as the pregnancy is confirmed, at any point before the birth.',
        ],
      },
      {
        type: 'list',
        title: 'What it actually changes',
        items: [
          'The second parent’s filiation is established before birth, with nothing left waiting',
          'You receive a copy of the act to bring to the birth declaration',
          'The second parent appears on the birth certificate from day one',
          'If the father dies before the birth, the child is not registered as fatherless',
        ],
      },
      {
        type: 'text',
        title: 'The link to parental authority',
        paragraphs: [
          'This is the part many unmarried couples do not know about. Article 372 of the French Civil Code sets a simple rule: if the second parent’s filiation is established before the child’s first birthday, both parents automatically exercise parental authority jointly.',
          'Past that one-year mark, it stops being automatic. The parent who recognised the child second remains sole holder of parental authority, unless a joint declaration is filed with the family court registry, or a family court judge decides otherwise.',
          'Doing the recognition before birth simply removes that calendar risk. You are not left remembering a deadline in the months after the birth, when you already have other things on your mind.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Details and the procedure are on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F887). The reference text on joint parental authority is [Article 372 of the Civil Code](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000043895534).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-paternite-comment-le-poser',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé paternité : comment le poser sans en perdre un jour',
    titleEn: 'Paternity leave in France: how to schedule it without losing a single day',
    excerptFr:
      'C’est un droit individuel, pas transférable, et ce que vous ne posez pas dans les six mois est perdu. Voici comment le découper intelligemment.',
    excerptEn:
      'It is an individual right, not transferable, and whatever you do not take within six months is gone for good. Here is how to split it sensibly.',
    readingMinutes: 6,
    heroAltFr: 'Poser son congé paternité',
    heroAltEn: 'Scheduling paternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Deux congés se suivent à la naissance, et ils ne fonctionnent pas pareil. Le congé de naissance, trois jours, est accordé par l’employeur, sans démarche particulière. Le congé paternité et d’accueil de l’enfant, lui, se demande, se planifie, et surtout : il vous appartient à vous seul.',
        ],
      },
      {
        type: 'text',
        title: 'La structure du congé',
        paragraphs: [
          'Le congé paternité et d’accueil de l’enfant se compose d’une première période de quatre jours consécutifs, qui suit immédiatement le congé de naissance, et d’une seconde période de vingt-et-un jours, portée à vingt-huit jours en cas de naissances multiples.',
          'La première période est obligatoire pour bénéficier du dispositif. La seconde est plus souple : elle peut être prise d’un seul bloc, ou répartie dans le temps.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qu’il faut retenir sur le calendrier',
        items: [
          'La seconde période doit être prise dans les six mois qui suivent la naissance',
          'Vous prévenez votre employeur au moins un mois avant le début de chaque période',
          'Dans ce délai, l’employeur ne peut pas refuser le congé',
          'Passé les six mois, le droit au congé ET aux indemnités disparaît, il ne se reporte pas',
        ],
      },
      {
        type: 'text',
        title: 'Le fractionnement, sous-utilisé',
        paragraphs: [
          'La période de vingt-et-un ou vingt-huit jours peut être découpée en deux périodes maximum, chacune d’au moins cinq jours. C’est ce qui permet de garder quelques jours pour plus tard, par exemple pour la reprise du travail de l’autre parent, plutôt que de tout consommer la première semaine.',
          'Beaucoup de parents ne le savent pas et posent tout d’un coup, faute d’y avoir pensé à temps. Le fractionnement se prévoit, il ne s’improvise pas à la dernière minute.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Point à ne jamais oublier : ce congé est un droit individuel, personnel, non transférable à l’autre parent. Ce que vous ne prenez pas dans les six mois n’est reporté ni sur vous, ni sur personne. Il est simplement perdu.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Texte de référence : [article L1225-35 du Code du travail](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042685498). Démarches et cas particuliers sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F3156).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Two types of leave follow a birth in France, and they do not work the same way. Birth leave (congé de naissance), three days, is granted by the employer with no formal request. Paternity and child-welcome leave is different: you request it, you plan it, and above all, it belongs to you alone.',
        ],
      },
      {
        type: 'text',
        title: 'How the leave is structured',
        paragraphs: [
          'Paternity and child-welcome leave is made up of a first period of four consecutive days, immediately following birth leave, and a second period of twenty-one days, extended to twenty-eight days for multiple births.',
          'The first period is mandatory to benefit from the scheme. The second is more flexible: it can be taken in one block, or spread out.',
        ],
      },
      {
        type: 'list',
        title: 'What matters about the timing',
        items: [
          'The second period must be taken within six months of the birth',
          'You notify your employer at least one month before each period starts',
          'Within that notice period, the employer cannot refuse the leave',
          'After six months, both the right to the leave AND the benefit disappear, they do not carry over',
        ],
      },
      {
        type: 'text',
        title: 'Splitting it, an underused option',
        paragraphs: [
          'The twenty-one or twenty-eight day period can be split into a maximum of two periods, each at least five days long. This is what lets you keep a few days for later, for instance when the other parent returns to work, instead of using it all in the first week.',
          'Many parents do not know this and take it all at once, simply because they did not plan ahead. Splitting has to be arranged in advance, not improvised at the last minute.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'The point never to forget: this leave is an individual, personal right, not transferable to the other parent. Whatever you do not take within six months is not carried over to you or to anyone else. It is simply lost.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Reference text: [Article L1225-35 of the Labour Code](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042685498). Procedure and special cases on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F3156).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prime-naissance-paje-conditions',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Prime à la naissance et allocation de base : ce qui les déclenche, et quand elles tombent',
    titleEn: 'The birth grant and the base allowance: what triggers them, and when they land',
    excerptFr:
      'La prime tombe avant la naissance, pas après. Et tout dépend d’une démarche que vous avez sans doute déjà faite au premier trimestre.',
    excerptEn:
      'The grant lands before the birth, not after. And everything depends on a step you have probably already done in the first trimester.',
    readingMinutes: 5,
    heroAltFr: 'Prime à la naissance et PAJE',
    heroAltEn: 'Birth grant and family benefits',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La prestation d’accueil du jeune enfant, la PAJE, comprend deux aides distinctes autour de la naissance : la prime à la naissance, versée une seule fois, et l’allocation de base, versée chaque mois jusqu’aux trois ans de l’enfant. Toutes les deux sont soumises à conditions de ressources.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui déclenche le droit',
        paragraphs: [
          'Pour ouvrir droit à ces deux aides, il faut avoir passé le premier examen prénatal obligatoire et avoir déclaré la grossesse avant la fin du troisième mois. C’est cette déclaration, transmise par le médecin ou la sage-femme, qui met en route l’évaluation de vos droits par la CAF.',
          'Vient ensuite la condition de ressources, appréciée sur les revenus d’une année de référence, et qui varie selon votre situation familiale et le nombre d’enfants à naître.',
        ],
      },
      {
        type: 'text',
        title: 'Un calendrier qui surprend souvent',
        paragraphs: [
          'Contrairement à ce que son nom suggère, la prime à la naissance n’est pas versée après l’accouchement, mais pendant la grossesse, autour du septième mois, à condition que la déclaration de grossesse ait été faite dans les temps. En cas de naissances multiples, une prime est versée par enfant attendu.',
          'L’allocation de base, elle, prend le relais après la naissance : elle démarre le premier jour du mois qui suit l’arrivée de l’enfant, et se poursuit chaque mois jusqu’à ses trois ans, toujours sous condition de ressources.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'C’est pour ça que la date limite de déclaration de grossesse, fin du troisième mois, verrouille tout le reste. La manquer ne fait pas seulement perdre du temps sur le suivi médical remboursé, ça retarde aussi l’évaluation de vos droits à la prime et à l’allocation.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Conditions et montants à jour sur [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/la-prime-la-naissance) et sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F2550) pour la prime, [ici](https://www.service-public.fr/particuliers/vosdroits/F2552) pour l’allocation de base.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The French early-childhood benefit scheme, the PAJE, includes two separate payments around a birth: the birth grant, paid once, and the base allowance, paid monthly until the child turns three. Both are means-tested.',
        ],
      },
      {
        type: 'text',
        title: 'What triggers the entitlement',
        paragraphs: [
          'To open the right to either payment, you need to have had the first mandatory prenatal check-up and declared the pregnancy before the end of the third month. That declaration, sent by your doctor or midwife, is what starts your entitlement being assessed by the CAF.',
          'Then comes the resource condition, based on income from a reference year, which varies depending on your household situation and the number of children expected.',
        ],
      },
      {
        type: 'text',
        title: 'A timeline that often surprises people',
        paragraphs: [
          'Despite its name, the birth grant is not paid after the birth. It is paid during the pregnancy, around the seventh month, provided the pregnancy declaration was made on time. For multiple births, a grant is paid per child expected.',
          'The base allowance takes over after the birth: it starts on the first day of the month following the child’s arrival, and continues monthly until age three, still under the same resource condition.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'This is why the pregnancy declaration deadline, the end of the third month, gates everything else. Missing it does not only cost you covered follow-up care. It also delays the assessment of your entitlement to the grant and the allowance.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Current conditions and amounts on [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/la-prime-la-naissance) and on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F2550) for the grant, [here](https://www.service-public.fr/particuliers/vosdroits/F2552) for the base allowance.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'declarer-naissance-mairie-5-jours',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Déclarer la naissance à la mairie : les cinq jours qui comptent vraiment',
    titleEn: 'Declaring a birth at the town hall: the five days that actually count',
    excerptFr:
      'Le jour de l’accouchement ne compte pas dans le délai. Et si vous le manquez quand même, ce n’est plus la mairie qui décide.',
    excerptEn:
      'The day of birth itself does not count toward the deadline. And if you miss it anyway, the town hall is no longer the one deciding.',
    readingMinutes: 4,
    heroAltFr: 'Déclarer une naissance en mairie',
    heroAltEn: 'Declaring a birth at the town hall',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est une des rares démarches de la grossesse qui se joue après l’accouchement, dans un délai court et non négociable. La déclaration de naissance doit être faite dans les cinq jours suivant l’accouchement, auprès de l’officier d’état civil du lieu de naissance.',
        ],
      },
      {
        type: 'text',
        title: 'Comment ces cinq jours se comptent',
        paragraphs: [
          'Le jour de l’accouchement lui-même n’entre pas dans le calcul du délai. Si le cinquième jour tombe un samedi, un dimanche ou un jour férié, la date limite est reportée au premier jour ouvrable suivant. Dans certaines communes très éloignées d’un officier d’état civil, ce délai est porté à huit jours.',
        ],
      },
      {
        type: 'list',
        title: 'Qui peut faire la déclaration',
        items: [
          'Le père, quel que soit son statut matrimonial',
          'Toute personne ayant assisté à l’accouchement, sage-femme comprise',
          'En pratique, c’est souvent la maternité qui accompagne la démarche',
        ],
      },
      {
        type: 'text',
        title: 'Si le délai est dépassé',
        paragraphs: [
          'Passé les cinq jours, l’officier d’état civil ne peut plus inscrire la naissance directement sur ses registres. Il faut alors un jugement déclaratif de naissance, rendu par le tribunal judiciaire du lieu de naissance. La procédure se fait sur requête, avec obligation de recourir à un avocat, ce qui rallonge et complique une démarche qui aurait pu prendre dix minutes.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Texte de référence : [article 55 du Code civil](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033460908). Démarche détaillée sur [justice.fr](https://www.justice.fr/fiche/declaration-naissance).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This is one of the few pregnancy-related steps that plays out after the birth, on a short and non-negotiable deadline. In France, the birth declaration must be made within five days of the delivery, at the town hall covering the place of birth.',
        ],
      },
      {
        type: 'text',
        title: 'How those five days are counted',
        paragraphs: [
          'The day of the delivery itself does not count toward the deadline. If the fifth day falls on a Saturday, Sunday, or public holiday, the deadline moves to the next working day. In certain towns far from a registrar, the deadline is extended to eight days.',
        ],
      },
      {
        type: 'list',
        title: 'Who can make the declaration',
        items: [
          'The father, regardless of marital status',
          'Anyone who was present at the birth, including the midwife',
          'In practice, maternity staff often help with this step',
        ],
      },
      {
        type: 'text',
        title: 'If the deadline is missed',
        paragraphs: [
          'Past the five days, the registrar can no longer record the birth directly in the registers. A court judgment (jugement déclaratif de naissance) is then required, issued by the local court for the place of birth. The procedure is a formal petition and requires a lawyer, which turns a ten-minute errand into something far longer and more complicated.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Reference text: [Article 55 of the Civil Code](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033460908). Detailed procedure on [justice.fr](https://www.justice.fr/fiche/declaration-naissance).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'choisir-prenom-etat-civil',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Choisir le prénom de votre enfant : ce que la mairie peut vraiment faire, et ce qu’elle ne peut pas',
    titleEn: 'Choosing your child’s first name: what the town hall can actually do, and what it cannot',
    excerptFr:
      'Non, la mairie ne peut pas refuser un prénom au guichet. Voici qui décide vraiment, et dans quels cas.',
    excerptEn:
      'No, the town hall cannot refuse a first name at the counter. Here is who actually decides, and in which cases.',
    readingMinutes: 4,
    heroAltFr: 'Choisir le prénom de son enfant',
    heroAltEn: 'Choosing your child’s first name',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est une idée répandue, et fausse : que la mairie pourrait refuser un prénom qui ne lui plaît pas. En droit français, le choix du prénom est libre. Il n’existe pas de liste officielle de prénoms autorisés, et vous pouvez tout à fait en créer un.',
        ],
      },
      {
        type: 'text',
        title: 'Le rôle réel de l’officier d’état civil',
        paragraphs: [
          'L’officier d’état civil, à la mairie, n’a pas le pouvoir de refuser le prénom que vous avez choisi. Son rôle est d’enregistrer le prénom lors de la déclaration de naissance, en vérifiant simplement s’il n’est pas, seul ou associé au nom de famille, contraire à l’intérêt de l’enfant ou au droit d’un tiers à protéger son propre nom.',
          'L’originalité d’une orthographe, seule, n’est jamais un motif de refus au guichet.',
        ],
      },
      {
        type: 'text',
        title: 'Quand le procureur entre en jeu',
        paragraphs: [
          'Si l’officier estime que le prénom pose problème, ridicule, injurieux, ou portant atteinte au droit d’un tiers, il ne le refuse pas lui-même. Il en avise le procureur de la République, qui peut alors saisir le juge aux affaires familiales.',
        ],
      },
      {
        type: 'text',
        title: 'Le juge, seul à pouvoir trancher',
        paragraphs: [
          'C’est le juge, et lui seul, qui peut ordonner la suppression du prénom des registres d’état civil. Si les parents ne proposent pas de prénom de remplacement, c’est le juge qui en attribue un. Il intervient aussi en cas de désaccord entre les parents sur le choix du prénom.',
          'Dans tous les cas, l’enfant a déjà un état civil pendant toute la procédure. Rien ne bloque au guichet, la vérification vient après, et seulement dans des cas rares.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Détails sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F882) et sur [justice.fr](https://www.justice.fr/fiche/choix-prenom-enfant).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This is a common belief, and a wrong one: that a town hall can turn down a first name it does not like. Under French law, the choice of first name is free. There is no official approved list, and you can perfectly well invent one.',
        ],
      },
      {
        type: 'text',
        title: 'What the registrar actually does',
        paragraphs: [
          'The civil registry officer at the town hall has no power to refuse the first name you have chosen. Their role is to record it at the birth declaration, simply checking whether it, alone or combined with the family name, is contrary to the child’s best interests or infringes a third party’s right to protect their own name.',
          'An unusual spelling, on its own, is never grounds for refusal at the counter.',
        ],
      },
      {
        type: 'text',
        title: 'When the public prosecutor steps in',
        paragraphs: [
          'If the registrar believes the name is a problem (ridiculous, insulting, or infringing on someone else’s rights), they do not refuse it themselves. They notify the public prosecutor, who can then bring the matter before a family court judge.',
        ],
      },
      {
        type: 'text',
        title: 'Only the judge can decide',
        paragraphs: [
          'It is the judge, and only the judge, who can order a first name struck from the civil registers. If the parents do not suggest a replacement, the judge assigns one. The judge also steps in when parents disagree between themselves on the name.',
          'Throughout the whole process, the child already has a civil status. Nothing gets stuck at the counter; the review happens afterwards, and only in rare cases.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Details on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F882) and on [justice.fr](https://www.justice.fr/fiche/choix-prenom-enfant).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'rattacher-bebe-carte-vitale-mutuelle',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Rattacher bébé à la carte Vitale, puis à la mutuelle : deux démarches, deux logiques',
    titleEn: 'Adding your baby to a carte Vitale, then to a mutuelle: two steps, two different rules',
    excerptFr:
      'La carte Vitale suit une procédure claire. La mutuelle, elle, n’a aucun délai légal unique : c’est votre contrat qui décide.',
    excerptEn:
      'The carte Vitale follows a clear procedure. The mutuelle has no single legal deadline at all: your contract decides.',
    readingMinutes: 5,
    heroAltFr: 'Rattacher bébé carte Vitale et mutuelle',
    heroAltEn: 'Adding a newborn to health cover',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une fois la déclaration de naissance faite, il reste deux démarches distinctes pour que les frais médicaux de votre enfant soient remboursés correctement : le rattacher à la carte Vitale de ses parents, puis à leur mutuelle. Ce sont deux logiques différentes, et il ne faut pas confondre les deux.',
        ],
      },
      {
        type: 'text',
        title: 'La carte Vitale : une procédure, deux parents',
        paragraphs: [
          'Dès que vous avez l’acte de naissance en main, la demande de rattachement se fait en ligne depuis votre compte ameli, rubrique démarches, ou par courrier avec le formulaire dédié et une copie de l’acte de naissance intégral.',
          'Il est conseillé de faire la demande pour les deux parents, même si l’enfant est déjà rattaché à l’un d’eux. Ça permet à celui qui accompagne l’enfant en consultation de présenter sa propre carte, et d’être remboursé sans attendre.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Contrairement à la carte Vitale, l’ajout à la mutuelle ne suit aucun délai légal uniforme. Chaque organisme complémentaire fixe sa propre règle dans son contrat, et les pratiques varient largement d’un assureur à l’autre, de quelques jours à plusieurs mois.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qu’il faut faire, dans l’ordre',
        items: [
          'Vérifiez votre contrat de mutuelle, ou appelez votre conseiller, pour connaître le délai qui vous concerne',
          'Ne partez jamais du principe qu’un délai vu ailleurs, chez un ami ou en ligne, s’applique à votre contrat',
          'Envoyez à votre mutuelle l’attestation de droits sur laquelle l’enfant apparaît, une fois le rattachement carte Vitale effectif',
          'Refaites la démarche pour les deux mutuelles si les deux parents en ont une séparée et veulent une couverture par les deux',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ça compte',
        paragraphs: [
          'Sans le rattachement mutuelle, la part complémentaire des soins de l’enfant n’est pas remboursée automatiquement, même si la carte Vitale est à jour. C’est une démarche courte, mais elle ne se fait pas toute seule, et personne ne vous relance si vous l’oubliez.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Démarche carte Vitale détaillée sur [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/rattachement-de-l-enfant-sur-la-carte-vitale-des-parents) et sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F16620).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Once the birth has been declared, two separate steps remain before your child’s medical costs are properly reimbursed: adding them to their parents’ carte Vitale, then to their mutuelle (top-up health insurance). These follow two different logics, and it is worth not mixing them up.',
        ],
      },
      {
        type: 'text',
        title: 'The carte Vitale: one procedure, both parents',
        paragraphs: [
          'As soon as you have the birth certificate in hand, the request can be filed online through your ameli account, under the procedures section, or by post with the dedicated form and a full copy of the birth certificate.',
          'It is worth doing this for both parents, even if the child is already attached to one of them. That way, whichever parent brings the child to an appointment can present their own card and be reimbursed without delay.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Unlike the carte Vitale, adding a child to a mutuelle follows no single universal legal deadline. Each insurer sets its own rule within its own contract, and practices vary widely between insurers, from a few days to several months.',
        ],
      },
      {
        type: 'list',
        title: 'What to do, in order',
        items: [
          'Check your own mutuelle contract, or call your adviser, to find the deadline that actually applies to you',
          'Never assume a deadline you saw elsewhere, from a friend or online, applies to your contract',
          'Send your mutuelle the certificate of entitlement showing the child, once the carte Vitale rattachement is confirmed',
          'Repeat the process for both mutuelles if each parent has a separate one and you want cover from both',
        ],
      },
      {
        type: 'text',
        title: 'Why it matters',
        paragraphs: [
          'Without the mutuelle step, the top-up share of your child’s care is not reimbursed automatically, even if the carte Vitale is up to date. It is a short step, but it does not happen on its own, and nobody chases you if you forget it.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Detailed carte Vitale procedure on [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/rattachement-de-l-enfant-sur-la-carte-vitale-des-parents) and on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F16620).',
        ],
      },
    ],
  }),
];

export const POSTS_ADMIN2_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_ADMIN2_EN: BlogPost[] = pairs.map((p) => p.en);
