/**
 * SEO batch 1 — état civil et démarches (the long-tail searches).
 *
 * Same house rules as the rest of the corpus. Each targets a real French search query,
 * keyword front-loaded in the title, excerpt and first paragraph. All administratif, sourced
 * to service-public and ameli. Per §7.3 and the corpus rule, fees, fines and statistics that
 * change are NOT printed (the late-declaration penalty, the DGCCRF loss figures): the action
 * and the channel are stated, the amount is linked. "Gratuit" is stated because it is a
 * stable, load-bearing fact confirmed on the cited fiche.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'acte-de-naissance-copie-integrale-demander',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Acte de naissance : demander une copie intégrale ou un extrait, gratuitement',
    titleEn: 'Birth certificate: requesting a full copy or an extract, free of charge',
    excerptFr:
      'Un acte de naissance se demande gratuitement, en mairie ou en ligne. Voici comment l’obtenir, qui y a droit, et pourquoi vous ne devriez jamais payer pour ça.',
    excerptEn:
      'A birth certificate is requested free of charge, at the town hall or online. Here is how to get one, who is entitled, and why you should never pay for it.',
    readingMinutes: 4,
    heroAltFr: 'Demander un acte de naissance gratuitement',
    heroAltEn: 'Requesting a birth certificate for free',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Demander un acte de naissance revient souvent dans les démarches liées à l’arrivée d’un enfant : pour la CAF, la mutuelle, ou un dossier administratif. C’est une démarche simple, rapide, et surtout gratuite par les voies officielles.',
          'La seule chose à savoir avant de commencer, c’est quel document demander et où, pour ne pas se retrouver à payer un service qui ne coûte rien.',
        ],
      },
      {
        type: 'text',
        title: 'Où le demander',
        paragraphs: [
          'L’acte se demande à la mairie du lieu de naissance, sur place, par courrier, ou via le téléservice en ligne quand la commune le propose, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1427). Pour une naissance à l’étranger d’un ressortissant français, la demande passe par le Service central d’état civil de Nantes.',
          'Le document arrive ensuite par courrier en quelques jours. Aucune avance de frais : la délivrance est gratuite, quel que soit le type d’acte.',
        ],
      },
      {
        type: 'text',
        title: 'Qui peut en demander la copie complète',
        paragraphs: [
          'La copie intégrale et l’extrait avec filiation ne sont pas ouverts à tout le monde : ils sont réservés à la personne concernée majeure, à son représentant légal, à son conjoint ou partenaire, à ses ascendants et descendants, et à certains professionnels habilités.',
          'L’extrait sans filiation, lui, peut être obtenu par n’importe qui, sans justification. Pour la plupart de vos démarches de parent, c’est votre propre acte ou celui de votre enfant que vous demandez, ce à quoi vous avez évidemment droit.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Où : mairie du lieu de naissance, sur place, par courrier ou en ligne',
          'Naissance à l’étranger : Service central d’état civil de Nantes',
          'Coût : gratuit par les voies officielles',
          'Copie intégrale et extrait avec filiation : accès restreint aux proches et professionnels habilités',
          'Extrait sans filiation : accessible à tous, sans justification',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un acte de naissance ne se paie pas. Si un site vous demande de régler des frais pour l’obtenir, vous n’êtes pas au bon endroit.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Requesting a birth certificate comes up often in the paperwork around a child\'s arrival: for the CAF, the top-up insurer, or an administrative file. It is a simple, quick step, and above all free through the official channels.',
          'The only thing to know before you start is which document to request and where, so as not to end up paying for a service that costs nothing.',
        ],
      },
      {
        type: 'text',
        title: 'Where to request it',
        paragraphs: [
          'The certificate is requested from the town hall of the place of birth, in person, by post, or via the online service where the commune offers it, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1427). For a French national born abroad, the request goes through the Central Civil Status Service in Nantes.',
          'The document then arrives by post within a few days. Nothing to pay upfront: issuance is free, whatever the type of certificate.',
        ],
      },
      {
        type: 'text',
        title: 'Who can request the full copy',
        paragraphs: [
          'The full copy and the extract with filiation are not open to everyone: they are reserved for the person concerned if of age, their legal representative, their spouse or partner, their ascendants and descendants, and certain authorised professionals.',
          'The extract without filiation can be obtained by anyone, with no justification. For most of your steps as a parent, it is your own certificate or your child\'s that you request, which you are of course entitled to.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Where: town hall of the place of birth, in person, by post or online',
          'Birth abroad: Central Civil Status Service in Nantes',
          'Cost: free through official channels',
          'Full copy and extract with filiation: restricted to relatives and authorised professionals',
          'Extract without filiation: available to anyone, no justification',
        ],
      },
      {
        type: 'quote',
        quote:
          'A birth certificate is not paid for. If a site asks you to pay a fee to obtain one, you are in the wrong place.',
      },
    ],
  }),

  postPair({
    slug: 'numero-securite-sociale-enfant-attribution',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Numéro de sécurité sociale du bébé : quand et comment il est attribué',
    titleEn: 'Baby’s social security number: when and how it is assigned',
    excerptFr:
      'Le bébé n’a pas de carte Vitale à lui, et pourtant il est déjà couvert. Voici comment son numéro apparaît, et l’étape à ne pas oublier pour être remboursé.',
    excerptEn:
      'The baby has no health card of their own, and yet they are already covered. Here is how their number appears, and the step not to forget to be reimbursed.',
    readingMinutes: 3,
    heroAltFr: 'Le numéro de sécurité sociale du nouveau-né',
    heroAltEn: 'The newborn’s social security number',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le numéro de sécurité sociale du bébé est une source de confusion fréquente : on ne sait pas s’il en a un, comment l’obtenir, ni pourquoi les remboursements semblent bloqués les premières semaines. La réponse est plus simple qu’il n’y paraît.',
          'Un nouveau-né n’est pas un assuré à part entière : il est ayant droit de ses parents, et c’est par eux que passe sa couverture.',
        ],
      },
      {
        type: 'text',
        title: 'L’étape à ne pas oublier',
        paragraphs: [
          'Après la déclaration à la mairie, le bébé doit être déclaré à l’Assurance Maladie. Cela se fait depuis votre compte ameli, et c’est cette démarche qui rattache l’enfant à votre dossier, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/declaration-de-son-enfant).',
          'Tant qu’elle n’est pas faite, les soins du bébé peuvent ne pas se rembourser correctement. C’est l’une des rares démarches post-naissance dont l’oubli se voit vite, sur le compte en banque.',
        ],
      },
      {
        type: 'text',
        title: 'Où apparaît son numéro',
        paragraphs: [
          'Une fois l’enfant rattaché, son numéro figure sur votre attestation de droits, téléchargeable depuis le compte ameli, avant même qu’il ait une carte Vitale à son nom. C’est ce document qui prouve sa couverture.',
          'Vous pouvez rattacher l’enfant aux deux parents à la fois, ce qui simplifie les remboursements selon le parent qui l’accompagne. Le bébé apparaît alors sur les deux cartes Vitale.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Statut : le nouveau-né est ayant droit de ses parents, pas assuré à part',
          'Étape clé : déclarer l’enfant à l’Assurance Maladie via le compte ameli',
          'Son numéro : visible sur votre attestation de droits',
          'Possible : rattacher l’enfant aux deux parents à la fois',
          'À ne pas oublier : sans cette déclaration, les remboursements peuvent bloquer',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The baby\'s social security number is a common source of confusion: people are unsure whether they have one, how to get it, or why reimbursements seem stuck in the first weeks. The answer is simpler than it looks.',
          'A newborn is not a full policyholder: they are a dependant of their parents, and their cover runs through them.',
        ],
      },
      {
        type: 'text',
        title: 'The step not to forget',
        paragraphs: [
          'After the town hall declaration, the baby must be declared to the health insurance system. This is done from your ameli account, and it is this step that attaches the child to your file, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/declaration-de-son-enfant).',
          'Until it is done, the baby\'s care may not reimburse properly. It is one of the few post-birth steps whose omission shows up fast, in your bank account.',
        ],
      },
      {
        type: 'text',
        title: 'Where their number appears',
        paragraphs: [
          'Once the child is attached, their number appears on your proof-of-rights document, downloadable from the ameli account, before they even have a health card of their own. That document proves their cover.',
          'You can attach the child to both parents at once, which simplifies reimbursements depending on which parent goes along. The baby then appears on both health cards.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Status: the newborn is a dependant of their parents, not a separate policyholder',
          'Key step: declare the child to the health insurance system via the ameli account',
          'Their number: visible on your proof-of-rights document',
          'Possible: attach the child to both parents at once',
          'Not to forget: without this declaration, reimbursements can stall',
        ],
      },
    ],
  }),

  postPair({
    slug: 'nom-usage-enfant-second-nom-accoler',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Nom d’usage de l’enfant : accoler le nom de l’autre parent',
    titleEn: 'Child’s used name: adding the other parent’s name',
    excerptFr:
      'Depuis 2022, un parent peut ajouter son nom à celui de l’enfant comme nom d’usage, sans passer par un changement d’état civil. Voici ce que cela change, et ce que cela ne change pas.',
    excerptEn:
      'Since 2022, a parent can add their name to the child’s as a used name, without changing the civil register. Here is what it changes, and what it does not.',
    readingMinutes: 4,
    heroAltFr: 'Le nom d’usage de l’enfant',
    heroAltEn: 'The child’s used name',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le nom d’usage de l’enfant est une possibilité récente et encore mal connue : depuis la loi du 2 mars 2022, un parent peut accoler son propre nom à celui de l’enfant, même s’il ne le lui a pas transmis à la naissance.',
          'C’est utile quand un enfant porte le nom d’un seul parent et que l’autre souhaite que le sien apparaisse au quotidien. Encore faut-il comprendre ce que ce nom d’usage est, et n’est pas.',
        ],
      },
      {
        type: 'text',
        title: 'Un nom d’usage n’est pas le nom de famille',
        paragraphs: [
          'La distinction est essentielle : le nom d’usage ne modifie pas l’état civil de l’enfant. Son nom de famille officiel reste le même ; le nom d’usage s’ajoute seulement pour la vie courante, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F36441).',
          'On peut ajouter le nom de l’autre parent, dans la limite d’un nom de famille par parent. L’ordre des noms ne peut pas être inversé, et on ne peut pas remplacer le nom de naissance, seulement l’accoler.',
        ],
      },
      {
        type: 'text',
        title: 'Un parent peut le faire, en informant l’autre',
        paragraphs: [
          'Un parent peut demander ce nom d’usage sans l’accord de l’autre, mais il doit l’en informer au préalable et lui laisser le temps de réagir, quitte à saisir le juge aux affaires familiales. Gardez une preuve de cette information.',
          'À partir de 13 ans, l’enfant doit donner son consentement. C’est une décision qui le concerne directement, et la loi le reconnaît en lui donnant voix au chapitre.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Depuis la loi du 2 mars 2022',
          'Nom d’usage ≠ nom de famille : l’état civil reste inchangé',
          'Ajout du nom de l’autre parent, un nom par parent, sans inverser l’ordre',
          'Un parent peut le faire en informant l’autre au préalable',
          'Consentement de l’enfant requis à partir de 13 ans',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The child\'s used name is a recent and still little-known option: since the law of 2 March 2022, a parent can add their own name to the child\'s, even if they did not pass it on at birth.',
          'It helps when a child bears one parent\'s name and the other wants theirs to appear day to day. But you need to understand what this used name is, and is not.',
        ],
      },
      {
        type: 'text',
        title: 'A used name is not the family name',
        paragraphs: [
          'The distinction is essential: the used name does not change the child\'s civil status. Their official family name stays the same; the used name is only added for everyday life, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F36441).',
          'You can add the other parent\'s name, within the limit of one family name per parent. The order of names cannot be reversed, and you cannot replace the birth name, only append to it.',
        ],
      },
      {
        type: 'text',
        title: 'One parent can do it, informing the other',
        paragraphs: [
          'One parent can request this used name without the other\'s agreement, but must inform them beforehand and leave time to react, up to seizing the family court. Keep proof of that notice.',
          'From age 13, the child must consent. It is a decision that concerns them directly, and the law recognises it by giving them a say.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Since the law of 2 March 2022',
          'Used name ≠ family name: the civil register is unchanged',
          'Add the other parent\'s name, one per parent, without reversing the order',
          'One parent can do it by informing the other beforehand',
          'The child\'s consent is required from age 13',
        ],
      },
    ],
  }),

  postPair({
    slug: 'declaration-naissance-hors-delai-que-faire',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Déclaration de naissance hors délai : que faire après les 5 jours',
    titleEn: 'Late birth declaration: what to do after the 5 days',
    excerptFr:
      'La déclaration de naissance se fait dans les 5 jours. Passé ce délai, elle ne se rattrape plus au guichet : il faut un jugement du tribunal. Voici la marche à suivre.',
    excerptEn:
      'A birth is declared within 5 days. After that, it can no longer be fixed at the counter: it takes a court judgment. Here is what to do.',
    readingMinutes: 3,
    heroAltFr: 'Déclaration de naissance hors délai',
    heroAltEn: 'Late birth declaration',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La déclaration de naissance en mairie doit être faite dans les cinq jours qui suivent la naissance. C’est un délai court, et la plupart des maternités aident à ne pas le manquer. Mais quand il est dépassé, la démarche change complètement de nature.',
          'Ce n’est plus une formalité de guichet, et il vaut mieux le savoir avant de se présenter en mairie un sixième jour.',
        ],
      },
      {
        type: 'text',
        title: 'Après 5 jours, ce n’est plus la mairie qui tranche',
        paragraphs: [
          'Passé le délai, la naissance ne peut plus être enregistrée par simple déclaration. Il faut obtenir un jugement déclaratif de naissance auprès du tribunal judiciaire, avec l’assistance d’un avocat, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961).',
          'C’est le tribunal du lieu de naissance qui est compétent. Le jugement établit la naissance et ordonne sa transcription sur les registres de la commune. La procédure existe, mais elle est nettement plus lourde qu’une déclaration dans les temps.',
        ],
      },
      {
        type: 'text',
        title: 'Le délai, et ses vraies souplesses',
        paragraphs: [
          'Le jour de l’accouchement ne compte pas dans les cinq jours, et si le dernier jour tombe un samedi, un dimanche ou un jour férié, le délai est reporté au premier jour ouvrable suivant. C’est souvent ce qui sauve un dossier qui semblait en retard.',
          'La leçon pratique tient en une phrase : c’est une démarche à ne pas repousser. Le déclarer dans les temps évite une procédure judiciaire pour une simple formalité.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Délai : 5 jours, le jour de la naissance non compté',
          'Report au premier jour ouvrable si le dernier jour est un week-end ou férié',
          'Après le délai : jugement déclaratif de naissance au tribunal judiciaire',
          'Avocat nécessaire, tribunal du lieu de naissance compétent',
          'La règle d’or : déclarer dans les temps, ne pas repousser',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The town hall birth declaration must be made within five days of the birth. It is a short deadline, and most maternity units help you not to miss it. But once it is passed, the step changes nature entirely.',
          'It is no longer a counter formality, and it is better to know that before turning up at the town hall on a sixth day.',
        ],
      },
      {
        type: 'text',
        title: 'After 5 days, the town hall no longer decides',
        paragraphs: [
          'Past the deadline, the birth can no longer be registered by simple declaration. You must obtain a declaratory judgment of birth from the court, with a lawyer\'s assistance, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961).',
          'It is the court of the place of birth that has jurisdiction. The judgment establishes the birth and orders its transcription onto the commune\'s registers. The procedure exists, but it is much heavier than a declaration on time.',
        ],
      },
      {
        type: 'text',
        title: 'The deadline, and its real flexibility',
        paragraphs: [
          'The day of birth does not count in the five days, and if the last day falls on a Saturday, Sunday or public holiday, the deadline is extended to the next working day. That is often what saves a file that seemed late.',
          'The practical lesson holds in one sentence: this is a step not to put off. Declaring on time avoids a court procedure for a simple formality.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Deadline: 5 days, the day of birth not counted',
          'Extended to the next working day if the last day is a weekend or holiday',
          'After the deadline: a declaratory judgment of birth at the court',
          'A lawyer is needed, the court of the place of birth has jurisdiction',
          'The golden rule: declare on time, do not put it off',
        ],
      },
    ],
  }),

  postPair({
    slug: 'copie-integrale-ou-extrait-acte-naissance',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Copie intégrale ou extrait d’acte de naissance : quelle différence, lequel demander',
    titleEn: 'Full copy or extract of a birth certificate: the difference, and which to request',
    excerptFr:
      'Trois documents portent presque le même nom et ne disent pas la même chose. Demander le mauvais fait recommencer la démarche. Voici lequel choisir selon le besoin.',
    excerptEn:
      'Three documents share almost the same name and do not say the same thing. Requesting the wrong one means starting over. Here is which to choose for which need.',
    readingMinutes: 3,
    heroAltFr: 'Copie intégrale ou extrait d’acte de naissance',
    heroAltEn: 'Full copy or extract of a birth certificate',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Copie intégrale, extrait avec filiation, extrait sans filiation : les trois existent, portent presque le même nom, et ne contiennent pas la même chose. Demander le mauvais document oblige souvent à refaire la démarche.',
          'La bonne nouvelle, c’est que le choix est simple une fois qu’on sait ce que chacun contient, et tous les trois sont gratuits.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que contient chaque document',
        paragraphs: [
          'La copie intégrale reproduit tout l’acte : les informations sur la personne, sur ses parents, et les mentions en marge comme un mariage, un PACS ou un divorce. L’extrait avec filiation reprend les données essentielles de naissance et les informations sur les parents, sans reproduire l’acte entier.',
          'L’extrait sans filiation, enfin, ne comporte que les données essentielles de naissance, sans aucune information sur les parents. C’est le plus léger des trois, et le plus largement accessible, comme le détaille [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1427).',
        ],
      },
      {
        type: 'text',
        title: 'Lequel demander, et qui y a droit',
        paragraphs: [
          'La copie intégrale et l’extrait avec filiation sont réservés à la personne concernée, à son représentant légal, à son conjoint, à ses ascendants et descendants, et à certains professionnels. L’extrait sans filiation s’obtient par n’importe qui.',
          'En pratique, la plupart des démarches administratives précisent le document attendu. En cas de doute pour un dossier de filiation ou de nationalité, c’est en général la copie intégrale qui est demandée.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Copie intégrale : tout l’acte, parents et mentions marginales comprises',
          'Extrait avec filiation : données de naissance et informations sur les parents',
          'Extrait sans filiation : données de naissance seules, accessible à tous',
          'Copie intégrale et extrait avec filiation : accès restreint aux proches et professionnels',
          'Les trois sont gratuits',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Full copy, extract with filiation, extract without filiation: all three exist, share almost the same name, and do not contain the same thing. Requesting the wrong document often means redoing the step.',
          'The good news is that the choice is simple once you know what each contains, and all three are free.',
        ],
      },
      {
        type: 'text',
        title: 'What each document contains',
        paragraphs: [
          'The full copy reproduces the entire act: information on the person, on their parents, and the marginal notes such as a marriage, a civil partnership or a divorce. The extract with filiation gives the essential birth data and information on the parents, without reproducing the whole act.',
          'The extract without filiation contains only the essential birth data, with no information on the parents. It is the lightest of the three, and the most widely accessible, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F1427) details.',
        ],
      },
      {
        type: 'text',
        title: 'Which to request, and who is entitled',
        paragraphs: [
          'The full copy and the extract with filiation are reserved for the person concerned, their legal representative, their spouse, their ascendants and descendants, and certain professionals. The extract without filiation can be obtained by anyone.',
          'In practice, most administrative steps specify the expected document. When in doubt for a filiation or nationality file, it is generally the full copy that is requested.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Full copy: the whole act, parents and marginal notes included',
          'Extract with filiation: birth data and information on the parents',
          'Extract without filiation: birth data only, available to anyone',
          'Full copy and extract with filiation: restricted to relatives and professionals',
          'All three are free',
        ],
      },
    ],
  }),

  postPair({
    slug: 'livret-famille-perdu-demander-duplicata',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Livret de famille perdu : demander un duplicata, gratuitement',
    titleEn: 'Lost family record book: requesting a free duplicate',
    excerptFr:
      'Un livret de famille perdu, volé ou abîmé se remplace, et cela ne coûte rien. Voici où le demander et qui peut le faire.',
    excerptEn:
      'A lost, stolen or damaged family record book can be replaced, and it costs nothing. Here is where to request it and who can.',
    readingMinutes: 3,
    heroAltFr: 'Demander un duplicata de livret de famille',
    heroAltEn: 'Requesting a duplicate family record book',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Perdre son livret de famille inquiète souvent plus que nécessaire. C’est un document utile, mais il se remplace, et le duplicata est gratuit. Il n’y a donc pas de situation bloquée pour un livret égaré.',
          'La démarche est simple, à condition de savoir où s’adresser et ce que l’on peut vous demander en échange.',
        ],
      },
      {
        type: 'text',
        title: 'Où et comment',
        paragraphs: [
          'La demande d’un second livret de famille se fait à la mairie de votre domicile, ou de la commune de naissance des enfants, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11994). Elle émane d’un titulaire du livret, c’est-à-dire des parents.',
          'On peut vous demander des justificatifs pour le reconstituer : un justificatif de domicile et les informations d’état civil de la famille, noms, dates et lieux de naissance. Le duplicata reprend alors l’ensemble des actes déjà inscrits.',
        ],
      },
      {
        type: 'text',
        title: 'Faut-il déclarer la perte',
        paragraphs: [
          'Déclarer la perte ou le vol à la police ou à la gendarmerie n’est pas obligatoire, mais c’est recommandé pour se prémunir contre un usage frauduleux. C’est une précaution utile, pas une condition pour obtenir le duplicata.',
          'Profitez de la démarche pour vérifier que le livret est à jour de tous les événements récents, car un duplicata reconstitué à partir de vos actes en est l’occasion naturelle.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Coût : gratuit',
          'Où : mairie du domicile ou de la commune de naissance des enfants',
          'Qui : un titulaire du livret, c’est-à-dire un parent',
          'Justificatifs possibles : domicile et informations d’état civil de la famille',
          'Déclaration de perte à la police : recommandée, non obligatoire',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Losing your family record book often worries people more than it needs to. It is a useful document, but it can be replaced, and the duplicate is free. So there is no dead end for a mislaid book.',
          'The step is simple, provided you know where to go and what you may be asked for in return.',
        ],
      },
      {
        type: 'text',
        title: 'Where and how',
        paragraphs: [
          'The request for a second family record book is made at the town hall of your residence, or of the children\'s commune of birth, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F11994). It comes from a holder of the book, meaning the parents.',
          'You may be asked for documents to reconstitute it: proof of residence and the family\'s civil-status information, names, dates and places of birth. The duplicate then reproduces all the acts already recorded.',
        ],
      },
      {
        type: 'text',
        title: 'Do you need to report the loss',
        paragraphs: [
          'Reporting the loss or theft to the police is not mandatory, but it is recommended to guard against fraudulent use. It is a useful precaution, not a condition for getting the duplicate.',
          'Take the opportunity to check the book is up to date with all recent events, since a duplicate rebuilt from your acts is the natural moment for it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Cost: free',
          'Where: town hall of your residence or the children\'s commune of birth',
          'Who: a holder of the book, meaning a parent',
          'Possible documents: proof of residence and family civil-status details',
          'Reporting the loss to the police: recommended, not mandatory',
        ],
      },
    ],
  }),

  postPair({
    slug: 'enfant-ne-etranger-transcription-acte-naissance',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Enfant né à l’étranger : transcrire l’acte de naissance sur les registres français',
    titleEn: 'Child born abroad: transcribing the birth certificate onto French registers',
    excerptFr:
      'Un enfant né à l’étranger d’un parent français peut voir sa naissance transcrite en France. Ce n’est pas obligatoire, mais c’est ce qui lui donne un acte de naissance français.',
    excerptEn:
      'A child born abroad to a French parent can have their birth transcribed in France. It is not mandatory, but it is what gives them a French birth certificate.',
    readingMinutes: 3,
    heroAltFr: 'Transcrire l’acte de naissance d’un enfant né à l’étranger',
    heroAltEn: 'Transcribing the birth certificate of a child born abroad',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Quand un enfant naît à l’étranger d’un parent français, sa naissance est d’abord enregistrée dans le pays de naissance. Pour qu’elle existe aussi dans les registres français, il faut une démarche de transcription, souvent méconnue des jeunes parents expatriés.',
          'Elle n’est pas obligatoire, mais elle change beaucoup de choses au quotidien administratif de l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'À quoi sert la transcription',
        paragraphs: [
          'La transcription inscrit la naissance sur les registres français et permet à l’enfant d’obtenir un acte de naissance français, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/R1405). Elle suppose qu’au moins un parent soit français.',
          'C’est ce qui simplifie ensuite toutes les démarches en France : pièce d’identité, inscription, dossiers administratifs. Sans acte français, chaque démarche repart de l’acte étranger, avec traductions et délais.',
        ],
      },
      {
        type: 'text',
        title: 'Comment la faire',
        paragraphs: [
          'La demande passe par le consulat compétent ou par le Service central d’état civil de Nantes, qui gère l’état civil des Français nés à l’étranger. Elle se fait par courrier, avec les pièces demandées par le poste consulaire.',
          'La transcription n’a pas de date limite : on peut la faire longtemps après la naissance. Une fois réalisée, les copies et extraits s’obtiennent gratuitement, comme pour toute naissance en France.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Condition : au moins un parent français',
          'Effet : la naissance figure sur les registres français, acte de naissance français délivré',
          'Où : consulat compétent ou Service central d’état civil de Nantes',
          'Comment : par courrier, avec les pièces demandées',
          'Pas de date limite, mais fortement utile pour les démarches en France',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'When a child is born abroad to a French parent, their birth is first registered in the country of birth. For it to also exist in the French registers, a transcription step is needed, often unknown to young expatriate parents.',
          'It is not mandatory, but it changes a lot in the child\'s administrative daily life.',
        ],
      },
      {
        type: 'text',
        title: 'What transcription is for',
        paragraphs: [
          'Transcription records the birth on the French registers and lets the child obtain a French birth certificate, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/R1405). It requires at least one French parent.',
          'It then simplifies every step in France: ID, enrolment, administrative files. Without a French certificate, each step starts again from the foreign one, with translations and delays.',
        ],
      },
      {
        type: 'text',
        title: 'How to do it',
        paragraphs: [
          'The request goes through the competent consulate or the Central Civil Status Service in Nantes, which manages the civil status of French nationals born abroad. It is done by post, with the documents requested by the consular post.',
          'Transcription has no deadline: it can be done long after the birth. Once done, copies and extracts are obtained free of charge, as for any birth in France.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Condition: at least one French parent',
          'Effect: the birth appears on French registers, a French certificate is issued',
          'Where: the competent consulate or the Central Civil Status Service in Nantes',
          'How: by post, with the requested documents',
          'No deadline, but strongly useful for steps in France',
        ],
      },
    ],
  }),

  postPair({
    slug: 'reconnaissance-conjointe-anticipee-pma',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Reconnaissance conjointe anticipée : couple de femmes et PMA',
    titleEn: 'Advance joint recognition: female couples and assisted reproduction',
    excerptFr:
      'Depuis la loi de 2021, un couple de femmes ayant recours à une PMA établit la filiation par une reconnaissance conjointe anticipée, signée devant notaire. Voici comment elle fonctionne.',
    excerptEn:
      'Since the 2021 law, a female couple using assisted reproduction establishes filiation through an advance joint recognition, signed before a notary. Here is how it works.',
    readingMinutes: 3,
    heroAltFr: 'La reconnaissance conjointe anticipée pour un couple de femmes',
    heroAltEn: 'Advance joint recognition for a female couple',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Pour un couple de femmes ayant recours à une PMA, l’établissement de la filiation suit un chemin propre, prévu par la loi de bioéthique du 2 août 2021. Le connaître avant la conception évite bien des complications administratives ensuite.',
          'Le mécanisme central s’appelle la reconnaissance conjointe anticipée, et il se prépare tôt, avant même la grossesse.',
        ],
      },
      {
        type: 'text',
        title: 'Une signature devant notaire, avant la conception',
        paragraphs: [
          'La reconnaissance conjointe anticipée se signe devant notaire, en même temps que le consentement au don, donc avant la PMA, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F35858). C’est ce document qui prépare la filiation à l’égard des deux mères.',
          'Il est établi une fois, en amont, et conservé jusqu’à la naissance. C’est une étape à intégrer au parcours dès le départ, au même titre que les démarches médicales.',
        ],
      },
      {
        type: 'text',
        title: 'Remise à la naissance',
        paragraphs: [
          'À la naissance, la reconnaissance conjointe est remise à l’officier d’état civil au moment de la déclaration de naissance. C’est cette remise qui établit la filiation à l’égard des deux mères, de façon sécurisée.',
          'La filiation ainsi établie est stable pour les deux parents. Le point à retenir, c’est l’ordre des choses : le document se prépare avant la PMA, il ne s’improvise pas à la maternité.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Cadre : loi de bioéthique du 2 août 2021',
          'Document : reconnaissance conjointe anticipée, signée devant notaire',
          'Quand : avant la PMA, avec le consentement au don',
          'À la naissance : remise à l’officier d’état civil lors de la déclaration',
          'Effet : filiation établie à l’égard des deux mères',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'For a female couple using assisted reproduction, establishing filiation follows its own path, set out by the bioethics law of 2 August 2021. Knowing it before conception avoids much administrative trouble later.',
          'The central mechanism is called advance joint recognition, and it is prepared early, before the pregnancy even.',
        ],
      },
      {
        type: 'text',
        title: 'A signature before a notary, before conception',
        paragraphs: [
          'The advance joint recognition is signed before a notary, at the same time as the consent to the donation, so before the procedure, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F35858). This document prepares filiation as to both mothers.',
          'It is drawn up once, in advance, and kept until the birth. It is a step to build into the pathway from the start, alongside the medical steps.',
        ],
      },
      {
        type: 'text',
        title: 'Handed over at the birth',
        paragraphs: [
          'At the birth, the joint recognition is handed to the civil registrar at the moment of the birth declaration. It is this handover that establishes filiation as to both mothers, securely.',
          'The filiation so established is stable for both parents. The point to remember is the order of things: the document is prepared before the procedure, it is not improvised at the maternity unit.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Framework: the bioethics law of 2 August 2021',
          'Document: advance joint recognition, signed before a notary',
          'When: before the procedure, with the consent to the donation',
          'At the birth: handed to the civil registrar at the declaration',
          'Effect: filiation established as to both mothers',
        ],
      },
    ],
  }),

  postPair({
    slug: 'acte-naissance-eviter-sites-payants',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Acte de naissance gratuit : éviter les sites payants qui imitent l’administration',
    titleEn: 'Free birth certificate: avoiding the paid sites that mimic the administration',
    excerptFr:
      'Beaucoup de sites font payer une démarche qui est gratuite. Ils imitent les sites officiels et remontent dans les recherches. Voici comment les reconnaître et passer par le bon canal.',
    excerptEn:
      'Many sites charge for a step that is free. They mimic official sites and rank high in searches. Here is how to spot them and use the right channel.',
    readingMinutes: 3,
    heroAltFr: 'Éviter les sites payants pour un acte de naissance',
    heroAltEn: 'Avoiding paid sites for a birth certificate',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Chercher « acte de naissance » sur un moteur de recherche mène souvent, en premiers résultats, à des sites privés qui facturent la démarche. Or obtenir un acte de naissance est gratuit. Ces sites vendent un service qui ne devrait rien coûter.',
          'Le piège est d’autant plus efficace qu’il vise des gens pressés, en pleine série de démarches administratives autour d’une naissance.',
        ],
      },
      {
        type: 'text',
        title: 'Comment les reconnaître',
        paragraphs: [
          'Ces sites imitent les codes de l’administration, bleu blanc rouge, références à des ministères, et se placent en tête des recherches grâce à la publicité, prévient la [DGCCRF](https://www.economie.gouv.fr/dgccrf/faux-sites-administratifs-attention-aux-arnaques). Le signal le plus fiable reste le paiement demandé : une démarche d’état civil de base est gratuite.',
          'Le point d’entrée officiel des démarches en ligne est service-public.fr, et la mairie reste toujours une voie directe et gratuite.',
        ],
      },
      {
        type: 'text',
        title: 'Le bon réflexe',
        paragraphs: [
          'Passez par service-public.fr ou par la mairie du lieu de naissance, jamais par un intermédiaire qui facture. Si un site vous demande de payer pour un acte de naissance, fermez l’onglet.',
          'Un site suspect peut être signalé sur SignalConso, le service de la répression des fraudes. C’est utile pour les parents qui chercheront la même chose après vous.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Un acte de naissance est gratuit par les voies officielles',
          'Signal d’alerte : un site qui fait payer la démarche',
          'Les faux sites imitent l’administration et remontent par la publicité',
          'Le bon canal : service-public.fr ou la mairie du lieu de naissance',
          'Signaler un site abusif : SignalConso',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Searching "birth certificate" on a search engine often leads, in the top results, to private sites that charge for the step. Yet obtaining a birth certificate is free. These sites sell a service that should cost nothing.',
          'The trap is all the more effective because it targets people in a hurry, in the middle of a run of paperwork around a birth.',
        ],
      },
      {
        type: 'text',
        title: 'How to spot them',
        paragraphs: [
          'These sites mimic the codes of the administration, the tricolour, references to ministries, and place themselves at the top of searches through advertising, warns the [DGCCRF](https://www.economie.gouv.fr/dgccrf/faux-sites-administratifs-attention-aux-arnaques). The most reliable signal is the payment requested: a basic civil-status step is free.',
          'The official entry point for online steps is service-public.fr, and the town hall is always a direct, free route.',
        ],
      },
      {
        type: 'text',
        title: 'The right reflex',
        paragraphs: [
          'Go through service-public.fr or the town hall of the place of birth, never through an intermediary that charges. If a site asks you to pay for a birth certificate, close the tab.',
          'A suspicious site can be reported on SignalConso, the fraud-prevention service. It helps the parents who will search for the same thing after you.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A birth certificate is free through official channels',
          'Warning sign: a site that charges for the step',
          'Fake sites mimic the administration and rise through advertising',
          'The right channel: service-public.fr or the town hall of the place of birth',
          'Report an abusive site: SignalConso',
        ],
      },
    ],
  }),

  postPair({
    slug: 'changer-prenom-enfant-apres-naissance',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Changer le prénom de l’enfant après la naissance : la procédure en mairie',
    titleEn: 'Changing the child’s first name after birth: the town hall procedure',
    excerptFr:
      'Le prénom inscrit à la naissance peut être changé, mais pas sur simple envie : il faut un intérêt légitime. Voici où se fait la demande et comment elle est examinée.',
    excerptEn:
      'The first name recorded at birth can be changed, but not on a whim: it takes a legitimate interest. Here is where the request is made and how it is examined.',
    readingMinutes: 3,
    heroAltFr: 'Changer le prénom de l’enfant après la naissance',
    heroAltEn: 'Changing the child’s first name after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Un prénom choisi à la naissance n’est pas définitif à tout jamais. Il peut être changé plus tard, mais la procédure n’est pas une simple correction : elle suppose un motif, et un examen.',
          'Savoir comment elle fonctionne évite deux erreurs : croire que c’est impossible, ou croire que cela se fait sur simple demande.',
        ],
      },
      {
        type: 'text',
        title: 'Où et à quelles conditions',
        paragraphs: [
          'La demande de changement de prénom se fait à la mairie du domicile ou du lieu de naissance, avec des justificatifs, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F885). Elle doit reposer sur un intérêt légitime et ne pas être contraire à l’intérêt de l’enfant.',
          'L’usage prolongé d’un autre prénom, par exemple, peut constituer un intérêt légitime. Pour un enfant, la demande est portée par les représentants légaux, et à partir de 13 ans son consentement est requis.',
        ],
      },
      {
        type: 'text',
        title: 'Comment la demande est examinée',
        paragraphs: [
          'C’est l’officier d’état civil qui instruit la demande. S’il estime que l’intérêt légitime n’est pas établi, il ne refuse pas seul : il transmet le dossier au procureur de la République, qui accepte ou s’oppose.',
          'En cas de refus, un recours est possible devant le juge aux affaires familiales. La procédure est encadrée, mais elle existe pour de vraies raisons, pas pour de simples préférences passagères.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Où : mairie du domicile ou du lieu de naissance',
          'Condition : un intérêt légitime, non contraire à l’intérêt de l’enfant',
          'Pour un enfant : demande des représentants légaux, consentement dès 13 ans',
          'Instruction : officier d’état civil, transmission au procureur en cas de doute',
          'Refus : recours devant le juge aux affaires familiales',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A first name chosen at birth is not fixed forever. It can be changed later, but the procedure is not a simple correction: it requires a reason, and an examination.',
          'Knowing how it works avoids two mistakes: believing it is impossible, or believing it happens on simple request.',
        ],
      },
      {
        type: 'text',
        title: 'Where and on what conditions',
        paragraphs: [
          'The request to change a first name is made at the town hall of the residence or the place of birth, with supporting documents, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F885). It must rest on a legitimate interest and not be contrary to the child\'s interest.',
          'Prolonged use of another first name, for instance, can constitute a legitimate interest. For a child, the request is brought by the legal representatives, and from age 13 their consent is required.',
        ],
      },
      {
        type: 'text',
        title: 'How the request is examined',
        paragraphs: [
          'It is the civil registrar who handles the request. If they consider the legitimate interest is not established, they do not refuse alone: they pass the file to the public prosecutor, who accepts or objects.',
          'In case of refusal, an appeal lies to the family court. The procedure is framed, but it exists for real reasons, not for passing preferences.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Where: town hall of the residence or the place of birth',
          'Condition: a legitimate interest, not contrary to the child\'s interest',
          'For a child: request by the legal representatives, consent from age 13',
          'Handling: civil registrar, referral to the prosecutor in case of doubt',
          'Refusal: appeal to the family court',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO1_FR, en: POSTS_SEO1_EN } = pairsToArrays(pairs);
