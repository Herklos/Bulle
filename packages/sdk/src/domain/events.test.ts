import { describe, expect, it } from 'vitest';
import { daysUntilEvent, isToday, nextEvents, sortEvents, upcomingEvents } from './events.js';
import type { BulleEvent } from './types.js';

const DAY = 24 * 60 * 60 * 1000;
const now = new Date('2026-07-16T10:00:00.000Z').getTime();

const event = (id: string, at: string): BulleEvent => ({
  id,
  title: id,
  kind: 'echo',
  at,
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
});

describe('upcomingEvents', () => {
  it('drops past events and sorts the rest', () => {
    const events = [
      event('later', new Date(now + 5 * DAY).toISOString()),
      event('past', new Date(now - 2 * DAY).toISOString()),
      event('soon', new Date(now + 1 * DAY).toISOString()),
    ];
    expect(upcomingEvents(events, now).map((e) => e.id)).toEqual(['soon', 'later']);
  });

  it('keeps an event happening right now', () => {
    // An appointment at this exact minute is the most relevant thing on the screen, not
    // something to hide because the timestamp has technically passed.
    expect(upcomingEvents([event('now', new Date(now).toISOString())], now)).toHaveLength(1);
  });
});

describe('nextEvents', () => {
  it('returns at most 2 by default (§5.1)', () => {
    const events = [1, 2, 3, 4].map((n) => event(`e${n}`, new Date(now + n * DAY).toISOString()));
    expect(nextEvents(events, now)).toHaveLength(2);
    expect(nextEvents(events, now).map((e) => e.id)).toEqual(['e1', 'e2']);
  });

  it('returns [] rather than throwing when there is nothing', () => {
    expect(nextEvents([], now)).toEqual([]);
  });
});

describe('daysUntilEvent', () => {
  it('counts calendar days, not 24h blocks', () => {
    // An appointment at 09:00 tomorrow is "tomorrow", even though it is 23 hours away.
    const tomorrowMorning = event('t', new Date(now + 23 * 60 * 60 * 1000).toISOString());
    expect(daysUntilEvent(tomorrowMorning, now)).toBe(1);
  });

  it('is 0 for later today', () => {
    const laterToday = event('t', new Date(now + 3 * 60 * 60 * 1000).toISOString());
    expect(daysUntilEvent(laterToday, now)).toBe(0);
    expect(isToday(laterToday, now)).toBe(true);
  });
});

describe('sortEvents', () => {
  it('does not mutate its input', () => {
    const events = [event('b', '2026-08-01T00:00:00.000Z'), event('a', '2026-07-01T00:00:00.000Z')];
    sortEvents(events);
    expect(events.map((e) => e.id)).toEqual(['b', 'a']);
  });
});
