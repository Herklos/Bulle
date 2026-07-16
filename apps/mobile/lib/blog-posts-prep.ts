/**
 * Tiers 2 to 5: preparation, buying guides, the couple, and privacy.
 *
 * The buying guides deliberately include a "you probably don't need this" tier and a
 * second-hand-first stance (§5.5). No affiliate links, ever. In a category where every
 * other publisher is paid per click, neutrality is the differentiator, and it only works if
 * it is real.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'valise-maternite-liste',
    categoryKey: 'maison',
    categoryFr: 'Préparer',
    categoryEn: 'Prepare',
    titleFr: 'Valise maternité : la liste courte, et ce qu’on oublie',
    titleEn: 'Hospital bag: the short list, and what people forget',
    excerptFr:
      'La plupart des listes font trois pages. Voilà ce qui sert vraiment, et les deux choses qui manquent toujours.',
    excerptEn:
      'Most lists run to three pages. Here is what actually gets used, and the two things always missing.',
    readingMinutes: 5,
    heroAltFr: 'Valise maternité',
    heroAltEn: 'Hospital bag',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Préparez-la vers le début du 8e mois. Pas parce que le bébé arrivera tôt, mais parce qu’une valise faite est une chose en moins à laquelle penser pendant six semaines.',
          'La maternité fournit souvent plus que vous ne croyez. Appelez-les et demandez la liste : vous éviterez d’emporter des couches et du sérum physiologique qui sont déjà sur place.',
        ],
      },
      {
        type: 'list',
        title: 'Pour vous',
        items: [
          'Deux ou trois tenues confortables qui s’ouvrent devant',
          'Des sous-vêtements que vous acceptez de sacrifier',
          'De quoi vous laver, et vos affaires habituelles',
          'Un chargeur de téléphone long, plus long que vous ne pensez',
          'De quoi vous occuper pendant l’attente, qui peut être longue',
        ],
      },
      {
        type: 'list',
        title: 'Pour le bébé',
        items: [
          'Cinq ou six bodies et pyjamas naissance, et une taille au-dessus',
          'Une tenue de sortie, sans plus',
          'Un bonnet, des chaussettes, une couverture légère',
          'Le siège-auto, installé et essayé à vide avant le jour J',
        ],
      },
      {
        type: 'text',
        title: 'Les deux choses qu’on oublie toujours',
        paragraphs: [
          'Les documents. Carte vitale, attestation de mutuelle, carte de groupe sanguin, dossier de maternité, projet de naissance si vous en avez un. Rassemblez-les dans une pochette, à part. C’est ce qu’on vous demandera en premier et c’est ce qu’on cherche en panique.',
          'Le sac du co-parent. Il ou elle va peut-être passer une nuit entière sur un fauteuil. De quoi manger, de quoi boire, un chargeur, un pull. Les distributeurs sont vides à 4h du matin.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Ce qu’on cherche en panique le jour J, ce ne sont jamais les vêtements. Ce sont les papiers.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Pack it around the start of the eighth month. Not because the baby will come early, but because a packed bag is one thing you stop thinking about for six weeks.',
          'The hospital often provides more than you expect. Call and ask for their list: you will avoid carrying nappies and saline that are already there.',
        ],
      },
      {
        type: 'list',
        title: 'For you',
        items: [
          'Two or three comfortable outfits that open at the front',
          'Underwear you are willing to write off',
          'Toiletries, and your usual things',
          'A long phone charger, longer than you think',
          'Something to do while waiting, which can take a while',
        ],
      },
      {
        type: 'list',
        title: 'For the baby',
        items: [
          'Five or six newborn bodysuits and sleepsuits, plus one size up',
          'One going-home outfit, no more',
          'A hat, socks, a light blanket',
          'The car seat, fitted and tried empty before the day',
        ],
      },
      {
        type: 'text',
        title: 'The two things always forgotten',
        paragraphs: [
          'The documents. Insurance details, blood group card, maternity notes, your birth plan if you have one. Put them in one folder, separate from everything else. They are the first thing you will be asked for and the thing people hunt for in a panic.',
          'The co-parent’s bag. They may spend a whole night in a chair. Food, water, a charger, a jumper. The vending machines are empty at 4am.',
        ],
      },
      {
        type: 'quote',
        quote:
          'What people hunt for in a panic on the day is never the clothes. It is the paperwork.',
      },
    ],
  }),

  postPair({
    slug: 'checklist-avant-arrivee-bebe',
    categoryKey: 'maison',
    categoryFr: 'Préparer',
    categoryEn: 'Prepare',
    titleFr: 'Ce qu’il faut vraiment avoir fait avant l’arrivée',
    titleEn: 'What really needs doing before the baby arrives',
    excerptFr:
      'Il y a une différence entre ce qui est urgent, ce qui est important, et ce qui peut attendre trois mois. Voilà le tri.',
    excerptEn:
      'There is a difference between urgent, important, and can-wait-three-months. Here is the sort.',
    readingMinutes: 5,
    heroAltFr: 'Préparer l’arrivée de bébé',
    heroAltEn: 'Preparing for the baby',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les listes de préparation mélangent tout : la déclaration de grossesse et le choix de la couleur des murs se retrouvent au même niveau. L’une a une date limite légale, l’autre non.',
          'Voilà le tri qu’on aurait aimé avoir.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui a une vraie date limite',
        items: [
          'La déclaration de grossesse, avant la fin du 3e mois',
          'L’inscription à la maternité, dès que possible dans les zones tendues',
          'La recherche de mode de garde, dès le 3e ou 4e mois',
          'La demande de congé auprès de l’employeur, avec préavis',
          'La reconnaissance anticipée à la mairie, si vous n’êtes pas mariés',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui compte, sans urgence',
        items: [
          'Le siège-auto, installé et essayé, pas seulement acheté',
          'Un endroit sûr où le bébé dort, conforme et avec un matelas ferme',
          'La valise, vers le début du 8e mois',
          'Les premiers vêtements lavés et rangés',
          'Savoir qui appeler, et quand',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui peut attendre',
        items: [
          'La décoration de la chambre',
          'Le stock de couches taille 2 et au-delà',
          'La poussette parfaite, que vous choisirez mieux en la voyant servir',
          'À peu près tout ce qui est présenté comme indispensable sans l’être',
        ],
      },
      {
        type: 'text',
        title: 'Une règle simple',
        paragraphs: [
          'Si une chose a une conséquence administrative ou une conséquence de sécurité, elle passe devant. Le reste s’achète en une après-midi, y compris après la naissance, y compris en ligne à 3h du matin.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Preparation lists mix everything together: declaring the pregnancy and choosing a wall colour end up on the same line. One has a legal deadline. The other does not.',
          'Here is the sort we wish we had been given.',
        ],
      },
      {
        type: 'list',
        title: 'Things with a real deadline',
        items: [
          'Declaring the pregnancy, before the end of the third month',
          'Registering with the maternity unit, as early as possible in busy areas',
          'Starting the childcare search, from month three or four',
          'Requesting leave from your employer, with notice',
          'Acknowledging parenthood at the town hall, if you are not married',
        ],
      },
      {
        type: 'list',
        title: 'Things that matter, without urgency',
        items: [
          'The car seat, fitted and tried, not just bought',
          'A safe place for the baby to sleep, compliant, with a firm mattress',
          'The bag, around the start of the eighth month',
          'The first clothes washed and put away',
          'Knowing who to call, and when',
        ],
      },
      {
        type: 'list',
        title: 'Things that can wait',
        items: [
          'Decorating the room',
          'Stockpiling size 2 nappies and beyond',
          'The perfect pushchair, which you will choose better after seeing one in use',
          'Roughly everything sold as essential that is not',
        ],
      },
      {
        type: 'text',
        title: 'One simple rule',
        paragraphs: [
          'If something has an administrative consequence or a safety consequence, it goes first. The rest can be bought in an afternoon, including after the birth, including online at 3am.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'liste-naissance-vraiment-utile',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Liste de naissance : ce qui sert, et ce qui dort dans un placard',
    titleEn: 'Baby registry: what gets used, and what sits in a cupboard',
    excerptFr:
      'Les listes types font quarante articles. Les premières semaines en demandent une dizaine. Le reste est optionnel, et on vous le dit rarement.',
    excerptEn:
      'Standard lists run to forty items. The first weeks need about ten. The rest is optional, and nobody tells you.',
    readingMinutes: 5,
    heroAltFr: 'Liste de naissance',
    heroAltEn: 'Baby registry',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Personne n’a intérêt à vous dire d’acheter moins. C’est pour ça que les listes de naissance sont si longues.',
          'Voilà la version honnête, écrite par des gens qui ne vendent rien.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui sert vraiment, dès le premier jour',
        items: [
          'Six à huit bodies naissance, pas quinze',
          'Autant de pyjamas, ouverture devant ou sur le côté',
          'Un endroit sûr pour dormir, avec un matelas ferme à la bonne taille',
          'Un siège-auto adapté à la naissance',
          'De quoi changer : table ou tapis, à hauteur pour votre dos',
          'Quelques langes, qui servent à absolument tout',
        ],
      },
      {
        type: 'list',
        title: 'Franchement optionnel',
        items: [
          'Le chauffe-biberon, sauf si vous y tenez',
          'La baignoire dédiée, un lavabo fait souvent l’affaire',
          'Le mobile musical, que le bébé ne regardera pas avant des semaines',
          'Les chaussures, avant qu’il marche',
          'Le stérilisateur, sauf indication particulière',
          'La deuxième poussette, avant d’avoir usé la première',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un bébé n’a pas besoin de quarante pyjamas. Plus la liste est courte, plus elle est utile à ceux qui veulent vous offrir quelque chose.',
      },
      {
        type: 'text',
        title: 'Une taille au-dessus',
        paragraphs: [
          'Prévoyez quelques pièces en 1 mois, pas seulement en naissance. Certains bébés ne rentrent jamais dans du naissance, et découvrir ça à la maternité n’est pas le meilleur moment.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Nobody has an incentive to tell you to buy less. That is why registry lists are so long.',
          'Here is the honest version, written by people who sell nothing.',
        ],
      },
      {
        type: 'list',
        title: 'What genuinely gets used, from day one',
        items: [
          'Six to eight newborn bodysuits, not fifteen',
          'The same number of sleepsuits, opening at the front or side',
          'A safe place to sleep, with a firm, correctly sized mattress',
          'A car seat suitable from birth',
          'Somewhere to change them, at a height that spares your back',
          'A few muslins, which turn out to be for everything',
        ],
      },
      {
        type: 'list',
        title: 'Honestly optional',
        items: [
          'The bottle warmer, unless you want it',
          'The dedicated baby bath, a sink usually does',
          'The musical mobile, which they will not look at for weeks',
          'Shoes, before walking',
          'The steriliser, absent a specific reason',
          'The second pushchair, before wearing out the first',
        ],
      },
      {
        type: 'quote',
        quote:
          'A baby does not need forty sleepsuits. The shorter the list, the more useful it is to people who want to buy you something.',
      },
      {
        type: 'text',
        title: 'One size up',
        paragraphs: [
          'Get a few pieces in the next size, not only newborn. Some babies never fit newborn at all, and finding that out at the hospital is not the moment.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'siege-auto-i-size-choisir',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Siège-auto : la seule chose à ne jamais acheter d’occasion',
    titleEn: 'Car seats: the one thing never to buy second-hand',
    excerptFr:
      'La norme R129, le dos à la route, et pourquoi l’historique d’un siège compte plus que son prix.',
    excerptEn:
      'The R129 standard, rear-facing, and why a seat’s history matters more than its price.',
    readingMinutes: 5,
    heroAltFr: 'Siège-auto i-Size',
    heroAltEn: 'i-Size car seat',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'C’est le seul achat de cette liste où se tromper a une conséquence grave. Voilà ce qui compte, et le reste est du marketing.',
        ],
      },
      {
        type: 'text',
        title: 'La norme',
        paragraphs: [
          'i-Size, ou R129, est la norme européenne la plus récente. Elle impose le dos à la route jusqu’à 15 mois minimum, classe les sièges par taille de l’enfant plutôt que par poids, et ajoute un test de choc latéral.',
          'L’ancienne norme R44 est encore vendue. Elle n’est pas illégale, mais elle est moins exigeante. À budget égal, prenez R129.',
        ],
      },
      {
        type: 'text',
        title: 'Le dos à la route, plus longtemps que le minimum',
        paragraphs: [
          'Quinze mois est un plancher légal, pas une recommandation. La tête d’un jeune enfant est proportionnellement lourde et son cou est fragile ; le dos à la route répartit la force d’un choc frontal sur tout le dos plutôt que sur la nuque.',
          'Gardez-le dos à la route aussi longtemps que le siège le permet. Les jambes pliées ne sont pas un problème.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'N’achetez jamais un siège-auto d’occasion dont vous ne connaissez pas l’histoire. Un siège ayant subi un choc peut être fragilisé à l’intérieur sans que rien ne se voie. C’est la seule exception absolue à notre position seconde main.',
        ],
      },
      {
        type: 'text',
        title: 'L’installation compte autant que le siège',
        paragraphs: [
          'Un très bon siège mal installé protège moins qu’un siège correct bien installé. Essayez-le à vide, dans votre voiture, avant le jour J. Beaucoup de magasins et certaines associations vérifient l’installation gratuitement.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This is the only purchase on the list where getting it wrong has a serious consequence. Here is what matters. The rest is marketing.',
        ],
      },
      {
        type: 'text',
        title: 'The standard',
        paragraphs: [
          'i-Size, or R129, is the most recent European standard. It requires rear-facing to at least 15 months, sorts seats by the child’s height rather than weight, and adds a side-impact test.',
          'The older R44 standard is still sold. It is not illegal, but it is less demanding. At the same price, take R129.',
        ],
      },
      {
        type: 'text',
        title: 'Rear-facing, longer than the minimum',
        paragraphs: [
          'Fifteen months is a legal floor, not a recommendation. A young child’s head is proportionally heavy and their neck is fragile; rear-facing spreads the force of a frontal impact across the whole back instead of the neck.',
          'Keep them rear-facing as long as the seat allows. Bent legs are not a problem.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Never buy a car seat second-hand unless you know its history. A seat that has been in a crash can be weakened internally with nothing visible. This is the one absolute exception to our second-hand-first position.',
        ],
      },
      {
        type: 'text',
        title: 'Fitting matters as much as the seat',
        paragraphs: [
          'An excellent seat fitted badly protects less than a decent seat fitted well. Try it empty, in your own car, before the day. Many shops and some organisations check fitting for free.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'seconde-main-bebe-oui-non',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    titleFr: 'Seconde main : bon plan, ou à éviter ?',
    titleEn: 'Second-hand baby gear: good idea, or not?',
    excerptFr:
      'Un bébé grandit plus vite que ses affaires ne s’usent. Voilà où l’occasion est évidente, et les trois cas où il faut du neuf.',
    excerptEn:
      'A baby outgrows things faster than they wear out. Here is where second-hand is obvious, and the three cases where it is not.',
    readingMinutes: 4,
    heroAltFr: 'Achats bébé seconde main',
    heroAltEn: 'Second-hand baby gear',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La plupart des affaires de bébé sont portées trois mois puis rangées. C’est la définition d’un marché de l’occasion sain, et en France il est excellent.',
        ],
      },
      {
        type: 'list',
        title: 'Sans hésiter',
        items: [
          'Les vêtements, portés quelques semaines et souvent comme neufs',
          'Le lit, s’il est conforme et non modifié',
          'La commode, le fauteuil, les meubles en général',
          'Les jouets d’éveil, lavables',
          'Le porte-bébé et l’écharpe, si le tissu est en bon état',
        ],
      },
      {
        type: 'list',
        title: 'Avec vigilance',
        items: [
          'La poussette : vérifiez les freins, les roues et le pliage vous-même',
          'Le matelas : à éviter s’il est creusé ou taché ; un matelas ferme et bien dimensionné compte pour le sommeil',
          'Le transat et la balancelle : vérifiez le harnais et la stabilité',
        ],
      },
      {
        type: 'list',
        title: 'Jamais',
        items: [
          'Le siège-auto dont vous ne connaissez pas l’historique',
          'Tout ce qui a été rappelé par le fabricant',
          'Tout ce qui a été modifié ou réparé maison',
        ],
      },
      {
        type: 'text',
        title: 'Deux réflexes',
        paragraphs: [
          'Vérifiez la norme sur l’étiquette, pas dans l’annonce. EN 716 pour un lit, R129 pour un siège-auto. Les vendeurs de bonne foi se trompent souvent.',
          'Cherchez le nom du produit et le mot rappel avant d’acheter. Ça prend trente secondes.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Most baby things are worn for three months and then put away. That is the definition of a healthy second-hand market, and in France it is a very good one.',
        ],
      },
      {
        type: 'list',
        title: 'Without hesitation',
        items: [
          'Clothes, worn for weeks and often as good as new',
          'The cot, if it is compliant and unmodified',
          'The chest of drawers, the chair, furniture generally',
          'Washable toys',
          'Carriers and wraps, if the fabric is sound',
        ],
      },
      {
        type: 'list',
        title: 'With care',
        items: [
          'The pushchair: check the brakes, wheels and fold yourself',
          'The mattress: avoid if dipped or stained; a firm, correctly sized mattress matters for sleep',
          'Bouncers and swings: check the harness and stability',
        ],
      },
      {
        type: 'list',
        title: 'Never',
        items: [
          'A car seat whose history you do not know',
          'Anything subject to a manufacturer recall',
          'Anything modified or home-repaired',
        ],
      },
      {
        type: 'text',
        title: 'Two habits',
        paragraphs: [
          'Check the standard on the label, not in the listing. EN 716 for a cot, R129 for a car seat. Honest sellers get this wrong all the time.',
          'Search the product name plus the word recall before buying. It takes thirty seconds.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'preparer-a-deux-repartir-charge',
    categoryKey: 'entourage',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: 'Préparer à deux, vraiment',
    titleEn: 'Preparing together, actually',
    excerptFr:
      'Un parent finit souvent par tout porter dans sa tête. Ce n’est pas une question de bonne volonté, c’est une question d’organisation.',
    excerptEn:
      'One parent usually ends up carrying it all in their head. That is not about goodwill, it is about how the work is held.',
    readingMinutes: 5,
    heroAltFr: 'Préparer à deux',
    heroAltEn: 'Preparing together',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Dans beaucoup de couples, un parent devient le gestionnaire du projet et l’autre l’exécutant. Celui qui exécute a l’impression d’aider. Celui qui gère a l’impression d’être seul. Les deux ont raison.',
          'La différence ne se joue pas sur le nombre de tâches faites, mais sur qui les garde en tête.',
        ],
      },
      {
        type: 'text',
        title: 'La charge mentale, concrètement',
        paragraphs: [
          'Faire la valise, c’est une tâche. Savoir qu’il faut la faire, à quel moment, et vérifier qu’elle est faite, c’est le travail invisible. Répartir les tâches sans répartir ce travail-là ne change rien.',
          'Le test est simple : si une seule personne saurait dire ce qui reste à faire cette semaine, la charge n’est pas partagée.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Demander quoi faire, c’est encore demander à l’autre de gérer.',
      },
      {
        type: 'list',
        title: 'Ce qui marche',
        items: [
          'Attribuer des sujets entiers, pas des tâches : l’un prend l’administratif de bout en bout, l’autre le nid',
          'Écrire les choses au même endroit, accessible aux deux, plutôt que dans la tête de l’un',
          'Décider ensemble une fois, puis laisser celui qui gère le sujet décider seul du reste',
          'Accepter que ce ne sera pas fait exactement comme vous l’auriez fait',
        ],
      },
      {
        type: 'text',
        title: 'Et si vous préparez seul',
        paragraphs: [
          'Tout ce qui précède suppose deux personnes. Beaucoup de gens préparent seuls, par choix ou non. Dans ce cas, le levier n’est pas la répartition mais la délégation : identifiez les trois choses que quelqu’un d’autre peut faire à votre place, et demandez précisément. Les gens veulent aider et ne savent pas comment.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'In many couples one parent becomes the project manager and the other the executor. The executor feels like they are helping. The manager feels alone. Both are right.',
          'The difference is not how many tasks get done. It is who holds them in their head.',
        ],
      },
      {
        type: 'text',
        title: 'Mental load, concretely',
        paragraphs: [
          'Packing the bag is a task. Knowing it needs packing, by when, and checking that it happened, is the invisible work. Splitting tasks without splitting that work changes nothing.',
          'The test is simple: if only one of you could say what is left to do this week, the load is not shared.',
        ],
      },
      {
        type: 'quote',
        quote: 'Asking what to do is still asking the other person to manage it.',
      },
      {
        type: 'list',
        title: 'What works',
        items: [
          'Own whole subjects, not tasks: one takes the paperwork end to end, the other takes the nest',
          'Write things in one place both of you can reach, rather than in one person’s head',
          'Decide together once, then let whoever owns the subject decide the rest alone',
          'Accept it will not be done exactly the way you would have done it',
        ],
      },
      {
        type: 'text',
        title: 'And if you are preparing alone',
        paragraphs: [
          'All of the above assumes two people. Plenty of people prepare alone, by choice or not. The lever there is not splitting but delegating: name the three things someone else could do for you, and ask precisely. People want to help and do not know how.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'applications-grossesse-donnees',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Ce que les applis de grossesse savent de vous',
    titleEn: 'What pregnancy apps know about you',
    excerptFr:
      'Une date de terme est une donnée de santé. Voilà les questions à poser à n’importe quelle appli, y compris la nôtre.',
    excerptEn:
      'A due date is health data. Here are the questions to ask any app, including ours.',
    readingMinutes: 5,
    heroAltFr: 'Vie privée et applications de grossesse',
    heroAltEn: 'Privacy and pregnancy apps',
    disclaimer: false,
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une grossesse est l’un des rares moments où vos habitudes d’achat changent presque du jour au lendemain. C’est précisément ce qui rend ces données précieuses, et c’est pour ça que tant d’applis sont gratuites.',
          'Le RGPD classe les données de grossesse comme des données de santé, dans une catégorie particulière. Ça ne veut pas dire que personne ne les collecte.',
        ],
      },
      {
        type: 'list',
        title: 'Les questions à poser, à n’importe quelle appli',
        items: [
          'Où vivent mes données : sur mon téléphone, ou sur leurs serveurs ?',
          'L’éditeur peut-il techniquement lire ce que j’écris ?',
          'Que se passe-t-il si je supprime mon compte ? Est-ce une vraie suppression ?',
          'Y a-t-il des SDK publicitaires ou analytiques tiers dans l’appli ?',
          'Puis-je exporter ce que j’ai écrit et partir ?',
          'Si c’est gratuit et sans publicité, qui paie ?',
        ],
      },
      {
        type: 'text',
        title: 'Chiffré, ça veut dire quoi',
        paragraphs: [
          'Presque toutes les applis disent chiffrer vos données. La plupart du temps, ça veut dire chiffré en transit, et chiffré au repos sur un serveur dont elles détiennent la clé. C’est utile contre un vol de disque. Ça ne les empêche pas de lire.',
          'Le chiffrement de bout en bout veut dire que la clé ne quitte jamais vos appareils, et que l’éditeur ne peut pas lire, même s’il le voulait, même si on le lui demandait. La différence est énorme et le mot est le même.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La bonne question n’est pas est-ce chiffré, mais qui détient la clé.',
      },
      {
        type: 'text',
        title: 'Notre réponse',
        paragraphs: [
          'Bulle n’a pas de compte. Vos données restent sur votre téléphone. Ce qui se synchronise entre vous et votre co-parent est chiffré de bout en bout, avec une clé que nous n’avons pas. Nous ne pouvons pas lire ce que vous écrivez. Il n’y a pas de publicité, pas de SDK tiers, et l’application s’achète une fois.',
          'Vous n’avez pas à nous croire sur parole : posez-nous les six questions ci-dessus, et posez-les aux autres.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pregnancy is one of the few moments when your buying habits change almost overnight. That is exactly what makes this data valuable, and why so many apps are free.',
          'The GDPR treats pregnancy data as health data, in a special category. That does not mean nobody collects it.',
        ],
      },
      {
        type: 'list',
        title: 'Questions to ask any app',
        items: [
          'Where does my data live: on my phone, or on their servers?',
          'Can the company technically read what I write?',
          'What happens if I delete my account? Is it a real deletion?',
          'Are there third-party advertising or analytics SDKs in the app?',
          'Can I export what I wrote and leave?',
          'If it is free and ad-free, who is paying?',
        ],
      },
      {
        type: 'text',
        title: 'What "encrypted" means',
        paragraphs: [
          'Almost every app says it encrypts your data. Usually that means encrypted in transit, and encrypted at rest on a server whose key they hold. That helps against a stolen disk. It does not stop them reading.',
          'End-to-end encryption means the key never leaves your devices, and the company cannot read your data even if it wanted to, even if it were asked. The difference is enormous and the word is the same.',
        ],
      },
      {
        type: 'quote',
        quote: 'The real question is not whether it is encrypted, but who holds the key.',
      },
      {
        type: 'text',
        title: 'Our answer',
        paragraphs: [
          'Bulle has no account. Your data stays on your phone. What syncs between you and your co-parent is end-to-end encrypted with a key we do not have. We cannot read what you write. There are no ads, no third-party SDKs, and the app is bought once.',
          'You do not have to take our word for it: ask us the six questions above, and ask everyone else too.',
        ],
      },
    ],
  }),
];

export const POSTS_PREP_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_PREP_EN: BlogPost[] = pairs.map((p) => p.en);
