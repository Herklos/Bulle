/**
 * Tier 3, extended: buying guides, anti-overbuying angle.
 *
 * Companion to the three "achats" articles in blog-posts-prep.ts. Same stance, same rule:
 * no prices (they go stale and read as affiliate content), no brands, no product picks. Where
 * a claim touches safety (car seats, mattresses, sleep), it is attributed to an official or
 * reputable French source inline, never presented as our own medical or safety reasoning.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'chambre-bebe-preparer-sans-surinvestir',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Chambre de bébé : ce qu’il faut installer, et ce qui peut attendre',
    titleEn: 'Baby’s room: what to set up now, and what can wait',
    excerptFr:
      'Un endroit sûr où il dort, un endroit où le changer, un peu de rangement. Le reste est une question de goût, pas d’urgence.',
    excerptEn:
      'A safe place to sleep, somewhere to change them, a bit of storage. Everything else is taste, not urgency.',
    readingMinutes: 5,
    heroAltFr: 'Aménager la chambre de bébé',
    heroAltEn: 'Setting up a baby’s room',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La plupart des guides montrent une chambre déjà complète : lit, commode assortie, tapis, mobile, rideaux occultants, le tout coordonné. Ce n’est pas ce dont vous avez besoin au début. C’est un décor.',
          'Ce qui sert vraiment tient dans un coin de pièce, pas dans une pièce entière. Voici ce qui doit être prêt, et ce qui peut attendre sans rien perdre.',
        ],
      },
      {
        type: 'text',
        title: 'Le socle, avant tout le reste',
        paragraphs: [
          'Trois choses comptent réellement à l’arrivée du bébé : un endroit sûr où il dort, un endroit où vous pouvez le changer sans vous casser le dos, et un peu de rangement pour les vêtements des premières semaines. Tout le reste est confort ou décoration, pas nécessité.',
          'L’espace de sommeil doit être sûr et conforme, avec un matelas ferme à la bonne taille. C’est un sujet suffisamment important pour lui consacrer un article à part ; retenez pour l’instant que c’est la seule pièce du puzzle qui ne se négocie pas.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui doit être prêt dès le premier jour',
        items: [
          'Un espace de sommeil sûr et conforme, avec un matelas ferme à la bonne taille',
          'Un endroit pour changer bébé, à une hauteur qui vous épargne le dos',
          'Une lumière douce, qui ne réveille pas toute la maison à 3h du matin',
          'Un tiroir ou un panier pour les vêtements des premières semaines',
          'De quoi ranger le linge sale, à portée de main',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui peut attendre',
        items: [
          'La décoration murale et le thème de la chambre',
          'Le mobilier assorti en ensemble complet',
          'Le tapis, le mobile, les rangements à jouets',
          'Les rideaux occultants, sauf si la pièce est particulièrement lumineuse',
          'Une deuxième commode ou un dressing dédié',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi attendre est souvent le bon choix',
        paragraphs: [
          'Les tout premiers mois, le bébé dort près de vous, pas seul dans sa chambre. La pièce elle-même sert donc moins que ce qu’on imagine au début, et vous saurez mieux dans trois mois ce dont vous avez vraiment besoin : la taille de vêtements qui revient le plus, la façon dont vous rangez réellement, l’endroit où vous passez le plus de temps avec lui.',
          'Meubler une pièce en entier avant la naissance, c’est deviner. Meubler au fur et à mesure, c’est ajuster à ce qui se passe vraiment chez vous.',
        ],
      },
      {
        type: 'text',
        title: 'Utilisez ce que vous avez déjà',
        paragraphs: [
          'Un panier, une étagère existante, un tiroir libéré dans une autre pièce : ça suffit pour commencer. Le rangement dédié « bébé » devient utile plus tard, quand le volume de vêtements et de jouets a réellement grossi. Acheter la solution de rangement idéale avant de savoir ce qu’il y a à ranger est l’un des achats les plus fréquents, et les moins nécessaires, de cette période.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Les repères sur le lieu de sommeil du bébé, y compris le partage de la chambre les premiers mois, viennent d’[ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). Nous les détaillons dans notre article sur le lit et le cododo.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Most guides show a fully finished room: a cot, a matching chest of drawers, a rug, a mobile, blackout curtains, all coordinated. That is not what you need at the start. That is decor.',
          'What actually gets used at first fits in a corner of a room, not a whole room. Here is what needs to be ready, and what can wait without losing anything.',
        ],
      },
      {
        type: 'text',
        title: 'The basics, before anything else',
        paragraphs: [
          'Three things genuinely matter when the baby arrives: somewhere safe for them to sleep, somewhere you can change them without wrecking your back, and a bit of storage for the first weeks of clothes. Everything else is comfort or decoration, not necessity.',
          'The sleep space needs to be safe and compliant, with a firm, correctly sized mattress. That is important enough to deserve its own article; for now, just note it is the one piece of the puzzle that is not negotiable.',
        ],
      },
      {
        type: 'list',
        title: 'What needs to be ready from day one',
        items: [
          'A safe, compliant sleep space, with a firm, correctly sized mattress',
          'Somewhere to change the baby, at a height that spares your back',
          'A soft light that does not wake the whole house at 3am',
          'A drawer or basket for the first weeks of clothes',
          'Somewhere within reach for dirty laundry',
        ],
      },
      {
        type: 'list',
        title: 'What can wait',
        items: [
          'Wall decoration and a room theme',
          'A fully matching furniture set',
          'The rug, the mobile, toy storage',
          'Blackout curtains, unless the room is particularly bright',
          'A second chest of drawers or a dedicated wardrobe',
        ],
      },
      {
        type: 'text',
        title: 'Why waiting is usually the right call',
        paragraphs: [
          'In the very first months, the baby sleeps near you, not alone in their room. The room itself gets used less than you would expect at first, and in three months you will know far better what you actually need: which clothing size comes back the most, how you actually organise things, where you actually spend the most time with the baby.',
          'Furnishing a whole room before the birth means guessing. Furnishing it as you go means adjusting to what really happens in your home.',
        ],
      },
      {
        type: 'text',
        title: 'Use what you already have',
        paragraphs: [
          'A basket, a shelf you already own, a drawer freed up in another room: that is enough to start. Dedicated "baby" storage becomes useful later, once the volume of clothes and toys has actually grown. Buying the ideal storage solution before knowing what needs storing is one of the most common, and least necessary, purchases of this period.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'The guidance on where a baby sleeps, including sharing a room for the first months, comes from [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). We go into it in detail in our article on cots and bedside cribs.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'poussette-choisir-sans-se-tromper',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Poussette : comment vraiment la choisir',
    titleEn: 'How to actually choose a pushchair',
    excerptFr:
      'Le bon choix ne se lit pas sur une fiche technique. Il se teste, pliée, en boutique, une main occupée par autre chose.',
    excerptEn:
      'The right choice does not come off a spec sheet. It gets tested, folded, in the shop, with one hand full.',
    readingMinutes: 5,
    heroAltFr: 'Choisir une poussette',
    heroAltEn: 'Choosing a pushchair',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les comparatifs de poussettes alignent des colonnes de caractéristiques : poids, nombre de roues, taille pliée, compatibilité nacelle. Ça donne l’impression qu’il existe une bonne réponse, universelle, qu’il suffirait de trouver.',
          'Il n’y en a pas. Il y a la poussette qui correspond à vos journées, et toutes les autres.',
        ],
      },
      {
        type: 'list',
        title: 'Les questions qui comptent vraiment',
        items: [
          'Vous la sortez et la rangez dans un coffre plusieurs fois par jour, ou elle reste dans une entrée ?',
          'Vous montez des escaliers sans ascenseur, seul(e), avec le bébé sur un bras ?',
          'Vos trajets sont surtout urbains, courts et fréquents, ou plus longs et moins nombreux ?',
          'Vous la pliez souvent d’une seule main, l’autre bras occupé ?',
          'Elle doit passer les portes de votre immeuble et tenir dans votre couloir ?',
        ],
      },
      {
        type: 'text',
        title: 'Tester, vraiment tester',
        paragraphs: [
          'En magasin, pliez-la vous-même. Ne laissez pas le vendeur le faire à votre place : le geste doit être simple pour vous, pas pour quelqu’un qui le répète cent fois par jour. Essayez-la d’une main, l’autre occupée par un sac ou un trousseau de clés, parce que c’est exactement la situation dans laquelle vous serez.',
          'Si vous avez une voiture, vérifiez que la poussette pliée entre vraiment dans le coffre. Un mètre ruban avant l’achat évite une mauvaise surprise le jour où vous en avez le plus besoin.',
          'Poussez-la dans l’allée du magasin, pas seulement du regard. La maniabilité d’une poussette se sent aux poignets et aux épaules, pas sur une fiche produit.',
        ],
      },
      {
        type: 'text',
        title: 'Il n’existe pas de poussette parfaite',
        paragraphs: [
          'Beaucoup de modèles promettent de tout faire, de la naissance à la maternelle, dans toutes les configurations possibles. Cette polyvalence a un revers : elle ajoute du poids, de la complexité, et des pièces que vous n’utiliserez peut-être jamais.',
          'Vos besoins à la naissance ne sont pas ceux de six mois plus tard. Un bébé qui ne tient pas assis n’a pas les mêmes exigences qu’un enfant qui explore. Il est tout à fait raisonnable de choisir pour la période qui vient, plutôt que pour toutes les périodes à la fois.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La meilleure poussette n’est pas celle qui a le plus d’options. C’est celle que vous pliez sans y penser, avec un bébé qui pleure et une main de libre.',
      },
      {
        type: 'text',
        title: 'Le format, pas la marque',
        paragraphs: [
          'Avant de regarder les marques, décidez du format qui correspond à votre vie : compacte et légère si vous marchez et prenez les transports, plus robuste si vous roulez beaucoup en extérieur, modulable si vous prévoyez plusieurs enfants rapprochés. Une fois le format choisi, les différences entre modèles comparables comptent surtout à la marge.',
          'Et si le doute persiste, l’occasion est une option sérieuse pour une poussette : c’est un des achats où la seconde main a le plus de sens, à condition de vérifier vous-même freins, roues et pliage.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Pushchair comparisons line up columns of specs: weight, number of wheels, folded size, carrycot compatibility. It looks like there is one correct answer out there, universal, that you just need to find.',
          'There is not. There is the pushchair that fits your actual days, and every other one.',
        ],
      },
      {
        type: 'list',
        title: 'The questions that actually matter',
        items: [
          'Do you lift it in and out of a car boot several times a day, or does it mostly live in a hallway?',
          'Do you climb stairs with no lift, alone, with the baby on one arm?',
          'Are your trips mostly short and urban, or longer and less frequent?',
          'Do you often fold it one-handed, the other arm full?',
          'Does it need to fit through your building’s doors and your hallway?',
        ],
      },
      {
        type: 'text',
        title: 'Test it, properly',
        paragraphs: [
          'In the shop, fold it yourself. Do not let the salesperson do it for you: the movement needs to be simple for you, not for someone who does it a hundred times a day. Try it one-handed, the other hand holding a bag or your keys, because that is exactly the situation you will be in.',
          'If you have a car, check that the folded pushchair genuinely fits your boot. A tape measure before buying avoids a bad surprise on the day you need it most.',
          'Push it down the shop aisle, not just look at it. A pushchair’s handling is felt in your wrists and shoulders, not on a spec sheet.',
        ],
      },
      {
        type: 'text',
        title: 'There is no perfect pushchair',
        paragraphs: [
          'Many models promise to do everything, from birth to preschool, in every configuration. That versatility has a cost: more weight, more complexity, and parts you may never use.',
          'What you need at birth is not what you will need six months later. A baby who cannot sit does not have the same requirements as a child who is exploring. It is entirely reasonable to choose for the stage that is coming, rather than for every stage at once.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The best pushchair is not the one with the most options. It is the one you fold without thinking, with a crying baby and one hand free.',
      },
      {
        type: 'text',
        title: 'Format first, brand second',
        paragraphs: [
          'Before looking at brands, decide on the format that matches your life: compact and light if you walk and take public transport, sturdier if you spend a lot of time outdoors, modular if you are planning more than one child close in age. Once the format is settled, the differences between comparable models mostly matter at the margins.',
          'And if you are still unsure, second-hand is a serious option for a pushchair: it is one of the purchases where it makes the most sense, provided you check the brakes, wheels and fold yourself.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'lit-bebe-cododo-ce-qui-change',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Lit de bébé et cododo : ce qui change, et à partir de quand',
    titleEn: 'Cot vs bedside crib: what changes, and from when',
    excerptFr:
      'Les repères de sécurité sur le couchage ne changent pas selon la mode. Voici ce que disent les autorités de santé, et ce qui différencie un lit classique d’un lit cododo.',
    excerptEn:
      'The safety points around sleep do not change with trends. Here is what the health authorities say, and what actually differs between a standalone cot and a bedside crib.',
    readingMinutes: 6,
    heroAltFr: 'Lit de bébé et cododo',
    heroAltEn: 'Cot and bedside crib safety',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          '« Cododo » est un mot qui recouvre plusieurs réalités très différentes, et la confusion ne vient pas de vous. Il peut désigner le partage de la chambre, un lit cododo fixé au lit parental, ou le partage du lit lui-même, ce qui n’est pas la même chose du tout.',
          'Voici ce que disent les autorités de santé françaises sur le couchage du bébé, et comment cela s’applique selon le lit choisi. Ce ne sont pas nos recommandations : ce sont celles d’[ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), que nous nous contentons de relayer.',
        ],
      },
      {
        type: 'list',
        title: 'Les points stables, quel que soit le lit',
        items: [
          'Le bébé dort sur le dos, à plat, la nuit comme pour les siestes',
          'Le matelas est ferme, et dimensionné exactement au lit, sans espace sur les côtés',
          'Aucun objet mou dans le lit : coussin, couette, tour de lit, gros doudou',
          'Le bébé a son propre espace de couchage, distinct de celui des parents',
          'La chambre reste fraîche, autour de 18 à 20°C, et aérée chaque jour',
        ],
      },
      {
        type: 'text',
        title: 'Le partage de la chambre, oui. Le partage du lit, une autre question',
        paragraphs: [
          'Selon ameli.fr, le partage de la chambre, le bébé à proximité mais dans son propre lit, est recommandé pendant les six premiers mois. C’est ce qu’on appelle le plus souvent le cododo en France.',
          'Ce n’est pas la même chose que de garder le bébé dans le lit des parents. Si vous l’y amenez pour une tétée ou un câlin, la recommandation est de le recoucher dans son propre lit avant de vous rendormir, et de ne jamais le garder si vous êtes très fatigué(e) ou sous traitement qui réduit la vigilance.',
        ],
      },
      {
        type: 'text',
        title: 'Le lit classique',
        paragraphs: [
          'Un lit à barreaux standard fonctionne dès la naissance ou à partir de quelques mois, selon le modèle. Vérifiez la conformité indiquée sur l’étiquette (norme EN 716 pour un lit), la fermeté et la bonne taille du matelas, et l’absence de tout ce qui est mou autour du bébé.',
          'C’est l’option la plus simple à faire durer : le même lit accompagne souvent l’enfant sur plusieurs années, avec juste un réglage de hauteur du sommier.',
        ],
      },
      {
        type: 'text',
        title: 'Le lit cododo, à part du lit parental',
        paragraphs: [
          'Un lit cododo se fixe au niveau du lit des parents, souvent avec un côté ouvert ou abaissé. Il répond directement à la logique du partage de chambre : le bébé est à portée de main, dans son propre espace de couchage.',
          'Sa durée d’usage est courte, plus courte que celle d’un lit classique. Dès que le bébé s’assoit seul, se met sur les mains, ou atteint la limite de poids indiquée par le fabricant, ce n’est plus un espace adapté. C’est un achat pensé pour une fenêtre de quelques mois, pas pour toute la première année.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La question n’est pas lit classique ou cododo. C’est : ce lit, dans ces conditions, respecte-t-il les mêmes points de sécurité que n’importe quel autre ?',
      },
      {
        type: 'callout',
        paragraphs: [
          'Ces repères viennent d’[ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). Ils évoluent parfois ; vérifiez-les directement en cas de doute, et parlez-en à votre sage-femme ou votre médecin pour votre situation particulière.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          '"Cododo" is a French term that covers several very different things, and the confusion is not your fault. It can mean sharing a room, a bedside crib attached to the parents’ bed, or sharing the bed itself, which is not the same thing at all.',
          'Here is what French health authorities say about safe baby sleep, and how it applies depending on which setup you choose. These are not our recommendations: they belong to [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), and we are simply relaying them.',
        ],
      },
      {
        type: 'list',
        title: 'The stable points, whichever bed you choose',
        items: [
          'The baby sleeps on their back, flat, at night and for naps',
          'The mattress is firm, and sized exactly to the bed, with no gap at the sides',
          'No soft objects in the bed: pillows, duvets, bumpers, large soft toys',
          'The baby has their own sleep surface, separate from the parents’',
          'The room stays cool, around 18 to 20°C, and is aired daily',
        ],
      },
      {
        type: 'text',
        title: 'Sharing a room, yes. Sharing a bed, a different question',
        paragraphs: [
          'According to ameli.fr, room-sharing, having the baby nearby but in their own bed, is recommended for the first six months. This is most often what "cododo" means in France.',
          'That is not the same as keeping the baby in the parents’ bed. If you bring them in for a feed or a cuddle, the guidance is to put them back in their own bed before you fall asleep again, and never to keep them with you if you are very tired or on medication that reduces alertness.',
        ],
      },
      {
        type: 'text',
        title: 'The standalone cot',
        paragraphs: [
          'A standard barred cot works from birth or from a few months, depending on the model. Check the compliance marking on the label (the EN 716 standard for a cot), that the mattress is firm and correctly sized, and that nothing soft sits around the baby.',
          'It is the simplest option to make last: the same cot often follows the child for several years, with just the base height adjusted.',
        ],
      },
      {
        type: 'text',
        title: 'The bedside crib, attached to the parents’ bed',
        paragraphs: [
          'A bedside crib attaches at the level of the parents’ bed, usually with one side open or lowered. It maps directly onto the room-sharing guidance: the baby is within reach, in their own sleep space.',
          'It is used for a shorter window than a standard cot. Once the baby can sit up alone, push up onto their hands, or reach the manufacturer’s stated weight limit, it stops being suitable. It is a purchase built for a window of a few months, not for the whole first year.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The question is not cot or bedside crib. It is: does this bed, in these conditions, meet the same safety points as any other?',
      },
      {
        type: 'callout',
        paragraphs: [
          'This guidance comes from [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). It is occasionally updated; check it directly if in doubt, and talk to your midwife or doctor about your own situation.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'allaitement-ou-biberon-le-materiel',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Allaitement ou biberon : le matériel, pas le choix',
    titleEn: 'Breastfeeding or bottle: the equipment, not the decision',
    excerptFr:
      'Ce choix vous appartient, il ne regarde que vous. Ce qu’on peut vous éviter, c’est d’acheter un kit complet pour une décision qui peut encore changer.',
    excerptEn:
      'That decision is yours alone. What we can help you avoid is buying a full kit for a choice that might still change.',
    readingMinutes: 4,
    heroAltFr: 'Matériel pour allaitement ou biberon',
    heroAltEn: 'Feeding equipment for a newborn',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Ce choix ne nous regarde pas, et il ne regarde personne d’autre que vous. Il dépend de votre corps, de votre situation, de ce qui se passe une fois que le bébé est là, et il peut changer en cours de route, dans un sens comme dans l’autre. Ce n’est pas notre rôle de vous orienter, et nous ne le ferons pas.',
          'Ce qu’on peut faire, c’est parler du matériel : ce qui sert vraiment pour l’un ou l’autre, sans acheter un kit complet avant même de savoir comment ça va se passer.',
        ],
      },
      {
        type: 'list',
        title: 'Si vous allaitez, pour commencer',
        items: [
          'Des hauts ou soutiens-gorge dans lesquels vous êtes à l’aise, faciles à ouvrir',
          'Quelques coussinets d’allaitement, si besoin, pas une caisse entière',
          'Un coussin d’allaitement, s’il vous aide à trouver une position confortable',
          'Une crème pour les moments où c’est nécessaire',
          'Un tire-lait, seulement si vous savez déjà que vous en aurez besoin : reprise du travail, séparation prévue',
        ],
      },
      {
        type: 'list',
        title: 'Si vous donnez le biberon, pour commencer',
        items: [
          'Quelques biberons pour démarrer, pas le pack de huit avec tous les accessoires',
          'Des tétines adaptées à l’âge : ça change vite, achetez-en peu à la fois',
          'Une casserole ou un stérilisateur, selon ce que vous préférez ; les deux fonctionnent',
          'Un chauffe-biberon, seulement si vous y tenez : un bain-marie fait le même travail',
        ],
      },
      {
        type: 'text',
        title: 'Le vrai piège : acheter avant de savoir',
        paragraphs: [
          'Beaucoup de futurs parents s’équipent en totalité pendant la grossesse, pour l’allaitement ou pour le biberon, alors que la réalité des premières semaines n’est pas encore connue. Un allaitement peut être plus compliqué que prévu, ou plus simple. Une décision de biberon peut évoluer vers un allaitement mixte, ou l’inverse.',
          'Acheter peu, au début, n’est pas une prise de risque. C’est la façon la plus simple de ne pas se retrouver avec du matériel jamais ouvert, pour une option qui, finalement, n’a pas eu lieu.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui sert, dans les deux cas',
        items: [
          'Des langes ou bavoirs, pour le renvoi de lait, en bien plus grande quantité que ce qu’on imagine',
          'Un endroit confortable où vous passerez du temps plusieurs fois par jour : un fauteuil que vous avez déjà fait souvent l’affaire',
          'Un moyen de noter les tétées ou les biberons, si vous en ressentez le besoin, papier ou application',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Ce choix vous appartient. Notre rôle s’arrête au matériel, pas à la décision. Pour toute question sur l’allaitement ou l’alimentation du bébé, votre sage-femme, votre médecin ou une consultante en lactation sont les bonnes personnes à qui parler.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This decision is not ours to weigh in on, and it is not anyone else’s either. It depends on your body, your circumstances, on how things go once the baby is actually here, and it can change along the way, in either direction. It is not our place to steer you, and we will not try.',
          'What we can do is talk about the equipment: what genuinely gets used either way, without buying a complete kit before you even know how things will go.',
        ],
      },
      {
        type: 'list',
        title: 'If you are breastfeeding, to start',
        items: [
          'Tops or bras you are comfortable in, easy to open',
          'A few breast pads, if needed, not a whole box',
          'A nursing pillow, if it helps you find a comfortable position',
          'A cream for the moments it is needed',
          'A breast pump, only if you already know you will need one: returning to work, a planned separation',
        ],
      },
      {
        type: 'list',
        title: 'If you are bottle-feeding, to start',
        items: [
          'A few bottles to begin with, not the pack of eight with every accessory',
          'Teats matched to age, which changes quickly, so buy a few at a time',
          'A pan or a steriliser, whichever you prefer; both work',
          'A bottle warmer, only if you want one: a bowl of hot water does the same job',
        ],
      },
      {
        type: 'text',
        title: 'The real trap: buying before you know',
        paragraphs: [
          'Many parents-to-be fully kit themselves out during pregnancy, for breastfeeding or for bottle-feeding, before knowing what the first weeks will actually look like. Breastfeeding can turn out harder than expected, or easier. A bottle-feeding decision can shift into mixed feeding, or the other way round.',
          'Buying little, at first, is not a risk. It is the simplest way to avoid ending up with equipment that never got opened, for an option that, in the end, did not happen.',
        ],
      },
      {
        type: 'list',
        title: 'What is useful either way',
        items: [
          'Muslins or bibs, for spit-up, in far greater quantity than you would expect',
          'A comfortable spot where you will spend time several times a day: a chair you already own will usually do',
          'A way to note feeds, if you want one, on paper or in an app',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'That decision belongs to you. Our role stops at the equipment, not the choice. For any question about breastfeeding or feeding your baby, your midwife, your doctor, or a lactation consultant are the right people to ask.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'seconde-main-bebe-ce-qui-se-reprend',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Seconde main : ce qui se reprend, et ce qui s’achète neuf',
    titleEn: 'Second-hand baby gear: what to reuse, and what to buy new',
    excerptFr:
      'Un habit s’use à l’œil. Un siège-auto ou un matelas, non. La différence tient à ce qu’on ne peut pas voir.',
    excerptEn:
      'You can see when clothes are worn out. A car seat or a mattress, not so much. The difference is what you cannot see.',
    readingMinutes: 6,
    heroAltFr: 'Achats bébé de seconde main',
    heroAltEn: 'Second-hand baby equipment',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Un bébé grandit plus vite que ses affaires ne s’usent. C’est ce qui rend le marché de la seconde main aussi sain pour cette période de la vie, et en France, il est particulièrement développé.',
          'Mais « seconde main, pourquoi pas » ne veut pas dire « tout se vaut ». Deux ou trois objets font exception, et la raison n’a rien à voir avec la mode ou une prudence excessive : elle tient à ce qu’on peut, ou non, vérifier soi-même.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi les vêtements, les meubles et les jouets ne posent pas de problème',
        paragraphs: [
          'Un body porté quelques semaines est, la plupart du temps, dans l’état d’un objet neuf : on voit l’usure à l’œil, un bouton manquant, une tache qui ne part pas. Une commode ou un fauteuil, c’est pareil : un pied qui bouge ou une vis desserrée, ça se repère et ça se répare.',
          'Ce qui rend ces objets sûrs en seconde main, ce n’est pas qu’ils sont sans risque en soi. C’est que leur état réel est visible. Vous n’avez pas besoin de connaître leur histoire pour juger s’ils conviennent : il suffit de les regarder et de les tester.',
        ],
      },
      {
        type: 'text',
        title: 'Le siège-auto : pourquoi l’historique compte plus que l’apparence',
        paragraphs: [
          'Un siège-auto fait son travail une fois, exactement au moment où il en a besoin, et ce travail consiste à absorber un choc que vous ne voyez jamais venir. Un document de la [délégation à la sécurité routière](https://www.interieur.gouv.fr/content/download/7441/70415/file/Siege-Auto.pdf) déconseille l’achat d’un siège d’occasion dont vous ne connaissez pas les antécédents avec certitude, précisément pour cette raison.',
          'Un choc, même à faible vitesse, peut créer des microfissures dans la coque, invisibles de l’extérieur. Elles ne se révèlent qu’au choc suivant, celui qui compte vraiment. Vous ne pouvez pas tester un siège-auto avant d’en avoir besoin, ce qui change tout : ici, l’apparence ne dit rien de l’état réel.',
          'Les matériaux vieillissent aussi. Les fabricants fixent une durée de vie limitée, indiquée sur l’étiquette du produit, au-delà de laquelle la coque et la mousse perdent leurs propriétés d’absorption, même sans choc, même sans avoir beaucoup servi.',
        ],
      },
      {
        type: 'text',
        title: 'Le matelas : pourquoi mou ne veut pas dire confortable',
        paragraphs: [
          'Un test mené par [UFC-Que Choisir](https://nievre.ufcquechoisir.fr/2018/11/30/matelas-pour-bebes-des-modeles-dangereux/) a classé une partie des matelas pour bébés testés comme insatisfaisants, pour des modèles jugés trop mous. Un matelas qui s’affaisse ou qui garde l’empreinte du corps peut se creuser sous le poids de la tête du bébé, ce qui pose un vrai problème s’il se retrouve sur le ventre.',
          'Un matelas d’occasion taché, creusé, ou dont vous ne connaissez pas l’âge n’offre pas les mêmes garanties qu’un matelas neuf, ferme et à la bonne taille. C’est un des rares objets où l’usure ne se voit pas toujours à l’œil.',
        ],
      },
      {
        type: 'list',
        title: 'Le réflexe en deux temps, avant tout achat d’occasion',
        items: [
          'Vérifiez la norme sur l’étiquette du produit, pas dans l’annonce : EN 716 pour un lit, R129 ou i-Size pour un siège-auto',
          'Cherchez le nom du produit avec le mot rappel sur [RappelConso](https://rappel.conso.gouv.fr/), le site officiel des rappels de produits',
          'Sachez que les produits d’occasion ne sont pas toujours couverts par les rappels : l’absence de résultat ne garantit rien à elle seule',
        ],
      },
      {
        type: 'quote',
        quote: 'Ce n’est pas la seconde main qui pose problème. C’est ce qu’on ne peut pas vérifier soi-même.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Sources : [délégation à la sécurité routière](https://www.interieur.gouv.fr/content/download/7441/70415/file/Siege-Auto.pdf), [UFC-Que Choisir](https://nievre.ufcquechoisir.fr/2018/11/30/matelas-pour-bebes-des-modeles-dangereux/), [RappelConso](https://rappel.conso.gouv.fr/).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A baby outgrows things faster than they wear out. That is what makes second-hand such a healthy market for this stage of life, and in France it is a particularly good one.',
          'But "second-hand, why not" does not mean "anything goes". Two or three items are the exception, and the reason has nothing to do with fashion or excess caution. It comes down to what you can, or cannot, check for yourself.',
        ],
      },
      {
        type: 'text',
        title: 'Why clothes, furniture and toys are not a problem',
        paragraphs: [
          'A bodysuit worn for a few weeks is, most of the time, in the same state as a new one: you can see wear with your own eyes, a missing button, a stain that will not come out. A chest of drawers or a chair is the same: a wobbly leg or a loose screw is easy to spot and easy to fix.',
          'What makes these items safe to buy second-hand is not that they carry no risk at all. It is that their real condition is visible. You do not need to know their history to judge whether they are fine; looking and testing them is enough.',
        ],
      },
      {
        type: 'text',
        title: 'The car seat: why its history matters more than its looks',
        paragraphs: [
          'A car seat does its job once, exactly when it is needed, and that job is absorbing an impact you never see coming. A document from France’s [road safety authority](https://www.interieur.gouv.fr/content/download/7441/70415/file/Siege-Auto.pdf) advises against buying a second-hand seat whose history you cannot be certain of, for exactly this reason.',
          'An impact, even at low speed, can create micro-fractures in the shell that are invisible from the outside. They only show up at the next impact, the one that actually matters. You cannot test a car seat before you need it, and that changes everything: here, appearance tells you nothing about the real condition.',
          'Materials also age. Manufacturers set a limited lifespan, printed on the product label, after which the shell and foam lose their ability to absorb impact, even without a crash, even without heavy use.',
        ],
      },
      {
        type: 'text',
        title: 'The mattress: why soft does not mean comfortable',
        paragraphs: [
          'A test by [UFC-Que Choisir](https://nievre.ufcquechoisir.fr/2018/11/30/matelas-pour-bebes-des-modeles-dangereux/) rated a share of the baby mattresses it tested as unsatisfactory, for being too soft. A mattress that sags or keeps the shape of a body can dip under the weight of a baby’s head, which is a real problem if the baby ends up on their stomach.',
          'A second-hand mattress that is stained, dipped, or whose age you do not know does not offer the same guarantees as a new one, firm and correctly sized. It is one of the few items where wear is not always visible to the eye.',
        ],
      },
      {
        type: 'list',
        title: 'Two habits, before any second-hand purchase',
        items: [
          'Check the standard on the product label, not in the listing: EN 716 for a cot, R129 or i-Size for a car seat',
          'Search the product name plus the word recall on [RappelConso](https://rappel.conso.gouv.fr/), the official French product recall site',
          'Know that second-hand products are not always covered by recalls: no result does not guarantee anything on its own',
        ],
      },
      {
        type: 'quote',
        quote: 'Second-hand is not the problem. What you cannot check yourself is.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Sources: France’s [road safety authority](https://www.interieur.gouv.fr/content/download/7441/70415/file/Siege-Auto.pdf), [UFC-Que Choisir](https://nievre.ufcquechoisir.fr/2018/11/30/matelas-pour-bebes-des-modeles-dangereux/), [RappelConso](https://rappel.conso.gouv.fr/).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'liste-naissance-la-faire-sans-culpabiliser',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Faire sa liste de naissance sans culpabiliser',
    titleEn: 'Making a birth list without the guilt',
    excerptFr:
      'Une liste trop longue paraît gourmande. Trop courte, ingrate. Voici comment en faire une qui sert vraiment à ceux qui veulent vous aider.',
    excerptEn:
      'Too long feels greedy. Too short feels ungrateful. Here is how to make one that actually helps the people who want to help you.',
    readingMinutes: 5,
    heroAltFr: 'Faire sa liste de naissance',
    heroAltEn: 'Making a birth registry',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La liste de naissance a un côté épreuve qu’on ne dit pas assez. Trop longue, elle paraît gourmande. Trop courte, on a peur de sembler ingrat, ou d’obliger les gens à deviner. Et de toute façon, une partie de l’entourage achètera hors liste.',
          'Le bon repère n’est pas la longueur. C’est l’utilité : une liste sert d’abord à ceux qui veulent vous offrir quelque chose, en leur évitant de deviner ce que vous avez déjà, ou ce dont vous n’avez pas besoin.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui rend une liste utile aux autres',
        items: [
          'Une fourchette de budgets, du petit geste au cadeau plus important, pour que chacun trouve sa place',
          'Un ordre de priorité clair, même informel : ce qui compte vraiment, et ce qui serait « en plus, si quelqu’un y tient »',
          'Peu d’articles, mais réels : mieux vaut dix choses qu’on utilisera que quarante par prudence',
          'Des indications concrètes quand c’est possible : taille, couleur si ça compte pour vous, plutôt que « un pyjama »',
        ],
      },
      {
        type: 'text',
        title: 'Dire non à un cadeau hors liste, sans plomber l’ambiance',
        paragraphs: [
          'Quelqu’un veut vous offrir quelque chose qui n’est pas sur la liste, ou en double d’un objet déjà offert. Vous n’êtes pas obligé(e) de tout accepter avec le sourire figé, mais vous n’êtes pas non plus obligé(e) de vous justifier longuement.',
          'Un remerciement sincère suffit, suivi si besoin d’une redirection simple : « C’est adorable, en fait ce qui nous aiderait vraiment c’est plutôt X. » La plupart des gens préfèrent qu’on leur dise, plutôt que d’offrir quelque chose qui finira dans un placard sans avoir servi.',
        ],
      },
      {
        type: 'text',
        title: 'Le cadeau à plusieurs',
        paragraphs: [
          'Pour les objets plus chers ou plus rarement offerts seuls, proposer un cadeau collectif évite d’accumuler plusieurs versions du même objet. Quelques personnes se cotisent, et vous évitez à la fois la gêne de demander quelque chose de coûteux et le risque de vous retrouver avec deux poussettes.',
        ],
      },
      {
        type: 'quote',
        quote: 'Une liste courte n’est pas un manque d’ambition. C’est un service rendu à ceux qui veulent vous aider.',
      },
      {
        type: 'text',
        title: 'Et si un doublon arrive quand même',
        paragraphs: [
          'Ça arrivera, malgré tout. Gardez les tickets ou les preuves d’achat quand vous le pouvez, renseignez-vous sur les politiques d’échange avant même d’en avoir besoin, et acceptez qu’un objet en double n’ait pas besoin d’être géré à la perfection. Il peut attendre dans un carton, être échangé plus tard, ou rendre service à quelqu’un d’autre. Ce n’est pas un échec de votre liste.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A birth list has a way of feeling like a test nobody warns you about. Too long, and it looks greedy. Too short, and you worry about seeming ungrateful, or making people guess. Either way, some people will buy off the list regardless.',
          'The right measure is not length. It is usefulness: a list first serves the people who want to give you something, by saving them from guessing what you already have, or what you do not need.',
        ],
      },
      {
        type: 'list',
        title: 'What makes a list useful to other people',
        items: [
          'A spread of budgets, from small gestures to bigger gifts, so everyone finds their place',
          'A clear order of priority, even an informal one: what genuinely matters, and what would be "nice, if someone insists"',
          'Few items, but real ones: ten things you will use beat forty bought just in case',
          'Concrete details where you can give them: size, colour if it matters to you, rather than just "a sleepsuit"',
        ],
      },
      {
        type: 'text',
        title: 'Saying no to an off-list gift, without souring the mood',
        paragraphs: [
          'Someone wants to give you something that is not on the list, or a duplicate of something you already have. You do not have to accept everything with a fixed smile, but you do not have to explain yourself at length either.',
          'A genuine thank you is enough, followed if needed by a simple redirect: "That’s so kind, actually what would really help us is X." Most people would rather be told than give something that ends up unused in a cupboard.',
        ],
      },
      {
        type: 'text',
        title: 'The group gift',
        paragraphs: [
          'For pricier items, or ones rarely given alone, suggesting a group gift avoids ending up with several versions of the same thing. A few people chip in together, and you avoid both the awkwardness of asking for something expensive and the risk of ending up with two pushchairs.',
        ],
      },
      {
        type: 'quote',
        quote: 'A short list is not a lack of ambition. It is a favour to the people who want to help you.',
      },
      {
        type: 'text',
        title: 'And if a duplicate arrives anyway',
        paragraphs: [
          'It will happen, regardless. Keep receipts or proof of purchase where you can, look into exchange policies before you actually need them, and accept that a duplicate does not need to be handled perfectly. It can sit in a box, get exchanged later, or be useful to someone else. It is not a failure of your list.',
        ],
      },
    ],
  }),
];

export const POSTS_ACHATS_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_ACHATS_EN: BlogPost[] = pairs.map((p) => p.en);
