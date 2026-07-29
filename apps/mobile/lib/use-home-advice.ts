'use client';
/**
 * One "did you know?" tip on Today, picked from `advice.items` (spec-adjacent content, see
 * `i18n/fr.ts`).
 *
 * Picked once on mount and kept in state — recomputing on every re-render would make it
 * reshuffle while the screen sits still, which `suggest.ts` already flags as reading broken
 * for the focus card. Re-rolls when the app comes back to the foreground, and never repeats
 * the tip just shown.
 */
import { useEffect, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { useTranslation } from 'react-i18next';
import { pickAdviceIndex } from './pick-advice-index';

export function useHomeAdvice() {
  const { t } = useTranslation();
  const items = t('advice.items', { returnObjects: true }) as string[];
  const eyebrow = t('advice.eyebrow');
  const indexRef = useRef<number | null>(null);
  const [index, setIndex] = useState(() => pickAdviceIndex(items.length, null));
  indexRef.current = index;

  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') setIndex(pickAdviceIndex(items.length, indexRef.current));
    });
    return () => sub.remove();
  }, [items.length]);

  const next = () => setIndex(pickAdviceIndex(items.length, indexRef.current));

  return { tip: items[index] ?? '', eyebrow, next };
}
