/**
 * SEO batch 4 — mode de garde et Pajemploi.
 *
 * Same house rules. No euro amounts (CMG, salaire minimum, indemnités all revalorise, and the
 * 2025 CMG reform makes any old figure wrong). The assistants maternels convention is the
 * unified CCN des particuliers employeurs et de l'emploi à domicile (IDCC 3239) since
 * 1 January 2022 - the old IDCC 2395 is not cited. Verified against service-public,
 * Pajemploi, the CAF and monenfant.fr.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'inscription-creche-quand-liste-attente',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Inscription en crèche : quand s’y prendre, et comment fonctionne la liste d’attente',
    titleEn: 'Crèche registration: when to start, and how the waiting list works',
    excerptFr:
      'Il n’y a pas de règle nationale : chaque commune fixe ses modalités. Le seul conseil universel, c’est de s’y prendre dès la grossesse confirmée, et de ne pas viser une seule crèche.',
    excerptEn:
      'There is no national rule: each commune sets its own terms. The one universal tip is to start as soon as the pregnancy is confirmed, and not to aim for a single crèche.',
    readingMinutes: 3,
    heroAltFr: 'L’inscription en crèche et la liste d’attente',
    heroAltEn: 'Crèche registration and the waiting list',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’inscription en crèche est l’une des démarches les plus stressantes de la grossesse, entretenue par les récits de listes d’attente et de places rares. La première chose à savoir désamorce une partie de l’angoisse : il n’existe pas de règle nationale.',
          'Chaque commune, chaque établissement fixe ses propres modalités. Ce qui vaut ailleurs ne vaut pas forcément chez vous, et c’est votre mairie qui a la réponse.',
        ],
      },
      {
        type: 'text',
        title: 'S’y prendre tôt, et pas sur une seule crèche',
        paragraphs: [
          'La recommandation la plus solide, relayée par [monenfant.fr](https://monenfant.fr/l-accueil-en-creche), est de se renseigner dès que la grossesse est confirmée, et de contacter plusieurs établissements plutôt qu’un seul. La préinscription avant la naissance est une pratique courante, pas une échéance légale.',
          'La liste des documents varie d’une commune à l’autre. Là encore, c’est le service petite enfance de votre mairie qui vous donnera la liste exacte, à jour.',
        ],
      },
      {
        type: 'text',
        title: 'La commission d’attribution, propre à chaque commune',
        paragraphs: [
          'Dans beaucoup de villes, les places sont attribuées par une commission qui se réunit un nombre limité de fois par an et fixe ses propres critères. C’est un fonctionnement local, pas une règle nationale, et il diffère d’une commune à l’autre.',
          'D’où l’intérêt de multiplier les demandes et de garder le contact avec les directions. Une place peut se libérer en cours d’année, et c’est souvent la famille joignable et déjà inscrite qui en bénéficie.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pas de règle nationale : chaque commune fixe ses modalités',
          'Se renseigner dès la grossesse confirmée',
          'Contacter plusieurs crèches, pas une seule',
          'La liste des documents varie : demander au service petite enfance',
          'Attribution par une commission locale, aux critères propres à la commune',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Crèche registration is one of the most stressful steps of pregnancy, fed by stories of waiting lists and scarce places. The first thing to know defuses part of the anxiety: there is no national rule.',
          'Each commune, each facility sets its own terms. What holds elsewhere does not necessarily hold where you are, and it is your town hall that has the answer.',
        ],
      },
      {
        type: 'text',
        title: 'Start early, and not on a single crèche',
        paragraphs: [
          'The soundest recommendation, relayed by [monenfant.fr](https://monenfant.fr/l-accueil-en-creche), is to enquire as soon as the pregnancy is confirmed, and to contact several facilities rather than one. Pre-registration before the birth is common practice, not a legal deadline.',
          'The list of documents varies from one commune to another. Again, it is your town hall\'s early-childhood service that will give you the exact, up-to-date list.',
        ],
      },
      {
        type: 'text',
        title: 'The allocation committee, specific to each commune',
        paragraphs: [
          'In many towns, places are allocated by a committee that meets a limited number of times a year and sets its own criteria. It is a local system, not a national rule, and it differs from one commune to the next.',
          'Hence the value of multiplying requests and keeping in touch with the managers. A place can free up during the year, and it is often the reachable, already-registered family that gets it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'No national rule: each commune sets its terms',
          'Enquire as soon as the pregnancy is confirmed',
          'Contact several crèches, not just one',
          'The document list varies: ask the early-childhood service',
          'Allocation by a local committee, with the commune\'s own criteria',
        ],
      },
    ],
  }),

  postPair({
    slug: 'assistante-maternelle-mensualisation-annee-incomplete',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Mensualisation de l’assistante maternelle en année incomplète',
    titleEn: 'Smoothing a childminder’s pay over an incomplete year',
    excerptFr:
      'Payer une assistante maternelle ne veut pas dire compter les heures chaque mois : le salaire est lissé sur douze mois. En année incomplète, le calcul suit une règle précise.',
    excerptEn:
      'Paying a childminder does not mean counting hours each month: the salary is smoothed over twelve months. In an incomplete year, the calculation follows a precise rule.',
    readingMinutes: 4,
    heroAltFr: 'La mensualisation de l’assistante maternelle',
    heroAltEn: 'Smoothing a childminder’s salary',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La mensualisation est le principe qui déroute le plus les parents qui deviennent employeurs d’une assistante maternelle. On paie le même montant chaque mois, y compris pendant les vacances, alors que les heures de garde, elles, varient. Ce n’est pas une erreur, c’est la règle.',
          'Elle vise à donner un salaire régulier à la salariée, et un budget prévisible à la famille. Encore faut-il savoir la calculer quand l’enfant n’est pas gardé toute l’année.',
        ],
      },
      {
        type: 'text',
        title: 'Année complète ou incomplète',
        paragraphs: [
          'La mensualisation est obligatoire dans les deux cas, selon [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil/employeur-dassistante-maternelle/je-recrute-et-jemploie/determiner-le-salaire.html). On parle d’année incomplète quand l’enfant est gardé quarante-six semaines par an ou moins.',
          'La distinction compte, car le calcul et le traitement des congés payés diffèrent. En année incomplète, les cinq semaines de congés payés sont exclues de la base de mensualisation et payées séparément.',
        ],
      },
      {
        type: 'text',
        title: 'Le principe du calcul',
        paragraphs: [
          'En année incomplète, le salaire mensuel se calcule ainsi : le salaire horaire net, multiplié par le nombre d’heures par semaine, multiplié par le nombre de semaines d’accueil programmées, le tout divisé par douze.',
          'Le nombre de semaines d’accueil s’obtient en retirant des cinquante-deux semaines de l’année les cinq semaines de congés de l’assistante maternelle et les semaines d’absence prévues de l’enfant. Un simulateur officiel existe pour éviter les erreurs.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Mensualisation obligatoire : même salaire chaque mois, heures lissées',
          'Année incomplète : enfant gardé 46 semaines par an ou moins',
          'Calcul : salaire horaire net × heures/semaine × semaines d’accueil ÷ 12',
          'Semaines d’accueil : 52 moins les congés de l’assmat et les absences de l’enfant',
          'En année incomplète, les 5 semaines de congés payés sont payées à part',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Smoothing is the principle that most puzzles parents who become a childminder\'s employer. You pay the same amount each month, including during holidays, while the care hours vary. It is not a mistake, it is the rule.',
          'It aims to give the employee a steady salary, and the family a predictable budget. But you need to know how to calculate it when the child is not cared for all year.',
        ],
      },
      {
        type: 'text',
        title: 'Complete or incomplete year',
        paragraphs: [
          'Smoothing is mandatory in both cases, according to [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil/employeur-dassistante-maternelle/je-recrute-et-jemploie/determiner-le-salaire.html). An incomplete year is when the child is cared for forty-six weeks a year or fewer.',
          'The distinction matters, because the calculation and the treatment of paid leave differ. In an incomplete year, the five weeks of paid leave are excluded from the smoothing base and paid separately.',
        ],
      },
      {
        type: 'text',
        title: 'The calculation principle',
        paragraphs: [
          'In an incomplete year, the monthly salary is calculated as follows: the net hourly wage, multiplied by the number of hours per week, multiplied by the number of planned care weeks, all divided by twelve.',
          'The number of care weeks is found by removing, from the fifty-two weeks of the year, the childminder\'s five weeks of leave and the child\'s planned weeks of absence. An official calculator exists to avoid errors.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Smoothing mandatory: same salary each month, hours averaged',
          'Incomplete year: child cared for 46 weeks a year or fewer',
          'Calculation: net hourly wage x hours/week x care weeks ÷ 12',
          'Care weeks: 52 minus the childminder\'s leave and the child\'s absences',
          'In an incomplete year, the 5 weeks of paid leave are paid separately',
        ],
      },
    ],
  }),

  postPair({
    slug: 'garde-partagee-deux-familles-contrat-cout',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Garde partagée entre deux familles : contrat et coût',
    titleEn: 'Shared childcare between two families: contract and cost',
    excerptFr:
      'Deux familles emploient une même personne à domicile pour garder leurs enfants ensemble. Chacune est employeur à part entière, avec son contrat et sa déclaration. Voici comment ça marche.',
    excerptEn:
      'Two families employ the same person at home to care for their children together. Each is a full employer, with its own contract and declaration. Here is how it works.',
    readingMinutes: 3,
    heroAltFr: 'La garde partagée entre deux familles',
    heroAltEn: 'Shared childcare between two families',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La garde partagée séduit de plus en plus de familles : deux foyers emploient une même personne, à domicile, pour garder leurs enfants ensemble. Le coût par famille baisse, et l’enfant a de la compagnie. Mais le montage administratif surprend souvent.',
          'Le point à comprendre, c’est que chaque famille est un employeur à part entière.',
        ],
      },
      {
        type: 'text',
        title: 'Deux employeurs, deux contrats',
        paragraphs: [
          'Chaque famille signe son propre contrat de travail avec la salariée, en mentionnant l’autre famille employeuse, les deux domiciles et les enfants des deux foyers, selon [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil/employeur-de-garde-denfants-a-do/je-recrute-et-jemploie/le-contrat-de-travail.html).',
          'Chaque famille déclare et paie sa part sur Pajemploi, soit deux déclarations mensuelles distinctes. Il s’agit d’une garde à domicile, avec ses propres règles, différentes de celles d’une assistante maternelle.',
        ],
      },
      {
        type: 'text',
        title: 'Le coût, librement réparti',
        paragraphs: [
          'La répartition du coût entre les deux familles est libre, souvent au prorata de la présence des enfants de chacune. Il n’y a pas de règle légale de partage : c’est une négociation entre les deux foyers.',
          'Un point pratique à ne pas négliger : le jour de repos hebdomadaire doit être le même pour les deux employeurs. Cela suppose de s’accorder dès le départ sur le calendrier commun.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Deux familles emploient une même garde à domicile',
          'Chaque famille est employeur : un contrat par famille',
          'Deux déclarations mensuelles distinctes sur Pajemploi',
          'Coût réparti librement, souvent au prorata de la présence des enfants',
          'Le jour de repos hebdomadaire doit être commun aux deux',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Shared childcare appeals to more and more families: two households employ the same person, at home, to care for their children together. The cost per family drops, and the child has company. But the administrative setup often surprises.',
          'The point to grasp is that each family is a full employer.',
        ],
      },
      {
        type: 'text',
        title: 'Two employers, two contracts',
        paragraphs: [
          'Each family signs its own employment contract with the employee, naming the other employer family, the two homes and both households\' children, according to [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr/pajewebinfo/cms/sites/pajewebinfo/accueil/employeur-de-garde-denfants-a-do/je-recrute-et-jemploie/le-contrat-de-travail.html).',
          'Each family declares and pays its share on Pajemploi, meaning two separate monthly declarations. This is in-home care, with its own rules, different from a childminder\'s.',
        ],
      },
      {
        type: 'text',
        title: 'The cost, freely split',
        paragraphs: [
          'The split of the cost between the two families is free, often pro rata to each one\'s children\'s presence. There is no legal splitting rule: it is a negotiation between the two households.',
          'One practical point not to overlook: the weekly rest day must be the same for both employers. That means agreeing from the start on a common calendar.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Two families employ the same in-home carer',
          'Each family is an employer: one contract per family',
          'Two separate monthly declarations on Pajemploi',
          'Cost split freely, often pro rata to the children\'s presence',
          'The weekly rest day must be common to both',
        ],
      },
    ],
  }),

  postPair({
    slug: 'contrat-assistante-maternelle-mentions-obligatoires',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Contrat d’assistante maternelle : les mentions obligatoires',
    titleEn: 'Childminder contract: the mandatory clauses',
    excerptFr:
      'Un contrat écrit est obligatoire, et il obéit à une convention collective précise. Voici ce qu’il doit contenir pour vous protéger, vous et la salariée.',
    excerptEn:
      'A written contract is mandatory, and it follows a precise collective agreement. Here is what it must contain to protect you and the employee.',
    readingMinutes: 3,
    heroAltFr: 'Le contrat d’assistante maternelle',
    heroAltEn: 'The childminder contract',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Employer une assistante maternelle suppose un contrat de travail écrit, pour chaque employeur. Ce n’est pas une formalité : c’est ce document qui fixe les règles et protège les deux parties en cas de désaccord.',
          'Le connaître avant de le signer évite les malentendus les plus fréquents, sur les horaires, les congés ou la rupture.',
        ],
      },
      {
        type: 'text',
        title: 'Une convention collective de référence',
        paragraphs: [
          'Le contrat s’inscrit dans la convention collective nationale des particuliers employeurs et de l’emploi à domicile, qui encadre la relation depuis le 1er janvier 2022, selon [code.travail.gouv.fr](https://code.travail.gouv.fr/fiche-service-public/contrat-de-travail-et-formalites-dembauche-de-lassistante-maternelle).',
          'C’est elle qui fixe les droits minimaux : elle prime sur toute clause moins favorable du contrat. La lire en parallèle du contrat est un bon réflexe d’employeur.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que le contrat doit contenir',
        paragraphs: [
          'Le contrat doit préciser l’identité des parties, les horaires d’accueil, la rémunération et les indemnités, les congés payés, et les conditions de rupture. Il mentionne aussi l’assurance de l’assistante maternelle et la référence à son agrément.',
          'La période d’essai est facultative, mais si vous en prévoyez une, elle doit figurer par écrit dans le contrat. Un contrat complet dès le départ évite les zones grises quand une difficulté surgit.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Contrat écrit obligatoire, un par employeur',
          'Convention collective des particuliers employeurs et de l’emploi à domicile',
          'À préciser : identité, horaires, rémunération, congés, conditions de rupture',
          'À mentionner : assurance de l’assmat et agrément',
          'Période d’essai facultative, mais écrite si elle est prévue',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Employing a childminder requires a written employment contract, for each employer. It is not a formality: it is this document that sets the rules and protects both parties in case of disagreement.',
          'Knowing it before signing avoids the most common misunderstandings, over hours, leave or termination.',
        ],
      },
      {
        type: 'text',
        title: 'A reference collective agreement',
        paragraphs: [
          'The contract falls under the national collective agreement for household employers and home employment, which has governed the relationship since 1 January 2022, according to [code.travail.gouv.fr](https://code.travail.gouv.fr/fiche-service-public/contrat-de-travail-et-formalites-dembauche-de-lassistante-maternelle).',
          'It sets the minimum rights: it prevails over any less favourable contract clause. Reading it alongside the contract is a good employer\'s reflex.',
        ],
      },
      {
        type: 'text',
        title: 'What the contract must contain',
        paragraphs: [
          'The contract must specify the identity of the parties, the care hours, the pay and allowances, the paid leave, and the termination conditions. It also mentions the childminder\'s insurance and the reference to their approval.',
          'The trial period is optional, but if you provide for one, it must appear in writing in the contract. A complete contract from the start avoids grey areas when a difficulty arises.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Written contract mandatory, one per employer',
          'Collective agreement for household employers and home employment',
          'To specify: identity, hours, pay, leave, termination conditions',
          'To mention: the childminder\'s insurance and approval',
          'Trial period optional, but written if provided for',
        ],
      },
    ],
  }),

  postPair({
    slug: 'micro-creche-cmg-ou-psu-difference',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Micro-crèche : la différence entre financement CMG et PSU',
    titleEn: 'Micro-crèche: the difference between CMG and PSU funding',
    excerptFr:
      'Deux micro-crèches identiques peuvent coûter très différemment selon leur mode de financement. Savoir laquelle est en CMG ou en PSU change votre reste à charge.',
    excerptEn:
      'Two identical micro-crèches can cost very differently depending on their funding model. Knowing which is CMG or PSU changes what you pay.',
    readingMinutes: 3,
    heroAltFr: 'Micro-crèche financée en CMG ou en PSU',
    heroAltEn: 'A micro-crèche funded via CMG or PSU',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Deux micro-crèches qui se ressemblent en tout point peuvent laisser un reste à charge très différent aux familles. La raison n’est pas leur qualité, mais leur mode de financement, choisi par le gestionnaire. C’est une question à poser avant de s’inscrire.',
          'Il existe deux modèles, exclusifs l’un de l’autre.',
        ],
      },
      {
        type: 'text',
        title: 'CMG structure ou PSU',
        paragraphs: [
          'Dans le modèle PAJE, dit CMG structure, la micro-crèche fixe librement son prix, et c’est la CAF qui verse le complément de mode de garde directement aux parents, selon les repères de la [CAF](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'Dans le modèle PSU, la CAF finance directement la structure, et la famille paie un tarif calculé sur ses revenus, comme dans une crèche classique. Il n’y a alors pas de CMG versé à la famille.',
        ],
      },
      {
        type: 'text',
        title: 'Comment savoir laquelle',
        paragraphs: [
          'La façon la plus simple de le savoir est de poser la question à la micro-crèche. Si vous percevez un CMG de la CAF pour cette place, vous êtes en modèle PAJE. Si le prix dépend de vos revenus sans CMG, vous êtes en PSU.',
          'La distinction est décisive pour le budget, d’autant que le CMG a été réformé en 2025. Les montants se vérifient sur le site de la CAF, jamais sur une grille figée.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Deux modèles exclusifs : CMG structure (PAJE) ou PSU',
          'CMG structure : prix libre, CMG versé aux parents par la CAF',
          'PSU : structure financée par la CAF, tarif selon les revenus, sans CMG',
          'Pour savoir : demander à la micro-crèche',
          'Montants à vérifier sur caf.fr (CMG réformé en 2025)',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Two micro-crèches alike in every way can leave families with very different costs. The reason is not their quality, but their funding model, chosen by the operator. It is a question to ask before registering.',
          'There are two models, mutually exclusive.',
        ],
      },
      {
        type: 'text',
        title: 'CMG structure or PSU',
        paragraphs: [
          'In the PAJE model, known as CMG structure, the micro-crèche freely sets its price, and the CAF pays the childcare benefit directly to the parents, according to the [CAF](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'In the PSU model, the CAF funds the facility directly, and the family pays a fee based on its income, as in a classic crèche. There is then no benefit paid to the family.',
        ],
      },
      {
        type: 'text',
        title: 'How to tell which',
        paragraphs: [
          'The simplest way to know is to ask the micro-crèche. If you receive a childcare benefit from the CAF for this place, you are on the PAJE model. If the price depends on your income with no benefit, you are on PSU.',
          'The distinction is decisive for the budget, all the more so since the benefit was reformed in 2025. Amounts are checked on the CAF site, never on a fixed table.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Two exclusive models: CMG structure (PAJE) or PSU',
          'CMG structure: free price, benefit paid to parents by the CAF',
          'PSU: facility funded by the CAF, fee based on income, no benefit',
          'To find out: ask the micro-crèche',
          'Amounts to check on caf.fr (benefit reformed in 2025)',
        ],
      },
    ],
  }),

  postPair({
    slug: 'cesu-ou-pajemploi-quelle-difference',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Cesu ou Pajemploi : lequel utiliser pour la garde d’enfant',
    titleEn: 'Cesu or Pajemploi: which to use for childcare',
    excerptFr:
      'Les deux services de l’Urssaf servent à déclarer un emploi à domicile, mais pas dans les mêmes cas. La règle tient à l’âge de l’enfant et au droit au complément de garde.',
    excerptEn:
      'Both Urssaf services declare home employment, but not in the same cases. The rule comes down to the child’s age and the right to the childcare benefit.',
    readingMinutes: 3,
    heroAltFr: 'Cesu ou Pajemploi pour la garde d’enfant',
    heroAltEn: 'Cesu or Pajemploi for childcare',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Cesu et Pajemploi sont deux services de l’Urssaf qui servent tous les deux à déclarer un salarié à domicile. On les confond souvent, et choisir le mauvais complique inutilement la déclaration et l’aide.',
          'La règle est en réalité simple, une fois qu’on connaît le critère qui les sépare.',
        ],
      },
      {
        type: 'text',
        title: 'La règle : l’âge de l’enfant',
        paragraphs: [
          'Pajemploi sert à déclarer une assistante maternelle agréée ou une garde à domicile pour un enfant de moins de six ans, et c’est par lui que passe le complément de mode de garde, selon [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr).',
          'Le Cesu, lui, concerne l’emploi à domicile qui n’ouvre pas droit au complément de garde, notamment la garde d’un enfant de plus de six ans, et l’aide à domicile en général.',
        ],
      },
      {
        type: 'text',
        title: 'Un cas qui ne change jamais',
        paragraphs: [
          'Une exception à retenir : une assistante maternelle se déclare toujours sur Pajemploi, quel que soit l’âge de l’enfant. Le Cesu ne s’applique pas à elle.',
          'Dans les deux services, le crédit d’impôt pour les services à la personne s’applique, avec la possibilité de l’avance immédiate. Le choix du service ne fait pas perdre l’avantage fiscal.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Enfant de moins de 6 ans (assmat ou domicile) : Pajemploi, avec le CMG',
          'Enfant de plus de 6 ans ou emploi sans CMG : Cesu',
          'Une assistante maternelle : toujours Pajemploi',
          'Crédit d’impôt services à la personne dans les deux cas',
          'Avance immédiate possible sur les deux',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Cesu and Pajemploi are two Urssaf services that both declare a home employee. They are often confused, and choosing the wrong one needlessly complicates the declaration and the benefit.',
          'The rule is in fact simple, once you know the criterion that separates them.',
        ],
      },
      {
        type: 'text',
        title: 'The rule: the child’s age',
        paragraphs: [
          'Pajemploi declares an approved childminder or in-home care for a child under six, and it is through it that the childcare benefit is managed, according to [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr).',
          'Cesu concerns home employment that does not open the right to the childcare benefit, notably care of a child over six, and home help in general.',
        ],
      },
      {
        type: 'text',
        title: 'One case that never changes',
        paragraphs: [
          'One exception to remember: a childminder is always declared on Pajemploi, whatever the child\'s age. Cesu does not apply to them.',
          'In both services, the tax credit for personal services applies, with the option of the immediate advance. Choosing the service does not lose the tax benefit.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Child under 6 (childminder or home): Pajemploi, with the benefit',
          'Child over 6 or employment without the benefit: Cesu',
          'A childminder: always Pajemploi',
          'Personal-services tax credit in both cases',
          'Immediate advance possible on both',
        ],
      },
    ],
  }),

  postPair({
    slug: 'periode-adaptation-creche-comment-ca-marche',
    categoryKey: 'preparation',
    categoryFr: 'Préparation',
    categoryEn: 'Preparation',
    disclaimer: false,
    titleFr: 'Période d’adaptation en crèche : comment elle se déroule',
    titleEn: 'Settling-in period at the crèche: how it works',
    excerptFr:
      'Avant l’accueil à temps plein, une période d’adaptation en douceur permet à l’enfant, aux parents et à l’équipe de se connaître. Voici à quoi elle sert et comment elle se déroule.',
    excerptEn:
      'Before full-time care, a gentle settling-in period lets the child, the parents and the team get to know each other. Here is what it is for and how it unfolds.',
    readingMinutes: 3,
    heroAltFr: 'La période d’adaptation en crèche',
    heroAltEn: 'The settling-in period at the crèche',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La période d’adaptation est une étape que beaucoup de parents découvrent au dernier moment, alors qu’elle se prépare : on ne dépose pas son enfant à temps plein dès le premier jour. L’accueil se fait progressivement, sur plusieurs jours.',
          'C’est une bonne nouvelle, souvent mal anticipée dans l’organisation de la reprise du travail.',
        ],
      },
      {
        type: 'text',
        title: 'Une entrée progressive',
        paragraphs: [
          'L’adaptation consiste à introduire l’enfant en douceur, sur quelques jours à une semaine ou deux, en commençant par de courts moments puis en allongeant jusqu’à une journée complète, comme le décrit la [CAF](https://www.caf.fr/allocataires/vies-de-famille/articles/l-adaptation-pour-une-relation-de-confiance-avec-la-nounou).',
          'Il n’y a pas de durée fixée par la loi : chaque structure la précise dans son règlement de fonctionnement, et l’ajuste au rythme de l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'À quoi elle sert vraiment',
        paragraphs: [
          'Elle sert à apprivoiser la première séparation, pour l’enfant comme pour les parents. L’enfant se familiarise avec un nouvel environnement, des voix, un rythme et des repas différents. L’équipe, de son côté, apprend ses habitudes.',
          'C’est aussi ce qui installe un climat de confiance. Bien vécue, l’adaptation rassure autant les parents que l’enfant, et rend la reprise plus sereine.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Entrée progressive sur quelques jours à une ou deux semaines',
          'De courts moments d’abord, puis des journées plus longues',
          'Pas de durée légale : fixée dans le règlement de la structure',
          'Sert à apprivoiser la séparation et à installer la confiance',
          'À anticiper dans le calendrier de reprise du travail',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The settling-in period is a step many parents discover at the last moment, though it needs planning: you do not drop your child off full-time on the first day. Care builds up gradually, over several days.',
          'It is good news, often poorly anticipated in the organisation of the return to work.',
        ],
      },
      {
        type: 'text',
        title: 'A gradual start',
        paragraphs: [
          'Settling in means introducing the child gently, over a few days to one or two weeks, starting with short moments then lengthening to a full day, as the [CAF](https://www.caf.fr/allocataires/vies-de-famille/articles/l-adaptation-pour-une-relation-de-confiance-avec-la-nounou) describes.',
          'There is no duration set by law: each facility specifies it in its operating rules, and adjusts it to the child\'s pace.',
        ],
      },
      {
        type: 'text',
        title: 'What it is really for',
        paragraphs: [
          'It serves to ease the first separation, for the child and the parents alike. The child gets used to a new environment, voices, a rhythm and different meals. The team, for its part, learns their habits.',
          'It is also what builds a climate of trust. When it goes well, settling in reassures the parents as much as the child, and makes the return calmer.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Gradual start over a few days to one or two weeks',
          'Short moments first, then longer days',
          'No legal duration: set in the facility\'s rules',
          'Serves to ease the separation and build trust',
          'To anticipate in the return-to-work calendar',
        ],
      },
    ],
  }),

  postPair({
    slug: 'rupture-contrat-assistante-maternelle-procedure',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Rompre le contrat d’une assistante maternelle : la procédure',
    titleEn: 'Ending a childminder’s contract: the procedure',
    excerptFr:
      'Mettre fin au contrat d’une assistante maternelle a un nom précis, le retrait de l’enfant, et des règles : préavis, indemnité, documents de fin de contrat. Voici l’essentiel.',
    excerptEn:
      'Ending a childminder’s contract has a precise name, the withdrawal of the child, and rules: notice, allowance, end-of-contract documents. Here are the essentials.',
    readingMinutes: 3,
    heroAltFr: 'Rompre le contrat d’une assistante maternelle',
    heroAltEn: 'Ending a childminder’s contract',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Mettre fin à l’emploi d’une assistante maternelle, parce que l’enfant entre à la crèche ou que la situation change, obéit à une procédure précise. La méconnaître expose à des erreurs qui coûtent, ou à des tensions inutiles avec la salariée.',
          'Premier point : le mot juste. Pour une assistante maternelle, on parle de retrait de l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'Le retrait de l’enfant, avec préavis',
        paragraphs: [
          'L’employeur met fin au contrat par le retrait de l’enfant, l’équivalent d’un licenciement dans ce cadre. À noter : la rupture conventionnelle n’existe pas pour les assistants maternels, selon [code.travail.gouv.fr](https://code.travail.gouv.fr/themes/assistant-e-maternel-e).',
          'Un préavis s’applique selon l’ancienneté : une semaine avant six mois, deux semaines de six mois à moins de deux ans, un mois au-delà de deux ans. Il se respecte, sauf dispense.',
        ],
      },
      {
        type: 'text',
        title: 'Indemnité et documents de fin de contrat',
        paragraphs: [
          'Une indemnité de rupture est due lors du retrait de l’enfant, sous condition d’ancienneté. Son calcul se vérifie sur la fiche officielle plutôt que de mémoire, car il dépend de la convention.',
          'À la fin, trois documents doivent être remis : le certificat de travail, le solde de tout compte et l’attestation destinée à France Travail. Pajemploi aide à les générer à partir des données déjà saisies.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Le nom : retrait de l’enfant, pas de rupture conventionnelle possible',
          'Préavis : 1 semaine (moins de 6 mois), 2 semaines (6 mois à 2 ans), 1 mois (2 ans et plus)',
          'Indemnité de rupture due sous condition d’ancienneté',
          'Documents : certificat de travail, solde de tout compte, attestation France Travail',
          'Pajemploi aide à générer les documents',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Ending a childminder\'s employment, because the child is starting at the crèche or the situation changes, follows a precise procedure. Not knowing it risks costly mistakes, or needless tension with the employee.',
          'First point: the right word. For a childminder, it is called the withdrawal of the child.',
        ],
      },
      {
        type: 'text',
        title: 'Withdrawal of the child, with notice',
        paragraphs: [
          'The employer ends the contract by withdrawing the child, the equivalent of a dismissal in this context. Note: the negotiated termination does not exist for childminders, according to [code.travail.gouv.fr](https://code.travail.gouv.fr/themes/assistant-e-maternel-e).',
          'A notice period applies by seniority: one week before six months, two weeks from six months to under two years, one month beyond two years. It must be respected, save a waiver.',
        ],
      },
      {
        type: 'text',
        title: 'Allowance and end-of-contract documents',
        paragraphs: [
          'A termination allowance is due on the withdrawal of the child, subject to seniority. Its calculation is checked on the official page rather than from memory, since it depends on the agreement.',
          'At the end, three documents must be handed over: the work certificate, the final settlement and the France Travail statement. Pajemploi helps generate them from the data already entered.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The name: withdrawal of the child, no negotiated termination possible',
          'Notice: 1 week (under 6 months), 2 weeks (6 months to 2 years), 1 month (2 years+)',
          'Termination allowance due subject to seniority',
          'Documents: work certificate, final settlement, France Travail statement',
          'Pajemploi helps generate the documents',
        ],
      },
    ],
  }),

  postPair({
    slug: 'maison-assistants-maternels-mam-fonctionnement',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Maison d’assistants maternels (MAM) : comment ça fonctionne',
    titleEn: 'Childminders’ house (MAM): how it works',
    excerptFr:
      'Une MAM regroupe plusieurs assistantes maternelles dans un lieu partagé. Le cadre ressemble à une crèche, mais vous restez l’employeur direct de l’assistante maternelle.',
    excerptEn:
      'A MAM brings several childminders together in a shared place. It looks like a crèche, but you remain the direct employer of the childminder.',
    readingMinutes: 3,
    heroAltFr: 'La maison d’assistants maternels',
    heroAltEn: 'The childminders’ house',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La maison d’assistants maternels, la MAM, est un mode d’accueil à mi-chemin entre l’assistante maternelle à domicile et la crèche. Plusieurs assistantes maternelles s’y regroupent dans un lieu dédié, hors de leur propre logement.',
          'Le cadre séduit par sa souplesse, mais il repose sur un point que les parents comprennent parfois mal : vous restez employeur.',
        ],
      },
      {
        type: 'text',
        title: 'Un lieu partagé, un cadre encadré',
        paragraphs: [
          'Une MAM regroupe deux à quatre assistantes maternelles, avec un maximum de seize enfants accueillis, selon [monenfant.fr](https://monenfant.fr/aide-au-demarrage-des-mam). Chaque assistante maternelle doit disposer d’un agrément spécifique, délivré par le conseil départemental après avis de la PMI.',
          'C’est ce qui distingue la MAM d’une garde à domicile classique : un local pensé pour l’accueil, et plusieurs professionnelles qui s’organisent ensemble.',
        ],
      },
      {
        type: 'text',
        title: 'Vous restez l’employeur',
        paragraphs: [
          'Le point clé : la relation de travail est directe et inchangée. Vous êtes l’employeur de l’assistante maternelle qui garde votre enfant, avec la même convention collective, et non l’employeur de la MAM.',
          'Vous pouvez donc percevoir le complément de mode de garde comme pour une assistante maternelle à domicile. La MAM change le lieu et l’organisation, pas votre statut d’employeur.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Plusieurs assistantes maternelles dans un lieu partagé, hors domicile',
          '2 à 4 assistantes maternelles, 16 enfants maximum',
          'Agrément spécifique délivré par le conseil départemental',
          'Vous êtes l’employeur direct de l’assmat, pas de la MAM',
          'Complément de mode de garde possible, comme pour une assmat à domicile',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The childminders\' house, the MAM, is a form of care midway between the home childminder and the crèche. Several childminders group together in a dedicated place, away from their own homes.',
          'The setup appeals for its flexibility, but it rests on a point parents sometimes misunderstand: you remain the employer.',
        ],
      },
      {
        type: 'text',
        title: 'A shared place, a framed setting',
        paragraphs: [
          'A MAM brings together two to four childminders, with a maximum of sixteen children, according to [monenfant.fr](https://monenfant.fr/aide-au-demarrage-des-mam). Each childminder must hold a specific approval, issued by the departmental council after the maternal-and-infant-protection service\'s opinion.',
          'That is what sets a MAM apart from classic in-home care: premises designed for care, and several professionals organising together.',
        ],
      },
      {
        type: 'text',
        title: 'You remain the employer',
        paragraphs: [
          'The key point: the employment relationship is direct and unchanged. You are the employer of the childminder caring for your child, under the same collective agreement, and not the employer of the MAM.',
          'So you can receive the childcare benefit as for a home childminder. The MAM changes the place and the organisation, not your employer status.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Several childminders in a shared place, away from home',
          '2 to 4 childminders, 16 children maximum',
          'Specific approval issued by the departmental council',
          'You are the direct employer of the childminder, not the MAM',
          'Childcare benefit possible, as for a home childminder',
        ],
      },
    ],
  }),

  postPair({
    slug: 'garde-horaires-atypiques-aides-solutions',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Garde en horaires atypiques : les aides et les solutions',
    titleEn: 'Childcare at atypical hours: the help and the solutions',
    excerptFr:
      'Travailler tôt, tard, la nuit ou le week-end complique la garde. Des solutions et une aide majorée existent, mais elles se cherchent au niveau local. Voici où regarder.',
    excerptEn:
      'Working early, late, at night or on weekends makes childcare harder. Solutions and an increased benefit exist, but they are found locally. Here is where to look.',
    readingMinutes: 3,
    heroAltFr: 'La garde d’enfant en horaires atypiques',
    heroAltEn: 'Childcare at atypical hours',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les horaires atypiques, tôt le matin, tard le soir, la nuit, le week-end, sont l’angle mort de la garde d’enfant. Les crèches classiques ne couvrent pas ces plages, et les parents concernés se sentent souvent seuls face au problème.',
          'Des solutions existent pourtant, et une aide majorée aussi. Le point à retenir, c’est qu’elles se cherchent surtout au niveau local.',
        ],
      },
      {
        type: 'text',
        title: 'Une aide majorée pour les heures décalées',
        paragraphs: [
          'Pour une garde à horaires atypiques, le complément de mode de garde en emploi direct peut être majoré, sous conditions d’heures de nuit, de dimanche ou de jours fériés, selon la [CAF](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'Les modes éligibles sont l’assistante maternelle agréée, la garde à domicile, et certaines micro-crèches. Quelques crèches proposent des horaires élargis, parfois toute l’année.',
        ],
      },
      {
        type: 'text',
        title: 'Où chercher',
        paragraphs: [
          'La CAF cofinance localement des structures et services dédiés aux horaires décalés, mais l’offre varie beaucoup d’un département à l’autre. Il n’existe pas de guichet national unique.',
          'Les bons points de départ sont votre CAF départementale et le site monenfant.fr, qui recense les modes d’accueil près de chez vous. Un appel à la CAF permet souvent de découvrir des dispositifs peu visibles.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Horaires atypiques : tôt, tard, la nuit, le week-end, les jours fériés',
          'Complément de mode de garde majoré sous conditions',
          'Modes éligibles : assmat, garde à domicile, certaines micro-crèches',
          'Offre locale, variable selon le département',
          'Où chercher : CAF départementale et monenfant.fr',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Atypical hours, early morning, late evening, night, weekends, are the blind spot of childcare. Classic crèches do not cover these slots, and the parents concerned often feel alone with the problem.',
          'Yet solutions exist, and an increased benefit too. The point to remember is that they are found mostly at the local level.',
        ],
      },
      {
        type: 'text',
        title: 'An increased benefit for off-peak hours',
        paragraphs: [
          'For care at atypical hours, the direct-employment childcare benefit can be increased, subject to conditions on night, Sunday or public-holiday hours, according to the [CAF](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'The eligible modes are the approved childminder, in-home care, and certain micro-crèches. A few crèches offer extended hours, sometimes all year round.',
        ],
      },
      {
        type: 'text',
        title: 'Where to look',
        paragraphs: [
          'The CAF co-funds, locally, facilities and services dedicated to off-peak hours, but the offer varies a lot from one department to another. There is no single national counter.',
          'The good starting points are your departmental CAF and the monenfant.fr site, which lists the care options near you. A call to the CAF often uncovers little-visible schemes.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Atypical hours: early, late, night, weekend, public holidays',
          'Increased childcare benefit under conditions',
          'Eligible modes: childminder, in-home care, certain micro-crèches',
          'Local offer, varying by department',
          'Where to look: departmental CAF and monenfant.fr',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO4_FR, en: POSTS_SEO4_EN } = pairsToArrays(pairs);
