'use client';
/**
 * The bulle-switch transition.
 *
 * A dedicated ROUTE rather than switching in place, because `switchBulle` awaits a
 * SecureStore write and a registry reload. Routing straight to /today would paint the OLD
 * bulle's data during that async gap — DatabaseProvider's overlay only arms once
 * `dbFileName` has actually changed.
 *
 * This screen owns the cover until `switching` flips true, then hands over to
 * DatabaseProvider's overlay as the single source of truth.
 */
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useBulleTheme } from '@bulle/ui/theme';
import { useDatabaseSwitching } from '@/db/provider';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';

export default function BulleSwitchScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors } = useBulleTheme();
  const switching = useDatabaseSwitching();
  const sawSwitchingRef = useRef(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!id) return;
    void useBulleRegistryStore.getState().switchBulle(id);
  }, [id]);

  // Saw-it-then-lost-it: the swap is done the render after `switching` goes false again.
  useEffect(() => {
    if (switching) sawSwitchingRef.current = true;
    else if (sawSwitchingRef.current) router.replace('/today');
  }, [switching, router]);

  // Safety net: a storage error must never strand the user on a spinner forever.
  useEffect(() => {
    const timer = setTimeout(() => setFailed(true), 5_000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (failed) router.replace('/today');
  }, [failed, router]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator color={colors.sage} />
    </View>
  );
}
