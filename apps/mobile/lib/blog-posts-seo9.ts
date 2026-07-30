/**
 * SEO batch 9 — vie privée et données de l'enfant (le différenciateur de Bulle).
 *
 * Same house rules. CNIL-sourced throughout, plus cybermalveillance and the 2024 image-rights
 * law. §7.3: the connected-wearable piece stays strictly on the DATA angle and makes no
 * medical claim (the "medical device" question is MDR, not CNIL, so it is not sourced on the
 * CNIL). Editorial conclusions (e.g. preferring a non-connected model) are presented as
 * advice, not as CNIL positions.
 */

import { postPair, pairsToArrays } from './blog-posts-shared';
import type { BlogPost } from './blog-types';

const pairs = [
  postPair({
    slug: 'babyphone-connecte-donnees-securite',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Babyphone connecté : sécuriser les données de bébé',
    titleEn: 'Connected baby monitor: securing your baby’s data',
    excerptFr:
      'Un babyphone connecté filme et écoute votre bébé, et transmet ces données. Le premier geste de sécurité est aussi le plus oublié : changer le mot de passe par défaut.',
    excerptEn:
      'A connected baby monitor films and listens to your baby, and transmits that data. The first safety gesture is also the most forgotten: change the default password.',
    readingMinutes: 3,
    heroAltFr: 'Sécuriser un babyphone connecté',
    heroAltEn: 'Securing a connected baby monitor',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Un babyphone connecté est bien plus qu’un micro : c’est un objet connecté qui capte de l’audio, parfois de la vidéo, et transmet ces données par le réseau. Autrement dit, il filme et écoute votre bébé, et ces flux peuvent être interceptés s’ils sont mal protégés.',
          'La bonne nouvelle, c’est que quelques gestes simples réduisent nettement le risque.',
        ],
      },
      {
        type: 'text',
        title: 'Changer le mot de passe par défaut',
        paragraphs: [
          'Le geste le plus important est aussi le plus négligé : changer les réglages par défaut, à commencer par le mot de passe et le code. L’attaque la plus courante consiste simplement à se connecter avec le mot de passe d’usine jamais modifié, selon la [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser).',
          'Vérifiez aussi que l’appareil ne laisse pas n’importe qui s’y connecter : l’appairage devrait exiger un bouton physique ou un mot de passe.',
        ],
      },
      {
        type: 'text',
        title: 'Sécuriser le réseau, préférer le simple',
        paragraphs: [
          'Sécurisez le réseau Wi-Fi utilisé par l’appareil, ainsi que le verrouillage de l’écran du smartphone ou de la tablette associés, avec un mot de passe fort et différent des autres. La CNIL recommande une vigilance particulière quand un objet produit des données sensibles sur un enfant.',
          'La CNIL a déjà sanctionné un fabricant dont les appareils étaient accessibles sans authentification à quelques mètres. C’est un argument pour préférer, quand c’est possible, un modèle non connecté ou local, plus difficile à intercepter.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Un babyphone connecté transmet audio et parfois vidéo',
          'Changer le mot de passe et le code par défaut',
          'L’appairage devrait exiger un bouton physique ou un mot de passe',
          'Sécuriser le Wi-Fi et le smartphone associé, mots de passe forts',
          'Un modèle non connecté ou local limite le risque d’interception',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A connected baby monitor is much more than a microphone: it is a connected object that captures audio, sometimes video, and transmits that data over the network. In other words, it films and listens to your baby, and those streams can be intercepted if poorly protected.',
          'The good news is that a few simple gestures markedly reduce the risk.',
        ],
      },
      {
        type: 'text',
        title: 'Change the default password',
        paragraphs: [
          'The most important gesture is also the most neglected: change the default settings, starting with the password and code. The most common attack is simply connecting with the factory password never changed, according to the [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser).',
          'Also check the device does not let just anyone connect: pairing should require a physical button or a password.',
        ],
      },
      {
        type: 'text',
        title: 'Secure the network, prefer the simple',
        paragraphs: [
          'Secure the Wi-Fi network the device uses, as well as the lock screen of the associated phone or tablet, with a strong password different from the others. The CNIL recommends particular vigilance when an object produces sensitive data about a child.',
          'The CNIL has already sanctioned a maker whose devices were accessible without authentication from a few metres away. That is an argument for preferring, where possible, a non-connected or local model, harder to intercept.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'A connected monitor transmits audio and sometimes video',
          'Change the default password and code',
          'Pairing should require a physical button or a password',
          'Secure the Wi-Fi and the associated phone, strong passwords',
          'A non-connected or local model limits the interception risk',
        ],
      },
    ],
  }),

  postPair({
    slug: 'bracelet-chaussette-connectee-bebe-donnees',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Chaussette ou bracelet connecté pour bébé : quelles données vous confiez',
    titleEn: 'Connected sock or band for baby: what data you hand over',
    excerptFr:
      'Ces capteurs portés par le bébé collectent des données parmi les plus sensibles. Avant d’en équiper un nouveau-né, il faut savoir ce qu’elles deviennent.',
    excerptEn:
      'These sensors worn by the baby collect some of the most sensitive data. Before fitting one to a newborn, you should know what becomes of it.',
    readingMinutes: 3,
    heroAltFr: 'Les données d’un capteur connecté pour bébé',
    heroAltEn: 'The data of a connected baby sensor',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les chaussettes, bracelets et autres capteurs connectés portés par le bébé rassurent en promettant de tout mesurer. Cet article ne parle pas de ce qu’ils mesurent, qui relève du professionnel de santé, mais de la donnée qu’ils produisent, et de ce qu’elle devient.',
          'Car ces objets collectent de gros volumes d’informations, parmi les plus sensibles qui soient.',
        ],
      },
      {
        type: 'text',
        title: 'Des données sensibles, en continu',
        paragraphs: [
          'Couplés à une application, ces capteurs collectent des données personnelles nombreuses, dont des données de santé et d’habitudes de vie, particulièrement protégées. La CNIL recommande de désactiver le partage automatique des données, de pouvoir y accéder et les supprimer, et d’éteindre l’objet quand il n’est pas utilisé, selon la [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser).',
          'Quand une application conserve des données de santé, des obligations spécifiques d’hébergement s’appliquent. C’est un point à vérifier dans sa politique de confidentialité.',
        ],
      },
      {
        type: 'text',
        title: 'Se méfier du très bas coût',
        paragraphs: [
          'La CNIL invite à la prudence avec les dispositifs à bas coût, qui font souvent passer la vie privée au second plan, avec des solutions techniques peu ou mal sécurisées.',
          'Le bon réflexe est donc de raisonner en données avant d’acheter : qui les collecte, où elles sont stockées, combien de temps. Ce n’est pas parce qu’un objet est destiné à un bébé qu’il protège mieux ses données.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ces capteurs collectent des données sensibles (santé, habitudes)',
          'Désactiver le partage automatique des données',
          'Pouvoir accéder à ses données et les supprimer',
          'Éteindre l’objet quand il n’est pas utilisé',
          'Se méfier des dispositifs à très bas coût, souvent mal sécurisés',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Connected socks, bands and other sensors worn by the baby reassure by promising to measure everything. This article is not about what they measure, which is for the health professional, but about the data they produce, and what becomes of it.',
          'Because these objects collect large volumes of information, among the most sensitive there is.',
        ],
      },
      {
        type: 'text',
        title: 'Sensitive data, continuously',
        paragraphs: [
          'Paired with an app, these sensors collect a great deal of personal data, including health and lifestyle data, which is particularly protected. The CNIL recommends disabling automatic data-sharing, being able to access and delete it, and turning the object off when not in use, according to the [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser).',
          'When an app keeps health data, specific hosting obligations apply. It is a point to check in its privacy policy.',
        ],
      },
      {
        type: 'text',
        title: 'Beware the very low cost',
        paragraphs: [
          'The CNIL urges caution with low-cost devices, which often put privacy second, with poorly secured technical solutions.',
          'The right reflex is therefore to think in terms of data before buying: who collects it, where it is stored, for how long. Just because an object is meant for a baby does not mean it protects its data better.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'These sensors collect sensitive data (health, habits)',
          'Disable automatic data-sharing',
          'Be able to access and delete your data',
          'Turn the object off when not in use',
          'Beware very low-cost devices, often poorly secured',
        ],
      },
    ],
  }),

  postPair({
    slug: 'partage-photos-famille-cloud-parametres',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Partager les photos de bébé en famille : bien régler le partage',
    titleEn: 'Sharing baby photos with family: setting up sharing well',
    excerptFr:
      'Partager les photos de bébé avec les proches sans les exposer au monde, c’est une question de réglages. Canaux privés, contacts segmentés, tri régulier : voici la méthode.',
    excerptEn:
      'Sharing baby photos with loved ones without exposing them to the world is a matter of settings. Private channels, segmented contacts, regular sorting: here is the method.',
    readingMinutes: 3,
    heroAltFr: 'Régler le partage des photos de bébé en famille',
    heroAltEn: 'Setting up family sharing of baby photos',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Envoyer les photos de bébé aux grands-parents et aux proches est un plaisir quotidien. Le faire sans les exposer à un public plus large qu’on ne le croit est surtout une affaire de réglages.',
          'Cet article s’en tient au concret : comment partager avec les bonnes personnes, et elles seules.',
        ],
      },
      {
        type: 'text',
        title: 'Des canaux privés, des contacts segmentés',
        paragraphs: [
          'La CNIL recommande de privilégier le partage par messagerie privée sécurisée, certaines offrant même des messages éphémères, plutôt que la publication sur un réseau social, surtout en profil public, selon la [CNIL](https://www.cnil.fr/fr/partage-de-photos-et-videos-de-votre-enfant-sur-les-reseaux-sociaux-quels-sont-les-risques).',
          'Segmentez vos contacts, amis proches, famille, connaissances, pour ne partager qu’avec certains groupes. Un album partagé à un cercle restreint vaut mieux qu’une publication visible de tous.',
        ],
      },
      {
        type: 'text',
        title: 'Trier régulièrement',
        paragraphs: [
          'La CNIL conseille aussi de trier régulièrement et de supprimer les photos qui ne sont plus d’actualité. Une photothèque partagée n’a pas vocation à s’accumuler indéfiniment.',
          'L’enjeu de fond dépasse le réglage : partager largement prive l’enfant de la maîtrise de sa propre image. Restreindre le partage, c’est lui garder ce choix pour plus tard.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Privilégier une messagerie privée sécurisée plutôt qu’un réseau public',
          'Segmenter ses contacts pour ne partager qu’à certains groupes',
          'Préférer un album à cercle restreint à une publication visible de tous',
          'Trier régulièrement et supprimer les photos obsolètes',
          'Restreindre le partage préserve la maîtrise de l’image de l’enfant',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Sending baby photos to grandparents and loved ones is a daily pleasure. Doing it without exposing them to a wider audience than you think is mostly a matter of settings.',
          'This article sticks to the practical: how to share with the right people, and only them.',
        ],
      },
      {
        type: 'text',
        title: 'Private channels, segmented contacts',
        paragraphs: [
          'The CNIL recommends preferring sharing by secure private messaging, some even offering ephemeral messages, rather than posting on a social network, especially a public profile, according to the [CNIL](https://www.cnil.fr/fr/partage-de-photos-et-videos-de-votre-enfant-sur-les-reseaux-sociaux-quels-sont-les-risques).',
          'Segment your contacts, close friends, family, acquaintances, to share only with certain groups. An album shared to a small circle beats a post visible to all.',
        ],
      },
      {
        type: 'text',
        title: 'Sort regularly',
        paragraphs: [
          'The CNIL also advises sorting regularly and deleting photos that are no longer current. A shared photo library is not meant to accumulate indefinitely.',
          'The underlying issue goes beyond settings: sharing widely deprives the child of control of their own image. Restricting sharing keeps that choice for them for later.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Prefer secure private messaging over a public network',
          'Segment your contacts to share only with certain groups',
          'Prefer a small-circle album to a post visible to all',
          'Sort regularly and delete outdated photos',
          'Restricting sharing preserves control of the child\'s image',
        ],
      },
    ],
  }),

  postPair({
    slug: 'droit-image-enfant-consentement-parents',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Droit à l’image de l’enfant : le consentement des deux parents',
    titleEn: 'Child’s image rights: the consent of both parents',
    excerptFr:
      'Depuis 2024, la loi inscrit que les parents protègent en commun l’image de leur enfant. Publier une photo suppose l’accord des deux, et le juge peut l’imposer.',
    excerptEn:
      'Since 2024, the law states that parents jointly protect their child’s image. Publishing a photo requires both parents’ agreement, and a judge can enforce it.',
    readingMinutes: 3,
    heroAltFr: 'Le droit à l’image de l’enfant et le consentement des parents',
    heroAltEn: 'The child’s image rights and parental consent',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'La question de l’image de l’enfant a longtemps relevé du bon sens. Depuis 2024, elle relève aussi clairement du droit : une loi a fait de la protection de la vie privée de l’enfant un attribut de l’autorité parentale.',
          'Cela change la façon de décider ce que l’on publie, et ce que l’on ne publie pas.',
        ],
      },
      {
        type: 'text',
        title: 'Une protection commune aux deux parents',
        paragraphs: [
          'La loi du 19 février 2024 a inscrit la vie privée de l’enfant dans la définition de l’autorité parentale, au sein du Code civil, selon [legifrance.gouv.fr](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049163317). Les parents protègent en commun le droit à l’image de leur enfant mineur.',
          'Concrètement, les décisions concernant l’image de l’enfant se prennent à deux, et les parents doivent associer l’enfant à ce droit selon son âge et sa maturité.',
        ],
      },
      {
        type: 'text',
        title: 'Ce que le juge peut faire',
        paragraphs: [
          'En cas de désaccord, ou de diffusion portant gravement atteinte à la dignité de l’enfant, le juge peut interdire à un parent de publier sans l’accord de l’autre. Une délégation forcée de l’exercice du droit à l’image est même possible.',
          'C’est un signal fort : l’image d’un enfant n’est pas un contenu que l’un des parents peut diffuser seul. Elle appartient à l’enfant, et les deux parents en sont les gardiens.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Loi du 19 février 2024 : vie privée de l’enfant dans l’autorité parentale',
          'Les parents protègent en commun l’image de l’enfant',
          'Publier suppose l’accord des deux titulaires de l’autorité parentale',
          'Associer l’enfant selon son âge et sa maturité',
          'Le juge peut interdire à un parent de publier sans l’accord de l’autre',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'The question of a child\'s image was long a matter of common sense. Since 2024 it is also clearly a matter of law: an act has made protecting the child\'s privacy an attribute of parental authority.',
          'That changes how you decide what to publish, and what not to.',
        ],
      },
      {
        type: 'text',
        title: 'A protection shared by both parents',
        paragraphs: [
          'The law of 19 February 2024 wrote the child\'s privacy into the definition of parental authority, in the Civil Code, according to [legifrance.gouv.fr](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000049163317). Parents jointly protect their minor child\'s image rights.',
          'In practice, decisions about the child\'s image are taken together, and parents must associate the child with this right according to their age and maturity.',
        ],
      },
      {
        type: 'text',
        title: 'What the judge can do',
        paragraphs: [
          'In case of disagreement, or a publication seriously harming the child\'s dignity, the judge can forbid one parent from publishing without the other\'s consent. A forced delegation of the image right is even possible.',
          'It is a strong signal: a child\'s image is not content one parent can publish alone. It belongs to the child, and both parents are its guardians.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Law of 19 February 2024: the child\'s privacy within parental authority',
          'Parents jointly protect the child\'s image',
          'Publishing requires the agreement of both holders of parental authority',
          'Associate the child according to their age and maturity',
          'The judge can forbid one parent from publishing without the other\'s consent',
        ],
      },
    ],
  }),

  postPair({
    slug: 'objets-connectes-bebe-verifier-rgpd-avant-achat',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Objets connectés bébé : vérifier le RGPD avant d’acheter',
    titleEn: 'Connected baby objects: checking data protection before buying',
    excerptFr:
      'Avant d’ajouter un objet connecté à la liste de naissance, quatre questions valent mieux qu’un joli emballage : quelles données, où, pour quoi, et pour combien de temps.',
    excerptEn:
      'Before adding a connected object to the baby list, four questions beat a nice box: what data, where, for what, and for how long.',
    readingMinutes: 3,
    heroAltFr: 'Vérifier le RGPD d’un objet connecté pour bébé',
    heroAltEn: 'Checking a connected baby object’s data protection',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les objets connectés pour bébé se multiplient sur les listes de naissance. Avant d’en choisir un, la vraie question n’est pas ce qu’il fait, mais ce qu’il fait de vos données. Quelques vérifications simples évitent les mauvaises surprises.',
          'Elles se font avant l’achat, en lisant, pas après, en regrettant.',
        ],
      },
      {
        type: 'text',
        title: 'La transparence et la localisation',
        paragraphs: [
          'Vérifiez la transparence : quelles données sont collectées, où elles sont hébergées, et si les conditions d’utilisation sont en français et compréhensibles, selon la [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser). Regardez aussi si les données sont réutilisées à d’autres fins ou transmises à des partenaires.',
          'La localisation compte : des données hébergées en Europe ne sont pas soumises au même régime que celles envoyées dans un pays offrant une protection moindre.',
        ],
      },
      {
        type: 'text',
        title: 'Minimiser dès le départ',
        paragraphs: [
          'Pour un objet destiné à l’enfant, la CNIL conseille de créer une adresse mail dédiée, d’utiliser des pseudonymes plutôt que le nom et le prénom, et de n’activer que les fonctions réellement nécessaires.',
          'Et, comme pour les jouets, méfiez-vous des modèles à bas coût, souvent mal sécurisés. Moins on confie de données au départ, moins on a à s’en inquiéter ensuite.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Vérifier quelles données, où hébergées, conditions en français',
          'Regarder si les données sont réutilisées ou transmises à des partenaires',
          'Privilégier un hébergement en Europe',
          'Adresse mail dédiée, pseudonymes, fonctions minimales',
          'Se méfier des modèles à bas coût',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Connected baby objects are multiplying on baby lists. Before choosing one, the real question is not what it does, but what it does with your data. A few simple checks avoid nasty surprises.',
          'They are done before the purchase, by reading, not after, by regretting.',
        ],
      },
      {
        type: 'text',
        title: 'Transparency and localisation',
        paragraphs: [
          'Check transparency: what data is collected, where it is hosted, and whether the terms are in French and understandable, according to the [CNIL](https://www.cnil.fr/fr/objets-connectes-noubliez-pas-de-les-securiser). Also look at whether the data is reused for other purposes or passed to partners.',
          'Localisation matters: data hosted in Europe is not subject to the same regime as data sent to a country offering lower protection.',
        ],
      },
      {
        type: 'text',
        title: 'Minimise from the start',
        paragraphs: [
          'For an object meant for the child, the CNIL advises creating a dedicated email address, using pseudonyms rather than the name, and enabling only the genuinely necessary functions.',
          'And, as with toys, beware low-cost models, often poorly secured. The less data you hand over at the start, the less you have to worry about later.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Check what data, where hosted, terms in French',
          'Look at whether data is reused or passed to partners',
          'Prefer hosting in Europe',
          'Dedicated email, pseudonyms, minimal functions',
          'Beware low-cost models',
        ],
      },
    ],
  }),

  postPair({
    slug: 'application-suivi-bebe-donnees-hebergement',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Applications de suivi bébé : où sont hébergées les données',
    titleEn: 'Baby-tracking apps: where the data is hosted',
    excerptFr:
      'Une application de suivi bébé collecte des données parfois sensibles. La lire avant de l’installer, vérifier le consentement et l’hébergement : voici les bons réflexes.',
    excerptEn:
      'A baby-tracking app collects sometimes sensitive data. Read it before installing, check consent and hosting: here are the right reflexes.',
    readingMinutes: 3,
    heroAltFr: 'Les données d’une application de suivi bébé',
    heroAltEn: 'The data of a baby-tracking app',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les applications de suivi bébé, qui notent les tétées, les nuits ou les rendez-vous, sont pratiques. Elles collectent aussi des données personnelles, parfois sensibles, dont il vaut mieux savoir où elles vont avant de commencer à les alimenter.',
          'Quelques réflexes simples permettent de choisir en connaissance de cause.',
        ],
      },
      {
        type: 'text',
        title: 'Lire avant d’installer',
        paragraphs: [
          'La CNIL recommande de consulter la politique de confidentialité d’une application avant de l’installer, et de vérifier les usages prévus des données collectées, selon la [CNIL](https://www.cnil.fr/fr/recommandations-applications-mobiles).',
          'Le consentement est requis pour tout traitement qui n’est pas nécessaire au fonctionnement, comme le ciblage publicitaire. Il doit pouvoir être refusé et retiré aussi simplement qu’il a été donné.',
        ],
      },
      {
        type: 'text',
        title: 'Données de santé et hébergement',
        paragraphs: [
          'Dès qu’une application conserve des données de santé, des obligations d’hébergement certifié s’appliquent. C’est un point à chercher dans sa politique de confidentialité : où sont hébergées les données, et par qui.',
          'La CNIL contrôle les applications mobiles et a publié des recommandations en la matière. Une application sérieuse est transparente sur ces questions ; une application qui les esquive doit inviter à la prudence.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Lire la politique de confidentialité avant d’installer',
          'Vérifier les usages prévus des données',
          'Consentement requis pour tout traitement non nécessaire, refusable et retirable',
          'Données de santé : hébergement certifié requis',
          'Une application qui esquive ces questions doit inviter à la prudence',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Baby-tracking apps, which log feeds, nights or appointments, are handy. They also collect personal data, sometimes sensitive, and it is better to know where it goes before you start feeding it in.',
          'A few simple reflexes let you choose with full knowledge.',
        ],
      },
      {
        type: 'text',
        title: 'Read before installing',
        paragraphs: [
          'The CNIL recommends reading an app\'s privacy policy before installing it, and checking the intended uses of the collected data, according to the [CNIL](https://www.cnil.fr/fr/recommandations-applications-mobiles).',
          'Consent is required for any processing not necessary to functioning, such as ad targeting. It must be refusable and withdrawable as simply as it was given.',
        ],
      },
      {
        type: 'text',
        title: 'Health data and hosting',
        paragraphs: [
          'As soon as an app keeps health data, certified-hosting obligations apply. It is a point to look for in its privacy policy: where the data is hosted, and by whom.',
          'The CNIL monitors mobile apps and has published recommendations on the matter. A serious app is transparent about these questions; an app that dodges them should prompt caution.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Read the privacy policy before installing',
          'Check the intended uses of the data',
          'Consent required for any non-essential processing, refusable and withdrawable',
          'Health data: certified hosting required',
          'An app that dodges these questions should prompt caution',
        ],
      },
    ],
  }),

  postPair({
    slug: 'camera-surveillance-nounou-domicile-legalite',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Caméra et nounou à domicile : ce qui est légal, ce qui ne l’est pas',
    titleEn: 'Camera and nanny at home: what is legal, what is not',
    excerptFr:
      'Filmer chez soi avec une nounou présente est encadré. Elle doit être informée, la surveillance ne peut pas être permanente, et une caméra cachée est illégale.',
    excerptEn:
      'Filming at home with a nanny present is regulated. They must be informed, surveillance cannot be permanent, and a hidden camera is illegal.',
    readingMinutes: 3,
    heroAltFr: 'Caméra de surveillance et nounou à domicile',
    heroAltEn: 'Surveillance camera and nanny at home',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Installer une caméra chez soi quand une nounou garde l’enfant est une tentation compréhensible, et un terrain juridique glissant. La confiance et la loi imposent des règles claires, qu’il vaut mieux connaître avant de brancher quoi que ce soit.',
          'Le principe de départ : votre salariée n’est pas un membre de la famille au sens de la vie privée.',
        ],
      },
      {
        type: 'text',
        title: 'Informer, toujours',
        paragraphs: [
          'Dès que des personnes extérieures au cercle familial interviennent, comme une nounou, elles doivent être informées de l’existence des caméras et de leur finalité, par un affichage à l’entrée de la zone filmée ou une mention dans le contrat de travail, selon la [CNIL](https://www.cnil.fr/fr/la-videosurveillance-videoprotection-chez-soi).',
          'La salariée doit savoir où sont les caméras et qui peut visionner les images. Une caméra cachée, à son insu, est illégale.',
        ],
      },
      {
        type: 'text',
        title: 'Pas de surveillance permanente',
        paragraphs: [
          'La surveillance ne peut pas être permanente : les caméras ne doivent pas filmer la salariée en continu ni la placer sous surveillance constante. C’est le principe de proportionnalité.',
          'Les images ne se conservent qu’un mois au maximum, sauf procédure judiciaire. Filmer une pièce entière en permanence pour surveiller un employé sort du cadre légal.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'La nounou doit être informée des caméras et de leur finalité',
          'Par affichage ou mention au contrat de travail',
          'Elle doit savoir où sont les caméras et qui voit les images',
          'Pas de surveillance permanente (proportionnalité)',
          'Caméra cachée : illégale ; images conservées un mois au maximum',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Installing a camera at home when a nanny is minding the child is an understandable temptation, and slippery legal ground. Trust and the law impose clear rules, best known before plugging anything in.',
          'The starting principle: your employee is not a family member in the privacy sense.',
        ],
      },
      {
        type: 'text',
        title: 'Inform, always',
        paragraphs: [
          'As soon as people outside the family circle are involved, such as a nanny, they must be informed of the cameras\' existence and purpose, by signage at the entrance of the filmed area or a clause in the employment contract, according to the [CNIL](https://www.cnil.fr/fr/la-videosurveillance-videoprotection-chez-soi).',
          'The employee must know where the cameras are and who can view the images. A hidden camera, without their knowledge, is illegal.',
        ],
      },
      {
        type: 'text',
        title: 'No permanent surveillance',
        paragraphs: [
          'Surveillance cannot be permanent: cameras must not film the employee continuously or place them under constant watch. This is the proportionality principle.',
          'Images are kept for one month at most, unless a judicial procedure. Filming a whole room permanently to watch an employee falls outside the legal framework.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The nanny must be informed of the cameras and their purpose',
          'By signage or a clause in the employment contract',
          'They must know where the cameras are and who sees the images',
          'No permanent surveillance (proportionality)',
          'Hidden camera: illegal; images kept one month at most',
        ],
      },
    ],
  }),

  postPair({
    slug: 'comptes-en-ligne-parents-securiser-donnees',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Comptes CAF et Ameli : sécuriser vos données en ligne',
    titleEn: 'CAF and Ameli accounts: securing your data online',
    excerptFr:
      'Les comptes CAF et Ameli sont des cibles fréquentes d’hameçonnage. Un mot de passe solide, la double authentification et un réflexe simple suffisent à se protéger.',
    excerptEn:
      'CAF and Ameli accounts are frequent phishing targets. A strong password, two-factor authentication and one simple reflex are enough to protect yourself.',
    readingMinutes: 3,
    heroAltFr: 'Sécuriser ses comptes CAF et Ameli',
    heroAltEn: 'Securing your CAF and Ameli accounts',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'L’arrivée d’un enfant multiplie les connexions aux comptes CAF et Ameli, et avec elles les tentatives d’hameçonnage. Ces organismes sont des cibles fréquentes de mails, SMS ou appels qui usurpent leur identité.',
          'Se protéger tient à quelques réflexes simples, plus efficaces qu’on ne le croit.',
        ],
      },
      {
        type: 'text',
        title: 'Le réflexe qui protège le mieux',
        paragraphs: [
          'Ne jamais accéder à son compte via un lien reçu par mail ou SMS. Il faut utiliser un favori que l’on a créé soi-même, ou l’application officielle, comme le rappelle [cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/hameconnage-assurance-maladie-ameli).',
          'C’est le geste le plus efficace, car l’hameçonnage repose précisément sur un lien qui imite le vrai site. En tapant l’adresse soi-même, on court-circuite le piège.',
        ],
      },
      {
        type: 'text',
        title: 'Mot de passe solide et double authentification',
        paragraphs: [
          'Utilisez des mots de passe longs, complexes et différents pour chaque compte, d’au moins douze caractères mêlant majuscules, minuscules, chiffres et caractères spéciaux. Et activez la double authentification quand le service la propose.',
          'Apprenez enfin à reconnaître l’hameçonnage : un prétexte de remboursement, de mise à jour ou de paiement urgent qui pousse à cliquer vite. Un organisme officiel ne fonctionne pas ainsi.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ne jamais passer par un lien reçu par mail ou SMS',
          'Utiliser un favori créé soi-même ou l’application officielle',
          'Mots de passe longs, complexes, différents (au moins 12 caractères)',
          'Activer la double authentification',
          'Se méfier des prétextes de remboursement ou de paiement urgent',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A child\'s arrival multiplies logins to CAF and Ameli accounts, and with them phishing attempts. These bodies are frequent targets of emails, texts or calls impersonating them.',
          'Protecting yourself comes down to a few simple reflexes, more effective than you might think.',
        ],
      },
      {
        type: 'text',
        title: 'The reflex that protects best',
        paragraphs: [
          'Never access your account via a link received by email or text. Use a bookmark you created yourself, or the official app, as [cybermalveillance.gouv.fr](https://www.cybermalveillance.gouv.fr/tous-nos-contenus/actualites/hameconnage-assurance-maladie-ameli) recalls.',
          'It is the most effective gesture, because phishing rests precisely on a link that mimics the real site. By typing the address yourself, you short-circuit the trap.',
        ],
      },
      {
        type: 'text',
        title: 'Strong password and two-factor authentication',
        paragraphs: [
          'Use long, complex passwords, different for each account, of at least twelve characters mixing upper and lower case, digits and special characters. And enable two-factor authentication when the service offers it.',
          'Finally, learn to recognise phishing: a reimbursement, update or urgent-payment pretext pushing you to click fast. An official body does not work that way.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'Never go through a link received by email or text',
          'Use a bookmark you created yourself or the official app',
          'Long, complex, different passwords (at least 12 characters)',
          'Enable two-factor authentication',
          'Beware reimbursement or urgent-payment pretexts',
        ],
      },
    ],
  }),

  postPair({
    slug: 'jouets-connectes-enfant-conseils-securite',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Jouets connectés pour enfant : comment les sécuriser',
    titleEn: 'Connected toys for a child: how to secure them',
    excerptFr:
      'Poupées, robots ou montres connectés écoutent et transmettent. Mal sécurisés, ils exposent l’enfant. Quelques gestes et un peu de sobriété suffisent à réduire le risque.',
    excerptEn:
      'Connected dolls, robots or watches listen and transmit. Poorly secured, they expose the child. A few gestures and some restraint reduce the risk.',
    readingMinutes: 3,
    heroAltFr: 'Sécuriser les jouets connectés d’un enfant',
    heroAltEn: 'Securing a child’s connected toys',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Les jouets connectés, poupées, robots, montres, arrivent tôt dans la vie d’un enfant, souvent offerts. Derrière l’aspect ludique, ce sont des objets qui collectent des informations et les transmettent, parfois avec un microphone.',
          'Mal sécurisés, ils peuvent exposer l’enfant. Les choisir et les régler avec un peu d’attention change beaucoup.',
        ],
      },
      {
        type: 'text',
        title: 'Un risque réel, déjà sanctionné',
        paragraphs: [
          'Les données de ces jouets peuvent être détournées à des fins d’escroquerie, d’usurpation d’identité ou de harcèlement, prévient la [CNIL](https://www.cnil.fr/fr/jouets-connectes-quels-conseils-pour-les-securiser). Elle a d’ailleurs sanctionné un fabricant de poupées connectées mal sécurisées, écoutables à quelques mètres depuis un smartphone, sans authentification.',
          'Le risque n’est donc pas théorique : il a déjà été constaté et sanctionné.',
        ],
      },
      {
        type: 'text',
        title: 'Sécuriser et minimiser',
        paragraphs: [
          'Vérifiez que l’appairage exige un bouton physique ou un mot de passe, et changez le paramétrage par défaut, mot de passe et code. Créez une adresse mail dédiée aux jouets, utilisez des pseudonymes plutôt que le nom de l’enfant, et n’activez que les fonctions utiles.',
          'Un dernier point, plus intime : certaines plateformes permettent de réécouter les conversations de l’enfant. C’est une atteinte à sa vie privée et à la confiance, à considérer avant d’acheter.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Ces jouets collectent et transmettent des informations',
          'Risque déjà sanctionné par la CNIL',
          'Appairage par bouton physique ou mot de passe, changer les réglages par défaut',
          'Adresse mail dédiée, pseudonymes, fonctions minimales',
          'Se méfier des plateformes qui réécoutent les conversations',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'Connected toys, dolls, robots, watches, arrive early in a child\'s life, often as gifts. Behind the playful side, they are objects that collect information and transmit it, sometimes with a microphone.',
          'Poorly secured, they can expose the child. Choosing and setting them with a little attention changes a lot.',
        ],
      },
      {
        type: 'text',
        title: 'A real risk, already sanctioned',
        paragraphs: [
          'The data from these toys can be diverted for scams, identity theft or harassment, warns the [CNIL](https://www.cnil.fr/fr/jouets-connectes-quels-conseils-pour-les-securiser). It has in fact sanctioned a maker of poorly secured connected dolls, listenable from a few metres away from a smartphone, without authentication.',
          'So the risk is not theoretical: it has already been observed and sanctioned.',
        ],
      },
      {
        type: 'text',
        title: 'Secure and minimise',
        paragraphs: [
          'Check that pairing requires a physical button or a password, and change the default settings, password and code. Create a dedicated email address for the toys, use pseudonyms rather than the child\'s name, and enable only useful functions.',
          'One last, more intimate point: some platforms let you replay the child\'s conversations. That is a breach of their privacy and of trust, to weigh before buying.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'These toys collect and transmit information',
          'A risk already sanctioned by the CNIL',
          'Pairing by physical button or password, change default settings',
          'Dedicated email, pseudonyms, minimal functions',
          'Beware platforms that replay conversations',
        ],
      },
    ],
  }),

  postPair({
    slug: 'donnees-bebe-droit-suppression-rgpd',
    categoryKey: 'privacy',
    categoryFr: 'Vie privée',
    categoryEn: 'Privacy',
    titleFr: 'Données de bébé : exercer le droit à l’effacement',
    titleEn: 'Baby’s data: exercising the right to erasure',
    excerptFr:
      'Les données d’un enfant peuvent être effacées, et ce sont les parents qui exercent ce droit. Voici comment demander la suppression, et quoi faire en cas de refus.',
    excerptEn:
      'A child’s data can be erased, and it is the parents who exercise this right. Here is how to request deletion, and what to do if refused.',
    readingMinutes: 3,
    heroAltFr: 'Le droit à l’effacement des données de bébé',
    heroAltEn: 'The right to erasure of baby’s data',
    sectionsFr: [
      {
        type: 'text',
        paragraphs: [
          'Une photo, un compte, une inscription à un service : les données d’un enfant s’accumulent parfois avant même qu’il ne parle. Bonne nouvelle, elles ne sont pas gravées dans le marbre. Le droit à l’effacement permet d’en demander la suppression.',
          'Et pour un tout-petit, ce sont les parents qui l’exercent.',
        ],
      },
      {
        type: 'text',
        title: 'Un droit exercé par les parents',
        paragraphs: [
          'Le droit à l’effacement permet de faire supprimer des données personnelles en ligne, selon la [CNIL](https://www.cnil.fr/fr/comprendre-mes-droits/le-droit-leffacement-supprimer-vos-donnees-en-ligne). Pour un mineur, ce sont en général les parents, représentants légaux, qui exercent l’effacement, comme l’accès ou la rectification.',
          'Le droit à l’oubli est même renforcé pour les mineurs : une personne qui était mineure au moment de la publication peut demander l’effacement dans les meilleurs délais, sans que cela retire aux parents la possibilité d’agir en son nom.',
        ],
      },
      {
        type: 'text',
        title: 'Comment faire, et en cas de refus',
        paragraphs: [
          'La demande se fait auprès de l’organisme ou du service qui détient les données. En l’absence de réponse ou en cas de refus, il est possible de porter plainte auprès de la CNIL.',
          'Ce droit repose sur le règlement européen sur la protection des données. Le savoir, c’est pouvoir reprendre la main sur l’empreinte numérique de son enfant, plutôt que de la subir.',
        ],
      },
      {
        type: 'list',
        title: 'Les repères',
        items: [
          'Le droit à l’effacement permet de supprimer des données en ligne',
          'Pour un mineur : exercé par les parents, représentants légaux',
          'Droit à l’oubli renforcé pour les mineurs',
          'Demande à l’organisme qui détient les données',
          'En cas de refus : plainte possible auprès de la CNIL',
        ],
      },
    ],
    sectionsEn: [
      {
        type: 'text',
        paragraphs: [
          'A photo, an account, a service registration: a child\'s data sometimes accumulates before they even speak. Good news, it is not set in stone. The right to erasure lets you request its deletion.',
          'And for a very young child, it is the parents who exercise it.',
        ],
      },
      {
        type: 'text',
        title: 'A right exercised by the parents',
        paragraphs: [
          'The right to erasure lets you have personal data deleted online, according to the [CNIL](https://www.cnil.fr/fr/comprendre-mes-droits/le-droit-leffacement-supprimer-vos-donnees-en-ligne). For a minor, it is generally the parents, the legal representatives, who exercise erasure, like access or rectification.',
          'The right to be forgotten is even reinforced for minors: someone who was a minor at the time of publication can request erasure as soon as possible, without removing the parents\' ability to act on their behalf.',
        ],
      },
      {
        type: 'text',
        title: 'How to do it, and if refused',
        paragraphs: [
          'The request is made to the organisation or service holding the data. In the absence of a reply or in case of refusal, you can lodge a complaint with the CNIL.',
          'This right rests on the European data-protection regulation. Knowing it means being able to take back control of your child\'s digital footprint, rather than being subject to it.',
        ],
      },
      {
        type: 'list',
        title: 'The essentials',
        items: [
          'The right to erasure lets you delete data online',
          'For a minor: exercised by the parents, legal representatives',
          'Reinforced right to be forgotten for minors',
          'Request to the organisation holding the data',
          'If refused: complaint possible with the CNIL',
        ],
      },
    ],
  }),
];

export const { fr: POSTS_SEO9_FR, en: POSTS_SEO9_EN } = pairsToArrays(pairs);
