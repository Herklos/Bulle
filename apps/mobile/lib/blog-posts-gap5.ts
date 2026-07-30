/**
 * Gap run, batch 5 — preparation, home, entourage, privacy.
 *
 * More practical than legal, but the same discipline: any safety or legal claim is attributed
 * to an official source (securite routiere, agriculture.gouv.fr for food safety, ameli for
 * safe sleep and toxoplasmose, CNIL for a child's image rights). Purely organisational advice
 * carries no false authority. The two non-medical preparation pieces drop the medical
 * disclaimer, matching blog-posts-prep.ts; the home, entourage and privacy pieces keep it.
 * The privacy piece is Bulle's differentiator and stays factual, never alarmist.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'trajet-maternite-anticiper',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Preparation',
    disclaimer: false,
    titleFr: 'Anticiper le trajet vers la maternité : ce qui se prépare vraiment',
    titleEn: 'Planning the trip to the maternity unit: what actually needs preparing',
    excerptFr:
      'Le jour venu, ce n’est pas le moment de découvrir le parking ou de chercher la coque. Le siège auto est obligatoire dès la sortie. Le reste se repère à froid, quelques semaines avant.',
    excerptEn:
      'On the day, it is no time to discover the car park or hunt for the car seat. The seat is mandatory from the exit. The rest is scouted calmly, a few weeks before.',
    readingMinutes: 4,
    heroAltFr: 'Anticiper le trajet vers la maternité',
    heroAltEn: 'Planning the trip to the maternity unit',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le trajet vers la maternité est l’une des rares choses de cette période qu’on peut entièrement préparer à froid, et qu’on prépare pourtant rarement. Le jour venu, on improvise un itinéraire, un stationnement et une installation de siège auto en même temps, dans le moins bon état d’esprit pour le faire.',
          'Cet article ne parle pas du moment de partir, qui se discute avec la maternité et l’équipe qui vous suit. Il parle de ce qui se règle des semaines avant, une fois pour toutes.',
        ],
      },
      {
        type: 'text',
        title: 'Le seul point non négociable : le siège auto',
        paragraphs: [
          'Le siège auto est obligatoire dès la sortie de la maternité, y compris pour un trajet de quelques centaines de mètres. Tout enfant doit être installé dans un dispositif de retenue homologué et adapté, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1990).',
          'La norme en vigueur est la R129, dite i-Size. L’essentiel n’est pas d’en parler mais de l’avoir installé et essayé avant, base et sangles comprises. Un siège auto découvert dans l’emballage un jour de sortie est le scénario à éviter.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui se repère à froid',
        paragraphs: [
          'Le trajet réel jusqu’à la maternité, à l’heure où vous risquez de partir, avec un itinéraire de secours en cas de route coupée. Le stationnement : dépose-minute, parking visiteurs, et surtout l’accès aux urgences la nuit, qui n’est pas toujours l’entrée principale.',
          'Qui conduit, et un plan B si cette personne n’est pas disponible : un proche, un taxi. Gardez les numéros utiles à portée, et le sac ainsi que les documents près de la porte plutôt qu’au fond d’un placard.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Siège auto : obligatoire dès la sortie, installé et essayé avant',
          'Trajet : repéré à l’avance, avec un itinéraire de secours',
          'Stationnement : dépose-minute, parking, accès urgences de nuit',
          'Conduite : qui conduit, et un plan B',
          'À portée : numéros utiles, sac et documents près de la porte',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le jour du départ ne devrait rien vous apprendre sur le trajet. Tout ce qui s’y improvise a pu se régler à froid, plusieurs semaines avant.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The trip to the maternity unit is one of the few things in this period you can fully prepare calmly, and yet rarely do. On the day, people improvise a route, a parking spot and a car-seat fitting all at once, in the worst possible frame of mind for it.',
          'This article is not about when to leave, which is discussed with the unit and the team following you. It is about what gets settled weeks before, once and for all.',
        ],
      },
      {
        type: 'text',
        title: 'The one non-negotiable: the car seat',
        paragraphs: [
          'The car seat is mandatory from the moment you leave the maternity unit, including for a few-hundred-metre drive. Every child must be placed in an approved, suitable restraint, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1990).',
          'The standard in force is R129, known as i-Size. The point is not to talk about it but to have it fitted and tried beforehand, base and straps included. A car seat discovered in its box on the day out is the scenario to avoid.',
        ],
      },
      {
        type: 'text',
        title: 'What is scouted calmly',
        paragraphs: [
          'The real route to the unit, at the hour you might leave, with a backup itinerary in case a road is closed. Parking: drop-off, visitor car park, and above all night access to A&E, which is not always the main entrance.',
          'Who drives, and a plan B if that person is unavailable: a relative, a taxi. Keep the useful numbers to hand, and the bag and documents near the door rather than at the back of a cupboard.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Car seat: mandatory from the exit, fitted and tried beforehand',
          'Route: scouted in advance, with a backup itinerary',
          'Parking: drop-off, car park, night A&E access',
          'Driving: who drives, and a plan B',
          'To hand: useful numbers, bag and documents near the door',
        ],
      },
      {
        type: 'quote',
        quote:
          'The day you leave should teach you nothing about the trip. Everything improvised then could have been settled calmly, several weeks before.',
      },
    ],
  }),

  postPair({
    slug: 'batch-cooking-avant-la-naissance',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Preparation',
    disclaimer: false,
    titleFr: 'Congeler des repas avant la naissance : la préparation qui se mange',
    titleEn: 'Freezing meals before the birth: the preparation you can eat',
    excerptFr:
      'Les premières semaines laissent peu de temps pour cuisiner. Quelques sessions dans le dernier mois, et le congélateur devient un filet de sécurité. Voici quoi congeler, et comment le faire sans risque.',
    excerptEn:
      'The first weeks leave little time to cook. A few sessions in the last month, and the freezer becomes a safety net. Here is what to freeze, and how to do it safely.',
    readingMinutes: 4,
    heroAltFr: 'Congeler des repas avant la naissance',
    heroAltEn: 'Freezing meals before the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Parmi toutes les préparations de l’arrivée d’un bébé, celle-ci a un mérite rare : elle se mange. Les premières semaines laissent peu de temps et encore moins d’énergie pour cuisiner, et un congélateur rempli à l’avance devient un vrai filet de sécurité.',
          'Rien de compliqué, à condition de s’y prendre en plusieurs fois plutôt qu’en un marathon, et de respecter quelques règles simples de congélation.',
        ],
      },
      {
        type: 'text',
        title: 'Quoi congeler, et comment le portionner',
        paragraphs: [
          'Les plats mijotés, soupes, sauces, currys, chili et gratins se congèlent très bien. Les crudités, les pommes de terre en morceaux, les laitages frais et les fritures, beaucoup moins : inutile d’insister dessus.',
          'Portionnez en parts individuelles ou pour deux, à plat, pour une décongélation rapide. Viser une dizaine à une quinzaine de repas couvre confortablement les premières semaines. Et surtout, étiquetez systématiquement le contenu et la date : c’est ce qui évite le plat oublié au fond du congélateur.',
        ],
      },
      {
        type: 'text',
        title: 'Les règles de congélation à respecter',
        paragraphs: [
          'Quelques repères de sécurité alimentaire, tirés d’[agriculture.gouv.fr](https://agriculture.gouv.fr/les-bonnes-pratiques-de-la-congelation) : réglez le congélateur à -18 °C, ne recongelez jamais un aliment décongelé sauf s’il a été cuit entre-temps, et décongelez au réfrigérateur plutôt qu’à température ambiante.',
          'Un point utile à garder en tête : la congélation stoppe la prolifération des bactéries, mais ne les détruit pas. On congèle donc des aliments très frais, refroidis rapidement, dans des contenants propres et bien fermés.',
        ],
      },
      {
        type: 'text',
        title: 'Quand s’y mettre',
        paragraphs: [
          'Le bon moment est le dernier mois, vers 34 à 37 semaines, en plusieurs sessions courtes plutôt qu’une grande journée épuisante. Cuisiner en double une fois par semaine et congeler la moitié suffit à constituer un stock sans y penser.',
          'C’est aussi une tâche que le co-parent ou l’entourage peut prendre entièrement en charge. Un « je m’occupe des repas d’avance » est l’une des aides les plus concrètes qu’on puisse offrir à ce moment-là.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Se congèle bien : plats mijotés, soupes, sauces, currys, gratins',
          'Portions : individuelles ou pour deux, à plat, étiquetées avec la date',
          'Quantité : une dizaine à une quinzaine de repas',
          'Sécurité : -18 °C, pas de recongélation, décongélation au réfrigérateur',
          'Quand : le dernier mois, en plusieurs sessions courtes',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un congélateur préparé, c’est du temps et de l’énergie rendus aux premières semaines. C’est la seule préparation de cette période qui se déguste.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Of all the preparations for a baby\'s arrival, this one has a rare merit: you can eat it. The first weeks leave little time and even less energy to cook, and a freezer filled in advance becomes a real safety net.',
          'Nothing complicated, provided you go in several sessions rather than one marathon, and follow a few simple freezing rules.',
        ],
      },
      {
        type: 'text',
        title: 'What to freeze, and how to portion it',
        paragraphs: [
          'Stews, soups, sauces, curries, chilli and bakes freeze very well. Raw vegetables, chunks of potato, fresh dairy and fried food, much less so: no point insisting on those.',
          'Portion into single or two-person servings, laid flat, for quick thawing. Aiming for ten to fifteen meals comfortably covers the first weeks. And above all, label the contents and date every time: that is what avoids the dish forgotten at the back of the freezer.',
        ],
      },
      {
        type: 'text',
        title: 'The freezing rules to follow',
        paragraphs: [
          'A few food-safety markers, from [agriculture.gouv.fr](https://agriculture.gouv.fr/les-bonnes-pratiques-de-la-congelation): set the freezer to -18°C, never refreeze a thawed food unless it has been cooked in between, and thaw in the fridge rather than at room temperature.',
          'One useful thing to keep in mind: freezing stops bacteria multiplying, but does not destroy them. So you freeze very fresh food, cooled quickly, in clean, well-sealed containers.',
        ],
      },
      {
        type: 'text',
        title: 'When to start',
        paragraphs: [
          'The right time is the last month, around 34 to 37 weeks, in several short sessions rather than one exhausting day. Cooking double once a week and freezing half is enough to build a stock without thinking about it.',
          'It is also a task the co-parent or those around you can take on entirely. An "I\'ll handle the make-ahead meals" is one of the most concrete kinds of help you can offer at that moment.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Freezes well: stews, soups, sauces, curries, bakes',
          'Portions: single or two-person, laid flat, labelled with the date',
          'Quantity: ten to fifteen meals',
          'Safety: -18°C, no refreezing, thaw in the fridge',
          'When: the last month, in several short sessions',
        ],
      },
      {
        type: 'quote',
        quote:
          'A prepared freezer is time and energy handed back to the first weeks. It is the one preparation of this period you get to taste.',
      },
    ],
  }),

  postPair({
    slug: 'securiser-la-maison-par-ou-commencer',
    categoryKey: 'maison',
    categoryFr: 'La maison',
    categoryEn: 'Home',
    titleFr: 'Sécuriser la maison pour bébé : par où commencer, et ce qui peut attendre',
    titleEn: 'Baby-proofing the home: where to start, and what can wait',
    excerptFr:
      'Tout n’est pas urgent en même temps. Avant la naissance, le sommeil et quelques bases. Le reste, cache-prises et barrières, attend que bébé se déplace. Commencer par le lit évite la panique.',
    excerptEn:
      'Not everything is urgent at once. Before the birth, sleep and a few basics. The rest, socket covers and gates, waits until baby moves. Starting with the cot avoids the panic.',
    readingMinutes: 4,
    heroAltFr: 'Sécuriser la maison pour l’arrivée de bébé',
    heroAltEn: 'Baby-proofing the home for the arrival',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Sécuriser la maison peut vite devenir une liste anxiogène et sans fin, achetée en urgence dans les dernières semaines. C’est inutile, parce que tout n’arrive pas en même temps : un nouveau-né ne se déplace pas, et l’essentiel des dangers de la maison ne le concerne pas encore.',
          'La bonne approche est de trier par le calendrier : ce qui compte avant la naissance, et ce qui attendra que bébé commence à bouger.',
        ],
      },
      {
        type: 'text',
        title: 'Avant la naissance : le sommeil d’abord',
        paragraphs: [
          'La priorité n’est pas un gadget de sécurité, c’est l’environnement de sommeil. Selon [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), bébé dort sur le dos, sur un matelas ferme aux dimensions du lit, sans oreiller, tour de lit, couverture ni peluche, dans une gigoteuse, dans une chambre autour de 18 à 20 degrés.',
          'C’est la seule ligne de cette préparation qui ne relève pas du confort mais de la sécurité, et elle se met en place avant l’arrivée, pas après. Le reste des bases avant la naissance est court : un détecteur de fumée qui fonctionne, et les produits ménagers et médicaments rangés en hauteur.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui peut attendre la mobilité',
        paragraphs: [
          'Cache-prises, barrières d’escalier, coins de table, blocs-tiroirs, fixation des meubles susceptibles de basculer : tout cela devient utile quand bébé commence à ramper et à se mettre debout, soit vers six à neuf mois.',
          'Les installer avant la naissance ne protège personne et ajoute du stress à une période qui n’en manque pas. Vous aurez le temps de les poser en observant, justement, par où votre enfant commence à explorer.',
        ],
      },
      {
        type: 'text',
        title: 'Un mot sur l’eau chaude',
        paragraphs: [
          'Un réglage simple prévient les brûlures : limiter la température de l’eau chaude sanitaire. C’est un geste qui se fait une fois, tranquillement, et qui reste valable pour toute la petite enfance.',
          'Comme pour le reste, inutile d’en faire une source d’angoisse. On commence par le sommeil, on pose une ou deux bases, et le reste vient au rythme de bébé.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Avant la naissance : couchage sûr (sur le dos, lit vide, gigoteuse, 18-20 °C)',
          'Avant la naissance : détecteur de fumée, produits et médicaments en hauteur',
          'Avant la naissance : limiter la température de l’eau chaude',
          'À la mobilité (6-9 mois) : cache-prises, barrières, coins de table, meubles fixés',
          'Le principe : trier par le calendrier, commencer par le sommeil',
        ],
      },
      {
        type: 'quote',
        quote:
          'On ne sécurise pas contre tout d’un coup. Avant la naissance, le lit ; le reste attend que bébé se déplace. Commencer par le sommeil suffit à écarter la panique.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Baby-proofing can quickly turn into an anxious, endless list, bought in a rush in the final weeks. It is unnecessary, because it does not all arrive at once: a newborn does not move, and most of the home\'s dangers do not concern them yet.',
          'The right approach is to sort by the calendar: what matters before the birth, and what will wait until baby starts to move.',
        ],
      },
      {
        type: 'text',
        title: 'Before the birth: sleep first',
        paragraphs: [
          'The priority is not a safety gadget, it is the sleep environment. According to [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe), baby sleeps on their back, on a firm mattress cut to the cot, with no pillow, cot bumper, blanket or soft toy, in a sleep sack, in a room around 18 to 20 degrees.',
          'It is the one line of this preparation that is about safety rather than comfort, and it is set up before the arrival, not after. The rest of the pre-birth basics is short: a working smoke detector, and cleaning products and medicines stored up high.',
        ],
      },
      {
        type: 'text',
        title: 'What can wait for mobility',
        paragraphs: [
          'Socket covers, stair gates, table-corner guards, drawer locks, securing furniture that could tip over: all of this becomes useful when baby starts to crawl and pull up, around six to nine months.',
          'Fitting them before the birth protects nobody and adds stress to a period that has plenty. You will have time to fit them while watching, precisely, where your child begins to explore.',
        ],
      },
      {
        type: 'text',
        title: 'A word on hot water',
        paragraphs: [
          'A simple setting prevents scalds: limiting the temperature of the hot water. It is done once, calmly, and stays valid throughout early childhood.',
          'As with the rest, no need to make it a source of anxiety. You start with sleep, set one or two basics, and the rest comes at baby\'s pace.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Before the birth: safe sleep (on the back, empty cot, sleep sack, 18-20°C)',
          'Before the birth: smoke detector, products and medicines up high',
          'Before the birth: limit the hot-water temperature',
          'At mobility (6-9 months): socket covers, gates, corner guards, secured furniture',
          'The principle: sort by the calendar, start with sleep',
        ],
      },
      {
        type: 'quote',
        quote:
          'You do not baby-proof against everything at once. Before the birth, the cot; the rest waits until baby moves. Starting with sleep is enough to keep the panic away.',
      },
    ],
  }),

  postPair({
    slug: 'preparer-lanimal-a-larrivee',
    categoryKey: 'maison',
    categoryFr: 'La maison',
    categoryEn: 'Home',
    titleFr: 'Préparer l’animal à l’arrivée du bébé : les semaines qui précèdent comptent le plus',
    titleEn: 'Preparing the pet for the baby’s arrival: the weeks before matter most',
    excerptFr:
      'Un chien ou un chat s’habitue mieux au bébé si les changements arrivent avant lui, pas avec lui. Et un point de grossesse concerne le chat : la litière et la toxoplasmose.',
    excerptEn:
      'A dog or cat adjusts better to the baby if the changes come before it, not with it. And one pregnancy point concerns the cat: the litter tray and toxoplasmosis.',
    readingMinutes: 4,
    heroAltFr: 'Préparer l’animal de compagnie à l’arrivée du bébé',
    heroAltEn: 'Preparing the pet for the baby’s arrival',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Un animal de compagnie vit l’arrivée d’un bébé comme un bouleversement de ses repères : nouveaux bruits, nouvelles odeurs, nouvelles règles, et une attention qui se partage. La clé tient en une idée simple : que ces changements arrivent avant le bébé, pas en même temps que lui.',
          'Ainsi l’animal les associe à la vie normale, et non à l’intrus qui vient de tout modifier d’un coup.',
        ],
      },
      {
        type: 'text',
        title: 'Habituer avant, pas pendant',
        paragraphs: [
          'Installez le matériel du bébé tôt, laissez l’animal explorer la chambre puis posez des limites calmement. Diffusez des bruits de bébé pour qu’ils cessent d’être une surprise. Anticipez les changements de routine, horaires de promenade, accès à certaines pièces, plusieurs semaines à l’avance.',
          'Un geste utile au retour de la maternité : rapporter d’abord un linge portant l’odeur du bébé, avant l’arrivée elle-même. Et prévoir pour l’animal un espace refuge où il peut se retirer, ainsi que des moments d’attention rien que pour lui.',
        ],
      },
      {
        type: 'text',
        title: 'La règle de sécurité qui ne se discute pas',
        paragraphs: [
          'Aussi doux soit-il, un animal ne doit jamais rester seul avec le nouveau-né. Ce n’est pas une question de confiance envers votre animal, c’est un principe de prudence de base, valable pour tous.',
          'Le reste est une affaire de patience et d’observation. La plupart des animaux trouvent leur place en quelques semaines, à condition qu’on leur laisse le temps et qu’on ne leur retire pas tout repère d’un coup.',
        ],
      },
      {
        type: 'text',
        title: 'Le point chat : litière et toxoplasmose',
        paragraphs: [
          'Ce point concerne la grossesse, pas la cohabitation avec le bébé, et il vise le chat. Si la future mère n’est pas immunisée contre la toxoplasmose, mieux vaut confier le nettoyage de la litière à quelqu’un d’autre. À défaut, la nettoyer chaque jour à l’eau de plus de 70 degrés, avec des gants, selon [ameli.fr](https://www.ameli.fr/assure/sante/themes/toxoplasmose/prevention).',
          'À noter : un chat strictement d’intérieur, nourri en croquettes ou en conserves, ne présente pas ce risque. Il n’y a donc pas lieu d’en faire un danger « animal plus bébé » : c’est un geste de précaution de grossesse, ciblé et simple.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Avant la naissance : installer le matériel, habituer aux bruits et aux nouvelles règles',
          'Au retour : rapporter un linge à l’odeur du bébé, prévoir un espace refuge',
          'Sécurité : ne jamais laisser l’animal seul avec le nouveau-né',
          'Chat et grossesse : litière confiée à un tiers si non immunisée, sinon eau > 70 °C et gants',
          'Chat d’intérieur nourri en croquettes ou conserves : pas de risque toxoplasmose',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un animal s’habitue au bébé quand les changements le précèdent. Ce qui arrive avant devient la vie normale ; ce qui arrive avec le bébé devient sa faute.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pet experiences a baby\'s arrival as an upheaval of its bearings: new sounds, new smells, new rules, and attention that now gets shared. The key holds in one simple idea: let these changes come before the baby, not at the same time.',
          'That way the animal associates them with normal life, and not with the intruder who just changed everything at once.',
        ],
      },
      {
        type: 'text',
        title: 'Habituate before, not during',
        paragraphs: [
          'Set up the baby\'s equipment early, let the animal explore the room, then set limits calmly. Play baby sounds so they stop being a surprise. Anticipate routine changes, walk times, access to certain rooms, several weeks ahead.',
          'One useful gesture on the way back from the maternity unit: first bring home a cloth carrying the baby\'s scent, before the arrival itself. And give the animal a safe retreat where it can withdraw, plus moments of attention just for it.',
        ],
      },
      {
        type: 'text',
        title: 'The safety rule that is not up for debate',
        paragraphs: [
          'However gentle it is, an animal must never be left alone with the newborn. It is not a question of trust in your pet, it is a basic principle of caution, true for all.',
          'The rest is a matter of patience and observation. Most animals find their place within a few weeks, provided they are given time and not stripped of all their bearings at once.',
        ],
      },
      {
        type: 'text',
        title: 'The cat point: litter and toxoplasmosis',
        paragraphs: [
          'This point concerns the pregnancy, not living with the baby, and it applies to cats. If the mother-to-be is not immune to toxoplasmosis, it is better to entrust cleaning the litter tray to someone else. Failing that, clean it every day with water above 70 degrees, wearing gloves, according to [ameli.fr](https://www.ameli.fr/assure/sante/themes/toxoplasmose/prevention).',
          'Note: a strictly indoor cat, fed on kibble or tinned food, does not present this risk. So there is no reason to make it an "animal plus baby" danger: it is a targeted, simple pregnancy precaution.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Before the birth: set up the equipment, habituate to sounds and new rules',
          'On the return: bring home a cloth with the baby\'s scent, provide a safe retreat',
          'Safety: never leave the animal alone with the newborn',
          'Cat and pregnancy: litter to someone else if not immune, otherwise water > 70°C and gloves',
          'Indoor cat fed on kibble or tins: no toxoplasmosis risk',
        ],
      },
      {
        type: 'quote',
        quote:
          'An animal adjusts to the baby when the changes come before it. What arrives before becomes normal life; what arrives with the baby becomes its fault.',
      },
    ],
  }),

  postPair({
    slug: 'cadrer-laide-des-proches',
    categoryKey: 'entourage',
    categoryFr: 'L’entourage',
    categoryEn: 'Family and friends',
    titleFr: 'Cadrer l’aide des grands-parents sans conflit : se mettre d’accord à deux d’abord',
    titleEn: 'Framing grandparents’ help without conflict: agree as a couple first',
    excerptFr:
      'L’aide de l’entourage est précieuse, et source de tension quand elle n’est pas cadrée. Le secret n’est pas de refuser, c’est de transformer une présence en tâches, et de s’accorder à deux avant d’en parler.',
    excerptEn:
      'Help from family is precious, and a source of tension when it is not framed. The secret is not to refuse, it is to turn a presence into tasks, and to agree as a couple before speaking of it.',
    readingMinutes: 4,
    heroAltFr: 'Cadrer l’aide des grands-parents et de l’entourage',
    heroAltEn: 'Framing help from grandparents and family',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’arrivée d’un bébé mobilise l’entourage, qui veut aider, et c’est une chance. C’est aussi l’une des premières sources de tension, non pas parce que l’aide serait mal intentionnée, mais parce qu’elle est rarement cadrée.',
          'Le sujet n’est pas de refuser l’aide, ce serait dommage. C’est de la rendre utile sans qu’elle pèse, et cela commence avant même d’en parler aux proches.',
        ],
      },
      {
        type: 'text',
        title: 'S’accorder à deux avant d’en parler',
        paragraphs: [
          'La première conversation n’est pas avec les grands-parents, elle est entre vous deux. Se mettre d’accord sur ce dont vous avez besoin, et sur vos limites, évite d’être pris à contre-pied à voix haute devant un parent plein de bonne volonté.',
          'Un couple qui parle d’une seule voix cadre sans blesser. Un couple qui découvre son désaccord devant l’entourage transforme une aide en négociation.',
        ],
      },
      {
        type: 'text',
        title: 'Transformer une présence en tâches',
        paragraphs: [
          'L’aide la plus utile n’est presque jamais une présence indéfinie autour du bébé. Ce sont des tâches concrètes : des courses, un repas, une lessive, s’occuper de l’aîné, tenir le bébé pendant que vous dormez une heure.',
          'Proposer ces tâches explicitement aide tout le monde. Cela donne aux proches un rôle clair et valorisant, et cela vous épargne d’avoir à gérer des visiteurs quand vous auriez besoin de mains.',
        ],
      },
      {
        type: 'text',
        title: 'Les visites, et les habitudes qui ont changé',
        paragraphs: [
          'Cadrez les visites sans culpabilité : durée, fréquence, prévenir avant de venir, respecter le repos. Exprimer ces attentes tôt et clairement, en termes de besoins plutôt que de reproches, désamorce l’essentiel des frictions.',
          'Un point aide à le faire avec tact : certaines recommandations ont changé d’une génération à l’autre. Le couchage sûr, aujourd’hui sur le dos et dans un lit vide, ne correspond plus toujours aux habitudes des grands-parents, comme le rappelle [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). Le dire comme une évolution, pas comme un reproche, évite bien des tensions.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'D’abord : se mettre d’accord à deux sur les besoins et les limites',
          'Ensuite : transformer l’aide en tâches concrètes, pas en présence indéfinie',
          'Visites : cadrer durée, fréquence, prévenir avant de venir',
          'Formuler en besoins, pas en reproches, et tôt plutôt que sous tension',
          'Certaines habitudes ont changé (couchage) : l’expliquer comme une évolution',
        ],
      },
      {
        type: 'quote',
        quote:
          'Aider, ce n’est pas être là, c’est faire. La question à poser aux proches n’est pas « voulez-vous venir » mais « pouvez-vous vous occuper de ça ».',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A baby\'s arrival mobilises those around you, who want to help, and that is a blessing. It is also one of the first sources of tension, not because the help is ill-intentioned, but because it is rarely framed.',
          'The issue is not to refuse help, that would be a shame. It is to make it useful without letting it weigh, and that starts before you even speak to relatives.',
        ],
      },
      {
        type: 'text',
        title: 'Agree as a couple before speaking of it',
        paragraphs: [
          'The first conversation is not with the grandparents, it is between the two of you. Agreeing on what you need, and on your limits, avoids being caught out loud in front of a well-meaning parent.',
          'A couple speaking with one voice sets boundaries without hurting. A couple discovering its disagreement in front of family turns help into a negotiation.',
        ],
      },
      {
        type: 'text',
        title: 'Turn a presence into tasks',
        paragraphs: [
          'The most useful help is almost never an open-ended presence around the baby. It is concrete tasks: shopping, a meal, a load of laundry, looking after the older child, holding the baby while you sleep an hour.',
          'Offering these tasks explicitly helps everyone. It gives relatives a clear and rewarding role, and it spares you having to manage visitors when what you need is hands.',
        ],
      },
      {
        type: 'text',
        title: 'Visits, and habits that have changed',
        paragraphs: [
          'Frame the visits without guilt: length, frequency, giving notice before coming, respecting rest. Expressing these expectations early and clearly, in terms of needs rather than reproaches, defuses most of the friction.',
          'One point helps to do it tactfully: some recommendations have changed from one generation to the next. Safe sleep, today on the back and in an empty cot, no longer always matches grandparents\' habits, as [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) recalls. Saying it as an evolution, not a reproach, avoids much tension.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'First: agree as a couple on the needs and the limits',
          'Then: turn help into concrete tasks, not an open-ended presence',
          'Visits: frame length, frequency, giving notice before coming',
          'Phrase in needs, not reproaches, and early rather than under tension',
          'Some habits have changed (safe sleep): explain it as an evolution',
        ],
      },
      {
        type: 'quote',
        quote:
          'Helping is not being there, it is doing. The question to ask relatives is not "do you want to come" but "can you take care of this".',
      },
    ],
  }),

  postPair({
    slug: 'photos-de-bebe-en-ligne',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Partager des photos de bébé en ligne : ce qu’on ne peut pas défaire',
    titleEn: 'Sharing baby photos online: what cannot be undone',
    excerptFr:
      'La première photo part avant même le retour à la maison. La CNIL déconseille le partage public, rappelle que l’image de l’enfant se protège à deux, et recommande des canaux privés. Voici pourquoi.',
    excerptEn:
      'The first photo goes out before you even get home. The CNIL advises against public sharing, recalls that a child’s image is protected by both parents, and recommends private channels. Here is why.',
    readingMinutes: 4,
    heroAltFr: 'Partager des photos de bébé en ligne et la vie privée',
    heroAltEn: 'Sharing baby photos online and privacy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’annonce d’une naissance passe aujourd’hui souvent par une photo, envoyée dans l’heure, parfois avant même le retour à la maison. Le geste est joyeux et naturel. Il mérite pourtant un temps d’arrêt, parce qu’une image publiée ne se reprend pas.',
          'Ce n’est pas une question de peur, c’est une question de choix par défaut. Et sur ce sujet, Bulle a un parti pris assumé.',
        ],
      },
      {
        type: 'text',
        title: 'L’image de l’enfant se protège à deux',
        paragraphs: [
          'Depuis une loi de 2024, le Code civil précise que les parents protègent en commun le droit à l’image de leur enfant mineur. Publier la photo d’un enfant suppose l’accord des deux titulaires de l’autorité parentale, et le juge peut interdire à un parent de publier sans l’accord de l’autre.',
          'Autrement dit, la photo de votre enfant n’est pas un contenu comme un autre : c’est son image, dont vous êtes les gardiens, ensemble. C’est un bon point de départ pour en parler à deux avant qu’elle ne circule.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que rappelle la CNIL',
        paragraphs: [
          'La CNIL déconseille le partage de photos et vidéos d’enfants sur les réseaux sociaux, surtout en profil public, sur [son site](https://www.cnil.fr/fr/partage-de-photos-et-videos-de-votre-enfant-sur-les-reseaux-sociaux-quels-sont-les-risques). Elle avance un chiffre qui fait réfléchir : environ la moitié des photos retrouvées sur les ordinateurs de personnes condamnées pour pédocriminalité ont été postées par l’entourage familial.',
          'Elle rappelle aussi des risques plus diffus : la permanence des images, la perte de contrôle, et le fait de priver l’enfant de définir lui-même, plus tard, son image et son identité. Ce dernier point est le plus facile à oublier, et le plus durable.',
        ],
      },
      {
        type: 'text',
        title: 'Des canaux privés, par défaut',
        paragraphs: [
          'Les recommandations de la CNIL sont concrètes : éviter les photos de bain ou de plage, masquer le visage, et privilégier des canaux privés, messagerie ou e-mail, plutôt qu’un partage public. Le principe tient en une phrase : partager avec des personnes choisies, pas avec une audience.',
          'C’est exactement le parti pris de Bulle. Par défaut, ne rien publier publiquement, et réserver le partage à un cercle restreint, de bout en bout. Le plus beau des souvenirs n’a pas besoin d’être public pour être partagé.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Cadre légal : l’image de l’enfant se protège en commun (loi de 2024)',
          'La CNIL déconseille le partage public de photos d’enfants',
          'Environ la moitié des images retrouvées chez des pédocriminels viennent de l’entourage',
          'Recommandations : masquer le visage, éviter bain et plage, canaux privés',
          'Le parti pris de Bulle : ne rien publier publiquement par défaut',
        ],
      },
      {
        type: 'quote',
        quote:
          'Une photo publiée ne se reprend pas, et l’enfant qui grandira n’aura pas choisi. Partager avec des personnes, pas avec une audience, c’est lui garder ce choix.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A birth announcement today often goes through a photo, sent within the hour, sometimes before you even get home. The gesture is joyful and natural. It deserves a pause all the same, because a published image cannot be taken back.',
          'It is not a question of fear, it is a question of the default choice. And on this subject, Bulle takes a deliberate stance.',
        ],
      },
      {
        type: 'text',
        title: 'A child’s image is protected by both parents',
        paragraphs: [
          'Since a 2024 law, the Civil Code specifies that parents jointly protect their minor child\'s image rights. Publishing a child\'s photo requires the agreement of both holders of parental authority, and a judge can forbid one parent from publishing without the other\'s consent.',
          'In other words, your child\'s photo is not content like any other: it is their image, of which you are the guardians, together. That is a good starting point for discussing it as a couple before it circulates.',
        ],
      },
      {
        type: 'text',
        title: 'What the CNIL recalls',
        paragraphs: [
          'The CNIL advises against sharing children\'s photos and videos on social media, especially on a public profile, on [its site](https://www.cnil.fr/fr/partage-de-photos-et-videos-de-votre-enfant-sur-les-reseaux-sociaux-quels-sont-les-risques). It offers a figure that gives pause: around half of the photos found on the computers of people convicted of child abuse were posted by the family circle.',
          'It also recalls more diffuse risks: the permanence of images, the loss of control, and depriving the child of defining, later, their own image and identity. That last point is the easiest to forget, and the most lasting.',
        ],
      },
      {
        type: 'text',
        title: 'Private channels, by default',
        paragraphs: [
          'The CNIL\'s recommendations are concrete: avoid bath or beach photos, mask the face, and prefer private channels, messaging or email, over public sharing. The principle holds in one sentence: share with chosen people, not with an audience.',
          'That is exactly Bulle\'s stance. By default, publish nothing publicly, and keep sharing to a small circle, end to end. The finest memory does not need to be public to be shared.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Legal framework: a child\'s image is jointly protected (2024 law)',
          'The CNIL advises against public sharing of children\'s photos',
          'Around half of the images found on abusers\' computers come from the family',
          'Recommendations: mask the face, avoid bath and beach, private channels',
          'Bulle\'s stance: publish nothing publicly by default',
        ],
      },
      {
        type: 'quote',
        quote:
          'A published photo cannot be taken back, and the child who grows up will not have chosen. Sharing with people, not with an audience, keeps that choice for them.',
      },
    ],
  }),
];

export const { fr: POSTS_GAP5_FR, en: POSTS_GAP5_EN } = pairsToArrays(pairs);
