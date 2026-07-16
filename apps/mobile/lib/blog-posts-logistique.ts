/**
 * Tier: the logistics of the day itself, and the setups that must exist before it.
 *
 * These six articles sit downstream of the admin and prep tiers: by the time someone reads
 * them, the paperwork is filed and the bag is on the list. What is missing is the operational
 * layer, who drives, who is called, what is fitted and checked, and the two things (car seat
 * installation, maternity practitioner fees) that are usually only explained badly, if at all.
 *
 * Content rule (§7.3): preparation only, never care. Where a question is medical (article 4,
 * travaux/déménagement), the piece says so and points to the sage-femme instead of answering.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'le-jour-j-qui-fait-quoi',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Le jour J : qui fait quoi',
    titleEn: 'The day itself: who does what',
    excerptFr:
      'Le jour J n’est pas le moment d’improviser. Un plan écrit une fois suffit à tenir, même réveillé à 3 heures du matin.',
    excerptEn:
      'The day itself is not the moment to improvise. A plan written once holds, even woken up at 3am.',
    readingMinutes: 5,
    heroAltFr: 'Plan logistique du jour J',
    heroAltEn: 'Planning the day itself',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Personne ne prend de bonnes décisions à 3 heures du matin, réveillé en sursaut, pendant qu’une contraction commence. Ce n’est pas une question de sang-froid, c’est une question physiologique : la fatigue et le stress réduisent la capacité à réfléchir, chez tout le monde, sans exception.',
          'La bonne réponse n’est pas de mieux improviser sur le moment. C’est de ne plus avoir grand-chose à décider quand il arrive. Le jour J se prépare comme un itinéraire, pas comme une intention : un plan écrit, connu de toutes les personnes concernées, qui répond aux mêmes questions quelle que soit l’heure à laquelle tout commence.',
        ],
      },
      {
        type: 'list',
        title: 'Ce que le plan doit trancher avant, pas pendant',
        items: [
          'Qui conduit, et qui prend le relais si cette personne n’est ni joignable ni en état',
          'Le trajet réel vers la maternité, testé aux heures creuses et, si possible, à une heure de pointe',
          'Où se garer une fois sur place, et ce qu’il faut avoir en main pour l’accès : ticket, badge, code',
          'Qui porte la valise et la pochette de documents, pour que ce ne soit pas une question posée dans le couloir',
          'Qui reste pour gérer la maison, s’il y a un aîné ou des animaux',
        ],
      },
      {
        type: 'text',
        title: 'Les détails qui font dérailler un plan par ailleurs solide',
        paragraphs: [
          'Un plan pensé pour la grande décision, partir à la maternité, oublie souvent les petites choses qui l’entourent. Qui garde les clés de la maison, si la personne qui reste n’est pas celle qui rentrera en premier ? Qui sort le chien ou nourrit le chat si personne ne rentre avant le lendemain ? Qui récupère l’aîné à l’école, ou reste avec lui s’il est déjà à la maison au moment où tout démarre ?',
          'Ce sont des questions qui se règlent en trente secondes à l’avance, et qui prennent une heure de coups de fil paniqués si personne n’y a pensé. Elles ne sont pas secondaires : ce sont souvent elles qui décident si un départ se passe bien ou mal.',
        ],
      },
      {
        type: 'list',
        title: 'L’ordre des appels, décidé avant',
        items: [
          'La première personne prévenue, et par qui : souvent l’autre parent ou le co-parent, s’il n’est pas déjà là',
          'La personne qui gère la garde de l’aîné ou des animaux, prévenue en même temps que le départ, pas après',
          'Les employeurs, prévenus dans les heures qui suivent, pas en pleine nuit',
          'Les grands-parents ou proches qui veulent être là dès le début, et ceux qu’on préfère prévenir une fois la naissance passée',
        ],
      },
      {
        type: 'text',
        title: 'Si ça commence loin de chez vous',
        paragraphs: [
          'Un plan pensé pour un départ depuis le salon ne couvre pas tout. Le travail peut commencer au bureau, en déplacement, ou alors que vous conduisez déjà pour autre chose. Gardez la pochette de documents et le numéro de la maternité accessibles ailleurs que dans la valise préparée à la maison : dans un sac à main, sur le téléphone, dans la boîte à gants.',
          'Si la personne censée conduire n’est pas sur place, le plan doit prévoir un deuxième nom, pas seulement un premier. Un collègue, un taxi ou une ambulance restent des options réelles, plus faciles à choisir quand elles ont déjà été envisagées à froid.',
        ],
      },
      {
        type: 'text',
        title: 'Un essai vaut mieux qu’un débat',
        paragraphs: [
          'La meilleure façon de savoir si un plan tient, c’est de le tester une fois, un après-midi calme : le trajet, le stationnement, l’ordre des appels dit à voix haute. Ce qui semblait évident en le disant se révèle parfois confus une fois écrit, et c’est justement le moment de le corriger, pas le jour J.',
          'Le co-parent, s’il y en a un, doit connaître ce plan aussi bien que la personne enceinte. Ce n’est pas le moment de découvrir qu’il ou elle avait imaginé les choses autrement.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le meilleur plan du jour J n’est pas le plus détaillé. C’est celui que plus personne n’a besoin de relire, parce que chacun sait déjà quoi faire.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Nobody makes good decisions at 3am, jolted awake, while a contraction starts. That is not about staying calm under pressure. It is physiological: fatigue and stress reduce everyone’s ability to think clearly, without exception.',
          'The right answer is not to improvise better in the moment. It is to leave almost nothing to decide when it happens. The day itself is planned like a route, not like an intention: a written plan, known to everyone involved, that answers the same questions no matter what time it all starts.',
        ],
      },
      {
        type: 'list',
        title: 'What the plan should settle in advance, not during',
        items: [
          'Who drives, and who takes over if that person is unreachable or not in a state to drive',
          'The real route to the maternity unit, timed off-peak and, if possible, at rush hour too',
          'Where to park once there, and what you need in hand to get in: ticket, badge, code',
          'Who carries the bag and the document folder, so it is not a question asked in the corridor',
          'Who stays behind to hold down the house, if there is an older child or pets',
        ],
      },
      {
        type: 'text',
        title: 'The details that derail an otherwise solid plan',
        paragraphs: [
          'A plan built around the big decision, leaving for the maternity unit, often forgets the small things around it. Who keeps the house keys, if the person staying behind is not the one who will get home first? Who walks the dog or feeds the cat if nobody is back until the next day? Who picks up the older child from school, or stays with them if they are already home when everything starts?',
          'These are questions that take thirty seconds to settle in advance, and an hour of panicked phone calls if nobody thought of them. They are not minor details. They are often what decides whether a departure goes smoothly or not.',
        ],
      },
      {
        type: 'list',
        title: 'The call order, decided ahead of time',
        items: [
          'The first person told, and by whom: usually the other parent or co-parent, if not already there',
          'Whoever is covering the older child or the pets, told at the same time as the departure, not after',
          'Employers, told within the following hours, not in the middle of the night',
          'Grandparents or family who want to be there from the start, and those better told once the baby has arrived',
        ],
      },
      {
        type: 'text',
        title: 'If it starts away from home',
        paragraphs: [
          'A plan built around leaving from the living room does not cover everything. Labour can start at work, while travelling, or while already driving for something else. Keep the document folder and the maternity unit’s number reachable somewhere other than the bag packed at home: in a handbag, on the phone, in the glovebox.',
          'If the person meant to drive is not there, the plan needs a second name, not just a first one. A colleague, a taxi or an ambulance are all real options, and they are easier to decide on when they have already been thought through, calmly, in advance.',
        ],
      },
      {
        type: 'text',
        title: 'A rehearsal beats a discussion',
        paragraphs: [
          'The best way to know whether a plan holds is to test it once, on a quiet afternoon: the route, the parking, the call order said out loud. What sounded obvious when spoken sometimes turns out confused once written down, and that is the moment to fix it, not the day itself.',
          'The co-parent, if there is one, should know this plan as well as the person who is pregnant. This is not the moment to discover they had imagined it differently.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The best plan for the day itself is not the most detailed one. It is the one nobody needs to re-read, because everyone already knows what to do.',
      },
    ],
  }),

  postPair({
    slug: 'siege-auto-installer-avant-le-jour-j',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Siège-auto : l’installer avant le jour J, pas le vérifier ce jour-là',
    titleEn: 'Car seat: fit it before the day, not check it on it',
    excerptFr:
      'La maternité ne vous laissera pas partir sans siège-auto installé. La plupart des installations comportent une erreur, et ce n’est pas à la porte de sortie qu’il faut le découvrir.',
    excerptEn:
      'The maternity unit will not let you leave without a fitted car seat. Most installations have a mistake in them, and the exit door is not where to find out.',
    readingMinutes: 6,
    heroAltFr: 'Installer un siège-auto avant la naissance',
    heroAltEn: 'Fitting a car seat before the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'À la sortie de la maternité, le bébé doit être transporté dans un siège-auto adapté à sa taille, installé correctement, y compris pour un trajet de quelques minutes. Ce n’est pas le moment de le découvrir : entre les contractions, la fatigue et la sortie qui approche, ce n’est pas non plus le moment d’apprendre à lire une notice.',
          'La bonne pratique n’est pas d’acheter le bon siège. C’est de l’avoir installé, essayé et vérifié plusieurs semaines avant le terme.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que dit la réglementation',
        paragraphs: [
          'En France comme dans l’Union européenne, la norme la plus récente pour les sièges-auto est i-Size, aussi appelée R129. Elle classe les sièges selon la taille de l’enfant plutôt que son poids, et impose le maintien dos à la route au moins jusqu’à 15 mois et 83 cm ([Sécurité Routière](https://www.securite-routiere.gouv.fr/reglementation-liee-lusager/reglementation-liee-aux-enfants/transporter-un-enfant-en-voiture)). Au-delà de ce seuil, le dos à la route reste vivement conseillé tant que la morphologie de l’enfant et le siège le permettent.',
          'Chaque siège se fixe selon les instructions du fabricant, avec un système ISOFIX ou avec la ceinture de sécurité du véhicule. Le schéma d’installation présent sur le siège est un marquage obligatoire : c’est lui qu’il faut suivre, pas une habitude ou une vidéo trouvée en ligne.',
          'Si le siège est installé dos à la route à l’avant du véhicule, la désactivation de l’airbag passager est impérative. L’ancienne norme R44 ne peut plus être vendue depuis le 1er septembre 2024, mais les sièges déjà en circulation restent utilisables.',
        ],
      },
      {
        type: 'text',
        title: 'Quand s’en occuper',
        paragraphs: [
          'Installez le siège dès qu’il est acheté, sans attendre le dernier mois. Beaucoup de familles s’y prennent en même temps que la valise de maternité, vers le début du 8e mois : c’est un repère raisonnable, mais rien n’empêche de le faire plus tôt.',
          'L’objectif n’est pas de l’installer une fois pour de bon. C’est de savoir le faire, pour pouvoir recommencer sans stress le jour où il faudra vraiment partir.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qu’une erreur d’installation change vraiment',
        items: [
          'Une étude de l’Association Prévention Routière a mesuré que près de la moitié des sièges-auto sont mal installés ou mal utilisés en France',
          'Le taux d’erreur grimpe fortement pour les sièges fixés à la ceinture plutôt qu’en ISOFIX',
          'Une seule erreur, comme une sangle mal tendue, peut suffire à réduire fortement la protection en cas de choc',
          'Le siège le plus cher n’est pas plus sûr qu’un siège correct s’il est mal fixé',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi c’est le moment de le découvrir, pas le jour J',
        paragraphs: [
          'Le jour de la sortie de la maternité, personne n’a le temps ni l’énergie de démonter un siège mal fixé pour recommencer. Essayez-le à vide, dans votre propre véhicule, plusieurs semaines avant le terme. Refaites l’installation en suivant la notice pas à pas, sans raccourci.',
          'De nombreux magasins spécialisés et certaines associations vérifient gratuitement une installation. C’est une visite courte, et c’est le moment de poser toutes les questions : l’inclinaison, la tension de la sangle, la compatibilité avec votre modèle de voiture.',
        ],
      },
      {
        type: 'list',
        title: 'Le contrôle à refaire soi-même, régulièrement',
        items: [
          'La sangle ne doit laisser passer qu’un doigt entre elle et l’enfant, une fois habillé pour la saison',
          'Le siège ne doit pas bouger de plus de quelques centimètres une fois fixé, testé à la main à la base',
          'Le harnais se règle à chaque changement de vêtement épais, l’hiver notamment',
          'Le siège se revérifie après un long trajet, pas seulement à l’installation initiale',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Vérifiez les recommandations à jour sur [securite-routiere.gouv.fr](https://www.securite-routiere.gouv.fr/reglementation-liee-lusager/reglementation-liee-aux-enfants/transporter-un-enfant-en-voiture). Elles font autorité, et elles évoluent.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When you leave the maternity unit, the baby must travel in a car seat suited to their size, correctly fitted, even for a five-minute drive. That is not the moment to find this out: between contractions, exhaustion and the discharge paperwork, it is also not the moment to learn how to read an instruction manual.',
          'Good practice is not buying the right seat. It is having it fitted, tested and checked several weeks before the due date.',
        ],
      },
      {
        type: 'text',
        title: 'What the regulation says',
        paragraphs: [
          'In France and across the EU, the most recent car seat standard is i-Size, also called R129. It classes seats by the child’s height rather than weight, and requires rear-facing travel until at least 15 months and 83cm ([Sécurité Routière](https://www.securite-routiere.gouv.fr/reglementation-liee-lusager/reglementation-liee-aux-enfants/transporter-un-enfant-en-voiture)). Beyond that threshold, rear-facing is still strongly advised for as long as the child’s build and the seat allow it.',
          'Every seat is fitted according to the manufacturer’s instructions, using either ISOFIX or the vehicle’s own seatbelt. The installation diagram on the seat is a mandatory marking, and it is what to follow, not a habit or a video found online.',
          'If the seat is fitted rear-facing in the front of the vehicle, deactivating the passenger airbag is mandatory. The older R44 standard can no longer be sold since 1 September 2024, but seats already in use remain allowed.',
        ],
      },
      {
        type: 'text',
        title: 'When to deal with it',
        paragraphs: [
          'Fit the seat as soon as you buy it, rather than waiting for the last month. Many families do it around the same time as the hospital bag, near the start of the eighth month; that is a reasonable marker, but nothing stops you doing it sooner.',
          'The goal is not to fit it once and be done. It is to know how to fit it, so you can do it again calmly on the day you actually need to leave.',
        ],
      },
      {
        type: 'list',
        title: 'What a fitting mistake actually changes',
        items: [
          'A study by the Association Prévention Routière found that close to half of child car seats in France are poorly fitted or poorly used',
          'The error rate rises sharply for seats fitted with the seatbelt rather than ISOFIX',
          'A single mistake, such as a loose strap, can be enough to sharply reduce protection in a crash',
          'The most expensive seat is no safer than a decent one if it is fitted badly',
        ],
      },
      {
        type: 'text',
        title: 'Why this is the moment to find out, not the day itself',
        paragraphs: [
          'On the day you leave the maternity unit, nobody has the time or the energy to strip down a badly fitted seat and start again. Try it empty, in your own car, several weeks before the due date. Redo the fitting following the manual step by step, with no shortcuts.',
          'Many specialist shops and some associations will check a fitting for free. It is a short visit, and it is the moment to ask every question: the recline angle, how tight the strap should be, whether it suits your car model.',
        ],
      },
      {
        type: 'list',
        title: 'The check to redo yourself, regularly',
        items: [
          'The strap should leave only one finger’s width against the child, once dressed for the season',
          'The seat should not move more than a couple of centimetres once fitted, tested by hand at the base',
          'The harness needs adjusting whenever bulky clothing changes, especially in winter',
          'The fitting is worth rechecking after a long drive, not only when first installed',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Check current guidance on [Sécurité Routière](https://www.securite-routiere.gouv.fr/reglementation-liee-lusager/reglementation-liee-aux-enfants/transporter-un-enfant-en-voiture). It is the authoritative source, and it changes.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'inscription-maternite-comment-choisir',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Inscription à la maternité : ce que le choix engage vraiment',
    titleEn: 'Registering with a maternity unit: what the choice really involves',
    excerptFr:
      'Deux décisions se cachent derrière une seule démarche : où accoucher, et avec quels professionnels, à quel tarif. La seconde est rarement expliquée.',
    excerptEn:
      'One piece of paperwork hides two decisions: where to give birth, and with which practitioners, at what price. The second is rarely explained.',
    readingMinutes: 6,
    heroAltFr: 'Inscription et secteur de la maternité',
    heroAltEn: 'Maternity registration and practitioner fees',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'S’inscrire à la maternité est présenté comme une seule démarche : choisir un établissement, remplir un dossier, attendre la confirmation. En réalité, deux décisions distinctes s’y cachent. La première est le lieu : quel établissement, avec quel niveau de soins. La seconde, presque jamais expliquée, est le secteur des praticiens qui vous suivront, et ce qu’il change sur ce que vous payez.',
        ],
      },
      {
        type: 'text',
        title: 'Le niveau, en une phrase',
        paragraphs: [
          'Les maternités sont classées selon les soins néonatals qu’elles peuvent assurer sur place, du niveau 1 pour les grossesses sans particularité au niveau 3 pour les situations les plus complexes. Un niveau plus élevé n’est pas une meilleure maternité, c’est une maternité équipée différemment. Si votre grossesse est suivie de près, ce choix se fera avec l’équipe médicale ; sinon, la proximité et le fonctionnement de l’équipe comptent souvent davantage.',
        ],
      },
      {
        type: 'text',
        title: 'Le secteur, ce qu’on ne vous explique pas',
        paragraphs: [
          'Les médecins libéraux exercent en secteur 1 ou en secteur 2. En secteur 1, les tarifs sont fixés par la convention avec l’Assurance Maladie, et il n’y a pas de dépassement d’honoraires en dehors de cas exceptionnels. En secteur 2, le praticien fixe librement ses tarifs, avec ce que la convention appelle du tact et de la mesure.',
          'Le point qui compte pour vous : un dépassement d’honoraires n’est jamais remboursé par l’Assurance Maladie, quel que soit le secteur. C’est votre mutuelle qui peut le prendre en charge, selon ce que prévoit votre contrat, ou c’est vous.',
        ],
      },
      {
        type: 'list',
        title: 'Comment vérifier, avant de vous engager',
        items: [
          'Consultez la fiche du praticien sur [annuairesante.ameli.fr](https://annuairesante.ameli.fr/trouver-un-professionnel-de-sante/), qui indique son secteur de conventionnement',
          'Demandez directement au cabinet ou à la maternité, en particulier pour les consultations et l’accouchement lui-même',
          'Vérifiez votre contrat de mutuelle avant de vous engager, pas après avoir reçu une facture',
          'Renseignez-vous sur l’option OPTAM : certains praticiens de secteur 2 y adhèrent et plafonnent leurs dépassements',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ça se joue tôt',
        paragraphs: [
          'Dans les zones où les places sont rares, l’inscription se fait dès la grossesse confirmée, parfois avant la première échographie. Vérifier le secteur avant de vous inscrire, plutôt qu’après, évite une mauvaise surprise à un moment où changer d’avis est plus compliqué.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La question n’est pas seulement où vous allez accoucher. C’est aussi qui vous suit, et ce que ça vous coûtera réellement.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Vérifiez le secteur et les tarifs sur [ameli.fr](https://www.ameli.fr) et [annuairesante.ameli.fr](https://annuairesante.ameli.fr). Ils évoluent, tout comme les praticiens conventionnés dans votre zone.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Registering with a maternity unit is presented as a single step: choose a facility, fill in a file, wait for confirmation. In reality two separate decisions hide inside it. The first is the place: which facility, with what level of care. The second, almost never explained, is the fee sector of the practitioners who will follow you, and what that changes about what you pay.',
        ],
      },
      {
        type: 'text',
        title: 'The level, in one sentence',
        paragraphs: [
          'French maternity units are graded by the neonatal care they can provide on site, from level 1 for straightforward pregnancies to level 3 for the most complex situations. A higher level is not a better unit, it is a unit equipped differently. If your pregnancy is being followed closely, this choice will be made with your medical team; otherwise distance and how the team works usually matter more.',
        ],
      },
      {
        type: 'text',
        title: 'The fee sector, the part nobody explains',
        paragraphs: [
          'Self-employed doctors in France practise under secteur 1 or secteur 2. Under secteur 1, fees are set by the agreement with l’Assurance Maladie, and there is no fee excess outside exceptional cases. Under secteur 2, the practitioner sets their own fees, within what the agreement calls tact and moderation.',
          'The point that matters for you: a fee excess (dépassement d’honoraires) is never reimbursed by l’Assurance Maladie, whichever sector applies. Your top-up insurer may cover it, depending on your contract, or you do.',
        ],
      },
      {
        type: 'list',
        title: 'How to check, before you commit',
        items: [
          'Look up the practitioner’s listing on [annuairesante.ameli.fr](https://annuairesante.ameli.fr/trouver-un-professionnel-de-sante/), which shows their fee sector',
          'Ask the practice or the maternity unit directly, especially about the appointments and the birth itself',
          'Check your top-up insurance contract before you commit, not after receiving a bill',
          'Ask about OPTAM: some secteur 2 practitioners sign up to it and cap their fee excesses',
        ],
      },
      {
        type: 'text',
        title: 'Why this happens early',
        paragraphs: [
          'In areas where places are scarce, registration happens as soon as the pregnancy is confirmed, sometimes before the first scan. Checking the fee sector before you register, rather than after, avoids an unpleasant surprise at a point when changing your mind is harder.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The question is not only where you will give birth. It is also who follows you, and what that will actually cost.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Check fee sectors and rates on [ameli.fr](https://www.ameli.fr) and [annuairesante.ameli.fr](https://annuairesante.ameli.fr). They change, and so do the practitioners registered in your area.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'travaux-demenagement-pendant-grossesse',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Travaux ou déménagement pendant la grossesse : dans quel ordre',
    titleEn: 'Renovating or moving during pregnancy: what order to do it in',
    excerptFr:
      'L’enjeu n’est pas de tout finir tôt, c’est que la chambre soit prête et aérée avant l’arrivée. Voilà comment séquencer, et à qui déléguer.',
    excerptEn:
      'The goal is not to finish everything early, it is for the room to be ready and aired before the arrival. Here is how to sequence it, and what to hand off.',
    readingMinutes: 5,
    heroAltFr: 'Travaux et déménagement pendant la grossesse',
    heroAltEn: 'Renovating or moving during pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Faire des travaux ou déménager pendant une grossesse est courant, et ça se passe généralement bien quand c’est séquencé. Le problème n’est jamais le projet lui-même, c’est le calendrier qui déborde et se termine la semaine de la naissance.',
        ],
      },
      {
        type: 'text',
        title: 'Compter à rebours depuis le terme, pas depuis aujourd’hui',
        paragraphs: [
          'La question n’est pas quand commencer, c’est quand vous voulez avoir fini. Comptez depuis la date prévue d’accouchement, pas depuis la date du jour : un projet censé durer six semaines qui commence deux mois avant le terme se termine, dans les faits, souvent plus tard que prévu. Prévoyez une marge, pas un calendrier serré.',
        ],
      },
      {
        type: 'list',
        title: 'Un ordre qui fonctionne',
        items: [
          'Les gros travaux, peinture, sol, ouvertures, terminés avant le début du 3e trimestre si possible',
          'La chambre aérée plusieurs semaines avant l’arrivée, pas la veille',
          'Le déménagement lui-même, si possible avant le début du 8e mois, pour garder de l’énergie ensuite',
          'L’installation du couchage et du siège-auto, une fois l’agitation retombée, pas au milieu des cartons',
          'Les finitions et la décoration, en dernier, sans date limite réelle',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui se délègue, et à qui',
        paragraphs: [
          'Le port de charges lourdes, le montage de meubles, la manutention des cartons : ce sont des tâches faciles à déléguer, au co-parent, à la famille, ou à des professionnels si le budget le permet. Il n’y a aucune raison de les garder pour vous si quelqu’un d’autre peut s’en charger.',
          'Prévoyez aussi qui gère les démarches administratives du déménagement : changement d’adresse à la CAF, à l’employeur, à la sécurité sociale, ou auprès du médecin ou de la sage-femme qui vous suit. Ce sont des tâches invisibles, faciles à oublier au milieu du reste.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Pour toute question sur ce que vous pouvez porter, respirer ou faire pendant des travaux, la bonne personne à qui la poser est votre sage-femme. Elle connaît votre grossesse, pas nous.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le bon calendrier n’est pas celui qui finit vite. C’est celui qui laisse la chambre tranquille, aérée, avant que quelqu’un en ait besoin.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Renovating or moving while pregnant is common, and it usually goes fine when it is sequenced properly. The project itself is rarely the problem. The calendar overrunning into the week of the birth is.',
        ],
      },
      {
        type: 'text',
        title: 'Count backwards from the due date, not from today',
        paragraphs: [
          'The question is not when to start, it is when you want to be finished. Count from the expected due date, not from today’s date: a project meant to take six weeks that starts two months before term often finishes, in practice, later than planned. Build in margin, not a tight schedule.',
        ],
      },
      {
        type: 'list',
        title: 'An order that works',
        items: [
          'Major works, painting, flooring, structural changes, finished before the start of the third trimester if possible',
          'The room aired out for several weeks before the arrival, not the day before',
          'The move itself, ideally before the start of the eighth month, to keep some energy in reserve afterwards',
          'Setting up the sleep space and the car seat once the dust has settled, not in the middle of boxes',
          'Finishing touches and decoration last, with no real deadline',
        ],
      },
      {
        type: 'text',
        title: 'What to hand off, and to whom',
        paragraphs: [
          'Carrying heavy loads, assembling furniture, moving boxes: these are easy tasks to hand off, to the co-parent, to family, or to professionals if the budget allows. There is no reason to keep them for yourself if someone else can do them.',
          'Also decide who handles the administrative side of a move: address changes with the CAF, your employer, health insurance, or your doctor or the midwife following you. These are invisible tasks, easy to forget in the middle of everything else.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'For any question about what you can carry, breathe in, or do during renovation work, the right person to ask is your midwife. She knows your pregnancy. We do not.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The right schedule is not the one that finishes fastest. It is the one that leaves the room calm and aired out before anyone needs it.',
      },
    ],
  }),

  postPair({
    slug: 'jumeaux-ce-qui-change-vraiment',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Jumeaux : ce qui change vraiment, et ce qui ne double pas',
    titleEn: 'Expecting twins: what really changes, and what does not double',
    excerptFr:
      'Le calendrier avance, certains droits augmentent, et tout ne se double pas comme on le croit. Voilà ce qui compte vraiment.',
    excerptEn:
      'The timeline moves up, some entitlements increase, and not everything doubles the way people assume. Here is what actually matters.',
    readingMinutes: 6,
    heroAltFr: 'Préparer l’arrivée de jumeaux',
    heroAltEn: 'Preparing for twins',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Attendre des jumeaux change plus de choses que le nombre de bébés. Le calendrier avance, certains droits administratifs augmentent réellement, et à l’inverse, une partie de ce qu’on imagine devoir doubler ne double pas. Voilà le tri.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui avance',
        paragraphs: [
          'Prévenez tôt, et partout : la déclaration de grossesse, l’inscription à la maternité, la recherche de mode de garde. Une grossesse gémellaire est suivie plus tôt et plus souvent, et les décisions qui ailleurs se prennent au fil de l’eau se prennent ici plus tôt, simplement parce que le calendrier global est resserré. Signalez que vous attendez des jumeaux dès la déclaration de grossesse : c’est ce qui déclenche l’allongement de vos droits.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui augmente réellement',
        paragraphs: [
          'Le congé maternité passe à 34 semaines pour une grossesse gémellaire, contre 16 semaines pour un premier enfant seul : 12 semaines avant la naissance et 22 semaines après ([service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F2265)). Pour des triplés ou plus, il passe à 46 semaines.',
          'Le congé de naissance et le congé paternité et d’accueil de l’enfant passe à 32 jours pour une naissance multiple, contre 25 jours pour une naissance simple, en plus des 3 jours de congé de naissance ([service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F3156)). Le fractionnement reste possible, en deux périodes d’au moins cinq jours chacune.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui ne double pas',
        items: [
          'La poussette : un modèle double ou tandem remplace deux poussettes simples, ce n’est pas un doublon',
          'Le suivi administratif : c’est une seule déclaration de grossesse, un seul dossier CAF, mis à jour pour deux enfants',
          'L’attention que vous portez à chaque bébé n’est pas divisée par deux : elle se partage différemment, pas moins',
          'Le mode de garde : chercher deux places n’est pas deux fois plus long si vous vous y prenez au même moment, auprès des mêmes interlocuteurs',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui double vraiment, et qui se prépare à l’avance',
        paragraphs: [
          'Le nombre de bodies, de pyjamas, de sièges-auto, en revanche, double sans discussion. Deux bébés portent chacun leurs propres vêtements, dorment chacun dans leur propre espace, voyagent chacun dans leur propre siège. Anticiper cet aspect matériel, plutôt que de le découvrir à l’arrivée, évite une bonne partie du stress logistique des premières semaines.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Vérifiez les durées et conditions à jour sur [service-public.fr](https://www.service-public.fr) et [ameli.fr](https://www.ameli.fr). Elles évoluent, notamment selon votre situation professionnelle.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Une grossesse gémellaire n’est pas une grossesse simple à deux vitesses. C’est son propre calendrier, avec ses propres règles.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Expecting twins changes more than the number of babies. The timeline moves up, some administrative entitlements genuinely increase, and on the other hand, some of what people assume will double, does not. Here is the sort.',
        ],
      },
      {
        type: 'text',
        title: 'What moves earlier',
        paragraphs: [
          'Get ahead of things, on every front: declaring the pregnancy, registering with a maternity unit, starting the childcare search. A twin pregnancy is followed earlier and more often, and decisions that elsewhere happen gradually get made sooner here, simply because the overall timeline is tighter. Mention that you are expecting twins as soon as you declare the pregnancy: that is what triggers the extended entitlements.',
        ],
      },
      {
        type: 'text',
        title: 'What genuinely increases',
        paragraphs: [
          'Maternity leave rises to 34 weeks for a twin pregnancy, against 16 weeks for a first single child: 12 weeks before the birth and 22 weeks after ([service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F2265)). For triplets or more, it rises to 46 weeks.',
          'Birth leave and paternity and childcare leave rises to 32 days for a multiple birth, against 25 days for a single birth, on top of the 3-day birth leave ([service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F3156)). Splitting is still possible, across two periods of at least five days each.',
        ],
      },
      {
        type: 'list',
        title: 'What does not double',
        items: [
          'The pushchair: a double or tandem model replaces two single ones, it is not a duplicate purchase',
          'The paperwork: it is one pregnancy declaration, one CAF file, updated for two children, not two of everything',
          'The attention you give each baby is not halved: it is shared differently, not diminished',
          'The childcare search: finding two places is not twice the work if you run it at the same time, with the same contacts',
        ],
      },
      {
        type: 'text',
        title: 'What genuinely doubles, and is worth preparing for',
        paragraphs: [
          'The number of bodysuits, sleepsuits and car seats, on the other hand, doubles without argument. Two babies each wear their own clothes, each sleep in their own space, each travel in their own seat. Planning for this material side ahead of time, rather than discovering it on arrival, removes a good part of the logistical stress of the first weeks.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Check current durations and conditions on [service-public.fr](https://www.service-public.fr) and [ameli.fr](https://www.ameli.fr). They change, particularly depending on your employment situation.',
        ],
      },
      {
        type: 'quote',
        quote:
          'A twin pregnancy is not a single pregnancy running at double speed. It has its own calendar, with its own rules.',
      },
    ],
  }),

  postPair({
    slug: 'derniere-ligne-droite-les-deux-dernieres-semaines',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Getting ready',
    titleFr: 'Les deux dernières semaines : ce qui vaut la peine, et ce qui peut attendre',
    titleEn: 'The last two weeks: what is worth doing, and what can wait',
    excerptFr:
      'Ce qui mérite d’être fini, ce qui ne vaut pas la peine d’être commencé, et pourquoi une fin ennuyeuse est une bonne fin.',
    excerptEn:
      'What is worth finishing, what is not worth starting, and why a boring ending is a good one.',
    readingMinutes: 4,
    heroAltFr: 'Les deux dernières semaines de grossesse',
    heroAltEn: 'The last two weeks of pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les deux dernières semaines ont une réputation d’attente interminable. Elles sont surtout le moment où la préparation, faite tôt, se transforme en calme. Ce qui reste à faire à ce stade devrait tenir sur une toute petite liste, pas sur celle du 6e mois.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui vaut la peine d’être fini',
        items: [
          'La valise, fermée et à portée de main, pas encore à moitié préparée',
          'La pochette de documents, complète, à un endroit que tout le monde connaît',
          'Le siège-auto, installé et essayé depuis plusieurs semaines, pas ces jours-ci',
          'Un point rapide sur le plan du jour J : qui conduit, qui appelle qui, qui garde l’aîné ou les animaux',
          'Quelques repas d’avance, au congélateur, pour les premiers jours du retour',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui ne vaut pas la peine d’être commencé',
        items: [
          'Un projet de travaux ou de rangement de grande ampleur',
          'Assembler un meuble compliqué, ou repeindre une pièce entière',
          'Refaire toute la liste de naissance parce qu’un article en ligne dit qu’il manque quelque chose',
          'Changer de mode de garde ou de maternité à ce stade, sauf nécessité réelle',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi l’ennui est le bon objectif',
        paragraphs: [
          'Une fin de grossesse occupée par des projets de dernière minute est une fin de grossesse fatigante, pas productive. L’objectif de ces deux semaines n’est pas de tout boucler, c’est de ne plus rien avoir à boucler. Si la valise, les papiers et le siège-auto sont prêts depuis un moment, il ne reste plus qu’à attendre, ce qui est exactement ce que ces semaines demandent.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La meilleure préparation ne se voit pas les deux dernières semaines. Elle se voit à ce qu’il n’y a plus rien à préparer.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The last two weeks have a reputation for endless waiting. Mostly, they are the moment when preparation done early turns into calm. Whatever is left to do at this stage should fit on a very short list, not the one you had back in month six.',
        ],
      },
      {
        type: 'list',
        title: 'What is worth finishing',
        items: [
          'The bag, zipped and within reach, not still half packed',
          'The document folder, complete, somewhere everyone knows',
          'The car seat, fitted and tested weeks ago, not these last few days',
          'A quick check of the plan for the day itself: who drives, who calls whom, who covers the older child or the pets',
          'A few meals ahead, in the freezer, for the first days back home',
        ],
      },
      {
        type: 'list',
        title: 'What is not worth starting',
        items: [
          'A big renovation or reorganising project',
          'Assembling a complicated piece of furniture, or repainting an entire room',
          'Redoing the whole baby registry because an article online says something is missing',
          'Changing childcare provider or maternity unit at this stage, unless truly necessary',
        ],
      },
      {
        type: 'text',
        title: 'Why boring is the right goal',
        paragraphs: [
          'A late pregnancy filled with last-minute projects is a tiring one, not a productive one. The goal of these two weeks is not to tie up every loose end, it is to have none left to tie. If the bag, the paperwork and the car seat have been ready for a while, all that is left is to wait, which is exactly what these weeks call for.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The best preparation does not show in the last two weeks. It shows in there being nothing left to prepare.',
      },
    ],
  }),
];

export const POSTS_LOGISTIQUE_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_LOGISTIQUE_EN: BlogPost[] = pairs.map((p) => p.en);
