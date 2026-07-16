/**
 * Tests for lib/identity.ts — the seed phrase, and invite-link parsing.
 *
 * Ported from wedding-os, where these pin two bugs that are invisible until a real person
 * hits them:
 *
 *  1. A share target (WhatsApp, Messages) appends human text and often a duplicate URL
 *     AFTER the fragment. `new URL().hash` percent-encodes the space, so the token has to be
 *     read as the LEADING base64url run and nothing else. Anything that takes the whole
 *     hash silently gets a corrupt token and the join fails with no clue why.
 *  2. The seed IS the identity. Normalisation has to be forgiving about how a human pastes
 *     it (hyphens, double spaces, capitals) or a perfectly valid recovery phrase is rejected
 *     and someone loses their bulle.
 */
import { describe, it, expect, vi } from 'vitest';

/**
 * lib/identity.ts imports Linking/Platform from react-native, whose source is Flow-typed
 * and cannot be parsed by the node test runner. Only `initialInviteUrl` actually uses them,
 * and nothing here exercises that, so a stub is enough and keeps the test node-native.
 */
vi.mock('react-native', () => ({
  Platform: { OS: 'ios' },
  Linking: { getInitialURL: async () => null },
}));

import { encodeSpaceInviteLink, type SpaceInviteLinkToken } from '@bulle/sdk';
import {
  generatePassphrase,
  isValidPhrase,
  normalizePhrase,
  parseSpaceInviteUrl,
} from '@/lib/identity';

const hex = (n: number) => 'a'.repeat(n * 2);

/** The shape createSpaceInviteLink actually produces. */
function buildToken(): SpaceInviteLinkToken {
  return {
    v: 1,
    spaceId: hex(16),
    spaceName: 'Notre bulle',
    cap: {
      v: 1,
      kind: 'member',
      iss: hex(32),
      issUserId: hex(20),
      sub: hex(32),
      subKem: hex(32),
      subUserId: hex(20),
      scope: { collections: ['content'], paths: [`spaces/${hex(16)}/members/*`], ops: ['read', 'write'] },
      nbf: 1750000000,
      exp: 1780000000,
      nonce: 'AAAAAAAAAAAAAAAAAAAAAA',
      sig: hex(64),
    },
    key: hex(32),
    kemPriv: hex(32),
    kemPub: hex(32),
    write: true,
  } as unknown as SpaceInviteLinkToken;
}

/** encodeSpaceInviteLink builds the whole URL, fragment included. */
const linkFor = (token: SpaceInviteLinkToken) =>
  encodeSpaceInviteLink('https://bulle.drakkar.software', token);

describe('generatePassphrase', () => {
  it('is a valid 12-word BIP-39 seed', () => {
    const phrase = generatePassphrase();
    expect(phrase.split(' ')).toHaveLength(12);
    expect(isValidPhrase(phrase)).toBe(true);
  });

  it('is different every time', () => {
    // It is the only secret in the product. A repeat would mean two people share a bulle.
    expect(generatePassphrase()).not.toBe(generatePassphrase());
  });
});

describe('normalizePhrase', () => {
  it('tolerates how a human actually pastes a seed', () => {
    // Hyphens, double spaces, capitals, stray padding. Rejecting a valid phrase over
    // whitespace means someone cannot recover their bulle.
    const phrase = generatePassphrase();
    const mangled = `  ${phrase.replace(/ /g, '-').toUpperCase()}  `;
    expect(normalizePhrase(mangled)).toBe(phrase);
    expect(isValidPhrase(mangled)).toBe(true);
  });

  it('rejects a phrase that is not real BIP-39', () => {
    expect(isValidPhrase('not actually a seed phrase at all thanks very much friend')).toBe(false);
  });
});

describe('parseSpaceInviteUrl', () => {
  it('round-trips a clean link', () => {
    const token = buildToken();
    expect(parseSpaceInviteUrl(linkFor(token))?.spaceId).toBe(token.spaceId);
  });

  it('survives a share target appending human text after the fragment', () => {
    // The real WhatsApp/Messages shape: "<link> Rejoins-nous ! <link>". `new URL().hash`
    // percent-encodes the space, so %20 terminates the base64url run. Reading the whole
    // hash yields a corrupt token and a join that fails for no visible reason.
    const token = buildToken();
    const link = linkFor(token);
    const shared = `${link} Rejoins-nous ! ${link}`;
    expect(parseSpaceInviteUrl(shared)?.spaceId).toBe(token.spaceId);
  });

  it('returns null rather than throwing on junk', () => {
    // The join screen branches on null. A throw here is a crash on a cold deep link.
    for (const url of ['', 'not-a-url', 'https://bulle.drakkar.software/join', 'https://x/join#!!!']) {
      expect(parseSpaceInviteUrl(url)).toBeNull();
    }
  });

  it('returns null for a fragment that is base64url but not a token', () => {
    expect(parseSpaceInviteUrl('https://bulle.drakkar.software/join#aGVsbG8')).toBeNull();
  });
});
