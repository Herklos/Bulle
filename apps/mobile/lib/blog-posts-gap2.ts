/**
 * Gap run, batch 2 — the rights around work and civil status.
 *
 * Same house rules as blog-posts-gap.ts. These are droit du travail and état civil, verified
 * against legifrance and service-public before shipping. Durations and the party that bears
 * an obligation are stated because they are the substance and they are stable; euro amounts
 * and indemnity rates are linked, never printed (§7.3). Where a rule has a live 2024-2026
 * reform, the current state is given with its date.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'protection-licenciement-grossesse',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Licenciement et grossesse : ce que la loi interdit, et pendant combien de temps',
    titleEn: 'Dismissal and pregnancy: what the law forbids, and for how long',
    excerptFr:
      'La protection ne s’arrête pas à l’accouchement. Elle couvre la grossesse, tout le congé maternité, et dix semaines après le retour. Le second parent est protégé lui aussi.',
    excerptEn:
      'The protection does not stop at the birth. It covers the pregnancy, all of maternity leave, and ten weeks after the return. The second parent is protected too.',
    readingMinutes: 5,
    heroAltFr: 'La protection contre le licenciement liée à la grossesse',
    heroAltEn: 'Protection against pregnancy-related dismissal',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La protection contre le licenciement pendant la grossesse existe, elle est solide, et elle est mal connue dans sa durée. Beaucoup pensent qu’elle s’arrête à l’accouchement. Elle va bien au-delà.',
          'La connaître, ce n’est pas se préparer à un conflit. C’est savoir ce qui est du droit et ce qui ne l’est pas, avant d’en avoir besoin.',
        ],
      },
      {
        type: 'text',
        title: 'Pendant la grossesse, puis pendant le congé',
        paragraphs: [
          'La protection commence dès que vous avez informé votre employeur de votre grossesse médicalement constatée, et court jusqu’au début du congé maternité. Pendant cette période, un licenciement n’est possible que dans deux cas très encadrés, détaillés plus bas.',
          'Pendant le congé maternité lui-même, la protection est totale : selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2873), aucun licenciement ne peut prendre effet ni même vous être notifié pendant la suspension du contrat, y compris pour les congés payés pris juste après.',
        ],
      },
      {
        type: 'text',
        title: 'Puis dix semaines après le retour',
        paragraphs: [
          'C’est le point que presque personne ne connaît. La protection se prolonge pendant les dix semaines qui suivent la fin du congé maternité (et des congés payés pris immédiatement après). Le chiffre est dans l’article L1225-4 du Code du travail.',
          'Autrement dit, le retour au travail n’ouvre pas une saison de vulnérabilité. Il ouvre dix semaines encore protégées.',
        ],
      },
      {
        type: 'text',
        title: 'Les seules exceptions',
        paragraphs: [
          'En dehors du congé lui-même, où rien ne peut être notifié, l’employeur ne peut rompre le contrat que s’il justifie d’une faute grave sans lien avec la grossesse, ou de l’impossibilité de maintenir le contrat pour un motif totalement étranger à la grossesse ou à la maternité.',
          'Ce sont des exceptions étroites, et la charge de la preuve pèse sur l’employeur. Un motif qui touche de près ou de loin à la grossesse ne rentre pas dedans.',
        ],
      },
      {
        type: 'text',
        title: 'Le second parent est protégé aussi',
        paragraphs: [
          'On l’ignore presque toujours : le second parent bénéficie, lui aussi, d’une protection pendant les dix semaines qui suivent la naissance de l’enfant. Elle figure à l’article L1225-4-1 du Code du travail, et elle connaît les mêmes exceptions étroites.',
          'La protection de l’arrivée d’un enfant n’est donc pas réservée à celui ou celle qui accouche. Elle s’étend au foyer.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Dès l’information de l’employeur : protection jusqu’au début du congé maternité',
          'Pendant le congé maternité : aucun licenciement ne peut être notifié ni prendre effet',
          'Après le retour : 10 semaines de protection (article L1225-4)',
          'Second parent : 10 semaines après la naissance (article L1225-4-1)',
          'Seules exceptions : faute grave ou impossibilité de maintenir le contrat, sans lien avec la grossesse',
        ],
      },
      {
        type: 'quote',
        quote:
          'La date qui compte n’est pas l’accouchement, c’est la fin du congé plus dix semaines. Beaucoup de parents se croient exposés alors qu’ils sont encore protégés.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Protection against dismissal during pregnancy exists, it is solid, and its length is poorly understood. Many think it stops at the birth. It goes well beyond.',
          'Knowing it is not preparing for a fight. It is knowing what is a right and what is not, before you need it.',
        ],
      },
      {
        type: 'text',
        title: 'During the pregnancy, then during the leave',
        paragraphs: [
          'The protection begins as soon as you have informed your employer of your medically confirmed pregnancy, and runs until maternity leave starts. During this period a dismissal is possible only in two tightly framed cases, set out below.',
          'During maternity leave itself the protection is total: according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2873), no dismissal can take effect or even be notified to you while the contract is suspended, including for paid leave taken right after.',
        ],
      },
      {
        type: 'text',
        title: 'Then ten weeks after the return',
        paragraphs: [
          'This is the point almost nobody knows. The protection extends through the ten weeks following the end of maternity leave (and any paid leave taken immediately after). The figure is in article L1225-4 of the Labour Code.',
          'In other words, returning to work does not open a season of exposure. It opens ten more protected weeks.',
        ],
      },
      {
        type: 'text',
        title: 'The only exceptions',
        paragraphs: [
          'Outside the leave itself, where nothing can be notified, the employer can only end the contract by establishing serious misconduct unrelated to the pregnancy, or the impossibility of maintaining the contract for a reason entirely unconnected to pregnancy or maternity.',
          'These are narrow exceptions, and the burden of proof falls on the employer. A reason that touches the pregnancy even indirectly does not fit inside them.',
        ],
      },
      {
        type: 'text',
        title: 'The second parent is protected too',
        paragraphs: [
          'It is almost always overlooked: the second parent also benefits from protection during the ten weeks following the child\'s birth. It is in article L1225-4-1 of the Labour Code, and it has the same narrow exceptions.',
          'The protection around a child\'s arrival is therefore not reserved for the person giving birth. It extends to the household.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'From informing the employer: protection until maternity leave starts',
          'During maternity leave: no dismissal can be notified or take effect',
          'After the return: 10 weeks of protection (article L1225-4)',
          'Second parent: 10 weeks after the birth (article L1225-4-1)',
          'Only exceptions: serious misconduct or impossibility of maintaining the contract, unrelated to the pregnancy',
        ],
      },
      {
        type: 'quote',
        quote:
          'The date that matters is not the birth, it is the end of the leave plus ten weeks. Many parents believe they are exposed while they are in fact still protected.',
      },
    ],
  }),

  postPair({
    slug: 'conge-naissance-et-paternite-cumul',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé de naissance et congé de paternité : ce sont deux congés, pas un',
    titleEn: 'Birth leave and paternity leave: they are two leaves, not one',
    excerptFr:
      'Les trois jours payés par l’employeur ne sont pas le congé de paternité. Ils s’ajoutent devant. Les confondre, c’est prendre trois jours de moins que son droit.',
    excerptEn:
      'The three employer-paid days are not paternity leave. They come in front of it. Confusing the two means taking three days fewer than your right.',
    readingMinutes: 5,
    heroAltFr: 'Le congé de naissance et le congé de paternité qui se cumulent',
    heroAltEn: 'Birth leave and paternity leave stacking together',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Autour de l’arrivée d’un enfant, le second parent a droit à deux congés distincts qui s’enchaînent, et non à un seul. C’est une source de confusion coûteuse : à les prendre pour un même bloc, on renonce sans le savoir à trois jours.',
          'Les deux existent, ils s’additionnent, et ils ne sont ni payés par le même acteur ni posés de la même façon.',
        ],
      },
      {
        type: 'text',
        title: 'Le congé de naissance : trois jours, payés par l’employeur',
        paragraphs: [
          'C’est un congé pour événement familial, d’une durée de trois jours, à la charge de l’employeur qui vous rémunère normalement. Il se prend autour de la naissance et relève du Code du travail, pas de l’Assurance Maladie. Le cadre est décrit sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2266).',
          'Ces trois jours ne sont pas décomptés de votre congé de paternité. Ils viennent avant.',
        ],
      },
      {
        type: 'text',
        title: 'Le congé de paternité et d’accueil : vingt-cinq jours',
        paragraphs: [
          'Il dure vingt-cinq jours calendaires pour une naissance simple, trente-deux en cas de naissances multiples, et il est indemnisé par l’Assurance Maladie, sous conditions, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/conge-paternite-accueil-enfant).',
          'Il se compose d’une première période de quatre jours qui suit immédiatement les trois jours de naissance, puis d’un solde de vingt et un jours (vingt-huit pour des multiples) que vous pouvez fractionner et prendre dans les six mois suivant la naissance.',
        ],
      },
      {
        type: 'text',
        title: 'Sept jours où l’employeur ne peut pas vous faire travailler',
        paragraphs: [
          'Les trois jours de naissance, puis les quatre premiers jours du congé de paternité, forment une période où l’emploi est interdit : sept jours consécutifs pendant lesquels vous ne pouvez pas être au travail, même volontairement.',
          'Le reste du congé de paternité, lui, est un droit que vous posez, mais que vous pouvez étaler. C’est cette partie-là qui se prépare, en prévenant l’employeur dans les délais.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Congé de naissance : 3 jours, payés par l’employeur, autour de la naissance',
          'Congé de paternité et d’accueil : 25 jours (32 pour des multiples), indemnisés par l’Assurance Maladie',
          'Enchaînement : les 3 jours, puis 4 jours obligatoires, puis le solde de 21 jours',
          'Emploi interdit : les 7 premiers jours (3 + 4)',
          'Le solde se fractionne et se prend dans les 6 mois suivant la naissance',
        ],
      },
      {
        type: 'quote',
        quote:
          'Trois plus vingt-cinq, ce n’est pas vingt-cinq. La confusion la plus fréquente sur ce sujet coûte exactement trois jours avec son enfant.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Around a child\'s arrival, the second parent is entitled to two distinct leaves that follow one another, not to a single one. It is a costly source of confusion: treating them as one block means unknowingly giving up three days.',
          'Both exist, they add together, and they are neither paid by the same party nor booked the same way.',
        ],
      },
      {
        type: 'text',
        title: 'Birth leave: three days, paid by the employer',
        paragraphs: [
          'It is a family-event leave, three days long, borne by the employer who pays you normally. It is taken around the birth and comes under the Labour Code, not the health insurance system. The framework is described on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2266).',
          'These three days are not deducted from your paternity leave. They come before it.',
        ],
      },
      {
        type: 'text',
        title: 'Paternity and welcome leave: twenty-five days',
        paragraphs: [
          'It lasts twenty-five calendar days for a single birth, thirty-two for multiples, and it is paid by the health insurance system, subject to conditions, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/conge-paternite-accueil-enfant).',
          'It is made up of a first four-day period immediately following the three birth-leave days, then a balance of twenty-one days (twenty-eight for multiples) that you can split and take within the six months after the birth.',
        ],
      },
      {
        type: 'text',
        title: 'Seven days when the employer cannot make you work',
        paragraphs: [
          'The three birth-leave days, then the first four days of paternity leave, form a period where employment is forbidden: seven consecutive days during which you cannot be at work, even willingly.',
          'The rest of paternity leave is a right you claim but can spread out. That is the part that gets prepared, by giving your employer notice in time.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Birth leave: 3 days, paid by the employer, around the birth',
          'Paternity and welcome leave: 25 days (32 for multiples), paid by health insurance',
          'Sequence: the 3 days, then 4 mandatory days, then the 21-day balance',
          'Employment forbidden: the first 7 days (3 + 4)',
          'The balance can be split and taken within the 6 months after the birth',
        ],
      },
      {
        type: 'quote',
        quote:
          'Three plus twenty-five is not twenty-five. The most common confusion on this subject costs exactly three days with your child.',
      },
    ],
  }),

  postPair({
    slug: 'allaitement-au-travail-une-heure',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Allaiter en reprenant le travail : l’heure quotidienne prévue par la loi',
    titleEn: 'Breastfeeding after going back to work: the daily hour the law provides',
    excerptFr:
      'Une heure par jour pendant un an, pour allaiter sur le temps de travail. Un droit réel, avec une nuance qui surprend : par principe, cette heure n’est pas payée.',
    excerptEn:
      'One hour a day for a year, to breastfeed during working time. A real right, with a surprising catch: as a rule, that hour is not paid.',
    readingMinutes: 4,
    heroAltFr: 'Le droit à une heure d’allaitement par jour au travail',
    heroAltEn: 'The right to one hour a day to breastfeed at work',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Reprendre le travail en continuant d’allaiter n’est pas laissé au bon vouloir de l’employeur. Le Code du travail prévoit un droit précis, chiffré, que peu de salariées connaissent au moment où il leur serait utile.',
          'Comme souvent, l’essentiel n’est pas le principe mais ses conditions, et l’une d’elles surprend.',
        ],
      },
      {
        type: 'text',
        title: 'Une heure par jour, pendant un an',
        paragraphs: [
          'La salariée qui allaite dispose d’une heure par jour, sur ses heures de travail, pour allaiter son enfant, et ce pendant un an à compter de la naissance. C’est l’article L1225-30 du Code du travail, relayé par [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1769).',
          'Cette heure se répartit en deux fois trente minutes, une le matin, une l’après-midi. Le moment se fixe d’accord avec l’employeur ; à défaut d’accord, au milieu de chaque demi-journée.',
        ],
      },
      {
        type: 'text',
        title: 'La nuance : cette heure n’est pas payée par défaut',
        paragraphs: [
          'C’est le point à connaître avant de compter dessus. Par principe, cette heure d’allaitement n’est pas rémunérée. Une convention collective ou un accord d’entreprise peut prévoir qu’elle le soit, et beaucoup le font, mais ce n’est pas automatique.',
          'Vérifier sa convention collective sur ce point précis vaut mieux que de le découvrir sur la fiche de paie. C’est là, et pas dans la loi générale, que se joue le fait d’être payée ou non.',
        ],
      },
      {
        type: 'text',
        title: 'Le local d’allaitement change le calcul',
        paragraphs: [
          'Si l’employeur met à disposition un local dédié à l’allaitement, dans l’établissement ou à proximité, les deux périodes passent de trente à vingt minutes. La logique est simple : le temps de trajet vers un lieu adapté est intégré.',
          'Dans les entreprises d’une certaine taille, l’employeur peut d’ailleurs être tenu de permettre l’allaitement dans l’établissement. Les modalités relèvent des articles L1225-32 et L1225-33.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Durée : 1 heure par jour sur le temps de travail',
          'Pendant : 1 an à compter de la naissance',
          'Répartition : 2 fois 30 minutes, ramenées à 20 avec un local dédié',
          'Rémunération : non payée par principe, sauf convention ou accord plus favorable',
          'Base : articles L1225-30 à L1225-33 du Code du travail',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le droit à l’heure est national et automatique. Le fait qu’elle soit payée ne l’est pas : il se lit dans votre convention collective, pas dans la loi.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Going back to work while continuing to breastfeed is not left to the employer\'s goodwill. The Labour Code provides a precise, quantified right that few employees know about at the moment it would help them.',
          'As is often the case, what matters is not the principle but its conditions, and one of them is surprising.',
        ],
      },
      {
        type: 'text',
        title: 'One hour a day, for a year',
        paragraphs: [
          'An employee who is breastfeeding has one hour a day, within her working hours, to breastfeed her child, for one year from the birth. It is article L1225-30 of the Labour Code, relayed by [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1769).',
          'That hour is split into two thirty-minute periods, one in the morning, one in the afternoon. The timing is agreed with the employer; failing agreement, it falls in the middle of each half-day.',
        ],
      },
      {
        type: 'text',
        title: 'The catch: that hour is not paid by default',
        paragraphs: [
          'This is the point to know before counting on it. As a rule, this breastfeeding hour is not paid. A collective agreement or a company agreement can provide that it is, and many do, but it is not automatic.',
          'Checking your collective agreement on this exact point beats discovering it on your payslip. That, and not the general law, is where being paid or not is decided.',
        ],
      },
      {
        type: 'text',
        title: 'A dedicated room changes the maths',
        paragraphs: [
          'If the employer provides a room dedicated to breastfeeding, in or near the workplace, the two periods drop from thirty to twenty minutes. The logic is simple: the travel time to a suitable place is folded in.',
          'In companies of a certain size, the employer may in fact be required to allow breastfeeding on the premises. The details come under articles L1225-32 and L1225-33.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Duration: 1 hour a day within working time',
          'For: 1 year from the birth',
          'Split: 2 periods of 30 minutes, reduced to 20 with a dedicated room',
          'Pay: unpaid as a rule, unless a more favourable agreement provides otherwise',
          'Basis: articles L1225-30 to L1225-33 of the Labour Code',
        ],
      },
      {
        type: 'quote',
        quote:
          'The right to the hour is national and automatic. Whether it is paid is not: that is read in your collective agreement, not in the law.',
      },
    ],
  }),

  postPair({
    slug: 'amenagement-poste-travail-enceinte',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Aménager son poste enceinte : ce qui est un droit, et ce qui dépend de la convention',
    titleEn: 'Adapting your job while pregnant: what is a right, and what depends on your agreement',
    excerptFr:
      'Le changement de poste pour raison médicale est un droit. Arriver plus tard le matin, non : cela dépend de votre convention collective. La distinction change tout.',
    excerptEn:
      'A change of post on medical grounds is a right. Arriving later in the morning is not: that depends on your collective agreement. The distinction changes everything.',
    readingMinutes: 5,
    heroAltFr: 'L’aménagement du poste de travail pendant la grossesse',
    heroAltEn: 'Adapting the workplace during pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une salariée enceinte n’est pas censée continuer exactement comme avant si son état demande un aménagement. Mais tout n’a pas la même force : certaines choses sont un droit garanti par la loi, d’autres ne le sont que si votre convention collective les prévoit.',
          'Savoir de quel côté tombe chaque aménagement évite deux erreurs symétriques : réclamer comme un droit ce qui n’en est pas un, et renoncer à un droit en croyant demander une faveur.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui est un droit : le changement d’affectation médical',
        paragraphs: [
          'Si votre état de santé médicalement constaté l’exige, vous pouvez être temporairement changée d’affectation, à votre initiative ou à celle de l’employeur. En cas de désaccord, c’est le médecin du travail qui tranche sur la nécessité médicale. Le cadre est sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2775).',
          'Ce changement n’entraîne aucune baisse de rémunération, ne peut pas durer au-delà de la grossesse, et prend fin dès que votre état permet de revenir au poste d’origine. Après le congé maternité, vous retrouvez le poste que vous occupiez avant.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui est un droit aussi : la nuit, les expositions, les examens',
        paragraphs: [
          'Si vous travaillez de nuit, vous pouvez demander, ou le médecin du travail peut demander, une affectation à un poste de jour pendant la grossesse. Certaines expositions à des risques particuliers sont, elles, interdites ou limitées par le Code du travail.',
          'Et vos absences pour les examens prénataux obligatoires sont un droit, sans perte de rémunération, comme le rappelle [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2330).',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui n’est pas un droit légal : la réduction d’horaire quotidienne',
        paragraphs: [
          'C’est la confusion la plus fréquente. Arriver un peu plus tard ou partir un peu plus tôt chaque jour parce qu’on est enceinte n’est pas un droit prévu par la loi générale. Selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1901), cela dépend de votre convention collective, d’un accord d’entreprise ou d’un usage.',
          'Beaucoup de conventions l’accordent, souvent une demi-heure par jour à partir d’un certain terme. Mais c’est là qu’il faut le chercher, pas dans le Code du travail. La bonne question n’est pas « ai-je le droit » mais « que dit ma convention ».',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Droit légal : changement d’affectation si l’état de santé l’exige, sans perte de salaire',
          'Droit légal : passage à un poste de jour, limitation de certaines expositions',
          'Droit légal : absences pour les examens prénataux obligatoires',
          'Conventionnel : arriver plus tard ou partir plus tôt chaque jour',
          'À faire : lire votre convention collective sur les aménagements horaires',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un droit se pose, un avantage conventionnel se vérifie. Confondre les deux, c’est demander timidement ce qui vous est dû, ou réclamer fermement ce qui ne l’est pas.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pregnant employee is not meant to carry on exactly as before if her condition calls for an adjustment. But not everything carries the same weight: some things are a right guaranteed by law, others only if your collective agreement provides for them.',
          'Knowing which side each adjustment falls on avoids two mirror-image mistakes: claiming as a right something that is not one, and giving up a right while thinking you are asking a favour.',
        ],
      },
      {
        type: 'text',
        title: 'A right: the medical change of post',
        paragraphs: [
          'If your medically confirmed condition requires it, you can be temporarily moved to another post, at your initiative or the employer\'s. In case of disagreement, it is the occupational physician who rules on the medical need. The framework is on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2775).',
          'This move carries no drop in pay, cannot last beyond the pregnancy, and ends as soon as your condition allows a return to the original post. After maternity leave you return to the post you held before.',
        ],
      },
      {
        type: 'text',
        title: 'Also rights: night work, exposures, exams',
        paragraphs: [
          'If you work nights, you can ask, or the occupational physician can ask, to be moved to a day post during the pregnancy. Certain exposures to particular risks are forbidden or limited by the Labour Code.',
          'And your absences for the mandatory prenatal exams are a right, with no loss of pay, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2330) recalls.',
        ],
      },
      {
        type: 'text',
        title: 'Not a statutory right: the daily shorter day',
        paragraphs: [
          'This is the most common confusion. Arriving a little later or leaving a little earlier each day because you are pregnant is not a right under general law. According to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1901), it depends on your collective agreement, a company agreement or an established custom.',
          'Many agreements grant it, often half an hour a day from a certain stage. But that is where to look, not in the Labour Code. The right question is not "am I entitled" but "what does my agreement say".',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Statutory: change of post if your health requires it, no loss of pay',
          'Statutory: move to a day post, limits on certain exposures',
          'Statutory: absences for the mandatory prenatal exams',
          'Contractual: arriving later or leaving earlier each day',
          'To do: read your collective agreement on working-time adjustments',
        ],
      },
      {
        type: 'quote',
        quote:
          'A right is asserted, a contractual benefit is checked. Confusing the two means timidly asking for what you are owed, or firmly demanding what you are not.',
      },
    ],
  }),

  postPair({
    slug: 'reconnaissance-apres-la-naissance',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Reconnaître l’enfant après la naissance : possible à tout moment, mais pas sans conséquence',
    titleEn: 'Recognising the child after the birth: possible at any time, but not without consequence',
    excerptFr:
      'Pour un couple non marié, la filiation paternelle n’est pas automatique. La reconnaissance peut se faire après la naissance, mais passé un an, elle change qui exerce l’autorité parentale.',
    excerptEn:
      'For an unmarried couple, paternal filiation is not automatic. Recognition can happen after the birth, but past one year it changes who holds parental authority.',
    readingMinutes: 5,
    heroAltFr: 'La reconnaissance de l’enfant après la naissance',
    heroAltEn: 'Recognising the child after the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Pour un couple non marié qui n’a pas fait de reconnaissance anticipée avant la naissance, une asymétrie surprend souvent : côté mère, rien à faire ; côté second parent, une démarche est nécessaire.',
          'Elle reste possible après la naissance, à tout moment. Mais un délai précis, un an, change discrètement ce qui est en jeu.',
        ],
      },
      {
        type: 'text',
        title: 'La mère n’a rien à reconnaître',
        paragraphs: [
          'La filiation maternelle est établie automatiquement dès que le nom de la mère figure dans l’acte de naissance, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F887). Aucune reconnaissance n’est nécessaire de sa part.',
          'Pour un couple non marié, les deux liens de filiation sont indépendants. Celui du second parent, lui, doit être établi par une reconnaissance.',
        ],
      },
      {
        type: 'text',
        title: 'Quand et où, si ce n’est pas déjà fait',
        paragraphs: [
          'La reconnaissance peut se faire au moment de la déclaration de naissance, elle figure alors dans l’acte, ou à tout moment ultérieur. Elle se fait dans n’importe quelle mairie, quel que soit le lieu de naissance ou le domicile.',
          'C’est une démarche simple, gratuite, qui prend quelques minutes avec une pièce d’identité. Rien ne presse sur le plan de la validité : elle sera toujours possible. Mais quelque chose se joue quand même sur le calendrier.',
        ],
      },
      {
        type: 'text',
        title: 'Le seuil d’un an, et l’autorité parentale',
        paragraphs: [
          'Voici la conséquence que peu de parents anticipent. Si la filiation est établie à l’égard du second parent plus d’un an après la naissance, alors que celle de l’autre parent l’était déjà, ce dernier reste seul à exercer l’autorité parentale. C’est l’article 372 du Code civil, expliqué sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F942).',
          'Une reconnaissance faite avant les un an de l’enfant donne, elle, l’exercice conjoint de plein droit. Passé ce délai, retrouver l’exercice conjoint suppose une déclaration conjointe des deux parents, ou, à défaut d’accord, une décision du juge aux affaires familiales.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Mère : filiation automatique par l’acte de naissance, aucune démarche',
          'Second parent (couple non marié) : reconnaissance nécessaire',
          'Où : n’importe quelle mairie, à tout moment, gratuitement',
          'Avant 1 an : exercice conjoint de l’autorité parentale de plein droit',
          'Après 1 an : l’autre parent reste seul à l’exercer, sauf déclaration conjointe ou décision du juge',
        ],
      },
      {
        type: 'quote',
        quote:
          'La reconnaissance ne périme pas, mais son effet sur l’autorité parentale, si. Faite dans la première année, elle donne l’exercice à deux sans autre formalité.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'For an unmarried couple who did not make an advance recognition before the birth, an asymmetry often surprises: on the mother\'s side, nothing to do; on the second parent\'s side, a step is needed.',
          'It remains possible after the birth, at any time. But one precise deadline, a year, quietly changes what is at stake.',
        ],
      },
      {
        type: 'text',
        title: 'The mother has nothing to recognise',
        paragraphs: [
          'Maternal filiation is established automatically as soon as the mother\'s name appears on the birth certificate, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F887). No recognition is needed from her.',
          'For an unmarried couple, the two filiation links are independent. The second parent\'s must be established by a recognition.',
        ],
      },
      {
        type: 'text',
        title: 'When and where, if not already done',
        paragraphs: [
          'The recognition can be made at the moment of the birth declaration, in which case it appears on the certificate, or at any later time. It can be done at any town hall, whatever the place of birth or the residence.',
          'It is a simple, free step, taking a few minutes with an ID. Nothing is urgent as to validity: it will always be possible. But something is at play on the calendar all the same.',
        ],
      },
      {
        type: 'text',
        title: 'The one-year threshold, and parental authority',
        paragraphs: [
          'Here is the consequence few parents anticipate. If filiation is established as to the second parent more than a year after the birth, while the other parent\'s was already established, that other parent keeps sole exercise of parental authority. It is article 372 of the Civil Code, explained on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F942).',
          'A recognition made before the child turns one gives joint exercise as of right. Past that deadline, regaining joint exercise requires a joint declaration by both parents, or, failing agreement, a decision of the family court.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Mother: automatic filiation through the birth certificate, no step',
          'Second parent (unmarried couple): recognition required',
          'Where: any town hall, at any time, free of charge',
          'Before 1 year: joint exercise of parental authority as of right',
          'After 1 year: the other parent keeps sole exercise, barring a joint declaration or a court decision',
        ],
      },
      {
        type: 'quote',
        quote:
          'Recognition does not expire, but its effect on parental authority does. Made in the first year, it gives joint exercise with no further formality.',
      },
    ],
  }),

  postPair({
    slug: 'livret-de-famille-a-quoi-il-sert',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Le livret de famille : quand on le reçoit, et pourquoi il faut le tenir à jour',
    titleEn: 'The family record book: when you get it, and why to keep it up to date',
    excerptFr:
      'On le reçoit à la naissance du premier enfant sans l’avoir demandé. Ce qu’on oublie, c’est qu’il faut le faire mettre à jour, et qu’un duplicata perdu est gratuit.',
    excerptEn:
      'You receive it at the first child\'s birth without asking. What people forget is that it must be kept updated, and that a lost copy is replaced for free.',
    readingMinutes: 4,
    heroAltFr: 'Le livret de famille et sa mise à jour',
    heroAltEn: 'The family record book and keeping it updated',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le livret de famille est l’un de ces documents qu’on reçoit sans démarche et qu’on range sans trop savoir à quoi il sert. Il sert pourtant à beaucoup, et il a deux pièges : il doit être tenu à jour, et il faut savoir qu’un duplicata existe.',
          'Rien de compliqué, à condition de savoir ces deux choses avant d’en avoir besoin un lundi de fermeture.',
        ],
      },
      {
        type: 'text',
        title: 'Qui le reçoit, et quand',
        paragraphs: [
          'Il est délivré par l’officier d’état civil soit lors du mariage, soit lors de la déclaration de naissance du premier enfant pour les parents qui ne sont pas mariés. C’est ce que rappelle [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11991).',
          'Vous n’avez donc rien à demander : à la naissance de votre premier enfant, il arrive avec le reste. Il rassemble les extraits d’actes d’état civil de la famille, naissances des parents et des enfants.',
        ],
      },
      {
        type: 'text',
        title: 'Le piège : il faut le faire mettre à jour',
        paragraphs: [
          'Un livret de famille n’est pas figé. À chaque événement postérieur, naissance d’un autre enfant, mariage, adoption, divorce, décès, il doit être mis à jour auprès de l’officier d’état civil, et c’est aux titulaires de le faire faire.',
          'Un livret non mis à jour n’est pas faux, mais il devient incomplet, et c’est précisément le jour où on le sort pour une démarche qu’on s’en aperçoit. Le réflexe utile : le faire compléter à chaque naissance suivante, pas des années après.',
        ],
      },
      {
        type: 'text',
        title: 'Perdu ou abîmé : un duplicata gratuit',
        paragraphs: [
          'C’est la deuxième chose à savoir, et elle rassure. En cas de perte, de vol ou de détérioration, vous pouvez demander un second livret de famille auprès de votre mairie, et cette démarche est gratuite, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11994).',
          'En cas de séparation, un second livret peut aussi être délivré à l’autre parent, pour que chacun dispose du sien. Personne ne reste bloqué faute d’un exemplaire unique.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Reçu : au mariage, ou à la déclaration de naissance du premier enfant',
          'Contenu : les extraits d’actes d’état civil de la famille',
          'À faire : le mettre à jour à chaque événement (naissance, mariage, divorce, décès)',
          'Perte ou vol : duplicata gratuit en mairie',
          'Séparation : un second livret peut être délivré à l’autre parent',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un livret de famille se remplit au fil de la vie, pas d’un coup. Le tenir à jour à chaque naissance évite de courir après ses propres actes des années plus tard.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The family record book is one of those documents you receive with no effort and file away without quite knowing what it is for. It is for a lot, in fact, and it has two traps: it must be kept up to date, and you need to know that a replacement exists.',
          'Nothing complicated, provided you know these two things before needing it on a day the office is closed.',
        ],
      },
      {
        type: 'text',
        title: 'Who gets it, and when',
        paragraphs: [
          'It is issued by the civil registrar either at marriage or at the birth declaration of the first child for parents who are not married. That is what [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11991) recalls.',
          'So you have nothing to request: at your first child\'s birth, it arrives with the rest. It gathers the family\'s civil-status extracts, births of parents and children.',
        ],
      },
      {
        type: 'text',
        title: 'The trap: it must be kept updated',
        paragraphs: [
          'A family record book is not fixed. At each later event, another child\'s birth, marriage, adoption, divorce, death, it must be updated with the civil registrar, and it is up to the holders to have it done.',
          'A book that is not updated is not wrong, but it becomes incomplete, and it is precisely the day you take it out for a formality that you notice. The useful habit: have it completed at each subsequent birth, not years later.',
        ],
      },
      {
        type: 'text',
        title: 'Lost or damaged: a free replacement',
        paragraphs: [
          'This is the second thing to know, and it is reassuring. In case of loss, theft or damage, you can request a second family record book from your town hall, and it is free, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11994).',
          'In case of separation, a second book can also be issued to the other parent, so each has their own. Nobody stays stuck for want of a single copy.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Received: at marriage, or at the first child\'s birth declaration',
          'Contents: the family\'s civil-status extracts',
          'To do: update it at each event (birth, marriage, divorce, death)',
          'Loss or theft: free replacement at the town hall',
          'Separation: a second book can be issued to the other parent',
        ],
      },
      {
        type: 'quote',
        quote:
          'A family record book is filled over the course of a life, not all at once. Keeping it current at each birth spares you chasing your own certificates years later.',
      },
    ],
  }),
];

export const { fr: POSTS_GAP2_FR, en: POSTS_GAP2_EN } = pairsToArrays(pairs);
