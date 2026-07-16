/**
 * English.
 *
 * Note what is missing: `templates.adminFr`. Per spec §7.1 the EN locale ships WITHOUT the
 * French administrative module rather than with a bad translation of it — a US or UK user
 * has no CPAM, no CAF, and no congé maternité, and a literal translation would be actively
 * misleading. `templatesForLocale('en')` filters that template out at the source, so these
 * keys are never requested.
 *
 * Same voice rules as FR (§8.3): warm, precise, adult. No baby talk, no outcome prediction.
 */
export const en = {
  common: {
    appName: 'Bulle',
    tagline: 'Your bubble, together, before the baby arrives.',
    back: 'Back',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    continue: 'Continue',
    skip: 'Skip',
    add: 'Add',
    delete: 'Delete',
    week: 'Week',
    loading: 'One moment',
  },

  tabs: {
    today: 'Today',
    journey: 'Journey',
    plan: 'Prepare',
    memories: 'Memories',
    more: 'More',
  },

  readiness: {
    empty: 'Your bubble is taking shape.',
    starting: 'You are getting started.',
    forming: 'Your bubble is taking shape.',
    wellUnderway: 'You are well underway.',
    nearly: 'Almost everything is ready.',
    ready: 'You are ready.',
    label: '{{phrase}} {{remaining}} essentials left.',
    labelDone: '{{phrase}} Everything is ready.',
    detail: '{{resolved}} of {{total}}',
    profileChanged: 'Your date changed, so the list adjusted.',
  },

  today: {
    greeting: 'Hello',
    weekLine: 'Week {{sa}} · {{days}} days to go',
    weekLineSG: 'Week {{sg}} · {{days}} days to go',
    weekBulleLabel: 'Illustration: {{week}} weeks of gestation.',
    focusTitle: 'To do now',
    done: 'Done',
    later: 'Later',
    upcoming: 'Coming up',
    addEvent: 'Add',
    eventToday: 'Today at {{time}}',
    eventTomorrow: 'Tomorrow at {{time}}',
    eventInDays: 'In {{count}} days',
    noEvents: 'No appointments coming up.',
    partnerDid: 'Your co-parent ticked “{{title}}”',
    partnerDismissed: 'Your co-parent set aside “{{title}}”',
    thisWeek: 'This week',
    together: 'Together',
    calm: 'All is quiet this week.',
    caughtUp: 'Nothing to do right now. That is normal.',
    emptyFocus: 'Nothing essential this week. Enjoy it.',
  },

  journey: {
    title: 'Journey',
    youAreHere: 'You are here',
    weekTitle: 'Week {{week}}',
    baby: 'Your baby',
    you: 'You',
    coparent: 'For the co-parent',
    toPrepare: 'To prepare',
    behindYou: 'Behind you.',
    ahead: 'Still ahead.',
    quietWeek: 'Nothing marked this week.',
    previousWeek: 'Earlier',
    nextWeek: 'Later',
    backToNow: 'Back to now',
  },

  plan: {
    title: 'Prepare',
    projects: 'Projects',
    addProject: 'Add a project',
    templates: 'Templates',
    allTemplates: 'Everything else',
    ideas_one: '+{{count}} idea',
    ideas_other: '+{{count}} ideas',
    progress: '{{resolved}} of {{total}}',
    noEssentials: 'No essentials here yet.',
    empty: 'Nothing to prepare yet. Add a project when you feel like it.',
    windowLabel: 'Weeks {{start}} to {{end}}',
    effort: {
      S: '~20 min',
      M: '~1 hr',
      L: 'A proper session',
    },
    dismiss: 'Not for us',
    lingering: 'Still on your list',
    suggestTemplate: 'Bulle suggests: {{title}}',
    premiumTemplate: 'With Complète',
    addTemplate: 'Add to Prepare',
    tasks: 'Tasks',
    addTask: 'Add a task',
    newTaskTitle: 'A task of your own',
    taskLabel: 'What is it?',
    taskPlaceholder: 'Buy a breast pump',
    taskHint: 'Your own tasks stay optional. They never count against you.',
    effortQuestion: 'How much of a job?',
    whenQuestion: 'When?',
    when: {
      thisWeek: 'This week',
      soon: 'In the next few weeks',
      beforeBirth: 'Before the baby arrives',
    },
  },

  birth: {
    announce: 'The baby is here',
    announceBody: 'Records the birth date. It is what times the paperwork that follows.',
    title: 'The baby is here',
    question: 'When were they born?',
    lead: 'The date matters: every deadline that follows runs from it, not from the due date.',
    confirm: 'Record the birth',
    born: 'Born {{date}}',
    dayOne: 'Day one.',
    dayN: 'Day {{count}}.',
    deadlineToday: 'Today',
    deadlineDays_one: '{{count}} day left',
    deadlineDays_other: '{{count}} days left',
    deadlinePassed: 'The window has closed',
    afterBirth: 'After the birth',
  },

  task: {
    optional: 'An idea, not an essential. It never counts against you.',
    openSource: 'Read the official page',
    markTodo: 'Not done after all',
    afterBirthPending: 'Once the baby is here',
  },

  memories: {
    title: 'Memories',
    placeholder: 'Nothing here yet. Write something when you feel like it.',
    add: 'Add',
    newTitle: 'Something to keep',
    kindQuestion: 'What is it?',
    kinds: {
      note: 'A note',
      milestone: 'A moment',
    },
    kindHints: {
      note: 'Something you want to say, or remember thinking.',
      milestone: 'Something that happened. The first kick, the first scan.',
    },
    titleLabel: 'Title',
    titlePlaceholder: 'Optional',
    bodyLabel: 'What happened?',
    bodyPlaceholder: 'Write as much or as little as you want.',
    weekStamp: 'Week {{week}}',
    delete: 'Delete',
  },

  onboarding: {
    welcomeTitle: 'Bulle',
    welcomeBody: 'A calm place, together, to prepare for your baby. Nothing leaves your phone.',
    start: 'Start',
    dueDateQuestion: 'When is your baby due?',
    dueDateUnknown: 'I do not know yet',
    dueDateHelp: 'You can correct this after a scan.',
    dueDateConfirm: 'Continue with {{date}}',
    lmpQuestion: 'First day of your last period?',
    firstBabyQuestion: 'Is this your first baby?',
    yes: 'Yes',
    no: 'No',
    companionshipQuestion: 'Who is preparing with you?',
    companionshipCouple: 'The two of us',
    companionshipSolo: 'Just me',
    profileQuestion: 'Anything we should know?',
    profileNone: 'None of these',
    profileMultiples: 'Twins',
    profileGentle: 'A closely followed pregnancy',
    profileSensitive: 'After a difficult journey',
    concernQuestion: 'What is on your mind most?',
    concernOrganisation: 'Organisation',
    concernShopping: 'Shopping and budget',
    concernAdmin: 'Paperwork',
    concernEverything: 'A bit of everything',
    notificationsQuestion: 'A single check-in each morning?',
    notificationsYes: 'Yes, mornings',
    notificationsNo: 'No thanks',
    creating: 'Preparing your bubble',
    privacyNote: 'No account. No ads. Your data stays with you.',
  },

  join: {
    confirmTitle: 'Join {{name}}?',
    confirmBody: 'You will have access to this bubble on this device. No account to create.',
    existingWarning: 'You already have a bubble on this device. This one will be added.',
    confirm: 'Join',
    joining: 'Adding you to the bubble',
    invalidTitle: 'This link does not work',
    invalidBody: 'It may have expired, or been copied only in part. Ask for a new one.',
    startOwn: 'Create my own bubble',
    failedTitle: 'We could not add you',
    failedBody: 'Check your connection, then try again.',
    retry: 'Try again',
  },

  pause: {
    title: 'Bulle is paused',
    body: 'Your notifications are stopped. Nothing will be brought up.',
    export: 'Export my data',
    delete: 'Delete everything',
    keep: 'Keep it for later',
    resume: 'Turn Bulle back on',
    deleteConfirmTitle: 'Delete everything?',
    deleteConfirmBody: 'Your data will be erased from this device. This cannot be undone.',
    enter: 'Pause Bulle',
    enterBody: 'Notifications stop and the journey disappears. You can come back whenever you want.',
  },

  settings: {
    title: 'More',
    family: 'Family',
    invite: 'Invite',
    inviteBody: 'Share this link with your co-parent. They join your bubble, with no account.',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    language: 'Language',
    languageFr: 'Français',
    languageEn: 'English',
    languageCurrent: 'Selected',
    notifications: 'A morning check-in',
    notificationsBody: 'One a day, never more. Nothing in the evening.',
    bulleActive: 'Active bubble',
    aboutBody: 'Bulle helps you get organised, not treated.',
    premium: 'Bulle Complète',
    premiumBody: 'Every template and the full French paperwork. Once, for the whole pregnancy.',
    premiumActive: 'Bulle Complète',
    premiumActiveBody: 'Unlocked. Thank you.',
    restore: 'Restore a purchase',
    restoreBody: 'Already paid, on another device or before a reinstall.',
    restoreDone: 'Your purchase is back.',
    restoreEmpty: 'No purchase found on this account.',
    appearance: 'Appearance',
    pause: 'Pause',
    privacy: 'Privacy',
    about: 'About',
    roles: {
      roleCoparentName: 'Co-parent',
      roleFamilleName: 'Family',
      roleDoulaName: 'Doula',
    },
  },

  sync: {
    readOnly: 'You have read-only access to this bubble.',
    offline: 'Offline. Your changes are kept here.',
  },

  events: {
    newTitle: 'An appointment',
    kindQuestion: 'What kind?',
    dateQuestion: 'Which day?',
    timeQuestion: 'At what time?',
    kinds: {
      echo: 'Scan',
      consultation: 'Appointment',
      prepa: 'Antenatal class',
      admin: 'Paperwork appointment',
      autre: 'Other',
    },
  },

  welcome: {
    start: 'Start',
    today: {
      eyebrow: 'Today',
      title: 'One thing at a time',
      tagline: 'Bulle shows you the next action, not how far behind you are.',
      bullets: {
        oneThing: 'One task at a time, chosen for this week',
        noShame: 'No counters, no red, no guilt-trip reminders',
        together: 'What your co-parent does shows up here too',
      },
    },
    journey: {
      eyebrow: 'Journey',
      title: 'Week after week',
      tagline: 'One thread, from the first scan to the day itself.',
      bullets: {
        week: 'Where you are, without having to count',
        milestones: 'The scans and appointments that matter',
        pause: 'You can pause all of it, at any time',
      },
    },
    plan: {
      eyebrow: 'Prepare',
      title: 'Projects, not a list',
      tagline: 'Forty loose tasks is a source of dread. Six projects is a shape.',
      bullets: {
        projects: 'Each project moves at its own pace',
        admin: 'Every step arrives when it matters',
        essentials: 'Only the essentials count. The rest are ideas',
      },
    },
    memories: {
      eyebrow: 'Memories',
      title: 'What you will keep',
      tagline: 'Photos, notes, moments. Nothing leaves your phone.',
      bullets: {
        gather: 'Your memories gather as the weeks pass',
        private: 'Encrypted, shared with your co-parent only',
        later: 'You will read them back later. That is the point',
      },
    },
  },

  paywall: {
    title: 'Bulle Complète',
    orbLabel: 'A full bubble.',
    lead: {
      adminTemplate: 'Every step at the moment it matters, with its official source. It is the thing Bulle does best.',
      projectLimit: 'You have filled your two projects. Complète unlocks them all.',
    },
    benefits: {
      adminAll: 'The full French paperwork template',
      adminTiming: 'Every step in its own week, with its official source',
      unlimited: 'As many projects as you want',
      allTemplates: 'Every template, including twins and solo',
    },
    price: '€29.99 · once, for the whole pregnancy',
    priceOnce: '{{price}} · once, for the whole pregnancy',
    cta: 'Unlock Bulle Complète',
    later: 'Later',
    restore: 'Restore a purchase',
    restoreEmpty: 'No purchase found on this account.',
    reassurance: 'One purchase, for both of you. No subscription.',
  },

  marketing: {
    nav: {
      blog: 'Journal',
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms',
      madeWith: 'Made in France, offline, ad-free.',
    },
    landing: {
      metaTitle: 'Bulle — prepare for your baby, together and calmly',
      metaDescription:
        'The private app for preparing for your baby together: paperwork, hospital bag, the things worth buying. No account, no ads, your data stays on your phone.',
      eyebrow: 'Before the arrival',
      headline: 'Your bubble, together, before the baby arrives',
      subhead:
        'A calm place to prepare what needs preparing, together. The right thing at the right time, the bag packed before the day, and nothing else in your way.',
      cta: 'Read the Journal',
      ctaNote: 'No account. No ads. Your data stays with you.',
      orbLabel: 'The bubble, midway through preparing.',
      whatTitle: 'What Bulle does',
      pillars: {
        calm: {
          title: 'One thing at a time',
          body:
            'Bulle shows you the next action, not how far behind you are. No counters, no red, no guilt-trip reminders.',
        },
        together: {
          title: 'Together, actually',
          body:
            'Both parents get the same access, the same list, the same view. Neither one is the other’s assistant.',
        },
        admin: {
          title: 'The paperwork',
          body:
            'Every step arrives when it matters, with the official link. Nothing to remember, nothing to miss.',
        },
      },
      privacyTitle: 'A due date is health data',
      privacyBody:
        'A pregnancy changes your habits overnight. That is what makes this data valuable, and why so many apps are free. Bulle is bought once, and knows nothing about you.',
      privacyPoints: {
        noAccount: 'No account to create. Your identity stays on your phone.',
        onDevice: 'Your data lives on your device, not on our servers.',
        e2ee:
          'What syncs between you and your co-parent is end-to-end encrypted. We do not have the key.',
        oneTime: 'A single purchase. No ads, no resale, no third-party SDKs.',
      },
      carnetTitle: 'From the Journal',
    },
    blog: {
      metaTitle: 'Journal — preparing for a baby | Bulle',
      metaDescription:
        'Paperwork, hospital bag, what is worth buying, privacy. Short, honest articles about preparing for a baby.',
      title: 'Journal',
      subtitle: 'What we wish we had read. Short, honest, with nothing to sell you.',
      readingMinutes: '{{count}} min read',
      updated: 'updated {{date}}',
      backToBlog: 'Back to the Journal',
      notFoundTitle: 'This article does not exist yet',
      emptyTitle: 'The Journal opens soon',
      emptyBody: 'One article a day, from 20 July 2026.',
    },
    authors: {
      paul: {
        role: 'Founder of Bulle',
        bio:
          'Paul builds Bulle. He writes about paperwork, privacy, and preparing as a couple, because those are the things he struggled with himself.',
        expertise: {
          admin: 'French paperwork, from the first trimester to the birth',
          privacy: 'End-to-end encryption and account-free apps',
          organisation: 'Sharing the mental load in a couple',
        },
      },
      sageFemme: {
        role: 'Midwife',
        bio:
          'Camille is a midwife. She reviews Bulle’s health content and writes the articles about pregnancy care and the postpartum period.',
        expertise: {
          suivi: 'Pregnancy care in France',
          maternite: 'Choosing and preparing for a maternity unit',
          postpartum: 'The fourth trimester',
        },
      },
    },
    privacy: {
      metaTitle: 'Privacy — Bulle',
      metaDescription:
        'What Bulle knows about you: nothing. No account, no ads, end-to-end encryption. Our privacy policy, in plain English.',
      title: 'Privacy',
      intro:
        'This page is written to be read, not to protect us. Here is exactly what happens with your data.',
      updated: 'Last updated: July 2026.',
      sections: [
        {
          title: 'We have no accounts',
          body:
            'Bulle asks for no email, no password, no phone number. Your identity is a recovery phrase generated on your device and kept in your phone’s keychain. We never see it.',
        },
        {
          title: 'Your data stays on your phone',
          body:
            'Everything you write in Bulle is stored locally. The app works entirely offline. No data goes anywhere if you invite nobody.',
        },
        {
          title: 'Syncing is end-to-end encrypted',
          body:
            'If you invite your co-parent, what travels between your devices is encrypted with a key that never leaves your phones. Our servers store ciphertext only. We cannot read what you write, even if we were asked to.',
        },
        {
          title: 'Health data',
          body:
            'A due date, pregnancy care and medical documents are health data under GDPR Article 9. That is exactly why Bulle is built so that we cannot access it, rather than promising that we will not.',
        },
        {
          title: 'No ads, no trackers',
          body:
            'Bulle contains no advertising SDK and no third-party analytics. We sell nothing to anyone. The app is bought once, and that is our entire business model.',
        },
        {
          title: 'Export and deletion',
          body:
            'You can export all of your data as JSON from inside the app, at any time, without asking us. Deletion is real: data is erased from the device, and synced items are marked deleted for your co-parents.',
        },
      ],
    },
    terms: {
      metaTitle: 'Terms of use — Bulle',
      metaDescription: 'Bulle’s terms of use, in plain English.',
      title: 'Terms of use',
      intro: 'The necessary minimum, written to be read.',
      updated: 'Last updated: July 2026.',
      sections: [
        {
          title: 'Bulle does not replace a health professional',
          body:
            'Bulle helps you get organised. It makes no diagnosis, tracks no symptoms and gives no personalised medical advice. For any health question, speak to your midwife or your doctor.',
        },
        {
          title: 'Content is informational',
          body:
            'Administrative information and buying guides are carefully reviewed and link to official sources, but regulations change. Always check amounts, deadlines and your entitlements at the source.',
        },
        {
          title: 'Your recovery phrase',
          body:
            'Because there is no account, there is no "forgot password" button. Your recovery phrase is the only way to restore your bubble on another device. If you lose it and lose your devices, we cannot help: we do not have the key. That is the cost of end-to-end encryption, and we would rather say so plainly.',
        },
        {
          title: 'Purchase',
          body:
            'Bulle Complète is a single purchase per bubble, covering both parents. There is no subscription. Refunds follow the App Store or Play Store rules for your platform.',
        },
      ],
    },
  },

  templates: {
    achats: {
      title: 'The essentials',
      description: 'What actually gets used. The rest can wait.',
      tasks: {
        siegeAuto: 'Choose and buy the car seat',
        siegeAutoNote: 'i-Size (R129). Required from the moment you leave hospital. Never second-hand without its history.',
        installer: 'Fit the car seat and try it empty',
        installerNote: 'At home, calmly, not in the hospital car park. A great seat fitted badly protects less than a decent seat fitted well.',
        liste: 'Open the registry',
        listeNote: 'After the anomaly scan. Opening early avoids duplicates.',
        poussette: 'Choose the pushchair',
        poussetteNote: 'Test the fold, measure your boot and your lift before buying. Four questions beat forty reviews.',
        occasion: 'Check second-hand before accepting it',
        occasionNote: 'Search the product name plus the word recall. Thirty seconds. Never a car seat, never a dipped mattress.',
        tailleNaissance: 'Go easy on newborn-size clothes',
        tailleNaissanceNote: 'Three to five newborn bodysuits, the rest in 1 month. The most common buying regret.',
        trousse: 'Put together the care kit',
        trousseNote: 'Saline, thermometer, nasal aspirator, compresses. Before, not on the evening you get home.',
      },
    },
    valise: {
      title: 'Hospital bag',
      description: 'Ready well before the day.',
      tasks: {
        maman: 'Pack the birthing parent’s bag',
        bebe: 'Pack the baby’s bag',
        coparent: 'Pack the co-parent’s bag',
        documents: 'Gather the documents for the hospital',
        documentsNote: 'Insurance details, blood group, maternity notes.',
        siegeAuto: 'Fit the car seat and try it',
        siegeAutoNote: 'i-Size R129. Try it once empty.',
        trajet: 'Check the route to the hospital',
      },
    },
    nid: {
      title: 'The nest',
      description: 'The baby’s corner, without rushing.',
      tasks: {
        emplacement: 'Choose where the baby’s corner goes',
        lit: 'Choose and order the cot',
        litNote: 'EN 716. A firm mattress, the right size.',
        installerLit: 'Assemble the cot',
        laverVetements: 'Wash and put away the first clothes',
        laverVetementsNote: 'Six to eight newborn bodysuits is plenty.',
        change: 'Set up a changing spot',
        securite: 'Check the home for safety',
      },
    },
  },
};
