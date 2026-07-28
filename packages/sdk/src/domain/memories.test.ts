import { describe, expect, it } from 'vitest';
import {
  calendarDayUtcNoon,
  isMemoryEmpty,
  memoriesForWeek,
  memoryPreview,
  sortMemories,
  stampMemoryFromDate,
  type MemoryDateStamp,
} from './memories.js';
import {
  currentWeekSA,
  currentWeekSG,
  DPA_WEEKS_SA,
  SA_TO_SG_OFFSET,
} from './pregnancy.js';
import type { Memory } from './types.js';

const memory = (id: string, over: Partial<Memory> = {}): Memory => ({
  id,
  kind: 'note',
  createdAt: '2026-07-01T10:00:00.000Z',
  updatedAt: '2026-07-01T10:00:00.000Z',
  ...over,
});

const DAY = 24 * 60 * 60 * 1000;
/** DPA at SA 41 — chosen so mid-pregnancy dates land on round SA numbers. */
const DUE = '2027-02-11T00:00:00.000Z';
const DUE_MS = Date.parse(DUE);
/** ~20 SA into the pregnancy (21 weeks before DPA). */
const NOW = DUE_MS - 21 * 7 * DAY;

describe('sortMemories', () => {
  it('puts the newest first', () => {
    const list = [
      memory('old', { createdAt: '2026-07-01T10:00:00.000Z' }),
      memory('new', { createdAt: '2026-07-10T10:00:00.000Z' }),
    ];
    expect(sortMemories(list).map((m) => m.id)).toEqual(['new', 'old']);
  });

  it('does not mutate its input', () => {
    const list = [
      memory('old', { createdAt: '2026-07-01T10:00:00.000Z' }),
      memory('new', { createdAt: '2026-07-10T10:00:00.000Z' }),
    ];
    sortMemories(list);
    expect(list.map((m) => m.id)).toEqual(['old', 'new']);
  });

  it('orders equal timestamps stably by leaving relative order alone for ties', () => {
    const a = memory('a', { createdAt: '2026-07-01T10:00:00.000Z' });
    const b = memory('b', { createdAt: '2026-07-01T10:00:00.000Z' });
    expect(sortMemories([a, b]).map((m) => m.id)).toEqual(['a', 'b']);
  });
});

describe('memoriesForWeek', () => {
  it('keeps only the given week SA', () => {
    const list = [memory('a', { week: 12 }), memory('b', { week: 13 })];
    expect(memoriesForWeek(list, 12).map((m) => m.id)).toEqual(['a']);
  });

  it('excludes unstamped memories rather than lumping them into every week', () => {
    expect(memoriesForWeek([memory('a')], 12)).toEqual([]);
  });

  it('returns newest-first within a week', () => {
    const list = [
      memory('old', { week: 20, createdAt: '2026-07-01T10:00:00.000Z' }),
      memory('new', { week: 20, createdAt: '2026-07-10T10:00:00.000Z' }),
      memory('other', { week: 21, createdAt: '2026-07-11T10:00:00.000Z' }),
    ];
    expect(memoriesForWeek(list, 20).map((m) => m.id)).toEqual(['new', 'old']);
  });

  it('matches Chemin SA 1 without converting to SG', () => {
    // Old bug: Chemin queried shown - 2 (= -1 at SA 1) while stamps lived at SG 0.
    const list = [memory('early', { week: 1 })];
    expect(memoriesForWeek(list, 1).map((m) => m.id)).toEqual(['early']);
    expect(memoriesForWeek(list, 0)).toEqual([]);
  });

  it('does not treat an SG stamp as the Chemin SA week', () => {
    // A memory wrongly stamped SG 18 must not appear on Chemin SA 18.
    const wronglySg = memory('sg', { week: 18 });
    expect(memoriesForWeek([wronglySg], 20)).toEqual([]);
  });
});

describe('memoryPreview', () => {
  it('prefers the title', () => {
    expect(memoryPreview(memory('a', { title: 'First kick', body: 'long body' }))).toBe(
      'First kick',
    );
  });

  it('falls back to the body, because a row reading "Note" identifies nothing', () => {
    expect(memoryPreview(memory('a', { body: 'We heard the heartbeat today' }))).toBe(
      'We heard the heartbeat today',
    );
  });

  it('collapses newlines so a multi-line note stays one row', () => {
    expect(memoryPreview(memory('a', { body: 'line one\n\nline two' }))).toBe('line one line two');
  });

  it('truncates with an ellipsis', () => {
    const preview = memoryPreview(memory('a', { body: 'x'.repeat(200) }), 10);
    expect(preview).toHaveLength(10);
    expect(preview.endsWith('…')).toBe(true);
  });

  it('is empty rather than undefined when there is nothing to show', () => {
    expect(memoryPreview(memory('a'))).toBe('');
  });
});

describe('isMemoryEmpty', () => {
  it('treats whitespace as empty', () => {
    expect(isMemoryEmpty({ title: '   ', body: '\n' })).toBe(true);
  });

  it('is not empty with a body alone', () => {
    expect(isMemoryEmpty({ body: 'something' })).toBe(false);
  });

  it('is not empty with a title alone', () => {
    expect(isMemoryEmpty({ title: 'Kick', body: '  ' })).toBe(false);
  });
});

describe('calendarDayUtcNoon', () => {
  it('anchors on the local calendar day, not the picker’s midnight instant', () => {
    // Local midnight in a positive UTC offset is the previous UTC day — noon keeps the Y-M-D.
    const localMidnight = new Date(2026, 6, 28, 0, 0, 0, 0);
    const noon = calendarDayUtcNoon(localMidnight);
    const asUtc = new Date(noon);
    expect(asUtc.getUTCFullYear()).toBe(2026);
    expect(asUtc.getUTCMonth()).toBe(6);
    expect(asUtc.getUTCDate()).toBe(28);
    expect(asUtc.getUTCHours()).toBe(12);
  });

  it('uses the same local day for evening picks', () => {
    const evening = new Date(2026, 6, 28, 23, 45, 0, 0);
    const asUtc = new Date(calendarDayUtcNoon(evening));
    expect(asUtc.getUTCDate()).toBe(28);
    expect(asUtc.getUTCHours()).toBe(12);
  });

  it('survives month and year boundaries', () => {
    const nye = new Date(2026, 11, 31, 0, 0, 0, 0);
    const asUtc = new Date(calendarDayUtcNoon(nye));
    expect(asUtc.getUTCFullYear()).toBe(2026);
    expect(asUtc.getUTCMonth()).toBe(11);
    expect(asUtc.getUTCDate()).toBe(31);
  });
});

describe('stampMemoryFromDate', () => {
  it('stamps week SA from a past day (not SG — that was off by two unmarked)', () => {
    const past = new Date(NOW - 14 * DAY);
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, past, NOW);
    const dayMs = calendarDayUtcNoon(past);
    expect(stamp.week).toBe(currentWeekSA(DUE, dayMs));
    expect(stamp.week).not.toBe(currentWeekSG(DUE, dayMs));
    expect(stamp.createdAt).toBe(new Date(dayMs).toISOString());
    expect(stamp.updatedAt).toBe(stamp.createdAt);
  });

  it('is exactly SA_TO_SG_OFFSET above SG when both scales are past the early clamp', () => {
    const mid = new Date(NOW);
    const stamp = stampMemoryFromDate(DUE, mid, NOW);
    const sg = currentWeekSG(DUE, Math.min(calendarDayUtcNoon(mid), NOW));
    expect(stamp.week).toBe(sg + SA_TO_SG_OFFSET);
  });

  it('stamps today the same SA the rest of the app shows', () => {
    const today = new Date(NOW);
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, today, NOW);
    expect(stamp.week).toBe(currentWeekSA(DUE, NOW));
  });

  it('clamps a future pick to now', () => {
    const future = new Date(NOW + 7 * DAY);
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, future, NOW);
    expect(stamp.createdAt).toBe(new Date(NOW).toISOString());
    expect(stamp.week).toBe(currentWeekSA(DUE, NOW));
  });

  it('does not drop a local-midnight pick onto the previous UTC day', () => {
    // FR / UTC+2: local midnight is the previous UTC calendar day without noon anchoring.
    const localMidnight = new Date(2026, 6, 16, 0, 0, 0, 0);
    // Use a now far enough ahead that clamping does not override the picked day.
    const later = Date.parse('2026-08-01T12:00:00.000Z');
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, localMidnight, later);
    expect(stamp.week).toBe(currentWeekSA(DUE, calendarDayUtcNoon(localMidnight)));
    expect(new Date(stamp.createdAt).getUTCDate()).toBe(16);
  });

  it('keeps the same SA for local midnight and local afternoon on the same day', () => {
    const later = Date.parse('2026-08-01T12:00:00.000Z');
    const midnight = new Date(2026, 6, 16, 0, 0, 0, 0);
    const afternoon = new Date(2026, 6, 16, 15, 30, 0, 0);
    expect(stampMemoryFromDate(DUE, midnight, later).week).toBe(
      stampMemoryFromDate(DUE, afternoon, later).week,
    );
  });

  it('stamps SA 1 in early pregnancy (SG would clamp to 0 and look empty/wrong)', () => {
    // 40 weeks before DPA → SA 1.
    const atSa1 = DUE_MS - 40 * 7 * DAY;
    const stamp = stampMemoryFromDate(DUE, new Date(atSa1), atSa1 + DAY);
    expect(stamp.week).toBe(1);
    expect(currentWeekSG(DUE, atSa1)).toBe(0);
    expect(stamp.week).not.toBe(currentWeekSG(DUE, atSa1));
  });

  it('stamps the DPA week as DPA_WEEKS_SA', () => {
    const stamp = stampMemoryFromDate(DUE, new Date(DUE_MS), DUE_MS + DAY);
    expect(stamp.week).toBe(DPA_WEEKS_SA);
  });

  it.each([
    [1, 40],
    [12, 29],
    [20, 21],
    [28, 13],
    [41, 0],
  ] as const)('stamps SA %i when %i weeks remain before the DPA', (sa, weeksBeforeDue) => {
    const at = DUE_MS - weeksBeforeDue * 7 * DAY;
    const stamp = stampMemoryFromDate(DUE, new Date(at), at + DAY);
    expect(stamp.week).toBe(sa);
    expect(stamp.week).toBe(currentWeekSA(DUE, calendarDayUtcNoon(new Date(at))));
  });
});

/**
 * The contract the Chemin and Aujourd'hui rely on: stamp with SA, look up with the same SA.
 * Regresses the SG stamp + SA→SG query pair that made "Semaine N" disagree with the fil.
 */
describe('Chemin / Today week contract', () => {
  it('a souvenir written "this week" appears under the Chemin SA heading', () => {
    const stamp = stampMemoryFromDate(DUE, new Date(NOW), NOW);
    const shownSa = currentWeekSA(DUE, NOW);
    expect(stamp.week).toBe(shownSa);

    const saved: Memory = memory('m1', {
      week: stamp.week,
      createdAt: stamp.createdAt,
      updatedAt: stamp.updatedAt,
      title: 'Kick',
    });
    expect(memoriesForWeek([saved], shownSa).map((m) => m.id)).toEqual(['m1']);
  });

  it('a souvenir from two weeks ago appears under that earlier SA, not under SG', () => {
    const then = NOW - 14 * DAY;
    const stamp = stampMemoryFromDate(DUE, new Date(then), NOW);
    const thenSa = currentWeekSA(DUE, calendarDayUtcNoon(new Date(then)));
    const thenSg = currentWeekSG(DUE, calendarDayUtcNoon(new Date(then)));

    expect(stamp.week).toBe(thenSa);
    expect(stamp.week).toBe(thenSg + SA_TO_SG_OFFSET);

    const saved = memory('past', { week: stamp.week, createdAt: stamp.createdAt });
    expect(memoriesForWeek([saved], thenSa)).toHaveLength(1);
    // Looking up by SG (the old Chemin conversion) must miss it.
    expect(memoriesForWeek([saved], thenSg)).toHaveLength(0);
  });

  it('does not place a mid-pregnancy souvenir two weeks early on the fil', () => {
    const stamp = stampMemoryFromDate(DUE, new Date(NOW), NOW);
    const sa = stamp.week;
    const saved = memory('now', { week: sa });
    // Old SG stamp would have been sa - 2 and shown on the wrong Chemin node.
    expect(memoriesForWeek([saved], sa - SA_TO_SG_OFFSET)).toHaveLength(0);
    expect(memoriesForWeek([saved], sa)).toHaveLength(1);
  });

  it('lists several souvenirs from the same SA together on that Chemin card', () => {
    const sa = currentWeekSA(DUE, NOW);
    // Same local calendar day (noon anchoring), two writes — newest first on the card.
    const day = new Date(NOW);
    const a = stampMemoryFromDate(DUE, day, NOW);
    const bCreated = new Date(Math.min(calendarDayUtcNoon(day), NOW) + 1000).toISOString();
    expect(a.week).toBe(sa);

    const list = [
      memory('a', { week: a.week, createdAt: a.createdAt, title: 'A' }),
      memory('b', { week: sa, createdAt: bCreated, title: 'B' }),
      memory('other', { week: sa + 1, createdAt: bCreated }),
    ];
    expect(memoriesForWeek(list, sa).map((m) => m.id)).toEqual(['b', 'a']);
  });
});
