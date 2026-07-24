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
import { Alert } from 'react-native';
import { View, useWindowDimensions } from 'react-native';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import * as Clipboard from 'expo-clipboard';
import QRCode from 'react-native-qrcode-svg';
import { DEFAULT_PERMISSION_ROLES, type RoleDefinition } from '@bulle/sdk';
import { Button, Row, SectionHeader, Text } from '@bulle/ui/components';
import { useBulleTheme } from '@bulle/ui/theme';
import { Screen } from '@/components/Screen';
import { HeaderBackButton } from '@/components/HeaderBackButton';
import { goBack, useHardwareBack } from '@/lib/go-back';
import { revokeCollaborator } from '@/lib/permissions/revoke';
import { mintInvite } from '@/lib/invite-link';
import { getSession, initSync, isSyncActive } from '@/lib/starfish';
import { deriveSessionFromPhrase } from '@/lib/identity';
import { ensureSpaceProvisioned } from '@/lib/space-provision';
import { usePermissionsStore } from '@/store/usePermissionsStore';
import { useActiveBulle } from '@/store/useBulleRegistryStore';
import { pushSpaceSnapshot } from '@/lib/space-sync';
import { isSyncConfigured } from '@/lib/config';
import { randomId } from '@bulle/sdk';

export default function InviteScreen() {
  const { t } = useTranslation();
  const { colors, space } = useBulleTheme();
  const { width } = useWindowDimensions();
  // A web reload can open this first in the stack, where the default arrow no-ops; Android's
  // hardware back has the same dead end. Land back on Réglages either way.
  useHardwareBack('/more');
  const active = useActiveBulle();
  const roles = usePermissionsStore((s) => s.roles);
  const syncReady = isSyncConfigured();

  const assignments = usePermissionsStore((s) => s.assignments);

  const [link, setLink] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  const available: RoleDefinition[] =
    roles.length > 0
      ? roles
      : DEFAULT_PERMISSION_ROLES.map((r) => ({ ...r, createdAt: null, updatedAt: null }));

  const invite = async (role: RoleDefinition) => {
    if (!active || !syncReady) return;

    setNotice(null);
    setBusy(true);
    try {
      /**
       * Derive the session HERE rather than reading the sync singleton.
       *
       * That singleton is only set by activateSync, which bails unless the entry already has
       * a spaceId, which only exists once someone has been invited. Reading it here meant
       * invite() hit `if (!session) return` and silently did nothing, forever: an owner could
       * never mint their first link, so sync never started, so nobody noticed the sync host
       * does not even resolve. See docs/SYNC.md.
       *
       * A bulle with no seed is local-only by design (§9) and has nothing to share.
       */
      if (!active.seedPhrase) {
        setNotice(t('settings.inviteLocalOnly'));
        return;
      }
      const session = getSession() ?? (await deriveSessionFromPhrase(active.seedPhrase));

      // Creates the space on first use. Idempotent, and the reason sharing can start at all.
      // A bulle stays purely local until this runs, which is why it runs here and not at
      // onboarding.
      const spaceId = await ensureSpaceProvisioned(session, active);

      /**
       * Arm the sync singletons now.
       *
       * pushSpaceSnapshot() and mintInvite() both read them, and SyncInitializer will not
       * have run for this bulle: it bailed at boot precisely because there was no spaceId
       * yet. Without this the space would be provisioned and then pushed to by nobody, and
       * the invite would still point at an empty bulle. An owner is its own root node,
       * matching activateSync.
       */
      if (!isSyncActive()) initSync({ session, spaceId, rootNodeId: active.rootNodeId ?? active.id });

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
      // Mint success used to leave the link only on screen — users expected the clipboard
      // already filled. Copy outside the mint try: a clipboard failure must not pretend the
      // invite itself failed after the link and QR are already live.
      try {
        await Clipboard.setStringAsync(minted);
        setCopied(true);
      } catch (error) {
        console.warn('[invite] clipboard copy failed', error);
      }
    } catch (error) {
      console.warn('[invite] mint failed', error);
      setNotice(t('settings.inviteFailed'));
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
  /**
   * Revocation is destructive and cannot be undone by re-inviting the same link (the cap is
   * rotated out), so it asks first and says plainly what it does and does not do.
   */
  const confirmRevoke = (assignment: { id: string; subjectUserId: string }) => {
    Alert.alert(t('settings.revoke'), t('settings.revokeConfirm'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('settings.revoke'),
        style: 'destructive',
        onPress: () => {
          void revokeCollaborator(assignment.subjectUserId, assignment.id).then(({ evicted }) =>
            // Honest either way: a roster-only drop still cuts the server, but their existing
            // copy can outlive it, and saying "done" would overstate what happened.
            Alert.alert(t(evicted ? 'settings.revokeDone' : 'settings.revokePartial')),
          );
        },
      },
    ]);
  };

  const qrSize = Math.max(250, Math.min(320, Math.round(width - 64)));

  return (
    // Stack.Screen is a SIBLING of Screen, not a child: nested inside the ScrollView's
    // content container its options never reach the navigator and the header stays bare.
    <>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <HeaderBackButton label={t('common.back')} onPress={() => goBack('/more')} />
          ),
        }}
      />
      <Screen>
      <Text variant="display">{t('settings.invite')}</Text>
      <Text variant="body" color="inkSoft">
        {t('settings.inviteBody')}
      </Text>

      {!syncReady && (
        <Text variant="caption" color="inkSoft">
          {t('settings.inviteUnavailable')}
        </Text>
      )}

      {syncReady && !link && (
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

      {/* A calm inline note, not a red alert: a share that could not start is a state to
          explain, not an error to sound. */}
      {notice && <Text variant="caption" color="inkSoft">{notice}</Text>}

      {/*
        The roster. Without it, revoking was implemented and unreachable, which is the same
        gap wearing a different hat: an owner could hand out access and had no way to take
        it back.
      */}
      {syncReady && !link && (
        <View>
          <SectionHeader title={t('settings.withAccess')} />
          {assignments.length === 0 ? (
            <Text variant="caption">{t('settings.noMembers')}</Text>
          ) : (
            assignments.map((assignment, index) => (
              <Row
                key={assignment.id}
                title={assignment.label ?? t('settings.roles.roleCoparentName')}
                subtitle={
                  roles.find((r) => r.id === assignment.roleId)
                    ? t(`settings.roles.${roles.find((r) => r.id === assignment.roleId)!.name}`)
                    : undefined
                }
                trailing={
                  <Text variant="caption" color="danger" onPress={() => confirmRevoke(assignment)}>
                    {t('settings.revoke')}
                  </Text>
                }
                divider={index < assignments.length - 1}
              />
            ))
          )}
        </View>
      )}

      {link && (
        <View style={{ gap: space[5], alignItems: 'center' }}>
          <View style={{ padding: space[4], backgroundColor: '#FFFFFF', borderRadius: 16 }}>
            <QRCode value={link} size={qrSize} ecl="L" backgroundColor="#FFFFFF" color={colors.ink} />
          </View>
          <Button label={copied ? t('settings.linkCopied') : t('settings.copyLink')} onPress={copy} block />
        </View>
      )}
      </Screen>
    </>
  );
}
