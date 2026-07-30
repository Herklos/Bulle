/**
 * SEO batch 8 — reprise du travail et conciliation.
 *
 * Same house rules. Droit du travail, verified against service-public, ameli and
 * travail-emploi. No euro amounts. Where a right is conditional or only conventional, the
 * distinction is made explicit. The breastfeeding hour has its own article, so the
 * schedule-arrangements piece here stays on the statutory-vs-conventional line rather than
 * re-explaining it.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'temps-partiel-apres-conge-maternite-demander',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Temps partiel après le congé maternité : comment le demander',
    titleEn: 'Part-time after maternity leave: how to ask for it',
    excerptFr:
      'Le temps partiel « classique » n’est pas un droit : il suppose l’accord de l’employeur. La voie garantie, c’est le congé parental à temps partiel, que l’employeur ne peut pas refuser.',
    excerptEn:
      'Classic part-time is not a right: it needs the employer’s agreement. The guaranteed route is part-time parental leave, which the employer cannot refuse.',
    readingMinutes: 3,
    heroAltFr: 'Demander un temps partiel après le congé maternité',
    heroAltEn: 'Asking for part-time after maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Reprendre à temps partiel après un congé maternité est un souhait fréquent, et une source de malentendus. Beaucoup pensent qu’il s’agit d’un droit automatique. Ce n’est pas le cas, mais il existe une voie garantie qu’il faut connaître.',
          'Tout dépend du chemin emprunté : le temps partiel classique, ou le congé parental à temps partiel.',
        ],
      },
      {
        type: 'text',
        title: 'Le temps partiel classique suppose un accord',
        paragraphs: [
          'Dans le privé, passer à un temps partiel « classique » est une modification du contrat, qui suppose l’accord de l’employeur. Ce n’est donc pas garanti, sauf procédure prévue par un accord collectif.',
          'C’est là que beaucoup de demandes butent, faute de savoir qu’une autre porte existe.',
        ],
      },
      {
        type: 'text',
        title: 'Le congé parental à temps partiel, lui, s’impose',
        paragraphs: [
          'La voie garantie est le congé parental d’éducation à temps partiel : l’employeur ne peut pas en refuser le principe, il peut seulement discuter la répartition des horaires, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2332).',
          'Le délai de prévenance est d’un mois si le temps partiel suit immédiatement le congé maternité, deux mois sinon. La durée du travail doit être d’au moins seize heures par semaine.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Temps partiel classique : modification du contrat, accord de l’employeur requis',
          'Congé parental à temps partiel : l’employeur ne peut pas refuser le principe',
          'Il peut seulement négocier la répartition des horaires',
          'Délai de prévenance : 1 mois après le congé maternité, 2 mois sinon',
          'Durée minimale : 16 heures par semaine',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Returning part-time after maternity leave is a common wish, and a source of misunderstanding. Many think it is an automatic right. It is not, but there is a guaranteed route worth knowing.',
          'It all depends on the path taken: classic part-time, or part-time parental leave.',
        ],
      },
      {
        type: 'text',
        title: 'Classic part-time needs agreement',
        paragraphs: [
          'In the private sector, moving to classic part-time is a contract modification, which needs the employer\'s agreement. So it is not guaranteed, save a procedure set by a collective agreement.',
          'That is where many requests stall, for want of knowing another door exists.',
        ],
      },
      {
        type: 'text',
        title: 'Part-time parental leave, though, imposes itself',
        paragraphs: [
          'The guaranteed route is part-time parental leave: the employer cannot refuse the principle, they can only discuss the distribution of hours, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2332).',
          'The notice period is one month if the part-time immediately follows maternity leave, two months otherwise. Working time must be at least sixteen hours a week.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Classic part-time: contract modification, employer agreement required',
          'Part-time parental leave: the employer cannot refuse the principle',
          'They can only negotiate the distribution of hours',
          'Notice period: 1 month after maternity leave, 2 months otherwise',
          'Minimum duration: 16 hours a week',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prepare-temps-partiel-cumul-salaire',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'PreParE à temps partiel : cumuler l’aide et le salaire',
    titleEn: 'Part-time shared child-raising benefit: combining aid and salary',
    excerptFr:
      'La PreParE peut compléter un salaire de temps partiel, avec un montant qui dépend de la quotité travaillée. Attention : c’est une prestation de la CAF, distincte du congé parental.',
    excerptEn:
      'The shared child-raising benefit can top up a part-time salary, at an amount depending on hours worked. Note: it is a CAF benefit, distinct from parental leave.',
    readingMinutes: 3,
    heroAltFr: 'La PreParE à temps partiel',
    heroAltEn: 'The part-time shared child-raising benefit',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Reprendre à temps partiel pour s’occuper d’un jeune enfant peut ouvrir droit à une aide de la CAF, la PreParE. Elle compense en partie la baisse de revenu, mais son fonctionnement se confond souvent avec celui du congé parental.',
          'Le premier réflexe utile est de bien séparer les deux dispositifs.',
        ],
      },
      {
        type: 'text',
        title: 'Une aide qui complète un temps partiel',
        paragraphs: [
          'La PreParE est versée si vous cessez ou réduisez votre activité pour un enfant de moins de trois ans, et elle peut donc accompagner un temps partiel, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32485). Le montant dépend de la quotité travaillée : plus élevé jusqu’au mi-temps, moindre au-delà.',
          'Elle se cumule avec le salaire du temps partiel, mais pas avec les indemnités de maternité, de paternité ou de maladie, ni avec le chômage ou le complément familial.',
        ],
      },
      {
        type: 'text',
        title: 'Prestation CAF et congé parental : deux choses',
        paragraphs: [
          'Le point à retenir : la PreParE est une prestation de la CAF, tandis que le congé parental est un droit du travail vis-à-vis de l’employeur. Ce sont deux démarches distinctes, à faire séparément.',
          'La durée dépend du rang de l’enfant : six mois par parent pour un premier enfant, dans la limite de son premier anniversaire ; jusqu’aux trois ans de l’enfant à partir du deuxième, avec un plafond par parent qui encourage le partage.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Versée si vous cessez ou réduisez votre activité pour un enfant de moins de 3 ans',
          'Montant selon la quotité travaillée',
          'Se cumule avec le salaire, pas avec les IJ, le chômage ou le complément familial',
          'PreParE (CAF) ≠ congé parental (employeur) : deux démarches',
          'Durée selon le rang de l’enfant, avec un plafond par parent',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Returning part-time to look after a young child can open a right to a CAF benefit, the shared child-raising benefit. It partly offsets the drop in income, but how it works is often confused with parental leave.',
          'The first useful reflex is to clearly separate the two.',
        ],
      },
      {
        type: 'text',
        title: 'A benefit that tops up part-time',
        paragraphs: [
          'The benefit is paid if you cease or reduce your activity for a child under three, so it can accompany part-time work, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32485). The amount depends on the hours worked: higher up to half-time, lower above.',
          'It combines with the part-time salary, but not with maternity, paternity or sickness allowances, nor with unemployment benefit or the family supplement.',
        ],
      },
      {
        type: 'text',
        title: 'CAF benefit and parental leave: two things',
        paragraphs: [
          'The point to remember: the benefit is a CAF payment, while parental leave is a labour-law right towards the employer. They are two distinct steps, to be taken separately.',
          'The duration depends on the child\'s rank: six months per parent for a first child, up to their first birthday; up to the child\'s three years from the second, with a per-parent cap that encourages sharing.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Paid if you cease or reduce activity for a child under 3',
          'Amount according to hours worked',
          'Combines with salary, not with allowances, unemployment or the family supplement',
          'Benefit (CAF) ≠ parental leave (employer): two steps',
          'Duration by the child\'s rank, with a per-parent cap',
        ],
      },
    ],
  }),

  postPair({
    slug: 'teletravail-retour-conge-negocier',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Télétravail au retour de congé : comment le négocier',
    titleEn: 'Teleworking on return from leave: how to negotiate it',
    excerptFr:
      'Le télétravail n’est pas un droit automatique. Il se met en place par accord, charte, ou de gré à gré. L’employeur peut refuser, mais pas toujours sans motiver.',
    excerptEn:
      'Teleworking is not an automatic right. It is set up by agreement, charter, or mutual consent. The employer can refuse, but not always without reasons.',
    readingMinutes: 3,
    heroAltFr: 'Négocier le télétravail au retour de congé',
    heroAltEn: 'Negotiating teleworking on return from leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le télétravail est souvent perçu comme la solution idéale pour reprendre après un congé lié à l’arrivée d’un enfant. Mais avant de le demander, il faut savoir qu’il n’est pas un droit que l’on active, plutôt un cadre que l’on négocie.',
          'Comprendre par quels canaux il se met en place aide à formuler une demande solide.',
        ],
      },
      {
        type: 'text',
        title: 'Trois voies, pas de droit automatique',
        paragraphs: [
          'Le télétravail se met en place par un accord collectif, à défaut par une charte de l’employeur, à défaut par un simple accord de gré à gré entre vous et l’employeur, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F13851).',
          'Il n’existe donc pas de droit automatique à télétravailler. C’est une organisation qui se convient, formalisée par tout moyen quand elle repose sur un accord de gré à gré.',
        ],
      },
      {
        type: 'text',
        title: 'Le refus, et ses limites',
        paragraphs: [
          'L’employeur peut refuser. Mais s’il existe un accord ou une charte prévoyant le télétravail pour votre poste et qu’il refuse, il doit motiver ce refus. En l’absence d’accord ou de charte, il peut motiver, sans y être obligé.',
          'Un point rassurant : votre refus, à vous, d’un passage en télétravail ne peut pas être un motif de rupture du contrat. Le télétravail se propose, il ne s’impose pas au salarié.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pas de droit automatique au télétravail',
          'Mise en place : accord collectif, charte, ou accord de gré à gré',
          'Refus possible, mais à motiver s’il existe un accord ou une charte',
          'Le refus du salarié n’est pas un motif de rupture',
          'À négocier, en s’appuyant sur l’accord ou la charte de l’entreprise',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Teleworking is often seen as the ideal way to return after leave for a child\'s arrival. But before asking for it, you need to know it is not a right you activate, rather a framework you negotiate.',
          'Understanding through which channels it is set up helps you make a solid request.',
        ],
      },
      {
        type: 'text',
        title: 'Three routes, no automatic right',
        paragraphs: [
          'Teleworking is set up by a collective agreement, failing that by an employer charter, failing that by a simple mutual agreement between you and the employer, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F13851).',
          'So there is no automatic right to telework. It is an arrangement that is agreed, formalised by any means when it rests on mutual consent.',
        ],
      },
      {
        type: 'text',
        title: 'Refusal, and its limits',
        paragraphs: [
          'The employer can refuse. But if an agreement or charter provides teleworking for your post and they refuse, they must give reasons. Without an agreement or charter, they may give reasons, without being obliged to.',
          'One reassuring point: your own refusal of a move to teleworking cannot be a ground for terminating the contract. Teleworking is offered, it is not imposed on the employee.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'No automatic right to telework',
          'Set up by: collective agreement, charter, or mutual consent',
          'Refusal possible, but with reasons if an agreement or charter exists',
          'The employee\'s refusal is not a ground for termination',
          'To negotiate, building on the company\'s agreement or charter',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-parental-fractionne-reprise-progressive',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé parental fractionné : reprendre le travail progressivement',
    titleEn: 'Split parental leave: returning to work gradually',
    excerptFr:
      'Le congé parental n’est pas un bloc rigide. Il se prend à temps plein ou partiel, se renouvelle, et permet une reprise en douceur jusqu’aux trois ans de l’enfant.',
    excerptEn:
      'Parental leave is not a rigid block. It can be full or part-time, renewed, and allows a gentle return up to the child’s third birthday.',
    readingMinutes: 3,
    heroAltFr: 'Le congé parental fractionné',
    heroAltEn: 'Split parental leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé parental d’éducation est souvent imaginé comme un bloc de temps plein, tout ou rien. C’est une vision réductrice : il est bien plus souple, et cette souplesse permet précisément une reprise progressive du travail.',
          'Le connaître ouvre des options d’organisation que beaucoup de parents ignorent.',
        ],
      },
      {
        type: 'text',
        title: 'Temps plein, temps partiel, et alternance',
        paragraphs: [
          'Le congé parental est ouvert à tout salarié ayant au moins un an d’ancienneté à la naissance de l’enfant. Il peut être pris à temps plein ou à temps partiel, d’au moins seize heures par semaine, et l’on peut alterner les deux à chaque renouvellement, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2280).',
          'C’est ce qui permet une reprise en douceur : commencer à temps plein de congé, puis passer à un temps partiel qui augmente au fil des mois.',
        ],
      },
      {
        type: 'text',
        title: 'Une durée renouvelable jusqu’aux 3 ans',
        paragraphs: [
          'Le congé dure un an au départ, renouvelable, dans la limite du troisième anniversaire de l’enfant. Les délais de prévenance sont d’un mois s’il suit le congé maternité, deux mois sinon, et d’un mois avant la fin du congé en cours pour le prolonger ou le modifier.',
          'La période compte comme du temps de travail effectif pour l’ancienneté. Ce n’est donc pas une parenthèse qui efface les droits acquis, mais un aménagement du temps.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ouvert avec au moins 1 an d’ancienneté à la naissance',
          'Temps plein ou temps partiel (au moins 16 h/semaine), alternance possible',
          'Un an au départ, renouvelable jusqu’aux 3 ans de l’enfant',
          'Délai de prévenance : 1 mois après le congé maternité, 2 mois sinon',
          'Compte comme temps de travail effectif pour l’ancienneté',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Parental leave is often imagined as a full-time block, all or nothing. That is a narrow view: it is far more flexible, and that flexibility is precisely what allows a gradual return to work.',
          'Knowing it opens organisational options many parents are unaware of.',
        ],
      },
      {
        type: 'text',
        title: 'Full-time, part-time, and alternating',
        paragraphs: [
          'Parental leave is open to any employee with at least one year\'s seniority at the child\'s birth. It can be taken full-time or part-time, at least sixteen hours a week, and you can alternate the two at each renewal, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2280).',
          'That is what allows a gentle return: starting on full-time leave, then moving to part-time that increases over the months.',
        ],
      },
      {
        type: 'text',
        title: 'A renewable duration up to age 3',
        paragraphs: [
          'The leave lasts one year initially, renewable, within the child\'s third birthday. The notice periods are one month if it follows maternity leave, two months otherwise, and one month before the end of the current leave to prolong or modify it.',
          'The period counts as effective working time for seniority. So it is not a parenthesis that erases acquired rights, but an arrangement of time.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Open with at least 1 year\'s seniority at the birth',
          'Full-time or part-time (at least 16h/week), alternating possible',
          'One year initially, renewable up to the child\'s 3rd birthday',
          'Notice period: 1 month after maternity leave, 2 months otherwise',
          'Counts as effective working time for seniority',
        ],
      },
    ],
  }),

  postPair({
    slug: 'refus-conge-parental-employeur-recours',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Refus de congé parental : l’employeur peut-il, et quels recours',
    titleEn: 'Refused parental leave: can the employer, and what recourse',
    excerptFr:
      'Le congé parental d’éducation est un droit : si les conditions sont réunies, l’employeur ne peut pas le refuser. En cas de blocage, un recours existe.',
    excerptEn:
      'Parental leave is a right: if the conditions are met, the employer cannot refuse it. If blocked, there is recourse.',
    readingMinutes: 3,
    heroAltFr: 'Le refus de congé parental par l’employeur',
    heroAltEn: 'The employer refusing parental leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Face à une demande de congé parental, certains salariés craignent un refus de l’employeur, comme pour une demande de congé ordinaire. Sur ce point, le droit est clair et protecteur.',
          'Le congé parental d’éducation n’est pas une faveur : c’est un droit.',
        ],
      },
      {
        type: 'text',
        title: 'Un droit que l’employeur ne peut pas refuser',
        paragraphs: [
          'Si les conditions sont réunies, notamment l’ancienneté d’un an, l’employeur ne peut pas refuser le congé parental, ni en refuser le principe, ni imposer un report, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2280).',
          'Même le non-respect du délai de prévenance par le salarié ne rend pas la demande irrecevable et ne permet pas à l’employeur de s’opposer au départ. Sur un temps partiel parental, il peut seulement négocier la répartition des horaires.',
        ],
      },
      {
        type: 'text',
        title: 'En cas de blocage',
        paragraphs: [
          'Si malgré tout l’employeur refuse ou fait obstacle, le recours est le conseil de prud’hommes. C’est la juridiction compétente pour faire respecter ce droit.',
          'Dans la pratique, rappeler par écrit que le congé parental est un droit suffit souvent à débloquer la situation. Le refus, ici, n’a pas de base légale quand les conditions sont réunies.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Congé parental d’éducation : un droit, pas une faveur',
          'Conditions réunies : l’employeur ne peut pas le refuser ni le reporter',
          'Le non-respect du délai de prévenance ne permet pas un refus',
          'Temps partiel parental : seule la répartition des horaires se négocie',
          'Recours en cas de blocage : le conseil de prud’hommes',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Faced with a parental-leave request, some employees fear a refusal from the employer, as for an ordinary leave request. On this point, the law is clear and protective.',
          'Parental leave is not a favour: it is a right.',
        ],
      },
      {
        type: 'text',
        title: 'A right the employer cannot refuse',
        paragraphs: [
          'If the conditions are met, notably the one year\'s seniority, the employer cannot refuse parental leave, neither refuse the principle nor impose a postponement, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2280).',
          'Even the employee\'s failure to respect the notice period does not make the request inadmissible or let the employer oppose the departure. On a parental part-time, they can only negotiate the distribution of hours.',
        ],
      },
      {
        type: 'text',
        title: 'If blocked',
        paragraphs: [
          'If the employer nonetheless refuses or obstructs, the recourse is the labour court. It is the competent jurisdiction to enforce this right.',
          'In practice, recalling in writing that parental leave is a right is often enough to unblock the situation. Refusal here has no legal basis when the conditions are met.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Parental leave: a right, not a favour',
          'Conditions met: the employer cannot refuse or postpone it',
          'Failing the notice period does not allow a refusal',
          'Parental part-time: only the distribution of hours is negotiated',
          'Recourse if blocked: the labour court',
        ],
      },
    ],
  }),

  postPair({
    slug: 'jours-enfant-malade-droit-conge',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Jours pour enfant malade : ce que dit la loi',
    titleEn: 'Days for a sick child: what the law says',
    excerptFr:
      'Trois jours par an, cinq dans certains cas : le congé pour enfant malade est un droit, mais il n’est pas payé sauf convention. À ne pas confondre avec le congé de présence parentale.',
    excerptEn:
      'Three days a year, five in some cases: leave for a sick child is a right, but unpaid unless your agreement says otherwise. Not to be confused with parental-presence leave.',
    readingMinutes: 3,
    heroAltFr: 'Le congé pour enfant malade',
    heroAltEn: 'Leave for a sick child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Quand un enfant est malade et qu’il faut rester auprès de lui, le droit du travail prévoit un congé, souvent mal connu dans ses limites. Le connaître évite d’en attendre trop, ou de croire à tort qu’il n’existe pas.',
          'C’est un droit réel, mais encadré, et à ne pas confondre avec un autre congé.',
        ],
      },
      {
        type: 'text',
        title: 'Trois jours, parfois cinq',
        paragraphs: [
          'Le congé pour enfant malade permet de s’absenter pour un enfant de moins de seize ans malade, sur présentation d’un certificat médical. Sa durée légale est de trois jours par an, portée à cinq si l’enfant a moins d’un an ou si le salarié a la charge d’au moins trois enfants de moins de seize ans, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F151).',
          'Point important : ce congé n’est pas rémunéré, sauf disposition plus favorable de votre convention collective ou d’un accord d’entreprise. Vérifier sa convention peut donc changer beaucoup de choses.',
        ],
      },
      {
        type: 'text',
        title: 'À distinguer du congé de présence parentale',
        paragraphs: [
          'Le congé pour enfant malade est ponctuel et court. Il ne faut pas le confondre avec le congé de présence parentale, réservé à un enfant gravement malade, qui peut aller jusqu’à trois cent dix jours et s’accompagne d’une allocation versée par la CAF.',
          'Deux dispositifs, deux situations : l’un pour une maladie passagère, l’autre pour une situation lourde et durable.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour un enfant de moins de 16 ans malade, sur certificat médical',
          'Durée : 3 jours par an, 5 si l’enfant a moins d’un an ou si 3 enfants à charge',
          'Non rémunéré, sauf convention ou accord plus favorable',
          'À distinguer du congé de présence parentale (enfant gravement malade)',
          'Présence parentale : jusqu’à 310 jours, avec allocation de la CAF',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When a child is ill and you need to stay with them, labour law provides a leave, often poorly known in its limits. Knowing it avoids expecting too much, or wrongly believing it does not exist.',
          'It is a real right, but a framed one, and not to be confused with another leave.',
        ],
      },
      {
        type: 'text',
        title: 'Three days, sometimes five',
        paragraphs: [
          'Leave for a sick child lets you be absent for an ill child under sixteen, on presentation of a medical certificate. Its legal duration is three days a year, raised to five if the child is under one or if the employee has at least three children under sixteen, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F151).',
          'Important point: this leave is unpaid, unless a more favourable provision in your collective agreement or a company accord. Checking your agreement can therefore change a lot.',
        ],
      },
      {
        type: 'text',
        title: 'Distinct from parental-presence leave',
        paragraphs: [
          'Leave for a sick child is occasional and short. It should not be confused with parental-presence leave, reserved for a seriously ill child, which can go up to three hundred and ten days and comes with an allowance paid by the CAF.',
          'Two schemes, two situations: one for a passing illness, the other for a heavy, lasting situation.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'For an ill child under 16, on a medical certificate',
          'Duration: 3 days a year, 5 if the child is under one or if 3 dependent children',
          'Unpaid, unless a more favourable agreement or accord',
          'Distinct from parental-presence leave (seriously ill child)',
          'Parental presence: up to 310 days, with a CAF allowance',
        ],
      },
    ],
  }),

  postPair({
    slug: 'reprise-anticipee-conge-maternite-possible',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Reprendre avant la fin du congé maternité : ce qui est possible',
    titleEn: 'Returning before the end of maternity leave: what is possible',
    excerptFr:
      'On peut écourter son congé maternité, mais jamais totalement : un minimum de 8 semaines, dont 6 après l’accouchement, est obligatoire. En dessous, ce n’est plus indemnisé.',
    excerptEn:
      'You can shorten maternity leave, but never entirely: a minimum of 8 weeks, of which 6 after the birth, is mandatory. Below that, it is no longer paid.',
    readingMinutes: 3,
    heroAltFr: 'Reprendre avant la fin du congé maternité',
    heroAltEn: 'Returning before the end of maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Certaines mères souhaitent reprendre le travail avant la fin de leur congé maternité, par choix ou par nécessité. C’est possible, mais dans une limite stricte que la loi ne laisse pas franchir.',
          'On peut écourter, on ne peut pas supprimer.',
        ],
      },
      {
        type: 'text',
        title: 'Un minimum obligatoire de huit semaines',
        paragraphs: [
          'Le congé maternité peut être écourté, mais jamais totalement : la salariée doit obligatoirement s’arrêter au moins huit semaines au total, dont au moins six après l’accouchement, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2265).',
          'Pendant ces six semaines postnatales, il est même interdit à l’employeur de faire travailler la salariée. C’est une protection, pas une simple recommandation.',
        ],
      },
      {
        type: 'text',
        title: 'En dessous, plus d’indemnisation',
        paragraphs: [
          'Si l’on descend sous ce minimum de huit semaines, le congé n’est plus indemnisable. Le seuil protège donc aussi les droits : renoncer à tout reviendrait à perdre l’indemnisation.',
          'On peut renoncer à une partie du congé, surtout la partie prénatale, en partie reportable après la naissance sur avis médical, mais pas à sa totalité. Le repos minimal est garanti, dans l’intérêt de la mère et de l’enfant.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'On peut écourter le congé, pas le supprimer',
          'Minimum obligatoire : 8 semaines au total, dont 6 après l’accouchement',
          'Pendant les 6 semaines postnatales : interdiction de faire travailler la salariée',
          'En dessous de 8 semaines : plus d’indemnisation',
          'On peut renoncer à une partie (surtout prénatale), pas à la totalité',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Some mothers wish to return to work before the end of their maternity leave, by choice or necessity. It is possible, but within a strict limit the law does not let you cross.',
          'You can shorten it, you cannot remove it.',
        ],
      },
      {
        type: 'text',
        title: 'A mandatory minimum of eight weeks',
        paragraphs: [
          'Maternity leave can be shortened, but never entirely: the employee must stop at least eight weeks in total, of which at least six after the birth, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2265).',
          'During those six postnatal weeks, the employer is even forbidden to make the employee work. It is a protection, not a mere recommendation.',
        ],
      },
      {
        type: 'text',
        title: 'Below that, no more pay',
        paragraphs: [
          'If you go below this eight-week minimum, the leave is no longer indemnisable. So the threshold also protects rights: renouncing everything would mean losing the pay.',
          'You can renounce part of the leave, especially the prenatal part, partly movable to after the birth on medical advice, but not all of it. The minimum rest is guaranteed, in the interest of mother and child.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'You can shorten the leave, not remove it',
          'Mandatory minimum: 8 weeks total, of which 6 after the birth',
          'During the 6 postnatal weeks: forbidden to make the employee work',
          'Below 8 weeks: no more pay',
          'You can renounce part (especially prenatal), not all',
        ],
      },
    ],
  }),

  postPair({
    slug: 'entretien-professionnel-retour-conge',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Entretien professionnel au retour de congé maternité',
    titleEn: 'Career interview on return from maternity leave',
    excerptFr:
      'Au retour d’un congé maternité ou parental, l’employeur doit proposer un entretien professionnel. Il porte sur votre évolution et vos besoins de formation, pas sur une évaluation.',
    excerptEn:
      'On return from maternity or parental leave, the employer must offer a career interview. It is about your development and training needs, not an appraisal.',
    readingMinutes: 3,
    heroAltFr: 'L’entretien professionnel au retour de congé',
    heroAltEn: 'The career interview on return from leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le retour d’un congé maternité ou parental s’accompagne d’un rendez-vous que l’employeur doit vous proposer, et que beaucoup de salariés ne réclament pas faute de le connaître : l’entretien professionnel.',
          'Ce n’est pas une formalité vide : c’est un temps qui vous appartient, sur votre avenir professionnel.',
        ],
      },
      {
        type: 'text',
        title: 'Une obligation de l’employeur',
        paragraphs: [
          'L’employeur doit proposer un entretien professionnel au salarié qui reprend après, notamment, un congé maternité ou un congé parental d’éducation, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32040). À votre demande, il peut même avoir lieu avant la reprise effective.',
          'Cet entretien est distinct de l’entretien d’évaluation. Il porte sur vos perspectives d’évolution et vos besoins de formation, pas sur un jugement de votre travail.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que son absence implique',
        paragraphs: [
          'Ne pas proposer cet entretien peut constituer un manquement de l’employeur. Dans les entreprises d’au moins cinquante salariés, un défaut d’entretien sur plusieurs années peut déclencher un abondement correctif de votre compte personnel de formation.',
          'C’est donc un droit à activer, pas seulement une case à cocher pour l’entreprise. Le demander, c’est reprendre la main sur son parcours après une parenthèse familiale.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'L’employeur doit le proposer au retour de congé maternité ou parental',
          'Possible avant la reprise effective, à votre demande',
          'Distinct de l’entretien d’évaluation : évolution et formation',
          'Son absence peut être un manquement de l’employeur',
          'Dans les entreprises d’au moins 50 salariés : abondement correctif du CPF possible',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The return from maternity or parental leave comes with an appointment the employer must offer you, and which many employees do not claim for want of knowing it: the career interview.',
          'It is not an empty formality: it is time that belongs to you, about your professional future.',
        ],
      },
      {
        type: 'text',
        title: 'An employer obligation',
        paragraphs: [
          'The employer must offer a career interview to an employee returning after, notably, maternity leave or parental leave, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32040). On your request, it can even take place before the effective return.',
          'This interview is distinct from the appraisal interview. It is about your development prospects and training needs, not a judgement of your work.',
        ],
      },
      {
        type: 'text',
        title: 'What its absence implies',
        paragraphs: [
          'Not offering this interview can constitute an employer failing. In firms of at least fifty employees, a lack of interview over several years can trigger a corrective top-up of your personal training account.',
          'So it is a right to activate, not just a box for the company to tick. Asking for it means taking back control of your path after a family parenthesis.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The employer must offer it on return from maternity or parental leave',
          'Possible before the effective return, on your request',
          'Distinct from the appraisal interview: development and training',
          'Its absence can be an employer failing',
          'In firms of at least 50 employees: possible corrective training-account top-up',
        ],
      },
    ],
  }),

  postPair({
    slug: 'horaires-amenages-jeune-parent-droit',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Horaires aménagés pour jeune parent : ce que dit le droit',
    titleEn: 'Adjusted hours for a young parent: what the law says',
    excerptFr:
      'En dehors de l’heure d’allaitement, il n’existe pas de droit légal général à aménager ses horaires comme jeune parent. Le reste dépend de votre convention collective.',
    excerptEn:
      'Apart from the breastfeeding hour, there is no general legal right to adjust your hours as a young parent. The rest depends on your collective agreement.',
    readingMinutes: 3,
    heroAltFr: 'Horaires aménagés pour jeune parent',
    heroAltEn: 'Adjusted hours for a young parent',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Beaucoup de jeunes parents cherchent à aménager leurs horaires au retour au travail, et se heurtent à une confusion fréquente entre ce qui est un droit légal et ce qui n’en est pas un. La distinction change tout dans la façon de demander.',
          'Un seul aménagement horaire est garanti par la loi générale.',
        ],
      },
      {
        type: 'text',
        title: 'Le seul droit légal : l’heure d’allaitement',
        paragraphs: [
          'La salariée qui allaite dispose d’une heure par jour sur son temps de travail, pendant un an à compter de la naissance, comme le rappelle [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1769). C’est le seul aménagement d’horaire prévu par la loi générale pour cette période.',
          'Il fait l’objet d’un article dédié, car ses conditions méritent d’être détaillées. Retenez ici qu’en dehors de lui, la loi générale n’ouvre pas de droit d’aménagement.',
        ],
      },
      {
        type: 'text',
        title: 'Le reste relève de la convention',
        paragraphs: [
          'Arriver plus tard, partir plus tôt, décaler ses horaires comme jeune parent ne sont pas des droits légaux généraux : ils dépendent de la convention collective, d’un accord d’entreprise ou d’un usage, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F75).',
          'La bonne question n’est donc pas « la loi me le permet-elle », mais « que prévoit ma convention ». C’est là que se trouvent, ou non, ces aménagements.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Seul droit légal général : l’heure d’allaitement (1 an après la naissance)',
          'Détaillée dans un article dédié',
          'Arriver plus tard, partir plus tôt : pas un droit légal général',
          'Ces aménagements relèvent de la convention collective ou d’un accord',
          'La bonne question : que prévoit ma convention',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Many young parents seek to adjust their hours on returning to work, and run into a common confusion between what is a legal right and what is not. The distinction changes everything in how you ask.',
          'Only one schedule adjustment is guaranteed by general law.',
        ],
      },
      {
        type: 'text',
        title: 'The only legal right: the breastfeeding hour',
        paragraphs: [
          'An employee who is breastfeeding has one hour a day within her working time, for a year from the birth, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1769) recalls. It is the only schedule adjustment provided by general law for this period.',
          'It has a dedicated article, because its conditions deserve detail. Remember here that outside it, general law opens no adjustment right.',
        ],
      },
      {
        type: 'text',
        title: 'The rest comes under the agreement',
        paragraphs: [
          'Arriving later, leaving earlier, shifting your hours as a young parent are not general legal rights: they depend on the collective agreement, a company accord or a custom, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F75).',
          'So the right question is not "does the law allow me", but "what does my agreement provide". That is where these arrangements are, or are not, found.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The only general legal right: the breastfeeding hour (1 year from birth)',
          'Detailed in a dedicated article',
          'Arriving later, leaving earlier: not a general legal right',
          'These arrangements come under the collective agreement or an accord',
          'The right question: what does my agreement provide',
        ],
      },
    ],
  }),

  postPair({
    slug: 'formation-cpf-pendant-conge-parental',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Se former avec le CPF pendant le congé parental',
    titleEn: 'Training with your personal account during parental leave',
    excerptFr:
      'Le congé parental suspend le contrat, mais pas la formation. Le compte personnel de formation reste mobilisable, et la VAE aussi. Voici ce qui est possible.',
    excerptEn:
      'Parental leave suspends the contract, but not training. Your personal training account stays usable, and so does experience validation. Here is what is possible.',
    readingMinutes: 3,
    heroAltFr: 'Se former pendant le congé parental',
    heroAltEn: 'Training during parental leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé parental est souvent vu comme une mise entre parenthèses de la vie professionnelle. C’est vrai pour le contrat de travail, suspendu, mais pas pour la formation, qui reste tout à fait accessible.',
          'C’est même une période que certains parents utilisent pour préparer la suite.',
        ],
      },
      {
        type: 'text',
        title: 'Le CPF reste mobilisable',
        paragraphs: [
          'Le congé parental d’éducation suspend le contrat, mais le salarié peut suivre une formation pendant cette période, et le compte personnel de formation reste mobilisable, selon [travail-emploi.gouv.fr](https://travail-emploi.gouv.fr/le-conge-parental-deducation). Le CPF est attaché à la personne, pas à l’emploi.',
          'Une nuance à connaître : une formation suivie hors temps de travail, ce qui est le cas pendant un congé parental à temps plein, via le CPF, n’ouvre pas droit à une rémunération. On se forme, mais sans salaire pour ces heures.',
        ],
      },
      {
        type: 'text',
        title: 'La VAE, un autre levier',
        paragraphs: [
          'La validation des acquis de l’expérience est un droit distinct, accessible avec au moins un an d’expérience en rapport avec la certification visée. Elle peut s’envisager pendant ou après le congé parental.',
          'Le congé parental n’interrompt pas non plus l’acquisition des droits liés au parcours. C’est donc une période qui peut se préparer, plutôt que se subir.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Le congé parental suspend le contrat, pas la formation',
          'Le CPF reste mobilisable (attaché à la personne)',
          'Formation hors temps de travail via le CPF : pas de rémunération',
          'La VAE : un droit distinct, avec au moins 1 an d’expérience',
          'Une période qui peut se préparer',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Parental leave is often seen as a pause in working life. That is true for the employment contract, which is suspended, but not for training, which remains entirely accessible.',
          'It is even a period some parents use to prepare what comes next.',
        ],
      },
      {
        type: 'text',
        title: 'The training account stays usable',
        paragraphs: [
          'Parental leave suspends the contract, but the employee can follow training during it, and the personal training account stays usable, according to [travail-emploi.gouv.fr](https://travail-emploi.gouv.fr/le-conge-parental-deducation). The account is attached to the person, not the job.',
          'One nuance to know: training followed outside working time, which is the case during full-time parental leave, via the account, gives no right to pay. You train, but without salary for those hours.',
        ],
      },
      {
        type: 'text',
        title: 'Experience validation, another lever',
        paragraphs: [
          'The validation of experience is a distinct right, accessible with at least one year\'s experience relevant to the target qualification. It can be considered during or after parental leave.',
          'Parental leave also does not interrupt the accrual of path-related rights. So it is a period that can be prepared, rather than endured.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Parental leave suspends the contract, not training',
          'The training account stays usable (attached to the person)',
          'Training outside working time via the account: no pay',
          'Experience validation: a distinct right, with at least 1 year\'s experience',
          'A period that can be prepared',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO8_FR, en: POSTS_SEO8_EN } = pairsToArrays(pairs);
