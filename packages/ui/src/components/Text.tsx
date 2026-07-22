'use client';
/**
 * Typed text. The only sanctioned way to render words (§15.1).
 *
 * Font families resolve to the weight-specific names the app registers via
 * `@expo-google-fonts/*` (e.g. "Inter_600SemiBold") — React Native has no synthetic
 * bolding worth using, so the weight must be baked into the family name rather than passed
 * as `fontWeight`.
 *
 * `allowFontScaling` is deliberately left at its default (true): Dynamic Type up to 130% is
 * a shipping requirement (§15.8 item 3), not an option, and every screen is checked at that
 * size.
 */
import React from 'react';
import { Text as RNText, type TextProps as RNTextProps } from 'react-native';
import { useBulleTheme } from '../theme/context.js';
import type { ColorToken, TypeToken } from '../theme/tokens.js';

const FAMILY: Record<string, Record<string, string>> = {
  Inter: {
    '400': 'Inter_400Regular',
    '500': 'Inter_500Medium',
    '600': 'Inter_600SemiBold',
  },
  Fraunces: {
    '600': 'Fraunces_600SemiBold',
  },
};

export interface TextProps extends RNTextProps {
  variant?: TypeToken;
  color?: ColorToken;
  /** Applies to `overline` only — the token carries the tracking, this carries the case. */
  uppercase?: boolean;
  /**
   * Emit a document heading. On web (react-native-web) this renders a real `<h1>`–`<h6>`
   * element via `accessibilityRole="header"` + `aria-level`; on native it maps to the
   * `header` accessibility trait. Visual size is still the `variant` — level and look are
   * decoupled, so a section title can be an `<h2>` at any type scale.
   */
  heading?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Text({
  variant = 'body',
  color,
  uppercase,
  heading,
  style,
  children,
  ...rest
}: TextProps) {
  const theme = useBulleTheme();
  const t = theme.type[variant];
  const family = FAMILY[t.family]?.[t.weight] ?? FAMILY.Inter['400'];

  // `caption` and `overline` are secondary by definition; default them to inkSoft so a
  // caller has to opt IN to full-contrast small text rather than remember to opt out.
  // An explicit `color` (including `ink`) always wins — hence `color ?? …`, not a check
  // against the string 'ink', which would silently downgrade a full-contrast caption.
  const resolved: ColorToken =
    color ?? (variant === 'caption' || variant === 'overline' ? 'inkSoft' : 'ink');

  // `aria-level` is read by react-native-web's `propsToAccessibilityComponent`, which then
  // renders `h${level}`. It is not in RN's own prop types, hence the assertion.
  const headingProps =
    heading != null
      ? ({ accessibilityRole: 'header', 'aria-level': heading } as RNTextProps)
      : null;

  return (
    <RNText
      {...headingProps}
      style={[
        {
          fontFamily: family,
          fontSize: t.size,
          lineHeight: t.lineHeight,
          letterSpacing: 'letterSpacing' in t ? t.letterSpacing : undefined,
          color: theme.colors[resolved],
          textTransform: uppercase || variant === 'overline' ? 'uppercase' : undefined,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </RNText>
  );
}
