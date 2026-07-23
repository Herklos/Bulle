import { describe, expect, it } from 'vitest';
import { isPlaceholderSyncBase, isSyncConfigured, PLACEHOLDER_SYNC_BASE } from '@/lib/config';

describe('isPlaceholderSyncBase', () => {
  it('recognises the fiction host', () => {
    expect(isPlaceholderSyncBase(PLACEHOLDER_SYNC_BASE)).toBe(true);
  });

  it('rejects a real LAN harness', () => {
    expect(isPlaceholderSyncBase('http://192.168.1.10:8788')).toBe(false);
  });
});

describe('isSyncConfigured', () => {
  it('is false when the env is unset', () => {
    expect(isSyncConfigured(undefined)).toBe(false);
  });

  it('is false when the env is empty', () => {
    expect(isSyncConfigured('')).toBe(false);
  });

  it('is false when the env is the placeholder', () => {
    expect(isSyncConfigured(PLACEHOLDER_SYNC_BASE)).toBe(false);
  });

  it('is true for a real Starfish host', () => {
    expect(isSyncConfigured('http://192.168.1.10:8788')).toBe(true);
  });
});
