/**
 * Gap run, batch 3 — the money mechanics nobody sequences.
 *
 * Same house rules. These touch the CAF, Pajemploi, the tax office and l'Assurance Maladie.
 * Per §7.3 and the rest of the corpus, the MECHANISM is described and the barème is linked,
 * never printed: every euro amount, income tranche and ceiling here revalorises, and a hard
 * number is how a guide goes stale. Where a 2025-2026 reform is live (the CMG), the current
 * state is given with its date.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'cmg-comment-est-calcule',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Le CMG : comment l’aide à la garde se calcule, et ce que la réforme a changé',
    titleEn: 'The CMG childcare benefit: how it is calculated, and what the reform changed',
    excerptFr:
      'L’aide de la CAF pour la garde a été refondue en 2025. La coupure à trois ans a disparu, et le calcul suit désormais vos revenus et vos heures. Voici la logique, sans les montants qui bougent.',
    excerptEn:
      'The CAF childcare benefit was overhauled in 2025. The cut-off at age three is gone, and the calculation now follows your income and your hours. Here is the logic, without the figures that move.',
    readingMinutes: 5,
    heroAltFr: 'Le calcul du complément de libre choix du mode de garde',
    heroAltEn: 'How the childcare benefit is calculated',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le complément de libre choix du mode de garde, le CMG, est l’aide de la CAF qui allège la garde d’un enfant de moins de six ans. C’est une aide centrale du budget des premières années, et sa logique vient de changer.',
          'Cet article explique le mécanisme, pas les montants : ils dépendent de vos revenus et se révisent, donc ils se lisent sur le barème officiel, jamais dans un article.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que le CMG couvre',
        paragraphs: [
          'Il aide à financer trois modes de garde : l’emploi d’une assistante maternelle agréée, la garde à domicile, et le recours à une structure comme une micro-crèche. Il est versé par la CAF, ou la MSA pour le régime agricole, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F345).',
          'Une condition d’activité s’applique : il faut travailler au moins une heure dans le mois, ou relever de certaines situations comme le RSA, l’AAH ou les études. Sans elle, le CMG n’est pas ouvert.',
        ],
      },
      {
        type: 'text',
        title: 'La réforme de 2025 : la coupure à trois ans a disparu',
        paragraphs: [
          'Pour les parents qui emploient directement une assistante maternelle ou une garde à domicile, le reste à charge se calcule désormais de façon linéaire, selon vos revenus, le nombre d’enfants et les heures de garde, sur le modèle de la crèche. C’est le « CMG rénové », en vigueur pour les heures travaillées depuis le 1er septembre 2025, décrit sur [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'Concrètement, l’ancienne règle qui divisait l’aide par deux au troisième anniversaire de l’enfant ne s’applique plus à l’emploi direct : le calcul est le même de zéro à six ans.',
        ],
      },
      {
        type: 'text',
        title: 'Deux extensions récentes à connaître',
        paragraphs: [
          'Depuis le 1er septembre 2025, un parent qui élève seul son enfant peut percevoir le CMG jusqu’aux douze ans de l’enfant, au lieu de six. Et depuis le 1er décembre 2025, en cas de résidence alternée, chacun des deux parents peut percevoir son propre CMG.',
          'Un point à ne pas confondre : cette linéarisation concerne l’emploi direct. Pour une garde en structure comme une micro-crèche, le CMG reste sur l’ancien barème et n’est versé qu’au parent allocataire.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour qui : la garde d’un enfant de moins de 6 ans, sous condition d’activité',
          'Modes couverts : assistante maternelle agréée, garde à domicile, structure',
          'Depuis septembre 2025 : calcul linéaire pour l’emploi direct, plus de coupure à 3 ans',
          'Parent isolé : CMG jusqu’aux 12 ans de l’enfant',
          'Résidence alternée : un CMG pour chacun des deux parents',
          'Micro-crèche et structures : ancien barème, versé au parent allocataire',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le CMG ne se devine pas, il se simule. Les règles ont changé en 2025 ; le seul chiffre fiable est celui que le simulateur de la CAF vous donne pour votre situation.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The complément de libre choix du mode de garde, the CMG, is the CAF benefit that eases the cost of childcare for a child under six. It is a central part of the early-years budget, and its logic has just changed.',
          'This article explains the mechanism, not the amounts: they depend on your income and are revised, so they are read on the official scale, never in an article.',
        ],
      },
      {
        type: 'text',
        title: 'What the CMG covers',
        paragraphs: [
          'It helps fund three childcare arrangements: employing an approved childminder, in-home care, and using a structure such as a micro-crèche. It is paid by the CAF, or the MSA for the agricultural scheme, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F345).',
          'An activity condition applies: you must work at least one hour in the month, or fall under certain situations such as RSA, disability allowance or study. Without it, the CMG is not open.',
        ],
      },
      {
        type: 'text',
        title: 'The 2025 reform: the cut-off at three is gone',
        paragraphs: [
          'For parents who directly employ a childminder or in-home carer, the remaining cost is now calculated linearly, based on your income, the number of children and the hours of care, on the crèche model. This is the "renewed CMG", in force for hours worked since 1 September 2025, described on [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/droits-et-prestations/vie-personnelle/le-complement-de-libre-choix-du-mode-de-garde-cmg).',
          'In practice, the old rule that halved the benefit at the child\'s third birthday no longer applies to direct employment: the calculation is the same from zero to six.',
        ],
      },
      {
        type: 'text',
        title: 'Two recent extensions to know',
        paragraphs: [
          'Since 1 September 2025, a parent raising a child alone can receive the CMG until the child turns twelve, instead of six. And since 1 December 2025, in shared custody, each of the two parents can receive their own CMG.',
          'One thing not to confuse: this linear calculation applies to direct employment. For care in a structure such as a micro-crèche, the CMG stays on the old scale and is paid only to the claimant parent.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'For whom: childcare of a child under 6, subject to an activity condition',
          'Modes covered: approved childminder, in-home care, structure',
          'Since September 2025: linear calculation for direct employment, no cut-off at 3',
          'Lone parent: CMG until the child turns 12',
          'Shared custody: one CMG for each of the two parents',
          'Micro-crèches and structures: old scale, paid to the claimant parent',
        ],
      },
      {
        type: 'quote',
        quote:
          'The CMG is not guessed, it is simulated. The rules changed in 2025; the only reliable figure is the one the CAF simulator gives for your own situation.',
      },
    ],
  }),

  postPair({
    slug: 'employer-assistante-maternelle-pajemploi',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Employer une assistante maternelle : vous devenez employeur, et Pajemploi gère le reste',
    titleEn: 'Employing a childminder: you become the employer, and Pajemploi handles the rest',
    excerptFr:
      'Choisir une assistante maternelle, c’est signer un contrat de travail et devenir employeur. Bonne nouvelle : Pajemploi déduit le CMG et peut même payer la salariée à votre place.',
    excerptEn:
      'Choosing a childminder means signing an employment contract and becoming an employer. The good news: Pajemploi deducts the CMG and can even pay the employee for you.',
    readingMinutes: 5,
    heroAltFr: 'Employer une assistante maternelle via Pajemploi',
    heroAltEn: 'Employing a childminder through Pajemploi',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Confier son enfant à une assistante maternelle agréée n’est pas seulement un choix de garde, c’est un statut : vous devenez employeur. Cela effraie souvent, et à tort, parce qu’un service dédié, Pajemploi, prend en charge presque toute la mécanique.',
          'Savoir qui fait quoi entre vous, la CAF et Pajemploi évite le sentiment de paperasse insurmontable qui fait renoncer certains parents à ce mode de garde.',
        ],
      },
      {
        type: 'text',
        title: 'Vous êtes l’employeur, avec un vrai contrat',
        paragraphs: [
          'En emploi direct, c’est vous qui employez l’assistante maternelle. Cela suppose un contrat de travail écrit et un salaire horaire respectant le minimum en vigueur, comme le rappelle [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F16841).',
          'Déclarer votre salariée n’est pas une contrainte administrative de plus : c’est ce qui lui ouvre ses droits sociaux, santé, maternité, accidents du travail, chômage en fin de contrat, retraite. Ne pas déclarer, c’est la priver de tout cela.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que Pajemploi fait à votre place',
        paragraphs: [
          'Pajemploi est le service de l’URSSAF dédié à ces employeurs. Votre inscription y est déclenchée par votre demande de CMG à la CAF, qui demande à Pajemploi de vous enregistrer, selon [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr).',
          'Chaque mois, vous déclarez le salaire versé, entre le 25 du mois travaillé et le 5 du mois suivant. Sur cette base, Pajemploi calcule et déduit le CMG : vous ne payez que le reste à charge.',
        ],
      },
      {
        type: 'text',
        title: 'Pajemploi+, pour ne même plus faire le virement',
        paragraphs: [
          'Un cran plus loin, le service Pajemploi+, gratuit, automatise le paiement de la salariée : vous validez la déclaration, Pajemploi prélève le montant net et le verse directement à l’assistante maternelle.',
          'C’est ce qui transforme le statut d’employeur, intimidant sur le papier, en une déclaration mensuelle de quelques minutes. La partie complexe, cotisations et aide, est calculée pour vous.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Votre rôle : employeur, avec un contrat de travail écrit',
          'Inscription à Pajemploi : déclenchée par la demande de CMG à la CAF',
          'Chaque mois : déclarer le salaire entre le 25 et le 5 du mois suivant',
          'Pajemploi déduit le CMG : vous ne réglez que le reste à charge',
          'Pajemploi+ : paie l’assistante maternelle directement à votre place',
        ],
      },
      {
        type: 'quote',
        quote:
          'Devenir employeur d’une assistante maternelle, ce n’est pas gérer une paie. C’est faire une déclaration par mois, et laisser Pajemploi calculer l’aide et les cotisations.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Entrusting your child to an approved childminder is not only a childcare choice, it is a status: you become an employer. That often frightens people, wrongly, because a dedicated service, Pajemploi, handles almost all of the machinery.',
          'Knowing who does what between you, the CAF and Pajemploi avoids the sense of insurmountable paperwork that makes some parents give up on this arrangement.',
        ],
      },
      {
        type: 'text',
        title: 'You are the employer, with a real contract',
        paragraphs: [
          'In direct employment, you employ the childminder. That means a written employment contract and an hourly wage respecting the minimum in force, as [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F16841) recalls.',
          'Declaring your employee is not one more administrative burden: it is what opens her social rights, health, maternity, work accidents, unemployment at the end of the contract, pension. Not declaring means depriving her of all of it.',
        ],
      },
      {
        type: 'text',
        title: 'What Pajemploi does for you',
        paragraphs: [
          'Pajemploi is the URSSAF service dedicated to these employers. Your registration is triggered by your CMG request to the CAF, which asks Pajemploi to enrol you, according to [pajemploi.urssaf.fr](https://www.pajemploi.urssaf.fr).',
          'Each month you declare the wage paid, between the 25th of the worked month and the 5th of the following one. On that basis, Pajemploi calculates and deducts the CMG: you pay only the remaining cost.',
        ],
      },
      {
        type: 'text',
        title: 'Pajemploi+, so you no longer even make the transfer',
        paragraphs: [
          'One step further, the free Pajemploi+ service automates paying the employee: you approve the declaration, Pajemploi collects the net amount and pays it directly to the childminder.',
          'That is what turns the employer status, intimidating on paper, into a monthly declaration of a few minutes. The complex part, contributions and benefit, is calculated for you.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Your role: employer, with a written employment contract',
          'Pajemploi registration: triggered by the CMG request to the CAF',
          'Each month: declare the wage between the 25th and the 5th of the next month',
          'Pajemploi deducts the CMG: you pay only the remaining cost',
          'Pajemploi+: pays the childminder directly for you',
        ],
      },
      {
        type: 'quote',
        quote:
          'Becoming a childminder\'s employer is not running a payroll. It is one declaration a month, and letting Pajemploi work out the benefit and the contributions.',
      },
    ],
  }),

  postPair({
    slug: 'impots-annee-naissance-demi-part',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Impôts l’année de la naissance : la demi-part, et les 60 jours à ne pas rater',
    titleEn: 'Tax the year of the birth: the extra half-share, and the 60 days not to miss',
    excerptFr:
      'Un enfant né en décembre compte pour toute l’année. Et vous n’avez pas à attendre la déclaration : signaler la naissance sous 60 jours baisse votre prélèvement tout de suite.',
    excerptEn:
      'A child born in December counts for the whole year. And you do not have to wait for the tax return: reporting the birth within 60 days lowers your withholding right away.',
    readingMinutes: 4,
    heroAltFr: 'Les impôts l’année de la naissance d’un enfant',
    heroAltEn: 'Income tax the year a child is born',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La naissance d’un enfant change votre impôt sur le revenu, et de deux façons que beaucoup de parents découvrent trop tard : une part fiscale en plus, et la possibilité de baisser son prélèvement sans attendre.',
          'Aucun montant ici : l’avantage est plafonné et le plafond bouge chaque année. La logique, elle, est stable, et c’est elle qui compte.',
        ],
      },
      {
        type: 'text',
        title: 'Une demi-part de plus, pour toute l’année',
        paragraphs: [
          'Un enfant ajoute des parts au quotient familial : une demi-part pour chacun des deux premiers enfants, une part entière à partir du troisième, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A17675).',
          'Le point contre-intuitif : l’enfant compte pour l’année entière, quelle que soit sa date de naissance. Un enfant né le 28 décembre ouvre la même demi-part qu’un enfant né en janvier. La date dans l’année ne réduit rien.',
        ],
      },
      {
        type: 'text',
        title: 'Les 60 jours qui baissent le prélèvement tout de suite',
        paragraphs: [
          'Vous n’êtes pas obligé d’attendre la déclaration de revenus du printemps suivant. En signalant la naissance dans les soixante jours via « Gérer mon prélèvement à la source » sur [impots.gouv.fr](https://www.impots.gouv.fr/particulier/naissance-adoption), votre taux de prélèvement est recalculé sans attendre.',
          'Concrètement, votre prélèvement mensuel baisse dès les mois qui suivent la naissance, au lieu d’attendre une régularisation un an plus tard. C’est de la trésorerie récupérée au bon moment, celui où les dépenses arrivent.',
        ],
      },
      {
        type: 'text',
        title: 'Et à la déclaration, rien de compliqué',
        paragraphs: [
          'Au printemps, il suffit d’indiquer l’enfant dans la rubrique « Personnes à charge » en donnant son année de naissance. Aucun acte de naissance ni justificatif à joindre.',
          'L’avantage procuré par la demi-part est plafonné, c’est le plafonnement du quotient familial. Le principe suffit à retenir ici ; le montant se vérifie sur le site des impôts, où il est mis à jour chaque année.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Parts : une demi-part pour les 1er et 2e enfants, une part dès le 3e',
          'L’enfant compte pour l’année entière, quelle que soit sa date de naissance',
          'Sous 60 jours : signaler la naissance pour baisser le prélèvement à la source',
          'À la déclaration : indiquer l’enfant, sans justificatif à joindre',
          'Avantage plafonné : le montant du plafond se vérifie sur impots.gouv.fr',
        ],
      },
      {
        type: 'quote',
        quote:
          'Un enfant né le 31 décembre compte fiscalement comme s’il était né le 1er janvier. La seule date à surveiller, c’est plutôt les 60 jours pour ajuster le prélèvement.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A child\'s birth changes your income tax, in two ways many parents discover too late: an extra tax share, and the chance to lower your withholding without waiting.',
          'No amounts here: the advantage is capped and the cap moves each year. The logic, though, is stable, and it is what matters.',
        ],
      },
      {
        type: 'text',
        title: 'One more half-share, for the whole year',
        paragraphs: [
          'A child adds shares to the family quotient: a half-share for each of the first two children, a full share from the third, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A17675).',
          'The counter-intuitive point: the child counts for the entire year, whatever their date of birth. A child born on 28 December opens the same half-share as one born in January. The date within the year reduces nothing.',
        ],
      },
      {
        type: 'text',
        title: 'The 60 days that lower withholding right away',
        paragraphs: [
          'You do not have to wait for the following spring\'s tax return. By reporting the birth within sixty days via "Gérer mon prélèvement à la source" on [impots.gouv.fr](https://www.impots.gouv.fr/particulier/naissance-adoption), your withholding rate is recalculated straight away.',
          'In practice, your monthly withholding drops in the months after the birth, rather than waiting for an adjustment a year later. That is cash recovered at the right moment, when the spending arrives.',
        ],
      },
      {
        type: 'text',
        title: 'And at the return, nothing complicated',
        paragraphs: [
          'In spring, you simply report the child in the "dependants" section, giving their year of birth. No birth certificate or supporting document to attach.',
          'The advantage from the half-share is capped, the family-quotient ceiling. The principle is enough to remember here; the amount is checked on the tax website, where it is updated each year.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Shares: a half-share for the 1st and 2nd child, a full share from the 3rd',
          'The child counts for the whole year, whatever their date of birth',
          'Within 60 days: report the birth to lower the withholding rate',
          'At the return: report the child, no supporting document to attach',
          'Capped advantage: the ceiling amount is checked on impots.gouv.fr',
        ],
      },
      {
        type: 'quote',
        quote:
          'A child born on 31 December counts, for tax, as if born on 1 January. The date to watch is rather the 60 days to adjust your withholding.',
      },
    ],
  }),

  postPair({
    slug: 'credit-impot-frais-de-garde',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Le crédit d’impôt pour la garde : 50 %, même si vous ne payez pas d’impôt',
    titleEn: 'The childcare tax credit: 50%, even if you pay no tax',
    excerptFr:
      'Pour un enfant de moins de six ans gardé à l’extérieur, la moitié de vos frais revient sous forme de crédit d’impôt, remboursé même sans impôt à payer. À condition de déduire le CMG d’abord.',
    excerptEn:
      'For a child under six kept outside the home, half of your costs come back as a tax credit, refunded even with no tax due. Provided you deduct the CMG first.',
    readingMinutes: 4,
    heroAltFr: 'Le crédit d’impôt pour frais de garde',
    heroAltEn: 'The childcare costs tax credit',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La garde d’un jeune enfant ouvre un avantage fiscal souvent sous-estimé, parce qu’on le confond avec une réduction d’impôt classique. Ce n’en est pas une : c’est un crédit d’impôt, et la nuance vaut de l’argent réel.',
          'Comme ailleurs, les montants exacts se vérifient sur le site des impôts, car le plafond se révise. Ce qui ne bouge pas, c’est le mécanisme.',
        ],
      },
      {
        type: 'text',
        title: 'Un crédit, pas une réduction',
        paragraphs: [
          'La différence est décisive : un crédit d’impôt est remboursé même si vous n’avez pas d’impôt à payer. Un foyer non imposable touche donc la somme, ce qui n’est pas le cas d’une simple réduction. C’est ce que précise [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F8).',
          'Le crédit vaut 50 % des sommes versées, dans la limite d’un plafond annuel par enfant, pour un enfant de moins de six ans gardé à l’extérieur du domicile : crèche, halte-garderie, ou assistante maternelle agréée.',
        ],
      },
      {
        type: 'text',
        title: 'Le piège : déduire le CMG avant de compter',
        paragraphs: [
          'C’est l’erreur la plus fréquente. Le crédit se calcule sur ce qui reste à votre charge, pas sur le total. Il faut donc retrancher d’abord le CMG et toute aide de l’employeur exonérée, puis appliquer les 50 % sur ce solde.',
          'Autrement dit, vous ne pouvez pas cumuler l’aide et le crédit sur la même somme. La base éligible, c’est votre reste à charge réel, une fois les aides déduites.',
        ],
      },
      {
        type: 'text',
        title: 'Garde à l’extérieur, moins de six ans',
        paragraphs: [
          'Deux conditions à retenir : l’enfant doit avoir moins de six ans, âge apprécié au 1er janvier de l’année, et la garde doit avoir lieu hors de votre domicile. Une garde à domicile relève d’un autre dispositif.',
          'En cas de résidence alternée, le plafond est partagé entre les deux parents, chacun pour moitié. Là encore, le principe suffit ; le montant se lit sur impots.gouv.fr.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Nature : un crédit d’impôt, remboursé même sans impôt à payer',
          'Taux : 50 % des sommes versées, dans un plafond annuel par enfant',
          'Conditions : enfant de moins de 6 ans, gardé hors du domicile',
          'À déduire d’abord : le CMG et les aides employeur exonérées',
          'Résidence alternée : plafond partagé entre les deux parents',
        ],
      },
      {
        type: 'quote',
        quote:
          'Crédit, pas réduction : même sans impôt, la moitié revient. Mais elle se calcule sur votre reste à charge, une fois le CMG retiré, pas sur la facture brute.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Childcare for a young child opens a tax advantage that is often underestimated, because it is confused with an ordinary tax reduction. It is not one: it is a tax credit, and the distinction is worth real money.',
          'As elsewhere, the exact amounts are checked on the tax website, since the ceiling is revised. What does not move is the mechanism.',
        ],
      },
      {
        type: 'text',
        title: 'A credit, not a reduction',
        paragraphs: [
          'The difference is decisive: a tax credit is refunded even if you have no tax to pay. A non-taxable household therefore receives the sum, which an ordinary reduction would not give. That is what [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F8) specifies.',
          'The credit is worth 50% of the sums paid, within an annual ceiling per child, for a child under six kept outside the home: crèche, day-care, or an approved childminder.',
        ],
      },
      {
        type: 'text',
        title: 'The trap: deduct the CMG before counting',
        paragraphs: [
          'This is the most common mistake. The credit is calculated on what remains your cost, not on the total. You must first subtract the CMG and any tax-exempt employer aid, then apply the 50% to that balance.',
          'In other words, you cannot stack the benefit and the credit on the same sum. The eligible base is your real remaining cost, once the aids are deducted.',
        ],
      },
      {
        type: 'text',
        title: 'Care outside the home, under six',
        paragraphs: [
          'Two conditions to remember: the child must be under six, age assessed on 1 January of the year, and the care must take place outside your home. In-home care comes under a different scheme.',
          'In shared custody, the ceiling is split between the two parents, each for half. Again, the principle is enough; the amount is read on impots.gouv.fr.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Nature: a tax credit, refunded even with no tax due',
          'Rate: 50% of the sums paid, within an annual ceiling per child',
          'Conditions: child under 6, kept outside the home',
          'Deduct first: the CMG and tax-exempt employer aid',
          'Shared custody: ceiling split between the two parents',
        ],
      },
      {
        type: 'quote',
        quote:
          'Credit, not reduction: even with no tax, half comes back. But it is calculated on your remaining cost, once the CMG is removed, not on the gross bill.',
      },
    ],
  }),

  postPair({
    slug: 'rattacher-enfant-carte-vitale-deux-parents',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Rattacher l’enfant à la carte Vitale des deux parents (et pourquoi le faire)',
    titleEn: 'Adding the child to both parents’ health card (and why to do it)',
    excerptFr:
      'Un enfant peut être ayant droit de ses deux parents en même temps. Résultat : le parent qui l’emmène chez le médecin présente sa propre carte, et le remboursement suit sans friction.',
    excerptEn:
      'A child can be a dependant of both parents at once. The result: whichever parent takes them to the doctor uses their own card, and the reimbursement follows without friction.',
    readingMinutes: 4,
    heroAltFr: 'Rattacher l’enfant à la carte Vitale des deux parents',
    heroAltEn: 'Attaching the child to both parents’ health card',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Beaucoup de familles rattachent le nouveau-né à la carte Vitale d’un seul parent, par habitude ou parce qu’on croit que c’est l’un ou l’autre. On peut faire mieux, et ce n’est pas plus compliqué : le rattacher aux deux.',
          'C’est une petite démarche qui règle par avance une longue série de micro-frictions de la première année.',
        ],
      },
      {
        type: 'text',
        title: 'Un enfant, deux rattachements',
        paragraphs: [
          'Un enfant peut être ayant droit de ses deux parents en même temps, et figurer sur la carte Vitale de chacun, quelle que soit la situation familiale, mariés, pacsés, en concubinage ou séparés. C’est expliqué sur [ameli.fr](https://www.ameli.fr/assure/adresses-et-contacts/un-changement-de-situation/maternite-et-paternite/rattacher-votre-enfant-ses-deux-parents).',
          'Cela fonctionne même si les deux parents dépendent de régimes ou de caisses différents. Le double rattachement est prévu, pas toléré.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi c’est utile au quotidien',
        paragraphs: [
          'La première année multiplie les rendez-vous, et ce n’est pas toujours le même parent qui accompagne. Avec le double rattachement, celui qui emmène l’enfant présente sa propre carte Vitale, et le remboursement se fait sans avoir à jongler.',
          'Le parent dont la carte est utilisée reçoit le remboursement sur son compte, et l’information est transmise à la complémentaire rattachée. Moins d’avances à se rembourser entre soi, moins de dossiers à démêler.',
        ],
      },
      {
        type: 'text',
        title: 'Comment le faire',
        paragraphs: [
          'La démarche se fait depuis le compte ameli, rubrique « Modifier vos informations personnelles » : vous demandez l’inscription de l’enfant sur votre carte, et sur celle de l’autre parent. Un parent est désigné comme principal, l’autre comme secondaire, sans que cela change les remboursements.',
          'Un préalable : la déclaration du nouveau-né à l’Assurance Maladie est une étape distincte, à faire d’abord. Le double rattachement vient ensuite.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Possible : l’enfant ayant droit des deux parents en même temps',
          'Quelle que soit la situation : mariés, pacsés, concubins, séparés',
          'Même régimes ou caisses différents : le double rattachement est prévu',
          'Où : compte ameli, « Modifier vos informations personnelles »',
          'Avant : la déclaration du nouveau-né à l’Assurance Maladie',
        ],
      },
      {
        type: 'quote',
        quote:
          'Rattacher l’enfant aux deux cartes, c’est régler une fois pour toutes la question « qui présente la carte ». La réponse devient : celui qui est là.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Many families attach the newborn to one parent\'s health card, out of habit or because they think it is one or the other. You can do better, and it is no more complicated: attach them to both.',
          'It is a small step that settles in advance a long series of micro-frictions across the first year.',
        ],
      },
      {
        type: 'text',
        title: 'One child, two attachments',
        paragraphs: [
          'A child can be a dependant of both parents at the same time, and appear on each one\'s health card, whatever the family situation, married, in a civil partnership, cohabiting or separated. It is explained on [ameli.fr](https://www.ameli.fr/assure/adresses-et-contacts/un-changement-de-situation/maternite-et-paternite/rattacher-votre-enfant-ses-deux-parents).',
          'It works even if the two parents are on different schemes or funds. Double attachment is provided for, not merely tolerated.',
        ],
      },
      {
        type: 'text',
        title: 'Why it helps day to day',
        paragraphs: [
          'The first year multiplies appointments, and it is not always the same parent who goes. With double attachment, whoever takes the child uses their own health card, and the reimbursement happens without juggling.',
          'The parent whose card is used receives the reimbursement in their account, and the information is passed to the attached top-up insurer. Fewer advances to settle between yourselves, fewer files to untangle.',
        ],
      },
      {
        type: 'text',
        title: 'How to do it',
        paragraphs: [
          'The step is done from the ameli account, under "Modifier vos informations personnelles": you request the child\'s registration on your card, and on the other parent\'s. One parent is designated as primary, the other as secondary, without changing the reimbursements.',
          'One prerequisite: declaring the newborn to the health insurance system is a separate step, to be done first. The double attachment comes after.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Possible: the child a dependant of both parents at once',
          'Whatever the situation: married, civil partnership, cohabiting, separated',
          'Even different schemes or funds: double attachment is provided for',
          'Where: the ameli account, "Modifier vos informations personnelles"',
          'Before: declaring the newborn to the health insurance system',
        ],
      },
      {
        type: 'quote',
        quote:
          'Attaching the child to both cards settles once and for all the question of "who shows the card". The answer becomes: whoever is there.',
      },
    ],
  }),

  postPair({
    slug: 'couches-lavables-ou-jetables-le-cout',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Couches lavables ou jetables : comparer les coûts sans se tromper de calcul',
    titleEn: 'Reusable or disposable nappies: comparing costs without miscounting',
    excerptFr:
      'Le vrai écart n’est pas le prix affiché, c’est la structure. L’une est une dépense qui revient chaque semaine, l’autre un gros achat de départ. Et une aide locale existe, souvent ignorée.',
    excerptEn:
      'The real gap is not the sticker price, it is the structure. One is a cost that returns every week, the other a big upfront purchase. And a local subsidy exists, often overlooked.',
    readingMinutes: 4,
    heroAltFr: 'Comparer le coût des couches lavables et jetables',
    heroAltEn: 'Comparing the cost of reusable and disposable nappies',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le débat couches lavables contre couches jetables se joue souvent sur un chiffre unique, censé désigner un gagnant. C’est le mauvais angle : les deux n’ont pas la même forme de coût, et c’est cette forme, plus que le total, qui décide de ce qui vous convient.',
          'Pas de prix ici, sans marque ni modèle : les totaux dépendent trop de vos habitudes. En revanche, la structure du coût, elle, est claire.',
        ],
      },
      {
        type: 'text',
        title: 'Deux formes de dépense, pas deux prix',
        paragraphs: [
          'Les jetables sont une dépense récurrente : un budget régulier chaque semaine, pendant toute la période des couches, plus leur part dans les déchets du foyer. C’est une somme lissée, indolore à l’achat, lourde sur la durée.',
          'Les lavables inversent la courbe : un achat de départ important pour constituer le stock, puis un coût récurrent plus faible d’eau, d’électricité et de lessive. Une partie se récupère par la réutilisation pour un deuxième enfant et par la revente d’occasion.',
        ],
      },
      {
        type: 'text',
        title: 'L’aide que presque personne ne réclame',
        paragraphs: [
          'De nombreuses collectivités, communes, intercommunalités ou syndicats de déchets, versent une aide à l’achat de couches lavables, souvent sous forme de subvention plafonnée et conditionnée à un lot minimum. L’ADEME recense ces dispositifs sur [son portail](https://optigede.ademe.fr/couches-lavables).',
          'Deux précisions honnêtes : cette aide est locale, jamais nationale, et il n’existe pas de « prime couches » de la CAF. Le bon réflexe est de demander à votre commune ou à votre syndicat de déchets ce qu’ils proposent avant d’acheter.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui fait vraiment pencher la balance',
        paragraphs: [
          'Trois choses, et aucune n’est le prix du paquet : avez-vous un lave-linge et de la place pour sécher, comptez-vous plusieurs enfants, et supportez-vous une organisation un peu plus exigeante au quotidien. Un « oui » à ces trois questions rend les lavables nettement plus intéressants.',
          'Beaucoup de familles font un choix mixte : lavables à la maison, jetables pour les sorties et la crèche. Le calcul n’est pas binaire, et c’est souvent le mélange qui coûte le moins cher sans peser sur les journées.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Jetables : coût récurrent, lissé chaque semaine, sur toute la période',
          'Lavables : gros achat de départ, puis eau, électricité et lessive',
          'Lavables : une partie se récupère (deuxième enfant, revente)',
          'Aide : locale, via les collectivités, jamais la CAF, à demander avant d’acheter',
          'Choix mixte : lavables à la maison, jetables pour les sorties, souvent le moins cher',
        ],
      },
      {
        type: 'quote',
        quote:
          'La bonne question n’est pas « lequel coûte moins cher », mais « quelle forme de coût vous arrange » : une dépense qui revient chaque semaine, ou un gros achat qui se rentabilise dans le temps.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The reusable-versus-disposable nappy debate often turns on a single figure meant to crown a winner. That is the wrong angle: the two do not have the same shape of cost, and it is that shape, more than the total, that decides what suits you.',
          'No prices here, no brand or model: totals depend too much on your habits. The structure of the cost, however, is clear.',
        ],
      },
      {
        type: 'text',
        title: 'Two shapes of spending, not two prices',
        paragraphs: [
          'Disposables are a recurring cost: a steady weekly budget for the whole nappy period, plus their share of the household\'s waste. It is a smoothed sum, painless at purchase, heavy over time.',
          'Reusables flip the curve: a large upfront purchase to build the stock, then a lower recurring cost of water, electricity and detergent. Part of it is recovered by reuse for a second child and by second-hand resale.',
        ],
      },
      {
        type: 'text',
        title: 'The subsidy almost nobody claims',
        paragraphs: [
          'Many local authorities, towns, inter-municipal bodies or waste syndicates, grant a subsidy towards buying reusable nappies, often as a capped grant conditioned on a minimum set. ADEME lists these schemes on [its portal](https://optigede.ademe.fr/couches-lavables).',
          'Two honest clarifications: this aid is local, never national, and there is no CAF "nappy grant". The right move is to ask your town or your waste syndicate what they offer before buying.',
        ],
      },
      {
        type: 'text',
        title: 'What really tips the balance',
        paragraphs: [
          'Three things, and none is the price of the pack: do you have a washing machine and space to dry, do you plan several children, and can you handle a slightly more demanding daily routine. A "yes" to all three makes reusables clearly more attractive.',
          'Many families choose a mix: reusables at home, disposables for outings and the crèche. The calculation is not binary, and it is often the mix that costs least without weighing on the days.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Disposables: recurring cost, smoothed weekly, across the whole period',
          'Reusables: large upfront purchase, then water, electricity and detergent',
          'Reusables: part is recovered (second child, resale)',
          'Subsidy: local, via authorities, never the CAF, to ask about before buying',
          'Mixed choice: reusables at home, disposables for outings, often cheapest',
        ],
      },
      {
        type: 'quote',
        quote:
          'The right question is not "which costs less", but "which shape of cost suits you": a spend that returns every week, or a big purchase that pays off over time.',
      },
    ],
  }),
];

export const { fr: POSTS_GAP3_FR, en: POSTS_GAP3_EN } = pairsToArrays(pairs);
