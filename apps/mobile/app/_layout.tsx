'use client';
// The crypto polyfill is installed by `index.js`, the app's entry point — NOT here.
// Importing it at the top of this file looks sufficient but is not: expo-router evaluates
// every route via require.context, so another route can pull in @noble/hashes before this
// module runs. See index.js.
import React, { useEffect, useMemo } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider } from 'react-i18next';
import { useFonts } from 'expo-font';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';
import { Fraunces_600SemiBold } from '@expo-google-fonts/fraunces';
import { BulleThemeProvider, useBulleTheme } from '@bulle/ui/theme';

import { configureOnBoot } from '@/lib/config';
import { i18n, initI18n } from '@/i18n';
import { DatabaseProvider, useDatabaseSwitching } from '@/db/provider';
import { SyncInitializer } from '@/lib/providers';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';
import { useSettingsStore } from '@/store/useSettingsStore';
import { usePremiumStore } from '@/store/usePremiumStore';
import { configurePurchases } from '@/lib/revenuecat';
import { activeEntry, type BulleRegistryEntry } from '@/lib/bulle-registry';

/**
 * MODULE SCOPE, before any React renders.
 *
 * Not an effect: screens derive a session during their first render, and the SDK's
 * `getSyncBase()` throws rather than returning undefined before this runs.
 */
configureOnBoot();
initI18n();

/**
 * Everything that runs against the ACTIVE bulle's sync globals.
 *
 * `if (switching) return null` is the load-bearing line. During a bulle switch the storage
 * is torn down and rebuilt underneath; leaving these mounted would let an SSE callback, an
 * in-flight push, or an AppState listener fire against the old bulle's session while the
 * stores swap. Unmounting is the only way to guarantee they cannot.
 */
function ActiveBulleRuntime({ bulle }: { bulle: BulleRegistryEntry }) {
  const switching = useDatabaseSwitching();
  if (switching) return null;
  return <SyncInitializer bulle={bulle} />;
}

function Loading() {
  const { colors } = useBulleTheme();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={colors.sage} />
    </View>
  );
}

function AppContent() {
  const router = useRouter();
  const segments = useSegments();
  const registry = useBulleRegistryStore((s) => s.registry);
  const isLoaded = useBulleRegistryStore((s) => s.isLoaded);
  const bulle = useMemo(() => activeEntry(registry), [registry]);

  const language = useSettingsStore((s) => s.language);
  const settingsLoaded = useSettingsStore((s) => s.isLoaded);

  useEffect(() => {
    void useBulleRegistryStore.getState().load();
    void useSettingsStore.getState().load();
    // Configure purchases then read the entitlement. Both no-op on web and on failure,
    // leaving the user on the free product rather than crashing the app.
    void configurePurchases().then(() => usePremiumStore.getState().refresh());
  }, []);

  // Apply the stored language once it has loaded. i18n is initialised at module scope from
  // the device locale so the very first paint is never untranslated; this then corrects it
  // to an explicit choice, if one was made.
  useEffect(() => {
    if (settingsLoaded && i18n.language !== language) void i18n.changeLanguage(language);
  }, [settingsLoaded, language]);

  const root = segments[0];
  // Routes that must render with no bulle: onboarding, the invite deep-link, the marketing
  // site, and Pause (which a user may reach precisely because they no longer have one).
  const isPublicRoute =
    root === 'onboarding' || root === 'join' || root === '(marketing)' || root === 'pause';

  useEffect(() => {
    if (!isLoaded) return;
    if (!bulle && !isPublicRoute) router.replace('/onboarding');
  }, [isLoaded, bulle, isPublicRoute, router]);

  /**
   * Public routes must NOT wait on the registry.
   *
   * The registry loads in an effect, which never runs during the static web export — so a
   * blanket gate here renders every marketing page as a spinner, and the exported HTML
   * contains no content, no title and no canonical. The whole SEO layer silently evaporates
   * and the export still "succeeds".
   */
  if (!isLoaded && !isPublicRoute) return <Loading />;

  return (
    <DatabaseProvider dbFileName={bulle?.dbFileName ?? null}>
      {bulle && <ActiveBulleRuntime bulle={bulle} />}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(marketing)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="join" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="pause" />
        <Stack.Screen name="event" />
        <Stack.Screen name="task" />
        <Stack.Screen name="memory" />
        {/* A modal: a paywall interrupts a flow and must return you to exactly where you
            were, whether you buy or not. */}
        <Stack.Screen name="paywall" options={{ presentation: 'modal' }} />
        <Stack.Screen name="bulle-switch" options={{ gestureEnabled: false }} />
      </Stack>
    </DatabaseProvider>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Fraunces_600SemiBold,
  });

  /**
   * Only NATIVE waits for fonts.
   *
   * On web the fonts arrive via the stylesheet <link> in +html.tsx, so `useFonts` is
   * redundant — and during the static export it always reports false (no effects run),
   * which would render every page as a spinner and export empty HTML. Blocking on it here
   * is the difference between a marketing site and 68 blank pages.
   */
  const fontsReady = Platform.OS === 'web' || fontsLoaded;

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BulleThemeProvider>
          <I18nextProvider i18n={i18n}>
            <StatusBar style="auto" />
            {fontsReady ? <AppContent /> : <Loading />}
          </I18nextProvider>
        </BulleThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
