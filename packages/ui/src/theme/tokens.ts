/**
 * Design tokens — THE source of truth (spec §15.1). Nothing else in the app hardcodes a
 * color, a font size, or a spacing value. A deviation is proposed as a change to this file,
 * never as a local value.
 *
 * On the palette: Bulle lives in the warm-ivory family, which is also the most common
 * AI-generated look of 2025–26 (§15.0 says so itself). Two things keep it from reading as
 * a template, and both must be defended in review:
 *
 *  1. **Sage is the primary, not terracotta.** Every accent, action and progress state is
 *     sage. Terracotta appears on exactly two surfaces in the whole product — the home
 *     Focus card's CTA, and the two celebrations. The default look uses terracotta
 *     everywhere; using it almost nowhere is what makes it mean something.
 *  2. **Identity lives in motion, not chrome.** The orb and the fil carry the brand; the
 *     rest is disciplined typography and whitespace. Hence the near-total absence of
 *     borders, shadows and cards below.
 *
 * Hard rule from §15.0: never `#D97757`, nor anything within ΔE < 10 of it.
 */

export const color = {
  light: {
    bg: '#FAF7F2', // ivoire — global background, never pure white
    surface: '#FFFFFF', // cards; used sparingly (see §15.4 / SURFACE_POLICY)
    ink: '#2E2A26', // primary text
    inkSoft: '#6B645C', // secondary text — ratio ≥ 4.5:1 on bg
    sage: '#7C8F72', // PRIMARY accent: actions, progress, positive states
    terracotta: '#C46A4A', // RARE: celebration + the Focus card CTA only
    dustyBlue: '#8FA6BF', // informational: appointments, admin
    line: '#E9E2D8', // 1px separators — never card borders
    danger: '#A8503F', // destructive actions ONLY — never "late", never overdue
  },
  dark: {
    bg: '#1C1A17', // "mode nuit" — warm; never pure black, never blue-grey
    surface: '#26231F',
    ink: '#EDE7DE',
    inkSoft: '#A79E92',
    sage: '#93A889',
    terracotta: '#D08461',
    dustyBlue: '#9FB4CB',
    line: '#353028',
    danger: '#C26A57',
  },
} as const;

export type ColorScheme = keyof typeof color;
export type ColorToken = keyof (typeof color)['light'];
/** A resolved palette. Widened to `string` — `as const` above types each value as its own
 *  literal hex, which would make the dark palette unassignable to the light one's type. */
export type Palette = Record<ColorToken, string>;

/**
 * Type scale (§15.1).
 *
 * Fraunces is for NARRATIVE and emotional moments only — the Chemin, week cards,
 * celebrations. Never buttons, lists, or settings. If a screen uses Fraunces more than
 * twice, it is being used as decoration and the screen is wrong.
 *
 * `family` names match the fonts loaded in the app (`@expo-google-fonts/*`).
 */
export const type = {
  display: { family: 'Fraunces', size: 34, weight: '600', lineHeight: 40, letterSpacing: -0.5 },
  titleXL: { family: 'Fraunces', size: 26, weight: '600', lineHeight: 32, letterSpacing: -0.2 },
  title: { family: 'Inter', size: 20, weight: '600', lineHeight: 26 },
  body: { family: 'Inter', size: 16, weight: '400', lineHeight: 24 },
  bodyMed: { family: 'Inter', size: 16, weight: '500', lineHeight: 24 },
  caption: { family: 'Inter', size: 13, weight: '400', lineHeight: 18 },
  overline: { family: 'Inter', size: 12, weight: '600', lineHeight: 16, letterSpacing: 0.8 },
} as const;

export type TypeToken = keyof typeof type;

/** Index-based spacing — no free values. `space[4]` is 16, the default gutter. */
export const space = [0, 4, 8, 12, 16, 24, 32, 48, 64] as const;

export const radius = { s: 10, m: 16, l: 24, orb: 9999 } as const;

/** Minimum touch target. Non-negotiable (§15.8 item 5). */
export const touch = { min: 44 } as const;

/**
 * Layout constants shared by the responsive shell.
 * `desktopBreakpoint` matches wedding-os' 1024px — a sidebar below that width fights
 * the content for space rather than helping.
 */
export const layout = {
  desktopBreakpoint: 1024,
  sidebarWidth: 248,
  /** Content column cap — long measure is a readability failure, not a use of space. */
  maxContentWidth: 640,
} as const;

/**
 * Where a raised `surface` is permitted (§15.4). Everything else is a flat list separated
 * by a 1px `line`. Exported as data so the rule is greppable rather than folklore.
 *
 * BANNED, everywhere: card borders, elevation/shadows (the orb's halo is the sole
 * exception — it is the only element in the app that emits light), alternating section
 * backgrounds, badges, red dots.
 */
export const SURFACE_POLICY = ['FocusCard', 'WeekCard', 'GateCard'] as const;
