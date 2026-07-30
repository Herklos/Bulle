/**
 * Gap run, batch 4 — the follow-up appointments, as a calendar and a coverage map.
 *
 * These carry categoryKey 'sante', so they are attributed to Camille (the sage-femme) by the
 * author mapping. §7.3 is the binding constraint here: every article describes WHEN an
 * appointment happens, WHO can do it and that it is covered. The clinical purpose of any exam
 * is stated in one neutral phrase EXPLICITLY attributed to ameli or the calendrier officiel,
 * never as Bulle's own recommendation. No result is interpreted, no symptom is triaged, no
 * choice is advised. The medical disclaimer stays on every one of them.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'trois-echographies-quand-et-remboursement',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Les trois échographies : à quel moment, et à partir de quand c’est remboursé à 100 %',
    titleEn: 'The three scans: when they happen, and from when they are 100% covered',
    excerptFr:
      'Une par trimestre, à des semaines précises. Et un repère de remboursement que beaucoup ignorent : la prise en charge passe à 100 % à partir du 6e mois.',
    excerptEn:
      'One per trimester, at precise weeks. And a coverage marker many miss: reimbursement rises to 100% from the 6th month.',
    readingMinutes: 4,
    heroAltFr: 'Le calendrier des trois échographies de la grossesse',
    heroAltEn: 'The timing of the three pregnancy scans',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Trois échographies rythment une grossesse suivie sans particularité, une par trimestre. Cet article ne parle pas de ce qu’elles montrent, ce qui relève du professionnel qui vous suit, mais de leur calendrier et de leur remboursement, qui sont, eux, des repères stables et utiles à connaître.',
          'C’est la partie logistique de ces rendez-vous : quand les prévoir, et à partir de quand ils ne vous coûtent plus rien.',
        ],
      },
      {
        type: 'text',
        title: 'Une par trimestre, à des semaines précises',
        paragraphs: [
          'Selon [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel), l’échographie de datation se situe entre 11 et 13 semaines d’aménorrhée révolues, l’échographie morphologique entre la 20e et la 24e semaine, et l’échographie de croissance autour de 32 semaines, au 7e mois.',
          'L’Assurance Maladie décrit leur but en une phrase chacune, que nous reprenons sans y ajouter : dater le début de grossesse pour la première, préciser la croissance et vérifier l’absence d’anomalies pour la deuxième, suivre le développement pour la troisième. Pour tout le reste, c’est votre échographiste qui vous parle.',
        ],
      },
      {
        type: 'text',
        title: 'Le repère de remboursement à connaître',
        paragraphs: [
          'Les deux premières échographies sont prises en charge sur la base habituelle. À partir du premier jour du 6e mois de grossesse, la prise en charge passe à 100 % au titre de l’assurance maternité, comme l’indique [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel).',
          'Concrètement, l’échographie du 3e trimestre tombe après ce seuil et est donc couverte à 100 %. C’est un repère utile pour anticiper, sans qu’aucun montant n’ait besoin d’être avancé ici : il se vérifie sur ameli, où il est tenu à jour.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Datation : entre 11 et 13 SA révolues',
          'Morphologique : entre la 20e et la 24e SA',
          'Croissance : autour de 32 SA, au 7e mois',
          'Remboursement : 100 % à partir du 1er jour du 6e mois de grossesse',
          'Le sens médical de chaque écho : à voir avec le professionnel qui la réalise',
        ],
      },
      {
        type: 'quote',
        quote:
          'Ce que montre une échographie se discute avec celui qui la fait. Ce qu’un article peut vous dire, c’est seulement quand la prévoir, et à partir de quand elle ne vous coûte plus rien.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Three scans pace a pregnancy followed without complication, one per trimester. This article is not about what they show, which is for the professional following you, but about their timing and their coverage, which are stable and useful markers to know.',
          'It is the logistical part of these appointments: when to plan them, and from when they no longer cost you anything.',
        ],
      },
      {
        type: 'text',
        title: 'One per trimester, at precise weeks',
        paragraphs: [
          'According to [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel), the dating scan falls between 11 and 13 completed weeks of amenorrhoea, the morphology scan between the 20th and 24th week, and the growth scan around 32 weeks, in the 7th month.',
          'The health insurance system describes their purpose in one phrase each, which we repeat without adding to it: dating the start of pregnancy for the first, checking growth and the absence of anomalies for the second, following development for the third. For everything else, it is your sonographer who talks to you.',
        ],
      },
      {
        type: 'text',
        title: 'The coverage marker to know',
        paragraphs: [
          'The first two scans are covered on the usual basis. From the first day of the 6th month of pregnancy, coverage rises to 100% under maternity insurance, as [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel) states.',
          'In practice, the 3rd-trimester scan falls after this threshold and is therefore covered at 100%. It is a useful marker to anticipate, with no amount needing to be given here: it is checked on ameli, where it is kept current.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Dating: between 11 and 13 completed weeks',
          'Morphology: between the 20th and 24th week',
          'Growth: around 32 weeks, in the 7th month',
          'Coverage: 100% from the 1st day of the 6th month of pregnancy',
          'The medical meaning of each scan: to see with the professional who performs it',
        ],
      },
      {
        type: 'quote',
        quote:
          'What a scan shows is discussed with the person who performs it. What an article can tell you is only when to plan it, and from when it no longer costs you anything.',
      },
    ],
  }),

  postPair({
    slug: 'sept-consultations-qui-peut-suivre',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Les sept consultations de suivi : qui peut vous suivre, et jusqu’à quand c’est couvert',
    titleEn: 'The seven follow-up consultations: who can follow you, and until when it is covered',
    excerptFr:
      'Une sage-femme peut assurer tout le suivi d’une grossesse normale, pas seulement l’accouchement. Et la prise en charge à 100 % court jusqu’à douze jours après la naissance.',
    excerptEn:
      'A midwife can carry out the whole follow-up of a normal pregnancy, not just the birth. And 100% coverage runs until twelve days after the birth.',
    readingMinutes: 4,
    heroAltFr: 'Les sept consultations de suivi de grossesse',
    heroAltEn: 'The seven pregnancy follow-up consultations',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le suivi de grossesse repose sur sept consultations médicales, et deux idées reçues les entourent : qu’il faudrait forcément un gynécologue, et qu’on ne saurait pas vraiment qui les prend en charge. Les deux sont fausses.',
          'Ici encore, l’article reste sur l’organisation : le rythme, qui peut assurer le suivi, jusqu’à quand c’est couvert. Le contenu de chaque consultation appartient au professionnel qui vous reçoit.',
        ],
      },
      {
        type: 'text',
        title: 'Sept consultations, à quel rythme',
        paragraphs: [
          'Selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F963), la première consultation prénatale a lieu avant la fin du 3e mois, puis une consultation par mois à partir du 4e mois jusqu’à l’accouchement. Soit sept au total pour une grossesse menée à terme.',
          'Ce calendrier est le squelette du suivi. C’est autour de lui que se placent les échographies, les examens biologiques et les séances de préparation.',
        ],
      },
      {
        type: 'text',
        title: 'Une sage-femme peut assurer tout le suivi',
        paragraphs: [
          'C’est le point que beaucoup de parents découvrent tard : ces consultations peuvent être réalisées par un médecin, généraliste ou gynécologue, ou par une sage-femme, en ville, à l’hôpital ou en PMI. Une sage-femme peut assurer l’intégralité du suivi d’une grossesse qui se déroule normalement, et oriente vers un médecin en cas de situation particulière, comme le précise [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel).',
          'Depuis 2022, vous pouvez d’ailleurs déclarer une sage-femme référente pour ce suivi. C’est souvent la voie la plus disponible et la plus continue, dans un contexte où les rendez-vous de gynécologie se prennent des mois à l’avance.',
        ],
      },
      {
        type: 'text',
        title: 'Couvert à 100 %, jusqu’à douze jours après',
        paragraphs: [
          'Les examens obligatoires du suivi, consultations, séances de préparation, examens biologiques, sont pris en charge à 100 %, et cette couverture court jusqu’au 12e jour après l’accouchement, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F963).',
          'Aucun montant n’est nécessaire ici : le repère à retenir, c’est que le suivi ne s’arrête pas à la naissance sur le plan du remboursement, il englobe les premiers jours qui suivent.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          '7 consultations : la 1re avant la fin du 3e mois, puis une par mois dès le 4e',
          'Qui : un médecin ou une sage-femme, en ville, à l’hôpital ou en PMI',
          'Une sage-femme peut assurer tout le suivi d’une grossesse normale',
          'Depuis 2022 : possibilité de déclarer une sage-femme référente',
          'Prise en charge à 100 %, jusqu’au 12e jour après l’accouchement',
        ],
      },
      {
        type: 'quote',
        quote:
          'Sept consultations, et le choix de qui vous suit. Une sage-femme peut porter toute une grossesse normale, ce qui est souvent la porte la plus vite ouverte.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Pregnancy follow-up rests on seven medical consultations, and two misconceptions surround them: that a gynaecologist is required, and that it is unclear who covers them. Both are false.',
          'Here again, the article stays on the organisation: the rhythm, who can carry out the follow-up, until when it is covered. The content of each consultation belongs to the professional who sees you.',
        ],
      },
      {
        type: 'text',
        title: 'Seven consultations, at what rhythm',
        paragraphs: [
          'According to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F963), the first prenatal consultation takes place before the end of the 3rd month, then one consultation a month from the 4th month until the birth. That is seven in total for a pregnancy carried to term.',
          'This calendar is the skeleton of the follow-up. It is around it that the scans, the biological tests and the preparation classes are placed.',
        ],
      },
      {
        type: 'text',
        title: 'A midwife can carry out the whole follow-up',
        paragraphs: [
          'This is the point many parents discover late: these consultations can be carried out by a doctor, GP or gynaecologist, or by a midwife, in town, at hospital or in a PMI centre. A midwife can carry out the entire follow-up of a normally progressing pregnancy, and refers to a doctor in a particular situation, as [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel) specifies.',
          'Since 2022 you can also declare a referring midwife for this follow-up. It is often the most available and most continuous route, in a context where gynaecology appointments are booked months ahead.',
        ],
      },
      {
        type: 'text',
        title: 'Covered at 100%, until twelve days after',
        paragraphs: [
          'The mandatory follow-up exams, consultations, preparation classes, biological tests, are covered at 100%, and this coverage runs until the 12th day after the birth, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F963).',
          'No amount is needed here: the marker to remember is that follow-up does not stop at the birth as far as reimbursement goes, it takes in the first days that follow.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          '7 consultations: the 1st before the end of the 3rd month, then one a month from the 4th',
          'Who: a doctor or a midwife, in town, at hospital or in a PMI centre',
          'A midwife can carry out the whole follow-up of a normal pregnancy',
          'Since 2022: the option to declare a referring midwife',
          'Covered at 100%, until the 12th day after the birth',
        ],
      },
      {
        type: 'quote',
        quote:
          'Seven consultations, and the choice of who follows you. A midwife can carry a whole normal pregnancy, which is often the door that opens soonest.',
      },
    ],
  }),

  postPair({
    slug: 'consultation-anesthesiste-8e-mois',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'La consultation avec l’anesthésiste : un rendez-vous du 8e mois, même sans péridurale',
    titleEn: 'The anaesthetist consultation: an 8th-month appointment, even without an epidural',
    excerptFr:
      'C’est un rendez-vous systématique du parcours, à prévoir au 8e mois. Il a lieu même si vous ne voulez pas de péridurale, parce qu’il anticipe tout recours possible à une anesthésie.',
    excerptEn:
      'It is a standard appointment in the pathway, to plan in the 8th month. It happens even if you do not want an epidural, because it anticipates any possible need for anaesthesia.',
    readingMinutes: 3,
    heroAltFr: 'La consultation pré-anesthésique du 8e mois',
    heroAltEn: 'The pre-anaesthesia consultation in the 8th month',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Parmi les rendez-vous de fin de grossesse, il en est un qu’on oublie facilement parce qu’il ne ressemble pas aux autres : la consultation avec un anesthésiste. Cet article dit seulement quand la prévoir et pourquoi elle existe, pas ce qu’il faut choisir le jour J.',
          'C’est un rendez-vous d’organisation, pas une décision à prendre à l’avance sur la douleur.',
        ],
      },
      {
        type: 'text',
        title: 'Quand, et pourquoi même sans péridurale',
        paragraphs: [
          'Selon [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel), une consultation pré-anesthésique est programmée au 8e mois, en plus de la consultation de suivi. Elle est prévue même si vous souhaitez accoucher sans péridurale.',
          'La raison est simple : c’est un rendez-vous qui anticipe. Un accouchement peut, sans qu’on l’ait prévu, nécessiter une anesthésie, par exemple en cas de césarienne. Cette consultation permet à l’équipe d’avoir les informations nécessaires par avance, quelle que soit votre préférence.',
        ],
      },
      {
        type: 'text',
        title: 'Un rendez-vous à ne pas oublier de caler',
        paragraphs: [
          'Parce qu’il sort du fil habituel des consultations mensuelles, c’est celui qu’on oublie le plus facilement de prendre. Il fait pourtant partie du suivi standard de fin de grossesse et est couvert au titre de l’assurance maternité.',
          'Ce que vous déciderez au sujet de l’analgésie se discutera, le moment venu, avec les professionnels qui vous accompagnent. Le rôle de cette page s’arrête à un rappel utile : prévoyez ce rendez-vous au 8e mois.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Quand : au 8e mois, en plus de la consultation de suivi',
          'Pour qui : tout le monde, même sans projet de péridurale',
          'Pourquoi : anticiper tout recours possible à une anesthésie',
          'Statut : rendez-vous systématique du parcours, couvert par l’assurance maternité',
          'Le choix de l’analgésie : à discuter le jour venu avec l’équipe, pas ici',
        ],
      },
      {
        type: 'quote',
        quote:
          'C’est le rendez-vous qu’on oublie parce qu’il ne ressemble pas aux autres. Il se prévoit au 8e mois, et il a lieu même quand on n’envisage pas de péridurale.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Among the late-pregnancy appointments, one is easily forgotten because it is unlike the others: the consultation with an anaesthetist. This article says only when to plan it and why it exists, not what to choose on the day.',
          'It is an organisational appointment, not a decision to make in advance about pain.',
        ],
      },
      {
        type: 'text',
        title: 'When, and why even without an epidural',
        paragraphs: [
          'According to [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/grossesse/grossesse-en-bonne-sante/grossesse/consultation-suivi-mensuel), a pre-anaesthesia consultation is scheduled in the 8th month, in addition to the follow-up consultation. It is planned even if you wish to give birth without an epidural.',
          'The reason is simple: it is an appointment that anticipates. A birth may, unexpectedly, require anaesthesia, for instance a caesarean. This consultation lets the team have the necessary information in advance, whatever your preference.',
        ],
      },
      {
        type: 'text',
        title: 'An appointment not to forget to book',
        paragraphs: [
          'Because it sits outside the usual thread of monthly consultations, it is the one most easily forgotten. Yet it is part of standard late-pregnancy follow-up and is covered under maternity insurance.',
          'What you decide about pain relief will be discussed, when the time comes, with the professionals supporting you. This page\'s role stops at a useful reminder: plan this appointment in the 8th month.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'When: in the 8th month, in addition to the follow-up consultation',
          'For whom: everyone, even with no epidural planned',
          'Why: to anticipate any possible need for anaesthesia',
          'Status: a standard appointment in the pathway, covered by maternity insurance',
          'The pain-relief choice: to discuss on the day with the team, not here',
        ],
      },
      {
        type: 'quote',
        quote:
          'It is the appointment forgotten because it is unlike the others. It is planned in the 8th month, and it happens even when no epidural is envisaged.',
      },
    ],
  }),

  postPair({
    slug: 'projet-de-naissance-comment-lecrire',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Le projet de naissance : ce que c’est, avec qui on en parle, et pourquoi il reste souple',
    titleEn: 'The birth plan: what it is, who you discuss it with, and why it stays flexible',
    excerptFr:
      'Un document où vous exprimez vos souhaits pour la naissance. Il se discute avec la sage-femme, notamment à l’entretien prénatal, et il s’adapte aux circonstances le jour venu.',
    excerptEn:
      'A document where you express your wishes for the birth. You discuss it with the midwife, notably at the prenatal interview, and it adapts to circumstances on the day.',
    readingMinutes: 4,
    heroAltFr: 'Écrire un projet de naissance',
    heroAltEn: 'Writing a birth plan',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le projet de naissance intimide souvent, comme s’il fallait tout prévoir et tout décider par avance. Ce n’est pas cela. C’est un support d’échange, pas un contrat, et le comprendre ainsi enlève beaucoup de pression.',
          'Cet article décrit ce que c’est et comment on en parle. Il ne dresse pas de liste de « bonnes options » à cocher : ce que vous y mettez vous appartient, et se discute avec l’équipe qui vous suit.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que c’est',
        paragraphs: [
          'Le projet de naissance est l’expression des souhaits des parents sur le déroulement de la grossesse et de la naissance, selon [ameli.fr](https://www.ameli.fr/assure/sante/themes/grossesse/preparation-parentalite). Il peut porter sur l’organisation des soins, les modalités de l’accouchement, ou le suivi des premiers jours, comme un retour précoce à la maison.',
          'Il peut prendre la forme d’un document écrit rédigé par les parents. Écrit ou non, sa fonction est d’ouvrir la conversation avec ceux qui vous accompagneront, pas de la clore.',
        ],
      },
      {
        type: 'text',
        title: 'Avec qui on en parle',
        paragraphs: [
          'Il se discute avec la sage-femme ou le médecin qui vous suit, et l’un des meilleurs moments pour cela est l’entretien prénatal précoce, dès le 4e mois, puis les séances de préparation à la naissance.',
          'C’est justement à quoi servent ces rendez-vous : mettre des mots sur ce qui compte pour vous, entendre ce qui est possible dans votre maternité, et ajuster. Un projet de naissance discuté vaut mieux qu’un projet de naissance parfait sur le papier mais jamais partagé.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi il reste souple',
        paragraphs: [
          'Un projet de naissance n’est pas figé et n’a rien d’un engagement contraignant. Le déroulement réel s’adapte aux circonstances médicales du jour de l’accouchement, et c’est une bonne chose : la souplesse fait partie de sa nature, pas de son échec.',
          'Le voir ainsi évite la déception. Il pose une direction et des préférences ; il laisse la place à ce qui ne se décide pas à l’avance.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ce que c’est : l’expression écrite ou orale de vos souhaits pour la naissance',
          'Ce qu’il couvre : soins, modalités de l’accouchement, premiers jours',
          'Avec qui : la sage-femme ou le médecin, notamment à l’entretien prénatal',
          'Quand : dès le 4e mois, puis pendant la préparation',
          'Sa nature : souple, il s’adapte aux circonstances médicales',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un projet de naissance n’est pas une liste de garanties, c’est le début d’une conversation. Sa souplesse n’est pas un défaut, c’est ce qui le rend utile le jour venu.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The birth plan often intimidates, as if everything had to be foreseen and decided in advance. It is not that. It is a basis for discussion, not a contract, and understanding it that way removes a lot of pressure.',
          'This article describes what it is and how you talk about it. It does not draw up a list of "good options" to tick: what you put in it is yours, and is discussed with the team following you.',
        ],
      },
      {
        type: 'text',
        title: 'What it is',
        paragraphs: [
          'The birth plan is the expression of the parents\' wishes for the course of the pregnancy and the birth, according to [ameli.fr](https://www.ameli.fr/assure/sante/themes/grossesse/preparation-parentalite). It can cover the organisation of care, the arrangements for the birth, or the follow-up of the first days, such as an early return home.',
          'It can take the form of a written document drawn up by the parents. Written or not, its function is to open the conversation with those who will support you, not to close it.',
        ],
      },
      {
        type: 'text',
        title: 'Who you discuss it with',
        paragraphs: [
          'It is discussed with the midwife or doctor following you, and one of the best moments for that is the early prenatal interview, from the 4th month, then the antenatal preparation classes.',
          'That is exactly what these appointments are for: putting words to what matters to you, hearing what is possible in your maternity unit, and adjusting. A birth plan discussed beats a birth plan perfect on paper but never shared.',
        ],
      },
      {
        type: 'text',
        title: 'Why it stays flexible',
        paragraphs: [
          'A birth plan is not fixed and is in no way a binding commitment. The actual course adapts to the medical circumstances of the day, and that is a good thing: flexibility is part of its nature, not its failure.',
          'Seeing it that way avoids disappointment. It sets a direction and preferences; it leaves room for what cannot be decided in advance.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'What it is: the written or spoken expression of your wishes for the birth',
          'What it covers: care, arrangements for the birth, first days',
          'With whom: the midwife or doctor, notably at the prenatal interview',
          'When: from the 4th month, then during preparation',
          'Its nature: flexible, it adapts to medical circumstances',
        ],
      },
      {
        type: 'quote',
        quote:
          'A birth plan is not a list of guarantees, it is the start of a conversation. Its flexibility is not a flaw, it is what makes it useful on the day.',
      },
    ],
  }),

  postPair({
    slug: 'examens-sanguins-grossesse-obligatoires',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Les examens sanguins de la grossesse : lesquels sont programmés, et lesquels reviennent chaque mois',
    titleEn: 'Pregnancy blood tests: which are scheduled, and which come back every month',
    excerptFr:
      'Groupe sanguin, sérologies, dépistages : une série d’analyses jalonne la grossesse. L’une d’elles peut revenir tous les mois. Voici le calendrier, sans interprétation.',
    excerptEn:
      'Blood group, serologies, screenings: a series of tests punctuates pregnancy. One of them can return every month. Here is the schedule, without interpretation.',
    readingMinutes: 4,
    heroAltFr: 'Les examens sanguins obligatoires de la grossesse',
    heroAltEn: 'The mandatory pregnancy blood tests',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une grossesse s’accompagne d’une série d’analyses de sang, prescrites par le médecin ou la sage-femme. Cet article dit lesquelles sont programmées et lesquelles peuvent revenir, pas ce que leurs résultats signifient : cela, c’est votre professionnel qui vous l’explique.',
          'L’objectif est simple : savoir à quoi s’attendre, pour ne pas être surpris par une ordonnance d’analyses ou par une prise de sang qui revient chaque mois.',
        ],
      },
      {
        type: 'text',
        title: 'Les analyses programmées',
        paragraphs: [
          'Selon [ameli.fr](https://www.ameli.fr/assure/sante/themes/infections/recherche-prevention), les examens biologiques prévus au cours de la grossesse comprennent notamment la détermination du groupe sanguin et la recherche d’agglutinines irrégulières, les sérologies de la toxoplasmose, de la rubéole et de la syphilis, la recherche de l’antigène de l’hépatite B, ainsi que la recherche de sucre et d’albumine dans les urines et une numération sanguine.',
          'Le dépistage du VIH est, lui, systématiquement proposé, sans être imposé. Ces sérologies de dépistage sont prises en charge à 100 % au titre de l’assurance maternité.',
        ],
      },
      {
        type: 'text',
        title: 'Celle qui peut revenir tous les mois',
        paragraphs: [
          'C’est le point que beaucoup de futures mères découvrent en cours de route : si la sérologie de la toxoplasmose montre que vous n’êtes pas immunisée, ce dépistage est répété chaque mois jusqu’à l’accouchement, avec un dernier contrôle dans le mois qui suit, comme l’indique [ameli.fr](https://www.ameli.fr/assure/sante/themes/toxoplasmose/bons-reflexes-cas-faut-consulter).',
          'Savoir que cette prise de sang mensuelle est une routine possible, et non un signe d’alerte, évite bien de l’inquiétude. La conduite à tenir, si elle s’impose, appartient au professionnel qui vous suit, pas à un article.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Au début : groupe sanguin, RAI, sérologies toxoplasmose, rubéole, syphilis, antigène hépatite B',
          'Aussi : recherche de sucre et d’albumine dans les urines, numération sanguine',
          'VIH : dépistage systématiquement proposé, non imposé',
          'Toxoplasmose non immunisée : sérologie répétée chaque mois jusqu’à l’accouchement',
          'Prise en charge à 100 % au titre de l’assurance maternité',
        ],
      },
      {
        type: 'quote',
        quote:
          'Une prise de sang qui revient tous les mois n’est pas une mauvaise nouvelle en soi : pour la toxoplasmose non immunisée, c’est simplement la surveillance prévue. Ce qu’elle veut dire, c’est votre soignant qui vous le dit.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pregnancy comes with a series of blood tests, prescribed by the doctor or midwife. This article says which ones are scheduled and which can return, not what their results mean: that, your professional explains to you.',
          'The aim is simple: knowing what to expect, so as not to be surprised by a test prescription or by a blood test that comes back each month.',
        ],
      },
      {
        type: 'text',
        title: 'The scheduled tests',
        paragraphs: [
          'According to [ameli.fr](https://www.ameli.fr/assure/sante/themes/infections/recherche-prevention), the biological tests planned during pregnancy include in particular the blood group and the search for irregular agglutinins, the serologies for toxoplasmosis, rubella and syphilis, the hepatitis B antigen test, as well as the search for sugar and albumin in the urine and a blood count.',
          'HIV screening is systematically offered, without being imposed. These screening serologies are covered at 100% under maternity insurance.',
        ],
      },
      {
        type: 'text',
        title: 'The one that can return every month',
        paragraphs: [
          'This is the point many mothers-to-be discover along the way: if the toxoplasmosis serology shows you are not immune, this screening is repeated every month until the birth, with a final check in the following month, as [ameli.fr](https://www.ameli.fr/assure/sante/themes/toxoplasmose/bons-reflexes-cas-faut-consulter) states.',
          'Knowing that this monthly blood test is a possible routine, and not a warning sign, spares a lot of worry. What to do about it, if needed, belongs to the professional following you, not to an article.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'At the start: blood group, agglutinins, toxoplasmosis, rubella, syphilis serologies, hepatitis B antigen',
          'Also: search for sugar and albumin in the urine, blood count',
          'HIV: screening systematically offered, not imposed',
          'Toxoplasmosis not immune: serology repeated every month until the birth',
          'Covered at 100% under maternity insurance',
        ],
      },
      {
        type: 'quote',
        quote:
          'A blood test that returns every month is not bad news in itself: for non-immune toxoplasmosis, it is simply the planned monitoring. What it means, your carer tells you.',
      },
    ],
  }),

  postPair({
    slug: 'calendrier-vaccins-rendez-vous-bebe',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Les rendez-vous et vaccinations de bébé la première année : le calendrier à connaître',
    titleEn: 'Baby’s appointments and vaccinations in the first year: the calendar to know',
    excerptFr:
      'Des examens obligatoires jalonnent la première année, et le nombre de vaccinations obligatoires a changé. Depuis 2025, ce sont douze, pas onze. Voici le calendrier des rendez-vous à prendre.',
    excerptEn:
      'Mandatory exams punctuate the first year, and the number of mandatory vaccinations has changed. Since 2025 it is twelve, not eleven. Here is the calendar of appointments to book.',
    readingMinutes: 4,
    heroAltFr: 'Le calendrier des rendez-vous et vaccins de bébé la première année',
    heroAltEn: 'The calendar of baby’s appointments and vaccines in the first year',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La première année de bébé est jalonnée de rendez-vous de suivi et de vaccinations, à des âges précis. Cet article en donne le calendrier, pour vous aider à prendre les rendez-vous au bon moment. Il ne se prononce pas sur les vaccins eux-mêmes : cela relève du calendrier officiel et du professionnel qui suit votre enfant.',
          'Le connaître d’avance évite deux écueils : découvrir un rendez-vous en retard, et croire que le nombre de vaccinations obligatoires est resté celui dont parlaient les aînés.',
        ],
      },
      {
        type: 'text',
        title: 'Les examens obligatoires du suivi',
        paragraphs: [
          'De la naissance à seize ans, l’enfant bénéficie d’une série d’examens médicaux obligatoires, particulièrement resserrés la première année, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F967). Trois d’entre eux donnent lieu à un certificat de santé : dans les huit jours suivant la naissance, au 9e mois et au 24e mois.',
          'Depuis le 1er janvier 2025, le calendrier de ces examens a été ajusté. Ils sont pris en charge à 100 %, quel que soit le médecin qui les réalise. Le détail âge par âge figure dans le carnet de santé, qui reste la référence pratique à garder à jour.',
        ],
      },
      {
        type: 'text',
        title: 'Onze, puis douze : ce qui a changé en 2025',
        paragraphs: [
          'Pour les enfants nés depuis 2018, onze vaccinations étaient obligatoires. Depuis le 1er janvier 2025, ce nombre est passé à douze : le méningocoque B est devenu obligatoire, et le méningocoque C a laissé place au méningocoque ACWY, comme l’indique [sante.gouv.fr](https://sante.gouv.fr/soins-et-maladies/maladies/maladies-de-l-enfant/article/nouvelles-obligations-vaccinales-meningocoques-b-et-acwy).',
          'C’est un point à jour important : parler de « onze vaccins » sans préciser l’année de naissance est désormais inexact. Pour un enfant qui naît aujourd’hui, la référence est douze.',
        ],
      },
      {
        type: 'text',
        title: 'Le calendrier de la première année',
        paragraphs: [
          'Selon le calendrier vaccinal officiel relayé par [vaccination-info-service.fr](https://vaccination-info-service.fr/La-vaccination-au-cours-de-la-vie/Nourrissons-et-enfants-de-la-naissance-a-10-ans), les principales échéances de la première année se situent à 2 mois, 4 mois et 11 mois pour plusieurs vaccins, à 3 et 5 mois pour le méningocoque B, à 6 mois pour le méningocoque ACWY, et autour de 12 mois pour d’autres.',
          'Nous n’entrons pas dans le détail vaccin par vaccin : le calendrier officiel et votre médecin ou votre PMI sont la source à suivre. Ce que cette page vous donne, c’est la trame des rendez-vous à prévoir, pour ne pas les découvrir en retard.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Certificats de santé : dans les 8 jours, au 9e mois, au 24e mois',
          'Examens obligatoires : resserrés la première année, pris en charge à 100 %',
          'Vaccinations obligatoires : 12 pour les enfants nés depuis 2025 (11 pour 2018-2024)',
          'Grandes échéances : 2, 4 et 11 mois, plus 3, 5, 6 et 12 mois selon les vaccins',
          'La référence : le calendrier vaccinal officiel et le carnet de santé',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le nombre a changé sans que beaucoup le sachent : douze vaccinations obligatoires pour un enfant né aujourd’hui, pas onze. Le calendrier officiel et votre médecin restent la seule référence.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Baby\'s first year is punctuated by follow-up appointments and vaccinations, at precise ages. This article gives the calendar, to help you book the appointments at the right time. It does not pronounce on the vaccines themselves: that belongs to the official schedule and to the professional following your child.',
          'Knowing it in advance avoids two pitfalls: discovering an appointment late, and believing the number of mandatory vaccinations is still the one the older generation spoke of.',
        ],
      },
      {
        type: 'text',
        title: 'The mandatory follow-up exams',
        paragraphs: [
          'From birth to sixteen, a child has a series of mandatory medical exams, particularly close together in the first year, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F967). Three of them give rise to a health certificate: within eight days of the birth, at the 9th month and at the 24th month.',
          'Since 1 January 2025 the calendar of these exams has been adjusted. They are covered at 100%, whichever doctor performs them. The age-by-age detail is in the health record book, which remains the practical reference to keep up to date.',
        ],
      },
      {
        type: 'text',
        title: 'Eleven, then twelve: what changed in 2025',
        paragraphs: [
          'For children born since 2018, eleven vaccinations were mandatory. Since 1 January 2025 that number has risen to twelve: meningococcus B became mandatory, and meningococcus C gave way to meningococcus ACWY, as [sante.gouv.fr](https://sante.gouv.fr/soins-et-maladies/maladies/maladies-de-l-enfant/article/nouvelles-obligations-vaccinales-meningocoques-b-et-acwy) states.',
          'This is an important up-to-date point: speaking of "eleven vaccines" without specifying the year of birth is now inaccurate. For a child born today, the reference is twelve.',
        ],
      },
      {
        type: 'text',
        title: 'The first-year calendar',
        paragraphs: [
          'According to the official vaccination schedule relayed by [vaccination-info-service.fr](https://vaccination-info-service.fr/La-vaccination-au-cours-de-la-vie/Nourrissons-et-enfants-de-la-naissance-a-10-ans), the main first-year milestones fall at 2 months, 4 months and 11 months for several vaccines, at 3 and 5 months for meningococcus B, at 6 months for meningococcus ACWY, and around 12 months for others.',
          'We do not go into the vaccine-by-vaccine detail: the official schedule and your doctor or PMI centre are the source to follow. What this page gives you is the outline of appointments to plan, so as not to discover them late.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Health certificates: within 8 days, at the 9th month, at the 24th month',
          'Mandatory exams: close together in the first year, covered at 100%',
          'Mandatory vaccinations: 12 for children born since 2025 (11 for 2018-2024)',
          'Main milestones: 2, 4 and 11 months, plus 3, 5, 6 and 12 months depending on the vaccine',
          'The reference: the official vaccination schedule and the health record book',
        ],
      },
      {
        type: 'quote',
        quote:
          'The number changed without many knowing: twelve mandatory vaccinations for a child born today, not eleven. The official schedule and your doctor remain the only reference.',
      },
    ],
  }),
];

export const { fr: POSTS_GAP4_FR, en: POSTS_GAP4_EN } = pairsToArrays(pairs);
