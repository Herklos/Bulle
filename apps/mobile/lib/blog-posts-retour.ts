/**
 * "Le retour à la maison" articles: preparing DURING pregnancy for the weeks AFTER the birth.
 *
 * Regulatory line (§7.3): preparation only, never care. Every article says an appointment or
 * a right exists, gives its window, and says who to call, none diagnose, triage symptoms, or
 * instruct on physiology or exercises. The baby-blues article in particular lists contacts
 * only, no symptom checklist and no self-assessment, so the product stays outside EU MDR
 * scope and nobody is handed a quiz at 3am.
 */

import { postPair } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'prado-retour-maison-sage-femme',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Prado : le suivi à domicile après l’accouchement, à connaître avant la maternité',
    titleEn: 'Prado: the home midwife follow-up after birth, before the maternity ward offers it',
    excerptFr:
      'Un dispositif vous sera proposé à la maternité, pas avant. Autant savoir ce qu’il couvre avant qu’on vous pose la question.',
    excerptEn:
      'A programme will be offered to you at the maternity ward, not before. Better to know what it covers before someone asks you to decide.',
    readingMinutes: 5,
    heroAltFr: 'Programme Prado, retour à la maison après la naissance',
    heroAltEn: 'Prado programme, coming home after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le programme Prado organise le retour à la maison après une naissance. Ce n’est pas une démarche que vous engagez à l’avance : c’est l’équipe de la maternité qui vous la propose, au moment où votre sortie est envisagée, parfois à peine quelques heures après l’accouchement.',
          'C’est précisément pour cette raison qu’il vaut mieux le connaître avant d’y être confrontée. Avec un bébé de quelques heures ou quelques jours, personne n’a l’énergie de peser une proposition inconnue. Savoir ce qu’est Prado, à qui il s’adresse et ce qu’il change concrètement permet de répondre en connaissance de cause, plutôt que d’accepter ou de refuser dans la précipitation.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que le programme couvre réellement',
        paragraphs: [
          'Prado, pour programme d’accompagnement du retour à domicile, est organisé par l’Assurance Maladie. Après la naissance, il met en place un suivi médical à domicile assuré par une sage-femme, pour vous comme pour le bébé, dans les jours qui suivent la sortie.',
          'Ce suivi ne remplace ni la consultation postnatale à 6-8 semaines, ni les visites pédiatriques du nourrisson : il s’y ajoute, en rapprochant le premier contact médical après la sortie plutôt que de vous laisser plusieurs jours sans rendez-vous. [ameli.fr](https://www.ameli.fr/sage-femme/exercice-liberal/services-patients/programmes-retour-domicile)',
        ],
      },
      {
        type: 'text',
        title: 'Qui est concerné, et pourquoi on vous en parle à ce moment précis',
        paragraphs: [
          'Prado s’adresse en priorité aux sorties dites précoces. Selon la Haute Autorité de Santé, une sortie de maternité est considérée comme précoce lorsqu’elle intervient moins de 72 heures après un accouchement par voie basse, ou moins de 96 heures après une césarienne. C’est dans ces situations que le programme est proposé quasi systématiquement, parce que le premier contact médical après la sortie doit être avancé pour rester dans un délai raisonnable.',
          'Le programme peut aussi être évoqué en dehors de ces cas, si l’équipe l’estime utile pour votre situation. Dans tous les cas, la proposition vient d’elle : ce n’est pas un droit à réclamer par avance, mais une offre à laquelle vous pourrez répondre sereinement si vous savez déjà de quoi il s’agit.',
        ],
      },
      {
        type: 'text',
        title: 'Comment ça se passe concrètement',
        paragraphs: [
          'Un conseiller de l’Assurance Maladie rencontre les parents à la maternité, avant la sortie. Son rôle est d’organiser le premier rendez-vous avec une sage-femme : celle que vous connaissez déjà si vous en avez suivi une pendant la grossesse, ou une sage-femme du secteur si vous n’en avez pas.',
          'La première visite à domicile a lieu dans les 24 heures qui suivent la sortie. Une seconde visite, également systématique, suit dans la semaine. D’autres rendez-vous peuvent s’ajouter selon ce que la sage-femme observe et ce dont vous avez besoin, vous et le bébé. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
        ],
      },
      {
        type: 'list',
        title: 'Ce que ce suivi change concrètement',
        items: [
          'Un premier contact médical rapproché, sans devoir vous déplacer avec un nouveau-né',
          'La continuité avec la sage-femme qui vous suivait déjà pendant la grossesse, si vous le demandez à temps',
          'Un relais pour les démarches encore en cours, comme l’affiliation du bébé à la Sécurité sociale',
          'Une orientation rapide vers un autre professionnel si un besoin se précise, pour vous ou pour le bébé',
        ],
      },
      {
        type: 'text',
        title: 'La seule chose à anticiper',
        paragraphs: [
          'Le point qui dépend vraiment de vous, c’est le choix de la sage-femme. Si vous souhaitez que ce soit la même personne qui vous a suivie pendant la grossesse, dites-le tôt, si possible avant l’accouchement, à elle comme à la maternité. Le conseiller Prado la contactera en priorité, mais cela suppose qu’elle soit disponible et que la demande ait déjà été formulée.',
          'Si vous n’avez pas de préférence, il n’y a rien à préparer à l’avance : le programme est justement conçu pour fonctionner sans anticipation de votre part, y compris dans l’urgence d’une sortie précoce non planifiée. Le savoir maintenant sert surtout à une chose : ne pas découvrir la question en même temps que la proposition.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The Prado programme organises the return home after a birth. It isn’t something you arrange in advance: the maternity team offers it to you, at the point your discharge is being considered, sometimes only hours after delivery.',
          'That is exactly why it helps to know about it beforehand. With a newborn a few hours old, nobody has the energy to weigh up an unfamiliar offer on the spot. Knowing what Prado is, who it is for, and what it actually changes lets you answer with a clear head, rather than accepting or declining in a rush.',
        ],
      },
      {
        type: 'text',
        title: 'What the programme actually covers',
        paragraphs: [
          'Prado, short for programme d’accompagnement du retour à domicile (home-return support programme), is organised by Assurance Maladie, the French health insurance fund. After the birth, it sets up home-based medical follow-up with a midwife, for you and the baby, in the days after discharge.',
          'This follow-up does not replace the postnatal check-up at 6 to 8 weeks, nor the paediatric visits scheduled for the newborn: it adds to them, by bringing the first medical contact after discharge forward instead of leaving you several days without an appointment. [ameli.fr](https://www.ameli.fr/sage-femme/exercice-liberal/services-patients/programmes-retour-domicile)',
        ],
      },
      {
        type: 'text',
        title: 'Who it is for, and why it comes up at this exact moment',
        paragraphs: [
          'Prado is aimed first at what is called early discharge. According to the Haute Autorité de Santé, a maternity discharge is considered early when it happens less than 72 hours after a vaginal birth, or less than 96 hours after a caesarean. These are the situations where the programme is offered almost systematically, because the first medical contact after discharge needs to be brought forward to stay within a reasonable window.',
          'The programme can also come up outside these cases, if the team judges it useful for your situation. Either way, the offer comes from them: it is not an entitlement you request in advance, but an offer you can answer calmly if you already know what it is.',
        ],
      },
      {
        type: 'text',
        title: 'How it actually works',
        paragraphs: [
          'An Assurance Maladie advisor meets the parents at the maternity ward, before discharge. Their role is to arrange the first appointment with a midwife: the one you already know if you had one during the pregnancy, or a local midwife if you did not.',
          'The first home visit happens within 24 hours of discharge. A second visit, also systematic, follows within the week. Further visits can be added depending on what the midwife observes and what you and the baby need. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
        ],
      },
      {
        type: 'list',
        title: 'What this follow-up actually gives you',
        items: [
          'An early medical contact, without having to travel with a newborn',
          'Continuity with the midwife who already followed you during pregnancy, if you ask in time',
          'Help with paperwork still open, like registering the baby with Social Security',
          'A quick path to another professional if a need comes up, for you or the baby',
        ],
      },
      {
        type: 'text',
        title: 'The one thing worth planning ahead',
        paragraphs: [
          'The part that is genuinely yours to decide is which midwife follows you. If you want it to be the same person who followed your pregnancy, say so early, ideally before the birth, both to her and to the maternity team. The Prado advisor will contact her first, but that depends on her being available and on the request already being made.',
          'If you have no preference, there is nothing to prepare in advance: the programme is designed to work without any anticipation on your part, including an unplanned early discharge. Knowing about it beforehand serves one purpose above all: not discovering the question at the same time as the offer.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'consultation-postnatale-et-entretien-precoce',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Consultation postnatale et entretien postnatal précoce : les deux rendez-vous qu’on confond',
    titleEn: 'The postnatal check-up and the early postnatal interview: the two appointments people mix up',
    excerptFr:
      'Deux rendez-vous, deux objectifs, un seul point commun : personne ne vous pénalise si vous ne les prenez pas. Voici ce qui les distingue.',
    excerptEn:
      'Two appointments, two purposes, one thing in common: nobody penalises you for skipping them. Here is what tells them apart.',
    readingMinutes: 6,
    heroAltFr: 'Consultation postnatale et entretien postnatal précoce',
    heroAltEn: 'Postnatal check-up and early postnatal interview',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Après la naissance, deux rendez-vous portent des noms proches et sont souvent confondus : la consultation postnatale et l’entretien postnatal précoce. Ils ne répondent pourtant pas à la même question, et ils ne sont pas proposés par les mêmes personnes au même moment.',
          'Les distinguer évite une confusion fréquente : penser qu’on a déjà « fait le rendez-vous d’après-naissance » alors qu’il en reste un autre, avec un objectif différent.',
        ],
      },
      {
        type: 'text',
        title: 'La consultation postnatale : le suivi médical de la maman',
        paragraphs: [
          'La consultation postnatale est un examen médical, à faire entre 6 et 8 semaines après l’accouchement. Elle peut être réalisée par votre médecin traitant, votre gynécologue ou votre sage-femme, et elle est prise en charge à 100 % par l’Assurance Maladie, dans la limite des tarifs de base. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
          'C’est à cette occasion que sont évaluées la récupération physique et, si besoin, la prescription d’une rééducation périnéale et abdominale. C’est aussi le moment d’aborder la contraception et la reprise d’une vie intime, à votre rythme.',
        ],
      },
      {
        type: 'text',
        title: 'L’entretien postnatal précoce : un temps d’écoute, pas un examen',
        paragraphs: [
          'L’entretien postnatal précoce (EPP) est différent : ce n’est pas un examen médical, mais un temps d’échange centré sur la façon dont vous vivez cette période, vous et votre partenaire si vous le souhaitez. Il peut être mené par une sage-femme ou un médecin, et il est intégralement pris en charge.',
          'Depuis le 1er juillet 2022, l’article 86 de la loi de financement de la Sécurité sociale pour 2022 impose au professionnel de vous le proposer systématiquement, entre la 4e et la 8e semaine après l’accouchement. Un second entretien peut être proposé entre la 10e et la 14e semaine, si vous en exprimez le besoin ou si des signes de fragilité ont été repérés au premier. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile) et [article L2122-1 du Code de la santé publique, Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628790)',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui les distingue, en un coup d’œil',
        items: [
          'Objectif : la consultation postnatale examine votre corps ; l’entretien postnatal précoce parle de votre vécu',
          'Qui la propose : la consultation se programme comme un rendez-vous classique ; l’entretien doit vous être proposé par le professionnel, sans que vous ayez à le demander',
          'Fenêtre : 6 à 8 semaines pour la consultation ; 4 à 8 semaines pour le premier entretien, 10 à 14 semaines pour un éventuel second',
          'Obligation : la loi oblige le professionnel à proposer l’entretien ; elle ne vous oblige à rien',
        ],
      },
      {
        type: 'text',
        title: 'La nuance qui compte, et ce que ça change pour vous',
        paragraphs: [
          'Retenez surtout ceci : l’obligation porte sur le professionnel, pas sur vous. C’est à lui de vous proposer l’entretien ; vous n’avez aucune obligation de l’accepter, et rien ne vous est reproché si vous déclinez ou si la date passe sans qu’il ait lieu.',
          'Si personne ne vous en a parlé dans la fenêtre des 4 à 8 semaines, ce n’est pas trop tard pour le demander vous-même à votre sage-femme ou à votre médecin. La loi fixe une obligation de proposition, pas une date limite qui vous ferme la porte.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Sources : [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile) et [article L2122-1 du Code de la santé publique sur Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628790).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'After a birth, two appointments have similar-sounding names and get mixed up constantly: the postnatal check-up and the early postnatal interview. They do not answer the same question, though, and they are not offered by the same people at the same time.',
          'Telling them apart avoids a common mix-up: thinking you have already done the after-birth appointment, when in fact another one, with a different purpose, is still ahead of you.',
        ],
      },
      {
        type: 'text',
        title: 'The postnatal check-up: your medical follow-up',
        paragraphs: [
          'The postnatal check-up is a medical examination, done between 6 and 8 weeks after the birth. It can be carried out by your GP, your gynaecologist, or your midwife, and it is covered at 100% by Assurance Maladie, within standard rate limits. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
          'This is the appointment where your physical recovery is assessed and, if needed, perineal and abdominal rehabilitation is prescribed. It is also the moment to discuss contraception and resuming intimacy, at your own pace.',
        ],
      },
      {
        type: 'text',
        title: 'The early postnatal interview: a listening space, not an exam',
        paragraphs: [
          'The entretien postnatal précoce (early postnatal interview, EPP) is different: it is not a medical exam but a conversation focused on how you are experiencing this period, you and your partner if you wish. It can be led by a midwife or a doctor, and it is fully covered.',
          'Since 1 July 2022, article 86 of the Social Security financing law for 2022 requires the professional to systematically offer it to you, between the 4th and 8th week after the birth. A second interview can be offered between the 10th and 14th week, if you ask for it or if signs of difficulty were noticed at the first one. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile) and [article L2122-1 of the Code de la santé publique, Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628790)',
        ],
      },
      {
        type: 'list',
        title: 'What tells them apart, at a glance',
        items: [
          'Purpose: the postnatal check-up examines your body; the early postnatal interview talks about your experience',
          'Who arranges it: the check-up is booked like a normal appointment; the interview must be offered to you by the professional, without you having to ask',
          'Window: 6 to 8 weeks for the check-up; 4 to 8 weeks for the first interview, 10 to 14 weeks for a possible second one',
          'Obligation: the law obliges the professional to offer the interview; it obliges you to nothing',
        ],
      },
      {
        type: 'text',
        title: 'The nuance that matters, and what it means for you',
        paragraphs: [
          'The key point to remember is this: the obligation sits with the professional, not with you. It is their job to offer you the interview; you are under no obligation to accept it, and nothing is held against you if you decline, or if the date passes without it happening.',
          'If nobody has brought it up within the 4-to-8-week window, it is not too late to ask for it yourself, from your midwife or your doctor. The law sets an obligation to offer, not a deadline that shuts the door on you.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Sources: [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile) and [article L2122-1 of the Code de la santé publique on Légifrance](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000044628790).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'reeducation-perineale-ce-quil-faut-savoir',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Rééducation périnéale : ce qu’il faut savoir avant la prescription',
    titleEn: 'Perineal rehabilitation in France: what to know before the prescription',
    excerptFr:
      'C’est un droit, prescrit après la naissance, avec des séances prises en charge. Voici comment il s’enclenche, pas comment le pratiquer.',
    excerptEn:
      'It is an entitlement, prescribed after birth, with sessions covered. Here is how it gets started, not how to do it.',
    readingMinutes: 5,
    heroAltFr: 'Rééducation périnéale après la naissance',
    heroAltEn: 'Perineal rehabilitation after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La rééducation périnéale est un droit ouvert après une naissance, quel que soit le mode d’accouchement. Ce texte porte sur ce droit et sur la façon dont il s’enclenche : la prescription, le choix du professionnel, la prise en charge. Il ne porte pas sur les exercices eux-mêmes, qui relèvent du professionnel qui vous suit.',
        ],
      },
      {
        type: 'text',
        title: 'Qui prescrit, et quand',
        paragraphs: [
          'La rééducation périnéale se prescrit à l’occasion de la consultation postnatale, entre 6 et 8 semaines après l’accouchement. Le professionnel qui vous examine, médecin traitant, gynécologue, sage-femme ou urologue, évalue si elle est nécessaire et rédige l’ordonnance à ce moment-là, pas avant.',
          'C’est une différence importante à connaître : il n’y a pas de rééducation périnéale sans cet examen préalable. Aucun professionnel ne la prescrit en amont de l’accouchement, et ce n’est pas un oubli si personne ne vous en parle avant.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que couvre la prise en charge',
        paragraphs: [
          'Les séances de rééducation périnéale prescrites après une naissance sont couvertes par l’Assurance Maladie, chez un masseur-kinésithérapeute ou une sage-femme, au choix. Une rééducation abdominale peut s’y ajouter en complément, si le professionnel la juge utile après validation de la récupération périnéale.',
          'Il n’existe pas de délai limite pour utiliser cette prescription : vous pouvez commencer les séances quand vous êtes prête, pas nécessairement dans la foulée de la consultation. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
        ],
      },
      {
        type: 'list',
        title: 'Ce qu’il faut retenir',
        items: [
          'La prescription vient après l’accouchement, à la consultation postnatale, jamais avant',
          'Vous choisissez le professionnel : sage-femme ou masseur-kinésithérapeute',
          'Le rythme vous appartient : rien n’oblige à commencer immédiatement après la prescription',
          'Une rééducation abdominale peut être ajoutée en complément, sur décision du professionnel',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ça vaut la peine de le savoir maintenant',
        paragraphs: [
          'Beaucoup de femmes découvrent ce droit sur le moment, à la consultation postnatale, sans avoir eu le temps d’y réfléchir avant. Savoir qu’il existe et comment il s’enclenche permet d’arriver à ce rendez-vous en ayant déjà les bonnes questions à poser, plutôt que de découvrir la démarche en même temps que la prescription.',
          'Ce texte ne remplace en rien l’avis du professionnel qui vous examine : lui seul peut juger de ce qui vous convient, à quel rythme, et avec quel accompagnement.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Les conditions de prise en charge sont détaillées sur [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile).',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Perineal rehabilitation is an entitlement opened after a birth, whatever the delivery method. This piece is about that entitlement and how it gets started: the prescription, choosing a professional, coverage. It is not about the exercises themselves, which are for the professional following you to decide.',
        ],
      },
      {
        type: 'text',
        title: 'Who prescribes it, and when',
        paragraphs: [
          'Perineal rehabilitation is prescribed at the postnatal check-up, between 6 and 8 weeks after the birth. The professional examining you, your GP, gynaecologist, midwife, or urologist, assesses whether it is needed and writes the prescription at that point, not before.',
          'This is an important distinction: there is no perineal rehabilitation without this prior examination. No professional prescribes it ahead of the birth, and it is not an oversight if nobody mentions it to you beforehand.',
        ],
      },
      {
        type: 'text',
        title: 'What the coverage includes',
        paragraphs: [
          'Perineal rehabilitation sessions prescribed after a birth are covered by Assurance Maladie, with either a physiotherapist or a midwife, your choice. Abdominal rehabilitation can be added on top, if the professional judges it useful once perineal recovery has been confirmed.',
          'There is no deadline for using the prescription: you can start the sessions whenever you feel ready, not necessarily right after the check-up. [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile)',
        ],
      },
      {
        type: 'list',
        title: 'What to remember',
        items: [
          'The prescription comes after the birth, at the postnatal check-up, never before',
          'You choose the professional: midwife or physiotherapist',
          'The pace is yours: nothing forces you to start right after the prescription',
          'Abdominal rehabilitation can be added on top, at the professional’s discretion',
        ],
      },
      {
        type: 'text',
        title: 'Why it is worth knowing now',
        paragraphs: [
          'Many women discover this entitlement on the spot, at the postnatal check-up, without having had time to think it through beforehand. Knowing it exists, and how it starts, means arriving at that appointment already knowing what to ask, rather than learning about the process and the prescription at the same time.',
          'None of this replaces the judgment of the professional examining you: only they can assess what suits you, at what pace, and with what support.',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Coverage details are on [ameli.fr](https://www.ameli.fr/assure/sante/devenir-parent/accouchement-nouveau-ne-et-retour-la-maison/suivi-domicile).',
        ],
      },
    ],
  }),

  postPair({
    slug: 'organiser-les-premieres-semaines',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Organiser les premières semaines après la naissance : ce qui se prépare pendant la grossesse',
    titleEn: 'Organising the first weeks after birth: what to prepare during pregnancy',
    excerptFr:
      'Le batch cooking, les tours de nuit, qui aide et quand : ce qui se décide à tête reposée pendant la grossesse évite bien des tensions après.',
    excerptEn:
      'Batch cooking, night shifts, who helps and when: what gets decided calmly during pregnancy avoids a lot of friction afterwards.',
    readingMinutes: 6,
    heroAltFr: 'Organiser les premières semaines après la naissance',
    heroAltEn: 'Organising the first weeks after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les premières semaines après une naissance ne se préparent pas avec une liste d’achats, mais avec des décisions d’organisation. Qui fait quoi, qui vient quand, comment se répartissent les nuits : ce sont des choix qui se prennent bien mieux à tête reposée, pendant la grossesse, qu’improvisés à la sortie de la maternité.',
        ],
      },
      {
        type: 'text',
        title: 'La différence entre une aide prévue et une visite',
        paragraphs: [
          'Une aide décidée à l’avance a un rôle défini : quelqu’un vient faire les courses le mardi, quelqu’un d’autre prend le linge le jeudi. Une visite, même bienveillante, demande de l’énergie : accueillir, expliquer, parfois rassurer sur des choix qui ne regardent que vous.',
          'Distinguer les deux avant la naissance change tout. Cela permet de dire à l’entourage, sans malaise, ce que vous attendez réellement : un coup de main concret, pas une visite de courtoisie.',
        ],
      },
      {
        type: 'text',
        title: 'Le batch cooking, une préparation qui rapporte vite',
        paragraphs: [
          'Cuisiner et congeler des plats avant l’accouchement est l’une des préparations les plus rentables : elle retire une charge mentale quotidienne au moment où l’énergie manque le plus. Pas besoin d’un mois de repas : quelques plats simples, en quantité, suffisent à passer les deux premières semaines sans y penser.',
          'C’est aussi une tâche que l’entourage peut prendre en charge à votre place si vous le proposez clairement : demander à quelqu’un de cuisiner et de congeler pour vous est une aide beaucoup plus utile qu’un cadeau.',
        ],
      },
      {
        type: 'text',
        title: 'Répartir les nuits, en couple',
        paragraphs: [
          'La répartition des nuits entre les deux parents se décide mieux avant la naissance, en connaissant les contraintes de chacun : qui reprend le travail en premier, qui peut récupérer en journée, qui allaite ou non. Ce n’est pas une règle à fixer définitivement, mais un premier accord dont vous pourrez vous écarter selon ce qui se passe réellement.',
          'En parler avant évite d’improviser la répartition en pleine nuit, épuisés, au moment où les désaccords sont les plus difficiles à gérer calmement.',
        ],
      },
      {
        type: 'list',
        title: 'Ce qui se prépare concrètement pendant la grossesse',
        items: [
          'Une liste de plats à cuisiner et congeler avant le terme',
          'Un premier accord sur la répartition des nuits entre les deux parents',
          'Une liste de personnes prêtes à une aide concrète, avec un rôle précis pour chacune',
          'Un point sur qui prévenir en premier après la naissance, et dans quel ordre',
        ],
      },
      {
        type: 'text',
        title: 'Le bon moment pour en parler',
        paragraphs: [
          'Ces conversations se mènent mieux entre le 6e et le 8e mois, quand la fatigue de fin de grossesse n’a pas encore tout pris. Elles n’ont pas besoin d’être formelles : un message groupé à quelques proches, une discussion en couple un soir, suffisent à poser les bases.',
          'Rien n’empêche d’ajuster ensuite. L’objectif n’est pas d’avoir tout prévu, mais de ne pas tout découvrir en même temps que le bébé.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The first weeks after a birth are not prepared with a shopping list, but with organisational decisions. Who does what, who comes and when, how the nights get split: these are choices made far better with a clear head, during pregnancy, than improvised on the way out of the maternity ward.',
        ],
      },
      {
        type: 'text',
        title: 'The difference between planned help and a visit',
        paragraphs: [
          'Help decided in advance has a defined role: someone does the shopping on Tuesday, someone else takes the laundry on Thursday. A visit, however well meant, takes energy: welcoming someone, explaining things, sometimes reassuring them about choices that are nobody’s business but yours.',
          'Telling the two apart before the birth changes everything. It lets you tell people, without awkwardness, what you actually need: concrete help, not a courtesy visit.',
        ],
      },
      {
        type: 'text',
        title: 'Batch cooking: preparation that pays off fast',
        paragraphs: [
          'Cooking and freezing meals before the birth is one of the most efficient things to prepare: it removes a daily mental load right when energy is scarcest. You do not need a month of meals. A handful of simple dishes, made in bulk, is enough to get through the first couple of weeks without thinking about it.',
          'It is also a task the people around you can take on in your place, if you ask clearly. Asking someone to cook and freeze meals for you is far more useful help than a gift.',
        ],
      },
      {
        type: 'text',
        title: 'Splitting the nights, as a couple',
        paragraphs: [
          'Splitting nights between the two parents is a decision made better before the birth, once you know each other’s constraints: who goes back to work first, who can recover during the day, who is breastfeeding or not. It is not a rule to fix forever, just a first agreement you can adjust once you see how things actually go.',
          'Talking about it beforehand means you are not improvising the split in the middle of the night, exhausted, right when disagreements are hardest to handle calmly.',
        ],
      },
      {
        type: 'list',
        title: 'What actually gets prepared during pregnancy',
        items: [
          'A list of meals to cook and freeze before the due date',
          'A first agreement on splitting nights between the two parents',
          'A list of people ready to give concrete help, each with a defined role',
          'A plan for who to tell first after the birth, and in what order',
        ],
      },
      {
        type: 'text',
        title: 'The right time to talk about it',
        paragraphs: [
          'These conversations work best between month six and month eight, before late-pregnancy fatigue takes over. They do not need to be formal: a group message to a few close people, a conversation between the two of you one evening, is enough to lay the groundwork.',
          'Nothing stops you adjusting things afterwards. The goal is not to have planned everything, just not to discover it all at the same time as the baby.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'cadrer-les-visites-apres-naissance',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Cadrer les visites après la naissance : le préparer avant, pas le subir après',
    titleEn: 'Setting a frame for visitors after birth: decide it before, don’t just endure it after',
    excerptFr:
      'Durée, horaires, qui prévenir en premier : le cadre se pense avant que les demandes arrivent. Le décider épuisée, c’est le décider mal.',
    excerptEn:
      'How long, what time, who to tell first: the frame gets set before the requests arrive. Deciding it exhausted means deciding it badly.',
    readingMinutes: 5,
    heroAltFr: 'Cadrer les visites après la naissance',
    heroAltEn: 'Setting a frame for visits after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Après une naissance, les visites arrivent vite, souvent plus vite qu’on ne l’imaginait. Grands-parents, frères et sœurs, amis proches : chacun veut voir le bébé, et chacun a sa propre idée de ce qui est raisonnable. Le cadre que vous n’aurez pas posé à l’avance, vous devrez l’improviser au moment où vous serez le moins en état de le faire.',
        ],
      },
      {
        type: 'text',
        title: 'Pourquoi ça se prépare avant, pas après',
        paragraphs: [
          'Poser un cadre suppose parfois de dire non, ou de demander à quelqu’un de revenir plus tard. C’est une décision simple à prendre froidement, pendant la grossesse, et beaucoup plus difficile à formuler face à quelqu’un déjà à la porte, les bras chargés de cadeaux.',
          'En parler à deux avant la naissance permet aussi de présenter un front commun. Ce n’est plus l’un des deux parents qui refuse une visite, c’est une règle du couple, décidée ensemble, plus facile à faire respecter.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qui se décide concrètement',
        paragraphs: [
          'La durée d’une visite, quinze ou vingt minutes suffisent largement dans les premiers jours, est plus facile à annoncer si elle est déjà fixée avant que quelqu’un arrive. Il en va de même pour les horaires : préférer l’après-midi, éviter les heures de sieste ou de tétée, sont des règles simples qui évitent bien des frictions.',
          'L’ordre dans lequel vous prévenez compte aussi. Décider à l’avance qui apprend la nouvelle en premier, et par quel moyen, évite les malentendus et les susceptibilités au moment où vous avez le moins d’énergie pour les gérer.',
        ],
      },
      {
        type: 'list',
        title: 'Des règles simples à décider avant',
        items: [
          'Une durée de visite par défaut, la même pour tout le monde',
          'Des horaires à éviter, liés au rythme du bébé et au vôtre',
          'Un ordre pour prévenir les proches, décidé en couple',
          'Une personne référente pour relayer les nouvelles, si vous ne voulez pas répondre à chacun individuellement',
        ],
      },
      {
        type: 'text',
        title: 'Le dire sans se justifier',
        paragraphs: [
          'Une phrase préparée à l’avance suffit souvent : « on est ravis de vous voir, on préfère des visites courtes les premières semaines ». Elle n’a besoin ni d’explication ni d’excuse. L’avoir déjà formulée avant la naissance, ensemble, la rend beaucoup plus facile à dire le moment venu.',
          'Ce cadre n’est pas fixé pour toujours. Il sert à passer les premières semaines, le temps que vous trouviez votre rythme. Vous pourrez l’assouplir ensuite, à votre allure.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'After a birth, visitors show up fast, often faster than you expected. Grandparents, siblings, close friends: everyone wants to see the baby, and everyone has their own idea of what counts as reasonable. Whatever frame you have not set in advance, you will end up improvising at the moment you are least able to.',
        ],
      },
      {
        type: 'text',
        title: 'Why this gets prepared before, not after',
        paragraphs: [
          'Setting a frame sometimes means saying no, or asking someone to come back later. That is a simple decision to make with a clear head during pregnancy, and a much harder one to put into words in front of someone already at the door with gifts.',
          'Talking it through as a couple before the birth also means presenting a united front. It is no longer one parent turning down a visit, it is a rule the couple decided together, and much easier to hold to.',
        ],
      },
      {
        type: 'text',
        title: 'What actually gets decided',
        paragraphs: [
          'How long a visit lasts, fifteen or twenty minutes is plenty in the first days, is far easier to announce if it is already set before anyone arrives. The same goes for timing: preferring afternoons, avoiding nap times or feeds, are simple rules that head off a lot of friction.',
          'The order in which you tell people matters too. Deciding in advance who hears the news first, and how, avoids misunderstandings and hurt feelings at the moment you have the least energy to manage them.',
        ],
      },
      {
        type: 'list',
        title: 'Simple rules to decide in advance',
        items: [
          'A default visit length, the same for everyone',
          'Times to avoid, tied to the baby’s rhythm and yours',
          'An order for telling people, agreed as a couple',
          'One point of contact to pass on news, if you would rather not answer everyone individually',
        ],
      },
      {
        type: 'text',
        title: 'Saying it without justifying it',
        paragraphs: [
          'A sentence prepared in advance often does the job: "we would love to see you, we are keeping visits short for the first few weeks." It needs no explanation and no apology. Having already worked it out together before the birth makes it far easier to say when the moment comes.',
          'This frame is not set in stone. It is there to get you through the first weeks, while you find your rhythm. You can loosen it later, at your own pace.',
        ],
      },
    ],
  }),

  postPair({
    slug: 'baby-blues-qui-appeler',
    categoryKey: 'postpartum',
    categoryFr: 'Le retour à la maison',
    categoryEn: 'Coming home',
    titleFr: 'Baby blues : qui appeler, maintenant, avant d’en avoir besoin',
    titleEn: 'Baby blues: who to call, now, before you need to',
    excerptFr:
      'Pas un questionnaire, une liste de numéros. Enregistrez-les dans votre téléphone pendant la grossesse : c’est le seul moment où vous avez l’énergie de le faire.',
    excerptEn:
      'Not a quiz, a list of numbers. Save them in your phone during pregnancy: it is the only moment you will have the energy to do it.',
    readingMinutes: 4,
    heroAltFr: 'Numéros à appeler après la naissance',
    heroAltEn: 'Numbers to call after birth',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Ce texte ne cherche pas à vous dire si vous allez bien ou non. Il n’y a ici ni liste de signes à cocher ni test à faire. Le baby blues et les difficultés psychiques après une naissance sont fréquents, ils ne disent rien de vous en tant que mère, et la seule chose utile à savoir maintenant, c’est qui appeler.',
          'Le bon moment pour enregistrer ces numéros, c’est pendant la grossesse, pas après. Une fois le bébé là, personne n’a l’énergie de chercher un numéro qu’on n’a pas déjà sous la main.',
        ],
      },
      {
        type: 'text',
        title: 'Votre sage-femme',
        paragraphs: [
          'Votre sage-femme reste un interlocuteur après la naissance, pas seulement pendant la grossesse. Elle vous connaît déjà, elle sait ce que vous avez traversé, et c’est souvent la personne la plus simple à contacter en premier, sans avoir à tout réexpliquer depuis le début.',
        ],
      },
      {
        type: 'text',
        title: 'Votre médecin traitant',
        paragraphs: [
          'Votre médecin traitant peut être contacté à tout moment, y compris en dehors du cadre du suivi de grossesse. C’est un point d’entrée vers un accompagnement plus poussé si besoin, et il connaît votre histoire médicale globale.',
        ],
      },
      {
        type: 'text',
        title: 'La PMI',
        paragraphs: [
          'La Protection maternelle et infantile (PMI) propose des consultations et un accompagnement pour les parents et les enfants de moins de six ans, gratuitement, près de chez vous. Vous pouvez trouver le centre le plus proche sur [l’annuaire service-public.fr](https://lannuaire.service-public.gouv.fr/navigation/pmi).',
        ],
      },
      {
        type: 'text',
        title: 'Le 3114',
        paragraphs: [
          'Le 3114 est le numéro national de prévention du suicide, gratuit et accessible 24 heures sur 24, 7 jours sur 7. Il s’adresse à toute personne en détresse psychologique, pas seulement en cas d’urgence vitale : appeler pour être écoutée, sans que ce soit grave au sens où vous l’imaginez, fait partie de ce à quoi il sert. [3114.fr](https://3114.fr/)',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'Ce n’est pas grave d’appeler pour moins que ce que vous croyez. Sage-femme, médecin traitant, PMI, 3114 : quatre numéros, à enregistrer maintenant.',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'This piece is not here to tell you whether you are doing fine or not. There is no checklist of signs to tick off, no test to take. Baby blues and psychological difficulties after a birth are common, they say nothing about you as a mother, and the one useful thing to know now is who to call.',
          'The right time to save these numbers is during pregnancy, not after. Once the baby is here, nobody has the energy to go looking for a number they do not already have on hand.',
        ],
      },
      {
        type: 'text',
        title: 'Your midwife',
        paragraphs: [
          'Your midwife remains someone to contact after the birth, not only during pregnancy. She already knows you, she knows what you have been through, and she is often the simplest person to call first, without having to explain everything from scratch.',
        ],
      },
      {
        type: 'text',
        title: 'Your GP',
        paragraphs: [
          'Your GP (médecin traitant) can be contacted at any time, including outside the pregnancy follow-up. They are a way in to further support if needed, and they know your overall medical history.',
        ],
      },
      {
        type: 'text',
        title: 'The PMI',
        paragraphs: [
          'The PMI (Protection maternelle et infantile) offers consultations and support for parents and children under six, free of charge, near you. You can find your nearest centre through the [official directory on service-public.fr](https://lannuaire.service-public.gouv.fr/navigation/pmi).',
        ],
      },
      {
        type: 'text',
        title: 'The 3114',
        paragraphs: [
          'The 3114 is France’s national suicide prevention line, free and open 24 hours a day, seven days a week. It is there for anyone in psychological distress, not only in a life-threatening emergency: calling to be listened to, without it needing to be as serious as you imagine, is exactly what it is for. [3114.fr](https://3114.fr/)',
        ],
      },
      {
        type: 'callout',
        paragraphs: [
          'It is fine to call for less than you think you need to. Midwife, GP, PMI, 3114: four numbers, worth saving now.',
        ],
      },
    ],
  }),
];

export const POSTS_RETOUR_FR: BlogPost[] = pairs.map((p) => p.fr);
export const POSTS_RETOUR_EN: BlogPost[] = pairs.map((p) => p.en);
