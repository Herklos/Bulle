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
}

export function Text({
  variant = 'body',
  color = 'ink',
  uppercase,
  style,
  children,
  ...rest
}: TextProps) {
  const theme = useBulleTheme();
  const t = theme.type[variant];
  const family = FAMILY[t.family]?.[t.weight] ?? FAMILY.Inter['400'];

  // `caption` and `overline` are secondary by definition; default them to inkSoft so a
  // caller has to opt IN to full-contrast small text rather than remember to opt out.
  const defaultColor: ColorToken =
    variant === 'caption' || variant === 'overline' ? 'inkSoft' : color;

  return (
    <RNText
      style={[
        {
          fontFamily: family,
          fontSize: t.size,
          lineHeight: t.lineHeight,
          letterSpacing: 'letterSpacing' in t ? t.letterSpacing : undefined,
          color: theme.colors[color === 'ink' ? defaultColor : color],
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
