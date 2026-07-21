'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';

export default function TaskLayout() {
  const theme = useBulleTheme();
  // `false`, not `useIsWideScreen()`: this is a PUSHED screen outside (tabs), so it has no
  // desktop sidebar to navigate from. `headerShown: !isWide` would leave it with no header
  // and no way out at wide widths — the same dead end more/_layout documents. Keep the
  // header (and its back button) at every width.
  return <Stack screenOptions={stackScreenOptions(theme, false)} />;
}
