'use client';
/**
 * The invite deep-link screen.
 *
 * Web is the hard case. The invite's secret lives in the URL FRAGMENT, and expo-router
 * calls `history.replaceState` as it mounts, which strips it. By the time any effect runs,
 * the token is gone — so `bootHref` in lib/identity.ts snapshots `window.location.href` at
 * MODULE LOAD. That is the only reason the web join flow works at all.
 */
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { Linking } from 'react-native';
import { useTranslation } from 'react-i18next';
import type { SpaceInviteLinkToken } from '@bulle/sdk';
import { Button, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { initialInviteUrl, parseSpaceInviteUrl } from '@/lib/identity';
import { joinBulleByToken } from '@/lib/join-space';
import { useBulleRegistryStore } from '@/store/useBulleRegistryStore';

export default function JoinScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { space } = useBulleTheme();

  /**
   * Tri-state, deliberately:
   *   undefined → still resolving (native needs an async round-trip)
   *   null      → resolved, and there is no usable link
   *   string    → resolved
   * A plain `null` initial value would flash the error screen for a frame on every native
   * cold start.
   */
  const [url, setUrl] = useState<string | null | undefined>(undefined);
  const [confirmed, setConfirmed] = useState(false);
  const [joining, setJoining] = useState(false);
  const [failed, setFailed] = useState(false);

  const registry = useBulleRegistryStore((s) => s.registry);

  useEffect(() => {
    void initialInviteUrl().then((initial) => setUrl(initial ?? null));
    // Warm starts: the app is already open when the link is tapped.
    const sub = Linking.addEventListener('url', (event) => setUrl(event.url));
    return () => sub.remove();
  }, []);

  const token: SpaceInviteLinkToken | null = url ? parseSpaceInviteUrl(url) : null;

  // Already a member of this space → switch to it rather than joining twice.
  const existing = token
    ? registry?.bulles.find((b) => b.spaceId === token.spaceId)
    : undefined;

  useEffect(() => {
    if (!existing) return;
    void useBulleRegistryStore.getState().switchBulle(existing.id).then(() => router.replace('/today'));
  }, [existing, router]);

  useEffect(() => {
    if (!confirmed || !token || joining) return;
    setJoining(true);
    void joinBulleByToken(token)
      .then(() => router.replace('/today'))
      .catch((error) => {
        console.warn('[join] failed', error);
        setFailed(true);
        setJoining(false);
      });
  }, [confirmed, token, joining, router]);

  if (url === undefined) {
    return (
      <Screen center>
        <Text variant="body" color="inkSoft" style={{ textAlign: 'center' }}>
          {t('common.loading')}
        </Text>
      </Screen>
    );
  }

  if (!token) {
    return (
      <Screen center>
        <View style={{ gap: space[4] }}>
          <Text variant="titleXL">{t('join.invalidTitle')}</Text>
          <Text variant="body" color="inkSoft">
            {t('join.invalidBody')}
          </Text>
          <Button label={t('join.startOwn')} onPress={() => router.replace('/onboarding')} block />
        </View>
      </Screen>
    );
  }

  if (failed) {
    return (
      <Screen center>
        <View style={{ gap: space[4] }}>
          <Text variant="titleXL">{t('join.failedTitle')}</Text>
          <Text variant="body" color="inkSoft">
            {t('join.failedBody')}
          </Text>
          <Button label={t('join.retry')} onPress={() => setFailed(false)} block />
        </View>
      </Screen>
    );
  }

  if (joining) {
    return (
      <Screen center>
        <Text variant="titleXL" style={{ textAlign: 'center' }}>
          {t('join.joining')}
        </Text>
      </Screen>
    );
  }

  // Always confirm before joining, even with no existing bulle — the user should know what
  // they are stepping into before their device adopts someone else's space.
  return (
    <Screen center>
      <View style={{ gap: space[4] }}>
        <Text variant="titleXL">{t('join.confirmTitle', { name: token.spaceName })}</Text>
        <Text variant="body" color="inkSoft">
          {t('join.confirmBody')}
        </Text>
        {registry && registry.bulles.length > 0 && (
          <Text variant="caption">{t('join.existingWarning')}</Text>
        )}
        <Button label={t('join.confirm')} onPress={() => setConfirmed(true)} block />
      </View>
    </Screen>
  );
}
