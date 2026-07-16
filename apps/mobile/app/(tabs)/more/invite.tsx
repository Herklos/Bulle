'use client';
/**
 * Mint and share an invite (spec §5.10, §10).
 *
 * Couple sync is FREE and always will be. The north-star metric is "both parents acted in
 * the last 7 days", and putting sync behind the paywall would tax the exact behaviour that
 * drives retention and word of mouth. The paywall lives on Admin FR, Prénoms, and the
 * document limit instead.
 */
import React, { useState } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { DEFAULT_PERMISSION_ROLES, type RoleDefinition } from '@bulle/sdk';
import { Button, Row, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { mintInvite } from '@/lib/invite-link';
import { getSession, getSpaceId } from '@/lib/starfish';
import { usePermissionsStore } from '@/store/usePermissionsStore';
import { useActiveBulle } from '@/store/useBulleRegistryStore';
import { pushSpaceSnapshot } from '@/lib/space-sync';
import { randomId } from '@bulle/sdk';

export default function InviteScreen() {
  const { t } = useTranslation();
  const { colors, space } = useBulleTheme();
  const { width } = useWindowDimensions();
  const active = useActiveBulle();
  const roles = usePermissionsStore((s) => s.roles);

  const [link, setLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const available: RoleDefinition[] =
    roles.length > 0
      ? roles
      : DEFAULT_PERMISSION_ROLES.map((r) => ({ ...r, createdAt: null, updatedAt: null }));

  const invite = async (role: RoleDefinition) => {
    const session = getSession();
    const spaceId = getSpaceId();
    if (!session || !spaceId || !active) return;

    setBusy(true);
    try {
      // Push BEFORE handing out the link, or the invite points at an empty space and the
      // joiner opens a blank bulle.
      await pushSpaceSnapshot();

      const { link: minted, inviteUserId } = await mintInvite(
        session,
        spaceId,
        active.label,
        role,
      );

      /**
       * The role travels over SYNC, not in the link (the link carries only `write`). It is
       * filed under the invite's ephemeral subject id, which the joiner stores at join time
       * and uses to resolve its own matrix.
       */
      const nowIso = new Date().toISOString();
      usePermissionsStore.getState().upsertAssignment({
        id: randomId(),
        subjectUserId: inviteUserId,
        roleId: role.id,
        label: null,
        createdAt: nowIso,
        updatedAt: nowIso,
      });
      await pushSpaceSnapshot();

      setLink(minted);
    } catch (error) {
      console.warn('[invite] mint failed', error);
    } finally {
      setBusy(false);
    }
  };

  const copy = async () => {
    if (!link) return;
    await Clipboard.setStringAsync(link);
    setCopied(true);
  };

  /**
   * The payload is ~1.4KB (a signed cap plus two keypairs), so error correction must drop
   * to "L" and the code must be big: a real camera needs ~2px per module, and at 125
   * modules anything under ~250px simply will not scan.
   */
  const qrSize = Math.max(250, Math.min(320, Math.round(width - 64)));

  return (
    <Screen>
      <Text variant="display">{t('settings.invite')}</Text>
      <Text variant="body" color="inkSoft">
        {t('settings.inviteBody')}
      </Text>

      {!link && (
        <View>
          <SectionHeader title={t('settings.family')} />
          {available.map((role, index) => (
            <Row
              key={role.id}
              title={t(`settings.roles.${role.name}`)}
              onPress={() => void invite(role)}
              chevron
              divider={index < available.length - 1}
            />
          ))}
        </View>
      )}

      {busy && <Text variant="caption">{t('common.loading')}</Text>}

      {link && (
        <View style={{ gap: space[5], alignItems: 'center' }}>
          <View style={{ padding: space[4], backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <QRCode value={link} size={qrSize} ecl="L" backgroundColor="#FFFFFF" color={colors.ink} />
          </View>
          <Button label={copied ? t('settings.linkCopied') : t('settings.copyLink')} onPress={copy} block />
        </View>
      )}
    </Screen>
  );
}
