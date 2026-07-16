'use client';
/**
 * The marketing site is WEB-ONLY.
 *
 * On native (or an installed PWA) there is no reason to show a landing page to someone who
 * has already installed the app — so this redirects straight into it. A regular browser
 * gets the actual site.
 */
import React from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Redirect, Slot } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { isPwaStandalone } from '@/lib/pwa';

export default function MarketingLayout() {
  const { colors } = useBulleTheme();
  const registry = useBulleRegistryStore((s) => s.registry);
  const isLoaded = useBulleRegistryStore((s) => s.isLoaded);

  const shouldEnterApp = Platform.OS !== 'web' || isPwaStandalone();

  if (shouldEnterApp) {
    if (!isLoaded) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color={colors.sage} />
        </View>
      );
    }
    return <Redirect href={registry && registry.bulles.length > 0 ? '/today' : '/onboarding'} />;
  }

  return <Slot />;
}
