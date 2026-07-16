'use client';
/**
 * First-visit welcomes, one per feature area.
 *
 * "Seen" is device-local (the per-bulle KV), never synced: it describes what THIS person on
 * THIS device has read. Syncing it would mean one co-parent's first visit silently consumes
 * the other's.
 *
 * GRIEF-SAFETY (§3.1): every welcome is suppressed in Pause mode. They are cheerful by
 * nature — an orb, an eyebrow, a promise about the weeks ahead — which is exactly what must
 * not appear on the worst day of someone's life. The gate is here, once, rather than trusted
 * to each caller.
 */
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { FeatureWelcome, type FeatureWelcomeBullet } from '@bulle/ui/components';
import { getStorage, readCollection, writeCollection } from '@bulle/ui/utils/kv-storage';
import { pregnancyProgress } from '@bulle/sdk';
import { useBulleStore } from '@/store/useBulleStore';
import { useNow } from '@/lib/use-now';

export type WelcomeKey = 'today' | 'journey' | 'plan' | 'memories';

const SEEN_KEY = 'welcomesSeen';

type SeenMap = Partial<Record<WelcomeKey, boolean>>;

function readSeen(): SeenMap {
  return readCollection<SeenMap>(SEEN_KEY) ?? {};
}

function markSeen(key: WelcomeKey): void {
  if (!getStorage()) return;
  writeCollection(SEEN_KEY, { ...readSeen(), [key]: true });
}

/** Bullets per area. Glyphs only from our own set — no icon library (§8.1). */
const BULLETS: Record<WelcomeKey, { glyph: FeatureWelcomeBullet['glyph']; key: string }[]> = {
  today: [
    { glyph: 'today', key: 'oneThing' },
    { glyph: 'leaf', key: 'noShame' },
    { glyph: 'members', key: 'together' },
  ],
  journey: [
    { glyph: 'chemin', key: 'week' },
    { glyph: 'calendar', key: 'milestones' },
    { glyph: 'pause', key: 'pause' },
  ],
  plan: [
    { glyph: 'plan', key: 'projects' },
    { glyph: 'stamp', key: 'admin' },
    { glyph: 'check', key: 'essentials' },
  ],
  memories: [
    { glyph: 'souvenirs', key: 'gather' },
    { glyph: 'link', key: 'private' },
    { glyph: 'leaf', key: 'later' },
  ],
};

/**
 * Shows the welcome for `area` once, ever.
 *
 * Render it anywhere in the screen; it is a Modal, so placement does not matter.
 */
export function useFeatureWelcome(area: WelcomeKey) {
  const [visible, setVisible] = useState(false);
  const bulle = useBulleStore((s) => s.bulle);
  const paused = bulle?.pause.paused ?? false;
  /**
   * FOCUS IS LOAD-BEARING, not an optimisation.
   *
   * A tab navigator MOUNTS every tab screen, so a plain mount effect fires all four
   * welcomes on the first launch and the last to mount wins the Modal stack — a brand-new
   * user is greeted by the Souvenirs welcome for a tab they have never opened.
   *
   * useFocusEffect (from expo-router, so no extra dependency) runs only for the tab
   * actually on screen.
   */
  useFocusEffect(
    useCallback(() => {
      // Never in Pause. Never before storage is open — readSeen() would return {} and the
      // welcome would re-show on every cold start until the KV caught up.
      if (paused || !getStorage() || !bulle) return;
      if (!readSeen()[area]) setVisible(true);
    }, [area, paused, bulle]),
  );

  const dismiss = useCallback(() => {
    markSeen(area);
    setVisible(false);
  }, [area]);

  return { visible, dismiss };
}

export function FeatureWelcomeFor({
  area,
  visible,
  onDismiss,
}: {
  area: WelcomeKey;
  visible: boolean;
  onDismiss: () => void;
}) {
  const { t } = useTranslation();
  const now = useNow();
  const bulle = useBulleStore((s) => s.bulle);

  const bullets: FeatureWelcomeBullet[] = BULLETS[area].map((b) => ({
    glyph: b.glyph,
    text: t(`welcome.${area}.bullets.${b.key}`),
  }));

  return (
    <FeatureWelcome
      visible={visible}
      onDismiss={onDismiss}
      eyebrow={t(`welcome.${area}.eyebrow`)}
      title={t(`welcome.${area}.title`)}
      tagline={t(`welcome.${area}.tagline`)}
      bullets={bullets}
      primaryLabel={t('welcome.start')}
      onPrimary={onDismiss}
      closeLabel={t('common.close')}
      // The orb matches where the reader actually is, so the welcome does not show a
      // stranger's pregnancy.
      trimesterProgress={bulle ? pregnancyProgress(bulle.profile.dueDate, now) : 0.4}
    />
  );
}
