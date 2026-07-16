'use client';
import React from 'react';
import { Stack } from 'expo-router';
import { useIsWideScreen } from '@/lib/useIsWideScreen';

export default function PlanLayout() {
  const isWide = useIsWideScreen();
  // On desktop the sidebar provides navigation, so a per-screen header is redundant chrome.
  return <Stack screenOptions={{ headerShown: !isWide, title: '' }} />;
}
