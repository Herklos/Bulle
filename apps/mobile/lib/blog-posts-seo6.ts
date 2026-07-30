/**
 * SEO batch 6 — préparation et protéger la famille.
 *
 * Same house rules. Two non-medical preparation pieces (pré-admission, faire-part) drop the
 * disclaimer as across blog-posts-prep.ts; the rest keep it. Verified against service-public
 * and ameli. Legal effects are stated carefully and attributed; the assurance-habitation and
 * tuteur pieces avoid overclaiming (a birth rarely triggers an insurance declaration; a named
 * guardian is a strong wish, not an absolute binding order). No euro amounts.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'pre-admission-maternite-dossier-administratif',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Preparation',
    disclaimer: false,
    titleFr: 'Pré-admission à la maternité : le dossier administratif à préparer',
    titleEn: 'Maternity pre-admission: the administrative file to prepare',
    excerptFr:
      'La pré-admission règle la paperasse à l’avance, souvent vers le 8e mois, pour que le jour J ne soit pas un jour de guichet. Voici ce qu’elle contient.',
    excerptEn:
      'Pre-admission handles the paperwork in advance, often around the 8th month, so the big day is not a day of forms. Here is what it contains.',
    readingMinutes: 3,
    heroAltFr: 'La pré-admission à la maternité',
    heroAltEn: 'Maternity pre-admission',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La pré-admission est l’une de ces démarches discrètes qui rendent le jour de l’accouchement plus simple. Elle consiste à constituer à l’avance le dossier administratif de la maternité, pour ne pas avoir à le faire au moment où l’on a bien autre chose en tête.',
          'Elle se prépare généralement vers le 8e mois, une fois la maternité choisie et l’inscription faite.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que contient le dossier',
        paragraphs: [
          'La pré-admission rassemble vos pièces essentielles : pièce d’identité, carte Vitale, carte de mutuelle, et le dossier de suivi de grossesse. La liste exacte est fixée par chaque établissement, et il vaut mieux la demander directement à votre maternité.',
          'C’est aussi le moment d’indiquer vos choix pratiques, comme une éventuelle chambre particulière, qui relève de votre mutuelle. Régler ces points à froid évite les décisions dans l’urgence.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi la faire à l’avance',
        paragraphs: [
          'Le jour de l’accouchement n’est pas un jour de formalités. Une pré-admission faite évite d’avoir à remplir des papiers en salle d’attente, et fluidifie l’arrivée. À noter : les soins liés à la grossesse sont pris en charge à 100 % avec tiers payant, du premier jour du 6e mois jusqu’au 12e jour après l’accouchement, selon [ameli.fr](https://www.ameli.fr).',
          'Préparer ce dossier, c’est retirer une source de stress d’une journée qui n’en manquera pas.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Quand : généralement vers le 8e mois',
          'Contenu : pièce d’identité, carte Vitale, mutuelle, dossier de suivi',
          'Liste exacte fixée par la maternité : la demander',
          'Chambre particulière : à voir avec la mutuelle',
          'But : ne pas remplir de papiers le jour de l’accouchement',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Pre-admission is one of those quiet steps that make the day of the birth simpler. It means putting together the maternity unit\'s administrative file in advance, so you do not have to do it when you have quite other things on your mind.',
          'It is usually prepared around the 8th month, once the unit is chosen and registration done.',
        ],
      },
      {
        type: 'text',
        title: 'What the file contains',
        paragraphs: [
          'Pre-admission gathers your essential documents: ID, health card, top-up insurance card, and the pregnancy follow-up file. The exact list is set by each facility, and it is best to ask your maternity unit directly.',
          'It is also the moment to state your practical choices, such as a possible private room, which comes under your top-up insurer. Settling these points calmly avoids rushed decisions.',
        ],
      },
      {
        type: 'text',
        title: 'Why do it in advance',
        paragraphs: [
          'The day of the birth is not a day for formalities. A completed pre-admission avoids filling in papers in a waiting room, and smooths the arrival. Note: pregnancy-related care is covered at 100% with direct billing, from the first day of the 6th month until the 12th day after the birth, according to [ameli.fr](https://www.ameli.fr).',
          'Preparing this file removes one source of stress from a day that will not lack them.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'When: usually around the 8th month',
          'Contents: ID, health card, top-up insurance, follow-up file',
          'Exact list set by the unit: ask for it',
          'Private room: to see with the top-up insurer',
          'Purpose: not to fill in papers on the day of the birth',
        ],
      },
    ],
  }),

  postPair({
    slug: 'faire-part-naissance-quand-quoi-mettre',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Preparation',
    disclaimer: false,
    titleFr: 'Faire-part de naissance : quand l’envoyer et quoi mettre dessus',
    titleEn: 'Birth announcement: when to send it and what to put on it',
    excerptFr:
      'Le faire-part annonce, il ne déclare pas. C’est un geste personnel, sans valeur légale, à ne pas confondre avec la déclaration de naissance en mairie, elle bien encadrée.',
    excerptEn:
      'The announcement announces, it does not register. It is a personal gesture with no legal value, not to be confused with the town-hall birth declaration, which is strictly framed.',
    readingMinutes: 3,
    heroAltFr: 'Le faire-part de naissance',
    heroAltEn: 'The birth announcement',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le faire-part de naissance est un plaisir, pas une obligation. Il partage la bonne nouvelle avec les proches, à son rythme. Une seule chose mérite d’être claire : il ne remplace aucune démarche officielle.',
          'C’est un geste personnel, chaleureux, et entièrement libre dans sa forme comme dans son moment.',
        ],
      },
      {
        type: 'text',
        title: 'Quand et quoi mettre',
        paragraphs: [
          'La plupart des familles l’envoient dans les semaines qui suivent la naissance, sans règle stricte. Le contenu est libre : le prénom, la date de naissance, parfois le poids et la taille, les noms des parents, un mot doux. Rien n’est imposé.',
          'C’est l’un des rares éléments de cette période où l’on peut se laisser aller au plaisir sans consulter aucune fiche officielle.',
        ],
      },
      {
        type: 'text',
        title: 'À ne pas confondre avec la déclaration',
        paragraphs: [
          'Le faire-part n’a aucune valeur légale. Il ne déclare pas la naissance à l’état civil. Cette déclaration-là, obligatoire, se fait à la mairie dans les cinq jours qui suivent la naissance, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961).',
          'Autrement dit, envoyer un joli faire-part ne dispense pas de la démarche officielle, et inversement. Ce sont deux choses séparées, l’une pour le cœur, l’autre pour l’administration.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Quand : dans les semaines suivant la naissance, sans règle stricte',
          'Contenu libre : prénom, date, parfois poids et taille, noms des parents',
          'Aucune valeur légale',
          'Ne remplace pas la déclaration de naissance en mairie (dans les 5 jours)',
          'Un geste personnel, entièrement libre',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The birth announcement is a pleasure, not an obligation. It shares the good news with loved ones, at your own pace. Only one thing is worth being clear about: it replaces no official step.',
          'It is a personal, warm gesture, entirely free in its form and its timing.',
        ],
      },
      {
        type: 'text',
        title: 'When and what to put',
        paragraphs: [
          'Most families send it in the weeks after the birth, with no strict rule. The content is free: the first name, the date of birth, sometimes weight and length, the parents\' names, a fond word. Nothing is imposed.',
          'It is one of the rare parts of this period where you can enjoy yourself without consulting any official page.',
        ],
      },
      {
        type: 'text',
        title: 'Not to be confused with the declaration',
        paragraphs: [
          'The announcement has no legal value. It does not register the birth with the civil authorities. That declaration, which is mandatory, is made at the town hall within the five days following the birth, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961).',
          'In other words, sending a lovely announcement does not replace the official step, and vice versa. They are two separate things, one for the heart, the other for the administration.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'When: in the weeks after the birth, no strict rule',
          'Free content: first name, date, sometimes weight and length, parents\' names',
          'No legal value',
          'Does not replace the town-hall birth declaration (within 5 days)',
          'A personal gesture, entirely free',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prevenir-mutuelle-naissance-documents',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Prévenir la mutuelle de la naissance : délai et documents',
    titleEn: 'Telling your top-up insurer about the birth: timing and documents',
    excerptFr:
      'La mutuelle n’est pas prévenue automatiquement de la naissance. C’est à vous de la déclarer, pour que le bébé soit couvert et que la part complémentaire suive.',
    excerptEn:
      'Your top-up insurer is not told about the birth automatically. It is up to you to declare it, so the baby is covered and the complementary share follows.',
    readingMinutes: 3,
    heroAltFr: 'Prévenir la mutuelle de la naissance',
    heroAltEn: 'Telling the top-up insurer about the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Parmi les démarches post-naissance, prévenir sa mutuelle est l’une des plus faciles à oublier, parce qu’on suppose qu’elle est informée en même temps que l’Assurance Maladie. Ce n’est pas le cas.',
          'La complémentaire santé n’est pas prévenue automatiquement. Tant que vous ne l’avez pas fait, le bébé n’est pas rattaché à votre contrat.',
        ],
      },
      {
        type: 'text',
        title: 'Une déclaration à faire soi-même, sans tarder',
        paragraphs: [
          'C’est à vous de déclarer la naissance à votre mutuelle, pour que l’enfant bénéficie de la part complémentaire des remboursements. Mieux vaut le faire rapidement, souvent dans le mois, pour éviter toute rupture de couverture.',
          'C’est un pendant naturel du rattachement à l’Assurance Maladie, décrit sur [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/rattachement-de-l-enfant-sur-la-carte-vitale-des-parents), mais côté mutuelle, la démarche est distincte.',
        ],
      },
      {
        type: 'text',
        title: 'Les documents et la chambre particulière',
        paragraphs: [
          'La mutuelle demande en général un extrait d’acte de naissance ou une copie du livret de famille, et parfois l’attestation de rattachement de l’enfant à l’Assurance Maladie. La liste exacte figure dans votre contrat.',
          'Un point à vérifier au passage : la chambre particulière à la maternité n’est prise en charge que si votre contrat la prévoit. C’est le bon moment pour le savoir, avant le séjour.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'La mutuelle n’est pas prévenue automatiquement',
          'À déclarer soi-même, souvent dans le mois',
          'Documents : extrait d’acte de naissance ou livret, parfois attestation de rattachement',
          'La liste exacte dépend du contrat',
          'Chambre particulière : prise en charge seulement si le contrat le prévoit',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Among the post-birth steps, telling your top-up insurer is one of the easiest to forget, because people assume it is informed at the same time as the health insurance system. It is not.',
          'The complementary insurer is not told automatically. Until you do it, the baby is not attached to your policy.',
        ],
      },
      {
        type: 'text',
        title: 'A declaration to make yourself, without delay',
        paragraphs: [
          'It is up to you to declare the birth to your top-up insurer, so the child gets the complementary share of reimbursements. It is better to do it quickly, often within the month, to avoid any gap in cover.',
          'It is a natural counterpart to the attachment to the health insurance system, described on [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/rattachement-de-l-enfant-sur-la-carte-vitale-des-parents), but on the top-up side, the step is separate.',
        ],
      },
      {
        type: 'text',
        title: 'The documents and the private room',
        paragraphs: [
          'The insurer generally asks for an extract of the birth certificate or a copy of the family record book, and sometimes the child\'s proof of attachment to the health insurance system. The exact list is in your contract.',
          'One thing to check along the way: a private room at the maternity unit is only covered if your contract provides for it. This is the right moment to find out, before the stay.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The top-up insurer is not told automatically',
          'To declare yourself, often within the month',
          'Documents: birth-certificate extract or record book, sometimes proof of attachment',
          'The exact list depends on the contract',
          'Private room: covered only if the contract provides for it',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prevenir-employeur-grossesse-lettre-recommandee',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Annoncer sa grossesse à l’employeur : quand, et comment le prouver',
    titleEn: 'Telling your employer you are pregnant: when, and how to prove it',
    excerptFr:
      'Aucune loi ne fixe le moment d’annoncer sa grossesse. Mais c’est l’annonce qui déclenche vos protections. La faire par écrit daté vous met à l’abri.',
    excerptEn:
      'No law sets when to announce a pregnancy. But it is the announcement that triggers your protections. Doing it in dated writing keeps you safe.',
    readingMinutes: 3,
    heroAltFr: 'Annoncer sa grossesse à l’employeur',
    heroAltEn: 'Telling your employer you are pregnant',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Quand annoncer sa grossesse à son employeur est une question qui revient souvent, entre l’envie d’attendre et la crainte de trop tarder. La réponse juridique est simple : vous choisissez le moment.',
          'Mais il y a une vraie logique à ne pas trop repousser, et elle tient à vos droits.',
        ],
      },
      {
        type: 'text',
        title: 'Aucune obligation de date, mais une bascule',
        paragraphs: [
          'La loi n’impose aucune date pour informer l’employeur, et un certificat médical justifie l’état de grossesse le moment venu, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1144). Vous êtes libre de choisir.',
          'Mais l’annonce n’est pas neutre : c’est elle qui déclenche vos protections. La protection contre le licenciement liée à la grossesse et le droit aux absences pour les examens supposent que l’employeur ait été informé.',
        ],
      },
      {
        type: 'text',
        title: 'Le faire par écrit, pour la preuve',
        paragraphs: [
          'La forme de l’annonce n’est pas imposée par la loi. En pratique, une lettre recommandée avec accusé de réception est recommandée : elle donne une date certaine à votre information, ce qui protège en cas de désaccord ultérieur.',
          'Une fois informé, l’employeur ne peut plus ignorer votre état, et vos droits, absences pour examens et protection, sont pleinement activés. C’est ce qui fait de l’annonce écrite un réflexe utile.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Aucune date légale imposée : vous choisissez le moment',
          'L’annonce déclenche vos protections (licenciement, absences examens)',
          'Un certificat médical justifie l’état de grossesse',
          'Forme libre, mais lettre recommandée avec AR conseillée',
          'Le recommandé donne une date certaine à votre information',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When to tell your employer you are pregnant is a question that comes up often, between the wish to wait and the fear of leaving it too late. The legal answer is simple: you choose the moment.',
          'But there is real logic to not putting it off too long, and it comes down to your rights.',
        ],
      },
      {
        type: 'text',
        title: 'No date obligation, but a switch',
        paragraphs: [
          'The law imposes no date for informing the employer, and a medical certificate justifies the pregnancy when the time comes, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1144). You are free to choose.',
          'But the announcement is not neutral: it is what triggers your protections. Protection against pregnancy-related dismissal and the right to exam absences require that the employer has been informed.',
        ],
      },
      {
        type: 'text',
        title: 'Do it in writing, for the proof',
        paragraphs: [
          'The form of the announcement is not imposed by law. In practice, a registered letter with acknowledgement of receipt is advisable: it gives a certain date to your notice, which protects you in case of later disagreement.',
          'Once informed, the employer can no longer ignore your condition, and your rights, exam absences and protection, are fully activated. That is what makes a written announcement a useful reflex.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'No legal date imposed: you choose the moment',
          'The announcement triggers your protections (dismissal, exam absences)',
          'A medical certificate justifies the pregnancy',
          'Free form, but a registered letter with acknowledgement is advised',
          'The registered letter gives a certain date to your notice',
        ],
      },
    ],
  }),

  postPair({
    slug: 'garde-aine-pendant-accouchement-organiser',
    categoryKey: 'entourage',
    categoryFr: 'L’entourage',
    categoryEn: 'Family and friends',
    titleFr: 'Faire garder l’aîné pendant l’accouchement : s’organiser à l’avance',
    titleEn: 'Having your older child looked after during the birth: organising ahead',
    excerptFr:
      'On ne choisit ni le jour ni l’heure. Pour l’aîné, la solution n’est pas un plan, c’est deux : une personne de confiance, et une solution de secours prête.',
    excerptEn:
      'You choose neither the day nor the hour. For the older child, the solution is not one plan but two: a trusted person, and a backup ready.',
    readingMinutes: 3,
    heroAltFr: 'Faire garder l’aîné pendant l’accouchement',
    heroAltEn: 'Having the older child looked after during the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Quand on attend un deuxième enfant, une question très concrète se pose : qui gardera l’aîné le jour de l’accouchement. Sa difficulté tient à une seule chose, l’imprévisibilité. On ne connaît ni le jour, ni l’heure, ni la durée.',
          'C’est précisément pour cela qu’une seule solution ne suffit pas.',
        ],
      },
      {
        type: 'text',
        title: 'Une personne, et une solution de secours',
        paragraphs: [
          'La bonne organisation repose sur deux niveaux : une personne de confiance désignée à l’avance, prévenue et disponible, et une solution de secours si cette personne ne peut finalement pas. Un accouchement qui démarre à trois heures du matin ne prévient pas.',
          'Préparez aussi un petit sac pour l’aîné, avec l’essentiel pour une nuit ailleurs, prêt en avance. Cela évite de courir dans la maison au pire moment.',
        ],
      },
      {
        type: 'text',
        title: 'Des aides existent, à chercher localement',
        paragraphs: [
          'Certaines CAF proposent une aide ponctuelle à la garde d’enfant, y compris en urgence, via des structures agréées. L’offre et les conditions varient d’un département à l’autre : renseignez-vous auprès de votre CAF sur [caf.fr](https://www.caf.fr).',
          'Ce n’est pas un dispositif national uniforme, mais il peut dépanner. À explorer en amont, tranquillement, plutôt que de le découvrir le jour venu.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Prévoir une personne de confiance, prévenue et disponible',
          'Prévoir une solution de secours si elle ne peut pas',
          'Préparer un petit sac pour l’aîné à l’avance',
          'Certaines CAF proposent une aide ponctuelle à la garde',
          'Offre et conditions variables selon le département',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When expecting a second child, a very concrete question arises: who will look after the older one on the day of the birth. Its difficulty comes down to one thing, unpredictability. You know neither the day, nor the hour, nor the length.',
          'That is precisely why a single solution is not enough.',
        ],
      },
      {
        type: 'text',
        title: 'A person, and a backup',
        paragraphs: [
          'Good organisation rests on two levels: a trusted person designated in advance, told and available, and a backup if that person ultimately cannot. A birth that starts at three in the morning gives no notice.',
          'Also prepare a small bag for the older child, with the essentials for a night elsewhere, ready in advance. It avoids running around the house at the worst moment.',
        ],
      },
      {
        type: 'text',
        title: 'Help exists, to look for locally',
        paragraphs: [
          'Some CAF offices offer occasional childcare help, including in emergencies, through approved facilities. The offer and conditions vary from one department to another: enquire with your CAF on [caf.fr](https://www.caf.fr).',
          'It is not a uniform national scheme, but it can help out. Something to explore ahead, calmly, rather than discovering it on the day.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Plan a trusted person, told and available',
          'Plan a backup if they cannot',
          'Prepare a small bag for the older child in advance',
          'Some CAF offices offer occasional childcare help',
          'Offer and conditions vary by department',
        ],
      },
    ],
  }),

  postPair({
    slug: 'carte-vitale-mettre-a-jour-avant-naissance',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Carte Vitale : la mettre à jour avant la naissance, et déclarer le bébé après',
    titleEn: 'Health card: updating it before the birth, and declaring the baby after',
    excerptFr:
      'Une carte Vitale à jour évite les blocages de remboursement autour de la naissance. Et après, le nouveau-né se déclare en ligne, ou par téléphone si vous n’avez pas de compte.',
    excerptEn:
      'An up-to-date health card avoids reimbursement snags around the birth. And after, the newborn is declared online, or by phone if you have no account.',
    readingMinutes: 3,
    heroAltFr: 'Mettre à jour sa carte Vitale avant la naissance',
    heroAltEn: 'Updating your health card before the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La carte Vitale est au cœur des remboursements de la grossesse et des premières semaines. Deux gestes simples, un avant la naissance, un après, évitent la plupart des blocages qui empoisonnent cette période.',
          'Le premier consiste à s’assurer qu’elle est à jour.',
        ],
      },
      {
        type: 'text',
        title: 'Avant : une carte à jour',
        paragraphs: [
          'Mettez votre carte Vitale à jour, sur une borne en pharmacie ou à la CPAM, surtout autour de la grossesse où vos droits évoluent. Une carte à jour, c’est des remboursements qui suivent sans accroc, comme le rappelle [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/carte-vitale).',
          'C’est un geste d’une minute, souvent oublié, qui évite des allers-retours plus tard.',
        ],
      },
      {
        type: 'text',
        title: 'Après : déclarer le nouveau-né',
        paragraphs: [
          'Après la naissance, le bébé se déclare à l’Assurance Maladie. La démarche se fait en ligne depuis votre compte ameli, rubrique Démarches, ou par téléphone au 3646 si vous n’avez pas de compte, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/declaration-de-son-enfant).',
          'L’enfant est alors inscrit sur la carte Vitale du parent qui a fait la démarche. Vous pouvez le rattacher aux deux parents, chacun depuis son propre compte. Un extrait d’acte de naissance ou le livret de famille peut être demandé.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Avant la naissance : mettre à jour sa carte Vitale (borne pharmacie ou CPAM)',
          'Après : déclarer le nouveau-né à l’Assurance Maladie',
          'En ligne via le compte ameli, ou au 3646 sans compte',
          'Rattachement possible aux deux parents',
          'Document : extrait d’acte de naissance ou livret de famille',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The health card is at the heart of pregnancy and early-weeks reimbursements. Two simple gestures, one before the birth, one after, avoid most of the snags that plague this period.',
          'The first is making sure it is up to date.',
        ],
      },
      {
        type: 'text',
        title: 'Before: an up-to-date card',
        paragraphs: [
          'Update your health card, at a pharmacy or CPAM terminal, especially around the pregnancy when your rights change. An up-to-date card means reimbursements that follow smoothly, as [ameli.fr](https://www.ameli.fr/assure/remboursements/etre-bien-rembourse/carte-vitale/carte-vitale) recalls.',
          'It is a one-minute gesture, often forgotten, that avoids back-and-forth later.',
        ],
      },
      {
        type: 'text',
        title: 'After: declaring the newborn',
        paragraphs: [
          'After the birth, the baby is declared to the health insurance system. The step is done online from your ameli account, under Démarches, or by phone on 3646 if you have no account, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/declaration-de-son-enfant).',
          'The child is then registered on the health card of the parent who did it. You can attach them to both parents, each from their own account. A birth-certificate extract or the family record book may be requested.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Before the birth: update your health card (pharmacy or CPAM terminal)',
          'After: declare the newborn to the health insurance system',
          'Online via the ameli account, or on 3646 without an account',
          'Attachment possible to both parents',
          'Document: birth-certificate extract or family record book',
        ],
      },
    ],
  }),

  postPair({
    slug: 'prevenir-assurance-habitation-arrivee-enfant',
    categoryKey: 'maison',
    categoryFr: 'La maison',
    categoryEn: 'Home',
    titleFr: 'Assurance habitation et arrivée d’un enfant : faut-il la prévenir',
    titleEn: 'Home insurance and a new child: do you need to tell them',
    excerptFr:
      'Un enfant qui arrive n’oblige en général pas à déclarer quoi que ce soit à son assurance habitation. Mais agrandir la famille est un bon moment pour relire son contrat.',
    excerptEn:
      'A new child generally does not require declaring anything to your home insurer. But growing the family is a good moment to reread your policy.',
    readingMinutes: 3,
    heroAltFr: 'Assurance habitation et arrivée d’un enfant',
    heroAltEn: 'Home insurance and a new child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Dans la longue liste des démarches associées à une naissance circule parfois l’idée qu’il faudrait prévenir son assurance habitation. C’est l’occasion de clarifier une règle souvent mal comprise.',
          'En général, l’arrivée d’un enfant n’oblige à rien de particulier. Mais il y a une nuance utile.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que dit la règle',
        paragraphs: [
          'L’obligation légale est de déclarer, dans un délai de quinze jours après en avoir eu connaissance, toute circonstance nouvelle qui aggrave le risque assuré, selon le [Code des assurances](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035731302). C’est le cadre, pas une règle « déclarez chaque naissance ».',
          'Or un nouveau-né, ou un occupant de plus, n’aggrave en général pas le risque couvert. Dans la plupart des cas, il n’y a donc pas de déclaration obligatoire à faire, sauf si votre contrat le prévoit explicitement.',
        ],
      },
      {
        type: 'text',
        title: 'Le bon réflexe : relire le contrat',
        paragraphs: [
          'Certains contrats lient toutefois la couverture, comme la responsabilité civile ou le capital mobilier, à la composition du foyer ou au nombre d’occupants. Agrandir la famille est donc un bon moment pour vérifier que ces garanties restent adaptées.',
          'Plus de monde et plus de biens dans le logement peut justifier de revoir le niveau de couverture. Ce n’est pas une obligation, c’est une bonne hygiène de contrat, décrite sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2594).',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Obligation : déclarer sous 15 jours ce qui aggrave le risque',
          'Un enfant n’aggrave en général pas le risque : pas de déclaration obligatoire',
          'Sauf si le contrat le prévoit explicitement',
          'Bon réflexe : relire les garanties quand la famille s’agrandit',
          'Plus d’occupants et de biens : vérifier que la couverture reste adaptée',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'In the long list of steps linked to a birth, the idea sometimes circulates that you must tell your home insurer. It is a chance to clarify an often-misunderstood rule.',
          'In general, a new child requires nothing in particular. But there is a useful nuance.',
        ],
      },
      {
        type: 'text',
        title: 'What the rule says',
        paragraphs: [
          'The legal duty is to declare, within fifteen days of becoming aware of it, any new circumstance that aggravates the insured risk, according to the [Insurance Code](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000035731302). That is the framework, not a "declare every birth" rule.',
          'A newborn, or one more occupant, generally does not aggravate the covered risk. In most cases, then, there is no mandatory declaration to make, unless your contract explicitly provides for it.',
        ],
      },
      {
        type: 'text',
        title: 'The right reflex: reread the policy',
        paragraphs: [
          'Some contracts, however, tie coverage, such as liability or contents value, to the household composition or the number of occupants. Growing the family is therefore a good moment to check these guarantees still fit.',
          'More people and more belongings in the home can justify reviewing the level of cover. It is not an obligation, it is good policy hygiene, described on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2594).',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Duty: declare within 15 days anything that aggravates the risk',
          'A child generally does not aggravate the risk: no mandatory declaration',
          'Unless the contract explicitly provides for it',
          'Good reflex: reread the guarantees when the family grows',
          'More occupants and belongings: check the cover still fits',
        ],
      },
    ],
  }),

  postPair({
    slug: 'changer-beneficiaire-assurance-vie-naissance',
    categoryKey: 'couple',
    categoryFr: 'Le couple',
    categoryEn: 'The couple',
    titleFr: 'Assurance vie : changer le bénéficiaire à la naissance d’un enfant',
    titleEn: 'Life insurance: changing the beneficiary when a child is born',
    excerptFr:
      'À la naissance, on pense rarement à sa clause bénéficiaire. Pourtant, une clause trop précise peut oublier l’enfant, quand une formule bien tournée l’inclut d’office.',
    excerptEn:
      'At a birth, people rarely think of their beneficiary clause. Yet a too-precise clause can forget the child, while a well-worded one includes them automatically.',
    readingMinutes: 3,
    heroAltFr: 'Changer le bénéficiaire de l’assurance vie',
    heroAltEn: 'Changing the life-insurance beneficiary',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Parmi les décisions que l’arrivée d’un enfant devrait déclencher, la clause bénéficiaire d’une assurance vie est l’une des plus oubliées. Elle est pourtant simple à revoir, et l’oublier peut avoir des conséquences importantes.',
          'Tout dépend de la façon dont la clause est rédigée.',
        ],
      },
      {
        type: 'text',
        title: 'Une clause modifiable, sauf acceptation',
        paragraphs: [
          'La clause bénéficiaire peut être changée à tout moment jusqu’au décès, sauf si le bénéficiaire désigné a déjà accepté sa désignation, auquel cas la clause devient irrévocable, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2386). L’acceptation ne peut intervenir qu’un certain délai après la conclusion du contrat.',
          'Pour la modifier, on contacte l’assureur ou la banque qui gère le contrat, et on envoie une demande datée et signée avec les références et les nouveaux bénéficiaires. Le changement est enregistré sous forme d’avenant.',
        ],
      },
      {
        type: 'text',
        title: 'La rédaction qui inclut l’enfant d’office',
        paragraphs: [
          'Un point de vocabulaire évite bien des oublis : une clause rédigée « mes enfants nés ou à naître » couvre automatiquement un enfant qui arrive, sans rien changer. Une clause nominative, qui cite des personnes par leur nom, doit au contraire être mise à jour à chaque naissance.',
          'Conservez l’accusé de réception de l’assureur ou la copie de l’avenant portant la nouvelle clause. C’est la preuve que votre volonté est bien enregistrée.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Clause modifiable à tout moment, sauf acceptation du bénéficiaire',
          'Modification : demande datée et signée à l’assureur, enregistrée en avenant',
          'Clause « enfants nés ou à naître » : inclut l’enfant d’office',
          'Clause nominative : à mettre à jour à chaque naissance',
          'Conserver l’accusé de réception ou l’avenant',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Among the decisions a child\'s arrival should trigger, the beneficiary clause of a life-insurance policy is one of the most forgotten. Yet it is simple to review, and forgetting it can have significant consequences.',
          'It all depends on how the clause is worded.',
        ],
      },
      {
        type: 'text',
        title: 'A changeable clause, unless accepted',
        paragraphs: [
          'The beneficiary clause can be changed at any time until death, unless the designated beneficiary has already accepted their designation, in which case the clause becomes irrevocable, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2386). Acceptance can only occur a certain time after the contract is concluded.',
          'To change it, you contact the insurer or bank managing the contract, and send a dated, signed request with the references and new beneficiaries. The change is recorded as an amendment.',
        ],
      },
      {
        type: 'text',
        title: 'The wording that includes the child automatically',
        paragraphs: [
          'A point of wording avoids many oversights: a clause worded "my children born or to be born" automatically covers a child who arrives, with nothing to change. A named clause, citing people by name, must instead be updated at each birth.',
          'Keep the insurer\'s acknowledgement or the copy of the amendment bearing the new clause. It is the proof that your wish is properly recorded.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Clause changeable at any time, unless the beneficiary accepted',
          'Change: dated, signed request to the insurer, recorded as an amendment',
          'A "children born or to be born" clause: includes the child automatically',
          'A named clause: to update at each birth',
          'Keep the acknowledgement or the amendment',
        ],
      },
    ],
  }),

  postPair({
    slug: 'donation-au-dernier-vivant-proteger-conjoint',
    categoryKey: 'couple',
    categoryFr: 'Le couple',
    categoryEn: 'The couple',
    titleFr: 'Donation au dernier vivant : protéger son conjoint avant l’arrivée de bébé',
    titleEn: 'Gift to the surviving spouse: protecting your partner before baby arrives',
    excerptFr:
      'Fonder une famille change la donne successorale. Pour un couple marié, la donation au dernier vivant augmente ce que reçoit le conjoint survivant. Elle se fait chez le notaire.',
    excerptEn:
      'Starting a family changes inheritance. For a married couple, the gift to the surviving spouse increases what the survivor receives. It is done at a notary.',
    readingMinutes: 3,
    heroAltFr: 'La donation au dernier vivant',
    heroAltEn: 'The gift to the surviving spouse',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Fonder une famille pousse à se poser des questions qu’on évite d’habitude, dont celle-ci : que reçoit mon conjoint si je disparais. Pour un couple marié, un outil simple existe pour améliorer sa protection, la donation au dernier vivant.',
          'Ce n’est pas un sujet gai, mais c’est un geste de prévoyance qui prend son sens précisément au moment où l’on devient parents.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qu’elle apporte, et à qui',
        paragraphs: [
          'La donation au dernier vivant, ou donation entre époux, augmente la part que le conjoint survivant reçoit au-delà de ce que la loi prévoit par défaut, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2767). Elle est réservée aux couples mariés : ni le PACS ni le concubinage n’y donnent accès.',
          'Elle porte sur les biens laissés au décès, et le survivant choisit alors parmi plusieurs options, comme l’usufruit de la totalité ou la pleine propriété d’une partie. C’est une souplesse précieuse le moment venu.',
        ],
      },
      {
        type: 'text',
        title: 'Comment elle se fait',
        paragraphs: [
          'La donation au dernier vivant se fait obligatoirement devant notaire. Elle peut être établie pendant le mariage ou par contrat de mariage, et être réciproque, chaque époux protégeant l’autre.',
          'Un point à connaître : elle est automatiquement révoquée en cas de divorce. C’est un dispositif pensé pour le couple marié tant qu’il dure, et il s’efface avec lui.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Augmente la part du conjoint survivant',
          'Réservée aux couples mariés (pas PACS ni concubinage)',
          'Porte sur les biens laissés au décès, avec un choix d’options pour le survivant',
          'Se fait obligatoirement devant notaire, peut être réciproque',
          'Automatiquement révoquée en cas de divorce',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Starting a family prompts questions people usually avoid, including this one: what does my partner receive if I die. For a married couple, a simple tool exists to improve their protection, the gift to the surviving spouse.',
          'It is not a cheerful subject, but it is an act of foresight that takes on meaning precisely when you become parents.',
        ],
      },
      {
        type: 'text',
        title: 'What it brings, and to whom',
        paragraphs: [
          'The gift to the surviving spouse, or gift between spouses, increases the share the survivor receives beyond what the law provides by default, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2767). It is reserved for married couples: neither a civil partnership nor cohabitation gives access to it.',
          'It concerns the property left at death, and the survivor then chooses among several options, such as the usufruct of the whole or full ownership of a part. It is a valuable flexibility when the time comes.',
        ],
      },
      {
        type: 'text',
        title: 'How it is done',
        paragraphs: [
          'The gift to the surviving spouse must be done before a notary. It can be established during the marriage or by marriage contract, and be reciprocal, each spouse protecting the other.',
          'One thing to know: it is automatically revoked in case of divorce. It is a device designed for the married couple as long as it lasts, and it fades with it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Increases the surviving spouse\'s share',
          'Reserved for married couples (not civil partnership or cohabitation)',
          'Concerns property left at death, with a choice of options for the survivor',
          'Must be done before a notary, can be reciprocal',
          'Automatically revoked in case of divorce',
        ],
      },
    ],
  }),

  postPair({
    slug: 'designer-tuteur-legal-enfant-testament',
    categoryKey: 'couple',
    categoryFr: 'Le couple',
    categoryEn: 'The couple',
    titleFr: 'Désigner un tuteur pour son enfant : ce que permet le testament',
    titleEn: 'Naming a guardian for your child: what a will allows',
    excerptFr:
      'Les parents peuvent désigner qui élèverait leur enfant s’ils venaient à disparaître. C’est un souhait fort, respecté, mais qui s’efface si l’intérêt de l’enfant l’exige.',
    excerptEn:
      'Parents can name who would raise their child if they were to die. It is a strong, respected wish, but one that yields if the child’s interest requires it.',
    readingMinutes: 3,
    heroAltFr: 'Désigner un tuteur légal pour son enfant',
    heroAltEn: 'Naming a legal guardian for your child',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est la question que personne n’aime se poser, et que devenir parent rend pourtant légitime : qui élèverait notre enfant si nous venions à disparaître tous les deux. La loi permet d’y répondre à l’avance.',
          'C’est un acte de prévoyance rare, mais qui apaise, parce qu’il évite de laisser cette décision entièrement à d’autres.',
        ],
      },
      {
        type: 'text',
        title: 'Comment le désigner',
        paragraphs: [
          'Un parent peut désigner la personne qui élèverait son enfant mineur après son décès, par testament ou par une déclaration spéciale devant notaire, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F130).',
          'Un conseil pratique s’impose : parlez-en d’abord à la personne concernée. Elle n’est pas obligée d’accepter la tutelle, et il vaut bien mieux recueillir son accord de son vivant que de la placer devant le fait accompli.',
        ],
      },
      {
        type: 'text',
        title: 'Un souhait fort, mais pas absolu',
        paragraphs: [
          'Si les deux parents disparaissent, une tutelle est ouverte et un conseil de famille est constitué par le juge. La désignation faite par les parents s’impose à ce conseil, sauf si l’intérêt de l’enfant commande de l’écarter.',
          'C’est la nuance importante : ce n’est pas un ordre absolu, mais un souhait que la loi prend très au sérieux. Le formuler, c’est donner une direction claire, tout en laissant la protection de l’enfant primer en dernier recours.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Désignation par testament ou déclaration devant notaire',
          'La personne désignée n’est pas obligée d’accepter',
          'Recueillir son accord à l’avance',
          'La désignation s’impose au conseil de famille, sauf intérêt de l’enfant',
          'Un souhait fort et respecté, pas un ordre absolu',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'It is the question nobody likes to ask, and yet becoming a parent makes it legitimate: who would raise our child if we were both to die. The law lets you answer it in advance.',
          'It is a rare act of foresight, but a reassuring one, because it avoids leaving that decision entirely to others.',
        ],
      },
      {
        type: 'text',
        title: 'How to name them',
        paragraphs: [
          'A parent can name the person who would raise their minor child after their death, by will or by a special declaration before a notary, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F130).',
          'One practical piece of advice: talk to the person concerned first. They are not obliged to accept the guardianship, and it is far better to get their agreement while you are alive than to present them with a fait accompli.',
        ],
      },
      {
        type: 'text',
        title: 'A strong wish, but not absolute',
        paragraphs: [
          'If both parents die, a guardianship is opened and a family council is set up by the judge. The parents\' designation imposes itself on that council, unless the child\'s interest requires setting it aside.',
          'That is the important nuance: it is not an absolute order, but a wish the law takes very seriously. Stating it gives a clear direction, while letting the child\'s protection prevail as a last resort.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Designation by will or declaration before a notary',
          'The named person is not obliged to accept',
          'Get their agreement in advance',
          'The designation imposes itself on the family council, unless the child\'s interest',
          'A strong, respected wish, not an absolute order',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO6_FR, en: POSTS_SEO6_EN } = pairsToArrays(pairs);
