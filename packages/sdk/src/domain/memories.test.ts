import { describe, expect, it } from 'vitest';
import {
  isMemoryEmpty,
  memoriesForWeek,
  memoryPreview,
  sortMemories,
  stampMemoryFromDate,
  type MemoryDateStamp,
} from './memories.js';
import { currentWeekSG } from './pregnancy.js';
import type { Memory } from './types.js';

const memory = (id: string, over: Partial<Memory> = {}): Memory => ({
  id,
  kind: 'note',
  createdAt: '2026-07-01T10:00:00.000Z',
  updatedAt: '2026-07-01T10:00:00.000Z',
  ...over,
});

const DUE = '2027-02-11T00:00:00.000Z';
const NOW = Date.parse('2026-07-16T12:00:00.000Z');

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
});

describe('memoriesForWeek', () => {
  it('keeps only the given week', () => {
    const list = [memory('a', { week: 12 }), memory('b', { week: 13 })];
    expect(memoriesForWeek(list, 12).map((m) => m.id)).toEqual(['a']);
  });

  it('excludes unstamped memories rather than lumping them into every week', () => {
    expect(memoriesForWeek([memory('a')], 12)).toEqual([]);
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
});

describe('stampMemoryFromDate', () => {
  it('stamps week from a past day via currentWeekSG', () => {
    const past = new Date('2026-06-01T10:00:00.000Z');
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, past, NOW);
    expect(stamp.week).toBe(currentWeekSG(DUE, past.getTime()));
    expect(stamp.createdAt).toBe(past.toISOString());
    expect(stamp.updatedAt).toBe(stamp.createdAt);
  });

  it('stamps today the same as injecting now', () => {
    const today = new Date(NOW);
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, today, NOW);
    expect(stamp.week).toBe(currentWeekSG(DUE, NOW));
    expect(stamp.createdAt).toBe(today.toISOString());
  });

  it('clamps a future pick to now', () => {
    const future = new Date(NOW + 7 * 24 * 60 * 60 * 1000);
    const stamp: MemoryDateStamp = stampMemoryFromDate(DUE, future, NOW);
    expect(stamp.createdAt).toBe(new Date(NOW).toISOString());
    expect(stamp.week).toBe(currentWeekSG(DUE, NOW));
  });
});
