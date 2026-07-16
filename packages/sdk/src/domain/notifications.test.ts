import { describe, expect, it } from 'vitest';
import {
  DIGEST_HOUR,
  isDigestHourValid,
  isQuietHour,
  planDigest,
} from './notifications.js';

describe('quiet hours (§5.11)', () => {
  it('covers the whole night, across midnight', () => {
    // The window wraps, so a naive `h >= 21 && h < 8` is always false and lets a 3am
    // notification through. That failure would be completely silent.
    for (const hour of [21, 22, 23, 0, 1, 3, 6, 7]) {
      expect(isQuietHour(hour), `${hour}h`).toBe(true);
    }
  });

  it('leaves the day open', () => {
    for (const hour of [8, 9, 12, 17, 20]) {
      expect(isQuietHour(hour), `${hour}h`).toBe(false);
    }
  });

  it('never schedules the digest inside its own quiet window', () => {
    // Guards the constants against each other: moving DIGEST_HOUR to 7 would make the
    // policy contradict itself, and nothing else would notice.
    expect(isDigestHourValid()).toBe(true);
    expect(isQuietHour(DIGEST_HOUR)).toBe(false);
  });
});

describe('planDigest', () => {
  it('schedules the morning digest when opted in', () => {
    expect(planDigest({ notificationsEnabled: true, paused: false })).toEqual({
      enabled: true,
      hour: 8,
      minute: 0,
    });
  });

  it('schedules nothing when not opted in — opt-in, never opt-out', () => {
    expect(planDigest({ notificationsEnabled: false, paused: false }).enabled).toBe(false);
  });

  it('lets Pause override the opt-in', () => {
    // Someone who paused after a loss has not withdrawn consent to notifications in
    // general. They said not now, and the schedule must be empty whatever the toggle says.
    // A scheduled "Semaine 24" firing the week after a loss is the catastrophic case.
    expect(planDigest({ notificationsEnabled: true, paused: true }).enabled).toBe(false);
  });
});
