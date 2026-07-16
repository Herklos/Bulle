import { describe, expect, it } from 'vitest';
import {
  daysUntilEvent,
  eventsInWeek,
  eventWeekSA,
  isToday,
  nextEvents,
  sortEvents,
  upcomingEvents,
} from './events.js';
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

describe('eventWeekSA', () => {
  // DPA 41 SA on 2027-01-01. An event exactly 41 weeks earlier is week 0; each week later
  // advances one week.
  const dueDate = '2027-01-01T00:00:00.000Z';

  it('places an event on the DPA at 41 SA', () => {
    expect(eventWeekSA(event('e', dueDate), dueDate, 41)).toBe(41);
  });

  it('places an event 29 weeks before the DPA at 12 SA', () => {
    const at = new Date(Date.parse(dueDate) - 29 * 7 * DAY).toISOString();
    expect(eventWeekSA(event('e', at), dueDate, 41)).toBe(12);
  });

  it('floors within the week rather than rounding to the next one', () => {
    // 3 days into week 12 is still week 12.
    const at = new Date(Date.parse(dueDate) - (29 * 7 - 3) * DAY).toISOString();
    expect(eventWeekSA(event('e', at), dueDate, 41)).toBe(12);
  });

  it('groups by week', () => {
    const inWeek12 = new Date(Date.parse(dueDate) - 29 * 7 * DAY).toISOString();
    const inWeek13 = new Date(Date.parse(dueDate) - 28 * 7 * DAY).toISOString();
    const list = [event('a', inWeek13), event('b', inWeek12)];
    expect(eventsInWeek(list, 12, dueDate, 41).map((e) => e.id)).toEqual(['b']);
    expect(eventsInWeek(list, 13, dueDate, 41).map((e) => e.id)).toEqual(['a']);
  });
});
