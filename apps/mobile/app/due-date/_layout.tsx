'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';

export default function DueDateLayout() {
  const theme = useBulleTheme();
  /**
   * `false`, not `useIsWideScreen()`, and load-bearing rather than a tidy-up.
   *
   * Without a _layout at all this route was a direct child of the ROOT stack, whose
   * `headerShown: false` meant no header ever rendered — so the Save action (a headerRight)
   * was unreachable on iOS and web, and there was no back button either. It is a PUSHED
   * screen reached from Réglages, and like Réglages it has no sidebar on desktop (that only
   * mounts inside (tabs)), so `headerShown: !isWide` would leave it with no way out at wide
   * widths. Passing false keeps the header — and its back button and Save — at every width.
   */
  return <Stack screenOptions={stackScreenOptions(theme, false)} />;
}
