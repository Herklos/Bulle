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
];

const { fr, en } = pairsToArrays(pairs);

export const POSTS_LAYETTE_FR: BlogPost[] = fr;
export const POSTS_LAYETTE_EN: BlogPost[] = en;
