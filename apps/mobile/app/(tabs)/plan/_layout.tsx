'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useIsWideScreen } from '@/lib/useIsWideScreen';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';

export default function PlanLayout() {
  const isWide = useIsWideScreen();
  const theme = useBulleTheme();
  // On desktop the sidebar provides navigation, so a per-screen header is redundant chrome.
  return <Stack screenOptions={stackScreenOptions(theme, isWide)} />;
}
