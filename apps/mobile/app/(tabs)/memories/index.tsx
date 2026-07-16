'use client';
/**
 * Souvenirs (spec §5) — the emotional retention engine and the post-birth bridge.
 *
 * Placeholder for now: it earns a tab because burying it under "More" kills it, but the
 * feature itself (photos, notes to baby, voice, milestones → the keepsake book) is V1.1.
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { EmptyState, Text } from '@bulle/ui/components';
import { Screen } from '@/components/Screen';
import { FeatureWelcomeFor, useFeatureWelcome } from '@/lib/feature-welcomes';

export default function MemoriesScreen() {
  const { t } = useTranslation();
  const welcome = useFeatureWelcome('memories');
  return (
    <Screen>
      <FeatureWelcomeFor area='memories' visible={welcome.visible} onDismiss={welcome.dismiss} />
      <Text variant="display">{t('memories.title')}</Text>
      <EmptyState glyph="souvenirs" message={t('memories.placeholder')} />
    </Screen>
  );
}
