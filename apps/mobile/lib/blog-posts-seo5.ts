/**
 * SEO batch 5 — achats et matériel, sur l'angle anti-surachat.
 *
 * Same house rules as blog-posts-achats.ts: no brands, no product picks, no prices. Every
 * safety claim is attributed to an official or authoritative source (ameli for safe sleep,
 * Assurance Prévention for water, sante.fr for bottle cleaning, mpedia for warming, a
 * fall-prevention body for changing). Norm numbers are deliberately NOT printed (they come
 * from trade sources); the safety substance is what matters. The disclaimer is dropped, as
 * across the achats corpus. §7.3: the baby-food-maker piece defers all diversification
 * timing to the health professional and gives no feeding advice.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'lit-parapluie-choisir-securite-voyage',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Lit parapluie : bien le choisir, et la règle de sécurité à ne jamais oublier',
    titleEn: 'Travel cot: choosing it well, and the safety rule never to forget',
    excerptFr:
      'Le lit parapluie dépanne en voyage, mais il obéit aux mêmes règles de couchage sûr qu’un lit fixe. La plus importante : ne jamais ajouter de matelas au sien.',
    excerptEn:
      'A travel cot helps when away, but it follows the same safe-sleep rules as a fixed cot. The most important: never add a mattress to its own.',
    readingMinutes: 3,
    heroAltFr: 'Choisir un lit parapluie en sécurité',
    heroAltEn: 'Choosing a travel cot safely',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le lit parapluie est l’un des achats les plus utiles pour voyager ou dormir chez des proches. Pratique, pliable, il dépanne partout. Mais c’est aussi un endroit où votre bébé dort, et il obéit donc aux mêmes règles de sécurité qu’un lit fixe.',
          'Une de ces règles est méconnue et pourtant capitale, au point de mériter d’ouvrir cet article.',
        ],
      },
      {
        type: 'text',
        title: 'La règle à ne jamais oublier',
        paragraphs: [
          'Ne jamais ajouter de matelas dans un lit parapluie. Son matelas d’origine, fin et ferme, est conçu pour lui. En ajouter un plus épais crée un espace où le bébé peut se coincer entre le matelas et la paroi souple, et étouffer, comme le rappelle [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe).',
          'Comme dans tout lit, le bébé dort sur le dos, sur un matelas ferme aux dimensions exactes du lit, sans oreiller, tour de lit, couverture ni peluche.',
        ],
      },
      {
        type: 'text',
        title: 'Un usage d’appoint, pas de tous les jours',
        paragraphs: [
          'Le lit parapluie est pensé pour un usage occasionnel : voyages, visites, dépannage. Pour le sommeil quotidien à long terme, un lit fixe avec un matelas plus épais et ferme reste la référence.',
          'À l’achat, vérifiez que le système de verrouillage tient bien, qu’il n’y a pas d’espace entre le matelas et les bords, et que l’article est conforme et en bon état. La [DGCCRF](https://www.economie.gouv.fr/dgccrf) surveille ces produits de puériculture.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ne jamais ajouter de matelas : garder celui d’origine',
          'Bébé sur le dos, lit vide, matelas ferme aux dimensions du lit',
          'Usage d’appoint : voyages, visites, pas le sommeil quotidien',
          'Vérifier le verrouillage, l’absence d’espace, la conformité',
          'Un produit conforme et en bon état, neuf ou vérifié',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The travel cot is one of the most useful buys for travelling or sleeping at relatives\'. Practical and foldable, it helps anywhere. But it is also a place where your baby sleeps, so it follows the same safety rules as a fixed cot.',
          'One of those rules is little-known and yet crucial, enough to open this article.',
        ],
      },
      {
        type: 'text',
        title: 'The rule never to forget',
        paragraphs: [
          'Never add a mattress to a travel cot. Its original mattress, thin and firm, is designed for it. Adding a thicker one creates a space where the baby can get trapped between the mattress and the soft wall, and suffocate, as [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe) recalls.',
          'As in any cot, the baby sleeps on their back, on a firm mattress cut to the cot\'s exact size, with no pillow, cot bumper, blanket or soft toy.',
        ],
      },
      {
        type: 'text',
        title: 'An occasional use, not everyday',
        paragraphs: [
          'The travel cot is meant for occasional use: travel, visits, backup. For everyday long-term sleep, a fixed cot with a thicker, firm mattress remains the reference.',
          'When buying, check the locking system holds firm, that there is no gap between the mattress and the sides, and that the item is compliant and in good condition. The [DGCCRF](https://www.economie.gouv.fr/dgccrf) monitors these childcare products.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Never add a mattress: keep the original',
          'Baby on the back, empty cot, firm mattress cut to the cot',
          'Occasional use: travel, visits, not everyday sleep',
          'Check the locking, the absence of gaps, compliance',
          'A compliant item in good condition, new or checked',
        ],
      },
    ],
  }),

  postPair({
    slug: 'baignoire-bebe-quelle-solution-choisir',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Baignoire bébé : quelle solution choisir, et la seule règle qui compte',
    titleEn: 'Baby bath: which solution to choose, and the one rule that matters',
    excerptFr:
      'Baignoire, transat de bain ou simple lavabo : le format compte moins que la sécurité. La seule règle absolue, c’est de ne jamais quitter le bébé des yeux ni des mains.',
    excerptEn:
      'Bath, bath support or just the sink: the format matters less than safety. The one absolute rule is never to take your eyes or hands off the baby.',
    readingMinutes: 3,
    heroAltFr: 'Choisir une solution de bain pour bébé',
    heroAltEn: 'Choosing a bathing solution for baby',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Baignoire dédiée, transat de bain, ou tout simplement le lavabo : les solutions pour baigner un nouveau-né sont nombreuses, et le débat sur le meilleur format occupe beaucoup les listes de naissance. Il occulte pourtant la seule question qui compte vraiment.',
          'Cette question n’est pas « quel matériel », mais « comment rester en sécurité ».',
        ],
      },
      {
        type: 'text',
        title: 'La règle absolue',
        paragraphs: [
          'Ne jamais laisser un bébé seul dans l’eau ou près de l’eau, pas même quelques secondes, pas même dans quelques centimètres. Un support de bain n’est pas une surveillance : il ne remplace jamais vos mains, rappelle [Assurance Prévention](https://www.assurance-prevention.fr/baignade-enfants-bebes.html).',
          'Un tout-petit peut se noyer en silence et très vite, dans très peu d’eau. C’est la raison pour laquelle tout doit être prêt et à portée de main avant de commencer le bain.',
        ],
      },
      {
        type: 'text',
        title: 'Le format, une question de place et de confort',
        paragraphs: [
          'Une fois la sécurité posée, le choix du format est surtout affaire d’espace et de confort. Une petite baignoire se range mal mais rassure les parents ; le lavabo suffit souvent les premières semaines ; un transat de bain soulage le dos, sans jamais dispenser de tenir le bébé.',
          'Autrement dit, aucun matériel n’est indispensable. Ce qui l’est, c’est la présence continue, une main sur l’enfant, du début à la fin.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ne jamais laisser le bébé seul dans ou près de l’eau',
          'Quelques centimètres suffisent : la vigilance est constante',
          'Un support de bain ne remplace pas vos mains',
          'Tout préparer à portée de main avant de commencer',
          'Le format (baignoire, lavabo, transat) : une question de place, pas de sécurité',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A dedicated bath, a bath support, or simply the sink: there are many ways to bathe a newborn, and the debate over the best format fills baby lists. Yet it obscures the only question that really matters.',
          'That question is not "which equipment", but "how to stay safe".',
        ],
      },
      {
        type: 'text',
        title: 'The absolute rule',
        paragraphs: [
          'Never leave a baby alone in or near water, not even a few seconds, not even in a few centimetres. A bath support is not supervision: it never replaces your hands, [Assurance Prévention](https://www.assurance-prevention.fr/baignade-enfants-bebes.html) recalls.',
          'A very young child can drown silently and very fast, in very little water. That is why everything must be ready and within reach before starting the bath.',
        ],
      },
      {
        type: 'text',
        title: 'The format, a matter of space and comfort',
        paragraphs: [
          'Once safety is set, the choice of format is mostly about space and comfort. A small bath is awkward to store but reassures parents; the sink is often enough in the first weeks; a bath support eases your back, without ever removing the need to hold the baby.',
          'In other words, no equipment is essential. What is essential is continuous presence, a hand on the child, from start to finish.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Never leave the baby alone in or near water',
          'A few centimetres is enough: watchfulness is constant',
          'A bath support does not replace your hands',
          'Prepare everything within reach before starting',
          'The format (bath, sink, support): a matter of space, not safety',
        ],
      },
    ],
  }),

  postPair({
    slug: 'transat-bebe-utilite-securite',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Transat bébé : à quoi il sert vraiment, et ce qu’il ne remplace pas',
    titleEn: 'Baby bouncer: what it is really for, and what it does not replace',
    excerptFr:
      'Le transat rend service pour de courts moments éveillés, mais ce n’est pas un lit. Le bébé n’y dort pas, et il ne se pose jamais en hauteur.',
    excerptEn:
      'A bouncer helps for short awake moments, but it is not a bed. The baby does not sleep in it, and it never goes on a raised surface.',
    readingMinutes: 3,
    heroAltFr: 'Le transat bébé et sa sécurité',
    heroAltEn: 'The baby bouncer and its safety',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le transat est un objet pratique et populaire, qui permet de poser le bébé un moment tout en le gardant près de soi. Il rend de vrais services, à condition de savoir ce qu’il est, et surtout ce qu’il n’est pas.',
          'Deux malentendus fréquents peuvent le rendre dangereux : le prendre pour un lit, et le poser en hauteur.',
        ],
      },
      {
        type: 'text',
        title: 'Ce n’est pas une surface de sommeil',
        paragraphs: [
          'Un transat n’est pas fait pour dormir. Le sommeil sûr se passe sur le dos, sur une surface plane, ferme et dégagée, principe rappelé par [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). Si le bébé s’endort dans le transat, il faut le recoucher dans son lit.',
          'C’est un point à connaître, car un bébé s’endort facilement dans un transat, et la position semi-inclinée prolongée n’est pas adaptée au sommeil.',
        ],
      },
      {
        type: 'text',
        title: 'Toujours attaché, toujours au sol',
        paragraphs: [
          'Deux gestes de sécurité s’imposent à chaque usage. Attacher et ajuster le harnais, systématiquement, même pour un court instant. Et ne jamais poser le transat en hauteur, sur une table, un plan de travail, un lit ou un canapé : les chutes d’une surface élevée sont la principale cause d’accident grave. Le transat se pose au sol.',
          'Enfin, on limite le temps passé dedans : c’est un siège d’appoint, pas un lieu de jeu libre.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Utile pour de courts moments éveillés, sous surveillance',
          'Pas une surface de sommeil : recoucher le bébé s’il s’endort',
          'Toujours attacher le harnais',
          'Toujours au sol, jamais en hauteur',
          'Limiter le temps passé dedans',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The bouncer is a practical, popular item that lets you set the baby down for a moment while keeping them close. It is genuinely useful, provided you know what it is, and above all what it is not.',
          'Two common misunderstandings can make it dangerous: taking it for a bed, and placing it up high.',
        ],
      },
      {
        type: 'text',
        title: 'It is not a sleep surface',
        paragraphs: [
          'A bouncer is not made for sleeping. Safe sleep happens on the back, on a flat, firm, clear surface, a principle recalled by [ameli.fr](https://www.ameli.fr/assure/sante/bons-gestes/bebe/coucher-bebe). If the baby falls asleep in the bouncer, they should be moved to their bed.',
          'It is a point to know, because a baby easily falls asleep in a bouncer, and a prolonged semi-reclined position is not suited to sleep.',
        ],
      },
      {
        type: 'text',
        title: 'Always harnessed, always on the floor',
        paragraphs: [
          'Two safety gestures are required at each use. Fasten and adjust the harness, every time, even briefly. And never place the bouncer up high, on a table, worktop, bed or sofa: falls from a raised surface are the main cause of serious accidents. The bouncer goes on the floor.',
          'Finally, limit the time spent in it: it is a spare seat, not a place for free play.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Useful for short awake moments, supervised',
          'Not a sleep surface: move the baby if they fall asleep',
          'Always fasten the harness',
          'Always on the floor, never up high',
          'Limit the time spent in it',
        ],
      },
    ],
  }),

  postPair({
    slug: 'sterilisateur-biberon-necessaire-ou-pas',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Stérilisateur de biberons : nécessaire ou pas',
    titleEn: 'Bottle steriliser: necessary or not',
    excerptFr:
      'Pour un bébé né à terme et en bonne santé, la stérilisation systématique des biberons n’est plus recommandée. Un lavage soigneux suffit. Voici ce que disent les sources officielles.',
    excerptEn:
      'For a healthy full-term baby, routine bottle sterilisation is no longer recommended. Careful washing is enough. Here is what the official sources say.',
    readingMinutes: 3,
    heroAltFr: 'Faut-il un stérilisateur de biberons',
    heroAltEn: 'Do you need a bottle steriliser',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le stérilisateur de biberons figure sur presque toutes les listes de naissance, par habitude autant que par prudence. Or, pour un bébé né à terme et en bonne santé, il n’est plus considéré comme nécessaire au quotidien.',
          'C’est l’un des rares cas où une source officielle permet d’alléger sereinement une liste d’achats.',
        ],
      },
      {
        type: 'text',
        title: 'Un lavage soigneux suffit',
        paragraphs: [
          'Selon [sante.fr](https://www.sante.fr/nettoyage-et-sterilisation-des-biberons-et-tetines), pour un enfant né à terme et en bonne santé, un lavage soigneux des biberons, à l’eau chaude avec du liquide vaisselle, bien rincés et séchés à l’air, ou passés au lave-vaisselle, suffit. La stérilisation systématique n’est plus recommandée.',
          'Le même message est porté par les sociétés de pédiatrie : un bon nettoyage remplace la stérilisation de routine. L’essentiel est un rinçage complet et un séchage à l’air libre.',
        ],
      },
      {
        type: 'text',
        title: 'Sauf situations particulières',
        paragraphs: [
          'La nuance compte : ce n’est pas « ne jamais stériliser », mais « pas systématiquement pour un bébé né à terme en bonne santé ». Dans certaines situations, comme une grande prématurité, une immunité fragile ou une eau dont la qualité n’est pas certaine, la stérilisation peut rester conseillée.',
          'Cela se décide alors avec le professionnel de santé qui suit l’enfant, pas par défaut. Pour la plupart des familles, un goupillon et de l’eau chaude font le travail.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Bébé né à terme et en bonne santé : stérilisation systématique non recommandée',
          'Lavage soigneux à l’eau chaude, rinçage, séchage à l’air',
          'Le lave-vaisselle convient aussi',
          'Situations particulières (prématurité, immunité fragile) : à voir avec le professionnel',
          'L’appareil est optionnel, pas indispensable',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The bottle steriliser is on almost every baby list, out of habit as much as caution. Yet for a healthy full-term baby, it is no longer considered necessary day to day.',
          'It is one of the rare cases where an official source lets you lighten a shopping list with peace of mind.',
        ],
      },
      {
        type: 'text',
        title: 'Careful washing is enough',
        paragraphs: [
          'According to [sante.fr](https://www.sante.fr/nettoyage-et-sterilisation-des-biberons-et-tetines), for a healthy full-term child, carefully washing the bottles, in hot water with washing-up liquid, well rinsed and air-dried, or run through the dishwasher, is enough. Routine sterilisation is no longer recommended.',
          'The same message comes from paediatric bodies: good cleaning replaces routine sterilisation. What matters is a thorough rinse and air-drying.',
        ],
      },
      {
        type: 'text',
        title: 'Except in particular situations',
        paragraphs: [
          'The nuance matters: it is not "never sterilise", but "not routinely for a healthy full-term baby". In certain situations, such as significant prematurity, fragile immunity, or water of uncertain quality, sterilisation may still be advised.',
          'That is then decided with the health professional following the child, not by default. For most families, a bottle brush and hot water do the job.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Healthy full-term baby: routine sterilisation not recommended',
          'Careful washing in hot water, rinse, air-dry',
          'The dishwasher works too',
          'Particular situations (prematurity, fragile immunity): see the professional',
          'The appliance is optional, not essential',
        ],
      },
    ],
  }),

  postPair({
    slug: 'echarpe-portage-ou-porte-bebe-choisir',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Écharpe de portage ou porte-bébé : comment choisir en sécurité',
    titleEn: 'Sling or baby carrier: how to choose safely',
    excerptFr:
      'Écharpe ou porte-bébé structuré, le choix est surtout une question de préférence. La sécurité, elle, ne se négocie pas : voies respiratoires dégagées, visage visible, position physiologique.',
    excerptEn:
      'Sling or structured carrier, the choice is mostly preference. Safety, though, is non-negotiable: clear airway, visible face, physiological position.',
    readingMinutes: 3,
    heroAltFr: 'Choisir une écharpe de portage ou un porte-bébé',
    heroAltEn: 'Choosing a sling or a baby carrier',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Écharpe de portage ou porte-bébé structuré : le choix divise, et il dépend surtout de vous. L’écharpe est souple et s’adapte parfaitement, au prix d’un apprentissage ; le porte-bébé structuré s’enfile plus vite. Aucun n’est meilleur dans l’absolu.',
          'Ce qui, en revanche, ne se négocie pas, ce sont les règles de sécurité de la position.',
        ],
      },
      {
        type: 'text',
        title: 'La position qui compte',
        paragraphs: [
          'Quelques repères font consensus chez les professionnels du portage, comme [Porter Son Enfant](https://portersonenfant.fr/le-portage/physiologie-et-securite/) : les voies respiratoires toujours dégagées et le visage visible, le menton décollé de la poitrine, le dos et la tête soutenus, le bébé porté haut et droit, les genoux plus hauts que les fesses, en position dite physiologique ou en M.',
          'Un moyen mnémotechnique anglophone, « TICKS », résume les mêmes idées. Ce n’est pas une norme officielle française, mais un aide-mémoire pratique.',
        ],
      },
      {
        type: 'text',
        title: 'Choisir selon le bébé et votre vie',
        paragraphs: [
          'Un nouveau-né a besoin d’un support qui maintienne l’ensemble de sa colonne encore arrondie et sa nuque. C’est ce critère, plus que la marque ou l’esthétique, qui guide le choix pour les premiers mois.',
          'Le reste est affaire de mode de vie : fréquence d’usage, facilité à mettre et enlever, confort pour le porteur. Beaucoup de familles finissent avec les deux, pour des usages différents.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Écharpe ou porte-bébé : surtout une question de préférence',
          'Voies respiratoires dégagées, visage visible, menton décollé',
          'Dos et tête soutenus, genoux plus hauts que les fesses (position en M)',
          'Un nouveau-né a besoin d’un maintien complet de la colonne et de la nuque',
          'Choisir selon le bébé et votre usage, pas selon la marque',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Sling or structured carrier: the choice divides, and it depends mostly on you. The sling is soft and adapts perfectly, at the cost of a learning curve; the structured carrier is quicker to put on. Neither is better in the absolute.',
          'What is non-negotiable, on the other hand, are the safety rules of the position.',
        ],
      },
      {
        type: 'text',
        title: 'The position that matters',
        paragraphs: [
          'A few markers are agreed among babywearing professionals, such as [Porter Son Enfant](https://portersonenfant.fr/le-portage/physiologie-et-securite/): the airway always clear and the face visible, the chin off the chest, the back and head supported, the baby carried high and upright, knees higher than the bottom, in the so-called physiological or M position.',
          'An English-language mnemonic, "TICKS", sums up the same ideas. It is not a French official standard, but a handy reminder.',
        ],
      },
      {
        type: 'text',
        title: 'Choose by the baby and your life',
        paragraphs: [
          'A newborn needs support that holds their still-curved spine and their neck. It is this criterion, more than brand or looks, that guides the choice for the first months.',
          'The rest is about lifestyle: frequency of use, ease of putting on and off, comfort for the wearer. Many families end up with both, for different uses.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Sling or carrier: mostly a matter of preference',
          'Clear airway, visible face, chin off the chest',
          'Back and head supported, knees higher than the bottom (M position)',
          'A newborn needs full support of the spine and neck',
          'Choose by the baby and your use, not by the brand',
        ],
      },
    ],
  }),

  postPair({
    slug: 'tire-lait-location-ou-achat-cout',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Tire-lait : location ou achat, ce que ça change',
    titleEn: 'Breast pump: renting or buying, what it changes',
    excerptFr:
      'En France, un tire-lait électrique se loue en pharmacie sur prescription, et il est remboursé. L’acheter neuf avant la naissance est rarement le bon calcul.',
    excerptEn:
      'In France, an electric breast pump is rented from a pharmacy on prescription, and reimbursed. Buying one new before the birth is rarely the right call.',
    readingMinutes: 3,
    heroAltFr: 'Louer ou acheter un tire-lait',
    heroAltEn: 'Renting or buying a breast pump',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le tire-lait figure sur beaucoup de listes d’achats de fin de grossesse, souvent à l’état neuf. C’est presque toujours une erreur de calcul, parce que le système français est pensé autrement.',
          'En France, un tire-lait électrique se loue, il ne s’achète pas, dans la grande majorité des cas.',
        ],
      },
      {
        type: 'text',
        title: 'Loué en pharmacie, sur prescription, remboursé',
        paragraphs: [
          'Un tire-lait électrique se loue en pharmacie sur prescription d’un médecin ou d’une sage-femme, et il est pris en charge par l’Assurance Maladie, à 100 % autour de la période de la naissance. La pharmacie fournit avec la location le kit personnel à usage unique.',
          'La prescription initiale couvre une durée limitée, de l’ordre de quelques semaines, renouvelable. Le dispositif colle ainsi au besoin réel, qui est souvent temporaire.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi l’achat neuf est rarement le bon choix',
        paragraphs: [
          'Acheter un tire-lait neuf avant la naissance, c’est payer plein tarif un appareil dont on ne sait pas encore si l’on aura l’usage, et pour combien de temps. La location remboursée répond exactement à cette incertitude.',
          'C’est l’un des postes où l’on peut sereinement ne rien prévoir à l’avance, et voir une fois le bébé là, en en parlant à la sage-femme si le besoin se présente.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Location en pharmacie, sur prescription d’un médecin ou d’une sage-femme',
          'Pris en charge par l’Assurance Maladie, à 100 % autour de la naissance',
          'Kit personnel à usage unique fourni avec la location',
          'Prescription initiale de quelques semaines, renouvelable',
          'Acheter neuf avant la naissance : rarement le bon calcul',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The breast pump appears on many late-pregnancy shopping lists, often brand new. It is almost always a miscalculation, because the French system is designed differently.',
          'In France, an electric breast pump is rented, not bought, in the vast majority of cases.',
        ],
      },
      {
        type: 'text',
        title: 'Rented from a pharmacy, on prescription, reimbursed',
        paragraphs: [
          'An electric breast pump is rented from a pharmacy on a doctor\'s or midwife\'s prescription, and it is covered by the health insurance system, at 100% around the time of the birth. The pharmacy provides the single-use personal kit with the rental.',
          'The initial prescription covers a limited period, of the order of a few weeks, renewable. The arrangement thus matches the real need, which is often temporary.',
        ],
      },
      {
        type: 'text',
        title: 'Why buying new is rarely the right choice',
        paragraphs: [
          'Buying a new breast pump before the birth means paying full price for a device you do not yet know whether, or for how long, you will use. Reimbursed rental answers exactly that uncertainty.',
          'It is one of the items where you can calmly plan nothing in advance, and see once the baby is here, raising it with the midwife if the need arises.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Rented from a pharmacy, on a doctor\'s or midwife\'s prescription',
          'Covered by the health insurance system, 100% around the birth',
          'Single-use personal kit provided with the rental',
          'Initial prescription of a few weeks, renewable',
          'Buying new before the birth: rarely the right call',
        ],
      },
    ],
  }),

  postPair({
    slug: 'chauffe-biberon-utile-ou-superflu',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Chauffe-biberon : utile ou superflu',
    titleEn: 'Bottle warmer: useful or superfluous',
    excerptFr:
      'Un chauffe-biberon fait gagner en confort, pas en sécurité. Un bain-marie fait la même chose. La vraie règle est ailleurs : jamais de micro-ondes.',
    excerptEn:
      'A bottle warmer buys comfort, not safety. A bain-marie does the same. The real rule is elsewhere: never the microwave.',
    readingMinutes: 3,
    heroAltFr: 'Le chauffe-biberon, utile ou pas',
    heroAltEn: 'The bottle warmer, useful or not',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le chauffe-biberon est un achat de confort, pas de nécessité. Il fait gagner du temps et de la régularité, mais rien qu’un bain-marie ne sache faire. Avant de l’ajouter à la liste, il vaut la peine de se poser la question.',
          'En revanche, il y a une vraie règle de sécurité sur le réchauffage, et elle ne dépend d’aucun appareil.',
        ],
      },
      {
        type: 'text',
        title: 'Jamais au micro-ondes',
        paragraphs: [
          'Ne jamais réchauffer un biberon au micro-ondes. Il chauffe de façon inégale et crée des points de surchauffe invisibles qui peuvent brûler la bouche et la gorge du bébé, avertit [mpedia](https://www.mpedia.fr/qr/faire-chauffer-eau-biberon-micro-ondes/), le site de l’association française de pédiatrie ambulatoire.',
          'La méthode simple et sûre est le bain-marie : le biberon placé dans un récipient d’eau chaude, non bouillante, qui le réchauffe doucement et uniformément.',
        ],
      },
      {
        type: 'text',
        title: 'Toujours tester la température',
        paragraphs: [
          'Quel que soit le mode de réchauffage, on teste toujours la température avant de donner le biberon, en versant quelques gouttes sur l’intérieur du poignet. C’est le geste qui prévient les brûlures, pas l’appareil.',
          'Le chauffe-biberon, lui, apporte surtout de la constance et un peu de confort la nuit. Utile pour certains, superflu pour d’autres : c’est un choix, pas une obligation.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Jamais de micro-ondes : points de surchauffe et risque de brûlure',
          'Le bain-marie réchauffe en douceur et suffit',
          'Toujours tester la température (gouttes sur l’intérieur du poignet)',
          'Le chauffe-biberon apporte du confort, pas de la sécurité en plus',
          'Un achat optionnel, à décider selon vos habitudes',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The bottle warmer is a comfort buy, not a necessity. It saves time and consistency, but nothing a bain-marie cannot do. Before adding it to the list, it is worth asking the question.',
          'On the other hand, there is a real safety rule about warming, and it depends on no appliance.',
        ],
      },
      {
        type: 'text',
        title: 'Never in the microwave',
        paragraphs: [
          'Never warm a bottle in the microwave. It heats unevenly and creates invisible hot spots that can burn the baby\'s mouth and throat, warns [mpedia](https://www.mpedia.fr/qr/faire-chauffer-eau-biberon-micro-ondes/), the site of the French ambulatory paediatrics association.',
          'The simple, safe method is the bain-marie: the bottle placed in a container of hot, not boiling, water, which warms it gently and evenly.',
        ],
      },
      {
        type: 'text',
        title: 'Always test the temperature',
        paragraphs: [
          'Whatever the warming method, always test the temperature before giving the bottle, by dropping a few drops on the inner wrist. That is the gesture that prevents burns, not the appliance.',
          'The bottle warmer mainly brings consistency and a little comfort at night. Useful for some, superfluous for others: it is a choice, not an obligation.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Never the microwave: hot spots and burn risk',
          'The bain-marie warms gently and is enough',
          'Always test the temperature (drops on the inner wrist)',
          'The warmer brings comfort, not extra safety',
          'An optional buy, to decide by your habits',
        ],
      },
    ],
  }),

  postPair({
    slug: 'tapis-eveil-parc-bebe-quand-utile',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Tapis d’éveil et parc : quand ils deviennent vraiment utiles',
    titleEn: 'Play mat and playpen: when they actually become useful',
    excerptFr:
      'Ni l’un ni l’autre n’est un achat urgent avant la naissance. Le tapis sert dès les premiers mois au sol, le parc bien plus tard, quand le bébé se déplace.',
    excerptEn:
      'Neither is an urgent buy before birth. The mat helps from the early months on the floor, the playpen much later, when the baby moves.',
    readingMinutes: 3,
    heroAltFr: 'Tapis d’éveil et parc, quand ils servent',
    heroAltEn: 'Play mat and playpen, when they help',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le tapis d’éveil et le parc figurent souvent parmi les premiers achats, alors qu’aucun des deux n’est nécessaire le jour de la naissance. Les acheter trop tôt encombre la maison sans rien apporter au nouveau-né.',
          'La bonne question n’est pas « faut-il les acheter », mais « à quel moment ils deviennent utiles ».',
        ],
      },
      {
        type: 'text',
        title: 'Le tapis, dès les premiers mois',
        paragraphs: [
          'Le tapis d’éveil sert dès les premières semaines, pour de courts moments au sol, sur le dos puis sur le ventre, toujours sous surveillance. Il n’a rien de magique : n’importe quelle surface propre, plane et ferme fait le même office au départ.',
          'Ces moments au sol soutiennent le développement moteur. L’essentiel est une surface dégagée et une présence, pas un tapis particulier.',
        ],
      },
      {
        type: 'text',
        title: 'Le parc, quand le bébé se déplace',
        paragraphs: [
          'Le parc, lui, prend son intérêt bien plus tard, quand le bébé commence à se déplacer et qu’un espace délimité et sûr devient pratique pour de courts moments. C’est un outil de contenance ponctuelle, pas un lieu où laisser l’enfant longtemps.',
          'Rien ne presse donc avant la naissance. Vous verrez, une fois le bébé là et selon la configuration de votre logement, s’il vous sera vraiment utile.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Aucun des deux n’est un achat urgent avant la naissance',
          'Tapis : utile dès les premiers mois pour les moments au sol',
          'Toute surface propre, plane et ferme convient au départ',
          'Parc : utile quand le bébé se déplace, pour de courts moments sûrs',
          'Choisir selon la place et les besoins réels',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The play mat and the playpen are often among the first buys, though neither is needed on the day of birth. Buying them too early clutters the home without helping the newborn.',
          'The right question is not "should you buy them", but "when do they become useful".',
        ],
      },
      {
        type: 'text',
        title: 'The mat, from the early months',
        paragraphs: [
          'The play mat helps from the first weeks, for short moments on the floor, on the back then on the tummy, always supervised. It is nothing magic: any clean, flat, firm surface does the same at first.',
          'These floor moments support motor development. What matters is a clear surface and a presence, not a particular mat.',
        ],
      },
      {
        type: 'text',
        title: 'The playpen, when the baby moves',
        paragraphs: [
          'The playpen becomes worthwhile much later, when the baby starts to move and a bounded, safe space becomes handy for short moments. It is a tool for occasional containment, not a place to leave the child for long.',
          'So there is no rush before the birth. You will see, once the baby is here and depending on your home\'s layout, whether it will really help.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Neither is an urgent buy before the birth',
          'Mat: useful from the early months for floor moments',
          'Any clean, flat, firm surface works at first',
          'Playpen: useful when the baby moves, for short safe moments',
          'Choose by space and real needs',
        ],
      },
    ],
  }),

  postPair({
    slug: 'table-a-langer-ou-commode-choisir',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Table à langer ou commode à langer : que choisir',
    titleEn: 'Changing table or changing chest: which to choose',
    excerptFr:
      'Le meuble compte moins que l’habitude. La seule règle qui ne se discute pas : ne jamais quitter le bébé, une main sur lui, à chaque change.',
    excerptEn:
      'The furniture matters less than the habit. The one non-negotiable rule: never leave the baby, a hand on them, at every change.',
    readingMinutes: 3,
    heroAltFr: 'Table à langer ou commode à langer',
    heroAltEn: 'Changing table or changing chest',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Table à langer dédiée ou commode surmontée d’un matelas à langer : le choix occupe les futurs parents, alors que le meuble compte finalement moins que la façon de s’en servir.',
          'La vraie question, ce sont la sécurité et la place, pas le modèle.',
        ],
      },
      {
        type: 'text',
        title: 'La règle qui ne se discute pas',
        paragraphs: [
          'Ne jamais laisser le bébé sans surveillance sur le plan à langer, pas même quelques secondes, et garder une main sur lui en permanence. Les chutes sont rapides, et c’est la tête qui encaisse, rappellent les organismes de prévention comme le [bpa](https://www.bfu.ch/fr/services/produits-surs/table-a-langer).',
          'Concrètement, on prépare tout, la couche, le coton, les vêtements, à portée de main avant de commencer, pour ne jamais avoir à se détourner.',
        ],
      },
      {
        type: 'text',
        title: 'Une commode que vous avez déjà suffit souvent',
        paragraphs: [
          'On change le bébé à une hauteur confortable, ce qui épargne le dos, et si le meuble est haut, on le fixe au mur contre le risque de basculement. Mais rien n’oblige à acheter une table dédiée : un matelas à langer posé sur une commode que vous possédez déjà fait très bien l’affaire.',
          'C’est un poste où l’on peut facilement éviter un achat, à condition de garder le bon réflexe de sécurité à chaque change.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ne jamais laisser le bébé seul sur le plan à langer',
          'Une main sur lui en permanence',
          'Tout préparer à portée de main avant de commencer',
          'Hauteur confortable, meuble haut fixé au mur',
          'Un matelas à langer sur une commode existante suffit souvent',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A dedicated changing table or a chest topped with a changing mat: the choice occupies parents-to-be, though the furniture matters less than how you use it.',
          'The real question is safety and space, not the model.',
        ],
      },
      {
        type: 'text',
        title: 'The non-negotiable rule',
        paragraphs: [
          'Never leave the baby unattended on the changing surface, not even a few seconds, and keep a hand on them at all times. Falls are fast, and it is the head that takes the impact, prevention bodies such as the [bpa](https://www.bfu.ch/fr/services/produits-surs/table-a-langer) recall.',
          'In practice, prepare everything, the nappy, the cotton, the clothes, within reach before starting, so you never have to turn away.',
        ],
      },
      {
        type: 'text',
        title: 'A chest you already own is often enough',
        paragraphs: [
          'You change the baby at a comfortable height, which spares your back, and if the furniture is tall, secure it to the wall against tipping. But nothing requires buying a dedicated table: a changing mat on a chest you already own does the job very well.',
          'It is an item where you can easily avoid a purchase, provided you keep the right safety reflex at every change.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Never leave the baby alone on the changing surface',
          'A hand on them at all times',
          'Prepare everything within reach before starting',
          'Comfortable height, tall furniture secured to the wall',
          'A changing mat on an existing chest is often enough',
        ],
      },
    ],
  }),

  postPair({
    slug: 'cuiseur-mixeur-bebe-vraiment-utile',
    categoryKey: 'achats',
    categoryFr: 'Achats',
    categoryEn: 'Shopping',
    disclaimer: false,
    titleFr: 'Cuiseur-mixeur pour bébé : vraiment utile',
    titleEn: 'Baby food maker: is it really useful',
    excerptFr:
      'Le cuiseur-mixeur ne sert qu’au moment de la diversification, et une casserole avec un mixeur fait la même chose. Le moment et la façon de diversifier se décident avec le professionnel de santé.',
    excerptEn:
      'A baby food maker is only useful at the start of solids, and a pan with a blender does the same. When and how to start solids is decided with the health professional.',
    readingMinutes: 3,
    heroAltFr: 'Le cuiseur-mixeur pour bébé',
    heroAltEn: 'The baby food maker',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le cuiseur-mixeur pour bébé, qui cuit à la vapeur puis mixe, séduit sur le papier. Avant de l’ajouter à une liste de naissance, deux constats aident à décider, et aucun n’est pressé.',
          'D’abord, ce n’est utile qu’au moment de la diversification, donc pas avant plusieurs mois.',
        ],
      },
      {
        type: 'text',
        title: 'Un appareil pour plus tard, et pas indispensable',
        paragraphs: [
          'Un nouveau-né n’a aucun usage d’un cuiseur-mixeur. Il ne sert qu’à partir du début de la diversification alimentaire. Le moment et la manière de commencer relèvent d’un sujet médical, à décider avec le professionnel de santé qui suit l’enfant, comme le rappelle [1000-premiers-jours.fr](https://www.1000-premiers-jours.fr/fr/lalimentation-de-4-6-mois-le-debut-de-la-diversification).',
          'Cet article ne dit donc ni quand ni comment diversifier : il s’en tient à la question du matériel. Et sur ce point, l’appareil n’est pas indispensable.',
        ],
      },
      {
        type: 'text',
        title: 'Une casserole fait la même chose',
        paragraphs: [
          'Une casserole pour cuire, une fourchette, un mixeur plongeant ou un mixeur classique pour écraser : de quoi préparer les mêmes purées lisses, sans appareil dédié. Le cuiseur-mixeur apporte du confort, cuisson et mixage en un geste, pas un avantage nutritionnel ou de sécurité.',
          'Comme il ne sert que sur une période limitée, mieux vaut se demander s’il mérite sa place avant de l’acheter. Beaucoup de familles s’en passent très bien.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Utile seulement à partir de la diversification, pas avant',
          'Le moment et la façon de diversifier : à voir avec le professionnel de santé',
          'Une casserole plus un mixeur font les mêmes purées',
          'L’appareil apporte du confort, pas un avantage nutritionnel',
          'Un usage limité dans le temps : à peser avant d’acheter',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The baby food maker, which steams then blends, appeals on paper. Before adding it to a baby list, two observations help decide, and neither is urgent.',
          'First, it is only useful at the start of solids, so not for several months.',
        ],
      },
      {
        type: 'text',
        title: 'A device for later, and not essential',
        paragraphs: [
          'A newborn has no use for a food maker. It is only useful from the start of dietary diversification. When and how to begin is a medical topic, to decide with the health professional following the child, as [1000-premiers-jours.fr](https://www.1000-premiers-jours.fr/fr/lalimentation-de-4-6-mois-le-debut-de-la-diversification) recalls.',
          'So this article says neither when nor how to start solids: it sticks to the equipment question. And on that point, the device is not essential.',
        ],
      },
      {
        type: 'text',
        title: 'A pan does the same',
        paragraphs: [
          'A pan to cook, a fork, a hand blender or an ordinary blender to purée: enough to make the same smooth purées, with no dedicated device. The food maker brings comfort, cooking and blending in one, not a nutritional or safety advantage.',
          'Since it is only used for a limited period, it is better to ask whether it earns its space before buying. Many families do very well without it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Useful only from the start of solids, not before',
          'When and how to start solids: see the health professional',
          'A pan plus a blender makes the same purées',
          'The device brings comfort, not a nutritional advantage',
          'A time-limited use: weigh it before buying',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO5_FR, en: POSTS_SEO5_EN } = pairsToArrays(pairs);
