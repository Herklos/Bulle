<div align="center">
  <img src="logo.png" alt="Bulle" width="160" />

  <h1>Bulle</h1>

  <p><strong>Votre bulle à deux avant l'arrivée de bébé.</strong></p>

  <p>Les démarches françaises au bon moment. La valise avant le jour J. Rien d'autre pour vous encombrer.</p>

  <p>
    <img alt="Expo SDK 57" src="https://img.shields.io/badge/Expo_SDK-57-000020?logo=expo&logoColor=white" />
    <img alt="React Native" src="https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=white" />
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white" />
    <img alt="End-to-end encrypted" src="https://img.shields.io/badge/Sync-End_to_end_encrypted-7C8F72" />
    <img alt="No account" src="https://img.shields.io/badge/Account-None_required-7C8F72" />
    <img alt="License" src="https://img.shields.io/badge/License-Private-gray" />
  </p>

  <p>
    <a href="https://bulle.drakkar.software"><img alt="Try the Web App" src="https://img.shields.io/badge/Web_App-Try_it-C46A4A?logo=googlechrome&logoColor=white" /></a>
    <a href="https://bulle.drakkar.software/fr/blog"><img alt="Le Carnet" src="https://img.shields.io/badge/Le_Carnet-Read-8FA6BF" /></a>
    <a href="https://bulle.drakkar.software/fr/privacy"><img alt="Privacy" src="https://img.shields.io/badge/Privacy-Read_it-7C8F72" /></a>
  </p>
</div>

---

## What is Bulle?

**Bulle** is a private, offline-first app for preparing for a baby, built for expecting couples in France.

It handles the **French administrative track** at the right moment (déclaration de grossesse, CPAM, CAF, congés, inscription maternité, mode de garde), the **hospital bag** before the day, and **what is actually worth buying**. Both parents get the same access, with no account, and the sync between them is end-to-end encrypted with a key we do not hold.

It is bought once. There is no subscription, no advertising, and no third-party SDK in the app.

### What Bulle is not

This matters as much as the feature list, and it is deliberate:

- **Not a pregnancy tracker.** No symptom logging, no kick counter, no contraction timer. The free government app (*1000 premiers jours*) and the content giants own medical content, and competing there is a losing battle.
- **Not a medical device.** Bulle schedules *preparation*, never care. No diagnosis, no triage, no personalised medical advice. Every health question goes to a midwife or a doctor. This keeps it outside EU MDR scope by design, not by accident.
- **Not a marketplace.** No affiliate links anywhere, including the buying guides. In a category where every publisher is paid per click, neutrality is the moat, and it only works if it is real.

The unowned territory is **the couple's private preparation HQ**. That is what this is.

---

## Features

<table>
<tr>
<td width="50%">

### 🫧 Aujourd'hui
One focus task at a time, chosen by a deterministic rules engine. No backlog count, no streaks, no red, no overdue shaming. "Plus tard" is guilt-free and records nothing.

### 🗺 Chemin
A single continuous *fil* down the screen, one inflection per week, with a mini-orb marking where you are.

### ✓ Préparer
Projects with progress rings, not a task list. Progress counts **essential tasks only**; optional ones show as "+N idées" and never enter the denominator, so planning more can never make you look further behind.

</td>
<td width="50%">

### 🇫🇷 Administratif
The flagship. Déclaration, CPAM, CAF, congé maternité and paternité, maternité, mode de garde, post-naissance. Each step arrives in its own **week-window** with a link to the official source.

### 👤 À deux
Both co-parents, same access, same list. Invitation is a bearer link, no account. **Sync is free** — the north-star metric is both parents active, and gating it would tax the exact behaviour that drives retention.

### ⏸ Pause
For a pregnancy that ends in loss. Two taps, purges every scheduled notification, hides the journey and the countdown. Export, delete for real, or keep it.

</td>
</tr>
</table>

### The orb

Readiness is a liquid level inside a breathing glass bubble, with the week's baby floating in it. It breathes at **6 cycles/min** — a calming-breath tempo, which is why it reads as alive rather than as a spinner.

The score is honest by construction: **monotonic** (it never visibly regresses within a profile), **dismissed counts as resolved** ("pas pour nous" is a decision, not a failure), and **optional tasks never enter the denominator**. There is no percentage on it by default.

---

## Privacy

This is the product, not a compliance footnote.

| | |
|---|---|
| **No account** | Identity is a 12-word BIP-39 seed, derived via Argon2id, generated on-device and kept in the Keychain / Keystore. We never see it. |
| **Local-first** | Your data lives on your device. The app is fully usable offline, including at the maternity ward with no signal. |
| **E2EE sync** | What travels between co-parents is encrypted with a key that never leaves your phones. Our servers store ciphertext. We cannot read your content, even if asked. |
| **GDPR Art. 9** | Pregnancy data is special-category health data. The architecture makes it inaccessible to us, rather than promising we won't look. |
| **No trackers** | Zero advertising SDKs, zero third-party analytics. |
| **Real export & deletion** | One-tap JSON export. Deletion erases locally and tombstones for peers. |

There is no "forgot password" button, because there is no account. Your recovery phrase is the only way back. That is the honest cost of end-to-end encryption, and we say so in the [Terms](https://bulle.drakkar.software/fr/terms).

---

## Tech Stack

| Layer | Choice |
|---|---|
| App | Expo SDK 57 · React Native 0.86 · React 19 · Expo Router (file-based) |
| Native UI | `@expo/ui` — real SwiftUI on iOS, real Jetpack Compose on Android |
| Signature | React Native Skia (the orb) · react-native-svg (the fil, glyphs) · Reanimated 4 |
| Sync | Starfish — Ed25519 identity, X25519 keyring, E2EE, CAS conflict resolution |
| Storage | expo-sqlite KV (native) · AsyncStorage (web), one file per bulle |
| Web | Static export, prerendered per locale, PWA |
| Monorepo | pnpm workspaces · tsup · vitest |

**Universal**: one codebase, iOS + Android + web. Three navigation modes chosen by platform and breakpoint: native tabs on device, JS tabs on mobile web, a desktop sidebar at ≥1024px.

---

## Quick Start

```bash
# Install (pnpm workspaces, hoisted linker)
pnpm install

# Run
pnpm --filter bulle ios          # requires a native build: Skia, @expo/ui, quick-crypto
pnpm --filter bulle android
pnpm --filter bulle web

# Verify
pnpm -r typecheck
pnpm -r test
```

> **Android**: needs `ANDROID_HOME` set and `android/local.properties` pointing at your SDK.

---

## Repo layout

```
packages/sdk     @bulle/sdk — headless domain + the Starfish sync core.
                 Pure TypeScript: no React, no Expo, no clock (now is injected).
packages/ui      @bulle/ui — tokens, motion, the orb, the fil, glyphs, primitives.
apps/mobile      The Expo app + the marketing site + the blog.
```

`packages/*` expose TS **source** via their `exports` maps (`source`/`react-native`), so Metro consumes them directly with no build step in dev.

---

## The design system

`packages/ui/src/theme/tokens.ts` is the **single source of truth**. Nothing else in the app holds a colour, a size or a spacing value.

- **Sage is the primary.** Terracotta appears on exactly two surfaces in the whole product — the home focus CTA, and the two celebrations. Using it almost nowhere is what makes it mean something.
- **Identity lives in motion, not chrome.** The orb and the fil carry the brand; the rest is disciplined typography and whitespace.
- **Banned everywhere**: card borders, elevation/shadows (the orb's halo excepted — it is the only element that emits light), alternating section backgrounds, badges, red dots.
- **No illustration layer and no icon library.** Every glyph is drawn in-house on a 24px grid at stroke 1.75. A borrowed set imports someone else's hand.

Icons are **generated from the orb's own geometry** (`scripts/generate-logo.py`) rather than exported by hand, so they track the tokens.

---

## Le Carnet (blog)

One article per day, released by a **build-time drip**: `lib/blog-publish-dates.ts` maps array index → day offset, and that array is the entire content calendar. No CMS, no cron in the app, nothing hidden client-side — an unpublished article simply has no HTML file in `dist/`.

The gate is applied at every read path (index, article, author, landing, sitemap, llms.txt), so a future article cannot leak by guessing a URL.

```bash
pnpm --filter bulle build:web    # export + sitemap.xml + llms.txt
BUILD_DATE=2026-09-01 pnpm --filter bulle build:web   # preview a future day
```

> ⚠️ A **daily scheduled build** is what releases articles. Without that cron, nothing ever publishes.

See [`STORE_SEO.md`](./STORE_SEO.md) for the App Store / Play ASO strategy.

---

## Sensitive states

Any screen, notification or animation is reviewed against one question: **what does this feel like the day after a loss?**

- **Pause mode** stops and *purges* every scheduled local notification. Muting is not enough — a scheduled "Semaine 24 🎉" firing after a loss is the catastrophic failure this exists to prevent.
- **Solo** is an equal option at onboarding, not a fallback. No "your partner…" ghosts.
- The profile question is phrased **without clinical labels**: nobody should have to pick "high-risk" from a dropdown to be treated gently.
- No outcome prediction in any copy. Never "when your baby arrives".

Every 1★ review mentioning a loss is a **sev-1**.

---

<div align="center">
  <sub>Made in France, offline, without ads. Bulle vous aide à vous organiser, pas à vous soigner.</sub>
</div>
