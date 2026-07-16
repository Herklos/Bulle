# Bulle

A calm, private, local-first companion for couples preparing for a baby. FR-first, EN
supported. No accounts, E2EE sync, one-time purchase.

**Read `docs/SPEC.md` for the product; this file is for how the code works and what has
already been learned the hard way.**

## Layout

```
apps/mobile/        expo-router universal app (iOS / Android / web static export)
packages/sdk/       @bulle/sdk — headless domain + sync. No React, no RN imports.
packages/ui/        @bulle/ui — tokens, primitives, components
tools/              dev-sync-server.mjs (local Starfish harness)
```

pnpm workspaces, Expo SDK 57, RN 0.86, React 19.2, expo-router ~57. The app consumes the
packages as **raw source** (`exports.source` → `./src`, plus `paths` in tsconfig), so there
is no build step between editing the SDK and seeing it in Metro.

## Commands

```
pnpm -r typecheck && pnpm -r test        # 236 tests. Both must be green before a commit.
pnpm --filter bulle android|ios|web
```

**Metro is the user's.** Do not start, kill, or restart it without being asked.

---

## Architecture rules that are load-bearing

### Pure `setX` vs effectful `addX`

The single most important invariant in the stores:

```ts
setTasks: (tasks) => set({ tasks }),        // PURE. hydrate + remote-apply use ONLY this.
addTask:  (task)  => { set(...); persist(); notifySync(); },
```

If `setX` called `notifySync()`, every remote pull would schedule a push of what it just
received: an infinite echo. This is why `collection-registry.ts` takes the pure setter as
its own `write` field.

### Content first, index second

A failed content push must never leave the index pruned-but-contentless. Same order
everywhere.

### `permissions: {}` ≠ `permissions: undefined`

`{}` is locked out; `undefined` is unrestricted. Fail-open is deliberate so a member is
never accidentally locked out by a sync that has not landed yet. Do not "simplify" these
into one nullish check.

### Baselines commit only on confirmed push

`_collectionState` / `_lastPushedJson` are the dirty-check. Committing them optimistically
means a failed push corrupts the dirty state and the next push durably tombstones live
entities.

### `now` is always injected

Never `Date.now()` inside SDK merge logic. Tests depend on it, and so does correctness under
CAS retry.

---

## Learnings — Expo / RN

These each cost real debugging time and none are in the docs.

**`expo run:android` does NOT re-run prebuild when `android/` is checked in.** A newly added
native module silently stays unlinked. Symptom: `Cannot read property 'setLogLevel' of null`
from a freshly installed SDK. Run `expo prebuild` explicitly, then check the autolinking
count in the build log actually went up.

**Platform-extension self-import is a footgun.** `DueDatePicker.web.tsx` importing from
`./DueDatePicker` resolves to *itself* on web, giving `RangeError: Maximum call stack size
exceeded` pointing at an innocent getter. Shared types/values for a platform-split component
go in a **third, platform-neutral file** (`components/due-date.ts`), never in one of the
variants.

**A zustand selector returning a new array re-renders forever.** `useStore(s =>
s.tasks.filter(...))` produces a new reference every call → "Maximum call stack size
exceeded". Select the raw array, then `useMemo`.

**`@expo/ui` `DateTimePicker` `mode="datetime"` silently degrades to `date` on Android.** No
warning. Use a stepped flow instead.

**Inline `@expo/ui` pickers ignore height** (`matchContents`) and swallow vertical drags. Any
screen with one must not rely on scrolling; put the confirm action in the header.

**`<Stack.Screen options>` nested inside a ScrollView's content container never reaches the
navigator.** The header silently stays bare. It must be a *sibling* of the scroll container.

**i18next returns the key on a miss**, so a missing translation renders as
`settings.premium` rather than throwing. Nothing catches this in review. `__tests__/i18n-parity.test.ts`
exists for exactly this reason — keep it green.

**Web dark mode must be applied synchronously pre-render**, or it flashes.

**`theme-color` needs `media`.** One static value cannot follow the theme; it stays light
while the page goes dark, and the mismatch lands in the OS status bar.

**Skia canvases clip their own shadows/blur.** The orb needs `CANVAS_SCALE` > 1 plus a
negative margin, or its halo is cut at the bounds.

### Debugging RN via CDP

**Forcing `prefers-color-scheme` after load produces a fake bug.** The page repaints its
background while React keeps the old theme, so text looks invisible. Verify in a clean
browser before believing a contrast bug found this way. This wasted a cycle.

---

## Learnings — sync (Starfish / dk-spaces)

**The default starfish scopes mint wildcard caps** (`collections: ["*"]`), and the server
synthesizes roles by literal concatenation (`cap:read:*`), which never matches the `dk`
namespace's explicit collections. Without `bulleLayout()`'s swap, **every read/write 403s**.
Build the layout lazily *inside* the function; an eager spread breaks tests that partially
mock starfish-spaces.

**The KvAdapter must be flat and tenant-independent.** SDK state is account-scoped
(`dk.spaceaccess.{userId}`). Prefixing it per-bulle silently drops the join credential and
breaks sync for every joiner on web after reload.

**`hydrateSpaceAccessStore(userId)` must run BEFORE `joinSpaceByLink`**, or
`saveSpaceAccessEntry` writes under the previous user's `_activeKey` and the credential is
wiped at member boot.

**Snapshot `window.location.href` at module scope** in `join.tsx`. expo-router's
`replaceState` strips the fragment before React mounts, destroying the invite secret.

**Invite links are bearer tokens and inherently multi-use.** The secret is entirely in the
URL fragment and the server counts no redemptions. Bound with TTL + revoke.

**QR payload is ~1.4KB** (signed cap + 2 keypairs) ⇒ `ecl="L"` and ≥250px, or it will not
scan. `invite-qr-density.test.ts` guards this.

**A 403 on push is authoritative read-only**, not a transient error. Without treating it as
one, a stale cap 403s and the next hydrate's wholesale replace reverts the user's edit with
zero feedback.

**`cors: true` is not enough on the dev harness.** Its defaults omit the cap auth headers, so
the preflight passes with 204 and the browser then silently refuses to send the real POST —
indistinguishable from a server that never answers. See `docs/SYNC.md`.

**Sharing was dead from the start and nobody noticed** because it failed *before* the network:
`invite()` returned early on a missing `spaceId`, which only `activateSync` set, which itself
bailed on a missing `spaceId`. A circular guard. The lesson is that a silent early-return
deadlock hides every downstream bug behind it — including that the configured sync host does
not resolve. When something "does nothing", check for a guard before checking the network.

---

## Design bar (non-negotiable — see spec §8/§15)

Apple Design Award level: Things 3 discipline + Apple Fitness warmth. Judged on Delight &
Fun, Interaction, Visual & Graphics, Inclusivity.

- **Built entirely from code.** No icon packs, no stock imagery. Three vector primitives
  carry the identity: the **orb**, the **fil**, and **line-weight glyphs**.
- **Spend all boldness on the orb and the fil.** Everything else stays quiet.
- **Banned:** card borders, shadows/elevation (the orb halo is the only light-emitting
  element), alternating section backgrounds, badges, red dots anywhere.
- Hierarchy comes from space and type, not boxes.
- **Anti-default:** never `#D97757` or anything within ΔE < 10 of it. "Warm cream + serif +
  terracotta" is the most common AI-generated look of 2025–26; Bulle's palette lives in that
  family, so differentiation must come from execution. If a screen would look at home in a
  generic "cozy startup" template, revise it.
- **Chanel rule:** before finishing any screen, remove one decoration.
- Colors come from tokens only. Per-screen DoD: dark mode checked *visually*, Dynamic Type
  130% untruncated, VoiceOver order, ≥44pt targets, reduced-motion, **Pause-mode pass**.

The mechanical half of this is greppable (raw hex, shadows, borderWidth, badges) and
currently passes. Deliberate near-misses, so they are not "fixed" by a future sweep:
`#FFFFFF` in the QR sheet (scanners need true white), `elevation: 0` (removes a shadow), and
Checkbox's `1.75` borderWidth (glyph stroke weight, not a card).

### Unresolved contradiction

`assets/bulles/` holds 40 raster PNGs used in the home orb, the landing orb and the Chemin.
The bar above says no raster illustrations, ever, and §8.1 bans figurative baby imagery
outright. The user has asked for them repeatedly. **This needs an explicit decision before
any design pass touches those screens** — it determines the orb, the landing, home and the
Chemin.

---

## Sensitive states — the highest-stakes rule in the app

Bulle is used by people whose pregnancy may not end well. §3 is not a feature, it is a
shell-level constraint.

- Pause must be reachable in **≤2 taps** and must **purge all scheduled local
  notifications**. Muting is not enough: a scheduled "Semaine 24 🎉" firing after a loss is
  the catastrophic failure case.
- Every screen's DoD asks: *is this reachable in Pause?* If so, no pregnancy or celebration
  content may appear. `app/birth/new.tsx` is the model — sober, no confetti, states what the
  date is for and nothing else.
- **Never "en retard".** A closed window is not a failure. "Toujours sur ta liste", never
  shaming, no red, no streaks, no win-back notifications.

## Copy

- **French uses vouvoiement** ("vous/votre"). This supersedes spec §8.3, which says tutoiement
  — decided explicitly with the user.
- No em-dashes in user-facing prose.
- The EN locale ships **without** the FR admin module rather than with a bad one.

## Regulatory red line (§7.3)

No diagnosis, no symptom triage, no physiological monitoring. The rules engine schedules
*preparation*, not care. This is what keeps Bulle outside EU MDR scope, and it is why a kick
counter and a contraction timer are anti-goals, not backlog items.

The suggestion engine is **deterministic rules, zero LLM** (`domain/suggest.ts`) — offline,
predictable, no hallucination and no medical-liability surface.

## Countries

FR is the only shipped country. `templates.ts` flags FR-specific templates with
`countries: ['FR']`; `templateAppliesInCountry` filters. Task links resolve per country via
`hrefByCountry` → `resolveTaskHref(task, country)`. Adding a country means adding templates
and hrefs, not touching screens.
