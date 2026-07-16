/**
 * Tier 1 articles: the French administrative track.
 *
 * These are the highest-value, least-served queries in the FR market. The government's own
 * content is authoritative but hard to sequence; the competitors skip admin entirely. This
 * is the wedge.
 *
 * Content rule (§7.3): amounts and delays that change are NOT stated. We link to the
 * official source and describe the ACTION and its timing, which are stable. That keeps the
 * corpus correct without an annual rewrite of every number.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'declaration-grossesse-demarches',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Déclaration de grossesse : quoi faire, et quand',
    titleEn: 'Declaring a pregnancy in France: what to do, and when',
    excerptFr:
      'Une seule démarche ouvre presque tous vos droits. Elle se fait avant la fin du 3e mois, et elle prend dix minutes.',
    excerptEn:
      'One step opens almost all of your rights. It happens before the end of the third month, and it takes ten minutes.',
    readingMinutes: 4,
    heroAltFr: 'Déclaration de grossesse en France',
    heroAltEn: 'Declaring a pregnancy in France',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La déclaration de grossesse est la première démarche administrative, et c’est celle qui débloque presque tout le reste : le suivi remboursé, la prime à la naissance, les dates de votre congé. Tant qu’elle n’est pas faite, rien ne se met en route.',
          'Bonne nouvelle : c’est aussi l’une des plus simples. Dans la grande majorité des cas, vous n’avez rien à envoyer vous-même.',
        ],
      },
      {
        type: 'text',
        title: 'Qui la fait, et quand',
        paragraphs: [
          'C’est le professionnel qui confirme la grossesse, médecin ou sage-femme, qui la déclare. Lors de la première consultation, il la transmet directement à votre caisse d’assurance maladie et à la CAF. Si la déclaration est faite sur papier, c’est à vous d’envoyer les volets.',
          'La date limite est la fin du 3e mois. Ce n’est pas une formalité : au-delà, vos remboursements et vos droits peuvent être réduits.',
        ],
      },
      {
        type: 'list',
        title: 'Ce que la déclaration déclenche',
        items: [
          'La prise en charge de vos consultations et examens obligatoires',
          'L’évaluation de vos droits à la prime à la naissance et à la PAJE',
          'Le calcul des dates de votre congé maternité',
          'L’ouverture de votre dossier CAF, si vous n’en aviez pas',
        ],
      },
      {
        type: 'text',
        title: 'Après, il reste deux choses à faire vous-même',
        paragraphs: [
          'Mettez votre dossier CAF à jour : situation, RIB, revenus. C’est là que ça bloque le plus souvent, et personne ne vous le rappelle.',
          'Prévenez votre mutuelle. Elle ne reçoit rien automatiquement, et c’est elle qui couvrira une éventuelle chambre particulière.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Vérifiez les conditions et les montants à jour sur [ameli.fr](https://www.ameli.fr) et [caf.fr](https://www.caf.fr). Ils évoluent, et votre situation personnelle change ce à quoi vous avez droit.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'In France, declaring a pregnancy is the first piece of paperwork, and it unlocks nearly everything else: covered appointments, the birth grant, the dates of your leave. Until it is done, nothing starts moving.',
          'The good news is that it is also one of the simplest. In most cases you do not send anything yourself.',
        ],
      },
      {
        type: 'text',
        title: 'Who does it, and when',
        paragraphs: [
          'The professional who confirms the pregnancy, a doctor or a midwife, files it. At the first appointment they send it straight to your health insurance fund and to the CAF. If it is done on paper, posting the forms is on you.',
          'The deadline is the end of the third month. This is not a formality: after that, your coverage and your entitlements can be reduced.',
        ],
      },
      {
        type: 'list',
        title: 'What the declaration triggers',
        items: [
          'Coverage of your appointments and the mandatory examinations',
          'Assessment of your entitlement to the birth grant and family benefits',
          'The calculation of your maternity leave dates',
          'Opening your CAF file, if you did not have one',
        ],
      },
      {
        type: 'text',
        title: 'Two things are still on you',
        paragraphs: [
          'Update your CAF file: household situation, bank details, income. This is where it stalls most often, and nobody reminds you.',
          'Tell your top-up insurer. They receive nothing automatically, and they are the ones covering a private room if you want one.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Check current conditions and amounts on [ameli.fr](https://www.ameli.fr) and [caf.fr](https://www.caf.fr). They change, and your own situation changes what you are entitled to.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-maternite-paternite-dates',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Congé maternité et congé paternité : poser les dates sans stress',
    titleEn: 'Maternity and paternity leave: setting the dates without stress',
    excerptFr:
      'Les durées sont fixées par la loi. Ce qui se prépare, c’est le moment où vous prévenez, et la façon dont vous découpez.',
    excerptEn:
      'The durations are set by law. What you prepare is when you tell your employer, and how you split the leave.',
    readingMinutes: 5,
    heroAltFr: 'Congé maternité et paternité',
    heroAltEn: 'Maternity and paternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé maternité n’est pas une négociation. Sa durée dépend du nombre d’enfants que vous attendez et de ceux que vous avez déjà. Ce qui vous appartient, c’est le calendrier autour : quand prévenir, comment répartir, et ce que vous voulez vraiment.',
        ],
      },
      {
        type: 'text',
        title: 'Prévenir l’employeur',
        paragraphs: [
          'Il n’existe pas de délai unique pour annoncer une grossesse, et vous n’êtes pas obligée de le faire tôt. En pratique, prévenir quelques mois avant laisse le temps d’organiser votre remplacement, ce qui joue souvent en votre faveur au retour.',
          'Faites-le par écrit, avec la date prévue d’accouchement et les dates de congé. Une lettre recommandée avec accusé de réception vous protège si la date est contestée plus tard.',
        ],
      },
      {
        type: 'text',
        title: 'Le découpage prénatal et postnatal',
        paragraphs: [
          'Le congé se divise en une partie avant l’accouchement et une partie après. Sous conditions, vous pouvez déplacer une partie du prénatal vers le postnatal, avec l’accord du professionnel qui vous suit.',
          'C’est une vraie décision, pas une case à cocher. Travailler plus longtemps avant vous donne plus de temps avec le bébé après, mais les dernières semaines sont fatigantes et personne ne peut prédire comment vous vous sentirez.',
        ],
      },
      {
        type: 'text',
        title: 'Côté co-parent',
        paragraphs: [
          'Le congé de naissance et le congé paternité et d’accueil de l’enfant se demandent à l’employeur, avec un préavis. Une partie doit être prise juste après la naissance, le reste peut souvent être fractionné dans les mois qui suivent.',
          'Le fractionnement est sous-utilisé. Garder quelques jours pour le moment où le premier parent reprend le travail vaut souvent mieux que tout consommer la première semaine, quand la maternité et la famille sont déjà là.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La question n’est pas seulement combien de jours vous avez, mais à quel moment vous en aurez le plus besoin.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Les durées, les conditions et les délais de prévenance sont sur [service-public.fr](https://www.service-public.fr). Vérifiez aussi votre convention collective : beaucoup sont plus généreuses que la loi.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'In France, maternity leave is not a negotiation. Its length depends on how many babies you are expecting and how many children you already have. What is yours to decide is the calendar around it: when to tell people, how to split it, and what you actually want.',
        ],
      },
      {
        type: 'text',
        title: 'Telling your employer',
        paragraphs: [
          'There is no single deadline for announcing a pregnancy, and you are not required to do it early. In practice, a few months of notice gives time to organise cover, which usually works in your favour when you come back.',
          'Do it in writing, with the due date and the leave dates. Recorded delivery protects you if the date is disputed later.',
        ],
      },
      {
        type: 'text',
        title: 'Splitting before and after',
        paragraphs: [
          'The leave is divided into a part before the birth and a part after. Under certain conditions you can move some of the prenatal portion to the postnatal side, with the agreement of the professional following you.',
          'This is a real decision, not a checkbox. Working later gives you more time with the baby afterwards, but the final weeks are tiring and nobody can predict how you will feel.',
        ],
      },
      {
        type: 'text',
        title: 'For the co-parent',
        paragraphs: [
          'Birth leave and paternity leave are requested from the employer with notice. Part must be taken right after the birth; the rest can often be split across the following months.',
          'Splitting is underused. Keeping a few days for when the first parent goes back to work is often worth more than spending it all in week one, when the hospital and the family are already there.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The question is not only how many days you have, but when you will need them most.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Durations, conditions and notice periods are on [service-public.fr](https://www.service-public.fr). Check your collective agreement too: many are more generous than the law.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'choisir-inscrire-maternite',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Choisir sa maternité, et s’y inscrire à temps',
    titleEn: 'Choosing a maternity unit, and registering in time',
    excerptFr:
      'Dans certaines villes, les places partent au premier trimestre. Voilà ce qui compte vraiment dans le choix.',
    excerptEn:
      'In some cities, places go in the first trimester. Here is what actually matters in the choice.',
    readingMinutes: 5,
    heroAltFr: 'Choisir sa maternité',
    heroAltEn: 'Choosing a maternity unit',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’inscription à la maternité est une des rares démarches où le calendrier joue contre vous. Dans les zones tendues, il faut s’y prendre dès la grossesse confirmée, parfois avant même la première échographie.',
        ],
      },
      {
        type: 'text',
        title: 'Les niveaux, en clair',
        paragraphs: [
          'Les maternités sont classées par niveau selon les soins néonatals qu’elles peuvent assurer sur place. Un niveau plus élevé n’est pas une meilleure maternité, c’est une maternité équipée pour des situations plus complexes.',
          'Si votre grossesse est suivie de près, le choix se fera avec l’équipe médicale. Sinon, la proximité et la façon dont l’équipe travaille comptent souvent plus que le niveau affiché.',
        ],
      },
      {
        type: 'list',
        title: 'Les questions qui changent vraiment quelque chose',
        items: [
          'Le temps de trajet réel, aux heures où vous risquez de partir',
          'La possibilité d’un projet de naissance, et l’accueil qu’on lui réserve',
          'La place du co-parent : présence pendant le travail, la nuit, en cas de césarienne',
          'L’accompagnement à l’allaitement, quel que soit votre choix',
          'La durée de séjour habituelle, et ce qui se passe si ça se prolonge',
        ],
      },
      {
        type: 'text',
        title: 'Visiter, et écouter ce qu’on vous répond',
        paragraphs: [
          'Beaucoup de maternités organisent des visites ou des réunions d’information. Allez-y à deux si vous êtes deux. La façon dont on répond à vos questions vous en dira plus que la brochure.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Registering with a maternity unit is one of the few steps where the calendar works against you. In busy areas you need to move as soon as the pregnancy is confirmed, sometimes before the first scan.',
        ],
      },
      {
        type: 'text',
        title: 'Levels, plainly',
        paragraphs: [
          'French maternity units are graded by the neonatal care they can provide on site. A higher level is not a better unit, it is a unit equipped for more complex situations.',
          'If your pregnancy is being followed closely, the choice will be made with your medical team. Otherwise, distance and how the team works usually matter more than the grade.',
        ],
      },
      {
        type: 'list',
        title: 'The questions that actually change something',
        items: [
          'The real travel time, at the hours you might actually leave',
          'Whether a birth plan is welcomed, and how',
          'The co-parent’s place: during labour, overnight, during a caesarean',
          'Feeding support, whatever you choose',
          'The usual length of stay, and what happens if it runs longer',
        ],
      },
      {
        type: 'text',
        title: 'Visit, and listen to the answers',
        paragraphs: [
          'Many units run tours or information evenings. Go together if there are two of you. How your questions are answered will tell you more than the brochure.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'mode-de-garde-quand-commencer',
    categoryKey: 'entourage',
    categoryFr: 'Entourage',
    categoryEn: 'Support',
    titleFr: 'Mode de garde : pourquoi il faut s’y prendre si tôt',
    titleEn: 'Childcare in France: why you have to start so early',
    excerptFr:
      'Chercher une place quand le bébé est né, c’est déjà tard. Le calendrier réel, et les options quand la crèche dit non.',
    excerptEn:
      'Looking for a place once the baby is born is already late. The real calendar, and the options when the nursery says no.',
    readingMinutes: 6,
    heroAltFr: 'Trouver un mode de garde',
    heroAltEn: 'Finding childcare',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est la démarche qui surprend le plus les premiers parents. Dans beaucoup de villes, les préinscriptions en crèche se font pendant la grossesse, souvent dès le 3e ou 4e mois. Attendre la naissance, c’est arriver après la commission d’attribution.',
        ],
      },
      {
        type: 'list',
        title: 'Le calendrier, en gros',
        items: [
          'Dès la grossesse confirmée : repérez le relais petite enfance de votre commune',
          'Vers le 3e ou 4e mois : préinscription en crèche, souvent en ligne',
          'En parallèle : contactez des assistantes maternelles, sans attendre la réponse de la crèche',
          'Après la naissance : confirmez la préinscription, c’est presque toujours obligatoire',
        ],
      },
      {
        type: 'text',
        title: 'Ne misez pas tout sur la crèche',
        paragraphs: [
          'Les places sont attribuées en commission, selon des critères que vous ne maîtrisez pas. Une préinscription n’est pas une place. Menez les deux pistes en même temps, crèche et assistante maternelle, quitte à annuler ensuite.',
          'L’assistante maternelle a un fonctionnement différent : vous devenez employeur, avec un contrat et des obligations. Ce n’est ni mieux ni moins bien, c’est autre chose. Le relais petite enfance est là pour vous l’expliquer, gratuitement.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Une préinscription en crèche n’est pas une place. C’est un ticket pour une loterie dont vous ne fixez pas les règles.',
      },
      {
        type: 'text',
        title: 'Et le coût',
        paragraphs: [
          'Le reste à charge dépend de vos revenus et du mode choisi, et les aides ne se déclenchent pas toutes automatiquement. Faites une simulation avant de vous décider, pas après.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Trouvez votre relais petite enfance et simulez le coût sur [monenfant.fr](https://monenfant.fr) et [caf.fr](https://www.caf.fr).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This is the one that surprises first-time parents most. In many French towns, nursery pre-registration happens during the pregnancy, often from the third or fourth month. Waiting for the birth means arriving after the allocation panel has met.',
        ],
      },
      {
        type: 'list',
        title: 'The calendar, roughly',
        items: [
          'As soon as the pregnancy is confirmed: find your local early-years information point',
          'Around month three or four: pre-register with nurseries, usually online',
          'In parallel: contact childminders, without waiting for the nursery answer',
          'After the birth: confirm the pre-registration, which is almost always required',
        ],
      },
      {
        type: 'text',
        title: 'Do not bet everything on the nursery',
        paragraphs: [
          'Places are allocated by a panel, against criteria you do not control. A pre-registration is not a place. Run both tracks at once, nursery and childminder, and cancel one later.',
          'A childminder works differently: you become an employer, with a contract and obligations. It is not better or worse, it is another thing entirely. Your local information point will explain it, free.',
        ],
      },
      {
        type: 'quote',
        quote:
          'A nursery pre-registration is not a place. It is a ticket to a lottery whose rules you do not set.',
      },
      {
        type: 'text',
        title: 'And the cost',
        paragraphs: [
          'What you actually pay depends on your income and the option you choose, and the support does not all trigger automatically. Run the numbers before you decide, not after.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Find your local information point and estimate costs on [monenfant.fr](https://monenfant.fr) and [caf.fr](https://www.caf.fr).',
        ],
      },
    ],
  }),
];

export const POSTS_ADMIN_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_ADMIN_EN: BlogPost[] = pairs.map((p) => p.en);
