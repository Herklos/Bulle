# Store SEO: App Store & Google Play ASO

Source of truth for **Bulle**'s store-listing optimization on the **Apple App Store** and **Google Play** (`software.drakkar.bulle.app`). Kept out of `CLAUDE.md` so that file stays focused on codebase guidance. Bulle ships FR-primary (France storefront) with English as the second market.

Three parts: the **App Store** rules + optimized copy, the **Google Play** equivalents (different mechanics: Play indexes the full description, has no keyword field, normalizes accents), and the cross-store **growth / creative / discovery** levers. Keep in sync whenever features or store copy change. Marketing wording lives in `apps/mobile/i18n/{fr,en}.ts`; `app.json`'s `description` is the web/PWA description, **not** the store one (store fields are managed per-localization in App Store Connect / Play Console).

**Verification caveat (applies throughout):** the indexing rules below are anchored to Apple's and Google's documentation plus ASO-practitioner consensus. Competitor titles/subtitles and volume estimates **could not be byte-verified** from the build environment. Confirm via an ASO tool (AppTweak / Sensor Tower / Mobile Action) or a device on the target storefront before acting on them.

---

## Positioning: the decision that constrains every keyword below

Bulle is **not a pregnancy tracker**, and the ASO must not pretend otherwise.

`grossesse` / `pregnancy` is by far the highest-volume keyword in this category. **We deliberately do not fight for it.** Reasons, in order of importance:

1. **It brings the wrong users.** Someone searching "grossesse" wants week-by-week baby size, symptom logging, a kick counter. Those are Bulle's explicit anti-goals (spec §1.2, §7.3). They install, find no fruit comparison, and leave a 2★ review. Bad keywords do not just fail, they actively cost you.
2. **The incumbents own it with content we cannot match.** Grossesse+ / Flo / BabyCenter have 3D fetal rendering and decade-old corpora. The French government's *1000 premiers jours* is free, ad-free and medically validated. Competing on medical content is a losing battle by design.
3. **The whitespace nobody owns is "the couple's private preparation HQ":** administrative sequencing, preparing as two, and privacy. That is what we rank for.

**Own:** `administratif`, `démarches`, `CAF`, `congé maternité`, `valise maternité`, `checklist naissance`, `à deux` / `co-parent`, `sans compte`, `hors ligne`, `privé`.
**Avoid:** `grossesse` as a head term, `suivi`, `symptômes`, `contractions`, `courbe de poids`, `liste de naissance` as a marketplace play (Mistricotine/Amazon own the transactional intent).
**Table stakes** (have them, they do not differentiate): `checklist`, `liste`, `organisation`, `bébé`.

---

## App Store Optimization (ASO)

### How Apple indexes metadata (the rules that constrain everything below)

| Field | Limit | Indexed for search? | Weight |
|-------|-------|---------------------|--------|
| App Name / Title | **30** | ✅ yes | highest |
| Subtitle | **30** | ✅ yes | 2nd |
| Keywords field (hidden) | **100** | ✅ yes | 3rd |
| Promotional Text | **170** | ❌ no | Editable without app review |
| Description | **4000** | ❌ **no** | Conversion only |

Load-bearing facts:

- **The Description is NOT in Apple's classic keyword index** (unlike Play, which fully indexes it). Its job is conversion: only the first ~3 lines show before "more", so that hook is the highest-leverage copy on the page. Caveat (WWDC25): the description and screenshots now feed Apple's **AI-generated App Store Tags** and semantic search, so it has *indirect* discovery value. Write it for humans anyway; keyword-stuffing will not rank it the way a Play description does.
- **Ranking weight is Title > Subtitle > Keywords.** This ordering is practitioner consensus from testing, **not** Apple-published. Apple confirms only that all three are indexed for text relevance.
- **Apple combines individual words across Title + Subtitle + Keywords _within one localization_** to form phrases (`valise` in subtitle + `maternite` in keywords → ranks for "valise maternité"). Spread the component words; never write whole phrases redundantly.
- **Never duplicate a word** across Name/Subtitle/Keywords in one locale. Apple indexes each once; repeats waste your 160 indexable chars.
- **Keywords syntax:** comma-separated, **no space after commas**, **singular by default** (Apple stems plurals). Special characters (`-`, `@`) act as separators. **Never** include: the brand name, the category name, or `app`/`gratuit`/`free`/stop-words. All are free or ignored.
- **Words combine only WITHIN a locale, never across locales.** Every localization must carry complete, self-sufficient phrases.
- **Accents (FR), Apple only:** accented ≠ unaccented at indexing (`congé` and `conge` are different tokens), and mobile users typically type unaccented. Tactic: **accented in the visible Title/Subtitle** (credibility), **unaccented variants in the hidden Keywords field** (`conge`, `maternite`, `prive`, `administratif`). **Google Play normalizes accents — do NOT double them there.**

### Optimized metadata to ship

**🇫🇷 French (fr-FR, primary storefront locale)**

- **App Name (24/30):** `Bulle : préparation bébé`
- **Subtitle (25/30):** `Démarches, valise, à deux`
- **Keywords (91/100):** `naissance,administratif,caf,conge,maternite,checklist,liste,couple,coparent,prive,horsligne`
- **Description hook (first 3 lines, pre-"plus"):**

```
Préparez l'arrivée de votre bébé à deux, sans vous noyer. Les démarches françaises au bon moment, la valise avant le jour J, et rien d'autre pour vous encombrer. Sans compte, sans publicité, hors ligne.
```

- **Description body:**

```
Bulle est l'application de préparation pour les futurs parents qui veulent s'organiser calmement, sans céder leurs données.

✓ Administratif français : déclaration de grossesse, CPAM, CAF, congés, inscription maternité, mode de garde. Chaque démarche arrive au moment où elle compte, avec le lien officiel.
✓ Une chose à la fois : Bulle vous montre la prochaine action, pas votre retard. Pas de compteur, pas de rouge, pas de rappel culpabilisant.
✓ À deux, vraiment : les deux parents ont le même accès et la même liste. Personne n'est l'assistant de l'autre.
✓ Valise maternité : la liste courte, prête bien avant le jour J.
✓ Achats utiles : ce qui sert vraiment, et ce dont vous n'avez pas besoin. Sans lien affilié.
✓ Un point par jour maximum, le matin, si vous le voulez.

🔒 Sans compte : votre identité reste sur votre téléphone. Ce qui se synchronise avec votre co-parent est chiffré de bout en bout, avec une clé que nous n'avons pas.
📶 Hors ligne : tout fonctionne sans connexion, y compris à la maternité.
💛 Un achat unique. Pas d'abonnement, pas de publicité, pas de revente de données.

Bulle vous aide à vous organiser, pas à vous soigner. Pour toute question médicale, contactez votre sage-femme ou le 15.
```

**🇬🇧🇺🇸 English (en-US, primary for English storefronts)**

- **App Name (26/30):** `Bulle: Baby Prep, Together`
- **Subtitle (24/30):** `Checklists, hospital bag`
- **Keywords (93/100):** `newborn,pregnancy,planner,todo,list,partner,private,offline,noads,expecting,parents,organizer`
- **Description hook (first 3 lines):**

```
Prepare for your baby together, without drowning. The right thing at the right time, the bag packed before the day, and nothing else in your way. No account, no ads, works offline.
```

- **Description body:**

```
Bulle is the preparation app for expecting parents who want to get organised calmly, without handing over their data.

✓ One thing at a time: Bulle shows you the next action, not how far behind you are. No counters, no red, no guilt-trip reminders.
✓ Together, actually: both parents get the same access and the same list. Neither one is the other's assistant.
✓ Hospital bag: the short list, ready well before the day.
✓ Worth buying: what actually gets used, and what you can skip. No affiliate links.
✓ One check-in a day at most, in the morning, only if you want it.

🔒 No account: your identity stays on your phone. What syncs with your co-parent is end-to-end encrypted, with a key we do not have.
📶 Offline: everything works without a connection, including at the hospital.
💛 A single purchase. No subscription, no ads, no data selling.

Bulle helps you get organised, not treated. For any medical question, speak to your midwife or your doctor.
```

*Char counts verified against the 30/30/100 limits. Every keyword-field term is checked to **not** repeat a word already in that locale's Name or Subtitle (the fr-FR field deliberately omits `preparation`, `bebe`, `demarches`, `valise`, `deux`), and contains no brand/category/stop-words.*

Note `pregnancy` **does** appear in the EN keyword field. That is not a contradiction of the positioning above: as a low-weight long-tail token it captures incidental reach, whereas putting it in the Title would define us as a tracker and attract the wrong install. FR omits it entirely because the FR market's tracker incumbents are far stronger.

### Cross-localization stacking (free extra keyword reach)

Each storefront indexes a primary locale plus secondary "backend" locales — each is a **second keyword bank** ranking in that store.

- **France storefront indexes English (U.K.), Italian and German.** Fill English (U.K.) as a second bank: `baby,checklist,planner,partner,private,offline,newborn,hospital,bag,paperwork`. Italian and German are two more free banks the base plan leaves empty: IT `neonato,valigia,ospedale,checklist,coppia,privacy`; DE `baby,klinikkoffer,checkliste,partner,privat,offline`.
- **US storefront indexes 9 secondaries** (Arabic, Chinese ×2, French, Korean, Portuguese (Brazil), Russian, Spanish (Mexico), Vietnamese) → place *additional English long-tail* there: `maternity,leave,nursery,carseat,registry,dad,father,coparent,firsttime,checklist`. Expands the indexable footprint from 160 toward ~1,440 chars.
- **Promotional Text (170, non-indexed, editable without review):** use for timely hooks without an app review, e.g. `Nouveau : le modèle Administratif français, mis à jour pour 2026.`

### Maintenance rules

- When a feature is added or renamed, re-evaluate the **Subtitle** and **Keywords** first (highest ROI), never the Description.
- Re-run the dedup check after any edit: a word in two of Name/Subtitle/Keywords is wasted space.
- Keep the Description tuned for **conversion**, not keywords. Protect the first 3 lines.
- FR: **accented** in the visible fields, **unaccented** variants in the hidden keyword field.
- The medical disclaimer stays in the description. It is a regulatory line (§7.3), not copy to optimize away.

---

## Google Play Store Optimization (Play ASO)

### Play vs. Apple: the differences that flip the whole strategy

Do **not** copy the App Store strategy here. The mechanics are fundamentally different:

| | Apple | Play |
|---|---|---|
| Hidden keyword field | ✅ 100 chars | ❌ **does not exist** |
| Long description indexed | ❌ no | ✅ **fully indexed** |
| Short description indexed | ✅ | ✅ (high weight) |
| Accents | accented ≠ unaccented | **normalized** (`congé` = `conge`) |
| Repetition | wasteful | mild repetition **helps**, stuffing is penalized |

Consequences for Bulle:

- The **long description IS the keyword strategy** on Play. Every term we would have hidden in Apple's keyword field must appear naturally in prose here.
- **Do not double accented/unaccented forms** — Play normalizes them, so `conge` alongside `congé` is pure stuffing.
- Aim for each important term appearing roughly **2–3 times** across the long description, in real sentences. More reads as spam to Google's classifier and to humans.

### Optimized Play metadata to ship

**🇫🇷 French (fr-FR)**

- **Title (30 max):** `Bulle : préparation bébé`
- **Short description (66/80):** `Préparer l'arrivée de bébé à deux. Privé, hors ligne, sans compte.`
- **Long description:** reuse the App Store FR body above, with these Play-specific edits:
  - Work `démarches administratives`, `déclaration de grossesse`, `congé maternité`, `valise maternité`, `checklist naissance`, `mode de garde` and `co-parent` into the prose 2–3 times each. On Apple these live in the hidden field; on Play the prose is the only surface.
  - Keep the first 2 lines identical to the Apple hook (it is the same conversion job).

**🇬🇧🇺🇸 English (en-US)**

- **Title (30 max):** `Bulle: Baby Prep, Together`
- **Short description (61/80):** `Prepare for your baby together. Private, offline, no account.`
- **Long description:** the App Store EN body, with `hospital bag`, `checklist`, `newborn`, `co-parent`, `maternity leave` and `nursery` woven in 2–3 times each.

### Play maintenance rules

- Re-read the long description as **prose** after any keyword edit. If it reads like a list of search terms, Google's spam classifier and the reader agree, and you lose both.
- Play's **short description** carries high weight and is the one line shown on the listing card. Treat it like Apple's Subtitle.
- Custom Store Listings let you target a keyword set per acquisition channel — worth it once there is paid traffic, not before.

---

## Growth, creative & discovery (both stores)

### Keyword research workflow (repeatable)

1. Seed from the **blog's** priority list (`apps/mobile/lib/blog-publish-dates.ts`): those slugs were chosen by search intent, so they are already a keyword map. `declaration-grossesse-demarches` → `declaration`, `demarches`, `CAF`, `CPAM`.
2. Pull volume/difficulty in an ASO tool per storefront. **Never trust a global number** — FR and US behave differently here, particularly around admin terms which have no US equivalent.
3. Kill anything that implies tracking (`suivi`, `symptômes`, `semaine par semaine`) however good the volume. See Positioning.
4. Ship into Subtitle/Keywords (Apple) or the long description (Play), then wait a full **two weeks** before reading the result. Store ranking is slow and noisy.

### Creative & conversion (highest leverage after the icon)

- **The icon is the orb.** It is the one asset that is unmistakably ours and it reproduces at 48px, which is the actual constraint. Do not put the wordmark in it.
- **Screenshot 1 must carry the thesis**, not a feature: the orb plus "Votre bulle à deux avant l'arrivée de bébé". Most installs are decided on screenshot 1 without scrolling.
- **Screenshot 2 = the Administratif template.** It is the single feature no competitor has and the one that justifies the price.
- **Screenshot 3 = privacy.** "Sans compte. Chiffré de bout en bout. Nous n'avons pas la clé."
- Caption text goes **near the top** of each screenshot: Apple's AI now extracts screenshot text for discovery, and thumbnails crop the bottom.
- **No baby photography anywhere.** Bulle has no figurative baby imagery by design (§8.1), and that discipline is also grief-safe: a store listing is the one surface someone cannot opt out of seeing.

### Ratings, reviews & behavioral signals

- **Never** prompt for a review during onboarding or near a Pause-mode surface. The only sane moment is after a genuine milestone ("Vous êtes prêts"), and even then at most once.
- Treat **every 1★ mentioning a loss as a sev-1.** It means a grief-safety failure shipped (spec §12), and it is both the worst harm the product can do and the fastest way to destroy the rating.
- Conversion rate feeds ranking on both stores, so the screenshot work above is also keyword work.

### Seasonality

Unlike weddings, births are close to **flat year-round** in France, with a mild late-summer peak. There is no seasonal ASO play here — do not waste effort chasing one. The real cycle is *individual*: every user arrives at their own week 6–12 and leaves ~30 weeks later. That means **steady-state acquisition matters more than any campaign**, which is exactly what the daily blog drip is for.

### Web-SEO synergy

- Play indexes your site's content signals, and the blog (one article/day, `lib/blog-publish-dates.ts`) is the compounding asset. The store listing and `/fr/blog` should use the same vocabulary so both surfaces reinforce one term set.
- `bulle.drakkar.software` should link to both store listings, and both listings should link back to the site. It is the cheapest ranking signal available and it is routinely skipped.
