'use client';
/**
 * Readiness, wired to the stores.
 *
 * The snapshot round-trip is what makes monotonicity work across launches: compute → persist
 * the high-water mark → feed it back as `previous` next time. `saveSnapshot` skips identical
 * writes, so this settles after one extra render instead of looping.
 */
import { useEffect, useMemo } from 'react';
import { computeReadiness, type Readiness } from '@bulle/sdk';
import { usePlanStore } from '@/store/usePlanStore';
import { useBulleStore } from '@/store/useBulleStore';
import { useReadinessStore } from '@/store/useReadinessStore';

export function useReadiness(): Readiness | null {
  const tasks = usePlanStore((s) => s.tasks);
  const bulle = useBulleStore((s) => s.bulle);
  const snapshot = useReadinessStore((s) => s.snapshot);

  const readiness = useMemo(
    () => (bulle ? computeReadiness(tasks, bulle.profile, snapshot ?? undefined) : null),
    [tasks, bulle, snapshot],
  );

  useEffect(() => {
    if (readiness) useReadinessStore.getState().saveSnapshot(readiness.snapshot);
  }, [readiness]);

  return readiness;
}
