/**
 * Tier 4 articles: the couple / the co-parent.
 *
 * This is the angle almost nobody in the FR market covers, and it is the product's north
 * star: both parents active, not one "helping." Preparing for a baby is shared work, and
 * most of it is invisible to the other person until someone writes it down.
 *
 * Content rules that apply across this file:
 * - Roles are never gendered. "Co-parent" and "the person who is pregnant," never assumed
 *   father/mother or a heterosexual couple.
 * - Regulatory line (§7.3): preparation only, never care. No medical or psychological advice.
 * - Amounts and delays that get revalorised yearly are never stated; we link to the official
 *   source and describe the stable part: the action and its timing.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'charge-mentale-grossesse-repartir',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: 'Charge mentale de la grossesse : la rendre visible pour la partager',
    titleEn: 'The mental load of pregnancy: making it visible enough to share',
    excerptFr:
      "L'asymétrie qui s'installe pendant la grossesse n'est presque jamais de la mauvaise volonté. C'est qu'une seule personne porte la liste dans sa tête, et que l'autre ne peut pas partager ce qu'il ne voit pas.",
    excerptEn:
      'The imbalance that creeps in during pregnancy is almost never bad will. One person is holding the list in their head, and the other cannot share what they cannot see.',
    readingMinutes: 5,
    heroAltFr: 'Charge mentale de la grossesse partagée à deux',
    heroAltEn: 'Sharing the mental load of pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "Il y a souvent, pendant une grossesse, un moment où l'un des deux parents a l'impression de tout porter, et où l'autre a l'impression de faire sa part. Les deux ont raison. Ce n'est pas un désaccord sur les faits, c'est que les faits ne sont pas au même endroit : l'un des deux a une liste complète dans la tête, l'autre voit des morceaux de cette liste au moment où on les lui montre.",
          "La charge mentale de la grossesse, c'est exactement ça : la somme des rendez-vous à suivre, des démarches à ne pas oublier, des décisions à prendre, retenue en permanence par une seule personne, y compris quand elle ne fait rien d'autre que d'y penser.",
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ça retombe toujours sur la même personne',
        paragraphs: [
          "Ce n'est pas une question de compétence ni de volonté. La personne enceinte est celle qui a un contact direct et régulier avec le système médical et administratif : les rendez-vous se prennent avec elle, les courriers de l'Assurance Maladie arrivent à son nom, la maternité l'appelle elle. Par défaut, la liste s'accumule là où arrivent les informations.",
          "Le co-parent n'est pas mis à l'écart volontairement. Il est structurellement en dehors du circuit, sauf si quelque chose change ce circuit. Et rien ne le change tout seul : sans organisation explicite, l'information continue d'arriver au même endroit, et la liste continue de grossir au même endroit aussi.",
        ],
      },
      {
        type: 'list',
        title: 'Ce que contient la liste, concrètement',
        items: [
          'Les rendez-vous médicaux, leur suivi, et ce qu\'il en ressort à chaque fois',
          'Les démarches administratives : CAF, mutuelle, employeur, dossier de la maternité',
          'Les choix de matériel : ce qu\'il faut, ce qui peut attendre, ce qui est déjà réglé',
          "L'inscription en crèche ou la recherche d'un autre mode de garde",
          'La valise de maternité, et sa date limite réelle',
          'Le prénom, les visites, et la logistique des premières semaines',
        ],
      },
      {
        type: 'text',
        title: 'Rendre la liste externe',
        paragraphs: [
          "La première chose qui change réellement la répartition n'est pas une conversation sur qui devrait faire plus. C'est de sortir la liste de la tête d'une seule personne et de la poser quelque part que les deux peuvent consulter sans la demander : un document partagé, une appli, un carnet posé sur la table. Le support importe peu. Ce qui compte, c'est qu'elle existe en dehors de la mémoire de quelqu'un.",
          "Tant que la liste reste mentale, la demander devient elle-même une tâche pour la personne qui la porte : elle doit se souvenir, formuler, expliquer. Une liste écrite retire cette étape. Le co-parent peut la lire directement, sans qu'on la lui traduise à chaque fois.",
        ],
      },
      {
        type: 'text',
        title: 'Diviser, pas déléguer',
        paragraphs: [
          "Une fois la liste visible, la vraie division commence, et elle ne consiste pas à distribuer des tâches ponctuelles sur demande. Déléguer, c'est \"tu peux appeler la crèche cette semaine ?\". Diviser, c'est \"le mode de garde, c'est toi qui le suis du début à la fin\", rendez-vous manqués et relances comprises.",
          "La différence tient dans la responsabilité de suivi. Une tâche déléguée reste, dans les faits, sous la responsabilité de la personne qui l'a confiée : elle doit vérifier que c'est fait. Une tâche divisée change de propriétaire, et l'autre n'a plus à y penser du tout.",
        ],
      },
      {
        type: 'quote',
        quote:
          "Partager la charge mentale ne commence pas par une conversation sur la bonne volonté. Ça commence par une liste que les deux peuvent lire sans la demander.",
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          "There is often a moment, during a pregnancy, when one parent feels like they are carrying everything, and the other feels like they are doing their share. Both are right. It is not a disagreement about the facts; it is that the facts are not in the same place. One of them has a complete list in their head, and the other sees pieces of that list only when they are shown.",
          'The mental load of pregnancy is exactly that: the sum of appointments to track, steps to remember, decisions to make, held constantly by one person, even when they are doing nothing but thinking about it.',
        ],
      },
      {
        type: 'text',
        title: 'Why it always lands on the same person',
        paragraphs: [
          "It is not about skill or willingness. The person who is pregnant is the one with direct, ongoing contact with the medical and administrative system: appointments are booked in their name, letters from the health insurance fund arrive addressed to them, the maternity unit calls them. By default, the list accumulates wherever the information arrives.",
          "The co-parent is not deliberately shut out. They are structurally outside the loop, unless something changes that loop. And nothing changes it on its own: without a deliberate setup, information keeps arriving in the same place, and the list keeps growing in the same place too.",
        ],
      },
      {
        type: 'list',
        title: 'What the list actually contains',
        items: [
          'Medical appointments, their follow-up, and what comes out of each one',
          'Administrative steps: health insurance, top-up cover, employer, the maternity file',
          'Equipment decisions: what is needed, what can wait, what is already sorted',
          'Nursery registration or the search for another childcare option',
          'The hospital bag, and its real deadline',
          'The first name, visitors, and the logistics of the first weeks',
        ],
      },
      {
        type: 'text',
        title: 'Making the list external',
        paragraphs: [
          "The first thing that genuinely changes the split is not a conversation about who should do more. It is taking the list out of one person's head and putting it somewhere both of you can check without having to ask: a shared document, an app, a notebook on the table. The medium barely matters. What matters is that it exists outside anyone's memory.",
          "As long as the list stays mental, asking for it becomes a task in itself for the person carrying it: they have to remember, phrase it, explain it. A written list removes that step. The co-parent can read it directly, without it being translated for them every time.",
        ],
      },
      {
        type: 'text',
        title: 'Splitting, not delegating',
        paragraphs: [
          'Once the list is visible, the real division starts, and it does not mean handing out one-off tasks on request. Delegating is "can you call the nursery this week?" Splitting is "childcare is yours, start to finish," missed callbacks and follow-ups included.',
          'The difference is who tracks it. A delegated task stays, in practice, under the responsibility of the person who handed it over: they still have to check it got done. A split task changes owner, and the other person no longer has to think about it at all.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Sharing the mental load does not start with a conversation about good intentions. It starts with a list both of you can read without asking for it.',
      },
    ],
  }),

  postPair({
    slug: 'co-parent-quoi-faire-concretement',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: 'Co-parent : ce qu\'il y a concrètement à faire',
    titleEn: 'For the co-parent: what there actually is to do',
    excerptFr:
      "« Soyez présent », « soutenez-la » : ça ne se traduit en rien de concret. Voici les tâches qui vous reviennent entièrement, du rendez-vous à la valise, en passant par les papiers.",
    excerptEn:
      "'Be there for them,' 'support them': neither translates into anything you can actually do. Here are the tasks that are genuinely yours to own, from appointments to paperwork to the bag.",
    readingMinutes: 6,
    heroAltFr: 'Le co-parent et les tâches concrètes de la grossesse',
    heroAltEn: "The co-parent's concrete tasks during pregnancy",
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "La plupart des conseils donnés au co-parent tiennent en une posture : être présent, être à l'écoute, soutenir. Le problème, c'est qu'une posture ne se coche jamais sur une liste. On ne sait jamais si on l'a fait, ni ce qu'il faudrait faire de plus.",
          "Ce texte prend l'angle inverse : des tâches précises, qui ont un début et une fin, que vous pouvez posséder entièrement sans qu'on ait besoin de vous les rappeler.",
        ],
      },
      {
        type: 'list',
        title: 'Ce qui peut être entièrement le vôtre',
        items: [
          'Suivre le calendrier des rendez-vous et poser vos absences au travail suffisamment à l\'avance',
          "Prendre en charge un morceau précis des démarches administratives (mutuelle, employeur, ou CAF), du début jusqu'à la confirmation, plutôt que d'\"aider\" sur toutes",
          "Choisir, acheter et installer le siège auto, et le tester avant le jour où il servira vraiment",
          'Préparer votre propre valise pour la maternité, et vérifier que celle du premier parent est complète',
          "Organiser la logistique du jour J : trajet testé, qui prévenir, sac dans la voiture, réservoir plein",
          'Poser votre congé de naissance auprès de votre employeur avec un vrai délai, pas dans l\'urgence',
        ],
      },
      {
        type: 'text',
        title: "Prendre un rendez-vous, pas seulement y assister",
        paragraphs: [
          "Il y a une différence entre accompagner quelqu'un à un rendez-vous et être responsable de ce rendez-vous. Être responsable veut dire : c'est vous qui savez qu'il existe, qui l'avez noté, qui relancez si la confirmation n'arrive pas, qui reprogrammez en cas de conflit. Assister, c'est utile. Posséder le suivi, c'est ce qui retire réellement une charge à l'autre.",
          "Choisissez deux ou trois postes de la liste ci-dessus et prenez-les en entier. Mieux vaut trois choses vraiment possédées que dix choses à moitié suivies par les deux.",
        ],
      },
      {
        type: 'text',
        title: 'Le jour J se prépare des semaines avant',
        paragraphs: [
          "La logistique de l'accouchement ne s'improvise pas la nuit où elle sert. Testez le trajet vers la maternité à l'heure où vous risquez réellement de partir, pas un dimanche après-midi. Sachez où sont les clés, le siège auto, le dossier de la maternité. Ayez une liste de personnes à prévenir, dans l'ordre, avec leurs numéros à portée de main.",
          "Rien de tout cela n'est spectaculaire. C'est justement ce qui en fait une vraie prise en charge : le genre de travail qui ne se voit que s'il n'est pas fait.",
        ],
      },
      {
        type: 'quote',
        quote: "Le mot « soutien » ne se traduit dans aucun agenda. Une tâche, si.",
      },
      {
        type: 'callout',
        paragraphs: [
          "Les durées et les délais de prévenance pour le congé de naissance et le congé paternité et d'accueil de l'enfant sont sur [service-public.fr](https://www.service-public.fr) et [code.travail.gouv.fr](https://code.travail.gouv.fr). Vérifiez aussi votre convention collective.",
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          "Most advice aimed at the co-parent boils down to a posture: be present, be attentive, be supportive. The problem is that a posture never fits on a checklist. You never quite know whether you have done it, or what more there is to do.",
          'This piece takes the opposite angle: specific tasks, with a start and an end, that you can own completely without needing to be reminded.',
        ],
      },
      {
        type: 'list',
        title: 'What can be entirely yours',
        items: [
          'Track the appointment calendar and book your time off work with real notice',
          'Own one specific piece of the paperwork (top-up cover, employer, or benefits office), start to finish, rather than "helping" with all of it',
          'Choose, buy and fit the car seat, and test it before the day it actually matters',
          'Pack your own hospital bag, and check that the first parent\'s is complete',
          'Organise the logistics of the day itself: a tested route, who to call, the bag already in the car, a full tank',
          'Request your birth leave from your employer with real notice, not in a rush',
        ],
      },
      {
        type: 'text',
        title: 'Booking an appointment, not just attending it',
        paragraphs: [
          'There is a difference between accompanying someone to an appointment and being responsible for it. Being responsible means: you are the one who knows it exists, who wrote it down, who chases it if the confirmation does not arrive, who reschedules if something clashes. Attending is useful. Owning the follow-up is what actually removes weight from the other person.',
          'Pick two or three items from the list above and take them completely. Three things genuinely owned beat ten things half-tracked by both of you.',
        ],
      },
      {
        type: 'text',
        title: 'The day itself gets prepared weeks in advance',
        paragraphs: [
          'The logistics of labour are not something you improvise on the night they matter. Test the route to the maternity unit at the hour you might actually need to leave, not on a quiet Sunday afternoon. Know where the keys are, the car seat, the maternity file. Have a list of people to call, in order, with their numbers within reach.',
          'None of this is dramatic. That is exactly what makes it real care: the kind of work that only shows when it has not been done.',
        ],
      },
      {
        type: 'quote',
        quote: "The word 'support' does not translate into anything on a calendar. A task does.",
      },
      {
        type: 'callout',
        paragraphs: [
          'Durations and notice periods for birth leave and paternity leave are on [service-public.fr](https://www.service-public.fr) and [code.travail.gouv.fr](https://code.travail.gouv.fr). Check your collective agreement too.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'annoncer-la-grossesse-a-qui-quand',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: 'Annoncer la grossesse : à qui, quand, et ce que dit vraiment la loi',
    titleEn: 'Announcing the pregnancy: who, when, and what the law actually says',
    excerptFr:
      "Famille, amis, employeur : l'ordre et le moment vous appartiennent presque entièrement. La loi n'impose un vrai repère que sur un seul point, et ce n'est pas celui qu'on croit.",
    excerptEn:
      'Family, friends, employer: the order and the timing are almost entirely yours to choose. The law sets one real marker, and it is not the one people assume.',
    readingMinutes: 5,
    heroAltFr: "Annoncer la grossesse à l'entourage et à l'employeur",
    heroAltEn: 'Announcing the pregnancy to family and the employer',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "Qui prévenir en premier, à quel moment, dans quel ordre : la plupart de ces choix n'ont pas de bonne réponse, seulement celle qui vous convient. La question de l'employeur est différente, parce qu'elle est entourée d'une idée reçue tenace sur un « délai légal » qui, en réalité, n'existe pas de la façon dont on le pense.",
        ],
      },
      {
        type: 'text',
        title: "L'employeur : ce que dit vraiment le droit du travail",
        paragraphs: [
          "Selon le Code du travail, une salariée n'a aucune obligation d'annoncer sa grossesse à son employeur à une date précise, ni même de l'annoncer du tout avant un certain stade. La seule véritable obligation porte sur autre chose : informer l'employeur avant le départ effectif en congé maternité, avec un certificat médical à l'appui, comme le confirme [code.travail.gouv.fr](https://code.travail.gouv.fr).",
          "En pratique, cela change la question posée. Ce n'est pas « quand suis-je obligée de le dire ? » mais « à partir de quand ai-je intérêt à le dire ? », puisque les protections liées à la grossesse (aménagements, autorisations d'absence pour les examens obligatoires) ne s'appliquent qu'une fois l'employeur informé. Le détail complet est sur [service-public.fr](https://www.service-public.fr).",
          "Une exception existe pour les agents publics : la fonction publique impose une déclaration avant la fin du 4e mois. Si vous êtes fonctionnaire ou contractuel de la fonction publique, vérifiez cette règle spécifique plutôt que celle du secteur privé.",
        ],
      },
      {
        type: 'list',
        title: "Famille, amis : l'ordre qui simplifie la vie",
        items: [
          "Décider à deux qui l'apprend en premier, avant que la question ne se pose dans l'urgence",
          "S'accorder sur une version commune du \"depuis quand\", pour éviter les versions qui se contredisent",
          "Prévoir qui prévient qui, pour ne pas que l'information circule par ricochet avant que vous ayez pu la donner vous-même",
          "Se laisser le droit de changer d'avis sur le moment, y compris après en avoir parlé une première fois",
        ],
      },
      {
        type: 'text',
        title: 'Le cas particulier du premier trimestre',
        paragraphs: [
          "Beaucoup de couples attendent la fin du premier trimestre avant d'élargir l'annonce au-delà du cercle proche. Ce n'est pas une règle, c'est un choix personnel très répandu, souvent lié au fait de se sentir prêt à répondre aux questions plutôt qu'à une contrainte quelconque. Il n'y a pas de bon moment universel, seulement celui où vous êtes prêts, tous les deux.",
        ],
      },
      {
        type: 'quote',
        quote:
          "Il n'existe pas de bon moment universel pour l'annoncer. Il existe le moment où vous vous sentez prêts à répondre aux questions.",
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Who to tell first, at what point, in what order: most of these choices have no right answer, only the one that suits you. The employer question is different, because it is surrounded by a stubborn myth about a "legal deadline" that does not actually exist the way people assume.',
        ],
      },
      {
        type: 'text',
        title: 'The employer: what employment law actually says',
        paragraphs: [
          "Under French labour law, an employee has no obligation to announce a pregnancy to their employer by a set date, or even to announce it at all before a given stage. The one real obligation concerns something else entirely: informing the employer before actually leaving for maternity leave, backed by a medical certificate, as confirmed by [code.travail.gouv.fr](https://code.travail.gouv.fr).",
          'In practice, this changes the question being asked. It is not "when am I required to say it?" but "from when is it in my interest to say it?", since pregnancy protections (adjustments, time off for mandatory examinations) only apply once the employer has been told. The full detail is on [service-public.fr](https://www.service-public.fr).',
          'One exception exists for public-sector employees: the civil service requires a declaration before the end of the 4th month. If you are a civil servant or a public-sector contractor, check that specific rule rather than the private-sector one.',
        ],
      },
      {
        type: 'list',
        title: 'Family, friends: the order that makes life easier',
        items: [
          'Decide together who hears first, before the question turns urgent on its own',
          'Agree on one shared version of "since when," so accounts do not contradict each other',
          'Plan who tells whom, so the news does not travel sideways before you get to share it yourselves',
          'Give yourselves permission to change your mind about timing, even after discussing it once',
        ],
      },
      {
        type: 'text',
        title: 'The particular case of the first trimester',
        paragraphs: [
          'Many couples wait until the end of the first trimester before widening the announcement beyond their close circle. This is not a rule; it is a widely shared personal choice, usually tied to feeling ready to answer questions rather than to any requirement. There is no universal right time, only the moment when both of you are ready.',
        ],
      },
      {
        type: 'quote',
        quote:
          'There is no universal right moment to announce it. There is the moment when both of you feel ready to answer questions.',
      },
    ],
  }),

  postPair({
    slug: 'preparer-laine-a-larrivee',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: "Préparer l'aîné à l'arrivée : le bon moment, pas le bon discours",
    titleEn: 'Preparing an older sibling for the arrival: timing over technique',
    excerptFr:
      "Il n'y a pas de formule magique pour annoncer un heureux évènement à un enfant. Il y a un moment adapté à son âge, quelques habitudes à préserver, et une régression courante qui n'a rien d'inquiétant si elle survient.",
    excerptEn:
      "There is no magic script for telling a child about a new sibling. There is an age-appropriate moment, a few habits worth protecting, and a common regression that is nothing to worry about if it shows up.",
    readingMinutes: 5,
    heroAltFr: "Préparer un enfant à l'arrivée d'un petit frère ou d'une petite sœur",
    heroAltEn: 'Preparing a child for a new sibling',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "Beaucoup de parents cherchent la bonne façon de l'annoncer à l'aîné : les bons mots, le bon livre, la bonne mise en scène. En pratique, le moment compte davantage que le discours. Ce texte reste sur le terrain de l'organisation, pas de la psychologie : ce qui se prépare à l'avance, et ce qui se gère au fur et à mesure.",
        ],
      },
      {
        type: 'text',
        title: 'Quel âge, quel moment',
        paragraphs: [
          "Un enfant très jeune a une notion du temps très différente de la vôtre : neuf mois d'attente n'ont pas de sens concret pour lui, et une annonce trop précoce peut simplement créer une attente longue et abstraite. Pour un tout-petit, en parler quand le ventre devient visible pour lui suffit souvent.",
          "Un enfant plus grand peut gérer un délai plus long, et pose en général des questions très concrètes : où il va dormir, si sa chambre change, si vous l'aimerez toujours autant. Ce sont des questions pratiques, et elles méritent des réponses pratiques, pas de grands discours.",
        ],
      },
      {
        type: 'list',
        title: 'Ce qui aide, concrètement',
        items: [
          "L'impliquer dans des tâches concrètes : choisir un doudou pour le bébé, participer à la préparation de la chambre",
          "Garder ses repères autant que possible pendant les premières semaines : crèche, horaires, lieux habituels",
          "Prévoir un temps rien qu'à deux avec lui après la naissance, même court",
          "Éviter de faire coïncider l'arrivée avec d'autres grands changements (passage au grand lit, arrêt de la tétine), si vous pouvez les décaler",
        ],
      },
      {
        type: 'text',
        title: 'Qui s\'occupe de qui, le jour J',
        paragraphs: [
          "C'est une décision de couple à prendre à l'avance, pas dans la précipitation : qui reste avec l'aîné pendant que l'un de vous est à la maternité, qui le récupère si la naissance a lieu en pleine journée d'école, et quelle personne de confiance sert de solution de repli si les deux parents sont indisponibles en même temps.",
        ],
      },
      {
        type: 'text',
        title: 'La régression, un fait courant, pas un problème',
        paragraphs: [
          "Il est fréquent qu'un aîné revienne temporairement sur des habitudes déjà acquises (sommeil, propreté, langage) dans les semaines qui suivent une naissance. C'est une observation courante, pas un signe que quelque chose ne va pas, et cela s'estompe généralement de soi-même en quelques semaines. Le savoir à l'avance évite d'être pris au dépourvu.",
        ],
      },
      {
        type: 'quote',
        quote: "Ne pas être surpris, c'est déjà une bonne moitié de la préparation.",
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          "Many parents look for the right way to tell their older child: the right words, the right book, the right moment staged just so. In practice, timing matters more than technique. This piece stays on the ground of organisation, not psychology: what can be prepared in advance, and what gets handled as it comes.",
        ],
      },
      {
        type: 'text',
        title: 'What age, what moment',
        paragraphs: [
          'A very young child has a very different sense of time from yours: nine months of waiting has no concrete meaning for them, and announcing it too early can just create a long, abstract wait. For a toddler, talking about it once the bump becomes visible to them is often enough.',
          'An older child can handle a longer lead time, and usually asks very practical questions: where they will sleep, whether their room is changing, whether you will still love them just as much. These are practical questions, and they deserve practical answers, not a long speech.',
        ],
      },
      {
        type: 'list',
        title: 'What actually helps',
        items: [
          'Involve them in concrete tasks: picking a stuffed toy for the baby, helping set up the room',
          'Keep their routines as stable as possible in the first weeks: nursery, timings, familiar places',
          'Plan some one-on-one time with them after the birth, even a short one',
          'Avoid stacking the arrival with other big changes (moving to a bed, dropping the dummy) if you can push those back',
        ],
      },
      {
        type: 'text',
        title: 'Who looks after whom, on the day',
        paragraphs: [
          "This is a couple's decision to make ahead of time, not in a rush: who stays with the older child while one of you is at the maternity unit, who picks them up if the birth happens during a school day, and which trusted person is the backup if both parents are unavailable at once.",
        ],
      },
      {
        type: 'text',
        title: 'Regression, a common fact, not a problem',
        paragraphs: [
          'It is common for an older sibling to temporarily slip back on habits they had already outgrown (sleep, toileting, speech) in the weeks after a birth. This is a common observation, not a sign that something is wrong, and it usually fades on its own within a few weeks. Knowing this in advance means it does not catch you off guard.',
        ],
      },
      {
        type: 'quote',
        quote: 'Not being surprised is already half the preparation.',
      },
    ],
  }),

  postPair({
    slug: 'decider-a-deux-avant-que-ca-decide-pour-vous',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: 'Les décisions qui se prennent par défaut si vous ne les prenez pas',
    titleEn: 'The decisions that get made for you if you do not make them',
    excerptFr:
      "Prénom, mode de garde, congés, visites : si personne ne tranche, quelque chose tranche à votre place, souvent plus tard et avec moins d'options. Ne pas décider, c'est déjà décider.",
    excerptEn:
      'First name, childcare, leave, visitors: if nobody decides, something decides for you anyway, usually later and with fewer options. Not deciding is still a decision.',
    readingMinutes: 6,
    heroAltFr: 'Décider à deux avant la naissance',
    heroAltEn: 'Deciding together before the birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "Certaines décisions de la grossesse donnent l'impression de pouvoir attendre. En réalité, plusieurs d'entre elles ont une échéance déjà fixée par ce qui vous entoure : une liste d'attente qui se remplit, un délai de prévenance à respecter, une naissance qui arrive avant que vous ayez tranché. Repousser, dans ces cas-là, ne laisse pas le choix ouvert. Ça laisse le calendrier décider à votre place.",
        ],
      },
      {
        type: 'list',
        title: "Les décisions qui ont une date de péremption",
        items: [
          "Le prénom : à trancher pour l'état civil dans les jours qui suivent la naissance, pas une bonne nuit pour improviser à deux",
          "Le mode de garde : les préinscriptions en crèche démarrent souvent dès le 3e ou 4e mois de grossesse",
          "Qui prend quel congé, et quand : les délais de prévenance auprès de l'employeur se comptent en semaines, pas en jours",
          "Qui vient, et quand, dans les premières semaines : sans en parler avant, ce sujet se règle souvent dans la fatigue",
          "Comment vous répartissez les nuits et les tâches du début : une improvisation qui coûte cher les deux premières semaines",
        ],
      },
      {
        type: 'text',
        title: 'Le prénom, exemple typique',
        paragraphs: [
          "Le prénom est l'exemple le plus net : rien n'oblige à le choisir tôt, et pourtant tout pousse à le faire. En parler calmement plusieurs semaines avant évite la pression d'une décision prise dans les heures qui suivent l'accouchement, fatigués, sous le regard de tout le monde. Vous n'êtes pas obligés de l'annoncer à l'avance. Vous gagnez simplement à l'avoir décidé.",
        ],
      },
      {
        type: 'text',
        title: 'Les visites, un sujet qu\'on évite',
        paragraphs: [
          "Qui vient à la maternité, qui vient à la maison, à partir de quand, et pendant combien de temps : c'est un sujet que beaucoup de couples repoussent parce qu'il touche à la famille, aux amis, et qu'il semble délicat à aborder. Repoussé, il ne disparaît pas, il se règle dans l'urgence, souvent aux dépens de la personne la plus fatiguée.",
        ],
      },
      {
        type: 'quote',
        quote: "Ne pas décider, c'est décider aussi. Juste plus tard, et avec moins de choix.",
      },
      {
        type: 'callout',
        paragraphs: [
          "Les préinscriptions en crèche se simulent sur [monenfant.fr](https://monenfant.fr) et [caf.fr](https://www.caf.fr). Les délais de prévenance pour les congés sont sur [service-public.fr](https://www.service-public.fr).",
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Some pregnancy decisions feel like they can wait. In reality, several of them already have a deadline set by what surrounds you: a waiting list filling up, a notice period you have to respect, a birth arriving before you have made up your mind. Putting it off, in those cases, does not keep your options open. It lets the calendar decide for you.',
        ],
      },
      {
        type: 'list',
        title: 'The decisions with a use-by date',
        items: [
          'The first name: it has to be settled for the birth record within days of the birth, not a good night for improvising together',
          'Childcare: nursery pre-registration often opens as early as the third or fourth month of pregnancy',
          'Who takes which leave, and when: notice periods to the employer are counted in weeks, not days',
          'Who visits, and when, in the first weeks: left undiscussed, this usually gets settled while everyone is exhausted',
          'How you split nights and early tasks: improvising this costs the most in the first two weeks',
        ],
      },
      {
        type: 'text',
        title: 'The first name, a typical example',
        paragraphs: [
          "The first name is the clearest example: nothing requires deciding it early, and yet everything pushes you to. Talking it through calmly weeks ahead avoids the pressure of a decision made in the hours after the birth, exhausted, with everyone watching. You are not required to announce it in advance. You simply gain from having settled it.",
        ],
      },
      {
        type: 'text',
        title: 'Visitors, a subject that gets avoided',
        paragraphs: [
          "Who comes to the maternity unit, who comes home, from when, and for how long: this is a subject many couples put off because it touches family, friends, and feels awkward to raise. Put off, it does not go away. It gets settled under pressure, usually at the expense of whoever is most exhausted.",
        ],
      },
      {
        type: 'quote',
        quote: 'Not deciding is still a decision. Just a later one, with fewer choices.',
      },
      {
        type: 'callout',
        paragraphs: [
          'Nursery pre-registration can be checked on [monenfant.fr](https://monenfant.fr) and [caf.fr](https://www.caf.fr). Notice periods for leave are on [service-public.fr](https://www.service-public.fr).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'parent-solo-organiser-larrivee',
    categoryKey: 'couple',
    categoryFr: 'À deux',
    categoryEn: 'Together',
    titleFr: "Préparer l'arrivée seul·e : l'organisation qui compte, et les aides qui existent",
    titleEn: 'Preparing the arrival on your own: the organisation that matters, and the support that exists',
    excerptFr:
      "Attendre un enfant seul·e n'est pas une version incomplète de la préparation à deux. C'est une organisation différente, avec ses propres appuis, y compris administratifs.",
    excerptEn:
      'Expecting a child on your own is not an incomplete version of preparing as a couple. It is a different setup, with its own supports, including administrative ones.',
    readingMinutes: 6,
    heroAltFr: "Préparer seul·e l'arrivée de bébé",
    heroAltEn: "Preparing for a baby's arrival on your own",
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          "Une grande partie de ce qui se prépare à deux se prépare tout aussi bien autrement, à condition de le construire délibérément plutôt que de compter sur la présence continue d'un co-parent. Ce n'est pas une version diminuée de la préparation. C'est une organisation qui repose sur un entourage choisi et sur des aides qui existent précisément pour cette situation.",
        ],
      },
      {
        type: 'list',
        title: "L'entourage qui prend le relais, concrètement",
        items: [
          "Qui vous emmène à la maternité si besoin, avec un plan B si cette personne n'est pas disponible",
          "Qui a un double de vos clés, pour venir sans que vous ayez à vous déplacer",
          "Qui est joignable de nuit, au moins pendant les deux premières semaines",
          "Qui peut passer sans prévenir un jour donné, simplement pour prendre le relais un moment",
          "Une personne qui peut suivre votre courrier ou vos démarches en cas de coup dur",
        ],
      },
      {
        type: 'text',
        title: 'Ce que prévoit l\'administration pour un parent isolé',
        paragraphs: [
          "Le RSA majoré, aussi appelé majoration pour isolement, existe précisément pour cette situation : il peut être versé dès la grossesse, sans démarche particulière si vous êtes déjà allocataire du RSA, et sa durée s'étend selon l'âge de l'enfant. Les conditions et le mode de calcul sont sur [service-public.fr](https://www.service-public.fr).",
          "L'allocation de soutien familial (ASF), versée par la CAF, s'adresse à toute personne qui élève seule un enfant sans le soutien de l'autre parent. Elle ne dépend pas de vos ressources. Les conditions précises et la marche à suivre sont sur [caf.fr](https://www.caf.fr).",
        ],
      },
      {
        type: 'text',
        title: 'La déclaration de grossesse ne change pas',
        paragraphs: [
          "Le suivi médical remboursé, la prime à la naissance, l'ouverture ou la mise à jour du dossier CAF : toutes ces démarches fonctionnent exactement de la même façon, quelle que soit votre situation familiale. La déclaration de grossesse se fait par le professionnel qui vous suit, comme pour n'importe qui, avant la fin du 3e mois.",
        ],
      },
      {
        type: 'quote',
        quote:
          "Ce n'est pas une préparation à deux à laquelle il manquerait quelqu'un. C'est une préparation qui s'organise autrement.",
      },
      {
        type: 'callout',
        paragraphs: [
          "Les conditions du RSA majoré et de l'allocation de soutien familial sont détaillées sur [service-public.fr](https://www.service-public.fr) et [caf.fr](https://www.caf.fr).",
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A large part of what gets prepared as a couple can be prepared just as well another way, provided it is built deliberately rather than relying on the constant presence of a co-parent. This is not a lesser version of preparing. It is an organisation that rests on a chosen support network and on support that exists precisely for this situation.',
        ],
      },
      {
        type: 'list',
        title: 'The people who take over, concretely',
        items: [
          'Who drives you to the maternity unit if needed, with a backup if that person is unavailable',
          'Who holds a spare set of your keys, so they can come without you having to move',
          'Who is reachable at night, at least for the first two weeks',
          'Who can drop by unannounced on a given day, just to take over for a while',
          'Someone who can follow your mail or paperwork if things get difficult',
        ],
      },
      {
        type: 'text',
        title: 'What the administration provides for a solo parent',
        paragraphs: [
          "The enhanced RSA, known as the isolation top-up (majoration pour isolement), exists precisely for this situation: it can be paid from pregnancy onward, with no extra steps if you already receive the RSA, and its length depends on the child's age. The conditions and how it is calculated are on [service-public.fr](https://www.service-public.fr).",
          'The family support allowance (ASF), paid by the CAF, is for anyone raising a child alone without support from the other parent. It does not depend on your income. The precise conditions and how to apply are on [caf.fr](https://www.caf.fr).',
        ],
      },
      {
        type: 'text',
        title: 'Declaring the pregnancy does not change',
        paragraphs: [
          'Covered medical follow-up, the birth grant, opening or updating your CAF file: all of these work exactly the same way, whatever your family situation. The pregnancy is declared by the professional following you, the same as for anyone else, before the end of the third month.',
        ],
      },
      {
        type: 'quote',
        quote: 'This is not a couple\'s preparation missing someone. It is a preparation organised differently.',
      },
      {
        type: 'callout',
        paragraphs: [
          'The conditions for the enhanced RSA and the family support allowance are detailed on [service-public.fr](https://www.service-public.fr) and [caf.fr](https://www.caf.fr).',
        ],
      },
    ],
  }),
];

export const POSTS_COUPLE_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_COUPLE_EN: BlogPost[] = pairs.map((p) => p.en);
