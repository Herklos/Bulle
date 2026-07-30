/**
 * The gap run — rights and steps the FR market serves worst.
 *
 * Each of these answers a question a French future parent actually types, that the
 * government's own content answers correctly but never sequences, and that the competitors
 * skip because it is administrative rather than aspirational. They were surfaced by
 * `docs/FR-CORPUS-AUDIT.md` and verified again against ameli, service-public, caf and
 * legifrance before shipping.
 *
 * Same house rules as the rest of the corpus. Durations and actions are stated because they
 * are the substance and they are stable; euro amounts and indemnity RATES are not, because
 * they revalorise, so those are linked to the official source rather than printed (§7.3).
 * Anything touching care is attributed inline and never presented as our own reasoning.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'sept-seances-preparation-et-epp',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Sept séances de préparation, pas huit : et l’entretien qu’on oublie',
    titleEn: 'Seven antenatal classes, not eight: and the interview everyone forgets',
    excerptFr:
      'On lit partout « huit séances remboursées ». C’est sept séances de préparation, plus un entretien prénatal précoce qui n’en fait pas partie, et qui est le plus utile des huit.',
    excerptEn:
      'You see "eight covered sessions" everywhere. It is seven antenatal classes, plus an early prenatal interview that is not one of them, and it is the most useful of the eight.',
    readingMinutes: 5,
    heroAltFr: 'La préparation à la naissance et l’entretien prénatal précoce',
    heroAltEn: 'Antenatal preparation and the early prenatal interview',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La préparation à la naissance est l’une des rares choses de la grossesse dont tout le monde a entendu parler sans savoir exactement ce qu’elle recouvre. On retient un chiffre, souvent « huit séances remboursées », et on le range dans un coin de la tête.',
          'Le chiffre est presque juste, et l’imprécision coûte cher : ce sont sept séances de préparation, plus un entretien prénatal précoce qui n’est pas l’une des sept. Confondre les deux, c’est risquer de sauter précisément celui qui sert à organiser le reste.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que prend en charge l’Assurance Maladie',
        paragraphs: [
          'Sept séances de préparation à la naissance et à la parentalité, remboursées à 100 %, sans avance de frais. Elles peuvent être menées par une sage-femme ou par un médecin, en groupe ou en individuel, selon [ameli.fr](https://www.ameli.fr/assure/sante/themes/grossesse/preparation-parentalite).',
          'À côté de ces sept séances, et compté séparément, il y a l’entretien prénatal précoce. Lui aussi est pris en charge à 100 %. C’est un acte distinct, pas une séance de plus : c’est pour cela que l’on entend « huit » alors que la préparation, elle, en compte sept.',
        ],
      },
      {
        type: 'text',
        title: 'L’entretien prénatal précoce, celui qu’on saute',
        paragraphs: [
          'Il est obligatoire depuis le 1er mai 2020, et pourtant c’est le rendez-vous que les futurs parents connaissent le moins. Il se fait à partir du 4e mois, une fois la grossesse déclarée, avec une sage-femme ou un médecin.',
          'Sa fonction n’est pas d’enseigner la respiration ou de visiter la salle de naissance. C’est un temps d’échange, seul ou en couple, où le professionnel évalue avec vous vos besoins d’accompagnement pour la suite : c’est là que se décide, en pratique, à quoi ressembleront les sept séances qui suivent.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Séances de préparation : 7, remboursées à 100 %',
          'Entretien prénatal précoce : 1, distinct des 7, remboursé à 100 %',
          'Qui : une sage-femme ou un médecin, pour les deux',
          'Quand commencer l’entretien : à partir du 4e mois, après la déclaration de grossesse',
          'Ce qu’il faut retenir : « huit » = 1 entretien + 7 séances, pas 8 séances',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi l’entretien compte plus que le décompte',
        paragraphs: [
          'Rater une séance de préparation, c’est manquer un cours parmi sept. Rater l’entretien précoce, c’est autre chose : c’est manquer le rendez-vous où l’on fait le point sur votre situation et où l’on vous oriente vers ce dont vous avez réellement besoin.',
          'C’est aussi le moment le plus simple pour poser les questions qui n’ont pas de bonne place ailleurs : une grossesse qui inquiète, un contexte familial compliqué, une fatigue qui n’est pas que physique. Le suivi médical classique laisse rarement le temps pour cela ; cet entretien est fait pour.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La question n’est pas « combien de séances ». C’est « ai-je pris l’entretien ». Les sept séances se rattrapent une par une ; l’entretien, c’est celui qui décide comment on les remplit.',
      },
      {
        type: 'text',
        title: 'Le prévoir, plutôt que de le découvrir trop tard',
        paragraphs: [
          'L’entretien se cale tôt, autour du 4e mois, précisément parce qu’il sert à organiser la suite. Prévu au 8e mois, il n’a plus grand-chose à organiser.',
          'C’est le genre de rendez-vous que Bulle place au bon moment dans votre parcours plutôt que de vous laisser le reconstituer à partir de six pages officielles. Une démarche au bon endroit du calendrier vaut mieux qu’une liste complète mais sans dates.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Antenatal preparation is one of the few things about pregnancy that everyone has heard of without knowing quite what it covers. People remember a number, usually "eight covered sessions", and file it away.',
          'The number is almost right, and the imprecision is costly: it is seven preparation classes, plus an early prenatal interview that is not one of the seven. Confusing the two means risking skipping precisely the one that organises the rest.',
        ],
      },
      {
        type: 'text',
        title: 'What the health system covers',
        paragraphs: [
          'Seven antenatal preparation and parenting classes, reimbursed at 100 %, with nothing to pay upfront. They can be run by a midwife or a doctor, in a group or one to one, according to [ameli.fr](https://www.ameli.fr/assure/sante/themes/grossesse/preparation-parentalite).',
          'Alongside those seven, and counted separately, is the early prenatal interview. It too is fully covered. It is a distinct act, not one more class: that is why people say "eight" when the preparation itself comes to seven.',
        ],
      },
      {
        type: 'text',
        title: 'The early prenatal interview, the one people skip',
        paragraphs: [
          'It has been mandatory since 1 May 2020, and yet it is the appointment expectant parents know least. It happens from the 4th month, once the pregnancy is declared, with a midwife or a doctor.',
          'Its purpose is not to teach breathing or to tour the delivery room. It is a conversation, alone or as a couple, where the professional assesses with you what support you will need next: it is where, in practice, the shape of the seven following classes is decided.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Preparation classes: 7, reimbursed at 100 %',
          'Early prenatal interview: 1, separate from the 7, reimbursed at 100 %',
          'Who: a midwife or a doctor, for both',
          'When to start the interview: from the 4th month, after declaring the pregnancy',
          'What to remember: "eight" = 1 interview + 7 classes, not 8 classes',
        ],
      },
      {
        type: 'text',
        title: 'Why the interview matters more than the count',
        paragraphs: [
          'Missing a preparation class means missing one lesson out of seven. Missing the early interview is different: it means missing the appointment where your situation is reviewed and you are pointed towards what you actually need.',
          'It is also the easiest moment to raise the questions that have no good place elsewhere: a pregnancy that worries you, a complicated family situation, a tiredness that is not only physical. Routine medical follow-up rarely leaves room for that; this interview is made for it.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The question is not "how many classes". It is "have I booked the interview". The seven classes can be caught up one at a time; the interview is the one that decides how they are filled.',
      },
      {
        type: 'text',
        title: 'Plan it, rather than discover it too late',
        paragraphs: [
          'The interview is booked early, around the 4th month, precisely because it exists to organise what follows. Booked in the 8th month, it has little left to organise.',
          'It is the kind of appointment Bulle places at the right point in your journey rather than leaving you to reconstruct it from six official pages. A step in the right place on the calendar beats a complete list with no dates.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'conge-pathologique-14-jours-28-jours',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Le congé pathologique : 14 jours avant, 28 jours après, et ce n’est pas le congé maternité',
    titleEn: 'Pathological leave: 14 days before, 28 days after, and it is not maternity leave',
    excerptFr:
      'Un congé que beaucoup de parents découvrent trop tard. Il s’ajoute au congé maternité sans le raccourcir, et les deux moitiés ne sont pas indemnisées de la même façon.',
    excerptEn:
      'A leave many parents discover too late. It is added to maternity leave without shortening it, and the two halves are not paid the same way.',
    readingMinutes: 5,
    heroAltFr: 'Le congé pathologique autour du congé maternité',
    heroAltEn: 'Pathological leave around maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé pathologique est l’un des droits les plus mal connus de la grossesse, et l’un des rares que l’on ne peut pas rattraper après coup. Beaucoup de parents en entendent parler une fois qu’il aurait fallu le poser.',
          'Ce n’est pas du congé maternité, et c’est la première chose à comprendre : il s’ajoute, il ne se prélève pas dessus. Il existe en deux moitiés, une avant la naissance et une après, qui ne suivent pas les mêmes règles.',
        ],
      },
      {
        type: 'text',
        title: 'Avant la naissance : jusqu’à 14 jours, en plus',
        paragraphs: [
          'En cas d’état pathologique lié à la grossesse, un professionnel de santé peut prescrire jusqu’à quatorze jours de congé supplémentaire, pour une salariée du privé. Ces jours viennent s’ajouter avant le congé maternité, sans en retirer un seul.',
          'Deux points qui changent tout en pratique : ce congé est fractionnable, il peut être pris en plusieurs fois dès la déclaration de grossesse, et il est indemnisé au titre de la maternité, sans délai de carence. C’est ce qui le distingue d’un simple arrêt maladie. Les repères sont sur [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/conge-maternite-salariee).',
        ],
      },
      {
        type: 'text',
        title: 'Après la naissance : jusqu’à 28 jours, mais autrement',
        paragraphs: [
          'Si les suites de couches le justifient médicalement, un congé pathologique postnatal peut être prescrit, jusqu’à vingt-huit jours après la fin du congé maternité. Sur le principe, c’est le pendant de la partie prénatale.',
          'Sur l’indemnisation, non : cette partie postnatale est prise en charge au titre de la maladie, pas de la maternité. Le taux n’est pas le même, et c’est la nuance que presque personne ne connaît avant d’y être. La partie d’avant est de la maternité ; la partie d’après est de la maladie.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères, en un coup d’œil',
        items: [
          'Prénatal : jusqu’à 14 jours (salariée du privé), fractionnables, sur prescription',
          'Prénatal : en plus du congé maternité, indemnisé comme la maternité, sans carence',
          'Postnatal : jusqu’à 28 jours après le congé maternité, sur prescription',
          'Postnatal : indemnisé au titre de la maladie, pas de la maternité',
          'Dans les deux cas : c’est un professionnel de santé qui le prescrit, pas vous qui le demandez',
        ],
      },
      {
        type: 'text',
        title: 'Une précision qui vaut pour 2026',
        paragraphs: [
          'Depuis le 1er mars 2026, la partie prénatale a été portée de 14 à 21 jours, mais uniquement dans la fonction publique. Pour une salariée du privé, le repère reste quatorze jours, et confondre les deux mène à attendre une semaine qui n’existe pas dans votre cas.',
          'Le changement est décrit sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A18819). Si vous êtes fonctionnaire ou contractuelle de la fonction publique, c’est ce texte qui s’applique à vous, pas la règle du privé.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Le congé pathologique ne se rattrape pas. Il n’y a pas de version rétroactive : posé à temps, il ajoute des jours ; découvert trop tard, il n’ajoute rien.',
      },
      {
        type: 'text',
        title: 'Le savoir avant d’en avoir besoin',
        paragraphs: [
          'Ce congé ne se prépare pas comme une valise : on ne sait pas à l’avance si on en aura besoin. Ce qui se prépare, c’est de savoir qu’il existe, pour pouvoir en parler à sa sage-femme ou à son médecin le jour où la question se pose, plutôt que de l’apprendre d’une collègue trois semaines trop tard.',
          'C’est exactement le type d’information que Bulle fait remonter au bon moment de la grossesse : pas une démarche à cocher, mais un droit à connaître avant la fenêtre où il compte.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Pathological leave is one of the least understood rights in pregnancy, and one of the few that cannot be claimed after the fact. Many parents hear about it once the moment to take it has passed.',
          'It is not maternity leave, and that is the first thing to grasp: it is added on, it is not taken out of it. It comes in two halves, one before the birth and one after, and they do not follow the same rules.',
        ],
      },
      {
        type: 'text',
        title: 'Before the birth: up to 14 days, on top',
        paragraphs: [
          'Where there is a pathological condition linked to the pregnancy, a health professional can prescribe up to fourteen extra days of leave for a private-sector employee. These days are added before maternity leave, without removing a single one from it.',
          'Two points change everything in practice: this leave can be split, taken in several parts from the moment the pregnancy is declared, and it is paid under the maternity scheme, with no waiting period. That is what sets it apart from an ordinary sick note. The details are on [ameli.fr](https://www.ameli.fr/assure/remboursements/indemnites-journalieres-maladie-maternite-paternite/conge-maternite-salariee).',
        ],
      },
      {
        type: 'text',
        title: 'After the birth: up to 28 days, but differently',
        paragraphs: [
          'Where recovery from the birth medically justifies it, postnatal pathological leave can be prescribed, up to twenty-eight days after maternity leave ends. In principle it is the counterpart of the prenatal part.',
          'In how it is paid, it is not: this postnatal part is covered under the sickness scheme, not the maternity one. The rate is not the same, and it is the nuance almost nobody knows before they are in it. The part before is maternity; the part after is sickness.',
        ],
      },
      {
        type: 'list',
        title: 'The figures, at a glance',
        items: [
          'Prenatal: up to 14 days (private-sector employee), splittable, on prescription',
          'Prenatal: on top of maternity leave, paid like maternity, no waiting period',
          'Postnatal: up to 28 days after maternity leave, on prescription',
          'Postnatal: paid under the sickness scheme, not maternity',
          'In both cases: a health professional prescribes it, you do not simply request it',
        ],
      },
      {
        type: 'text',
        title: 'One point that matters in 2026',
        paragraphs: [
          'Since 1 March 2026 the prenatal part has been raised from 14 to 21 days, but only in the public sector. For a private-sector employee the figure stays fourteen days, and confusing the two leads to waiting for a week that does not exist in your case.',
          'The change is described on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/actualites/A18819). If you are a civil servant or a public-sector contract worker, that text applies to you, not the private-sector rule.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Pathological leave cannot be back-claimed. There is no retroactive version: taken in time, it adds days; discovered too late, it adds nothing.',
      },
      {
        type: 'text',
        title: 'Knowing it before you need it',
        paragraphs: [
          'This leave is not something you pack for: you cannot know in advance whether you will need it. What you can prepare is knowing it exists, so you can raise it with your midwife or doctor the day the question comes up, rather than learning it from a colleague three weeks too late.',
          'It is exactly the kind of information Bulle surfaces at the right point in the pregnancy: not a task to tick, but a right to know before the window where it counts.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'absences-examens-grossesse-au-travail',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Absences pour les examens : le co-parent y a droit trois fois, et presque personne ne les prend',
    titleEn: 'Time off for the exams: the co-parent has three paid absences, and almost nobody takes them',
    excerptFr:
      'La salariée enceinte s’absente pour ses examens sans perdre de salaire. Le co-parent aussi, pour trois d’entre eux. C’est du temps de travail, pas une faveur à négocier.',
    excerptEn:
      'A pregnant employee attends her exams with no loss of pay. So can the co-parent, for three of them. It is working time, not a favour to negotiate.',
    readingMinutes: 4,
    heroAltFr: 'Les absences autorisées pour les examens de grossesse au travail',
    heroAltEn: 'Authorised time off for pregnancy exams at work',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Il existe un droit que beaucoup de couples utilisent à moitié, faute de savoir qu’il est entier. La salariée enceinte peut s’absenter pour ses examens médicaux obligatoires ; le co-parent aussi, pour trois d’entre eux. Dans les deux cas, c’est un droit, pas une tolérance.',
          'La nuance n’est pas juridique pour le plaisir. Un droit se pose, une tolérance se demande, et ce n’est pas la même conversation avec un employeur.',
        ],
      },
      {
        type: 'text',
        title: 'Pour la salariée enceinte',
        paragraphs: [
          'L’article [L1225-16 du Code du travail](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051829294) autorise la salariée enceinte à s’absenter pour se rendre aux examens médicaux obligatoires du suivi de grossesse. Ces absences n’entraînent aucune diminution de la rémunération.',
          'Elles sont aussi assimilées à du temps de travail effectif : elles comptent pour vos congés payés et pour votre ancienneté. Vous ne « rattrapez » pas ces heures et elles ne sont pas décomptées. Le suivi obligatoire comprend sept examens prénataux, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2330) ; c’est ce cadre médical, et non l’article du Code du travail, qui fixe leur nombre.',
        ],
      },
      {
        type: 'text',
        title: 'Pour le co-parent : trois fois, au même régime',
        paragraphs: [
          'Le même article ouvre au conjoint salarié de la femme enceinte, à son ou sa partenaire de PACS ou à la personne vivant maritalement avec elle, une autorisation d’absence pour se rendre à trois de ces examens obligatoires.',
          'Ces trois absences suivent le même régime : rémunération maintenue, temps de travail effectif. Ce ne sont pas des RTT posées, ce n’est pas une demande de faveur, ce n’est pas une négociation. C’est le point que presque personne n’utilise, souvent parce que personne ne le lui a dit.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Salariée enceinte : absence pour les examens obligatoires, sans perte de salaire',
          'Co-parent : 3 de ces examens, au même régime',
          'Statut : temps de travail effectif, compté pour les congés payés et l’ancienneté',
          'Base : article L1225-16 du Code du travail',
          'À faire : informer l’employeur, pas demander une autorisation',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi « du temps de travail » change tout',
        paragraphs: [
          'Parce que la charge de la preuve et la charge de la demande s’inversent. Vous n’avez pas à justifier l’intérêt de votre présence à une échographie ni à proposer une compensation. Vous informez de la date, un justificatif de rendez-vous suffit, et l’absence est de droit.',
          'C’est particulièrement utile pour le co-parent, dont la présence aux examens est souvent traitée comme un extra qu’il faudrait mériter. Trois fois, ce n’en est pas un.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Ces trois absences ne se négocient pas et ne se rattrapent pas. Elles existent, ou elles passent. La seule façon de les perdre est de ne pas savoir qu’elles sont là.',
      },
      {
        type: 'text',
        title: 'Les repérer avant les rendez-vous, pas après',
        paragraphs: [
          'Le co-parent qui veut être présent à trois examens gagne à choisir lesquels tôt, en même temps que le calendrier des rendez-vous se dessine, plutôt que de constater après coup qu’il a posé des congés pour un droit qu’il avait déjà.',
          'C’est le genre de rendez-vous que Bulle place sur le parcours des deux parents, pas seulement de celui qui porte l’enfant. Un droit connu au bon moment vaut mieux qu’un droit découvert dans le rétroviseur.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'There is a right many couples use by half, for want of knowing it is whole. A pregnant employee can take time off for her mandatory medical exams; so can the co-parent, for three of them. In both cases it is a right, not a tolerance.',
          'The distinction is not legal pedantry. A right is asserted, a tolerance is requested, and that is not the same conversation with an employer.',
        ],
      },
      {
        type: 'text',
        title: 'For the pregnant employee',
        paragraphs: [
          'Article [L1225-16 of the Labour Code](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051829294) allows a pregnant employee to be absent to attend the mandatory medical exams of pregnancy follow-up. These absences carry no reduction in pay.',
          'They are also treated as effective working time: they count towards your paid leave and your seniority. You do not "make up" those hours and they are not deducted. The mandatory follow-up includes seven prenatal exams, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2330); it is that medical framework, not the Labour Code article, that sets their number.',
        ],
      },
      {
        type: 'text',
        title: 'For the co-parent: three times, on the same terms',
        paragraphs: [
          'The same article gives the pregnant woman\'s employed spouse, her PACS partner, or the person living with her as a couple, authorised absence to attend three of these mandatory exams.',
          'Those three absences follow the same regime: pay maintained, effective working time. They are not annual leave, not a request for a favour, not a negotiation. It is the point almost nobody uses, often because nobody told them.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Pregnant employee: absence for the mandatory exams, no loss of pay',
          'Co-parent: 3 of those exams, on the same terms',
          'Status: effective working time, counted for paid leave and seniority',
          'Basis: article L1225-16 of the Labour Code',
          'What to do: inform your employer, not request permission',
        ],
      },
      {
        type: 'text',
        title: 'Why "working time" changes everything',
        paragraphs: [
          'Because the burden of proof and the burden of asking both flip. You do not have to justify the value of being at a scan, nor offer to make up the time. You give notice of the date, an appointment slip is enough, and the absence is a right.',
          'That matters most for the co-parent, whose presence at exams is often treated as an extra to be earned. Three times, it is not.',
        ],
      },
      {
        type: 'quote',
        quote:
          'These three absences are not negotiated and not made up. They exist, or they pass. The only way to lose them is not to know they are there.',
      },
      {
        type: 'text',
        title: 'Spotting them before the appointments, not after',
        paragraphs: [
          'A co-parent who wants to attend three exams does better to choose which ones early, as the appointment calendar takes shape, rather than realising afterwards that they booked annual leave for a right they already held.',
          'It is the kind of appointment Bulle places on both parents\' path, not only that of the one carrying the child. A right known at the right moment beats a right discovered in the rear-view mirror.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'visite-de-reprise-apres-conge-maternite',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'La visite de reprise après le congé maternité : c’est à l’employeur de l’organiser',
    titleEn: 'The return-to-work medical after maternity leave: it is the employer\'s job to arrange',
    excerptFr:
      'Après un congé maternité, une visite médicale de reprise est obligatoire, quelle qu’en ait été la durée. L’organiser n’est pas votre charge, et tant qu’elle n’a pas eu lieu, votre retour n’est pas complet.',
    excerptEn:
      'After maternity leave a return medical is mandatory, whatever its length. Arranging it is not on you, and until it has happened your return is not complete.',
    readingMinutes: 4,
    heroAltFr: 'La visite médicale de reprise après le congé maternité',
    heroAltEn: 'The return-to-work medical after maternity leave',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le congé maternité se termine par une étape que beaucoup de salariées ignorent : une visite médicale de reprise, avec la médecine du travail. Elle est obligatoire, et ce n’est pas à vous de courir après.',
          'La connaître à l’avance évite une reprise mal cadrée, où l’on retourne au poste comme si de rien n’était alors qu’une étape légale manque encore.',
        ],
      },
      {
        type: 'text',
        title: 'Le congé maternité déclenche toujours la visite',
        paragraphs: [
          'C’est une particularité utile à connaître : contrairement à un arrêt maladie, qui ne déclenche la visite de reprise qu’au-delà d’une certaine durée, le congé maternité l’impose à lui seul, quelle qu’ait été sa durée. Le repère est sur [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2871).',
          'Autrement dit, il n’y a pas de « congé maternité trop court » pour y échapper. La visite est due.',
        ],
      },
      {
        type: 'text',
        title: 'C’est l’employeur qui l’organise, dans les huit jours',
        paragraphs: [
          'Dès qu’il connaît la date de fin de votre congé, l’employeur saisit le service de prévention et de santé au travail, qui fixe la visite. Celle-ci a lieu le jour de la reprise effective, et au plus tard dans les huit jours qui suivent.',
          'L’organisation lui incombe, à lui. Vous pouvez la solliciter vous-même si elle tarde, en le prévenant, mais l’oubli n’est pas de votre côté du bureau.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Déclencheur : la fin du congé maternité, quelle qu’ait été sa durée',
          'Qui organise : l’employeur, en saisissant la santé au travail',
          'Quand : le jour de la reprise, au plus tard dans les 8 jours',
          'Qui la réalise : le médecin du travail',
          'Une visite de préreprise existe aussi, en amont, pour les arrêts longs',
        ],
      },
      {
        type: 'text',
        title: 'Ce que la visite change vraiment',
        paragraphs: [
          'Elle n’est pas une formalité tampon. C’est le moment où l’on vérifie que le poste reste compatible avec votre état, et où d’éventuels aménagements se posent, en particulier si vous allaitez ou si l’accouchement a laissé des suites.',
          'Sur le plan du contrat, la jurisprudence est constante : tant que la visite de reprise n’a pas eu lieu, la reprise n’est pas juridiquement aboutie. C’est une raison de plus pour qu’elle soit programmée à temps plutôt que repoussée de semaine en semaine.',
        ],
      },
      {
        type: 'text',
        title: 'La visite de préreprise, pour anticiper',
        paragraphs: [
          'Si votre absence a été longue, par exemple un congé pathologique suivi du congé maternité, une visite de préreprise peut être organisée avant même le retour. Elle sert à préparer les aménagements en amont.',
          'Elle peut être demandée par votre médecin traitant, le médecin conseil de l’Assurance Maladie, le médecin du travail, ou vous-même. Depuis 2022, l’employeur n’en fait pas partie : c’est un outil qui vous appartient.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La visite de reprise n’est pas une case à cocher pour la forme. C’est ce qui rend le retour réel, et c’est à l’employeur de la déclencher.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Maternity leave ends with a step many employees do not know about: a return-to-work medical, with the occupational health service. It is mandatory, and it is not yours to chase.',
          'Knowing it in advance avoids a badly framed return, where you go back to the job as if nothing had changed while a legal step is still missing.',
        ],
      },
      {
        type: 'text',
        title: 'Maternity leave always triggers the visit',
        paragraphs: [
          'It is a useful quirk to know: unlike sick leave, which only triggers the return medical beyond a certain length, maternity leave requires it on its own, whatever its duration. The reference is on [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F2871).',
          'In other words, there is no "maternity leave too short" to escape it. The visit is due.',
        ],
      },
      {
        type: 'text',
        title: 'The employer arranges it, within eight days',
        paragraphs: [
          'As soon as they know the end date of your leave, the employer contacts the occupational prevention and health service, which sets the visit. It takes place on the day of the effective return, and at the latest within the following eight days.',
          'Arranging it falls to them. You may ask for it yourself if it is slow to come, by notifying them, but the oversight is not on your side of the desk.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Trigger: the end of maternity leave, whatever its length',
          'Who arranges it: the employer, by contacting occupational health',
          'When: the day of return, at the latest within 8 days',
          'Who carries it out: the occupational physician',
          'A pre-return visit also exists, beforehand, for long absences',
        ],
      },
      {
        type: 'text',
        title: 'What the visit actually changes',
        paragraphs: [
          'It is not a rubber stamp. It is the point where the job is checked to remain compatible with your condition, and where any adjustments are raised, in particular if you are breastfeeding or the birth left after-effects.',
          'On the contract itself, the case law is settled: until the return medical has taken place, the return is not legally complete. That is one more reason for it to be scheduled in time rather than pushed back week after week.',
        ],
      },
      {
        type: 'text',
        title: 'The pre-return visit, to get ahead',
        paragraphs: [
          'If your absence was long, for instance pathological leave followed by maternity leave, a pre-return visit can be arranged before you even come back. It exists to prepare adjustments in advance.',
          'It can be requested by your treating doctor, the health insurance medical adviser, the occupational physician, or you yourself. Since 2022 the employer is not among them: it is a tool that belongs to you.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The return medical is not a box ticked for form\'s sake. It is what makes the return real, and it is the employer\'s job to set it in motion.',
      },
    ],
  }),

  postPair({
    slug: 'declarer-la-naissance-a-la-caf',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Déclarer la naissance à la CAF : la mairie ne le fait pas pour vous',
    titleEn: 'Telling the CAF about the birth: the town hall does not do it for you',
    excerptFr:
      'Déclarer la naissance à la mairie remplit l’état civil, pas votre dossier CAF. C’est l’étape qui fait passer le dossier de la grossesse à l’allocation de base, et c’est à vous de la faire.',
    excerptEn:
      'Registering the birth at the town hall fills the civil register, not your CAF file. It is the step that moves the file from pregnancy to the base benefit, and it is yours to make.',
    readingMinutes: 4,
    heroAltFr: 'Déclarer la naissance à la CAF',
    heroAltEn: 'Declaring the birth to the CAF',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Beaucoup de parents pensent qu’une seule déclaration de naissance existe, celle qu’on fait à la mairie dans les premiers jours. Il y en a une seconde, moins visible, et c’est elle qui touche votre budget : la déclaration à la CAF.',
          'Les deux ne communiquent pas automatiquement. La mairie enregistre l’état civil ; elle ne met pas votre dossier CAF à jour à votre place.',
        ],
      },
      {
        type: 'text',
        title: 'La déclaration à la mairie ne prévient pas la CAF',
        paragraphs: [
          'La déclaration en mairie est une obligation d’état civil, à faire dans les cinq jours qui suivent la naissance selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961). Ce délai de cinq jours est celui de la mairie, et de rien d’autre.',
          'Il ne déclenche pas vos prestations familiales. Pour cela, il faut déclarer la naissance dans votre espace CAF, vous-même. Tant que ce n’est pas fait, votre dossier reste, pour la CAF, un dossier de grossesse.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que débloque la déclaration à la CAF',
        paragraphs: [
          'Elle ouvre l’allocation de base de la PAJE, versée chaque mois sous condition de ressources, décrite sur [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/ma-situation/vie-personnelle/j-attends-un-enfant). C’est la prestation qui prend le relais après la naissance.',
          'À ne pas confondre avec la prime à la naissance, qui, elle, a déjà été traitée en amont : elle dépend de la déclaration de grossesse et se verse pendant le 7e mois, pas au moment de la naissance. Deux prestations, deux déclarations, deux moments.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Mairie : déclaration d’état civil, dans les 5 jours après la naissance',
          'CAF : déclaration à faire vous-même, dans votre espace en ligne',
          'Si la grossesse n’a jamais été déclarée à la CAF : formulaire à envoyer avec un acte de naissance ou une copie du livret de famille',
          'Ce que la CAF débloque : l’allocation de base de la PAJE',
          'La prime à la naissance, elle, dépend de la déclaration de grossesse (versée au 7e mois)',
        ],
      },
      {
        type: 'text',
        title: 'Grossesse et naissance : deux déclarations, pas une',
        paragraphs: [
          'La déclaration de grossesse, avant la naissance, ouvre vos droits PAJE et déclenche la prime. La déclaration de naissance à la CAF, après, fait basculer le dossier vers les versements mensuels.',
          'Les montants exacts et les conditions évoluent : vérifiez-les sur [caf.fr](https://www.caf.fr). Ce qui ne change pas, c’est l’ordre des opérations, et le fait que la seconde déclaration vous revient.',
        ],
      },
      {
        type: 'quote',
        quote:
          'La mairie inscrit votre enfant à l’état civil. Elle ne remplit pas votre dossier CAF. Ce sont deux guichets, et un seul vous prévient quand l’autre attend quelque chose.',
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Many parents think there is only one birth declaration, the one made at the town hall in the first few days. There is a second, less visible one, and it is the one that touches your budget: the declaration to the CAF.',
          'The two do not talk to each other automatically. The town hall records the civil status; it does not update your CAF file for you.',
        ],
      },
      {
        type: 'text',
        title: 'The town hall declaration does not alert the CAF',
        paragraphs: [
          'The town hall declaration is a civil-status obligation, to be made within the five days following the birth according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F961). That five-day deadline is the town hall\'s, and nothing else\'s.',
          'It does not trigger your family benefits. For that, you have to declare the birth in your CAF account, yourself. Until that is done, your file remains, as far as the CAF is concerned, a pregnancy file.',
        ],
      },
      {
        type: 'text',
        title: 'What the CAF declaration unlocks',
        paragraphs: [
          'It opens the PAJE base benefit, paid monthly subject to income, described on [caf.fr](https://www.caf.fr/allocataires/aides-et-demarches/ma-situation/vie-personnelle/j-attends-un-enfant). It is the benefit that takes over after the birth.',
          'Not to be confused with the birth grant, which has already been handled earlier: it depends on the pregnancy declaration and is paid during the 7th month, not at the birth. Two benefits, two declarations, two moments.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Town hall: civil-status declaration, within 5 days of the birth',
          'CAF: declaration to make yourself, in your online account',
          'If the pregnancy was never declared to the CAF: a form to send with a birth certificate or a copy of the family record book',
          'What the CAF unlocks: the PAJE base benefit',
          'The birth grant depends instead on the pregnancy declaration (paid in the 7th month)',
        ],
      },
      {
        type: 'text',
        title: 'Pregnancy and birth: two declarations, not one',
        paragraphs: [
          'The pregnancy declaration, before the birth, opens your PAJE rights and triggers the grant. The birth declaration to the CAF, afterwards, tips the file over to the monthly payments.',
          'Exact amounts and conditions change: check them on [caf.fr](https://www.caf.fr). What does not change is the order of operations, and the fact that the second declaration is on you.',
        ],
      },
      {
        type: 'quote',
        quote:
          'The town hall enters your child in the civil register. It does not fill in your CAF file. They are two counters, and only one of them tells you when the other is waiting for something.',
      },
    ],
  }),

  postPair({
    slug: 'nom-de-famille-de-lenfant-choisir',
    categoryKey: 'administratif',
    categoryFr: 'Administratif',
    categoryEn: 'Paperwork',
    titleFr: 'Le nom de famille de l’enfant : le choix se fait à la naissance, et il engage les suivants',
    titleEn: 'The child\'s surname: the choice is made at birth, and it binds the next ones',
    excerptFr:
      'Père, mère, ou les deux : le nom se choisit à la déclaration de naissance. Ce que peu de parents savent, c’est que le nom du premier enfant s’impose aux enfants suivants du couple.',
    excerptEn:
      'Father\'s, mother\'s, or both: the surname is chosen at the birth declaration. What few parents know is that the first child\'s name is imposed on the couple\'s later children.',
    readingMinutes: 5,
    heroAltFr: 'Choisir le nom de famille de l’enfant à la naissance',
    heroAltEn: 'Choosing the child\'s surname at birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le nom de famille de l’enfant n’est pas attribué d’office. C’est un vrai choix, et il se fait à un moment peu propice à la réflexion : les jours qui suivent la naissance, au guichet de l’état civil.',
          'Cet article ne parle que du nom de famille, pas du prénom, qui suit d’autres règles. Et il porte sur une décision qui a une portée plus large qu’un seul enfant.',
        ],
      },
      {
        type: 'text',
        title: 'Les options',
        paragraphs: [
          'Quand la filiation est établie à l’égard des deux parents, l’enfant peut porter, dans l’ordre que vous choisissez : le nom du père, le nom de la mère, ou les deux accolés. C’est le cadre posé par [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F10505).',
          'Le choix se fait par une déclaration conjointe de choix de nom, remise à l’officier d’état civil, en pratique au moment de la déclaration de naissance. Un parent qui porte déjà un double nom ne transmet qu’une seule de ses deux parties.',
        ],
      },
      {
        type: 'text',
        title: 'Le premier enfant fixe le nom des suivants',
        paragraphs: [
          'C’est le point que presque personne n’anticipe. Le nom donné au premier enfant commun s’impose ensuite aux autres enfants du même couple. Vous ne rejouez pas le choix à chaque naissance.',
          'À nuancer, pour ne pas effrayer : ce n’est pas un verrou définitif pour la vie entière, une procédure de changement de nom existe par ailleurs. Mais au moment de la déclaration de naissance, le choix est déterminant et il engage la fratrie à venir. Autant le décider ensemble, avant, plutôt que dans le couloir de la mairie.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Options : nom du père, nom de la mère, ou les deux, dans l’ordre choisi',
          'Comment : une déclaration conjointe de choix de nom à l’état civil',
          'Quand : en pratique, au moment de la déclaration de naissance',
          'Portée : le nom du premier enfant commun s’impose aux suivants',
          'Sans déclaration : la loi tranche à votre place (voir ci-dessous)',
        ],
      },
      {
        type: 'text',
        title: 'Si vous ne choisissez pas',
        paragraphs: [
          'L’absence de déclaration n’est pas une absence de décision : la loi choisit à votre place, et ce choix engage lui aussi les enfants suivants. Selon l’article 311-21 du Code civil, si la filiation est établie en même temps à l’égard des deux parents, l’enfant prend le nom du père.',
          'Si elle est établie successivement, l’enfant prend le nom du parent à l’égard duquel elle a été établie en premier. Ne rien faire est donc une option, mais c’en est une qui a des conséquences précises, qu’il vaut mieux connaître avant qu’après.',
        ],
      },
      {
        type: 'quote',
        quote:
          'Ce n’est pas seulement le nom d’un enfant que vous posez ce jour-là, c’est celui de la fratrie. C’est une conversation à avoir à deux, tranquillement, pas une case à remplir dans l’urgence.',
      },
      {
        type: 'text',
        title: 'Une décision à prendre à deux, en amont',
        paragraphs: [
          'C’est exactement le type de décision que Bulle sort du couloir de la maternité pour la remettre là où elle a sa place : dans une conversation calme, quelques semaines avant, quand on peut encore y réfléchir.',
          'Décider à deux avant que la situation ne décide pour vous, c’est le fil de plusieurs démarches de cette période. Le nom en fait partie, et c’est l’une des plus durables.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A child\'s surname is not assigned automatically. It is a genuine choice, and it is made at a moment ill-suited to reflection: the days following the birth, at the civil registry desk.',
          'This article is only about the surname, not the first name, which follows other rules. And it concerns a decision with a wider reach than a single child.',
        ],
      },
      {
        type: 'text',
        title: 'The options',
        paragraphs: [
          'When filiation is established as to both parents, the child may bear, in the order you choose: the father\'s name, the mother\'s name, or both joined together. That is the framework set by [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F10505).',
          'The choice is made by a joint declaration of name choice, handed to the civil registrar, in practice at the moment of the birth declaration. A parent who already bears a double name passes on only one of its two parts.',
        ],
      },
      {
        type: 'text',
        title: 'The first child fixes the name of the next ones',
        paragraphs: [
          'This is the point almost nobody anticipates. The name given to the first common child then applies to the couple\'s other children. You do not replay the choice at each birth.',
          'A caveat, so as not to alarm: it is not a permanent lock for life, a separate name-change procedure exists. But at the moment of the birth declaration the choice is decisive and it binds the siblings to come. Better to decide it together, beforehand, than in the town hall corridor.',
        ],
      },
      {
        type: 'list',
        title: 'The figures',
        items: [
          'Options: father\'s name, mother\'s name, or both, in the chosen order',
          'How: a joint declaration of name choice at the civil registry',
          'When: in practice, at the moment of the birth declaration',
          'Reach: the first common child\'s name applies to the next ones',
          'With no declaration: the law decides for you (see below)',
        ],
      },
      {
        type: 'text',
        title: 'If you do not choose',
        paragraphs: [
          'The absence of a declaration is not the absence of a decision: the law chooses for you, and that choice also binds the later children. Under article 311-21 of the Civil Code, if filiation is established at the same time as to both parents, the child takes the father\'s name.',
          'If it is established successively, the child takes the name of the parent as to whom it was established first. Doing nothing is therefore an option, but one with precise consequences, better known before than after.',
        ],
      },
      {
        type: 'quote',
        quote:
          'It is not only one child\'s name you set that day, it is the siblings\'. It is a conversation to have as a couple, calmly, not a box to fill in a hurry.',
      },
      {
        type: 'text',
        title: 'A decision to make together, ahead of time',
        paragraphs: [
          'It is exactly the kind of decision Bulle takes out of the maternity corridor and puts back where it belongs: in a calm conversation, a few weeks before, while there is still room to think.',
          'Deciding together before the situation decides for you is the thread running through several of this period\'s steps. The name is one of them, and one of the most lasting.',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_GAP_FR, en: POSTS_GAP_EN } = pairsToArrays(pairs);
