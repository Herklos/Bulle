/**
 * SEO batch 10 — suivi médical, en logistique et remboursement (scheduling-only).
 *
 * categoryKey 'sante', so attributed to Camille (the sage-femme). §7.3 is the binding
 * constraint: each article says WHEN a test/appointment happens, WHO does it, whether it is
 * PROPOSED or mandatory, and that it is covered. The clinical purpose is stated in one neutral
 * phrase attributed to ameli/HAS, never as Bulle's own recommendation; no result is
 * interpreted, no threshold is turned into advice, no decision is made for the reader. The
 * medical disclaimer stays on every one. No euro amounts.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'depistage-combine-trisomie-premier-trimestre-remboursement',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Dépistage combiné du 1er trimestre : quand il se fait, et son remboursement',
    titleEn: 'First-trimester combined screening: when it happens, and its coverage',
    excerptFr:
      'Le dépistage combiné est proposé, pas imposé. Il associe l’échographie du 1er trimestre à une prise de sang, à une fenêtre précise, et il est pris en charge. Voici les repères, sans interprétation.',
    excerptEn:
      'Combined screening is offered, not imposed. It pairs the first-trimester scan with a blood test, in a precise window, and it is covered. Here are the markers, without interpretation.',
    readingMinutes: 3,
    heroAltFr: 'Le dépistage combiné du premier trimestre',
    heroAltEn: 'First-trimester combined screening',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le dépistage combiné du premier trimestre revient dans toutes les grossesses, et suscite beaucoup de questions. Cet article n’en interprète aucun résultat, ce qui relève du professionnel qui vous suit : il en donne le calendrier et le remboursement, des repères stables et utiles.',
          'Premier point à retenir : il est proposé, il n’est pas obligatoire.',
        ],
      },
      {
        type: 'text',
        title: 'Ce qu’il associe, et à quelle fenêtre',
        paragraphs: [
          'Selon la [HAS](https://www.has-sante.fr/jcms/c_2768535/fr/), le dépistage combiné associe la mesure de la clarté nucale, faite lors de l’échographie du premier trimestre, au dosage de marqueurs dans le sang, le tout combiné à l’âge maternel pour estimer un niveau de risque.',
          'La mesure échographique se fait dans une fenêtre précise, entre 11 et 13 semaines d’aménorrhée. C’est ce qui rend le calendrier de ce dépistage assez contraint.',
        ],
      },
      {
        type: 'text',
        title: 'Proposé, remboursé, sans interprétation ici',
        paragraphs: [
          'Ce dépistage est pris en charge par l’Assurance Maladie au titre des examens prénataux. Il aboutit à un niveau de risque, au-delà duquel d’autres examens peuvent être proposés.',
          'Ce que ce niveau de risque signifie pour vous se discute uniquement avec le professionnel qui vous suit. Cette page s’arrête volontairement au calendrier et à la prise en charge.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Proposé, non obligatoire',
          'Associe la clarté nucale (échographie) et des marqueurs sanguins',
          'Échographie de mesure entre 11 et 13 SA',
          'Pris en charge au titre des examens prénataux',
          'L’interprétation du risque : avec le professionnel qui vous suit',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'First-trimester combined screening comes up in every pregnancy, and raises many questions. This article interprets none of its results, which is for the professional following you: it gives the timing and the coverage, stable and useful markers.',
          'First point to remember: it is offered, it is not mandatory.',
        ],
      },
      {
        type: 'text',
        title: 'What it combines, and in which window',
        paragraphs: [
          'According to the [HAS](https://www.has-sante.fr/jcms/c_2768535/fr/), combined screening pairs the nuchal translucency measure, taken during the first-trimester scan, with the measurement of blood markers, all combined with maternal age to estimate a risk level.',
          'The ultrasound measure is done in a precise window, between 11 and 13 weeks. That is what makes this screening\'s calendar fairly tight.',
        ],
      },
      {
        type: 'text',
        title: 'Offered, covered, no interpretation here',
        paragraphs: [
          'This screening is covered by the health insurance system as a prenatal exam. It results in a risk level, beyond which other exams may be offered.',
          'What that risk level means for you is discussed only with the professional following you. This page deliberately stops at the calendar and the coverage.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Offered, not mandatory',
          'Combines nuchal translucency (scan) and blood markers',
          'Measuring scan between 11 and 13 weeks',
          'Covered as a prenatal exam',
          'Interpreting the risk: with the professional following you',
        ],
      },
    ],
  }),

  postPair({
    slug: 'dpni-adn-foetal-remboursement-conditions',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'DPNI (ADN fœtal) : dans quelles conditions il est remboursé',
    titleEn: 'Cell-free DNA test: under what conditions it is reimbursed',
    excerptFr:
      'Le DPNI est une prise de sang proposée après le dépistage combiné, selon le niveau de risque. Il est remboursé sous conditions depuis 2019. Voici le cadre, sans interprétation.',
    excerptEn:
      'The cell-free DNA test is a blood test offered after combined screening, depending on the risk level. It has been reimbursed under conditions since 2019. Here is the framework.',
    readingMinutes: 3,
    heroAltFr: 'Le DPNI et son remboursement',
    heroAltEn: 'The cell-free DNA test and its coverage',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le DPNI, dépistage prénatal non invasif fondé sur l’ADN fœtal circulant dans le sang de la mère, est de plus en plus courant. Cet article en précise le cadre : quand il est proposé, et à quelles conditions il est remboursé. Il n’interprète aucun résultat.',
          'Ce test s’inscrit dans la suite du dépistage combiné, pas à sa place.',
        ],
      },
      {
        type: 'text',
        title: 'Proposé selon le niveau de risque',
        paragraphs: [
          'Le DPNI est une prise de sang proposée à la suite du dépistage combiné, en fonction du niveau de risque estimé. La [HAS](https://www.has-sante.fr/jcms/c_2768535/fr/) recommande de le proposer notamment lorsque ce risque se situe dans une certaine fourchette.',
          'C’est donc un examen de deuxième intention, orienté par le premier dépistage. La décision de le réaliser se prend avec le professionnel qui vous suit.',
        ],
      },
      {
        type: 'text',
        title: 'Remboursé sous conditions depuis 2019',
        paragraphs: [
          'Le DPNI est remboursable par l’Assurance Maladie depuis janvier 2019, sous des conditions précises, comme le rappelle [ameli.fr](https://www.ameli.fr/assure/sante/examen/gynecologie/deroulement-amniocentese-choriocentese). La HAS a par ailleurs actualisé le parcours de dépistage pour y intégrer ces tests ADN.',
          'Le détail des conditions de prise en charge et la signification d’un résultat relèvent du professionnel de santé. Cette page se limite au principe : proposé selon le risque, remboursé sous conditions.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Prise de sang fondée sur l’ADN fœtal circulant',
          'Proposé à la suite du dépistage combiné, selon le niveau de risque',
          'Examen de deuxième intention, décidé avec le professionnel',
          'Remboursable par l’Assurance Maladie depuis janvier 2019, sous conditions',
          'Conditions détaillées et interprétation : avec le professionnel',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The cell-free DNA test, non-invasive prenatal screening based on fetal DNA circulating in the mother\'s blood, is increasingly common. This article sets out its framework: when it is offered, and under what conditions it is reimbursed. It interprets no result.',
          'This test follows on from combined screening, not in its place.',
        ],
      },
      {
        type: 'text',
        title: 'Offered according to the risk level',
        paragraphs: [
          'The test is a blood test offered following combined screening, depending on the estimated risk level. The [HAS](https://www.has-sante.fr/jcms/c_2768535/fr/) recommends offering it notably when that risk falls within a certain range.',
          'So it is a second-line exam, guided by the first screening. The decision to do it is taken with the professional following you.',
        ],
      },
      {
        type: 'text',
        title: 'Reimbursed under conditions since 2019',
        paragraphs: [
          'The test has been reimbursable by the health insurance system since January 2019, under precise conditions, as [ameli.fr](https://www.ameli.fr/assure/sante/examen/gynecologie/deroulement-amniocentese-choriocentese) recalls. The HAS has also updated the screening pathway to integrate these DNA tests.',
          'The detail of the coverage conditions and the meaning of a result are for the health professional. This page limits itself to the principle: offered according to risk, reimbursed under conditions.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A blood test based on circulating fetal DNA',
          'Offered following combined screening, by risk level',
          'A second-line exam, decided with the professional',
          'Reimbursable by the health insurance system since January 2019, under conditions',
          'Detailed conditions and interpretation: with the professional',
        ],
      },
    ],
  }),

  postPair({
    slug: 'amniocentese-remboursement-quand-prescrite',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Amniocentèse : quand elle est prescrite, et son remboursement',
    titleEn: 'Amniocentesis: when it is prescribed, and its coverage',
    excerptFr:
      'L’amniocentèse n’est pas un examen que l’on choisit : elle est prescrite par le professionnel dans certaines situations, et prise en charge. Voici le cadre, sans conseil médical.',
    excerptEn:
      'Amniocentesis is not an exam you choose: it is prescribed by the professional in certain situations, and covered. Here is the framework, without medical advice.',
    readingMinutes: 3,
    heroAltFr: 'L’amniocentèse et son remboursement',
    heroAltEn: 'Amniocentesis and its coverage',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’amniocentèse inquiète souvent, et fait l’objet de beaucoup d’idées reçues. Cet article n’aborde ni ses indications médicales ni ses risques, qui relèvent strictement du professionnel : il précise seulement quand elle intervient dans le parcours et comment elle est prise en charge.',
          'Une chose est essentielle à comprendre : ce n’est pas un examen que l’on demande au menu.',
        ],
      },
      {
        type: 'text',
        title: 'Un acte prescrit, pas choisi',
        paragraphs: [
          'L’amniocentèse est un acte diagnostique, un prélèvement de liquide amniotique en vue d’une analyse, proposé par le professionnel dans certaines situations, selon [ameli.fr](https://www.ameli.fr/assure/sante/examen/gynecologie/deroulement-amniocentese-choriocentese). Elle est prescrite, elle ne se décide pas seule.',
          'Elle intervient notamment lorsque le niveau de risque estimé dépasse un certain seuil, ou dans d’autres situations médicales identifiées par le professionnel.',
        ],
      },
      {
        type: 'text',
        title: 'Sa prise en charge',
        paragraphs: [
          'Dans ces cadres, l’amniocentèse est prise en charge par l’Assurance Maladie. Elle l’est aussi dans certaines situations précises, comme un âge maternel donné ou une anomalie repérée à l’échographie.',
          'Le reste, indication, déroulement, risques et interprétation, appartient au dialogue avec le professionnel de santé. Cette page se limite volontairement au moment et au remboursement.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Acte diagnostique, prélèvement de liquide amniotique',
          'Prescrit par le professionnel, pas choisi par la patiente seule',
          'Proposé dans certaines situations (niveau de risque, autres critères)',
          'Pris en charge par l’Assurance Maladie dans ces cadres',
          'Indication, risques et interprétation : avec le professionnel',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Amniocentesis often worries people and is the subject of many misconceptions. This article addresses neither its medical indications nor its risks, which are strictly for the professional: it only sets out when it comes into the pathway and how it is covered.',
          'One thing is essential to understand: it is not an exam you order off a menu.',
        ],
      },
      {
        type: 'text',
        title: 'A prescribed act, not chosen',
        paragraphs: [
          'Amniocentesis is a diagnostic act, a sample of amniotic fluid for analysis, offered by the professional in certain situations, according to [ameli.fr](https://www.ameli.fr/assure/sante/examen/gynecologie/deroulement-amniocentese-choriocentese). It is prescribed, it is not decided alone.',
          'It comes in notably when the estimated risk level exceeds a certain threshold, or in other medical situations identified by the professional.',
        ],
      },
      {
        type: 'text',
        title: 'Its coverage',
        paragraphs: [
          'In these settings, amniocentesis is covered by the health insurance system. It is also covered in certain specific situations, such as a given maternal age or an anomaly spotted on the scan.',
          'The rest, indication, procedure, risks and interpretation, belongs to the dialogue with the health professional. This page deliberately limits itself to the timing and the coverage.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A diagnostic act, a sample of amniotic fluid',
          'Prescribed by the professional, not chosen by the patient alone',
          'Offered in certain situations (risk level, other criteria)',
          'Covered by the health insurance system in these settings',
          'Indication, risks and interpretation: with the professional',
        ],
      },
    ],
  }),

  postPair({
    slug: 'groupe-sanguin-rhesus-anti-d-calendrier-remboursement',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Groupe sanguin, rhésus et injection anti-D : le calendrier des examens',
    titleEn: 'Blood group, rhesus and anti-D injection: the exam calendar',
    excerptFr:
      'Le groupe sanguin et le rhésus sont déterminés en début de grossesse. Pour un rhésus négatif, un suivi spécifique est programmé. Voici le calendrier et la prise en charge, sans interprétation.',
    excerptEn:
      'Blood group and rhesus are determined early in pregnancy. For a rhesus-negative woman, specific follow-up is scheduled. Here is the calendar and coverage, without interpretation.',
    readingMinutes: 3,
    heroAltFr: 'Le suivi du groupe sanguin et du rhésus en grossesse',
    heroAltEn: 'Blood-group and rhesus follow-up in pregnancy',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le groupe sanguin et le rhésus font partie des tout premiers examens de la grossesse. Autour du rhésus négatif circulent beaucoup de questions. Cet article n’interprète aucun résultat : il donne le calendrier des examens et leur prise en charge.',
          'C’est la partie logistique d’un suivi que le professionnel, lui, met en musique.',
        ],
      },
      {
        type: 'text',
        title: 'Des examens programmés en début de grossesse',
        paragraphs: [
          'Des examens sanguins déterminent en début de grossesse le groupe sanguin et le rhésus, et recherchent d’éventuelles agglutinines irrégulières, selon [ameli.fr](https://www.ameli.fr/content/suivi-et-orientation-de-la-femme-enceinte). Un calendrier personnalisé est envoyé après la déclaration de grossesse.',
          'Pour une femme rhésus négatif, une recherche d’agglutinines est notamment programmée au 6e et au 8e mois. C’est un suivi prévu, pas un signe d’alerte en soi.',
        ],
      },
      {
        type: 'text',
        title: 'L’injection anti-D, et le remboursement',
        paragraphs: [
          'Selon ameli, le sérum anti-rhésus, l’injection anti-D, est indiqué après chaque accouchement, et aussi en cas de fausse couche ou d’interruption de grossesse ; son but, tel que décrit par l’Assurance Maladie, est de protéger de futures grossesses. Le moment et l’indication précise de l’injection relèvent du professionnel.',
          'Ces examens prénataux sont pris en charge par l’Assurance Maladie. Cette page s’en tient au calendrier et à la couverture ; tout le reste se discute avec votre soignant.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Groupe sanguin et rhésus déterminés en début de grossesse',
          'Calendrier personnalisé envoyé après la déclaration de grossesse',
          'Rhésus négatif : recherche d’agglutinines notamment aux 6e et 8e mois',
          'Injection anti-D indiquée après l’accouchement et dans certains cas',
          'Examens pris en charge ; interprétation et indication avec le professionnel',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Blood group and rhesus are among the very first exams of pregnancy. Around rhesus-negative status circulate many questions. This article interprets no result: it gives the exam calendar and coverage.',
          'It is the logistical part of a follow-up the professional orchestrates.',
        ],
      },
      {
        type: 'text',
        title: 'Exams scheduled early in pregnancy',
        paragraphs: [
          'Blood exams determine the blood group and rhesus early in pregnancy, and look for irregular agglutinins, according to [ameli.fr](https://www.ameli.fr/content/suivi-et-orientation-de-la-femme-enceinte). A personalised calendar is sent after the pregnancy declaration.',
          'For a rhesus-negative woman, an agglutinin test is notably scheduled at the 6th and 8th month. It is a planned follow-up, not a warning sign in itself.',
        ],
      },
      {
        type: 'text',
        title: 'The anti-D injection, and coverage',
        paragraphs: [
          'According to ameli, the anti-rhesus serum, the anti-D injection, is indicated after each birth, and also after a miscarriage or termination; its purpose, as described by the health insurance system, is to protect future pregnancies. The timing and precise indication of the injection are for the professional.',
          'These prenatal exams are covered by the health insurance system. This page sticks to the calendar and the coverage; everything else is discussed with your carer.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Blood group and rhesus determined early in pregnancy',
          'Personalised calendar sent after the pregnancy declaration',
          'Rhesus-negative: agglutinin test notably at the 6th and 8th month',
          'Anti-D injection indicated after the birth and in certain cases',
          'Exams covered; interpretation and indication with the professional',
        ],
      },
    ],
  }),

  postPair({
    slug: 'carnet-de-sante-remis-naissance-a-quoi-il-sert',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Carnet de santé remis à la naissance : à quoi il sert',
    titleEn: 'Health record book given at birth: what it is for',
    excerptFr:
      'Remis à la naissance, le carnet de santé suit l’enfant jusqu’à 18 ans. Il est confidentiel, et un nouveau modèle est entré en vigueur en 2025. Voici l’essentiel.',
    excerptEn:
      'Given at birth, the health record book follows the child to 18. It is confidential, and a new model came into force in 2025. Here are the essentials.',
    readingMinutes: 3,
    heroAltFr: 'Le carnet de santé de l’enfant',
    heroAltEn: 'The child’s health record book',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le carnet de santé est remis à la naissance, et beaucoup de parents le rangent sans mesurer son rôle. C’est pourtant un document central du suivi de l’enfant, et il a quelques particularités utiles à connaître.',
          'Il accompagne l’enfant bien au-delà de la petite enfance.',
        ],
      },
      {
        type: 'text',
        title: 'Un support de suivi jusqu’à 18 ans',
        paragraphs: [
          'Le carnet de santé suit la santé de l’enfant jusqu’à ses dix-huit ans et sert de lien entre les professionnels de santé et la famille, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F810). Il contient des éléments médicaux et des conseils aux parents.',
          'Le réflexe utile : présenter le nouveau carnet au médecin qui suit habituellement l’enfant, pour qu’il le complète, notamment côté vaccinations.',
        ],
      },
      {
        type: 'text',
        title: 'Confidentiel, et renouvelé en 2025',
        paragraphs: [
          'Le carnet est protégé par le secret médical : nul ne peut le consulter sans l’accord du titulaire de l’autorité parentale, ni en exiger la communication. C’est une garantie forte, à connaître face à une demande abusive.',
          'Un nouveau modèle est entré en vigueur le 1er janvier 2025, avec des conseils personnalisés selon l’âge et une protection vaccinale élargie. Une version numérique existe par ailleurs via Mon espace santé.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Remis à la naissance, suit l’enfant jusqu’à 18 ans',
          'Lien entre professionnels de santé et famille',
          'À présenter au médecin qui suit l’enfant pour le compléter',
          'Confidentiel, protégé par le secret médical',
          'Nouveau modèle depuis le 1er janvier 2025, version numérique via Mon espace santé',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The health record book is given at birth, and many parents file it away without realising its role. Yet it is a central document in the child\'s follow-up, and it has a few useful features to know.',
          'It accompanies the child well beyond early childhood.',
        ],
      },
      {
        type: 'text',
        title: 'A follow-up support up to age 18',
        paragraphs: [
          'The health record book follows the child\'s health up to eighteen and serves as a link between health professionals and the family, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F810). It contains medical elements and advice to parents.',
          'The useful reflex: present the new book to the doctor who usually follows the child, so they complete it, notably on vaccinations.',
        ],
      },
      {
        type: 'text',
        title: 'Confidential, and renewed in 2025',
        paragraphs: [
          'The book is protected by medical secrecy: nobody can consult it without the parental-authority holder\'s agreement, or demand it. It is a strong guarantee, worth knowing against an abusive request.',
          'A new model came into force on 1 January 2025, with age-personalised advice and extended vaccine protection. A digital version also exists via Mon espace santé.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Given at birth, follows the child to 18',
          'A link between health professionals and the family',
          'To present to the doctor following the child, to be completed',
          'Confidential, protected by medical secrecy',
          'New model since 1 January 2025, digital version via Mon espace santé',
        ],
      },
    ],
  }),

  postPair({
    slug: 'sage-femme-liberale-suivi-domicile-trouver',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Trouver une sage-femme libérale pour le suivi et les visites à domicile',
    titleEn: 'Finding a self-employed midwife for follow-up and home visits',
    excerptFr:
      'Une sage-femme libérale peut assurer le suivi de grossesse et les visites à domicile après la naissance, prises en charge à 100 %. Voici comment en trouver une, et ce qu’est le PRADO.',
    excerptEn:
      'A self-employed midwife can handle the pregnancy follow-up and home visits after the birth, covered at 100%. Here is how to find one, and what PRADO is.',
    readingMinutes: 3,
    heroAltFr: 'Trouver une sage-femme libérale',
    heroAltEn: 'Finding a self-employed midwife',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La sage-femme libérale est une ressource précieuse et souvent sous-utilisée. Elle peut assurer le suivi de la grossesse et accompagner le retour à la maison, avec des visites à domicile prises en charge à 100 %.',
          'Encore faut-il savoir comment en trouver une, et comment l’Assurance Maladie facilite ce suivi.',
        ],
      },
      {
        type: 'text',
        title: 'Suivi de grossesse et visites après la naissance',
        paragraphs: [
          'Une sage-femme peut assurer le suivi d’une grossesse et l’accompagnement après l’accouchement, selon [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/accouchement-retour-domicile). Après la naissance, une ou plusieurs visites à domicile, du lendemain de l’accouchement au 12e jour, sont prévues et prises en charge à 100 %.',
          'C’est un accompagnement précieux dans les tout premiers jours à la maison, souvent les plus déroutants.',
        ],
      },
      {
        type: 'text',
        title: 'Le PRADO, et où chercher',
        paragraphs: [
          'Le PRADO est le service d’accompagnement du retour à domicile de l’Assurance Maladie : proposé à la maternité, il permet à une sage-femme choisie par la mère d’assurer le suivi à domicile, le premier rendez-vous étant organisé par un conseiller. Il est pris en charge à 100 % jusqu’au 12e jour.',
          'Pour trouver une sage-femme, l’annuaire santé de l’Assurance Maladie recense les professionnels près de chez vous. C’est le point de départ le plus simple.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Une sage-femme peut assurer le suivi de grossesse',
          'Visites à domicile après la naissance, du lendemain au 12e jour, prises en charge à 100 %',
          'PRADO : service de retour à domicile, sage-femme choisie par la mère',
          'Premier rendez-vous PRADO organisé par un conseiller de l’Assurance Maladie',
          'Où chercher : l’annuaire santé de l’Assurance Maladie',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The self-employed midwife is a precious and often under-used resource. She can handle the pregnancy follow-up and support the return home, with home visits covered at 100%.',
          'But you need to know how to find one, and how the health insurance system eases this follow-up.',
        ],
      },
      {
        type: 'text',
        title: 'Pregnancy follow-up and post-birth visits',
        paragraphs: [
          'A midwife can handle a pregnancy follow-up and support after the birth, according to [ameli.fr](https://www.ameli.fr/assure/droits-demarches/famille/maternite-paternite-adoption/accouchement-retour-domicile). After the birth, one or more home visits, from the day after the birth to the 12th day, are planned and covered at 100%.',
          'It is precious support in the very first days at home, often the most disorienting.',
        ],
      },
      {
        type: 'text',
        title: 'PRADO, and where to look',
        paragraphs: [
          'PRADO is the health insurance system\'s return-home support service: offered at the maternity unit, it lets a midwife chosen by the mother handle the home follow-up, the first appointment being organised by an adviser. It is covered at 100% up to the 12th day.',
          'To find a midwife, the health insurance annuaire santé lists professionals near you. It is the simplest starting point.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A midwife can handle the pregnancy follow-up',
          'Home visits after the birth, from the next day to the 12th, covered at 100%',
          'PRADO: return-home service, midwife chosen by the mother',
          'First PRADO appointment organised by a health-insurance adviser',
          'Where to look: the health-insurance annuaire santé',
        ],
      },
    ],
  }),

  postPair({
    slug: 'pmi-consultations-gratuites-a-quoi-ca-sert',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'PMI : à quoi servent les consultations gratuites',
    titleEn: 'Maternal and infant protection: what the free consultations are for',
    excerptFr:
      'La PMI propose un suivi gratuit pour les femmes enceintes et les enfants de moins de 6 ans, sans avance de frais. Un service public souvent méconnu, et précieux.',
    excerptEn:
      'The PMI offers free follow-up for pregnant women and children under 6, with no advance payment. A public service that is often overlooked, and precious.',
    readingMinutes: 3,
    heroAltFr: 'Les consultations gratuites de la PMI',
    heroAltEn: 'The free PMI consultations',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La PMI, protection maternelle et infantile, est l’un des services publics les plus utiles et les moins connus des jeunes parents. Elle propose un suivi et un accompagnement gratuits, sans avance de frais, pour les femmes enceintes et les jeunes enfants.',
          'La connaître, c’est disposer d’une ressource de proximité, en complément du suivi habituel.',
        ],
      },
      {
        type: 'text',
        title: 'Pour qui, et quoi',
        paragraphs: [
          'Les centres de PMI organisent des consultations gratuites et des actions de prévention pour les femmes enceintes et les enfants de moins de six ans, selon l’[annuaire officiel](https://lannuaire.service-public.gouv.fr/navigation/pmi). Ils couvrent la prévention, le suivi de santé, la vaccination et la planification familiale.',
          'C’est un accompagnement médico-social, pensé pour être accessible à tous, sans condition de ressources.',
        ],
      },
      {
        type: 'text',
        title: 'Un service départemental, gratuit',
        paragraphs: [
          'La PMI est gérée par le conseil départemental, et ses consultations sont gratuites, sans avance de frais. C’est ce qui en fait un recours précieux, notamment quand l’accès à un professionnel de ville est difficile.',
          'Pour trouver un centre près de chez vous, l’annuaire officiel des PMI en recense un grand nombre sur tout le territoire.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Pour les femmes enceintes et les enfants de moins de 6 ans',
          'Consultations gratuites, sans avance de frais',
          'Prévention, suivi de santé, vaccination, planification familiale',
          'Gérée par le conseil départemental',
          'Trouver un centre : l’annuaire officiel des PMI',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The PMI, maternal and infant protection, is one of the most useful and least-known public services for young parents. It offers free follow-up and support, with no advance payment, for pregnant women and young children.',
          'Knowing it means having a local resource, alongside the usual follow-up.',
        ],
      },
      {
        type: 'text',
        title: 'For whom, and what',
        paragraphs: [
          'PMI centres organise free consultations and prevention actions for pregnant women and children under six, according to the [official directory](https://lannuaire.service-public.gouv.fr/navigation/pmi). They cover prevention, health follow-up, vaccination and family planning.',
          'It is medico-social support, designed to be accessible to all, with no income condition.',
        ],
      },
      {
        type: 'text',
        title: 'A departmental service, free',
        paragraphs: [
          'The PMI is run by the departmental council, and its consultations are free, with no advance payment. That is what makes it a precious resort, notably when access to a town professional is difficult.',
          'To find a centre near you, the official PMI directory lists a great many across the country.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'For pregnant women and children under 6',
          'Free consultations, no advance payment',
          'Prevention, health follow-up, vaccination, family planning',
          'Run by the departmental council',
          'Find a centre: the official PMI directory',
        ],
      },
    ],
  }),

  postPair({
    slug: 'examens-obligatoires-nourrisson-certificats-calendrier',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Examens obligatoires du nourrisson : le calendrier des certificats de santé',
    titleEn: 'Mandatory infant exams: the health-certificate calendar',
    excerptFr:
      'Vingt examens jalonnent l’enfance, trois donnent lieu à un certificat de santé. Depuis 2025, un examen s’ajoute. Voici le calendrier, pris en charge à 100 %.',
    excerptEn:
      'Twenty exams punctuate childhood, three give rise to a health certificate. Since 2025, one exam is added. Here is the calendar, covered at 100%.',
    readingMinutes: 3,
    heroAltFr: 'Le calendrier des examens obligatoires du nourrisson',
    heroAltEn: 'The mandatory infant exam calendar',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les examens obligatoires de l’enfant jalonnent ses premières années à des âges précis. Cet article en donne le calendrier et le rôle administratif, pour aider à prendre les rendez-vous à temps. Il ne décrit pas le contenu clinique de chaque examen, qui appartient au professionnel.',
          'Trois de ces examens ont un statut particulier : ils donnent lieu à un certificat de santé.',
        ],
      },
      {
        type: 'text',
        title: 'Vingt examens, trois certificats',
        paragraphs: [
          'De la naissance à seize ans, l’enfant bénéficie de vingt examens médicaux obligatoires, pris en charge à 100 % quel que soit le médecin, selon [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F967). Ils sont particulièrement resserrés la première année.',
          'Trois d’entre eux donnent lieu à un certificat de santé : le premier dans les huit jours suivant la naissance, le deuxième au cours du 9e mois, le troisième au cours du 24e mois.',
        ],
      },
      {
        type: 'text',
        title: 'Un examen ajouté depuis 2025',
        paragraphs: [
          'Depuis le 1er janvier 2025, un nouvel examen obligatoire s’ajoute au cours de la 7e année. C’est un changement récent, utile à connaître pour ne pas s’en tenir à un calendrier périmé.',
          'Le contenu de chaque examen relève du médecin qui suit l’enfant. Cette page se limite au calendrier et aux certificats, distincte de l’article sur les vaccinations.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          '20 examens de la naissance à 16 ans, pris en charge à 100 %',
          'Resserrés la première année',
          'Trois certificats de santé : 8 jours, 9e mois, 24e mois',
          'Depuis le 1er janvier 2025 : un examen ajouté au cours de la 7e année',
          'Le contenu clinique de chaque examen : avec le médecin',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The child\'s mandatory exams punctuate their early years at precise ages. This article gives the calendar and the administrative role, to help book the appointments in time. It does not describe the clinical content of each exam, which belongs to the professional.',
          'Three of these exams have a special status: they give rise to a health certificate.',
        ],
      },
      {
        type: 'text',
        title: 'Twenty exams, three certificates',
        paragraphs: [
          'From birth to sixteen, the child has twenty mandatory medical exams, covered at 100% whatever the doctor, according to [service-public.gouv.fr](https://www.service-public.gouv.fr/particuliers/vosdroits/F967). They are particularly close together in the first year.',
          'Three of them give rise to a health certificate: the first within eight days of the birth, the second during the 9th month, the third during the 24th month.',
        ],
      },
      {
        type: 'text',
        title: 'An exam added since 2025',
        paragraphs: [
          'Since 1 January 2025, a new mandatory exam is added during the 7th year. It is a recent change, useful to know so as not to rely on an outdated calendar.',
          'The content of each exam is for the doctor following the child. This page limits itself to the calendar and the certificates, distinct from the article on vaccinations.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          '20 exams from birth to 16, covered at 100%',
          'Close together in the first year',
          'Three health certificates: 8 days, 9th month, 24th month',
          'Since 1 January 2025: an exam added during the 7th year',
          'The clinical content of each exam: with the doctor',
        ],
      },
    ],
  }),

  postPair({
    slug: 'mon-bilan-prevention-jeune-parent-rembourse',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Mon bilan prévention : un rendez-vous santé remboursé aux âges clés',
    titleEn: 'My prevention check: a covered health appointment at key ages',
    excerptFr:
      'Mon bilan prévention est un rendez-vous santé gratuit à certains âges, dont la tranche 18-25 ans qui couvre beaucoup de jeunes parents. Voici en quoi il consiste.',
    excerptEn:
      'My prevention check is a free health appointment at certain ages, including the 18-25 bracket that covers many young parents. Here is what it involves.',
    readingMinutes: 3,
    heroAltFr: 'Mon bilan prévention',
    heroAltEn: 'My prevention check',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Devenir parent est souvent le moment où l’on néglige sa propre santé. Un dispositif public peut aider à ne pas la laisser de côté : Mon bilan prévention, un rendez-vous santé remboursé à certains âges clés.',
          'Beaucoup de jeunes parents entrent précisément dans l’une de ces tranches.',
        ],
      },
      {
        type: 'text',
        title: 'Un rendez-vous gratuit, à certains âges',
        paragraphs: [
          'Mon bilan prévention est un rendez-vous de prévention pris en charge à 100 % par l’Assurance Maladie, sans avance de frais, selon [ameli.fr](https://www.ameli.fr/assure/sante/mon-bilan-prevention). Il concerne des tranches d’âge définies : 18-25 ans, 45-50 ans, 60-65 ans et 70-75 ans, un bilan par tranche.',
          'La tranche 18-25 ans couvre de nombreux jeunes parents. À noter : il n’existe pas de tranche « parents » dédiée, c’est bien l’âge qui détermine l’accès.',
        ],
      },
      {
        type: 'text',
        title: 'En quoi il consiste',
        paragraphs: [
          'C’est un temps d’échange de trente à quarante-cinq minutes avec un professionnel, sur les habitudes de vie et l’environnement. Il peut être réalisé par un médecin, un infirmier, une sage-femme ou un pharmacien.',
          'Ce n’est pas un examen médical au sens strict, mais un moment de prévention. Pour un jeune parent débordé, c’est une occasion simple de faire un point sur soi.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Rendez-vous de prévention pris en charge à 100 %, sans avance de frais',
          'Tranches : 18-25, 45-50, 60-65, 70-75 ans, un bilan par tranche',
          'Pas de tranche « parents » dédiée : c’est l’âge qui compte',
          'Échange de 30 à 45 minutes sur les habitudes de vie',
          'Réalisable par médecin, infirmier, sage-femme ou pharmacien',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Becoming a parent is often when you neglect your own health. A public scheme can help not to set it aside: My prevention check, a covered health appointment at certain key ages.',
          'Many young parents fall precisely into one of these brackets.',
        ],
      },
      {
        type: 'text',
        title: 'A free appointment, at certain ages',
        paragraphs: [
          'My prevention check is a prevention appointment covered at 100% by the health insurance system, with no advance payment, according to [ameli.fr](https://www.ameli.fr/assure/sante/mon-bilan-prevention). It concerns defined age brackets: 18-25, 45-50, 60-65 and 70-75, one check per bracket.',
          'The 18-25 bracket covers many young parents. Note: there is no dedicated "parents" bracket, it is age that determines access.',
        ],
      },
      {
        type: 'text',
        title: 'What it involves',
        paragraphs: [
          'It is a thirty-to-forty-five-minute exchange with a professional, on lifestyle and environment. It can be done by a doctor, a nurse, a midwife or a pharmacist.',
          'It is not a medical exam in the strict sense, but a moment of prevention. For an overwhelmed young parent, it is a simple chance to take stock of yourself.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A prevention appointment covered at 100%, no advance payment',
          'Brackets: 18-25, 45-50, 60-65, 70-75, one check per bracket',
          'No dedicated "parents" bracket: age is what counts',
          'A 30-to-45-minute exchange on lifestyle',
          'Can be done by a doctor, nurse, midwife or pharmacist',
        ],
      },
    ],
  }),

  postPair({
    slug: 'vaccination-cocooning-entourage-nourrisson',
    categoryKey: 'sante',
    categoryFr: 'Suivi',
    categoryEn: 'Care',
    titleFr: 'Vaccination cocooning : protéger le nourrisson par l’entourage',
    titleEn: 'Cocooning vaccination: protecting the infant through those around them',
    excerptFr:
      'Le cocooning consiste à vacciner l’entourage d’un nouveau-né contre la coqueluche. C’est une recommandation officielle, une question à préparer pour en parler avec le professionnel.',
    excerptEn:
      'Cocooning means vaccinating a newborn’s entourage against whooping cough. It is an official recommendation, a question to prepare for the professional.',
    readingMinutes: 3,
    heroAltFr: 'La vaccination cocooning autour du nourrisson',
    heroAltEn: 'Cocooning vaccination around the infant',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Le cocooning est une notion que beaucoup de futurs parents découvrent tardivement, alors qu’elle se prépare avant la naissance. Cet article ne formule aucune recommandation de notre part : il présente une recommandation officielle, à préparer pour en parler avec le professionnel de santé.',
          'L’idée est simple : protéger le nourrisson en agissant sur son entourage.',
        ],
      },
      {
        type: 'text',
        title: 'Vacciner l’entourage contre la coqueluche',
        paragraphs: [
          'Le cocooning consiste à vacciner l’entourage d’un nouveau-né pour réduire le risque de transmission de la coqueluche aux nourrissons de moins de six mois, selon la [HAS](https://www.has-sante.fr/jcms/p_3531825/fr/). L’entourage visé comprend les parents, la fratrie, les grands-parents et toute personne en contact proche et durable durant les six premiers mois.',
          'La première recommandation reste la vaccination de la femme enceinte ; le cocooning prend le relais en son absence.',
        ],
      },
      {
        type: 'text',
        title: 'Une question à préparer, pas une décision d’ici',
        paragraphs: [
          'Si la mère a été vaccinée pendant la grossesse suffisamment tôt, la vaccination de l’entourage n’est plus nécessaire. Ces choix, et leur calendrier, se décident avec le professionnel de santé, pas à partir d’un article.',
          'Le rôle de cette page s’arrête à un rappel utile : c’est un sujet à anticiper, pour le préparer et en parler au bon moment.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Cocooning : vacciner l’entourage d’un nouveau-né contre la coqueluche',
          'Entourage : parents, fratrie, grands-parents, contacts proches',
          'Première recommandation : la vaccination de la femme enceinte',
          'Si la mère a été vaccinée à temps : cocooning non nécessaire',
          'Une question à préparer, à décider avec le professionnel de santé',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Cocooning is a notion many parents-to-be discover late, though it is prepared before the birth. This article makes no recommendation of our own: it presents an official recommendation, to prepare for a conversation with the health professional.',
          'The idea is simple: protect the infant by acting on those around them.',
        ],
      },
      {
        type: 'text',
        title: 'Vaccinating the entourage against whooping cough',
        paragraphs: [
          'Cocooning means vaccinating a newborn\'s entourage to reduce the risk of transmitting whooping cough to infants under six months, according to the [HAS](https://www.has-sante.fr/jcms/p_3531825/fr/). The entourage concerned includes the parents, siblings, grandparents and anyone in close and lasting contact during the first six months.',
          'The first recommendation remains vaccinating the pregnant woman; cocooning takes over in its absence.',
        ],
      },
      {
        type: 'text',
        title: 'A question to prepare, not a decision here',
        paragraphs: [
          'If the mother was vaccinated during pregnancy early enough, vaccinating the entourage is no longer necessary. These choices, and their timing, are decided with the health professional, not from an article.',
          'This page\'s role stops at a useful reminder: it is a subject to anticipate, to prepare and discuss at the right time.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Cocooning: vaccinating a newborn\'s entourage against whooping cough',
          'Entourage: parents, siblings, grandparents, close contacts',
          'First recommendation: vaccinating the pregnant woman',
          'If the mother was vaccinated in time: cocooning not necessary',
          'A question to prepare, to decide with the health professional',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO10_FR, en: POSTS_SEO10_EN } = pairsToArrays(pairs);
