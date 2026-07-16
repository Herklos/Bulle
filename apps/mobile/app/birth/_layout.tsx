'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { stackScreenOptions } from '@/lib/stack-screen-options';
import { useIsWideScreen } from '@/lib/useIsWideScreen';

export default function BirthLayout() {
  const theme = useBulleTheme();
  const isWide = useIsWideScreen();
  return <Stack screenOptions={stackScreenOptions(theme, isWide)} />;
}
