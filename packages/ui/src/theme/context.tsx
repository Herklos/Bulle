'use client';
import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { color, layout, radius, space, touch, type as typeScale } from './tokens.js';
import type { ColorScheme, Palette } from './tokens.js';

export interface BulleTheme {
  scheme: ColorScheme;
  colors: Palette;
  type: typeof typeScale;
  space: typeof space;
  radius: typeof radius;
  touch: typeof touch;
  layout: typeof layout;
}

const ThemeContext = createContext<BulleTheme | null>(null);

export interface BulleThemeProviderProps {
  children: React.ReactNode;
  /**
   * Force a scheme. Omit to follow the OS.
   * "Mode nuit" is not a preference feature here — it matters at 4am, which is when this
   * app is actually opened.
   */
  scheme?: ColorScheme;
}

export function BulleThemeProvider({ children, scheme }: BulleThemeProviderProps) {
  const system = useColorScheme();
  const resolved: ColorScheme = scheme ?? (system === 'dark' ? 'dark' : 'light');

  const value = useMemo<BulleTheme>(
    () => ({
      scheme: resolved,
      colors: color[resolved],
      type: typeScale,
      space,
      radius,
      touch,
      layout,
    }),
    [resolved],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

/**
 * The only sanctioned way to reach a color. Throws outside the provider rather than
 * silently falling back to light — a missing provider is a bug, and a silent fallback
 * would ship a broken dark mode without anyone noticing.
 */
export function useBulleTheme(): BulleTheme {
  const theme = useContext(ThemeContext);
  if (!theme) throw new Error('useBulleTheme must be used inside a <BulleThemeProvider>.');
  return theme;
}
