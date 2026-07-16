'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';

export default function MoreLayout() {
  const theme = useBulleTheme();
  /**
   * `false`, not `useIsWideScreen()`, and this is load-bearing rather than a tidy-up.
   *
   * More used to live inside (tabs), where the desktop sidebar supplied navigation and a
   * per-screen header was redundant chrome — which is why the option was width-dependent.
   * It is a PUSHED screen now, reached from the home header, so on desktop it has no sidebar
   * (that only mounts inside (tabs)) and `headerShown: !isWide` would give it no header
   * either. No sidebar and no header is a page with no way out: the user lands on Plus and
   * the only escape is the browser's own back button.
   *
   * Passing false keeps the header at every width. Nothing errors without this; the screen
   * just quietly becomes a dead end on desktop, which is exactly the kind of web break that
   * ships.
   */
  return <Stack screenOptions={stackScreenOptions(theme, false)} />;
}
