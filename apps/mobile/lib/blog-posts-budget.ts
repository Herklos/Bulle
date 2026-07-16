/**
 * Budget: the money questions nobody in the preparation space answers plainly.
 *
 * Same content rule as the admin tier (§7.3): euro amounts and SMIC-indexed thresholds are
 * revalorised, usually every April, so they are never stated here. We describe the
 * MECHANISM and the TIMING, which are stable, and link to the official source for the
 * current figure. Any figure that IS cited (the cost article) comes from a dated,
 * named, official or reputable source, flagged as indicative, never invented.
 *
 * Preparation only, never care (§7.3): this tier stays inside budgeting, entitlements and
 * paperwork mechanics. No personalised financial advice, no numbers we cannot keep correct.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'baisse-revenu-conge-maternite',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Congé maternité : ce qui arrive vraiment à votre revenu',
    titleEn: 'Maternity leave and your income: what actually changes',
    excerptFr:
      'Les indemnités journalières ne reproduisent pas votre salaire net habituel. Voici comment elles sont calculées, et l’écart qu’on ne voit pas venir.',
    excerptEn:
      'Daily allowances do not mirror your usual take-home pay. Here is how they are actually calculated, and the gap nobody sees coming.',
    readingMinutes: 5,
    heroAltFr: 'Revenu pendant le congé maternité',
    heroAltEn: 'Income during maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Pendant le congé maternité, le salaire ne continue pas tout seul. Il est remplacé par les indemnités journalières (IJ), versées par l’Assurance Maladie et non par l’employeur. Beaucoup de salariées ne s’en rendent compte qu’au premier virement, en découvrant un montant plus bas que ce qu’elles imaginaient.',
          'Ce n’est pas une erreur de calcul, ni un incident isolé. C’est le mécanisme lui-même, et il vaut mieux le comprendre avant le congé qu’au moment de faire les comptes.',
        ],
      },
      {
        type: 'text',
        title: 'Comment l’IJ est calculée',
        paragraphs: [
          'L’indemnité journalière se base sur la moyenne de vos salaires bruts des 3 mois précédant le début du congé (12 mois en cas d’activité saisonnière ou discontinue). Deux détails changent tout dans ce calcul.',
          'D’abord, il se fait sur le brut, pas sur le net que vous touchez d’habitude. Ensuite, les salaires retenus sont plafonnés au plafond mensuel de la sécurité sociale avant d’être moyennés : la part de rémunération au-dessus de ce plafond ne compte tout simplement pas dans le calcul. [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee) détaille la méthode.',
        ],
      },
      {
        type: 'text',
        title: 'Une deuxième réduction, une fois le calcul fait',
        paragraphs: [
          'Un abattement forfaitaire de 21 %, correspondant à la part salariale des cotisations sociales et à la CSG-CRDS, est déduit avant le versement de l’IJ.',
          'Autrement dit, l’IJ que vous recevez a déjà été réduite deux fois : une première fois par le plafonnement du calcul, une seconde fois par cet abattement. Le montant qui arrive sur votre compte est donc plus loin de votre salaire habituel que ne le laisse penser le premier calcul.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui ouvre le droit à l’IJ',
        items: [
          'Justifier de 6 mois d’affiliation à l’Assurance Maladie à la date prévue de l’accouchement',
          'Et avoir travaillé au moins 150 heures dans les 3 mois qui précèdent le début du congé',
          'Ou, pour une activité saisonnière ou discontinue, 600 heures dans les 12 mois précédents',
          'Ou avoir cotisé sur un salaire au moins égal à 1 015 fois le montant du Smic horaire sur les 6 derniers mois',
          'Ou 2 030 fois le Smic horaire sur les 12 derniers mois',
        ],
      },
      {
        type: 'text',
        title: 'L’écart que personne n’annonce',
        paragraphs: [
          'Pour un salaire proche ou au-dessus du plafond de la sécurité sociale, l’écart entre le revenu habituel et l’IJ perçue peut être net, précisément parce que la part au-dessus du plafond disparaît du calcul. Ajoutez l’abattement de 21 %, et le revenu pendant le congé se retrouve presque toujours en dessous du salaire net habituel, y compris pour un salaire modeste.',
          'C’est un mécanisme structurel, pas un incident ponctuel ni une erreur de votre caisse. Le savoir à l’avance change la façon dont on prépare le budget des mois qui viennent.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Le mécanisme de calcul est stable, mais les seuils et les montants sont révisés chaque année. Faites votre propre simulation sur le simulateur officiel [ameli.fr](https://www.ameli.fr/assure/simulateur-maternite-paternite) plutôt que de vous fier à un chiffre lu ailleurs.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'During maternity leave, your salary does not simply keep coming. It is replaced by daily allowances (indemnités journalières, or IJ), paid by the French health insurance fund, not by your employer. Many employees only discover this at the first payment, when the amount turns out lower than expected.',
          'This is not a calculation error or a one-off glitch. It is the mechanism itself, and it is worth understanding before the leave starts, not once you are already doing the sums.',
        ],
      },
      {
        type: 'text',
        title: 'How the daily allowance is calculated',
        paragraphs: [
          'The IJ is based on the average of your gross salaries over the 3 months before the leave starts (12 months for seasonal or discontinuous work). Two details change everything in this calculation.',
          'First, it is based on gross pay, not the net amount you usually receive. Second, the salaries used are capped at the monthly social security ceiling before being averaged: any pay above that ceiling simply does not count toward the calculation at all. [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee) sets out the method.',
        ],
      },
      {
        type: 'text',
        title: 'A second reduction, after the calculation',
        paragraphs: [
          'A flat 21% deduction, covering the employee share of social contributions plus the CSG-CRDS levies, is taken off before the IJ is paid out.',
          'In other words, the IJ you actually receive has already been reduced twice: once by the cap applied to the calculation, and again by this deduction. What lands in your account sits further from your usual salary than the first calculation suggests.',
        ],
      },
      {
        type: 'list',
        title: 'What opens entitlement to the IJ',
        items: [
          'Being affiliated with the health insurance system for at least 6 months at the expected due date',
          'And having worked at least 150 hours in the 3 months before the leave starts',
          'Or, for seasonal or discontinuous work, 600 hours over the 12 months before',
          'Or having contributions on earnings at least equal to 1,015 times the hourly minimum wage over the last 6 months',
          'Or 2,030 times the hourly minimum wage over the last 12 months',
        ],
      },
      {
        type: 'text',
        title: 'The gap nobody announces',
        paragraphs: [
          'For a salary close to or above the social security ceiling, the gap between your usual income and the IJ you receive can be significant, precisely because the portion above the ceiling drops out of the calculation entirely. Add the 21% deduction, and income during leave sits below your usual net pay almost every time, even for a modest salary.',
          'This is a structural mechanism, not a one-off incident or a mistake by your fund. Knowing it ahead of time changes how you plan the months to come.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'The calculation mechanism is stable, but the thresholds and amounts are revised every year. Run your own estimate on the official [ameli.fr simulator](https://www.ameli.fr/assure/simulateur-maternite-paternite) rather than trusting a figure you read somewhere else.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'maintien-salaire-convention-collective',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Maintien de salaire pendant le congé maternité : ce que dit vraiment la loi',
    titleEn: 'Salary top-up during maternity leave: what the law actually says',
    excerptFr:
      'Le Code du travail n’oblige à rien. Le maintien de salaire vient d’ailleurs, et vous pouvez vérifier vous-même si vous y avez droit.',
    excerptEn:
      'The Code du travail does not require it. Salary top-up comes from somewhere else, and you can check yourself whether you are covered.',
    readingMinutes: 5,
    heroAltFr: 'Maintien de salaire et convention collective',
    heroAltEn: 'Salary top-up and collective agreements',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'On suppose souvent qu’un employeur maintient automatiquement le salaire pendant le congé maternité. Ce n’est pas ce que dit la loi. Pendant le congé, le contrat de travail est suspendu, et le revenu vient des indemnités journalières (IJ) versées par l’Assurance Maladie, pas d’un maintien de salaire par l’employeur.',
          'Le [Code du travail numérique](https://code.travail.gouv.fr/contribution/1351-quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite) le confirme directement : il n’existe pas d’obligation légale générale de maintenir le salaire pendant un congé maternité.',
        ],
      },
      {
        type: 'text',
        title: 'D’où vient le maintien de salaire, quand il existe',
        paragraphs: [
          'Quand un maintien de salaire existe, à 100 % ou en complément partiel, il vient de la convention collective de votre branche, d’un accord d’entreprise, ou parfois d’un simple usage propre à l’entreprise.',
          'Ce n’est jamais automatique et jamais universel. Deux salariées du même secteur, mais dans des entreprises différentes, peuvent se retrouver dans des situations très différentes selon l’accord qui s’applique chez chacune.',
        ],
      },
      {
        type: 'text',
        title: 'Si le maintien est à 100 %, ou en dessous',
        paragraphs: [
          'Si votre convention prévoit un maintien à 100 %, l’IJ et le complément de l’employeur ne s’additionnent pas : l’employeur verse la différence pour atteindre 100 % de votre salaire, pas 100 % en plus de l’IJ.',
          'Si le maintien prévu est inférieur à 100 %, la part manquante reste couverte par l’IJ elle-même. Comprendre ce détail à l’avance évite une mauvaise surprise à la lecture du premier bulletin de paie du congé.',
        ],
      },
      {
        type: 'text',
        title: 'La subrogation, en clair',
        paragraphs: [
          'Quand l’employeur pratique la subrogation, il continue de vous verser votre salaire habituel (ou le montant convenu) pendant le congé, et c’est lui qui reçoit directement l’IJ de l’Assurance Maladie à votre place.',
          'Sans subrogation, c’est vous qui recevez l’IJ directement, et l’employeur vous verse séparément son éventuel complément. La subrogation ne change pas ce que vous touchez au total : elle change qui reçoit l’IJ, et sous quelle forme l’ensemble arrive sur votre compte.',
        ],
      },
      {
        type: 'list',
        title: 'Comment vérifier votre propre situation',
        items: [
          'Repérez le nom de la convention collective sur votre bulletin de paie, c’est une mention obligatoire',
          'Cherchez son texte et sa clause maternité via l’outil officiel [Code du travail numérique](https://code.travail.gouv.fr/outils/convention-collective)',
          'Demandez une confirmation écrite au service RH si le texte reste ambigu',
          'Ne partez jamais du principe que le maintien est automatique, même s’il l’était dans un poste précédent',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Les règles de calcul de l’indemnité journalière elle-même, et les conditions pour en bénéficier, sont détaillées sur [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'It is often assumed that an employer automatically tops up salary during maternity leave. That is not what the law says. During the leave, the employment contract is suspended, and income comes from daily allowances (IJ) paid by the health insurance fund, not from an employer-paid top-up.',
          'The [Code du travail numérique](https://code.travail.gouv.fr/contribution/1351-quelles-sont-les-conditions-dindemnisation-pendant-le-conge-de-maternite) confirms this directly: there is no general legal obligation to maintain salary during maternity leave.',
        ],
      },
      {
        type: 'text',
        title: 'Where salary top-up comes from, when it exists',
        paragraphs: [
          'When a salary top-up does exist, whether to 100% or as a partial complement, it comes from your sector-wide collective agreement, a company-level agreement, or sometimes just a practice specific to that employer.',
          'It is never automatic and never universal. Two employees in the same sector but different companies can find themselves in very different situations depending on which agreement applies where they work.',
        ],
      },
      {
        type: 'text',
        title: 'If the top-up is to 100%, or below',
        paragraphs: [
          'If your agreement provides a 100% top-up, the IJ and the employer complement are not added together: the employer pays the difference needed to reach 100% of your salary, not 100% on top of the IJ.',
          'If the agreed top-up is below 100%, the remaining gap is still covered by the IJ itself. Understanding this ahead of time avoids a bad surprise when the first payslip of the leave arrives.',
        ],
      },
      {
        type: 'text',
        title: 'Subrogation, plainly',
        paragraphs: [
          'When an employer uses subrogation, they keep paying your usual salary (or the agreed amount) during the leave, and they are the ones who receive the IJ directly from the health insurance fund in your place.',
          'Without subrogation, you receive the IJ directly, and the employer pays any top-up separately. Subrogation does not change the total amount you receive. It changes who receives the IJ, and in what form the whole thing reaches your account.',
        ],
      },
      {
        type: 'list',
        title: 'How to check your own situation',
        items: [
          'Find the name of your collective agreement on your payslip, it is a mandatory mention',
          'Look up its text and maternity clause through the official [Code du travail numérique tool](https://code.travail.gouv.fr/outils/convention-collective)',
          'Ask HR for written confirmation if the wording stays unclear',
          'Never assume the top-up is automatic, even if it was at a previous job',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'The calculation rules for the daily allowance itself, and the conditions to qualify, are detailed on [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/indemnites-journalieres-et-prestations-maternite-paternite-adoption/conge-maternite-salariee).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'cout-reel-premiere-annee-bebe',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Le vrai coût de la première année de bébé',
    titleEn: 'The real cost of a baby’s first year',
    excerptFr:
      'Pas un chiffre magique, mais les postes qui pèsent vraiment, et ceux qu’on peut sauter sans culpabiliser.',
    excerptEn:
      'Not a magic number, but the categories that actually weigh on the budget, and the ones you can skip without guilt.',
    readingMinutes: 6,
    heroAltFr: 'Budget de la première année de bébé',
    heroAltEn: 'Budgeting for a baby’s first year',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Il n’existe pas de « coût d’un bébé » universel : cela dépend trop du mode de garde choisi, de la ville, et de ce que vous possédez déjà. Ce qui est plus utile qu’un chiffre unique, c’est de comprendre la structure des dépenses : ce qui se paie une fois, avant la naissance, et ce qui se paie chaque mois, pendant des années.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui se paie une fois',
        paragraphs: [
          'Équipement (poussette, lit, siège auto), layette, petit mobilier : ces achats se concentrent avant et juste après la naissance. Une bonne partie peut venir de la seconde main sans rien perdre en sécurité, à condition de vérifier les normes en vigueur, en particulier pour le siège auto et le couchage.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui se paie chaque mois, et pour longtemps',
        paragraphs: [
          'Alimentation, santé, couches, et surtout le mode de garde si vous reprenez le travail : ce sont les postes récurrents. Selon le [rapport du Haut Conseil de la famille, de l’enfance et de l’âge sur le coût de l’enfant](https://hcfea.gouv.fr/le-cout-de-lenfant-hcf-0) (décembre 2025), la garde figure parmi les postes de dépense les plus lourds pour un enfant de moins de 3 ans, aux côtés du logement et de l’alimentation.',
          'C’est une donnée indicative, à mettre en regard de votre propre situation et de vos propres choix, mais elle confirme une intuition simple : le poste qui pèse le plus longtemps n’est presque jamais celui qu’on imagine en préparant la valise de maternité.',
        ],
      },
      {
        type: 'text',
        title: 'Le piège du tout-neuf',
        paragraphs: [
          'Beaucoup de futurs parents achètent, avant la naissance, des objets qu’ils utiliseront à peine : une baignoire bébé dédiée, alors qu’une bassine suffit les premières semaines, un chauffe-biberon, plusieurs tenues en taille naissance qui ne seront portées que quelques jours, ou une table à langer complète quand un matelas à langer posé sur un meuble existant fait le même travail.',
          'Rien de tout cela n’est interdit, mais rien n’est non plus indispensable. Le seul repère qui compte vraiment reste la sécurité : un siège auto certifié et correctement installé, un couchage conforme aux recommandations en vigueur, sans tour de lit ni coussin dans le berceau.',
        ],
      },
      {
        type: 'text',
        title: 'Avant d’acheter, vérifiez les aides',
        paragraphs: [
          'Une partie de ces dépenses est allégée par des aides : prime à la naissance, allocation de base, complément de libre choix du mode de garde selon l’option retenue. Elles ne changent pas le prix affiché en magasin, mais elles changent ce qui reste réellement à votre charge, et cela vaut la peine de le savoir avant de faire les comptes, pas après.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Bulle vous aide à préparer, pas à financer. Pour vérifier votre propre situation plutôt que de vous fier à une estimation lue en ligne, utilisez le simulateur officiel [mesdroitssociaux.gouv.fr](https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'There is no universal "cost of a baby": it depends too much on the childcare option you choose, the city you live in, and what you already own. What is more useful than a single number is understanding the structure of the spending: what you pay once, before the birth, and what you pay every month, for years.',
        ],
      },
      {
        type: 'text',
        title: 'What you pay once',
        paragraphs: [
          'Equipment (stroller, cot, car seat), layette, small furniture: these purchases cluster before and just after the birth. A good share can come second-hand without losing anything on safety, provided you check the current standards, especially for the car seat and the sleeping setup.',
        ],
      },
      {
        type: 'text',
        title: 'What you pay every month, for a long time',
        paragraphs: [
          'Food, health, nappies, and above all childcare if you go back to work: these are the recurring lines. According to the [report on the cost of a child by the Haut Conseil de la famille, de l’enfance et de l’âge](https://hcfea.gouv.fr/le-cout-de-lenfant-hcf-0) (French government advisory body, December 2025), childcare is among the heaviest expense categories for a child under 3, alongside housing and food.',
          'This is indicative data, to weigh against your own situation and choices, but it confirms a simple intuition: the line that weighs the longest is almost never the one you pictured while packing the hospital bag.',
        ],
      },
      {
        type: 'text',
        title: 'The all-new trap',
        paragraphs: [
          'Many expectant parents buy items, before the birth, that they will barely use: a dedicated baby bathtub when a basin does the job for the first weeks, a bottle warmer, several newborn-size outfits that will only be worn for a few days, or a full changing table when a changing mat on top of existing furniture does the same work.',
          'None of this is forbidden, but none of it is essential either. The only benchmark that really matters is safety: a certified, correctly fitted car seat, and a sleep setup that follows current recommendations, with no cot bumper and no pillow in the crib.',
        ],
      },
      {
        type: 'text',
        title: 'Check the support available before you buy',
        paragraphs: [
          'Part of this spending is offset by support such as the birth grant, the basic allowance, or the childcare support scheme depending on the option you choose. These do not change the price tag in the shop, but they change what is actually left for you to pay, and it is worth knowing that before you do the maths, not after.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Bulle helps you prepare, not finance. To check your own situation rather than trust an estimate found online, use the official [mesdroitssociaux.gouv.fr simulator](https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'mode-de-garde-comparatif-cout',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Crèche, assistante maternelle, garde à domicile : comment chacune se paie vraiment',
    titleEn: 'Nursery, childminder, nanny: how each one is actually paid for',
    excerptFr:
      'Trois modes de garde, trois mécanismes de coût différents. Et une date à ne jamais rater si vous devenez employeur.',
    excerptEn:
      'Three childcare options, three different cost mechanisms. And one deadline you can never miss if you become an employer.',
    readingMinutes: 6,
    heroAltFr: 'Comparer le coût des modes de garde',
    heroAltEn: 'Comparing childcare costs',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les trois modes de garde principaux, crèche, assistante maternelle, garde à domicile, ne se paient pas de la même façon. Comprendre le mécanisme de chacun évite les mauvaises surprises, et aide à choisir en connaissance de cause plutôt qu’au hasard des places disponibles.',
        ],
      },
      {
        type: 'text',
        title: 'La crèche : un tarif calculé pour vous',
        paragraphs: [
          'Dans une crèche collective, vous ne négociez pas un prix et vous n’avez pas de complément à demander séparément : le tarif horaire est calculé automatiquement selon un barème national, la prestation de service unique, basé sur vos revenus et le nombre d’enfants à charge, puis versé directement à la crèche par la Caf. [monenfant.fr](https://monenfant.fr/l-aide-des-caf-au-fonctionnement-des-cr%C3%A8ches) explique ce mécanisme en détail.',
        ],
      },
      {
        type: 'text',
        title: 'Assistante maternelle : vous devenez l’employeur',
        paragraphs: [
          'Avec une assistante maternelle agréée, vous êtes l’employeur direct : vous versez un salaire et des indemnités d’entretien, et vous déclarez tout via Pajemploi. En contrepartie, le complément de libre choix du mode de garde (CMG) prend en charge la totalité des cotisations sociales liées à cet emploi, dans la limite d’un plafond mensuel.',
          'Vous continuez donc de payer le salaire net vous-même, mais pas les charges. [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg) détaille les règles actuelles.',
        ],
      },
      {
        type: 'text',
        title: 'Garde à domicile : le même principe, une prise en charge plus faible',
        paragraphs: [
          'La garde à domicile suit le même schéma d’emploi direct via Pajemploi, mais le CMG ne couvre qu’une partie des cotisations sociales, pas la totalité, dans son propre plafond mensuel. C’est un mode plus souple sur les horaires, mais structurellement plus coûteux pour vous, même avec l’aide.',
        ],
      },
      {
        type: 'callout',
        title: 'La date à ne jamais manquer',
        paragraphs: [
          'Si vous employez une assistante maternelle ou une garde à domicile, la déclaration du salaire sur Pajemploi doit être faite avant le 5 du mois suivant celui travaillé. Un retard ne fait pas perdre le droit définitivement, mais il retarde le versement du complément pour ce mois, le temps que la déclaration soit traitée. Mettez un rappel, pas seulement dans votre tête.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi il faut commencer tôt',
        paragraphs: [
          'Les places en crèche sont attribuées par une commission, sur des critères que vous ne maîtrisez pas, souvent plusieurs mois avant la naissance. Chercher une assistante maternelle prend aussi du temps : les disponibilités se remplissent, surtout dans les zones tendues.',
          'Mener les deux pistes en parallèle, plutôt que d’attendre une réponse avant de commencer l’autre, reste la meilleure protection contre un mode de garde choisi par défaut plutôt que par préférence.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Comparez les mécanismes et simulez votre reste à charge sur [monenfant.fr](https://monenfant.fr) et [caf.fr](https://www.caf.fr), avant de vous engager.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The three main childcare options in France, nursery, registered childminder, and nanny at home, are not paid for the same way. Understanding how each one actually works avoids bad surprises, and helps you choose based on the mechanism rather than whichever slot happens to be free.',
        ],
      },
      {
        type: 'text',
        title: 'Nursery: a rate calculated for you',
        paragraphs: [
          'In a collective nursery (crèche), you do not negotiate a price and there is no separate support to claim: the hourly rate is calculated automatically under a national scale, the prestation de service unique, based on your income and the number of dependent children, then paid directly to the nursery by the Caf. [monenfant.fr](https://monenfant.fr/l-aide-des-caf-au-fonctionnement-des-cr%C3%A8ches) explains this mechanism in detail.',
        ],
      },
      {
        type: 'text',
        title: 'Registered childminder: you become the employer',
        paragraphs: [
          'With a registered childminder (assistante maternelle agréée), you are the direct employer: you pay a salary plus an allowance for costs, and you declare everything through Pajemploi. In return, the childcare support scheme (CMG) covers the entirety of the social contributions tied to this employment, within a monthly ceiling.',
          'You still pay the net salary yourself, but not the employer contributions. [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg) sets out the current rules.',
        ],
      },
      {
        type: 'text',
        title: 'Nanny at home: same principle, lower coverage',
        paragraphs: [
          'A nanny at home follows the same direct-employment path through Pajemploi, but the CMG only covers part of the social contributions, not all of them, within its own monthly ceiling. It is more flexible on hours, but structurally more expensive for you, even with the support.',
        ],
      },
      {
        type: 'callout',
        title: 'The deadline you can never miss',
        paragraphs: [
          'If you employ a childminder or a nanny, the salary declaration on Pajemploi must be filed before the 5th of the month following the month worked. Missing it does not permanently forfeit the support, but it delays payment of that month’s support while the declaration is processed. Set a reminder, do not just keep it in your head.',
        ],
      },
      {
        type: 'text',
        title: 'Why you have to start early',
        paragraphs: [
          'Nursery places are allocated by a panel, against criteria you do not control, often months before the birth. Finding a registered childminder also takes time: availability fills up, especially in busy areas.',
          'Running both tracks in parallel, rather than waiting for an answer on one before starting the other, remains the best protection against ending up with whichever option was left, rather than the one you actually wanted.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Compare the mechanisms and estimate your out-of-pocket cost on [monenfant.fr](https://monenfant.fr) and [caf.fr](https://www.caf.fr), before committing.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'aides-caf-grossesse-simulateur',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Aides CAF pendant la grossesse : ce qui existe, et comment vérifier ce qui vous concerne',
    titleEn: 'CAF support during pregnancy: what exists, and how to check what applies to you',
    excerptFr:
      'PAJE, allocation de base, CMG, PreParE : plusieurs aides, des conditions différentes. Le seul moyen fiable de savoir, c’est le simulateur officiel.',
    excerptEn:
      'PAJE, the basic allowance, CMG, PreParE: several aids, each with its own conditions. The only reliable way to know is the official simulator.',
    readingMinutes: 5,
    heroAltFr: 'Aides CAF pendant la grossesse',
    heroAltEn: 'CAF support during pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La PAJE n’est pas une seule aide, mais un ensemble de plusieurs prestations distinctes, chacune avec ses propres conditions et son propre calendrier. Les connaître dans les grandes lignes aide à ne rien laisser passer, mais seule une simulation sur votre situation réelle donne une réponse fiable.',
        ],
      },
      {
        type: 'list',
        title: 'Ce que regroupe la PAJE',
        items: [
          'La prime à la naissance ou à l’adoption, versée en une fois, sous conditions de ressources',
          'L’allocation de base, versée chaque mois de la naissance jusqu’aux 3 ans de l’enfant, également sous conditions de ressources, à taux plein ou réduit selon votre niveau de revenu',
          'Le complément de libre choix du mode de garde (CMG), qui prend en charge une partie du coût d’une assistante maternelle, d’une garde à domicile ou d’une micro-crèche',
          'La PreParE, versée pendant un congé parental, total ou partiel',
        ],
      },
      {
        type: 'text',
        title: 'La prime à la naissance, en pratique',
        paragraphs: [
          'Elle est versée en une fois, en principe au cours du 7e mois de grossesse, à condition que la déclaration de grossesse ait été faite dans les temps et que vos ressources soient sous le plafond en vigueur. Rien à demander en plus : c’est votre dossier CAF à jour qui déclenche le versement.',
        ],
      },
      {
        type: 'text',
        title: 'L’allocation de base, mois après mois',
        paragraphs: [
          'Elle est versée chaque mois, de la naissance jusqu’au mois précédant le 3e anniversaire de l’enfant, à un taux qui dépend de vos ressources : plein en dessous d’un certain plafond, réduit au-delà, jusqu’à un second plafond au-delà duquel elle n’est plus versée.',
        ],
      },
      {
        type: 'text',
        title: 'Le CMG, lié au mode de garde choisi',
        paragraphs: [
          'Son montant dépend de vos revenus, de l’âge de l’enfant, et surtout du mode de garde retenu : assistante maternelle, garde à domicile ou micro-crèche n’ouvrent pas droit au même niveau de prise en charge. Le mécanisme de chaque option est différent, pas seulement son montant.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Chaque aide a ses propres seuils, et ils évoluent chaque année. Plutôt que de vous fier à un chiffre lu sur un blog ou une estimation datée, vérifiez votre situation réelle sur le simulateur officiel [mesdroitssociaux.gouv.fr](https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil), qui centralise l’essentiel de vos droits sociaux, ou directement sur [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/mes-demarches).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'PAJE is not a single benefit, but a bundle of several distinct payments, each with its own conditions and its own timeline. Knowing the outline helps you not miss anything, but only a simulation on your actual situation gives a reliable answer.',
        ],
      },
      {
        type: 'list',
        title: 'What PAJE brings together',
        items: [
          'The birth or adoption grant, paid once, means-tested',
          'The basic allowance, paid monthly from birth until the child turns 3, also means-tested, at a full or reduced rate depending on your income',
          'The childcare support scheme (CMG), which covers part of the cost of a registered childminder, a nanny, or a micro-nursery',
          'PreParE, paid during a parental leave, whether full or partial',
        ],
      },
      {
        type: 'text',
        title: 'The birth grant, in practice',
        paragraphs: [
          'It is paid once, normally during the 7th month of pregnancy, provided the pregnancy was declared in time and your income is under the threshold in force. There is nothing extra to request: it is your up-to-date CAF file that triggers the payment.',
        ],
      },
      {
        type: 'text',
        title: 'The basic allowance, month by month',
        paragraphs: [
          'It is paid monthly, from birth until the month before the child turns 3, at a rate that depends on your income: full below a given threshold, reduced above it, up to a second threshold beyond which it stops being paid.',
        ],
      },
      {
        type: 'text',
        title: 'CMG, tied to the childcare option you choose',
        paragraphs: [
          'Its amount depends on your income, the child’s age, and above all the childcare option chosen: a registered childminder, a nanny, and a micro-nursery do not open the same level of support. The mechanism differs between options, not just the amount.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Every benefit has its own thresholds, and they change every year. Rather than trusting a figure from a blog or a dated estimate, check your actual situation on the official [mesdroitssociaux.gouv.fr simulator](https://www.mesdroitssociaux.gouv.fr/votre-simulateur/accueil), which brings together most of your social entitlements, or directly on [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/mes-demarches).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-parental-prepare-vaut-il-le-coup',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Money',
    titleFr: 'Congé parental et PreParE : est-ce que ça vaut le coup ?',
    titleEn: 'Parental leave and PreParE: is it worth it?',
    excerptFr:
      'Ce que vous gagnez, ce que vous perdez, et un délai de prévenance qu’il vaut mieux ne pas découvrir trop tard.',
    excerptEn:
      'What you gain, what you give up, and a notice period you really do not want to discover too late.',
    readingMinutes: 6,
    heroAltFr: 'Congé parental et PreParE',
    heroAltEn: 'Parental leave and PreParE',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé parental d’éducation permet de suspendre ou de réduire son activité pour s’occuper d’un enfant, jusqu’à ses 3 ans. Ce n’est ni un droit automatique ni gratuit : il faut un an d’ancienneté dans l’entreprise à la naissance ou à l’arrivée de l’enfant, et le revenu de remplacement, la PreParE, ne couvre qu’une partie de ce que vous perdez. La question n’est pas seulement légale, elle est aussi financière.',
        ],
      },
      {
        type: 'list',
        title: 'Le délai de prévenance, à ne jamais rater',
        items: [
          'Si le congé parental commence juste après le congé maternité ou d’adoption, sans interruption, vous devez prévenir l’employeur au moins un mois avant la fin de ce congé',
          'Dans tous les autres cas, y compris une reprise du travail puis un congé parental démarré plus tard, le délai est d’au moins deux mois avant la date de début souhaitée',
          'Ces deux délais sont fixés par le [Code du travail (article L1225-50)](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900935)',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ce délai change tout',
        paragraphs: [
          'Confondre les deux délais est l’erreur la plus fréquente. Si vous comptiez enchaîner directement après votre congé maternité, un mois suffit. Mais si vous avez repris le travail, même quelques semaines, avant de démarrer le congé parental, c’est le délai de deux mois qui s’applique.',
          'Posez la question à votre service RH tôt, pas la semaine où vous comptiez partir.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que verse la PreParE',
        paragraphs: [
          'Son montant dépend de si vous arrêtez complètement votre activité ou si vous passez à temps partiel, avec un niveau différent selon le taux d’activité conservé. Sa durée de versement dépend aussi du nombre d’enfants : plus courte pour un premier enfant, plus longue à partir du deuxième, en particulier si les deux parents se partagent le congé.',
          'Ce partage n’est pas un détail administratif : c’est ce qui permet à la famille d’aller chercher la durée maximale de versement.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que vous perdez, concrètement',
        paragraphs: [
          'Le congé parental n’est pas rémunéré par l’employeur, la PreParE ne remplace le salaire que partiellement, et l’acquisition de droits liés à l’activité (ancienneté, retraite) suit des règles différentes de celles d’une période de travail effectif pendant un congé non rémunéré. Ce ne sont pas des détails à découvrir après coup.',
        ],
      },
      {
        type: 'text',
        title: 'Comment trancher',
        paragraphs: [
          'Il n’y a pas de bonne réponse universelle, seulement une question à se poser dans le bon ordre : quel est le reste à charge réel une fois la PreParE et le mode de garde comparés, quel délai de prévenance s’applique à votre situation, et qu’est-ce que vous cherchez réellement, du temps, une transition, ou une solution par défaut faute de place ailleurs.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Les conditions, durées et démarches sont détaillées sur [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F32485) et [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/la-prestation-partagee-d-education-de-l-enfant-prepare). Faites une simulation avant de vous décider, pas après.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Congé parental d’éducation lets you stop or reduce your working hours to look after a child, up until the child turns 3. It is neither automatic nor free: it requires one year of seniority at the company when the child is born or arrives, and the replacement income, PreParE, only covers part of what you give up. This is not only a legal question, it is a financial one too.',
        ],
      },
      {
        type: 'list',
        title: 'The notice period you can never miss',
        items: [
          'If parental leave starts right after maternity or adoption leave, with no gap, you must tell your employer at least one month before that leave ends',
          'In every other case, including going back to work and starting parental leave later, the notice period is at least two months before the desired start date',
          'Both notice periods are set out in [article L1225-50 of the Code du travail](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006900935)',
        ],
      },
      {
        type: 'text',
        title: 'Why this notice period changes everything',
        paragraphs: [
          'Mixing up the two notice periods is the most common mistake. If you meant to move straight from maternity leave into parental leave, one month is enough. But if you went back to work, even for a few weeks, before starting parental leave, the two-month notice applies instead.',
          'Ask HR early, not the week you meant to leave.',
        ],
      },
      {
        type: 'text',
        title: 'What PreParE actually pays',
        paragraphs: [
          'Its amount depends on whether you stop working entirely or move to part-time, with a different level depending on how much activity you keep. How long it is paid also depends on the number of children: shorter for a first child, longer from the second child onward, especially if both parents share the leave.',
          'That sharing is not an administrative footnote: it is what lets the family reach the maximum payment period.',
        ],
      },
      {
        type: 'text',
        title: 'What you actually give up',
        paragraphs: [
          'Parental leave is unpaid by the employer, PreParE only replaces part of the salary, and the accrual of work-related rights (seniority, pension) follows different rules than an actual working period during unpaid leave. These are not details to find out after the fact.',
        ],
      },
      {
        type: 'text',
        title: 'How to decide',
        paragraphs: [
          'There is no universal right answer, only a question to ask in the right order: what is the real out-of-pocket cost once PreParE and the childcare option are compared, which notice period applies to your situation, and what are you actually looking for, time, a transition, or a fallback for lack of anything else available.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Conditions, durations and how to apply are detailed on [service-public.fr](https://www.service-public.fr/particuliers/vosdroits/F32485) and [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/la-prestation-partagee-d-education-de-l-enfant-prepare). Run a simulation before you decide, not after.',
        ],
      },
    ],
  }),
];

export const POSTS_BUDGET_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_BUDGET_EN: BlogPost[] = pairs.map((p) => p.en);
