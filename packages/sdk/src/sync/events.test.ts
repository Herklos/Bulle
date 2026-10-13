import { beforeEach, describe, expect, it, vi } from 'vitest';
import { configurePlatform, stableStringify } from '@drakkar.software/starfish-protocol';
import { buildAuthHeaders, parseSpaceChange } from './events.js';

/**
 * Distinct from bare `btoa` output. `getBase64()` falls back to `globalThis.btoa`
 * when no provider is configured, so an unconfigured test cannot tell that path
 * from a direct `btoa` call. The sentinel is installed with `configurePlatform`.
 */
const SENTINEL = 'sentinel-b64:';

const { getSyncBase, signRequest } = vi.hoisted(() => ({
  getSyncBase: vi.fn(() => 'https://sync.example.test:8443'),
  signRequest: vi.fn(async () => ({
    sig: 'sig-fixed',
    ts: 1_700_000_000_000,
    nonce: 'nonce-fixed',
  })),
}));

vi.mock('@drakkar.software/dk-spaces-sdk', () => ({
  getSyncBase,
  subscribeChanges: vi.fn(),
}));

vi.mock('@drakkar.software/starfish-protocol', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@drakkar.software/starfish-protocol')>();
  return { ...actual, signRequest };
});

const base64 = {
  encode(data: Uint8Array): string {
    return SENTINEL + Buffer.from(data).toString('base64');
  },
  decode(): Uint8Array {
    return new Uint8Array();
  },
};

describe('parseSpaceChange', () => {
  it('reads a raw queue message', () => {
    const out = parseSpaceChange(
      JSON.stringify({
        params: { spaceId: 'space-1' },
        hash: 'abc',
        timestamp: 99,
        identity: 'user-1',
      }),
    );
    expect(out).toEqual({ spaceId: 'space-1', hash: 'abc', ts: 99, identity: 'user-1' });
  });

  it('reads the Whistlers rawPayload envelope', () => {
    const out = parseSpaceChange(
      JSON.stringify({
        rawPayload: {
          params: { spaceId: 'space-2' },
          hash: 'def',
          timestamp: 100,
          identity: 'user-2',
        },
      }),
    );
    expect(out).toEqual({ spaceId: 'space-2', hash: 'def', ts: 100, identity: 'user-2' });
  });

  it('prefers the outer message when params is present', () => {
    const out = parseSpaceChange(
      JSON.stringify({
        params: { spaceId: 'outer' },
        hash: 'outer-hash',
        timestamp: 1,
        rawPayload: {
          params: { spaceId: 'inner' },
          hash: 'inner-hash',
          timestamp: 2,
        },
      }),
    );
    expect(out).toEqual({
      spaceId: 'outer',
      hash: 'outer-hash',
      ts: 1,
      identity: undefined,
    });
  });

  it('returns null when spaceId is missing or falsy', () => {
    expect(parseSpaceChange('{}')).toBeNull();
    expect(parseSpaceChange(JSON.stringify({ params: {} }))).toBeNull();
    expect(parseSpaceChange(JSON.stringify({ rawPayload: {} }))).toBeNull();
    expect(parseSpaceChange(JSON.stringify({ params: { spaceId: '' } }))).toBeNull();
    expect(parseSpaceChange(JSON.stringify({ params: { spaceId: 0 } }))).toBeNull();
    expect(parseSpaceChange(JSON.stringify({ params: { spaceId: null } }))).toBeNull();
  });

  it('returns null when the JSON is malformed', () => {
    expect(parseSpaceChange('not json')).toBeNull();
    expect(parseSpaceChange('')).toBeNull();
    expect(parseSpaceChange('{')).toBeNull();
  });

  it('keeps a truthy non-string spaceId', () => {
    // Today's check is truthiness only. A number is returned as-is.
    const out = parseSpaceChange(
      JSON.stringify({ params: { spaceId: 42 }, hash: 'h', timestamp: 7 }),
    );
    expect(out).toEqual({ spaceId: 42, hash: 'h', ts: 7, identity: undefined });
  });

  it('keeps identity only when it is a string, and passes hash and ts through', () => {
    const out = parseSpaceChange(
      JSON.stringify({
        params: { spaceId: 'space-3' },
        hash: 12,
        timestamp: 'soon',
        identity: 5,
      }),
    );
    expect(out).toEqual({ spaceId: 'space-3', hash: 12, ts: 'soon', identity: undefined });
  });
});

describe('buildAuthHeaders', () => {
  beforeEach(() => {
    getSyncBase.mockReset();
    getSyncBase.mockReturnValue('https://sync.example.test:8443');
    signRequest.mockReset();
    signRequest.mockResolvedValue({
      sig: 'sig-fixed',
      ts: 1_700_000_000_000,
      nonce: 'nonce-fixed',
    });
    configurePlatform({ base64 });
  });

  it('returns the cap auth headers with a deterministic signature', async () => {
    const headers = await buildAuthHeaders({ z: 1, a: 'ok' }, 'ed-priv', 'GET', '/events?space=s');

    expect(headers).toEqual({
      Authorization: expect.stringMatching(/^Cap /),
      'X-Starfish-Sig': 'sig-fixed',
      'X-Starfish-Ts': '1700000000000',
      'X-Starfish-Nonce': 'nonce-fixed',
    });
    expect(signRequest).toHaveBeenCalledWith(
      { method: 'GET', pathAndQuery: '/events?space=s', host: 'sync.example.test:8443' },
      'ed-priv',
    );
  });

  it('base64-encodes the cap through the configurePlatform sentinel, not bare btoa', async () => {
    const cap = { z: 1, a: 'ok' };
    const capJson = '{"a":"ok","z":1}';
    expect(stableStringify(cap)).toBe(capJson);

    const headers = await buildAuthHeaders(cap, 'ed-priv', 'GET', '/events');
    const sentinelValue = SENTINEL + Buffer.from(new TextEncoder().encode(capJson)).toString('base64');

    expect(headers.Authorization).toBe(`Cap ${sentinelValue}`);
    expect(headers.Authorization).not.toBe(`Cap ${btoa(capJson)}`);
  });

  it('signs with an empty host when the sync base is not an absolute URL', async () => {
    getSyncBase.mockReturnValue('relative-base');

    await buildAuthHeaders({ a: 1 }, 'ed-priv', 'GET', '/events');

    expect(signRequest).toHaveBeenCalledWith(
      { method: 'GET', pathAndQuery: '/events', host: '' },
      'ed-priv',
    );
  });
});
