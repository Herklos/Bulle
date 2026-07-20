/**
 * Tier 3 — the quantity articles.
 *
 * The gap these fill: every French layette guide lists WHAT to buy and almost none of them
 * say HOW MANY, which is the only part a first-time parent cannot work out alone. "Des
 * bodies" is not an answer. Twelve is.
 *
 * Same house rules as blog-posts-achats.ts: no prices, no brands, no product picks. Numbers
 * are middles taken from French consumer sources cross-checked against the NHS newborn list,
 * always given with the assumption that produced them (a wash every three or four days),
 * because a number without its assumption is how a guide ends up wrong for half its readers.
 *
 * Where a claim touches safety, it is attributed inline to ameli or sante.fr and never
 * presented as our own reasoning (§7.3). That constraint bites hardest on bedding: retail
 * layette lists still sell cot bumpers and full bedding sets, and official French guidance
 * says nothing but a gigoteuse in the bed before two years. We print the official position.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'combien-de-bodies-pyjamas-couches',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Combien de bodies, de pyjamas, de couches : les quantités qui servent vraiment',
    titleEn: 'How many bodysuits, sleepsuits and nappies you actually need',
    excerptFr:
      'Les listes de naissance disent quoi acheter, presque jamais combien. Voici des chiffres, et surtout ce qui les fait varier chez vous.',
    excerptEn:
      'Baby lists tell you what to buy and almost never how many. Here are the numbers, and what actually changes them in your home.',
    readingMinutes: 7,
    heroAltFr: 'Les quantités de layette pour un nouveau-né',
    heroAltEn: 'Layette quantities for a newborn',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La plupart des listes de naissance vous disent quoi acheter. Très peu vous disent combien, et c’est pourtant la seule partie que vous ne pouvez pas deviner seul. « Des bodies » n’est pas une réponse utilisable un samedi après-midi en magasin.',
          'Voici des quantités concrètes, avec à chaque fois l’hypothèse qui les produit. Ce point compte plus que le chiffre lui-même : tous les nombres ci-dessous supposent une lessive tous les trois ou quatre jours. Si vous lancez une machine par jour, comptez à peu près la moitié de tout.',
        ],
      },
      {
        type: 'text',
        title: 'Les vêtements',
        paragraphs: [
          'Une douzaine de bodies au total, répartis entre manches courtes et manches longues selon la saison. Et surtout : peu en taille naissance, davantage en 1 mois. Un bébé né à terme quitte souvent la taille naissance en deux ou trois semaines, et les bodies neufs jamais portés sont le regret le plus fréquent de cette période.',
          'Une dizaine de pyjamas, même logique de répartition. C’est le vêtement principal des premières semaines, jour et nuit, et les régurgitations comme les fuites de couche en font changer deux à trois fois par jour. En hiver, visez le haut de la fourchette : le séchage est plus lent.',
          'Le reste est nettement plus léger qu’on ne le croit : trois gilets, cinq paires de chaussettes, deux bonnets, huit bavoirs. Les bavoirs sont le poste où l’on est le plus vite à court, parce qu’ils épargnent un changement complet de tenue à chaque régurgitation.',
        ],
      },
      {
        type: 'list',
        title: 'Les quantités, en un coup d’œil',
        items: [
          'Bodies : 12 au total, environ 5 en taille naissance et 7 en 1 mois',
          'Pyjamas et dors-bien : 11, même répartition',
          'Gigoteuses : 2 au minimum, 3 pour ne jamais courir après la lessive',
          'Brassières ou gilets : 3, un peu plus pour une naissance en plein hiver',
          'Chaussettes : 5 paires, elles disparaissent avec une régularité déconcertante',
          'Bonnets : 2, quelle que soit la saison',
          'Bavoirs : 8, jusqu’à 10 si le bébé régurgite beaucoup',
          'Couches taille 1 : 2 ou 3 paquets avant la naissance, pas davantage',
          'Langes et carrés de coton : 6 au minimum',
          'Gants de toilette : 4 ou 5, dédiés au bébé',
          'Capes ou serviettes de bain : 2',
          'Draps housse : 4 pour un lit 60 sur 120',
        ],
      },
      {
        type: 'text',
        title: 'Les couches, et pourquoi il ne faut pas faire de stock',
        paragraphs: [
          'Un nouveau-né utilise huit à douze couches par jour, soit autour de 280 sur le premier mois. Le chiffre impressionne, et il fait faire à beaucoup de familles la même erreur : acheter un carton d’une seule taille.',
          'Beaucoup de bébés passent en taille 2 avant d’avoir fini les paquets de taille 1, et une couche trop petite fuit. Deux ou trois paquets avant la naissance suffisent largement. Si vous hésitez entre des marques, achetez un paquet de plusieurs plutôt qu’un carton d’une seule : les coupes et les tailles ne se valent pas d’un fabricant à l’autre.',
        ],
      },
      {
        type: 'text',
        title: 'Le lit, où le nombre à retenir est zéro',
        paragraphs: [
          'C’est la seule ligne de cet article qui ne relève pas du confort. Le bébé dort sur le dos, sur un matelas ferme et plat aux dimensions exactes du lit, sans espace entre le matelas et les barreaux.',
          'Ni couverture, ni couette, ni oreiller, ni tour de lit, ni peluche jusqu’à deux ans. La gigoteuse remplace tout cela, et c’est précisément ce à quoi elle sert. Les repères viennent d’[ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) et de l’Association française de pédiatrie ambulatoire, relayée par [sante.fr](https://www.sante.fr/comment-coucher-votre-bebe-pour-lui-assurer-confort-et-securite).',
          'Cela mérite d’être dit clairement, parce que beaucoup de listes de naissance vendues en magasin proposent encore des tours de lit et des parures complètes. Ce n’est pas une question de goût.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui fait vraiment bouger ces chiffres',
        paragraphs: [
          'La fréquence des lessives, d’abord, et de loin. Une machine par jour divise à peu près tout par deux. C’est la variable la plus puissante, et c’est aussi la seule que personne ne pense à vérifier avant d’acheter.',
          'La saison ensuite, qui déplace le curseur entre manches courtes et manches longues et rend un nid d’ange utile ou inutile. Puis le mode d’alimentation : au biberon, comptez environ six flacons, trois petits et trois grands. En allaitement, un ou deux suffisent pour les relais.',
          'Un dernier point sur le tire-lait, qui figure sur presque toutes les listes d’achats : il se loue en pharmacie sur prescription et il est remboursé. L’acheter neuf avant la naissance, sans savoir si vous en aurez l’usage, est rarement le bon calcul.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un chiffre sans son hypothèse n’est pas un conseil. Douze bodies pour une lessive tous les quatre jours, six pour une lessive quotidienne : c’est la même recommandation.',
      },
      {
        type: 'text',
        title: 'Compter plutôt que cocher',
        paragraphs: [
          'Une case à cocher répond mal à une question de stock. Si vous avez deux pyjamas sur onze, vous avez fait un vrai bout du chemin, et pourtant cocher la case dirait que c’est fini quand la laisser vide dirait que rien n’est commencé.',
          'C’est pour cette raison que Bulle compte ces tâches au lieu de les cocher, avec un repère chiffré que vous ajustez librement. Les cadeaux, les vêtements de seconde main et les prêts d’une sœur ou d’une amie arrivent en désordre, sur plusieurs mois : ce qui manque n’est jamais une liste, c’est un décompte.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Most baby lists tell you what to buy. Very few tell you how many, and that is the one part you cannot work out on your own. "Some bodysuits" is not a usable answer on a Saturday afternoon in a shop.',
          'Here are concrete quantities, each with the assumption behind it. That assumption matters more than the number: everything below assumes a wash every three or four days. If you run a load daily, take roughly half of all of it.',
        ],
      },
      {
        type: 'text',
        title: 'Clothes',
        paragraphs: [
          'A dozen bodysuits in total, split between short and long sleeves depending on the season. And above all: few in newborn size, more in 1 month. A full-term baby often outgrows newborn in two or three weeks, and unworn newborn clothes are the most common regret of this whole period.',
          'About ten sleepsuits, split the same way. This is the main garment of the early weeks, day and night, and possets and nappy leaks mean changing them two or three times a day. In winter, aim for the top of the range, because drying takes longer.',
          'The rest is much lighter than people expect: three cardigans, five pairs of socks, two hats, eight bibs. Bibs are the item you run out of first, because they save a full change of clothes at every posset.',
        ],
      },
      {
        type: 'list',
        title: 'The quantities, at a glance',
        items: [
          'Bodysuits: 12 in total, roughly 5 in newborn and 7 in 1 month',
          'Sleepsuits: 11, split the same way',
          'Sleep sacks: 2 at minimum, 3 to never chase the laundry',
          'Cardigans: 3, a few more for a midwinter birth',
          'Socks: 5 pairs, they vanish with remarkable consistency',
          'Hats: 2, whatever the season',
          'Bibs: 8, up to 10 if your baby brings up a lot of milk',
          'Size 1 nappies: 2 or 3 packs before the birth, no more',
          'Muslin squares: 6 at minimum',
          'Washcloths: 4 or 5, kept for the baby',
          'Hooded towels: 2',
          'Fitted sheets: 4 for a 60 by 120 cot',
        ],
      },
      {
        type: 'text',
        title: 'Nappies, and why not to stockpile',
        paragraphs: [
          'A newborn goes through eight to twelve nappies a day, around 280 across the first month. The figure is striking, and it leads a lot of families into the same mistake: buying a case of a single size.',
          'Many babies move up to size 2 before finishing the size 1 packs, and a nappy that is too small leaks. Two or three packs before the birth is plenty. If you are torn between brands, buy one pack of several rather than a case of one: cuts and sizing vary a lot between makers.',
        ],
      },
      {
        type: 'text',
        title: 'The cot, where the number is zero',
        paragraphs: [
          'This is the one line in this article that is not about comfort. The baby sleeps on their back, on a firm flat mattress cut to the exact size of the cot, with no gap between the mattress and the bars.',
          'No blanket, duvet, pillow, cot bumper or soft toy until age two. The sleep sack replaces all of it, which is exactly what it is for. The guidance comes from [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) and from the French association of ambulatory paediatrics, republished by [sante.fr](https://www.sante.fr/comment-coucher-votre-bebe-pour-lui-assurer-confort-et-securite).',
          'It is worth saying plainly, because plenty of baby lists sold in shops still include cot bumpers and full bedding sets. This is not a matter of taste.',
        ],
      },
      {
        type: 'text',
        title: 'What actually moves these numbers',
        paragraphs: [
          'Laundry frequency, first and by a distance. A load a day roughly halves everything. It is the most powerful variable, and the one nobody thinks to check before buying.',
          'Season next, which shifts the balance between short and long sleeves and makes a pramsuit either useful or pointless. Then feeding: for bottle feeding, count on about six bottles, three small and three large. If you are breastfeeding, one or two cover the occasional handover.',
          'One last note on breast pumps, which appear on nearly every shopping list: in France they are rented from a pharmacy on prescription and reimbursed. Buying one new before the birth, without knowing whether you will use it, is rarely the right call.',
        ],
      },
      {
        type: 'quote',
        quote:
          'A number without its assumption is not advice. Twelve bodysuits for a wash every four days, six for a daily wash: that is the same recommendation.',
      },
      {
        type: 'text',
        title: 'Counting rather than ticking',
        paragraphs: [
          'A checkbox answers a stock question badly. If you own two sleepsuits out of eleven you have done a real part of the work, yet ticking the box says it is finished while leaving it empty says nothing has started.',
          'That is why Bulle counts these tasks instead of ticking them, with a suggested figure you are free to adjust. Gifts, second-hand clothes and a bag of hand-me-downs from a sister arrive out of order, across several months: what is missing is never a list, it is a running total.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'liste-naissance-combien-de-chaque',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Liste de naissance : combien demander de chaque chose',
    titleEn: 'Baby list: how many of each thing to ask for',
    excerptFr:
      'Une liste de naissance qui ne dit pas les quantités reçoit huit tenues de trois mois et aucun drap. Voici comment la cadrer.',
    excerptEn:
      'A baby list with no quantities gets you eight three-month outfits and no sheets. Here is how to frame it.',
    readingMinutes: 6,
    heroAltFr: 'Cadrer les quantités sur une liste de naissance',
    heroAltEn: 'Setting quantities on a baby list',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le problème d’une liste de naissance n’est presque jamais qu’elle soit trop courte. C’est qu’elle ne dit pas combien, et que personne autour de vous ne le sait non plus.',
          'Le résultat est toujours le même : beaucoup de jolies tenues en taille trois mois, offertes en même temps, et aucun drap housse. Les invités achètent ce qui fait plaisir à offrir, ce qui n’est pas ce qui vous servira à trois heures du matin en semaine deux.',
        ],
      },
      {
        type: 'text',
        title: 'Écrivez les nombres, pas seulement les objets',
        paragraphs: [
          'Une ligne « bodies » se traduit dans la tête de chacun par « j’en prends deux ou trois », multiplié par le nombre d’invités, dans la taille qui leur semble mignonne. Une ligne « bodies taille naissance, 5 » se traduit par cinq bodies en taille naissance.',
          'C’est le seul vrai levier dont vous disposez. Une liste sans quantités n’est pas une liste, c’est une suggestion de thème, et elle sera interprétée par vingt personnes qui ne se parlent pas entre elles.',
        ],
      },
      {
        type: 'list',
        title: 'Les quantités à indiquer',
        items: [
          'Bodies : 12 au total, en précisant 5 en taille naissance et 7 en 1 mois',
          'Pyjamas : 11, même répartition entre les deux tailles',
          'Gigoteuses : 3, en précisant l’indice TOG selon la saison de naissance',
          'Bavoirs : 8, petits modèles en éponge plutôt que les grands rigides',
          'Langes : 6 au minimum, en mélangeant les formats',
          'Draps housse : 4, aux dimensions exactes de votre matelas',
          'Capes de bain : 2, gants de toilette : 5',
          'Biberons : 6 si vous prévoyez le biberon, 1 ou 2 en complément d’un allaitement',
        ],
      },
      {
        type: 'text',
        title: 'Demandez des tailles, pas des mois de naissance',
        paragraphs: [
          'La taille naissance est celle où l’on reçoit le plus et où le bébé reste le moins : deux à trois semaines pour beaucoup d’enfants nés à terme. La taille 1 mois est celle qui manque toujours.',
          'Indiquez-le explicitement sur la liste. C’est contre-intuitif pour quelqu’un qui offre : la taille naissance semble être le cadeau évident pour une naissance, et c’est précisément celle qui finit non portée, étiquette encore dessus.',
          'Même logique pour la saison. Un bébé né en novembre passera son premier printemps en taille six mois : les tenues d’été en taille naissance ne serviront jamais.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui n’a pas sa place sur la liste',
        paragraphs: [
          'Les tours de lit, les parures complètes, les couvertures et les oreillers sont encore vendus en coffret naissance dans beaucoup d’enseignes. Selon [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), rien de tout cela ne doit se trouver dans le lit avant deux ans. Une gigoteuse à la bonne taille est le bon cadeau à la place.',
          'Le tire-lait non plus : il se loue en pharmacie sur prescription et il est remboursé. Quelqu’un qui veut vraiment aider peut plutôt offrir un coussin d’allaitement, des coussinets lavables, ou tout simplement des repas congelés.',
          'Et un mot sur le siège-auto : c’est un cadeau groupé fréquent, et c’est très bien, à condition qu’il soit neuf. Un siège ayant subi un choc, même invisible, perd une partie de sa protection. Ce n’est pas un poste où la seconde main sans historique connu a du sens.',
        ],
      },
      {
        type: 'text',
        title: 'Prévoir moins que vous ne pensez',
        paragraphs: [
          'Il vaut mieux une liste courte et complétée qu’une liste longue et remplie à moitié dans les mauvaises catégories. Vous compléterez vous-même en cours de route, et vous le ferez avec bien plus de justesse une fois le bébé là.',
          'Beaucoup de familles se retrouvent avec trop de vêtements et pas assez de basiques ennuyeux : draps, langes, bavoirs. Ce sont pourtant ceux-là qui tournent en machine toutes les semaines pendant un an.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The problem with a baby list is almost never that it is too short. It is that it does not say how many, and nobody around you knows either.',
          'The result is always the same: a lot of lovely outfits in three-month size, all given at once, and no fitted sheets. Guests buy what is nice to give, which is not what will help you at three in the morning in week two.',
        ],
      },
      {
        type: 'text',
        title: 'Write the numbers, not just the items',
        paragraphs: [
          'A line reading "bodysuits" translates in each person\'s head into "I will get two or three", multiplied by the number of guests, in whichever size looked cute. A line reading "bodysuits, newborn size, 5" translates into five newborn bodysuits.',
          'That is the only real lever you have. A list without quantities is not a list, it is a theme suggestion, and it will be interpreted by twenty people who are not talking to each other.',
        ],
      },
      {
        type: 'list',
        title: 'The quantities to state',
        items: [
          'Bodysuits: 12 total, specifying 5 in newborn and 7 in 1 month',
          'Sleepsuits: 11, split the same way',
          'Sleep sacks: 3, stating the TOG for the season of the birth',
          'Bibs: 8, small towelling ones rather than the stiff wide ones',
          'Muslin squares: 6 at minimum, in mixed sizes',
          'Fitted sheets: 4, cut to your exact mattress size',
          'Hooded towels: 2, washcloths: 5',
          'Bottles: 6 if you plan to bottle-feed, 1 or 2 alongside breastfeeding',
        ],
      },
      {
        type: 'text',
        title: 'Ask for sizes, not birth months',
        paragraphs: [
          'Newborn size is the one you receive most of and the one the baby stays in least: two to three weeks for many full-term babies. The 1 month size is the one that is always missing.',
          'Say so explicitly on the list. It is counter-intuitive for someone buying a gift, because newborn size looks like the obvious present for a newborn, and it is precisely the one that ends up unworn with the tag still on.',
          'The same goes for season. A baby born in November will spend their first spring in six-month size, so newborn summer outfits will never be worn.',
        ],
      },
      {
        type: 'text',
        title: 'What does not belong on the list',
        paragraphs: [
          'Cot bumpers, full bedding sets, blankets and pillows are still sold as newborn gift boxes in plenty of shops. According to [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), none of it should be in the cot before age two. A correctly sized sleep sack is the right gift instead.',
          'Nor a breast pump: in France it is rented from a pharmacy on prescription and reimbursed. Someone who genuinely wants to help could give a nursing pillow, washable breast pads, or simply frozen meals.',
          'And a word on car seats: they are a common group gift, which is a good idea, provided it is new. A seat that has been in a collision loses part of its protection even when the damage is invisible. This is not a place where second-hand with no known history makes sense.',
        ],
      },
      {
        type: 'text',
        title: 'Plan for less than you think',
        paragraphs: [
          'A short list that gets completed beats a long one half-filled in the wrong categories. You will fill the gaps yourself along the way, and you will do it far more accurately once the baby is here.',
          'A lot of families end up with too many clothes and not enough of the boring basics: sheets, muslins, bibs. Those are the ones that go through the machine every week for a year.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'cadeau-naissance-ce-qui-sert-vraiment',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Cadeau de naissance : ce qui sert vraiment quand on ne sait pas quoi offrir',
    titleEn: 'Newborn gifts: what actually gets used',
    excerptFr:
      'La taille naissance est déjà offerte en double. Voici ce qui manque réellement, et ce qui vaut mieux qu’un objet.',
    excerptEn:
      'Newborn size has already been given twice over. Here is what is genuinely missing, and what beats an object.',
    readingMinutes: 5,
    heroAltFr: 'Choisir un cadeau de naissance utile',
    heroAltEn: 'Choosing a useful newborn gift',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Si vous cherchez quoi offrir pour une naissance, partez d’un constat simple : la taille naissance a déjà été offerte trois fois, et souvent en tenues de sortie. Ce qui manque est nettement moins photogénique.',
          'Cet article s’adresse aux invités plus qu’aux parents. Il n’y a rien de mal à offrir une jolie tenue, mais si vous voulez que votre cadeau serve, il existe des choix bien plus sûrs.',
        ],
      },
      {
        type: 'text',
        title: 'Décalez la taille',
        paragraphs: [
          'Le geste le plus utile ne coûte rien : offrez en taille 1 mois, 3 mois ou 6 mois plutôt qu’en taille naissance. Un bébé né à terme quitte souvent la taille naissance en deux ou trois semaines, et c’est la taille que tout le monde achète.',
          'Pensez aussi à la saison que le vêtement rencontrera réellement. Un bébé né en novembre aura six mois en mai : une brassière en taille six mois ne servira jamais, un tee-shirt léger en taille six mois, si.',
          'Gardez le ticket de caisse ou passez par une enseigne qui échange facilement. C’est une attention, pas un manque de confiance : les parents reçoivent souvent quatre fois la même chose.',
        ],
      },
      {
        type: 'list',
        title: 'Les cadeaux qui manquent presque toujours',
        items: [
          'Des langes en coton, six ou plus, en formats mélangés : l’objet le plus polyvalent de la layette',
          'Des bavoirs en éponge souple, par lot de quatre ou plus',
          'Des draps housse, si vous connaissez la taille du lit',
          'Une gigoteuse à l’indice TOG adapté à la saison, en taille 6 mois plutôt que naissance',
          'Des capes de bain et des gants de toilette',
          'Un lot de chaussettes, qui disparaissent en permanence',
          'Un coussin d’allaitement, ou des coussinets lavables',
        ],
      },
      {
        type: 'text',
        title: 'Ce qu’il vaut mieux éviter',
        paragraphs: [
          'Les coffrets de lit complets, avec tour de lit, couverture ou oreiller. Ils se vendent encore partout, et selon [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) rien de tout cela ne doit se trouver dans le lit avant deux ans. Une gigoteuse est le cadeau équivalent, et elle, elle servira.',
          'Les grosses peluches, pour la même raison : elles ne peuvent pas dormir avec le bébé, et il en arrive toujours plus que nécessaire.',
          'Le siège-auto d’occasion, sauf si vous en connaissez l’histoire complète. Un siège ayant subi un choc, même sans trace visible, perd une partie de sa protection.',
          'Et les tenues de sortie en taille naissance, qui sont exactement ce que tout le monde apporte déjà.',
        ],
      },
      {
        type: 'text',
        title: 'Le meilleur cadeau n’est souvent pas un objet',
        paragraphs: [
          'Des repas congelés, livrés en portions individuelles et étiquetées. Une machine de linge pliée. Une heure passée à tenir le bébé pendant que quelqu’un dort. Ce sont les cadeaux dont les parents parlent encore un an après, et personne ne les offre.',
          'Si vous tenez à un objet, un cadeau groupé sur une pièce vraiment coûteuse est plus utile que dix petits cadeaux séparés. La poussette, le siège-auto neuf ou le lit sont des postes où l’effort collectif change réellement quelque chose.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Personne n’a jamais reçu trop de langes. À peu près tout le monde a reçu trop de tenues en taille naissance.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'If you are wondering what to give for a new baby, start from one fact: newborn size has already been given three times over, usually as going-out outfits. What is missing is considerably less photogenic.',
          'This one is for guests more than parents. There is nothing wrong with a lovely outfit, but if you want your gift to get used, there are far safer bets.',
        ],
      },
      {
        type: 'text',
        title: 'Shift the size up',
        paragraphs: [
          'The most useful move costs nothing: give 1 month, 3 month or 6 month rather than newborn. A full-term baby often outgrows newborn in two or three weeks, and newborn is what everyone buys.',
          'Think about the season the garment will actually meet, too. A baby born in November will be six months old in May: a six-month cardigan will never be worn, a light six-month t-shirt will.',
          'Keep the receipt, or buy somewhere that exchanges easily. It is a courtesy, not a lack of confidence: parents often receive the same thing four times.',
        ],
      },
      {
        type: 'list',
        title: 'The gifts that are nearly always missing',
        items: [
          'Cotton muslin squares, six or more in mixed sizes: the most versatile thing in the layette',
          'Soft towelling bibs, in packs of four or more',
          'Fitted sheets, if you know the cot size',
          'A sleep sack at the right TOG for the season, in 6 month rather than newborn',
          'Hooded towels and washcloths',
          'A multipack of socks, which disappear constantly',
          'A nursing pillow, or washable breast pads',
        ],
      },
      {
        type: 'text',
        title: 'What to avoid',
        paragraphs: [
          'Full cot sets with bumpers, blankets or pillows. They are still sold everywhere, and according to [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) none of it belongs in the cot before age two. A sleep sack is the equivalent gift, and it will actually be used.',
          'Large soft toys, for the same reason: they cannot sleep with the baby, and more of them arrive than anyone needs.',
          'A second-hand car seat, unless you know its full history. A seat that has been in a collision loses part of its protection even with no visible damage.',
          'And newborn-size going-out outfits, which are exactly what everyone else is already bringing.',
        ],
      },
      {
        type: 'text',
        title: 'The best gift often is not an object',
        paragraphs: [
          'Frozen meals, delivered in labelled single portions. A load of laundry, folded. An hour holding the baby while someone sleeps. These are the gifts parents still talk about a year later, and nobody gives them.',
          'If you would rather give an object, clubbing together on one genuinely expensive item beats ten small separate gifts. The pram, a new car seat or the cot are places where a collective effort actually changes something.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Nobody has ever received too many muslin squares. Almost everybody has received too many newborn-size outfits.',
      },
    ],
  }),
  postPair({
    slug: 'couches-combien-par-jour-premier-mois',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Couches : combien par jour, combien le premier mois, quelle taille acheter',
    titleEn: 'Nappies: how many a day, how many in the first month, which size to buy',
    excerptFr:
      'Huit à douze par jour, environ 280 le premier mois. Et surtout : pourquoi il ne faut pas acheter un carton d’une seule taille.',
    excerptEn:
      'Eight to twelve a day, around 280 in the first month. And above all: why not to buy a case of one size.',
    readingMinutes: 5,
    heroAltFr: 'Combien de couches prévoir pour un nouveau-né',
    heroAltEn: 'How many nappies to plan for a newborn',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est l’une des rares questions de la layette qui a une réponse chiffrée nette : un nouveau-né utilise huit à douze couches par jour, soit environ 280 sur le premier mois.',
          'Le rythme correspond à un change toutes les deux à trois heures, plus les changes supplémentaires. Il se calme nettement après quelques semaines, et l’essentiel de ce que vous lirez ailleurs sur « le budget couches » extrapole à tort ce pic des premières semaines sur toute l’année.',
        ],
      },
      {
        type: 'text',
        title: 'Combien acheter avant la naissance',
        paragraphs: [
          'Deux ou trois paquets de taille 1, soit environ quarante à soixante couches. Pas davantage, et c’est la recommandation la plus contre-intuitive de tout cet article.',
          'La raison est simple : beaucoup de bébés passent en taille 2 avant d’avoir fini les paquets de taille 1. Une couche trop petite fuit, et un carton entier de taille naissance non ouvert ne se revend pas.',
          'Un bébé plus gros que la moyenne peut même sauter la taille naissance entièrement. Vous ne le saurez qu’une fois qu’il sera là.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Par jour, les premières semaines : 8 à 12 couches',
          'Sur le premier mois : environ 280',
          'À acheter avant la naissance : 2 à 3 paquets de taille 1',
          'Change type : toutes les 2 à 3 heures, plus les changes supplémentaires',
          'Pour la maternité : vérifiez d’abord, la plupart les fournissent',
        ],
      },
      {
        type: 'text',
        title: 'Les marques ne se valent pas, les tailles non plus',
        paragraphs: [
          'Les coupes et les tailles diffèrent sensiblement d’un fabricant à l’autre. Une taille 1 chez l’un peut tailler nettement plus petit que chez l’autre, et l’ajustement autour des cuisses compte plus que le chiffre imprimé sur le paquet.',
          'Si vous hésitez, achetez un paquet de plusieurs marques plutôt qu’un carton d’une seule. C’est le seul test qui compte, et il coûte le prix de deux paquets.',
        ],
      },
      {
        type: 'text',
        title: 'Et pour la valise de maternité',
        paragraphs: [
          'Un paquet suffit largement, et souvent aucun n’est nécessaire. La majorité des maternités françaises fournissent les couches pendant le séjour, certaines fournissent aussi les produits de toilette.',
          'C’est une question à poser directement à votre maternité lors de l’inscription, en même temps que la liste de ce qu’elle demande d’apporter. Cela évite de porter trois kilos de couches pour rien.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This is one of the few layette questions with a clean numerical answer: a newborn goes through eight to twelve nappies a day, around 280 across the first month.',
          'That works out to a change every two to three hours, plus the extra ones. It eases noticeably after a few weeks, and most of what you will read elsewhere about "the nappy budget" wrongly extrapolates this early peak across a whole year.',
        ],
      },
      {
        type: 'text',
        title: 'How many to buy before the birth',
        paragraphs: [
          'Two or three packs of size 1, so roughly forty to sixty nappies. No more, and it is the most counter-intuitive recommendation in this article.',
          'The reason is simple: many babies move up to size 2 before finishing the size 1 packs. A nappy that is too small leaks, and an unopened case of newborn size cannot be resold.',
          'A larger than average baby may skip newborn size entirely. You will only know once they are here.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Per day in the early weeks: 8 to 12 nappies',
          'Across the first month: around 280',
          'To buy before the birth: 2 to 3 packs of size 1',
          'Typical change: every 2 to 3 hours, plus the extra ones',
          'For the hospital: check first, most maternity units supply them',
        ],
      },
      {
        type: 'text',
        title: 'Brands differ, and so do sizes',
        paragraphs: [
          'Cuts and sizing vary noticeably between makers. A size 1 from one brand can run considerably smaller than another, and the fit around the thighs matters more than the number on the pack.',
          'If you are unsure, buy one pack from several brands rather than a case of one. That is the only test that counts, and it costs the price of two packs.',
        ],
      },
      {
        type: 'text',
        title: 'And for the hospital bag',
        paragraphs: [
          'One pack is plenty, and often none is needed at all. Most French maternity units supply nappies during the stay, and some supply toiletries too.',
          'It is a question to put to your unit directly when you register, alongside their list of what to bring. It saves carrying three kilos of nappies for nothing.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'taille-naissance-ou-1-mois-combien-acheter',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Taille naissance ou 1 mois : la répartition qui évite les vêtements jamais portés',
    titleEn: 'Newborn or 1 month: the split that avoids never-worn clothes',
    excerptFr:
      'La taille naissance est celle qu’on reçoit le plus et celle où le bébé reste le moins. Voici comment répartir.',
    excerptEn:
      'Newborn is the size you receive most of and the one your baby stays in least. Here is how to split it.',
    readingMinutes: 5,
    heroAltFr: 'Répartir la layette entre taille naissance et 1 mois',
    heroAltEn: 'Splitting a layette between newborn and 1 month',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est le regret le plus fréquent des listes de naissance, et il est presque universel : une pile de bodies et de pyjamas en taille naissance, neufs, étiquette encore dessus, que le bébé n’a jamais portés.',
          'La cause n’est pas un mauvais calcul de quantité totale. C’est une mauvaise répartition entre les tailles.',
        ],
      },
      {
        type: 'text',
        title: 'Combien de temps dure la taille naissance',
        paragraphs: [
          'Deux à trois semaines pour beaucoup de bébés nés à terme. Certains la sautent entièrement, quand leur poids de naissance les place directement en taille 1 mois.',
          'La taille 1 mois, elle, couvre une période nettement plus longue, et c’est celle qui manque systématiquement dans les armoires du premier mois.',
          'Sur une douzaine de bodies, une répartition raisonnable est d’environ cinq en taille naissance et sept en 1 mois. Même logique sur les pyjamas.',
        ],
      },
      {
        type: 'list',
        title: 'La répartition à viser',
        items: [
          'Bodies : environ 5 en taille naissance, 7 en 1 mois',
          'Pyjamas : environ 5 en taille naissance, 6 en 1 mois',
          'Gilets, bonnets, chaussettes : plutôt en 1 mois, ils sont moins ajustés',
          'Tout ce qui est offert : demandez explicitement du 1 mois et du 3 mois',
        ],
      },
      {
        type: 'text',
        title: 'Pensez à la saison que le vêtement rencontrera',
        paragraphs: [
          'Un vêtement en taille six mois ne sera pas porté six mois après l’achat mais six mois après la naissance, ce qui n’est pas la même saison. Un bébé né en novembre aura six mois en mai : les brassières en taille six mois ne serviront pas, les tee-shirts légers si.',
          'C’est l’erreur classique des cadeaux, et elle est facile à éviter en raisonnant en mois calendaires plutôt qu’en tailles.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui rattrape une mauvaise répartition',
        paragraphs: [
          'Gardez les étiquettes et les tickets sur ce qui n’est pas ouvert, et n’enlevez pas les emballages de tout d’un coup avant la naissance. Beaucoup d’enseignes échangent sans difficulté, et vous saurez en quelques jours quelle taille votre bébé porte réellement.',
          'La seconde main aide aussi énormément sur cette tranche précise : les vêtements de taille naissance ont, par construction, été très peu portés. C’est le meilleur rapport usage sur prix de toute la layette.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'It is the most common regret of any baby list, and it is close to universal: a stack of newborn-size bodysuits and sleepsuits, brand new, tags still on, that the baby never wore.',
          'The cause is not a miscalculated total. It is a bad split between sizes.',
        ],
      },
      {
        type: 'text',
        title: 'How long newborn size lasts',
        paragraphs: [
          'Two to three weeks for many full-term babies. Some skip it entirely, when their birth weight puts them straight into 1 month.',
          'The 1 month size covers a noticeably longer stretch, and it is the one that is consistently missing from the wardrobe in that first month.',
          'Out of a dozen bodysuits, a sensible split is about five in newborn and seven in 1 month. The same goes for sleepsuits.',
        ],
      },
      {
        type: 'list',
        title: 'The split to aim for',
        items: [
          'Bodysuits: about 5 in newborn, 7 in 1 month',
          'Sleepsuits: about 5 in newborn, 6 in 1 month',
          'Cardigans, hats, socks: lean towards 1 month, they are less fitted',
          'Anything being gifted: explicitly ask for 1 month and 3 month',
        ],
      },
      {
        type: 'text',
        title: 'Think about the season the garment will meet',
        paragraphs: [
          'A six-month garment will not be worn six months after you buy it but six months after the birth, which is not the same season. A baby born in November will be six months old in May: six-month cardigans will go unworn, light t-shirts will not.',
          'It is the classic gifting mistake, and it is easy to avoid by thinking in calendar months rather than sizes.',
        ],
      },
      {
        type: 'text',
        title: 'What rescues a bad split',
        paragraphs: [
          'Keep tags and receipts on anything unopened, and do not unwrap everything before the birth. Plenty of shops exchange without difficulty, and within a few days you will know which size your baby actually wears.',
          'Second-hand helps enormously in this exact band too: newborn clothes have, by definition, barely been worn. It is the best use-per-euro in the whole layette.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'layette-hiver-ete-ce-qui-change',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Layette d’hiver, layette d’été : ce que la saison change vraiment',
    titleEn: 'Winter layette, summer layette: what the season actually changes',
    excerptFr:
      'La saison de naissance déplace surtout trois postes. Le reste des quantités ne bouge pas autant qu’on le croit.',
    excerptEn:
      'The season of birth mainly shifts three items. The rest of the quantities move less than people think.',
    readingMinutes: 5,
    heroAltFr: 'Adapter la layette à la saison de naissance',
    heroAltEn: 'Adapting a layette to the season of birth',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'On imagine souvent qu’une naissance en janvier et une naissance en juillet demandent deux listes complètement différentes. En pratique, la saison déplace surtout trois postes, et laisse le reste presque intact.',
          'Les quantités totales de bodies, de pyjamas, de langes, de bavoirs ou de draps ne changent pas : ce sont les lessives et les régurgitations qui les dictent, pas la météo.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui change vraiment',
        paragraphs: [
          'La répartition manches courtes et manches longues, d’abord. Sur une douzaine de bodies, une naissance d’hiver penche vers huit manches longues, une naissance d’été vers huit manches courtes. Le total reste douze.',
          'L’indice TOG de la gigoteuse ensuite. Il se choisit selon la température de la chambre, idéalement entre 18 et 20 degrés, et non selon le mois au calendrier. Une gigoteuse épaisse dans une pièce bien chauffée fait plus de mal que de bien.',
          'Le nid d’ange ou la combinaison enfin, qui est le seul objet réellement saisonnier de la liste : utile pour une naissance d’hiver, complètement inutile en juillet.',
        ],
      },
      {
        type: 'list',
        title: 'Les trois postes saisonniers',
        items: [
          'Bodies : le ratio manches courtes / manches longues, jamais le total',
          'Gigoteuse : l’indice TOG, choisi sur la température de la chambre',
          'Nid d’ange ou combinaison : 1 en hiver, 0 en été',
        ],
      },
      {
        type: 'text',
        title: 'L’hiver a un effet caché sur les quantités',
        paragraphs: [
          'Il en existe un, et il ne concerne pas le chaud : le séchage. En hiver, sans sèche-linge, un pyjama met beaucoup plus longtemps à revenir dans l’armoire, et un pyjama encore humide ne sert à rien.',
          'Concrètement, cela pousse à viser le haut de la fourchette sur les pyjamas et les bodies pour une naissance d’hiver. Ce n’est pas une question de température, c’est une question de rotation.',
        ],
      },
      {
        type: 'text',
        title: 'Et l’été, la seule erreur fréquente',
        paragraphs: [
          'Le bonnet reste utile même en juillet, pour les tout premiers jours et pour la sortie de maternité. Deux suffisent, quelle que soit la saison.',
          'À l’inverse, un nouveau-né en été a besoin de moins de couches de vêtements qu’on ne le croit : un body seul suffit souvent à l’intérieur. Les pieds frais ne sont pas un signe qu’il a froid, c’est la nuque qui renseigne.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'People often imagine a January birth and a July birth need two completely different lists. In practice the season shifts three items and leaves the rest almost untouched.',
          'Total quantities of bodysuits, sleepsuits, muslins, bibs and sheets do not change: laundry and possets dictate those, not the weather.',
        ],
      },
      {
        type: 'text',
        title: 'What actually changes',
        paragraphs: [
          'The short-sleeve to long-sleeve split, first. Out of a dozen bodysuits, a winter birth leans towards eight long-sleeved, a summer birth towards eight short-sleeved. The total stays twelve.',
          'The sleep sack TOG next. It is chosen for the room temperature, ideally between 18 and 20 degrees, not for the month on the calendar. A thick sleep sack in a well-heated room does more harm than good.',
          'And the pramsuit, the only genuinely seasonal item on the list: useful for a winter birth, entirely pointless in July.',
        ],
      },
      {
        type: 'list',
        title: 'The three seasonal items',
        items: [
          'Bodysuits: the short/long sleeve ratio, never the total',
          'Sleep sack: the TOG, chosen for the room temperature',
          'Pramsuit or snowsuit: 1 in winter, 0 in summer',
        ],
      },
      {
        type: 'text',
        title: 'Winter has a hidden effect on quantities',
        paragraphs: [
          'There is one, and it is not about warmth: drying. In winter, without a tumble dryer, a sleepsuit takes far longer to get back into the drawer, and a damp sleepsuit is no use to anyone.',
          'In practice that pushes a winter birth towards the top of the range on sleepsuits and bodysuits. It is not a temperature question, it is a rotation question.',
        ],
      },
      {
        type: 'text',
        title: 'And in summer, the one common mistake',
        paragraphs: [
          'A hat is still useful in July, for the very first days and for the trip home. Two is enough whatever the season.',
          'Conversely, a newborn in summer needs fewer layers than people assume: a bodysuit alone is often plenty indoors. Cool feet are not a sign of being cold, the back of the neck tells you far more.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'valise-maternite-combien-de-chaque',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Valise de maternité : combien de chaque pour un séjour de trois à cinq jours',
    titleEn: 'Hospital bag: how many of each for a three to five day stay',
    excerptFr:
      'Les listes de valise énumèrent, elles ne comptent pas. Et la première question à poser n’est pas « combien » mais « qu’est-ce que la maternité fournit ».',
    excerptEn:
      'Hospital bag lists enumerate, they do not count. And the first question is not "how many" but "what does the unit supply".',
    readingMinutes: 6,
    heroAltFr: 'Les quantités à mettre dans la valise de maternité',
    heroAltEn: 'Quantities for a hospital bag',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les listes de valise de maternité énumèrent très bien et comptent très mal. Elles disent « des bodies », « des pyjamas », « de quoi vous changer », ce qui laisse entière la seule question qui se pose la veille du départ.',
          'Avant même de compter, posez une autre question, et posez-la à votre maternité : que fournit-elle ? La plupart des établissements français fournissent les couches pendant le séjour, beaucoup fournissent les produits de toilette, certains fournissent les premiers bodies. C’est la variable qui change le plus le contenu de la valise, et c’est la seule que vous ne pouvez pas deviner.',
        ],
      },
      {
        type: 'text',
        title: 'Pour vous, sur trois à cinq jours',
        paragraphs: [
          'Trois chemises de nuit ou pyjamas ouverts devant, ce qui compte autant pour les examens que pour l’allaitement. Trois soutiens-gorge d’allaitement, en prévoyant une taille au-dessus de votre taille de grossesse pour la montée de lait.',
          'Une demi-douzaine de culottes jetables, une robe de chambre, des chaussons ou des chaussettes antidérapantes. Et une tenue pour rentrer, choisie dans une taille confortable plutôt que dans votre taille d’avant.',
        ],
      },
      {
        type: 'list',
        title: 'Les quantités, côté maman',
        items: [
          'Chemises de nuit ou pyjamas ouverts devant : 3',
          'Soutiens-gorge d’allaitement : 3, une taille au-dessus',
          'Culottes jetables : 6 environ, selon la durée du séjour',
          'Robe de chambre : 1, chaussons ou chaussettes antidérapantes : 1 paire',
          'Serviettes hygiéniques maternité : à vérifier, beaucoup de maternités les fournissent',
          'Tenue de sortie : 1, confortable',
        ],
      },
      {
        type: 'list',
        title: 'Les quantités, côté bébé',
        items: [
          'Bodies : 5 ou 6 pour le séjour',
          'Pyjamas : 5',
          'Brassière ou gilet : 2, bonnet : 2, paires de chaussettes : 2',
          'Bavoirs : 2, langes : 2',
          'Couches : 1 paquet, et souvent aucun (vérifiez d’abord)',
          'Tenue de sortie : 1, adaptée à la saison',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui doit être prêt et qui n’est pas dans la valise',
        paragraphs: [
          'Le siège-auto, qui est obligatoire dès la sortie de maternité, y compris sur cinq cents mètres. Il doit être installé et essayé avant, pas découvert dans le parking un jour de sortie.',
          'Les documents ensuite : pièce d’identité, carte Vitale, carte de mutuelle, dossier de suivi de grossesse, et l’acte de reconnaissance anticipée si vous en avez fait un. Ce sont les seules choses dont l’absence pose un vrai problème administratif.',
        ],
      },
      {
        type: 'text',
        title: 'Préparez-la plus tôt que la date que vous avez en tête',
        paragraphs: [
          'La valise se prépare vers 34 à 37 semaines d’aménorrhée. Pas parce qu’un départ précoce est probable, mais parce que la préparer tard signifie la préparer dans l’urgence, et c’est précisément dans ces conditions qu’on oublie les documents.',
          'Un dernier conseil pratique : deux sacs plutôt qu’un. Un sac pour le travail et l’accouchement, un sac pour le séjour. Le co-parent n’aura pas à vider toute la valise dans une chambre pour trouver une brosse à dents.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Hospital bag lists enumerate very well and count very badly. They say "bodysuits", "sleepsuits", "something to change into", which leaves untouched the only question that comes up the night before.',
          'Before counting anything, ask a different question, and ask your maternity unit: what do they supply? Most French units supply nappies during the stay, many supply toiletries, some supply the first bodysuits. It is the variable that changes the bag most, and the only one you cannot guess.',
        ],
      },
      {
        type: 'text',
        title: 'For you, across three to five days',
        paragraphs: [
          'Three nightdresses or front-opening pyjamas, which matters as much for examinations as for feeding. Three nursing bras, sized one up from your pregnancy size to allow for your milk coming in.',
          'Half a dozen disposable briefs, a dressing gown, slippers or non-slip socks. And one outfit to go home in, chosen in a comfortable size rather than your pre-pregnancy one.',
        ],
      },
      {
        type: 'list',
        title: 'Quantities, for you',
        items: [
          'Nightdresses or front-opening pyjamas: 3',
          'Nursing bras: 3, one size up',
          'Disposable briefs: about 6, depending on the length of stay',
          'Dressing gown: 1, slippers or non-slip socks: 1 pair',
          'Maternity pads: check first, many units supply them',
          'Going-home outfit: 1, comfortable',
        ],
      },
      {
        type: 'list',
        title: 'Quantities, for the baby',
        items: [
          'Bodysuits: 5 or 6 for the stay',
          'Sleepsuits: 5',
          'Cardigan: 2, hats: 2, pairs of socks: 2',
          'Bibs: 2, muslins: 2',
          'Nappies: 1 pack, and often none at all (check first)',
          'Going-home outfit: 1, suited to the season',
        ],
      },
      {
        type: 'text',
        title: 'What must be ready and is not in the bag',
        paragraphs: [
          'The car seat, which is required from the moment you leave the unit, including for a five hundred metre drive. It needs to be fitted and tried beforehand, not discovered in the car park on the day.',
          'Then the documents: ID, health insurance card, top-up insurance card, your pregnancy notes, and the pre-birth acknowledgement of parentage if you made one. Those are the only things whose absence creates a genuine administrative problem.',
        ],
      },
      {
        type: 'text',
        title: 'Pack it earlier than the date in your head',
        paragraphs: [
          'The bag gets packed around 34 to 37 weeks. Not because an early arrival is likely, but because packing late means packing in a hurry, and that is exactly when documents get forgotten.',
          'One practical tip: two bags rather than one. A bag for labour and birth, a bag for the stay. Your partner will not have to empty the whole case onto a hospital room floor to find a toothbrush.',
        ],
      },
    ],
  }),
  postPair({
    slug: 'combien-de-vetements-3-mois-6-mois',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Combien de vêtements par taille : de la naissance à un an',
    titleEn: 'How many clothes per size: from birth to one year',
    excerptFr:
      'Chaque taille dure un temps différent, et les quantités ne suivent pas l’âge. Le 3 mois est la taille piège.',
    excerptEn:
      'Each size lasts a different length of time, and the quantities do not follow age. 3 month is the trap.',
    readingMinutes: 6,
    heroAltFr: 'Les quantités de vêtements par taille, de la naissance à un an',
    heroAltEn: 'Clothing quantities by size, from birth to one year',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une erreur revient dans presque toutes les garde-robes de première année : on achète comme si chaque taille durait aussi longtemps que la précédente. Ce n’est pas le cas, et l’écart est considérable.',
          'La taille naissance dure une quinzaine de jours. La taille 6 mois dure deux à trois mois. Entre les deux, la taille 3 mois est celle qui surprend le plus de monde.',
        ],
      },
      {
        type: 'text',
        title: 'Le 3 mois est la taille piège',
        paragraphs: [
          'Tout le monde s’attend à ce que le bébé la traverse aussi vite que les précédentes. En réalité il y reste six à huit semaines, soit trois à quatre fois plus longtemps qu’en taille naissance.',
          'C’est donc la taille où il faut le plus de pièces, et c’est aussi celle qu’on achète le moins parce qu’elle n’a pas l’air urgente pendant la grossesse. Le résultat classique : douze bodies en taille naissance portés deux semaines, et une pénurie six semaines plus tard.',
        ],
      },
      {
        type: 'list',
        title: 'Combien par taille',
        items: [
          'Naissance, environ 15 jours : 5 à 7 bodies, 5 à 7 pyjamas, 2 gilets, 2 bonnets, 3 paires de chaussettes',
          '1 mois, environ 3 semaines : 7 à 8 bodies, 7 à 8 pyjamas, 2 gilets, 3 à 4 paires de chaussettes',
          '3 mois, 6 à 8 semaines : 8 à 10 bodies, 6 à 7 pyjamas, 4 à 5 tenues, 5 à 7 bavoirs',
          '6 mois, 2 à 3 mois : 7 à 8 bodies, 5 à 6 pyjamas, 5 à 7 tenues, 7 à 10 bavoirs',
          '9 à 12 mois, 3 à 4 mois : 5 à 7 bodies, 5 à 6 pyjamas, 7 à 8 tenues, une paire de chaussures',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi les bodies diminuent et les tenues augmentent',
        paragraphs: [
          'La tendance est nette et elle a une explication simple. Un nouveau-né vit en body et en pyjama, jour et nuit, et change plusieurs fois par jour. Un bébé de neuf mois sort, mange autre chose que du lait, et porte de vraies tenues.',
          'Les bavoirs suivent le mouvement inverse et augmentent fortement : au début ils servent contre les régurgitations, plus tard contre la bave des poussées dentaires puis contre les premiers repas.',
          'Les chaussures n’arrivent qu’à la fin, et seulement quand le bébé marche. Avant, elles ne servent à rien et gênent le développement du pied.',
        ],
      },
      {
        type: 'text',
        title: 'L’hypothèse derrière tous ces chiffres',
        paragraphs: [
          'Une lessive tous les trois ou quatre jours. C’est la variable qui pilote tout : si vous lancez une machine par jour, divisez à peu près par deux, et les listes ci-dessus deviennent presque confortables.',
          'Un cas particulier vaut d’être noté : si le bébé est gardé, en crèche ou chez une assistante maternelle, comptez deux à trois bodies et un à deux pyjamas de plus, à laisser sur place. Le change de rechange qui reste chez la nounou ne revient pas dans la rotation de la maison.',
        ],
      },
      {
        type: 'quote',
        quote:
          'On habille un nouveau-né douze fois par semaine et un bébé de neuf mois sept fois. Ce n’est pas la même garde-robe, et ce n’est pas le même nombre.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'One mistake shows up in nearly every first-year wardrobe: buying as though every size lasted as long as the one before. It does not, and the gap is considerable.',
          'Newborn size lasts about a fortnight. The 6 month size lasts two to three months. In between, the 3 month size catches most people out.',
        ],
      },
      {
        type: 'text',
        title: '3 month is the trap size',
        paragraphs: [
          'Everyone expects a baby to pass through it as fast as the earlier ones. In practice they stay in it six to eight weeks, three to four times longer than in newborn.',
          'So it is the size that needs the most pieces, and also the one people buy least, because it does not look urgent during pregnancy. The classic result: twelve newborn bodysuits worn for a fortnight, and a shortage six weeks later.',
        ],
      },
      {
        type: 'list',
        title: 'How many per size',
        items: [
          'Newborn, about 15 days: 5 to 7 bodysuits, 5 to 7 sleepsuits, 2 cardigans, 2 hats, 3 pairs of socks',
          '1 month, about 3 weeks: 7 to 8 bodysuits, 7 to 8 sleepsuits, 2 cardigans, 3 to 4 pairs of socks',
          '3 month, 6 to 8 weeks: 8 to 10 bodysuits, 6 to 7 sleepsuits, 4 to 5 outfits, 5 to 7 bibs',
          '6 month, 2 to 3 months: 7 to 8 bodysuits, 5 to 6 sleepsuits, 5 to 7 outfits, 7 to 10 bibs',
          '9 to 12 month, 3 to 4 months: 5 to 7 bodysuits, 5 to 6 sleepsuits, 7 to 8 outfits, one pair of shoes',
        ],
      },
      {
        type: 'text',
        title: 'Why bodysuits go down and outfits go up',
        paragraphs: [
          'The trend is clear and the reason is simple. A newborn lives in a bodysuit and a sleepsuit, day and night, changed several times a day. A nine-month-old goes out, eats something other than milk, and wears actual outfits.',
          'Bibs move the other way and rise sharply: at first they are for possets, later for teething dribble and then for first meals.',
          'Shoes only arrive at the end, and only once the baby walks. Before that they serve no purpose and get in the way of how the foot develops.',
        ],
      },
      {
        type: 'text',
        title: 'The assumption behind all these numbers',
        paragraphs: [
          'A wash every three or four days. That is the variable driving everything: run a load a day and you can roughly halve the lists above, which makes them almost comfortable.',
          'One special case is worth noting: if the baby is in childcare, at a nursery or with a childminder, add two or three bodysuits and one or two sleepsuits to leave there. The spare change of clothes that lives at the childminder never comes back into the home rotation.',
        ],
      },
      {
        type: 'quote',
        quote:
          'You dress a newborn twelve times a week and a nine-month-old seven times. That is not the same wardrobe, and it is not the same number.',
      },
    ],
  }),

  postPair({
    slug: 'naissance-en-hiver-la-layette',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Naissance en hiver : la layette, poste par poste',
    titleEn: 'A winter baby: the layette, item by item',
    excerptFr:
      'Le froid change moins de choses que le séchage. Voici ce qui bouge vraiment pour un bébé de décembre à février.',
    excerptEn:
      'Cold changes less than drying time does. Here is what genuinely shifts for a December to February baby.',
    readingMinutes: 5,
    heroAltFr: 'La layette pour une naissance en hiver',
    heroAltEn: 'The layette for a winter birth',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Pour une naissance entre décembre et février, la première chose à savoir est que le froid n’est pas la contrainte principale. La contrainte principale est le séchage.',
          'Sans sèche-linge, un pyjama met beaucoup plus longtemps à revenir dans l’armoire en janvier qu’en juillet, et un pyjama encore humide ne compte pas dans votre stock. C’est ce qui pousse une layette d’hiver vers le haut des fourchettes habituelles, bien plus que la température elle-même.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui change concrètement',
        items: [
          'Bodies : le même total, une douzaine, mais environ 8 manches longues pour 4 manches courtes',
          'Pyjamas : visez le haut de la fourchette, 11 ou 12 plutôt que 9, à cause du séchage',
          'Gigoteuse : TOG 3 si la chambre est en dessous de 18 degrés, TOG 2 entre 18 et 20',
          'Gilets : 4 ou 5 plutôt que 3, ils servent en couche intermédiaire pour chaque sortie',
          'Nid d’ange ou combinaison : 1, c’est le seul objet réellement saisonnier de la liste',
          'Bonnets : 2, comme en toute saison, mais en maille plutôt qu’en coton fin',
        ],
      },
      {
        type: 'text',
        title: 'Le chauffage compte plus que la météo',
        paragraphs: [
          'La bonne référence est la température de la chambre, idéalement entre 18 et 20 degrés, et non le mois au calendrier. Un appartement bien isolé et chauffé à 21 degrés en février demande une gigoteuse TOG 2, pas TOG 3.',
          'Une gigoteuse trop épaisse dans une pièce chaude fait plus de mal que de bien. En cas de doute, touchez la nuque du bébé plutôt que ses pieds : les pieds d’un nouveau-né sont naturellement frais, ce n’est pas un signe qu’il a froid.',
        ],
      },
      {
        type: 'text',
        title: 'La sortie de maternité',
        paragraphs: [
          'C’est le moment où l’on surhabille le plus. Un point de sécurité mérite d’être connu : dans le siège-auto, les vêtements très épais et les combinaisons matelassées empêchent le harnais d’être correctement serré contre le corps.',
          'La pratique habituelle est d’installer le bébé en tenue normale, harnais ajusté, puis de poser une couverture ou le nid d’ange par-dessus le harnais. Le trajet de la maternité à la maison se fait souvent dans une voiture froide, et c’est la solution qui combine chaleur et harnais correct.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui ne change pas',
        paragraphs: [
          'Les langes, les bavoirs, les draps housse, les couches, les capes de bain : les quantités sont exactement les mêmes qu’en été. Ce sont les lessives et les régurgitations qui les dictent, et elles ne connaissent pas les saisons.',
          'Et le lit ne change pas non plus. Même en plein hiver, ni couverture, ni couette, ni oreiller, ni tour de lit avant deux ans, selon [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). C’est le TOG de la gigoteuse qui gère le froid, jamais une couverture ajoutée.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'For a baby arriving between December and February, the first thing to know is that cold is not the main constraint. Drying time is.',
          'Without a tumble dryer, a sleepsuit takes far longer to get back into the drawer in January than in July, and a damp sleepsuit does not count towards your stock. That is what pushes a winter layette towards the top of the usual ranges, far more than the temperature itself.',
        ],
      },
      {
        type: 'list',
        title: 'What actually changes',
        items: [
          'Bodysuits: the same total, a dozen, but about 8 long-sleeved to 4 short-sleeved',
          'Sleepsuits: aim high, 11 or 12 rather than 9, because of drying',
          'Sleep sack: TOG 3 if the room is below 18 degrees, TOG 2 between 18 and 20',
          'Cardigans: 4 or 5 rather than 3, they act as a middle layer for every outing',
          'Pramsuit: 1, the only genuinely seasonal item on the list',
          'Hats: 2, as in any season, but knitted rather than fine cotton',
        ],
      },
      {
        type: 'text',
        title: 'Heating matters more than the weather',
        paragraphs: [
          'The right reference is the room temperature, ideally between 18 and 20 degrees, not the month on the calendar. A well-insulated flat heated to 21 degrees in February needs a TOG 2 sleep sack, not TOG 3.',
          'A sleep sack that is too thick in a warm room does more harm than good. When in doubt, feel the back of the baby’s neck rather than their feet: a newborn’s feet are naturally cool, and it is not a sign they are cold.',
        ],
      },
      {
        type: 'text',
        title: 'The trip home',
        paragraphs: [
          'This is where people overdress most. One safety point is worth knowing: in a car seat, very thick clothing and padded snowsuits stop the harness from being tightened properly against the body.',
          'The usual practice is to put the baby in normal clothes, tighten the harness, then lay a blanket or the pramsuit over the top of the harness. The drive home is often in a cold car, and this is the approach that gives you warmth and a correct harness at once.',
        ],
      },
      {
        type: 'text',
        title: 'What does not change',
        paragraphs: [
          'Muslins, bibs, fitted sheets, nappies, hooded towels: the quantities are exactly the same as in summer. Laundry and possets dictate those, and they do not know about seasons.',
          'The cot does not change either. Even in midwinter, no blanket, duvet, pillow or bumper before age two, per [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). The sleep sack TOG handles the cold, never an added blanket.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'naissance-en-ete-la-layette',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Naissance en été : la layette, et les deux erreurs fréquentes',
    titleEn: 'A summer baby: the layette, and the two common mistakes',
    excerptFr:
      'Moins de couches de vêtements qu’on ne le croit, un bonnet quand même, et une gigoteuse plus fine plutôt qu’aucune.',
    excerptEn:
      'Fewer layers than people think, a hat all the same, and a thinner sleep sack rather than none.',
    readingMinutes: 5,
    heroAltFr: 'La layette pour une naissance en été',
    heroAltEn: 'The layette for a summer birth',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une naissance entre juin et août simplifie beaucoup de choses : pas de combinaison, pas de nid d’ange, un séchage rapide qui fait tourner la layette plus vite. Les quantités totales, elles, ne bougent pas.',
          'Deux erreurs reviennent pourtant systématiquement, et elles vont dans des directions opposées.',
        ],
      },
      {
        type: 'text',
        title: 'Première erreur : trop habiller',
        paragraphs: [
          'Un nouveau-né en été a besoin de moins de couches qu’on ne l’imagine. À l’intérieur, un body seul suffit très souvent, et le réflexe d’ajouter un pyjama par-dessus « au cas où » est le plus fréquent des premiers jours.',
          'Le repère utile est la nuque, pas les pieds. Des pieds frais chez un nouveau-né sont normaux et ne veulent rien dire. Une nuque moite veut dire qu’il a trop chaud.',
        ],
      },
      {
        type: 'text',
        title: 'Deuxième erreur : supprimer le bonnet et la gigoteuse',
        paragraphs: [
          'Le bonnet reste utile même en juillet, pour les tout premiers jours et pour la sortie de maternité. Deux suffisent, quelle que soit la saison. Il se retire pour dormir, comme tout ce qui pourrait glisser sur le visage.',
          'La gigoteuse ne se supprime pas non plus en été : elle se choisit simplement plus fine. Les modèles vendus comme « été » se situent généralement entre TOG 0,5 et TOG 1, et au-dessus de 24 degrés un TOG 0,5 suffit. Une gigoteuse fine reste la bonne réponse, parce que l’alternative n’est pas un drap : c’est rien du tout dans le lit, et une gigoteuse est ce qui remplace le drap.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui change pour un bébé d’été',
        items: [
          'Bodies : même total, mais environ 8 manches courtes pour 4 manches longues',
          'Pyjamas : bas de la fourchette possible, le séchage est rapide',
          'Gigoteuse : TOG 0,5 au-dessus de 24 degrés, TOG 1 entre 21 et 24',
          'Nid d’ange ou combinaison : aucun',
          'Gilets : 2 ou 3 suffisent, pour les soirées et la climatisation',
          'Bonnets : 2, en coton léger',
        ],
      },
      {
        type: 'text',
        title: 'Anticipez la saison suivante, pas la saison actuelle',
        paragraphs: [
          'Un bébé né en juillet aura six mois en janvier. Les tenues d’été en taille six mois ne serviront jamais, et c’est l’erreur la plus fréquente des cadeaux de naissance estivaux.',
          'Si vous achetez ou demandez des tailles au-delà du 3 mois, raisonnez en mois calendaires plutôt qu’en tailles. Six mois après une naissance de juillet, c’est le plein hiver.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A baby arriving between June and August simplifies a lot: no snowsuit, no pramsuit, and fast drying that turns the layette over more quickly. The total quantities do not move.',
          'Two mistakes come up consistently all the same, and they pull in opposite directions.',
        ],
      },
      {
        type: 'text',
        title: 'First mistake: overdressing',
        paragraphs: [
          'A newborn in summer needs fewer layers than people imagine. Indoors a bodysuit alone is very often enough, and adding a sleepsuit over the top "just in case" is the most common reflex of the first days.',
          'The useful check is the back of the neck, not the feet. Cool feet on a newborn are normal and mean nothing. A damp neck means they are too warm.',
        ],
      },
      {
        type: 'text',
        title: 'Second mistake: dropping the hat and the sleep sack',
        paragraphs: [
          'A hat is still useful in July, for the very first days and for the trip home. Two is enough whatever the season. It comes off for sleep, like anything else that could slide over the face.',
          'The sleep sack does not disappear in summer either, it simply gets thinner. Sacks sold as "summer" generally sit between TOG 0.5 and TOG 1, and above 24 degrees a TOG 0.5 is enough. A thin sleep sack is still the right answer, because the alternative is not a sheet: it is nothing in the cot at all, and a sleep sack is what replaces the sheet.',
        ],
      },
      {
        type: 'list',
        title: 'What changes for a summer baby',
        items: [
          'Bodysuits: same total, but about 8 short-sleeved to 4 long-sleeved',
          'Sleepsuits: the low end of the range is fine, drying is fast',
          'Sleep sack: TOG 0.5 above 24 degrees, TOG 1 between 21 and 24',
          'Pramsuit or snowsuit: none',
          'Cardigans: 2 or 3, for evenings and air conditioning',
          'Hats: 2, in light cotton',
        ],
      },
      {
        type: 'text',
        title: 'Plan for the next season, not this one',
        paragraphs: [
          'A baby born in July will be six months old in January. Summer outfits in six-month size will never be worn, and that is the most common mistake with summer newborn gifts.',
          'If you are buying or asking for sizes beyond 3 month, think in calendar months rather than sizes. Six months after a July birth is the middle of winter.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'naissance-mi-saison-printemps-automne',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Naissance au printemps ou à l’automne : la layette la plus simple à faire',
    titleEn: 'A spring or autumn baby: the easiest layette to get right',
    excerptFr:
      'La mi-saison est la plus facile à équiper et la plus facile à mal anticiper, parce que le bébé change de saison en cours de route.',
    excerptEn:
      'Mid-season is the easiest to equip and the easiest to misjudge, because the baby changes season along the way.',
    readingMinutes: 5,
    heroAltFr: 'La layette pour une naissance de printemps ou d’automne',
    heroAltEn: 'The layette for a spring or autumn birth',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Mars à mai, septembre à novembre : c’est la période la plus confortable pour constituer une layette. Les températures sont modérées, la garde-robe s’équilibre naturellement entre manches courtes et manches longues, et le séchage ne pose pas de problème.',
          'C’est aussi la période où l’on anticipe le plus mal, pour une raison précise : le bébé ne restera pas dans la saison où il est né.',
        ],
      },
      {
        type: 'text',
        title: 'Le vrai sujet, c’est la trajectoire',
        paragraphs: [
          'Un bébé né en avril passera l’été en taille 3 mois puis l’automne en taille 6 mois. Un bébé né en octobre fera exactement l’inverse : il traversera l’hiver en 3 mois et arrivera au printemps en 6 mois.',
          'Les deux cas demandent la même layette de départ et des achats suivants complètement opposés. C’est pour cette raison qu’il vaut mieux raisonner en mois calendaires qu’en tailles dès qu’on dépasse le 3 mois.',
        ],
      },
      {
        type: 'list',
        title: 'La layette de mi-saison',
        items: [
          'Bodies : une douzaine, à peu près moitié manches courtes, moitié manches longues',
          'Pyjamas : 11, en milieu de fourchette',
          'Gigoteuse : TOG 2, qui couvre 18 à 20 degrés, soit la plage la plus courante',
          'Gilets : 3, l’objet le plus utile de la mi-saison parce que les journées varient beaucoup',
          'Nid d’ange : facultatif, utile surtout pour un automne tardif',
          'Bonnets : 2',
        ],
      },
      {
        type: 'text',
        title: 'Le TOG 2 est la gigoteuse par défaut',
        paragraphs: [
          'Une gigoteuse TOG 2 convient à une chambre entre 18 et 20 degrés, ce qui correspond à la majorité des logements bien isolés. De mars à juin et de septembre à novembre, c’est celle qui sert le plus.',
          'Si vous n’en achetez qu’une pour commencer, c’est celle-là. La deuxième s’achètera quand la température de la chambre aura réellement changé, et vous saurez alors dans quel sens.',
        ],
      },
      {
        type: 'text',
        title: 'Achetez peu au-delà du 3 mois',
        paragraphs: [
          'C’est le conseil le plus utile pour une naissance de mi-saison. Les tailles 6 mois et au-delà rencontreront une saison que vous ne pouvez pas encore situer avec certitude, parce que la date de naissance elle-même peut bouger de deux semaines.',
          'Les vêtements achetés d’avance pour une saison qui ne tombe pas au bon moment sont la première source de vêtements jamais portés. Attendre coûte moins cher que se tromper, et vous saurez dans quelques semaines.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'March to May, September to November: this is the most comfortable window for putting a layette together. Temperatures are moderate, the wardrobe balances naturally between short and long sleeves, and drying is not a problem.',
          'It is also the window people misjudge most, for one specific reason: the baby will not stay in the season they were born into.',
        ],
      },
      {
        type: 'text',
        title: 'The real question is the trajectory',
        paragraphs: [
          'A baby born in April will spend the summer in 3 month and the autumn in 6 month. A baby born in October does exactly the opposite: through winter in 3 month, reaching spring in 6 month.',
          'Both need the same starting layette and completely opposite purchases afterwards. That is why it pays to think in calendar months rather than sizes as soon as you go past 3 month.',
        ],
      },
      {
        type: 'list',
        title: 'The mid-season layette',
        items: [
          'Bodysuits: a dozen, roughly half short-sleeved and half long-sleeved',
          'Sleepsuits: 11, mid-range',
          'Sleep sack: TOG 2, covering 18 to 20 degrees, the most common range',
          'Cardigans: 3, the most useful mid-season item because days vary so much',
          'Pramsuit: optional, mainly useful for a late autumn',
          'Hats: 2',
        ],
      },
      {
        type: 'text',
        title: 'TOG 2 is the default sleep sack',
        paragraphs: [
          'A TOG 2 sleep sack suits a room between 18 and 20 degrees, which covers most well-insulated homes. From March to June and September to November, it is the one that gets used most.',
          'If you only buy one to start with, buy that one. The second comes when the room temperature has actually changed, and by then you will know which way.',
        ],
      },
      {
        type: 'text',
        title: 'Buy little beyond 3 month',
        paragraphs: [
          'This is the most useful advice for a mid-season birth. Sizes from 6 month up will meet a season you cannot yet place with confidence, because the birth date itself can move by a fortnight.',
          'Clothes bought ahead for a season that lands at the wrong moment are the first source of never-worn garments. Waiting costs less than guessing wrong, and you will know within a few weeks.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'gigoteuse-tog-quelle-saison',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Gigoteuse : quel TOG choisir, et pourquoi le mois ne compte pas',
    titleEn: 'Sleep sacks: which TOG to choose, and why the month does not matter',
    excerptFr:
      'Le TOG se choisit sur la température de la chambre, pas sur la saison. Le tableau, et ce qu’il ne faut jamais ajouter par-dessus.',
    excerptEn:
      'TOG is chosen for the room temperature, not the season. The table, and what must never be added on top.',
    readingMinutes: 5,
    heroAltFr: 'Choisir le TOG d’une gigoteuse selon la température',
    heroAltEn: 'Choosing a sleep sack TOG by temperature',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La gigoteuse est l’objet le plus important de la layette, parce qu’elle remplace à elle seule le drap, la couverture et la couette, qui n’ont pas leur place dans le lit d’un bébé avant deux ans.',
          'Et c’est aussi l’objet le plus souvent mal choisi, pour une raison simple : on l’achète en fonction du mois de naissance, alors que le seul repère utile est la température de la chambre.',
        ],
      },
      {
        type: 'list',
        title: 'Le tableau, en une ligne par plage',
        items: [
          'Au-dessus de 24 degrés : TOG 0,5',
          'De 21 à 24 degrés : TOG 1',
          'De 18 à 20 degrés : TOG 2, la plage la plus courante et la gigoteuse par défaut',
          'En dessous de 18 degrés : TOG 3, avec un body et un pyjama plus épais',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi la chambre plutôt que la saison',
        paragraphs: [
          'Un appartement bien isolé et chauffé à 21 degrés en février n’a rien à voir avec une maison ancienne à 17 degrés au même moment. Le mois est identique, la gigoteuse nécessaire ne l’est pas.',
          'Un thermomètre de chambre coûte peu et règle la question une fois pour toutes. La plage de confort recommandée se situe autour de 18 à 20 degrés, ce qui place le TOG 2 en gigoteuse par défaut pour la majorité des logements.',
          'Une gigoteuse trop épaisse dans une pièce chauffée fait plus de mal que de bien : le risque de surchauffe est réel, et il augmente précisément quand on cumule un TOG élevé et un chauffage poussé.',
        ],
      },
      {
        type: 'text',
        title: 'Comment vérifier que c’est le bon choix',
        paragraphs: [
          'Touchez la nuque du bébé, pas ses mains ni ses pieds. Une nuque moite signifie qu’il a trop chaud, une nuque fraîche qu’il faut ajouter une épaisseur, côté vêtement et non côté literie.',
          'Les extrémités d’un nouveau-né sont naturellement plus fraîches que le reste de son corps. Des pieds froids ne sont pas un signe fiable, et c’est pourtant le premier réflexe de tout le monde.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qu’on n’ajoute jamais par-dessus',
        paragraphs: [
          'Une couverture, une couette, un oreiller ou un tour de lit, quelle que soit la température. Selon [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) et les repères de l’Association française de pédiatrie ambulatoire relayés par [sante.fr](https://www.sante.fr/comment-coucher-votre-bebe-pour-lui-assurer-confort-et-securite), rien de tout cela ne doit se trouver dans le lit avant deux ans.',
          'S’il fait froid, la réponse est un TOG plus élevé ou un pyjama plus épais sous la gigoteuse, jamais une couverture ajoutée dessus. C’est exactement le problème que la gigoteuse existe pour résoudre.',
        ],
      },
      {
        type: 'text',
        title: 'La taille compte autant que le TOG',
        paragraphs: [
          'L’encolure doit être assez étroite pour que le bébé ne puisse pas glisser à l’intérieur de la gigoteuse. C’est le seul point où une gigoteuse trop grande pose un vrai problème, et non un simple inconfort.',
          'Prévoyez deux gigoteuses pour pouvoir en laver une, trois si vous voulez ne jamais courir après la lessive. Et comptez qu’il faudra en racheter au changement de saison suivant, à la fois pour le TOG et pour la taille.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The sleep sack is the most important item in the layette, because on its own it replaces the sheet, the blanket and the duvet, none of which belong in a baby’s cot before age two.',
          'It is also the most commonly mis-chosen, for a simple reason: people buy it for the month of birth, when the only useful reference is the temperature of the room.',
        ],
      },
      {
        type: 'list',
        title: 'The table, one line per range',
        items: [
          'Above 24 degrees: TOG 0.5',
          '21 to 24 degrees: TOG 1',
          '18 to 20 degrees: TOG 2, the most common range and the default sack',
          'Below 18 degrees: TOG 3, with a bodysuit and a thicker sleepsuit',
        ],
      },
      {
        type: 'text',
        title: 'Why the room rather than the season',
        paragraphs: [
          'A well-insulated flat heated to 21 degrees in February has nothing in common with an old house at 17 degrees on the same day. The month is identical, the sleep sack needed is not.',
          'A room thermometer costs little and settles the question for good. The recommended comfort range sits around 18 to 20 degrees, which makes TOG 2 the default for most homes.',
          'A sleep sack that is too thick in a heated room does more harm than good: the overheating risk is real, and it rises precisely when a high TOG and strong heating are combined.',
        ],
      },
      {
        type: 'text',
        title: 'How to check you got it right',
        paragraphs: [
          'Feel the back of the baby’s neck, not their hands or feet. A damp neck means too warm, a cool neck means add a layer of clothing, not of bedding.',
          'A newborn’s extremities are naturally cooler than the rest of them. Cold feet are not a reliable signal, and yet they are everybody’s first instinct.',
        ],
      },
      {
        type: 'text',
        title: 'What never goes on top',
        paragraphs: [
          'A blanket, a duvet, a pillow or a cot bumper, whatever the temperature. According to [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) and the guidance from the French association of ambulatory paediatrics republished by [sante.fr](https://www.sante.fr/comment-coucher-votre-bebe-pour-lui-assurer-confort-et-securite), none of it belongs in the cot before age two.',
          'If it is cold, the answer is a higher TOG or a thicker sleepsuit under the sack, never a blanket added over it. That is exactly the problem the sleep sack exists to solve.',
        ],
      },
      {
        type: 'text',
        title: 'Size matters as much as TOG',
        paragraphs: [
          'The neck opening must be narrow enough that the baby cannot slip down inside the sack. That is the one place where an oversized sleep sack is a genuine problem rather than a comfort issue.',
          'Plan for two so you can wash one, three if you would rather never chase the laundry. And expect to buy again at the next change of season, both for the TOG and for the size.',
        ],
      },
    ],
  }),
];

const { fr, en } = pairsToArrays(pairs);

export const POSTS_LAYETTE_FR: BlogPost[] = fr;
export const POSTS_LAYETTE_EN: BlogPost[] = en;
