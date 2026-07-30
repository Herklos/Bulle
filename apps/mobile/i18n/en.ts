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
    more: 'Settings',
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
    greetingEvening: 'Good evening',
    weekLine: 'Week {{sa}} · {{days}} days to go',
    weekLineSG: 'Week {{sg}} · {{days}} days to go',
    weekToggleHint: 'Tap to switch between amenorrhea weeks and pregnancy weeks.',
    weekBulleLabel: 'Illustration: {{week}} weeks of gestation.',
    focusTitle: 'To do now',
    done: 'Done',
    later: 'Later',
    upcoming: 'Coming up',
    addEventRow: 'Add an appointment',
    eventToday: 'Today at {{time}}',
    eventTomorrow: 'Tomorrow at {{time}}',
    eventInDays: 'In {{count}} days',
    noEvents: 'No appointments coming up.',
    partnerDid: 'Your co-parent ticked “{{title}}”',
    partnerDismissed: 'Your co-parent set aside “{{title}}”',
    thisWeek: 'This week',
    together: 'Together',
    memoryPrompt: 'Anything worth keeping from this week?',
    memoryPromptAction: 'Write something',
    calm: 'All is quiet this week.',
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
    behindYou: 'Behind you',
    ahead: 'Still ahead',
    quietWeek: 'Nothing marked this week.',
    quietWeekAhead: 'Nothing planned this week.',
    previousWeek: 'Earlier',
    nextWeek: 'Later',
    backToNow: 'Back to now',
  },

  plan: {
    title: 'Prepare',
    intro: 'Each project moves at its own pace.',
    projects: 'Projects',
    addProject: 'Add a project',
    templates: 'Suggestions',
    allTemplates: 'Later',
    showLater: 'Show',
    hideLater: 'Hide',
    ideas_one: '+{{count}} idea',
    ideas_other: '+{{count}} ideas',
    progress: '{{resolved}} of {{total}}',
    noEssentials: 'No essentials here yet.',
    empty: 'Nothing to prepare yet. Add a project when you feel like it.',
    tasksEmpty: 'Nothing here yet. Add a task when you feel like it.',
    windowLabel: 'Weeks {{start}} to {{end}}',
    effort: {
      S: '~20 min',
      M: '~1 hr',
      L: 'A proper session',
    },
    dismiss: 'Not for us',
    undismiss: 'Put back on the list',
    lingering: 'Still on your list',
    suggestTemplate: 'Bulle suggests: {{title}}',
    premiumTemplate: 'With Complète',
    tasks: 'Tasks',
    addTask: 'Add a task',
    newTaskTitle: 'A task of your own',
    taskLabel: 'What is it?',
    taskPlaceholder: 'Buy a breast pump',
    taskHint: 'Your own tasks stay optional. They never count against you.',
    targetLabel: 'How many?',
    targetPlaceholder: '6',
    targetHint: 'Leave empty for a plain checkbox. With a number, the task counts up and finishes when you get there.',
    effortQuestion: 'How much of a job?',
    whenQuestion: 'When?',
    when: {
      thisWeek: 'This week',
      soon: 'In the next few weeks',
      beforeBirth: 'Before the baby arrives',
    },
  },

  dueDate: {
    editTitle: 'Correct the date',
    editLead:
      'The due date is an estimate, and the dating scan often moves it by a few days. Correct it here: your tasks follow, because they sit on weeks rather than on dates.',
    editPreview: 'You would move from week {{from}} to week {{to}}.',
    edit: 'Due date',
    editBody: 'Correct the due date if it changed.',
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
    countHint: 'Tap the count to type it in. Tap the target the same way to change how many you are aiming for.',
    checklistProgress: '{{done}} of {{total}}',
    choiceQuestion: 'Your choice',
    choiceMade: 'The other routes moved to "not for us". Change your mind whenever you like and they come back.',
  },

  memories: {
    title: 'Memories',
    intro: 'What you want to keep from these months.',
    placeholder: 'The moments you want to keep will appear here.',
    addFull: 'Add a memory',
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
    when: 'When?',
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
    sections: {
      pregnancy: 'The pregnancy',
      family: 'Your people',
      app: 'The app',
      country: 'Country',
      bulles: 'Your bulles',
      account: 'Bulle Complète',
      quiet: 'Quieter',
    },
    title: 'Settings',
    family: 'Family',
    invite: 'Invite',
    inviteBody: 'Share this link with your co-parent. They join your bubble, with no account.',
    inviteFailed: 'Sharing could not start. Try again in a moment.',
    inviteLocalOnly: 'This bulle is local, there is nothing to share yet.',
    inviteUnavailable: 'Sharing is not available right now.',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    language: 'Language',
    languageFr: 'Français',
    languageEn: 'English',
    languageCurrent: 'Selected',
    countryFr: 'France',
    countryBe: 'Belgium',
    countryCh: 'Switzerland',
    countryCa: 'Canada',
    notifications: 'A morning check-in',
    notificationsBody: 'One a day, never more. Nothing in the evening.',
    digestTitle: 'Bulle',
    digestBody: 'One thing today, if you feel like it.',
    bulleActive: 'Active bubble',
    withAccess: 'Who has access',
    noMembers: 'Nobody yet. Share a link to add your co-parent.',
    revoke: 'Remove access',
    revokeConfirm: 'Remove access for this person? They keep what they have already seen, and receive nothing new.',
    revokeDone: 'Access removed.',
    revokePartial: 'Access removed on the server. Their existing copy may still open until they reconnect.',
    aboutBody: 'Bulle helps you get organised, not treated.',
    premium: 'Bulle Complète',
    premiumBody: 'Every template and the full French paperwork. Once, for the whole pregnancy.',
    premiumActive: 'Bulle Complète',
    premiumActiveBody: 'Unlocked. Thank you.',
    restore: 'Restore a purchase',
    restoreBody: 'Already paid, on another device or before a reinstall.',
    restoreDone: 'Your purchase is back.',
    restoreEmpty: 'Nothing to restore.',
    countryCurrent: 'Selected',
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
    change: 'Change',
    delete: 'Delete appointment',
    newTitle: 'An appointment',
    kindQuestion: 'What kind?',
    kindCurrent: 'Selected',
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
      tagline: 'One thread, from the first weeks to the day itself.',
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
    price: '€4.99 · once, for the whole pregnancy',
    priceOnce: '{{price}} · once, for the whole pregnancy',
    cta: 'Unlock Bulle Complète',
    promoCode: 'Redeem a promo code',
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
      metaTitle: 'Prepare for your baby, together and calmly | Bulle',
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
      metaTitle: 'Journal, preparing for your baby | Bulle',
      metaDescription:
        'Paperwork, hospital bag, what is worth buying, and privacy. Short, honest articles to help you prepare for your baby, calmly and without the noise.',
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
        metaTitle: 'Paul, founder of Bulle and author of the Journal',
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
        metaTitle: 'Camille, midwife who reviews Bulle’s content',
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
      metaTitle: 'Privacy and your health data | Bulle',
      metaDescription:
        'What Bulle knows about you: nothing. No account, no ads, everything end-to-end encrypted. Our privacy policy, written to be read, in plain English.',
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
      metaTitle: 'Terms of use and refunds | Bulle',
      metaDescription:
        'Bulle’s terms of use, in plain English: what the app does, your recovery phrase, and how the one-time purchase and refunds work.',
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

  /**
   * See fr.ts for the full note. This is the country-agnostic subset of the FR pool — no
   * France-specific administrative/benefits mechanics (CAF, PAJE, carte Vitale, congé
   * paternité), same reasoning as `templates.adminFr` being absent from EN entirely (§7.1).
   * Shorter than FR by design, not by omission.
   */
  advice: {
    eyebrow: 'Did you know?',
    items: [
      // Buying and gear
      'Room-sharing, baby nearby in their own bed, is recommended for the first six months. That is not the same as bed-sharing.',
      'A bedside crib is only meant to last a few months. Once a baby can sit up alone or reaches the printed weight limit, it is no longer a suitable space.',
      'The real test for a pushchair happens in the shop: fold it yourself, one-handed, with the other hand full, exactly as it will be in real life.',
      'A pushchair promising to do everything from birth to preschool mostly adds weight and parts that are never used.',
      'A low-speed impact can leave invisible micro-fractures in a car seat that only surface at the next crash.',
      'Car seats have a printed lifespan. Past it, the shell loses its impact absorption even without ever being in a crash.',
      'A second-hand item is not always covered by official recalls. An empty search result does not guarantee anything on its own.',
      'A baby registry mainly saves other people from guessing what you already have or do not need.',
      'Suggesting a group gift for one expensive item avoids both the awkwardness of asking and the risk of ending up with two pushchairs.',
      'Two or three packs of newborn-size nappies are enough before the birth. Many babies move up a size before finishing them.',
      'Newborn size usually lasts two to three weeks. It is the next size up that most often runs short in the drawer.',
      'The most useful size to give as a gift is not newborn but one size up, matched to the season the baby will actually meet.',
      'Frozen meals in labelled, single portions are still the gift new parents mention a year later.',
      'Only three things really shift with the season of birth: the ratio of short to long sleeves, the sleep sack’s warmth rating, and the pramsuit.',
      'A sleep sack’s warmth rating should match the room’s temperature, not the month on the calendar.',
      'The first question for your maternity unit is not how much to pack, but what they already provide.',
      'The co-parent’s own bag deserves its own planning: something to eat and a charger, since vending machines often run empty in the middle of the night.',
      'Every clothing size lasts a different length of time. Three-month size is the one that surprises most people by how quickly it passes.',
      'A registry with no quantities is not really a list, it is a theme twenty guests will each interpret differently.',

      // Money
      'No law requires an employer to keep paying full salary during birth-related leave. Where it happens, it comes from a collective agreement, never automatically.',

      // Together
      'Pregnancy’s mental load rarely lands on one person for lack of goodwill. It is because the paperwork and appointments arrive addressed to them.',
      'Moving the task list out of one person’s head and into something both of you can check changes more than a conversation about goodwill ever will.',
      'Owning a whole subject, rather than picking up one-off tasks, is what actually lifts the load. A delegated task still needs someone to check it got done.',
      'Owning an appointment, not just attending it, means knowing it exists, tracking it, and following up if the confirmation does not arrive.',
      'Three tasks genuinely owned outright beat ten that both of you half-track.',
      'A very young child’s sense of time is too different for an early announcement to mean much. Waiting until it is visible is often enough.',
      'A temporary regression in an older sibling, sleep or toilet training, after a birth is common and usually fades on its own within a few weeks.',
      'The first name, childcare, and who takes which leave each carry a deadline set by the world around you. Not deciding just lets the calendar decide instead.',
      'The real test of a shared load: if only one of you can say what is left to do this week, it is not actually shared.',

      // Layette
      'About twelve bodysuits in total, roughly five newborn and seven in the next size, covers most of what the first month actually needs.',
      'A layette quantity means nothing without its assumption. Most are based on washing every three or four days, so halve the count if you wash daily.',

      // Day-of logistics
      'Nobody makes good decisions at three in the morning. A good plan for the day itself leaves as little as possible to decide in the moment.',
      'The plan for the day itself needs a backup driver, not just a first choice, in case the one you had in mind is not available.',
      'Keeping the document folder and your maternity unit’s number reachable somewhere other than the packed bag covers the case where things start away from home.',
      'Many car seats are fitted or used incorrectly, and a single mistake can sharply reduce the protection they offer.',
      'A car seat harness needs readjusting every time bulky clothing changes, especially in winter.',
      'For renovations or a move during pregnancy, it helps to count backward from the due date rather than from today, with real margin built in.',
      'The goal of the last two weeks is not finishing everything. It is having nothing left that still needs finishing.',

      // Preparation
      'What people search for in a panic on the day is never the clothes, it is the paperwork kept separately.',
      'A simple way to sort a preparation list: anything with a safety or administrative consequence goes first, the rest can be bought in an afternoon.',
      'The first few weeks genuinely need around ten essential items. The rest of a forty-item list is largely optional.',
      'The i-Size safety standard requires a rear-facing seat until at least fifteen months, and keeping it longer is advised for as long as the seat allows.',
      'An app that says "encrypted" can still mean the company itself holds the key. The real question is who holds it, not whether the data is encrypted.',

      // Coming home
      'Cooking and freezing a few meals before the birth removes a daily chore right when energy is scarcest.',
      'Telling planned help apart from a courtesy visit, before the birth, makes it easier to say clearly what actually helps.',
      'A refusal line prepared together in advance can be said without justification or apology when the moment comes.',
      'Setting a default visit length in advance beats improvising a refusal with someone already at the door.',
    ],
  },

  templates: {
    fratrie: {
      title: 'The sibling',
      description: 'Getting your older child ready, and the arrangements they change.',
      tasks: {
        annonce: 'Tell your older child about the pregnancy',
        annonceNote: 'After the first trimester, and before they hear it somewhere else.',
        annonceDetails: [
          'The usual guidance is to wait until the end of the first trimester, then not to leave it too long: a child who hears it from someone else takes it badly, and adult conversations get picked up very early.',
          'Time is a vague idea before five or six. A concrete marker helps more than a date: "the baby comes when it is warm outside", "after your birthday".',
          'Mixed feelings are normal and not a problem to solve: excitement, impatience, worry, jealousy, sometimes all at once.',
        ],
        gardeAine: 'Arrange care for your older child on the day',
        gardeAineNote: 'With a backup. The date is the one thing you do not choose.',
        gardeAineDetails: [
          'This is the most concrete task in the project and the easiest to put off. Labour can start at night, on a Sunday, or during the school holidays of the person you were counting on.',
          'Line up two options rather than one, and tell both. One person who is available "in principle" is not a plan.',
          'Pack a small bag of their things ready to go, so nobody has to do it in a hurry at three in the morning.',
        ],
        changements: 'Move any bedroom or bed changes well ahead',
        changementsNote: 'Months before, never at the baby’s arrival.',
        changementsDetails: [
          'If your older child needs to change bed, change room, or move out of the cot the baby will need, do it months in advance.',
          'Done right at the birth, the same change becomes something the baby took from them. Done long before, it is simply that they grew up.',
          'The same goes for starting nursery or school and for potty training: well before or well after, not alongside.',
        ],
        boite: 'Put together a box for while you are away',
        boiteNote: 'For the days you are at the hospital.',
        boiteDetails: [
          'A few days apart is often the hardest part for a young child. A small box prepared in advance and handed over on the day helps them through it.',
          'It can stay with whoever is looking after them, and be opened a little each day.',
        ],
        boiteChecklist: [
          'A family photo',
          'A note or a drawing from you',
          'A scarf that smells of you',
          'A small present to open on the day the baby is born',
          'Something to bring to the baby at the hospital',
        ],
        visites: 'Decide how the first meeting will go',
        visitesNote: 'The first moment as three, or as four.',
        visitesDetails: [
          'Many families arrange for the baby not to be in a parent’s arms when the older child walks in, so the first arms that greet them are yours.',
          'Brief the visitors too: an older child needs to be spoken to as much as the baby is, and a whole visit devoted to the newborn gets noticed at three years old.',
          'Do not give your older child responsibilities for the baby. They can help if they ask, never because they were assigned it.',
        ],
      },
    },

    layette: {
      title: 'The layette',
      description: 'How many of each. Guides, not rules.',
      tasks: {
        bodies: 'Bodysuits, newborn and 1 month',
        bodiesNote: 'Roughly 5 in newborn and 7 in 1 month. Babies leave newborn size fast.',
        bodiesDetails: [
          'A dozen in total, split between short and long sleeves depending on the season. That number assumes a wash every three or four days: if you run a load daily, six is plenty.',
          'Buy few in newborn size and more in 1 month. A full-term baby often outgrows newborn in two or three weeks, and unworn newborn clothes are the most common regret on any baby list.',
          'Envelope necks and front-crossing styles go on without passing over the head, which makes a real difference in the first days.',
        ],
        pyjamas: 'Sleepsuits',
        pyjamasNote: 'The main garment of the first weeks, day and night.',
        pyjamasDetails: [
          'About ten, again split between newborn and 1 month. Posseting and nappy leaks mean changes two or three times a day for many babies.',
          'In winter, aim for the top of the range: drying takes longer, and a damp sleepsuit is no use to anyone.',
          'Full-length zips or poppers can be changed one-handed at night without fully waking the baby. Buttons down the back are worth avoiding.',
        ],
        gigoteuses: 'Sleep sacks',
        gigoteusesNote: 'They replace sheets, blankets and duvets, none of which belong in the cot.',
        gigoteusesDetails: [
          'Two at minimum, three if you would rather never chase the laundry: one on the baby, one in the wash, one clean in the cupboard.',
          'Pick the TOG for the room temperature, ideally between 18 and 20 °C. A high TOG in a heated room does more harm than good.',
          'Size matters as much as warmth: the neck opening must be narrow enough that the baby cannot slip down inside.',
        ],
        gilets: 'Cardigans',
        giletsDetails: [
          'Three is enough for a spring or summer birth, a little more for a baby arriving in midwinter.',
          'They mostly serve as a middle layer for going out and for cooler rooms. Indoors, a bodysuit and a sleepsuit are usually plenty.',
          'Styles that button at the front are far easier to manage than anything that goes over the head.',
        ],
        chaussettes: 'Socks and booties',
        chaussettesDetails: [
          'About five pairs. They disappear with remarkable consistency, usually into the pram or the car seat.',
          'A baby’s feet are naturally cooler than the rest of them, which on its own is not a sign of being cold. The back of the neck tells you far more.',
          'Many sleepsuits already cover the feet, which cuts the need considerably.',
        ],
        bonnets: 'Hats',
        bonnetsDetails: [
          'Two is enough whatever the season. A newborn loses a lot of heat through the head in the very first days, including in summer on the way home.',
          'At home the hat is not needed once those first days have passed: it is for outdoors, not for a heated room.',
          'It comes off for sleep, like anything else that could slide over the face.',
        ],
        bavoirs: 'Bibs',
        bavoirsDetails: [
          'Eight is a comfortable number. They save a full change of clothes at every posset, which for many babies happens several times a day.',
          'Small, soft towelling bibs suit the early weeks far better than the stiff wide ones meant for starting solids.',
          'If your baby brings up a lot of milk, go to ten without hesitating. This is the item you run out of first.',
        ],
        couches: 'Size 1 nappies',
        couchesNote: 'Two or three packs before the birth. No more: the size changes quickly.',
        couchesDetails: [
          'A newborn goes through eight to twelve nappies a day, around 280 across the first month. The pace eases noticeably after a few weeks.',
          'Resist stockpiling a single size. Many babies move up to size 2 before finishing the size 1 packs, and a nappy that is too small leaks.',
          'If you are undecided on a brand, buy one pack of several rather than a case of one: sizes and cuts vary a lot between makers.',
        ],
        langes: 'Muslin squares',
        langesNote: 'The most useful thing in the whole layette.',
        langesDetails: [
          'Six at minimum. They work as a shoulder cloth for winding, a spare sheet, shade over the pram, an improvised changing mat.',
          'Mix the sizes: small ones, around 60 by 60 centimetres, for everyday use, plus a few large ones for swaddling or the pram.',
          'Plain cotton gets softer and more absorbent after a few washes. This is not a category where paying more changes anything.',
        ],
        toilette: 'Washcloths',
        toiletteDetails: [
          'Four or five kept for the baby, separate from the household ones. They serve for the bath and for a quick wash between baths.',
          'A full bath every two or three days is plenty at the start. The rest of the time, a cloth and warm water do the job.',
          'Have enough that you never reuse a damp one. That is the only real reason to own several.',
        ],
        capes: 'Hooded towels',
        capesDetails: [
          'Two is enough, around 75 by 75 centimetres. While one dries, the other is ready.',
          'The hood matters more than the fabric: it covers the head straight out of the water, which is when a baby cools fastest.',
          'A large ordinary bath towel does the job perfectly if you already have one. This is not a required purchase.',
        ],
        biberons: 'Bottles and teats',
        biberonsNote: 'Six if the baby is bottle-fed, one or two alongside breastfeeding.',
        biberonsDetails: [
          'For bottle feeding, count on about six: three small ones of 125 to 180 millilitres for the early weeks, three larger ones of 240 to 260 millilitres after that.',
          'If you plan to breastfeed, one or two bottles cover the occasional handover. There is no need to equip a whole kitchen before you know how things settle.',
          'Add slow-flow teats, one per bottle plus two or three spares, and a bottle brush. A breast pump is usually rented rather than bought, so it is not a purchase to plan for here.',
        ],
        tetines: 'Spare teats',
        tetinesNote: 'Slow flow to start. One per bottle, plus a few in reserve.',
        tetinesDetails: [
          'Three spare slow-flow teats on top of the ones that come with the bottles. They wear out, they get lost, and they are replaced roughly every three months.',
          'Slow flow is what the first weeks need. Too fast a flow makes the baby drink quicker than they can comfortably swallow.',
          'Add a bottle brush too, one large and one small: that is what lets you scrub the inside of the bottle and the teat properly, and it is the hygiene step that actually matters.',
        ],
        coussinets: 'Breast pads',
        coussinetsNote: 'If you are breastfeeding. Six washable pairs, or disposables if you prefer.',
        coussinetsDetails: [
          'Six washable pairs cover a rotation comfortably on a wash every three or four days. With disposables, count on four to ten a day in the early weeks.',
          'The need peaks when your milk comes in, then drops noticeably once feeding is established.',
          'If you are not breastfeeding, or do not yet know, skip this line without a second thought. Nothing here is compulsory.',
        ],
        moufles: 'Scratch mittens',
        mouflesDetails: [
          'Two pairs is enough. A newborn’s nails grow fast and they scratch their own face without meaning to in the first weeks.',
          'Plenty of families simply use thin socks instead, or sleepsuits with fold-over cuffs. If you already have those, this line is already filled.',
        ],
        drapsHousse: 'Fitted sheets',
        drapsHousseNote: 'Cut to the exact mattress size, with no slack and no rucking.',
        drapsHousseDetails: [
          'Four for a 60 by 120 centimetre cot. Possets and night-time leaks mean changing them far more often than an adult sheet.',
          'The sheet must fit the mattress exactly. One that comes loose in the night is a risk, not a comfort detail.',
          'If you use a crib or Moses basket for the first months, add three sheets in its size on top of the cot ones.',
        ],
        aleses: 'Mattress protectors',
        alesesDetails: [
          'Two lets you remake the bed in the middle of the night without waiting on a wash.',
          'Choose one that stretches taut over the mattress rather than a loose pad: nothing should be able to lift or ruck up under the baby.',
          'If the mattress already has a removable washable cover, one protector is enough, or none at all.',
        ],
        bodies3mois: 'Bodysuits, 3 month size',
        bodies3moisNote: 'To count, not to buy. It is the size you receive most as gifts.',
        bodies3moisDetails: [
          'The 3 month size is the one a baby wears longest before six months, six to eight weeks for many, and it is also the one you will be given most of.',
          'Nine bodysuits is a comfortable figure for this size. Count what arrives here: gifts, second-hand, borrowed clothes. There is nothing to buy now.',
          'If you are close to the birth and this line is still at zero, that is not a problem. You will have plenty of time to fill it once you know how fast your baby is growing.',
        ],
        pyjamas3mois: 'Sleepsuits, 3 month size',
        pyjamas3moisDetails: [
          'Seven sleepsuits covers the 3 month size comfortably, on the same wash-every-three-or-four-days assumption as the rest of this project.',
          'As with the bodysuits, this line is for counting what you receive, not for triggering a purchase. The real need is still several weeks away.',
        ],
        gigoteuseSaison: 'Sleep sacks for the next season',
        gigoteuseSaisonNote: 'TOG is chosen for the room temperature, not for the month.',
        gigoteuseSaisonDetails: [
          'Your baby will change season before they change cot. A sleep sack bought for January will not suit April, and two sizes up will eventually cross a change in temperature.',
          'The guide is room temperature, ideally between 18 and 20 degrees: TOG 2 in that range, TOG 1 above 21 degrees, TOG 3 below 18. When in doubt, feel the back of the baby’s neck rather than their feet.',
          'Two covers the transition. Again, there is no rush: this is a line to fill when the time comes.',
        ],
        couchage: 'Set the cot up for safe sleep',
        couchageNote: 'A firm mattress, a sleep sack, and nothing else in the cot.',
        couchageDetails: [
          'The baby sleeps on their back, on a firm flat mattress cut to the exact size of the cot. No gap should remain between the mattress and the bars.',
          'No blanket, duvet, pillow, cot bumper or soft toy until age two. The sleep sack replaces all of it, which is precisely what it is for.',
          'Plenty of shop baby lists still offer cot bumpers and full bedding sets. This is not a matter of taste, and it is the one line in this project that is not up for negotiation.',
        ],
      },
    },

    achats: {
      title: 'The essentials',
      description: 'What actually gets used. The rest can wait.',
      tasks: {
        siegeAuto: 'Choose and buy the car seat',
        siegeAutoNote: 'i-Size (R129). Required from the moment you leave hospital. Never second-hand without its history.',
        siegeAutoDetails: [
          'Choose a seat approved to R129 (i-Size), matched to the baby’s current weight and height rather than their age: age brackets are only a rough guide.',
          'Keep the seat rear-facing for as long as possible: it is the most protective position in the early months, well beyond what regulation alone requires.',
          'Buy it new, or with a full and known history if not: a car seat that has been in a crash, even one with no visible damage, loses some of its protection.',
        ],
        installer: 'Fit the car seat and try it empty',
        installerNote: 'At home, calmly, not in the hospital car park. A great seat fitted badly protects less than a decent seat fitted well.',
        installerDetails: [
          'Fit the seat as soon as you buy it, at home and without rushing, following the manufacturer’s instructions step by step: recline angle and belt routing differ between models.',
          'An expensive seat fitted badly protects less than a simple one fitted correctly: price never makes up for a fitting mistake.',
          'Do a second empty-seat trial a few weeks before the due date, to check nothing has shifted and the steps are still clear when the time comes.',
        ],
        liste: 'Open the registry',
        listeNote: 'After the anomaly scan. Opening early avoids duplicates.',
        listeDetails: [
          'Open the registry after the anomaly scan, once the main equipment categories are decided: this avoids changing it repeatedly in the weeks that follow.',
          'Sort items by priority rather than by price: what gets used daily, sleeping, changing, carrying, before what is nice to have but secondary.',
          'Share it early with people close to you: opened a few weeks ahead, it avoids duplicates and gives everyone time to organise.',
        ],
        poussette: 'Choose the pushchair',
        poussetteNote: 'Test the fold, measure your boot and your lift before buying. Four questions beat forty reviews.',
        poussetteDetails: [
          'Before comparing models, answer four practical questions: city or all-terrain use, the size of your car boot, whether you have a lift, and how many children you will eventually carry.',
          'Test the fold in-store with one hand, as will often be the case in practice, and check the folded weight if you will carry it up stairs.',
          'Measure your boot and your lift space before buying rather than after: it is the most common reason a pushchair ends up barely used.',
        ],
        occasion: 'Check second-hand before accepting it',
        occasionNote: 'Search the product name plus the word recall. Thirty seconds. Never a car seat, never a dipped mattress.',
        occasionDetails: [
          'Before accepting a second-hand item, search the model name together with the word recall: thirty seconds is enough to rule out a product under a safety notice.',
          'Always rule out a second-hand car seat with no known history, and any mattress that is dipped or misshapen: these are the two categories where wear does not always show.',
          'For everything else, clothes, toys, simple furniture, second-hand is a good option: just check the general condition and that no pieces are broken or missing.',
        ],
        tailleNaissance: 'Go easy on newborn-size clothes',
        tailleNaissanceNote: 'Three to five newborn bodysuits, the rest in 1 month. The most common buying regret.',
        tailleNaissanceDetails: [
          'Limit yourself to three to five newborn-size bodysuits and sleepsuits: many babies outgrow this size within a few weeks, sometimes before wearing all of it.',
          'Buy the rest of the wardrobe in 1 month size, closer to the size most full-term babies actually are on leaving hospital.',
          'Keep the tags and original packaging on anything you do not open right away, so it is easy to exchange if the size turns out wrong.',
        ],
        trousse: 'Put together the care kit',
        trousseChecklist: [
          'Saline solution in single doses',
          'Thermometer',
          'Nasal aspirator',
          'Sterile compresses',
          'Cleansing liniment',
          'Baby nail scissors or clippers',
          'Soft hairbrush',
        ],
        trousseNote: 'Saline, thermometer, nasal aspirator, compresses. Before, not on the evening you get home.',
        trousseDetails: [
          'Put together a simple kit before the birth: saline solution for the nose and eyes, a thermometer, a nasal aspirator, and sterile compresses cover the first days.',
          'Keep it in one fixed spot known to every adult in the home, rather than in the hospital bag, which leaves and comes back.',
          'Add to it later as real needs come up rather than stocking up in advance: buying something specific when the need appears beats a stockpile that goes unused.',
        ],
      },
    },
    valise: {
      title: 'Hospital bag',
      description: 'Ready well before the day.',
      tasks: {
        maman: 'Pack the birthing parent’s bag',
        mamanChecklist: [
          'Nightdresses or front-opening pyjamas',
          'Nursing bras',
          'Disposable briefs',
          'Dressing gown and non-slip slippers',
          'Toiletry bag',
          'Phone charger with a long cable',
          'Comfortable going-home outfit',
        ],
        mamanDetails: [
          'Pack loose, comfortable clothing for arriving at the hospital and for the first days afterward. Something that opens at the front helps if you plan to breastfeed.',
          'Add a wash bag, enough underwear for a few days, a phone charger with a long cable, and glasses if you do not wear contact lenses every day.',
          'Have this bag finished by week 37: babies can arrive before the due date. Keep it by the door, ready to grab at any hour.',
        ],
        bebe: 'Pack the baby’s bag',
        bebeChecklist: [
          'Bodysuits in newborn and 1 month',
          'Sleepsuits',
          'Cardigan',
          'Hat and socks',
          'Bibs and muslins',
          'Sleep sack',
          'Going-home outfit for the season',
        ],
        bebeDetails: [
          'Pack newborn and 1 month sized bodysuits and sleepsuits, a blanket or a sleeping bag, a couple of bibs, and a pair of socks. Hospitals usually provide nappies and basic toiletries.',
          'Add a going-home outfit suited to the season, warmer or lighter depending on the time of year, plus a hat for the first days.',
          'Finish this bag by week 37 as well, and keep it next to the other one: an unplanned early departure leaves no time to pack.',
        ],
        coparent: 'Pack the co-parent’s bag',
        coparentDetails: [
          'Pack a full change of clothes, toiletries, and something to pass the waiting hours: a book, a phone charger, and snacks.',
          'Add a pillow and a light blanket if you plan to stay overnight: most maternity wards offer little more than a chair, and comfort matters over several days.',
          'Pack this bag alongside the other two rather than leaving it for later, so nobody is improvising while attention is elsewhere.',
        ],
        documents: 'Gather the documents for the hospital',
        documentsChecklist: [
          'Health insurance card and entitlement certificate',
          'Top-up insurance card',
          'Blood group card',
          'Pregnancy notes and test results',
          'Photo ID',
          'Family record book or pre-birth acknowledgement',
        ],
        documentsNote: 'Insurance details, blood group, maternity notes.',
        documentsDetails: [
          'Gather identification, proof of health cover, and any notes your care team has given you: this file summarises appointments and useful information for the hospital.',
          'Add recent scan results and test results if you have them, along with a note of your blood group if known, so nothing has to be redone on arrival.',
          'Keep everything in one folder with the bag rather than in a separate drawer: at the moment of leaving, one motion should be enough to grab it all.',
        ],
        siegeAuto: 'Fit the car seat and try it',
        siegeAutoNote: 'i-Size R129. Try it once empty.',
        siegeAutoDetails: [
          'Fit the car seat in your car several weeks before the due date, following the manufacturer’s instructions closely: the recline angle and anchor points differ between models.',
          'Have it checked once by someone trained if you are unsure: a slightly wrong fit meaningfully reduces the protection it offers in a crash.',
          'Try it once empty, with the door closed, to get familiar with the buckles and adjustments before the day: working it out with a crying newborn is never the right moment.',
        ],
        trajet: 'Check the route to the hospital',
        trajetDetails: [
          'Check the most direct route to the chosen hospital, both by day and by night, and note a backup route in case of roadworks or a closed road.',
          'Find out where the maternity entrance actually is, which is often different from the main entrance, and check nearby parking options.',
          'Do a practice run with whoever will drive you on the day, so they know the way too without having to work it out under pressure.',
        ],
      },
    },
    nid: {
      title: 'The nest',
      description: 'The baby’s corner, without rushing.',
      tasks: {
        emplacement: 'Choose where the baby’s corner goes',
        emplacementDetails: [
          'Choose a quiet spot away from draughts and busy walkways, with enough room around the cot to move freely during night changes and feeds.',
          'Check there is a power socket nearby for a night light or a monitor, without the cable running across the space where the baby sleeps.',
          'If the baby will sleep in your room for the first months, as is recommended, plan a separate corner for storage and changing rather than a whole nursery.',
        ],
        lit: 'Choose and order the cot',
        litNote: 'EN 716. A firm mattress, the right size.',
        litDetails: [
          'Choose a cot that meets EN 716, with a firm, flat mattress that fits the cot exactly and a fitted sheet pulled tight over it.',
          'Avoid an extra mattress, a wedge, a bumper, a pillow, a duvet, or soft toys inside the cot: these are the items most often named in safe sleep guidance.',
          'Order it early enough to have it set up by week 36: delivery times on this kind of equipment can run several weeks.',
        ],
        installerLit: 'Assemble the cot',
        installerLitDetails: [
          'Assemble the cot in the chosen spot and check that no blind cord, cable, or hanging object is within reach once the baby can pull up to standing.',
          'Set the base at its highest position for the first months, while the baby cannot roll over unassisted, then lower it gradually as they grow.',
          'Test the cot’s stability once built: no play in the slats, no missing screw, before placing the mattress. Go back to the instructions if a step feels unclear.',
        ],
        laverVetements: 'Wash and put away the first clothes',
        laverVetementsNote: 'Six to eight newborn bodysuits is plenty.',
        laverVetementsDetails: [
          'Wash new clothes before first use, with a gentle, unscented detergent and no fabric softener, to remove manufacturing residue that can irritate newborn skin.',
          'Only wash what will be used in the first weeks: six to eight newborn bodysuits and sleepsuits is plenty, the rest can wait unopened.',
          'Store them sorted by size rather than by type, so you can quickly find what still fits as the baby grows faster than expected.',
        ],
        change: 'Set up a changing spot',
        changeDetails: [
          'Set up a changing table or a simple mat at a comfortable height, with everything within reach: nappies, wipes or cotton pads, and a spare outfit.',
          'Consider a second changing spot on another floor or in the main living area if your home has several levels, to avoid unnecessary trips at night.',
          'Keep one hand on the baby at all times once they start moving: no changing table has an edge high enough to prevent a fall.',
        ],
        securite: 'Check the home for safety',
        securiteDetails: [
          'Note the electrical sockets, blind or curtain cords, and unstable furniture near the baby’s future corner, and plan how you will secure them before the birth.',
          'Check nothing can fall into or onto the cot, such as a shelf, a frame, or a light fitting, and that the room’s window closes properly.',
          'This is enough for now: most active childproofing, like socket covers and stair gates, only becomes useful once the baby starts moving around, several months later.',
        ],
      },
    },
  },
};
