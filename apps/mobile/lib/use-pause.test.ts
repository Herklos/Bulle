/**
 * enterPause must purge scheduled notifications before writing paused: true. If the app is
 * killed between the two steps, a live schedule with a paused flag is the catastrophic case.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Bulle, PauseState } from '@bulle/sdk';

const { cancelAllScheduledNotificationsAsync, bulleStore } = vi.hoisted(() => {
  let bulle: Bulle | null = null;

  function applySetPause(pause: PauseState) {
    if (!bulle) return;
    bulle = { ...bulle, pause, updatedAt: new Date().toISOString() };
  }

  const setPause = vi.fn(applySetPause);

  return {
    cancelAllScheduledNotificationsAsync: vi.fn(),
    bulleStore: {
      getBulle: () => bulle,
      setBulle: (next: Bulle | null) => {
        bulle = next;
      },
      setPause,
      applySetPause,
      reset: () => {
        bulle = null;
        setPause.mockClear();
        setPause.mockImplementation(applySetPause);
      },
    },
  };
});

vi.mock('expo-notifications', () => ({
  cancelAllScheduledNotificationsAsync,
}));

vi.mock('@/store/useBulleStore', () => ({
  useBulleStore: {
    getState: () => ({
      bulle: bulleStore.getBulle(),
      setPause: bulleStore.setPause,
      setBulle: bulleStore.setBulle,
    }),
  },
}));

import * as Notifications from 'expo-notifications';
import { enterPause } from '@/lib/use-pause';

function seedBulle(): Bulle {
  const bulle: Bulle = {
    id: 'bulle-test',
    name: 'Notre bulle',
    profile: {
      dueDate: '2026-06-01',
      firstBaby: true,
      companionship: 'couple',
    },
    pause: { paused: false },
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
  };
  bulleStore.setBulle(bulle);
  return bulle;
}

describe('enterPause', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    bulleStore.reset();
    cancelAllScheduledNotificationsAsync.mockResolvedValue(undefined);
  });

  it('cancels scheduled notifications before setPause({ paused: true })', async () => {
    seedBulle();
    const callOrder: string[] = [];

    vi.mocked(Notifications.cancelAllScheduledNotificationsAsync).mockImplementation(async () => {
      callOrder.push('cancel');
    });

    bulleStore.setPause.mockImplementation((pause: PauseState) => {
      callOrder.push('setPause');
      bulleStore.applySetPause(pause);
    });

    await enterPause();

    expect(callOrder).toEqual(['cancel', 'setPause']);
    expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalledOnce();
    expect(bulleStore.getBulle()?.pause.paused).toBe(true);
    expect(bulleStore.setPause).toHaveBeenCalledWith(
      expect.objectContaining({ paused: true, pausedAt: expect.any(String) }),
    );
  });

  it('does not persist paused state without a seeded bulle', async () => {
    await enterPause();

    expect(Notifications.cancelAllScheduledNotificationsAsync).toHaveBeenCalledOnce();
    expect(bulleStore.setPause).toHaveBeenCalledWith(
      expect.objectContaining({ paused: true, pausedAt: expect.any(String) }),
    );
    expect(bulleStore.getBulle()).toBeNull();
  });
});
