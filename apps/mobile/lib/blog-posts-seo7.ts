/**
 * SEO batch 7 — situations spécifiques (les cas que la fiche générale n'aborde pas).
 *
 * Same house rules. Verified against ameli, service-public, cleiss, caf, urssaf and
 * fonction-publique. No euro amounts or rates that revalorise. The parent-étranger and
 * mineure-enceinte pieces are handled with particular care: factual, no false hope, framed
 * as rights/where-to-turn, never medical advice.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'auto-entrepreneur-grossesse-indemnites',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Auto-entrepreneuse enceinte : les indemnités de maternité',
    titleEn: 'Self-employed and pregnant: maternity benefits for a micro-entrepreneur',
    excerptFr:
      'Une auto-entrepreneuse a droit à la maternité, avec deux aides et une condition : cesser réellement son activité. Voici comment cela fonctionne pour une micro-entreprise.',
    excerptEn:
      'A micro-entrepreneur is entitled to maternity cover, with two benefits and one condition: actually stopping work. Here is how it works.',
    readingMinutes: 3,
    heroAltFr: 'Les indemnités de maternité d’une auto-entrepreneuse',
    heroAltEn: 'Maternity benefits for a self-employed woman',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Beaucoup d’auto-entrepreneuses croient qu’elles n’ont aucun droit à la maternité. C’est faux : le régime existe, avec des règles propres à la micro-entreprise. Le connaître évite de renoncer à des sommes auxquelles on a droit.',
          'Comme pour toutes les indépendantes, deux aides coexistent, et une condition les encadre.',
        ],
      },
      {
        type: 'text',
        title: 'Deux aides, une condition',
        paragraphs: [
          'Il y a d’un côté l’allocation forfaitaire de repos maternel, versée en deux fois, et de l’autre des indemnités journalières forfaitaires, selon [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/prestations-maternite-independantes-conjointes-collaboratric). Les deux se cumulent.',
          'La condition pour les indemnités journalières est de cesser toute activité pendant au moins huit semaines, dont au moins six après l’accouchement. Ces indemnités remplacent un revenu, elles ne s’ajoutent pas à une activité poursuivie.',
        ],
      },
      {
        type: 'text',
        title: 'Le cas particulier du chiffre d’affaires faible',
        paragraphs: [
          'Un point propre à la micro-entreprise : le montant des indemnités est reconstitué à partir du chiffre d’affaires, après application de l’abattement forfaitaire du régime. En dessous d’un certain seuil annuel de revenu, les indemnités journalières sont réduites à un montant plancher.',
          'Les montants se révisent et se lisent sur ameli. Ce qui est stable, c’est la logique : un chiffre d’affaires très faible donne des indemnités minorées, mais des droits maintenus.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Allocation forfaitaire de repos maternel, versée en deux fois',
          'Indemnités journalières forfaitaires, cumulables avec l’allocation',
          'Condition : cesser toute activité au moins 8 semaines, dont 6 après l’accouchement',
          'Montant reconstitué à partir du chiffre d’affaires après abattement',
          'Chiffre d’affaires très faible : indemnités réduites à un plancher',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Many self-employed women believe they have no maternity rights. That is false: the scheme exists, with rules specific to the micro-enterprise. Knowing it avoids giving up sums you are entitled to.',
          'As for all self-employed women, two benefits coexist, and one condition frames them.',
        ],
      },
      {
        type: 'text',
        title: 'Two benefits, one condition',
        paragraphs: [
          'On one side there is the flat-rate maternity rest allowance, paid in two instalments, and on the other flat-rate daily allowances, according to [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/prestations-maternite-independantes-conjointes-collaboratric). The two combine.',
          'The condition for the daily allowances is to cease all activity for at least eight weeks, of which at least six after the birth. These allowances replace an income, they do not add to continued work.',
        ],
      },
      {
        type: 'text',
        title: 'The special case of low turnover',
        paragraphs: [
          'A point specific to the micro-enterprise: the allowance amount is rebuilt from turnover, after the scheme\'s flat deduction. Below a certain annual income threshold, the daily allowances are reduced to a floor amount.',
          'Amounts are revised and read on ameli. What is stable is the logic: very low turnover gives reduced allowances, but maintained rights.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Flat-rate maternity rest allowance, paid in two instalments',
          'Flat-rate daily allowances, combinable with the allowance',
          'Condition: cease all activity for at least 8 weeks, of which 6 after the birth',
          'Amount rebuilt from turnover after the flat deduction',
          'Very low turnover: allowances reduced to a floor',
        ],
      },
    ],
  }),

  postPair({
    slug: 'frontalier-suisse-conge-maternite-allocations',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Travailleuse frontalière en Suisse : congé maternité et allocations',
    titleEn: 'Cross-border worker in Switzerland: maternity leave and benefits',
    excerptFr:
      'Frontalière en Suisse, vous relevez de deux systèmes. Les indemnités de maternité suivent le pays où vous travaillez ; les allocations familiales obéissent à une règle de priorité.',
    excerptEn:
      'As a cross-border worker in Switzerland, you fall under two systems. Maternity benefits follow the country where you work; family allowances follow a priority rule.',
    readingMinutes: 4,
    heroAltFr: 'Congé maternité d’une frontalière en Suisse',
    heroAltEn: 'Maternity leave for a cross-border worker in Switzerland',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Être frontalière en Suisse et enceinte, c’est se retrouver à cheval sur deux systèmes de protection sociale. La confusion est fréquente, parce que la couverture santé et les indemnités ne suivent pas forcément le même pays.',
          'Trois questions se distinguent : les soins, les indemnités de maternité, et les allocations familiales.',
        ],
      },
      {
        type: 'text',
        title: 'Soins et indemnités ne suivent pas la même logique',
        paragraphs: [
          'Le droit d’option, entre l’assurance suisse et l’assurance française, ne concerne que le remboursement des soins. Il s’exerce dans les trois mois de la prise d’activité et est en principe irrévocable, selon [cleiss.fr](https://www.cleiss.fr/faq/droit_d_option_des_frontaliers_france-suisse.html).',
          'Les indemnités de maternité, elles, suivent le pays où vous travaillez, donc la Suisse, quel que soit le choix fait pour la santé. C’est la distinction la plus importante à retenir.',
        ],
      },
      {
        type: 'text',
        title: 'Les allocations familiales : une règle de priorité',
        paragraphs: [
          'Pour les allocations familiales, un pays est prioritaire. Si les deux parents travaillent en Suisse, la Suisse est prioritaire ; si un parent a une activité ou des revenus en France, la France le devient, selon [caf.fr](https://www.caf.fr/allocataires/caf-de-l-ain/offre-de-service/vie-personnelle/vous-etes-frontalier).',
          'Le pays non prioritaire verse un complément si ses prestations seraient plus élevées. En pratique, il faut déposer une demande dans les deux pays pour que la coordination joue.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Droit d’option (santé) : à exercer dans les 3 mois, en principe irrévocable',
          'Indemnités de maternité : suivent le pays de travail, la Suisse',
          'Allocations familiales : un pays prioritaire selon où travaillent les parents',
          'Le pays non prioritaire verse un complément différentiel',
          'Déposer une demande dans les deux pays',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Being a cross-border worker in Switzerland and pregnant means straddling two social-protection systems. The confusion is common, because health cover and cash benefits do not necessarily follow the same country.',
          'Three questions stand apart: care, maternity benefits, and family allowances.',
        ],
      },
      {
        type: 'text',
        title: 'Care and benefits follow different logics',
        paragraphs: [
          'The right of option, between Swiss and French insurance, concerns only the reimbursement of care. It is exercised within three months of starting work and is in principle irrevocable, according to [cleiss.fr](https://www.cleiss.fr/faq/droit_d_option_des_frontaliers_france-suisse.html).',
          'Maternity benefits, on the other hand, follow the country where you work, so Switzerland, whatever the choice made for health. It is the most important distinction to remember.',
        ],
      },
      {
        type: 'text',
        title: 'Family allowances: a priority rule',
        paragraphs: [
          'For family allowances, one country is the priority payer. If both parents work in Switzerland, Switzerland is the priority; if one parent has activity or income in France, France becomes it, according to [caf.fr](https://www.caf.fr/allocataires/caf-de-l-ain/offre-de-service/vie-personnelle/vous-etes-frontalier).',
          'The non-priority country pays a top-up if its benefits would be higher. In practice, you must file a claim in both countries for the coordination to work.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Right of option (health): to exercise within 3 months, in principle irrevocable',
          'Maternity benefits: follow the country of work, Switzerland',
          'Family allowances: one priority country, based on where the parents work',
          'The non-priority country pays a differential top-up',
          'File a claim in both countries',
        ],
      },
    ],
  }),

  postPair({
    slug: 'etudiante-enceinte-droits-examens-bourse',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Étudiante enceinte : droits, aménagement des examens et accompagnement',
    titleEn: 'Pregnant student: rights, exam arrangements and support',
    excerptFr:
      'Une étudiante enceinte garde ses droits et peut obtenir des aménagements pour ses examens. La couverture santé est acquise ; les indemnités, elles, supposent une activité salariée.',
    excerptEn:
      'A pregnant student keeps her rights and can get exam arrangements. Health cover is granted; cash benefits, though, require salaried work.',
    readingMinutes: 3,
    heroAltFr: 'Les droits d’une étudiante enceinte',
    heroAltEn: 'The rights of a pregnant student',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une grossesse pendant les études soulève des questions concrètes : suis-je couverte, puis-je aménager mes examens, à qui m’adresser. Les réponses sont plutôt rassurantes, à condition de distinguer deux choses souvent confondues.',
          'La couverture des soins et les indemnités ne suivent pas la même logique.',
        ],
      },
      {
        type: 'text',
        title: 'Soins couverts, indemnités sous condition',
        paragraphs: [
          'Depuis 2019, il n’y a plus de régime étudiant distinct : l’étudiante relève du régime général, et ses soins liés à la grossesse sont couverts. En revanche, les indemnités journalières de maternité supposent une activité salariée préalable ; un statut purement étudiant, sans emploi, n’y ouvre pas droit, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2325).',
          'Autrement dit, la prise en charge des soins est acquise, mais le remplacement d’un revenu suppose d’en avoir eu un.',
        ],
      },
      {
        type: 'text',
        title: 'Des aménagements, et à qui s’adresser',
        paragraphs: [
          'Une étudiante enceinte peut obtenir des aménagements : temps de repos, absences autorisées pour les rendez-vous médicaux, adaptation ou report d’examens, organisés avec l’établissement.',
          'Le bon interlocuteur est le service de santé de l’établissement, infirmerie, médecin ou assistant social. C’est lui qui met en place l’accompagnement et oriente vers les aides adaptées, y compris pour les questions de bourse, à voir avec le service social.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Depuis 2019 : régime général, soins de grossesse couverts',
          'Indemnités de maternité : seulement avec une activité salariée préalable',
          'Aménagements possibles : repos, absences, report d’examens',
          'Interlocuteur : le service de santé de l’établissement',
          'Questions de bourse : à voir avec le service social',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pregnancy during studies raises concrete questions: am I covered, can I adjust my exams, who do I turn to. The answers are rather reassuring, provided you distinguish two things often confused.',
          'Care cover and cash benefits do not follow the same logic.',
        ],
      },
      {
        type: 'text',
        title: 'Care covered, benefits conditional',
        paragraphs: [
          'Since 2019 there is no separate student scheme: a student comes under the general scheme, and her pregnancy-related care is covered. However, maternity daily allowances require prior salaried activity; a purely student status, with no job, does not open the right to them, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2325).',
          'In other words, care cover is granted, but replacing an income requires having had one.',
        ],
      },
      {
        type: 'text',
        title: 'Arrangements, and who to turn to',
        paragraphs: [
          'A pregnant student can obtain arrangements: rest time, authorised absences for medical appointments, exam adjustment or deferral, organised with the establishment.',
          'The right contact is the establishment\'s health service, the infirmary, a doctor or a social worker. They set up the support and point you to the right help, including on scholarship questions, to see with the social service.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Since 2019: general scheme, pregnancy care covered',
          'Maternity benefits: only with prior salaried activity',
          'Possible arrangements: rest, absences, exam deferral',
          'Contact: the establishment\'s health service',
          'Scholarship questions: to see with the social service',
        ],
      },
    ],
  }),

  postPair({
    slug: 'couple-non-marie-autorite-parentale',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Couple non marié : qui exerce l’autorité parentale',
    titleEn: 'Unmarried couple: who holds parental authority',
    excerptFr:
      'Pour un couple non marié, l’autorité parentale conjointe est automatique si les deux filiations sont établies dans la première année. Au-delà, elle ne l’est plus.',
    excerptEn:
      'For an unmarried couple, joint parental authority is automatic if both filiations are established in the first year. After that, it no longer is.',
    readingMinutes: 3,
    heroAltFr: 'L’autorité parentale dans un couple non marié',
    heroAltEn: 'Parental authority in an unmarried couple',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Pour un couple marié, l’autorité parentale conjointe va de soi. Pour un couple non marié, elle dépend d’une condition de calendrier que beaucoup de parents ignorent, et qui peut avoir des conséquences durables.',
          'Tout se joue autour de la première année de l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'La règle de la première année',
        paragraphs: [
          'L’autorité parentale est exercée en commun de façon automatique lorsque les deux filiations sont établies dans la première année de l’enfant, que ce soit avant la naissance ou pendant cette première année, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F942).',
          'Rappel utile pour un couple non marié : la filiation maternelle découle de l’acte de naissance, mais celle du second parent suppose une reconnaissance. C’est la date de cette reconnaissance qui compte.',
        ],
      },
      {
        type: 'text',
        title: 'Au-delà d’un an, ce n’est plus automatique',
        paragraphs: [
          'Si la filiation du second parent est établie plus d’un an après la naissance, l’autorité parentale n’est plus conjointe de plein droit : le premier parent en reste seul titulaire.',
          'Il reste possible de rétablir l’exercice conjoint, par une déclaration conjointe des deux parents, ou, à défaut d’accord, par une décision du juge aux affaires familiales. Mais cela demande une démarche, là où la première année l’accordait sans rien faire.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Filiations établies dans la 1re année : autorité parentale conjointe automatique',
          'Mère : filiation par l’acte de naissance ; second parent : reconnaissance',
          'Au-delà d’un an : le premier parent reste seul titulaire',
          'Rétablir l’exercice conjoint : déclaration conjointe ou juge aux affaires familiales',
          'La date de la reconnaissance est déterminante',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'For a married couple, joint parental authority is a given. For an unmarried couple, it depends on a timing condition many parents do not know, and which can have lasting consequences.',
          'It all turns on the child\'s first year.',
        ],
      },
      {
        type: 'text',
        title: 'The first-year rule',
        paragraphs: [
          'Parental authority is exercised jointly and automatically when both filiations are established in the child\'s first year, whether before the birth or during that first year, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F942).',
          'A useful reminder for an unmarried couple: maternal filiation follows from the birth certificate, but the second parent\'s requires a recognition. It is the date of that recognition that counts.',
        ],
      },
      {
        type: 'text',
        title: 'After one year, it is no longer automatic',
        paragraphs: [
          'If the second parent\'s filiation is established more than a year after the birth, parental authority is no longer joint as of right: the first parent remains its sole holder.',
          'It is still possible to restore joint exercise, by a joint declaration of both parents, or, failing agreement, by a decision of the family court. But that requires a step, where the first year granted it with nothing to do.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Filiations established in the 1st year: automatic joint parental authority',
          'Mother: filiation via the birth certificate; second parent: recognition',
          'After one year: the first parent remains sole holder',
          'Restore joint exercise: joint declaration or the family court',
          'The date of the recognition is decisive',
        ],
      },
    ],
  }),

  postPair({
    slug: 'famille-recomposee-declarer-enfants-caf-impots',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Famille recomposée : déclarer les enfants à la CAF et aux impôts',
    titleEn: 'Blended family: declaring the children to the CAF and the tax office',
    excerptFr:
      'La CAF et les impôts ne comptent pas les enfants de la même façon. La CAF regarde la charge réelle, les impôts la situation juridique du couple. Voici comment déclarer sans erreur.',
    excerptEn:
      'The CAF and the tax office do not count children the same way. The CAF looks at real dependency, tax at the couple’s legal status. Here is how to declare correctly.',
    readingMinutes: 3,
    heroAltFr: 'Déclarer les enfants d’une famille recomposée',
    heroAltEn: 'Declaring the children of a blended family',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Dans une famille recomposée, une même question, « quels enfants déclarer », reçoit deux réponses différentes selon qu’on s’adresse à la CAF ou aux impôts. C’est la source de confusion la plus fréquente, et elle se dissipe une fois la logique comprise.',
          'La CAF raisonne en charge réelle, les impôts en situation juridique.',
        ],
      },
      {
        type: 'text',
        title: 'La CAF regarde la charge effective',
        paragraphs: [
          'Pour la CAF, un enfant est à charge si vous en assumez la charge effective et permanente, logement, nourriture, éducation, sans qu’une adoption ou une filiation soit nécessaire, selon [caf.fr](https://www.caf.fr/allocataires/vies-de-famille/articles/les-aides-aux-familles-recomposees-mode-d-emploi). L’enfant du conjoint peut donc compter.',
          'Tout changement dans le foyer, arrivée d’un conjoint, d’un enfant, doit être déclaré à la CAF sans tarder, même s’il est déjà connu ailleurs.',
        ],
      },
      {
        type: 'text',
        title: 'Les impôts regardent le couple',
        paragraphs: [
          'Côté impôts, un couple marié ou pacsé forme un seul foyer fiscal, soit deux parts, tandis que des concubins sont imposés séparément, chacun son foyer, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2705).',
          'Les enfants à charge ajoutent des parts, une demi-part pour chacun des deux premiers, une part à partir du troisième, avec un avantage plafonné. Un enfant du conjoint ne compte dans le foyer fiscal que s’il y est légalement à charge.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'CAF : enfant à charge selon la charge effective et permanente',
          'Déclarer tout changement de foyer à la CAF sans tarder',
          'Impôts : couple marié ou pacsé = un foyer fiscal, concubins imposés séparément',
          'Enfants à charge : parts supplémentaires, avantage plafonné',
          'Enfant du conjoint : compté au fiscal seulement s’il y est légalement à charge',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'In a blended family, one question, "which children to declare", gets two different answers depending on whether you address the CAF or the tax office. It is the most common source of confusion, and it clears up once the logic is understood.',
          'The CAF reasons in real dependency, tax in legal status.',
        ],
      },
      {
        type: 'text',
        title: 'The CAF looks at effective dependency',
        paragraphs: [
          'For the CAF, a child is dependent if you bear their effective and permanent charge, housing, food, education, without adoption or filiation being necessary, according to [caf.fr](https://www.caf.fr/allocataires/vies-de-famille/articles/les-aides-aux-familles-recomposees-mode-d-emploi). A partner\'s child can therefore count.',
          'Any change in the household, a partner or a child arriving, must be declared to the CAF without delay, even if already known elsewhere.',
        ],
      },
      {
        type: 'text',
        title: 'Tax looks at the couple',
        paragraphs: [
          'On the tax side, a married or civil-partnered couple forms a single tax household, meaning two shares, while cohabiting partners are taxed separately, each their own household, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2705).',
          'Dependent children add shares, a half-share for each of the first two, a full share from the third, with a capped advantage. A partner\'s child only counts in the tax household if legally dependent there.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'CAF: child dependent by effective and permanent charge',
          'Declare any household change to the CAF without delay',
          'Tax: married/civil-partnered couple = one household, cohabitants taxed separately',
          'Dependent children: extra shares, capped advantage',
          'A partner\'s child: counted for tax only if legally dependent there',
        ],
      },
    ],
  }),

  postPair({
    slug: 'residence-alternee-allocations-partage',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Résidence alternée : le partage des allocations familiales',
    titleEn: 'Alternating residence: sharing the family allowances',
    excerptFr:
      'En résidence alternée, seules les allocations familiales se partagent entre les deux parents. Les autres prestations vont à un seul. Voici la règle et comment la déclarer.',
    excerptEn:
      'In alternating residence, only the family allowances are split between the two parents. Other benefits go to one. Here is the rule and how to declare it.',
    readingMinutes: 3,
    heroAltFr: 'Le partage des allocations en résidence alternée',
    heroAltEn: 'Sharing allowances in alternating residence',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La résidence alternée pose une question pratique : qui touche les allocations. La réponse est plus nuancée qu’un simple partage, et mieux vaut la connaître pour éviter les tensions et les indus.',
          'Une seule prestation se partage réellement.',
        ],
      },
      {
        type: 'text',
        title: 'Seules les allocations familiales se partagent',
        paragraphs: [
          'Seules les allocations familiales peuvent être partagées entre les deux parents ; les autres prestations, comme la PAJE ou le complément familial, sont versées en totalité à un seul parent désigné, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F21248).',
          'Si le partage est choisi, chaque parent reçoit la moitié des allocations familiales. Ce n’est donc pas l’ensemble des aides qui se coupe en deux, mais cette prestation précise.',
        ],
      },
      {
        type: 'text',
        title: 'Comment déclarer, et en cas de désaccord',
        paragraphs: [
          'Le choix se déclare à la CAF au moyen d’un formulaire dédié. Il ne peut pas être modifié pendant un an, sauf si l’organisation de la résidence des enfants change elle-même.',
          'Et si les parents ne s’entendent pas ? La CAF est alors tenue de partager les allocations familiales par défaut. Le désaccord ne bloque donc pas le versement : il déclenche le partage automatique.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Seules les allocations familiales se partagent',
          'Autres prestations (PAJE, complément familial) : versées à un seul parent',
          'Partage choisi : chaque parent reçoit la moitié des allocations familiales',
          'Déclaration à la CAF par formulaire, choix figé pendant un an',
          'En cas de désaccord : partage automatique par la CAF',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Alternating residence raises a practical question: who receives the allowances. The answer is more nuanced than a simple split, and it is better to know it to avoid tension and overpayments.',
          'Only one benefit is actually shared.',
        ],
      },
      {
        type: 'text',
        title: 'Only family allowances are shared',
        paragraphs: [
          'Only the family allowances can be shared between the two parents; other benefits, such as the Paje or the family supplement, are paid in full to one designated parent, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F21248).',
          'If sharing is chosen, each parent receives half the family allowances. So it is not the whole set of benefits that is cut in two, but this specific one.',
        ],
      },
      {
        type: 'text',
        title: 'How to declare, and in case of disagreement',
        paragraphs: [
          'The choice is declared to the CAF using a dedicated form. It cannot be changed for a year, unless the children\'s residence arrangement itself changes.',
          'And if the parents do not agree? The CAF is then required to split the family allowances by default. Disagreement therefore does not block payment: it triggers the automatic split.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Only family allowances are shared',
          'Other benefits (Paje, family supplement): paid to one parent',
          'Sharing chosen: each parent receives half the family allowances',
          'Declaration to the CAF by form, choice fixed for a year',
          'In case of disagreement: automatic split by the CAF',
        ],
      },
    ],
  }),

  postPair({
    slug: 'parent-etranger-naissance-france-titre-sejour',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Parent étranger : naissance en France et titre de séjour',
    titleEn: 'Foreign parent: a birth in France and a residence permit',
    excerptFr:
      'Une naissance en France ne donne pas automatiquement de titre de séjour au parent, ni la nationalité française à l’enfant. Voici ce que dit vraiment le droit, sans fausse promesse.',
    excerptEn:
      'A birth in France does not automatically give the parent a residence permit, nor French nationality to the child. Here is what the law actually says, without false promises.',
    readingMinutes: 3,
    heroAltFr: 'Parent étranger et naissance en France',
    heroAltEn: 'Foreign parent and a birth in France',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Autour d’une naissance en France pour des parents étrangers circulent beaucoup d’idées reçues, dans les deux sens. Il vaut mieux partir de ce que dit le droit, sans dramatiser ni promettre.',
          'Deux questions se distinguent : le titre de séjour du parent, et la nationalité de l’enfant.',
        ],
      },
      {
        type: 'text',
        title: 'Pas de titre de séjour automatique',
        paragraphs: [
          'Une naissance en France ne donne aucun titre de séjour automatique au parent étranger. Être parent d’un enfant français peut ouvrir un titre « vie privée et familiale », mais sous conditions, et cela n’a rien d’automatique, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2209).',
          'La régularisation est appréciée au cas par cas, selon la réalité et la stabilité des liens familiaux. La préfecture peut refuser. Mieux vaut le savoir que de compter sur une garantie qui n’existe pas.',
        ],
      },
      {
        type: 'text',
        title: 'L’enfant n’est pas français par le seul fait de naître en France',
        paragraphs: [
          'Un enfant né en France de parents étrangers n’est pas automatiquement français à la naissance, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F295). Il le devient toutefois si au moins un de ses parents est lui aussi né en France : c’est le double droit du sol.',
          'À défaut, l’enfant peut acquérir la nationalité française plus tard, en général à sa majorité, ou dès 13 ou 16 ans sur demande, sous condition de résidence habituelle en France.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Naissance en France : aucun titre de séjour automatique pour le parent',
          'Parent d’un enfant français : titre possible sous conditions, non automatique',
          'Régularisation appréciée au cas par cas, refus possible',
          'Enfant : pas français par le seul fait de naître en France',
          'Double droit du sol : français à la naissance si un parent est né en France',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Around a birth in France for foreign parents circulate many misconceptions, in both directions. It is better to start from what the law says, without dramatising or promising.',
          'Two questions stand apart: the parent\'s residence permit, and the child\'s nationality.',
        ],
      },
      {
        type: 'text',
        title: 'No automatic residence permit',
        paragraphs: [
          'A birth in France gives the foreign parent no automatic residence permit. Being the parent of a French child can open a "private and family life" permit, but under conditions, and it is in no way automatic, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2209).',
          'Regularisation is assessed case by case, on the reality and stability of the family ties. The prefecture can refuse. Better to know it than to rely on a guarantee that does not exist.',
        ],
      },
      {
        type: 'text',
        title: 'The child is not French merely for being born in France',
        paragraphs: [
          'A child born in France to foreign parents is not automatically French at birth, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F295). They do become so, however, if at least one parent was also born in France: this is the double jus soli.',
          'Otherwise the child can acquire French nationality later, generally at adulthood, or from 13 or 16 on request, subject to habitual residence in France.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Birth in France: no automatic residence permit for the parent',
          'Parent of a French child: possible permit under conditions, not automatic',
          'Regularisation assessed case by case, refusal possible',
          'Child: not French merely for being born in France',
          'Double jus soli: French at birth if one parent was born in France',
        ],
      },
    ],
  }),

  postPair({
    slug: 'fonctionnaire-supplement-familial-traitement',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'Fonctionnaire : le supplément familial de traitement',
    titleEn: 'Civil servant: the family salary supplement',
    excerptFr:
      'Les agents publics touchent un supplément de salaire dès le premier enfant, le supplément familial de traitement. Il combine une part fixe et une part proportionnelle.',
    excerptEn:
      'Public agents receive a salary supplement from the first child, the family salary supplement. It combines a fixed part and a proportional part.',
    readingMinutes: 3,
    heroAltFr: 'Le supplément familial de traitement',
    heroAltEn: 'The family salary supplement',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les agents publics disposent d’un avantage familial que le privé ne connaît pas sous cette forme : le supplément familial de traitement. Il s’ajoute au salaire dès le premier enfant, et pourtant beaucoup d’agents ignorent son fonctionnement.',
          'Sa logique combine deux parts, ce qui explique qu’il augmente surtout avec le nombre d’enfants.',
        ],
      },
      {
        type: 'text',
        title: 'Dès le premier enfant, en deux parts',
        paragraphs: [
          'Le supplément familial de traitement est versé à tout agent public, titulaire ou contractuel, ayant au moins un enfant à charge de moins de vingt ans, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32513). Il est ouvert dès le premier enfant.',
          'Il se compose d’une part fixe et d’une part proportionnelle, calculée sur le traitement indiciaire. Pour un seul enfant, c’est en pratique surtout la part fixe qui s’applique ; la part proportionnelle prend de l’ampleur à partir de deux enfants.',
        ],
      },
      {
        type: 'text',
        title: 'Un seul versement pour un couple d’agents',
        paragraphs: [
          'Si les deux parents sont agents publics, le supplément n’est versé qu’à l’un d’eux, choisi par une déclaration commune. On ne le touche pas deux fois.',
          'Les montants se révisent et se vérifient sur les sites officiels. Ce qui est stable, c’est le principe : un supplément dès le premier enfant, en deux parts, non cumulable au sein d’un couple d’agents.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour tout agent public, titulaire ou contractuel, avec un enfant de moins de 20 ans',
          'Versé dès le premier enfant',
          'Deux parts : une part fixe et une part proportionnelle au traitement',
          'Un seul enfant : surtout la part fixe',
          'Couple d’agents : versé à un seul, par déclaration commune',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Public agents have a family benefit the private sector does not know in this form: the family salary supplement. It adds to the salary from the first child, and yet many agents do not know how it works.',
          'Its logic combines two parts, which is why it rises mainly with the number of children.',
        ],
      },
      {
        type: 'text',
        title: 'From the first child, in two parts',
        paragraphs: [
          'The family salary supplement is paid to any public agent, established or contract, with at least one dependent child under twenty, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F32513). It opens from the first child.',
          'It consists of a fixed part and a proportional part, calculated on the index salary. For a single child, in practice it is mainly the fixed part that applies; the proportional part grows from two children.',
        ],
      },
      {
        type: 'text',
        title: 'A single payment for a couple of agents',
        paragraphs: [
          'If both parents are public agents, the supplement is paid to only one of them, chosen by a joint declaration. You do not receive it twice.',
          'Amounts are revised and checked on the official sites. What is stable is the principle: a supplement from the first child, in two parts, not combinable within a couple of agents.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'For any public agent, established or contract, with a child under 20',
          'Paid from the first child',
          'Two parts: a fixed part and a part proportional to the salary',
          'A single child: mainly the fixed part',
          'Couple of agents: paid to one only, by joint declaration',
        ],
      },
    ],
  }),

  postPair({
    slug: 'avpf-parent-au-foyer-trimestres-retraite',
    categoryKey: 'budget',
    categoryFr: 'Budget',
    categoryEn: 'Budget',
    titleFr: 'AVPF : valider des trimestres de retraite en restant au foyer',
    titleEn: 'Home-parent pension insurance: earning retirement quarters while at home',
    excerptFr:
      'S’arrêter ou réduire son activité pour élever un enfant peut continuer à compter pour la retraite. L’AVPF, souvent automatique, cotise à votre place, sous condition de ressources.',
    excerptEn:
      'Stopping or reducing work to raise a child can still count for your pension. This scheme, often automatic, contributes for you, subject to income.',
    readingMinutes: 3,
    heroAltFr: 'L’assurance vieillesse du parent au foyer',
    heroAltEn: 'Home-parent pension insurance',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'S’arrêter de travailler ou réduire son activité pour élever un enfant fait souvent craindre un trou dans la retraite. Un dispositif discret limite ce risque : l’assurance vieillesse du parent au foyer, l’AVPF.',
          'Son intérêt est double : elle est protectrice, et le plus souvent automatique.',
        ],
      },
      {
        type: 'text',
        title: 'La CAF cotise à votre place',
        paragraphs: [
          'L’AVPF permet de valider des trimestres de retraite pour une personne qui cesse ou réduit son activité pour élever un enfant : c’est la CAF qui verse la cotisation vieillesse à votre place, selon [caf.fr](https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-aides/petite-enfance/assurance-vieillesse-du-parent-au-foyer-avpf).',
          'Concrètement, la période passée à s’occuper de l’enfant continue de compter pour la retraite, alors même qu’aucun salaire n’est perçu. C’est ce qui en fait un filet précieux.',
        ],
      },
      {
        type: 'text',
        title: 'Rattachée à certaines aides, sous condition de ressources',
        paragraphs: [
          'L’AVPF est liée au versement de certaines prestations de la CAF, sous condition de ressources : l’allocation de base de la PAJE, la PreParE, les allocations familiales ou l’allocation journalière de présence parentale.',
          'Bonne nouvelle : l’affiliation est automatique dès que les conditions sont réunies. Il n’y a en général aucune démarche à faire, la CAF s’en charge.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Valide des trimestres de retraite en cas d’arrêt ou de réduction d’activité',
          'La CAF verse la cotisation vieillesse à votre place',
          'Rattachée à certaines prestations (allocation de base, PreParE, etc.)',
          'Sous condition de ressources',
          'Affiliation automatique, sans démarche en général',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Stopping work or reducing your activity to raise a child often raises the fear of a gap in your pension. A quiet scheme limits that risk: home-parent pension insurance.',
          'Its value is twofold: it is protective, and most often automatic.',
        ],
      },
      {
        type: 'text',
        title: 'The CAF contributes for you',
        paragraphs: [
          'This scheme lets you earn retirement quarters when you stop or reduce your activity to raise a child: it is the CAF that pays the pension contribution for you, according to [caf.fr](https://www.caf.fr/allocataires/droits-et-prestations/s-informer-sur-les-aides/petite-enfance/assurance-vieillesse-du-parent-au-foyer-avpf).',
          'In practice, the period spent looking after the child continues to count for your pension, even though no salary is received. That is what makes it a precious safety net.',
        ],
      },
      {
        type: 'text',
        title: 'Tied to certain benefits, subject to income',
        paragraphs: [
          'It is linked to receiving certain CAF benefits, subject to income: the Paje base benefit, the shared child-raising benefit, family allowances or the daily parental-presence allowance.',
          'Good news: affiliation is automatic as soon as the conditions are met. There is generally no step to take, the CAF handles it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Earns retirement quarters when you stop or reduce activity',
          'The CAF pays the pension contribution for you',
          'Tied to certain benefits (base benefit, shared child-raising benefit, etc.)',
          'Subject to income',
          'Automatic affiliation, generally no step to take',
        ],
      },
    ],
  }),

  postPair({
    slug: 'mineure-enceinte-droits-accompagnement',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Mineure enceinte : droits, confidentialité et accompagnement',
    titleEn: 'Pregnant minor: rights, confidentiality and support',
    excerptFr:
      'Une mineure enceinte a des droits et des interlocuteurs dédiés. La confidentialité peut être demandée, et des lieux comme la PMI accompagnent gratuitement, quelle que soit la décision.',
    excerptEn:
      'A pregnant minor has rights and dedicated contacts. Confidentiality can be requested, and places like the PMI offer free support, whatever the decision.',
    readingMinutes: 3,
    heroAltFr: 'Les droits d’une mineure enceinte',
    heroAltEn: 'The rights of a pregnant minor',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une grossesse à l’adolescence est une situation où l’information et l’accompagnement comptent plus que tout. Cet article ne dit pas quoi décider : il rappelle les droits et les lieux vers qui se tourner, en toute confidentialité.',
          'La première chose à savoir, c’est qu’on n’est jamais seule face à cette situation.',
        ],
      },
      {
        type: 'text',
        title: 'La confidentialité, un droit',
        paragraphs: [
          'La confidentialité peut être demandée à chaque professionnel de santé rencontré. Les mineures peuvent notamment accéder à une contraception gratuite et anonyme dans les centres de santé sexuelle, selon [ameli.fr](https://www.ameli.fr/assure/sante/assurance-maladie/prevention-depistages/contraception-gratuite-anonyme-mineures).',
          'Certains actes de santé sont ainsi protégés, sans que l’autorité parentale y fasse obstacle. Ce n’est pas une levée générale de cette autorité, mais des exceptions précises, pensées pour protéger la jeune fille.',
        ],
      },
      {
        type: 'text',
        title: 'Des interlocuteurs dédiés, gratuits',
        paragraphs: [
          'La PMI assure un suivi et un accompagnement gratuits des femmes enceintes, y compris mineures. Le service de santé de l’établissement scolaire, un planning familial ou un centre de santé sexuelle sont aussi des portes d’entrée, sans jugement.',
          'Une mineure enceinte conserve par ailleurs son droit à la scolarité, avec des aménagements organisés avec l’établissement. Quelle que soit la voie choisie, un accompagnement existe, et il commence par un simple contact.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'La confidentialité peut être demandée à chaque professionnel',
          'Contraception gratuite et anonyme pour les mineures',
          'Certains actes de santé protégés, sans lever l’autorité parentale en général',
          'PMI, planning familial, centre de santé sexuelle : accompagnement gratuit',
          'Droit à la scolarité maintenu, avec aménagements',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A pregnancy in adolescence is a situation where information and support matter more than anything. This article does not say what to decide: it recalls the rights and the places to turn to, in full confidence.',
          'The first thing to know is that you are never alone facing this situation.',
        ],
      },
      {
        type: 'text',
        title: 'Confidentiality, a right',
        paragraphs: [
          'Confidentiality can be requested from each health professional met. Minors can in particular access free, anonymous contraception in sexual-health centres, according to [ameli.fr](https://www.ameli.fr/assure/sante/assurance-maladie/prevention-depistages/contraception-gratuite-anonyme-mineures).',
          'Certain health acts are thus protected, without parental authority standing in the way. It is not a general lifting of that authority, but precise exceptions, designed to protect the young woman.',
        ],
      },
      {
        type: 'text',
        title: 'Dedicated, free contacts',
        paragraphs: [
          'The PMI provides free follow-up and support for pregnant women, including minors. The school\'s health service, a family-planning centre or a sexual-health centre are also entry points, without judgement.',
          'A pregnant minor also keeps her right to schooling, with arrangements organised with the establishment. Whatever the path chosen, support exists, and it begins with a simple contact.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Confidentiality can be requested from each professional',
          'Free, anonymous contraception for minors',
          'Certain health acts protected, without generally lifting parental authority',
          'PMI, family planning, sexual-health centre: free support',
          'Right to schooling maintained, with arrangements',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO7_FR, en: POSTS_SEO7_EN } = pairsToArrays(pairs);
