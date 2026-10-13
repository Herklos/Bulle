/**
 * The pulled bulle singleton is peer content. It has to pass bulleSchema before setBulle.
 * A failed parse must not write, must not commit the push baseline, and must warn with
 * issue paths only.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { stableStringify, type Bulle } from '@bulle/sdk';

const { bulleStore } = vi.hoisted(() => {
  let bulle: Bulle | null = null;
  const setBulle = vi.fn((next: Bulle | null) => {
    bulle = next;
  });
  return {
    bulleStore: {
      getBulle: () => bulle,
      setBulle,
      reset: () => {
        bulle = null;
        setBulle.mockClear();
      },
    },
  };
});

vi.mock('@/store/useBulleStore', () => ({
  useBulleStore: {
    getState: () => ({
      bulle: bulleStore.getBulle(),
      setBulle: bulleStore.setBulle,
    }),
  },
}));

// space-sync imports the registry at module scope. The registry pulls the stores, and
// those pull expo-sqlite, which the node runner cannot parse. This test only needs the
// singleton path.
vi.mock('@/lib/collection-registry', () => ({
  COLLECTIONS: [],
}));

import { applyPulledBulle, lastPushedBulleJson, resetDirtyPushBaseline } from './space-sync';

/** Required fields only. Pins the older shape bulleSchema accepts today. */
function olderBulle(): Bulle {
  return {
    id: 'bulle-older',
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
}

function validBulle(): Bulle {
  return {
    id: 'bulle-valid',
    name: 'Notre bulle',
    profile: {
      dueDate: '2026-06-01',
      country: 'FR',
      dueDateProvisional: true,
      firstBaby: false,
      companionship: 'solo',
      multiples: false,
      gentle: true,
      sensitive: true,
    },
    pause: { paused: true, pausedAt: '2026-03-01T00:00:00.000Z' },
    birthDate: '2026-05-20',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-04-01T00:00:00.000Z',
  };
}

describe('applyPulledBulle', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    bulleStore.reset();
    resetDirtyPushBaseline();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('writes a valid singleton through the pure setter and commits the baseline', () => {
    const local = olderBulle();
    bulleStore.setBulle(local);
    bulleStore.setBulle.mockClear();

    const pulled = validBulle();
    expect(applyPulledBulle(pulled)).toBe(true);
    expect(bulleStore.setBulle).toHaveBeenCalledTimes(1);
    expect(bulleStore.setBulle).toHaveBeenCalledWith(pulled);
    expect(bulleStore.getBulle()).toEqual(pulled);
    expect(lastPushedBulleJson()).toBe(stableStringify(pulled));
    expect(console.warn).not.toHaveBeenCalled();
  });

  it('keeps the store and the baseline when the singleton is malformed', () => {
    const local = validBulle();
    bulleStore.setBulle(local);
    applyPulledBulle(local);
    bulleStore.setBulle.mockClear();
    const baseline = lastPushedBulleJson();

    const rejectedToken = 'not-a-mode';
    const malformed = {
      id: 'bulle-bad',
      name: 'Notre bulle',
      profile: {
        dueDate: '2026-06-01',
        firstBaby: true,
        companionship: rejectedToken,
      },
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };

    expect(applyPulledBulle(malformed)).toBe(false);
    expect(bulleStore.setBulle).not.toHaveBeenCalled();
    expect(bulleStore.getBulle()).toEqual(local);
    expect(lastPushedBulleJson()).toBe(baseline);

    expect(console.warn).toHaveBeenCalledTimes(1);
    const [message, paths] = vi.mocked(console.warn).mock.calls[0] ?? [];
    expect(message).toBe('[space-sync] pulled bulle rejected');
    expect(paths).toEqual(expect.arrayContaining(['profile.companionship', 'pause']));
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain(rejectedToken);
    expect(JSON.stringify(vi.mocked(console.warn).mock.calls)).not.toContain('bulle-bad');
  });

  it('accepts the older shape bulleSchema still parses', () => {
    const current = validBulle();
    bulleStore.setBulle(current);
    bulleStore.setBulle.mockClear();

    const older = olderBulle();
    expect(applyPulledBulle(older)).toBe(true);
    expect(bulleStore.setBulle).toHaveBeenCalledWith(older);
    expect(bulleStore.getBulle()).toEqual(older);
    expect(bulleStore.getBulle()?.profile).not.toHaveProperty('country');
    expect(bulleStore.getBulle()).not.toHaveProperty('birthDate');
    expect(lastPushedBulleJson()).toBe(stableStringify(older));
    expect(console.warn).not.toHaveBeenCalled();
  });
});
