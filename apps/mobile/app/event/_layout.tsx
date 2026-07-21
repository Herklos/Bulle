'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';

export default function EventLayout() {
  const theme = useBulleTheme();
  // `false`, not `useIsWideScreen()`: a PUSHED screen outside (tabs) has no desktop sidebar,
  // so `headerShown: !isWide` would leave no header and no way out at wide widths. Keep the
  // header (and its back button) at every width — see more/_layout.
  return <Stack screenOptions={stackScreenOptions(theme, false)} />;
}
