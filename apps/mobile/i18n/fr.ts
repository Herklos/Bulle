/**
 * French — the default locale and the language the product was designed in.
 *
 * Voice (spec §8.3): tutoiement, warm, precise, adult. Active verbs. One emoji per screen
 * maximum, zero in sensitive states. Banned: stacked exclamation marks, "super !", baby
 * talk, comparisons to other parents, and any copy that predicts an outcome.
 *
 * The grief-safety rule (§3.3) applies to every string here: read each one as if it were
 * seen the day after a loss.
 */
export const fr = {
  common: {
    appName: 'Bulle',
    tagline: 'Votre bulle à deux avant l’arrivée de bébé.',
    back: 'Retour',
    cancel: 'Annuler',
    save: 'Enregistrer',
    close: 'Fermer',
    continue: 'Continuer',
    skip: 'Passer',
    add: 'Ajouter',
    delete: 'Supprimer',
    week: 'Semaine',
    loading: 'Un instant',
  },

  tabs: {
    today: 'Aujourd’hui',
    journey: 'Chemin',
    plan: 'Préparer',
    memories: 'Souvenirs',
    more: 'Plus',
  },

  readiness: {
    empty: 'Votre bulle se dessine.',
    starting: 'Vous commencez.',
    forming: 'Votre bulle prend forme.',
    wellUnderway: 'Vous avancez bien.',
    nearly: 'Presque tout est prêt.',
    ready: 'Vous êtes prêts.',
    // Read out for the orb (§15.8 item 4). The orb is never a visual-only state.
    label: '{{phrase}} {{remaining}} essentiels restants.',
    labelDone: '{{phrase}} Tout est prêt.',
    detail: '{{resolved}} sur {{total}}',
    profileChanged: 'Votre date a changé, la liste s’est ajustée.',
  },

  today: {
    greeting: 'Bonjour',
    weekLine: 'Semaine {{sa}} SA · J-{{days}}',
    weekLineSG: 'Semaine {{sg}} SG · J-{{days}}',
    focusTitle: 'À faire maintenant',
    done: 'C’est fait',
    later: 'Plus tard',
    upcoming: 'À venir',
    thisWeek: 'Cette semaine',
    together: 'Ensemble',
    // Rotating footer lines. Honest, never filler.
    calm: 'Tout est calme pour cette semaine.',
    caughtUp: 'Rien à faire pour l’instant. C’est normal.',
    emptyFocus: 'Rien d’essentiel cette semaine. Profitez-en.',
  },

  journey: {
    title: 'Chemin',
    youAreHere: 'Vous êtes ici',
    weekTitle: 'Semaine {{week}}',
    baby: 'Votre bébé',
    you: 'Vous',
    coparent: 'Pour le co-parent',
    toPrepare: 'À préparer',
    placeholder: 'Le contenu semaine par semaine arrive bientôt.',
  },

  plan: {
    title: 'Préparer',
    projects: 'Projets',
    addProject: 'Ajouter un projet',
    templates: 'Modèles',
    ideas_one: '+{{count}} idée',
    ideas_other: '+{{count}} idées',
    progress: '{{resolved}} sur {{total}}',
    noEssentials: 'Pas encore d’essentiel ici.',
    empty: 'Rien à préparer pour l’instant. Ajoutez un projet quand vous le sentez.',
    windowLabel: 'Semaines {{start}} à {{end}}',
    effort: {
      S: '~20 min',
      M: '~1 h',
      L: 'Une vraie session',
    },
    dismiss: 'Pas pour nous',
    // Never "en retard". A closed window is not a failure (§5.1).
    lingering: 'Toujours sur votre liste',
    suggestTemplate: 'Bulle propose : {{title}}',
    addTemplate: 'Ajouter à Préparer',
  },

  memories: {
    title: 'Souvenirs',
    placeholder: 'Vos photos, mots et moments se rassembleront ici.',
  },

  onboarding: {
    welcomeTitle: 'Bulle',
    welcomeBody: 'Un endroit calme, à deux, pour préparer l’arrivée de votre bébé. Rien ne sort de votre téléphone.',
    start: 'Commencer',
    dueDateQuestion: 'Quelle est votre date prévue d’accouchement ?',
    dueDateUnknown: 'Je ne sais pas encore',
    dueDateHelp: 'Vous pourrez la corriger après une échographie.',
    dueDateConfirm: 'Continuer avec le {{date}}',
    lmpQuestion: 'Premier jour de vos dernières règles ?',
    firstBabyQuestion: 'C’est votre premier bébé ?',
    yes: 'Oui',
    no: 'Non',
    companionshipQuestion: 'Qui prépare avec vous ?',
    companionshipCouple: 'À deux',
    companionshipSolo: 'Juste moi',
    profileQuestion: 'Un profil particulier ?',
    profileNone: 'Rien de tout cela',
    profileMultiples: 'Des jumeaux',
    profileGentle: 'Une grossesse suivie de près',
    profileSensitive: 'Après un parcours difficile',
    concernQuestion: 'Votre plus grande préoccupation ?',
    concernOrganisation: 'L’organisation',
    concernShopping: 'Les achats et le budget',
    concernAdmin: 'L’administratif',
    concernEverything: 'Un peu tout',
    notificationsQuestion: 'Un point chaque matin ?',
    notificationsYes: 'Oui, le matin',
    notificationsNo: 'Non merci',
    creating: 'On prépare votre bulle',
    // Stated plainly, because in this category trust is the feature (§2.6).
    privacyNote: 'Pas de compte. Pas de publicité. Vos données restent chez vous.',
  },

  join: {
    confirmTitle: 'Rejoindre {{name}} ?',
    confirmBody: 'Vous aurez accès à cette bulle sur cet appareil. Aucun compte à créer.',
    existingWarning: 'Vous avez déjà une bulle sur cet appareil. Celle-ci s’ajoutera.',
    confirm: 'Rejoindre',
    joining: 'On vous ajoute à la bulle',
    invalidTitle: 'Ce lien ne fonctionne pas',
    invalidBody: 'Il a peut-être expiré, ou il a été copié en partie. Demandez-en un nouveau.',
    startOwn: 'Créer ma bulle',
    failedTitle: 'On n’a pas réussi à vous ajouter',
    failedBody: 'Vérifiez votre connexion, puis réessayez.',
    retry: 'Réessayer',
  },

  pause: {
    // §3.1. Sober. No illustration, no performative sympathy, no animation.
    title: 'Bulle est en pause',
    body: 'Vos notifications sont arrêtées. Rien ne vous sera rappelé.',
    export: 'Exporter mes données',
    delete: 'Tout supprimer',
    keep: 'Garder pour plus tard',
    resume: 'Réactiver Bulle',
    deleteConfirmTitle: 'Tout supprimer ?',
    deleteConfirmBody: 'Vos données seront effacées de cet appareil. Cette action est définitive.',
    enter: 'Mettre Bulle en pause',
    enterBody: 'Les notifications s’arrêtent et le chemin disparaît. Vous pourrez revenir quand vous le voudrez.',
  },

  settings: {
    title: 'Plus',
    family: 'Famille',
    invite: 'Inviter',
    inviteBody: 'Partagez ce lien avec votre co-parent. Il rejoint votre bulle, sans compte.',
    copyLink: 'Copier le lien',
    linkCopied: 'Lien copié',
    language: 'Langue',
    languageFr: 'Français',
    languageEn: 'English',
    appearance: 'Apparence',
    pause: 'Pause',
    privacy: 'Confidentialité',
    about: 'À propos',
    roles: {
      roleCoparentName: 'Co-parent',
      roleFamilleName: 'Famille',
      roleDoulaName: 'Doula',
    },
  },

  sync: {
    readOnly: 'Vous êtes en lecture seule dans cette bulle.',
    offline: 'Hors ligne. Vos changements sont gardés ici.',
  },

  marketing: {
    nav: {
      blog: 'Le Carnet',
    },
    footer: {
      privacy: 'Confidentialité',
      terms: 'Conditions',
      madeWith: 'Fait en France, hors ligne, sans publicité.',
    },
    landing: {
      metaTitle: 'Bulle — préparer l’arrivée de bébé, à deux et sans stress',
      metaDescription:
        'L’application privée pour préparer l’arrivée de votre bébé à deux : démarches administratives françaises, valise maternité, achats utiles. Sans compte, sans publicité, vos données restent sur votre téléphone.',
      eyebrow: 'Avant l’arrivée',
      headline: 'Votre bulle à deux avant l’arrivée de bébé',
      subhead:
        'Un endroit calme pour préparer ce qu’il y a à faire, à deux. Les démarches françaises au bon moment, la valise avant le jour J, et rien d’autre pour vous encombrer.',
      cta: 'Lire Le Carnet',
      ctaNote: 'Pas de compte. Pas de publicité. Vos données restent chez vous.',
      orbLabel: 'La bulle, à mi-parcours de la préparation.',
      whatTitle: 'Ce que fait Bulle',
      pillars: {
        calm: {
          title: 'Une chose à la fois',
          body:
            'Bulle vous montre la prochaine action, pas votre retard. Pas de compteur, pas de rouge, pas de rappel culpabilisant.',
        },
        together: {
          title: 'À deux, vraiment',
          body:
            'Les deux parents ont le même accès, la même liste, la même vue. Personne n’est l’assistant de l’autre.',
        },
        admin: {
          title: 'L’administratif français',
          body:
            'Déclaration, maternité, congés, mode de garde. Chaque démarche arrive au moment où elle compte, avec le lien officiel.',
        },
      },
      privacyTitle: 'Une date de terme est une donnée de santé',
      privacyBody:
        'Une grossesse change vos habitudes du jour au lendemain. C’est ce qui rend ces données précieuses, et c’est pour ça que tant d’applications sont gratuites. Bulle est payante une fois, et ne sait rien de vous.',
      privacyPoints: {
        noAccount: 'Pas de compte à créer. Votre identité reste sur votre téléphone.',
        onDevice: 'Vos données vivent sur votre appareil, pas sur nos serveurs.',
        e2ee:
          'Ce qui se synchronise entre vous et votre co-parent est chiffré de bout en bout. Nous n’avons pas la clé.',
        oneTime: 'Un achat unique. Pas de publicité, pas de revente, pas de SDK tiers.',
      },
      carnetTitle: 'Le Carnet',
    },
    blog: {
      metaTitle: 'Le Carnet — préparer l’arrivée de bébé | Bulle',
      metaDescription:
        'Démarches administratives, valise maternité, achats utiles, vie privée. Des articles courts et honnêtes pour préparer l’arrivée de votre bébé en France.',
      title: 'Le Carnet',
      subtitle: 'Ce qu’on aurait aimé lire. Court, honnête, sans rien à vous vendre.',
      readingMinutes: '{{count}} min de lecture',
      updated: 'mis à jour le {{date}}',
      backToBlog: 'Retour au Carnet',
      notFoundTitle: 'Cet article n’existe pas encore',
      emptyTitle: 'Le Carnet ouvre bientôt',
      emptyBody: 'Un article par jour, à partir du 20 juillet 2026. Le premier portera sur la déclaration de grossesse.',
    },
    authors: {
      paul: {
        role: 'Fondateur de Bulle',
        bio:
          'Paul construit Bulle. Il écrit sur l’administratif français, la vie privée, et l’organisation à deux, parce que ce sont les sujets sur lesquels il a lui-même galéré.',
        expertise: {
          admin: 'Les démarches françaises, du premier trimestre à la naissance',
          privacy: 'Chiffrement de bout en bout et applications sans compte',
          organisation: 'Répartir la charge mentale dans un couple',
        },
      },
      sageFemme: {
        role: 'Sage-femme',
        bio:
          'Camille est sage-femme. Elle relit le contenu santé de Bulle et écrit les articles qui touchent au suivi de grossesse et au post-partum.',
        expertise: {
          suivi: 'Le suivi de grossesse en France',
          maternite: 'Le choix et la préparation de la maternité',
          postpartum: 'Le quatrième trimestre',
        },
      },
    },
    privacy: {
      metaTitle: 'Confidentialité — Bulle',
      metaDescription:
        'Ce que Bulle sait de vous : rien. Pas de compte, pas de publicité, chiffrement de bout en bout. Notre politique de confidentialité, en français clair.',
      title: 'Confidentialité',
      intro:
        'Cette page est écrite pour être lue, pas pour nous protéger. Voilà exactement ce qui se passe avec vos données.',
      updated: 'Dernière mise à jour : juillet 2026.',
      sections: [
        {
          title: 'Nous n’avons pas de compte',
          body:
            'Bulle ne vous demande ni email, ni mot de passe, ni numéro de téléphone. Votre identité est une phrase de récupération générée sur votre appareil et gardée dans le trousseau de votre téléphone. Nous ne la voyons jamais.',
        },
        {
          title: 'Vos données restent sur votre téléphone',
          body:
            'Tout ce que vous écrivez dans Bulle est stocké localement. L’application fonctionne entièrement hors ligne. Aucune donnée n’est envoyée nulle part si vous n’invitez personne.',
        },
        {
          title: 'La synchronisation est chiffrée de bout en bout',
          body:
            'Si vous invitez votre co-parent, ce qui circule entre vos appareils est chiffré avec une clé qui ne quitte jamais vos téléphones. Nos serveurs ne stockent que du texte chiffré. Nous ne pouvons pas lire ce que vous écrivez, même si on nous le demandait.',
        },
        {
          title: 'Données de santé',
          body:
            'Une date de terme, un suivi de grossesse et des documents médicaux sont des données de santé au sens de l’article 9 du RGPD. C’est précisément pour ça que l’architecture de Bulle est faite pour que nous ne puissions pas y accéder, plutôt que pour que nous promettions de ne pas le faire.',
        },
        {
          title: 'Pas de publicité, pas de traceurs',
          body:
            'Bulle ne contient aucun SDK publicitaire ni aucun outil d’analyse tiers. Nous ne vendons rien à personne. L’application s’achète une fois, et c’est notre seul modèle économique.',
        },
        {
          title: 'Export et suppression',
          body:
            'Vous pouvez exporter toutes vos données au format JSON depuis l’application, à tout moment, sans nous le demander. La suppression est réelle : les données sont effacées de l’appareil et les éléments synchronisés sont marqués comme supprimés chez vos co-parents.',
        },
      ],
    },
    terms: {
      metaTitle: 'Conditions d’utilisation — Bulle',
      metaDescription: 'Les conditions d’utilisation de Bulle, en français clair.',
      title: 'Conditions d’utilisation',
      intro: 'Le strict nécessaire, écrit lisiblement.',
      updated: 'Dernière mise à jour : juillet 2026.',
      sections: [
        {
          title: 'Bulle ne remplace pas un professionnel de santé',
          body:
            'Bulle vous aide à vous organiser. Elle ne pose aucun diagnostic, ne suit aucun symptôme et ne donne aucun conseil médical personnalisé. Pour toute question de santé, adressez-vous à votre sage-femme, à votre médecin, ou au 15 en urgence.',
        },
        {
          title: 'Le contenu est informatif',
          body:
            'Les informations administratives et les guides d’achat sont relus avec soin et renvoient aux sources officielles, mais la réglementation change. Vérifiez toujours les montants, les délais et vos droits sur ameli.fr, caf.fr et service-public.fr.',
        },
        {
          title: 'Votre phrase de récupération',
          body:
            'Comme il n’y a pas de compte, il n’y a pas de bouton « mot de passe oublié ». Votre phrase de récupération est le seul moyen de retrouver votre bulle sur un autre appareil. Si vous la perdez et que vous perdez vos appareils, nous ne pouvons pas vous aider : nous n’avons pas la clé. C’est le prix du chiffrement de bout en bout, et nous préférons vous le dire clairement.',
        },
        {
          title: 'Achat',
          body:
            'Bulle Complète est un achat unique par bulle, valable pour les deux parents. Il n’y a pas d’abonnement. Les remboursements suivent les règles de l’App Store ou du Play Store selon votre plateforme.',
        },
      ],
    },
  },

  templates: {
    adminFr: {
      title: 'Administratif',
      description: 'Les démarches françaises, au bon moment.',
      tasks: {
        declaration: 'Déclarer la grossesse à la CPAM et à la CAF',
        declarationNote: 'Avant la fin du 3e mois.',
        maternite: 'Choisir la maternité et s’y inscrire',
        consultations: 'Planifier les 7 consultations prénatales',
        consultationsNote: 'Votre sage-femme ou votre médecin les organise avec vous.',
        echographies: 'Planifier les 3 échographies',
        mutuelle: 'Prévenir la mutuelle et vérifier la chambre particulière',
        congeMaternite: 'Prévenir l’employeur pour le congé maternité',
        congePaternite: 'Prévenir l’employeur pour le congé paternité',
        reconnaissance: 'Faire la reconnaissance anticipée à la mairie',
        reconnaissanceNote: 'Pour les couples non mariés.',
        garde: 'Commencer la recherche de mode de garde',
        gardeNote: 'Crèche ou assistante maternelle. Dans les zones tendues, on s’y prend tôt.',
        paje: 'Vérifier l’éligibilité à la prime de naissance et à la PAJE',
        postNaissance: 'Préparer les démarches d’après la naissance',
        postNaissanceNote: 'La déclaration de naissance se fait dans les 5 jours.',
      },
    },
    valise: {
      title: 'Valise maternité',
      description: 'Prête bien avant le jour J.',
      tasks: {
        maman: 'Préparer la valise de la maman',
        bebe: 'Préparer la valise de bébé',
        coparent: 'Préparer le sac du co-parent',
        documents: 'Rassembler les documents pour la maternité',
        documentsNote: 'Carte vitale, mutuelle, groupe sanguin, dossier de maternité.',
        siegeAuto: 'Installer le siège-auto et l’essayer',
        siegeAutoNote: 'Norme i-Size R129. Essayez-le une fois à vide.',
        trajet: 'Repérer le trajet vers la maternité',
      },
    },
    nid: {
      title: 'Le nid',
      description: 'Le coin de bébé, sans précipitation.',
      tasks: {
        emplacement: 'Choisir l’emplacement du coin bébé',
        lit: 'Choisir et commander le lit',
        litNote: 'Norme EN 716. Un matelas ferme, à la bonne taille.',
        installerLit: 'Installer le lit',
        laverVetements: 'Laver et ranger les premiers vêtements',
        laverVetementsNote: 'Six à huit bodies naissance suffisent.',
        change: 'Prévoir un point de change',
        securite: 'Vérifier la sécurité de la maison',
      },
    },
  },
} as const;
