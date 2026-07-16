/**
 * Identity, sessions and invite-link parsing.
 *
 * There are no accounts. Identity is a 12-word BIP-39 seed → Argon2id → an Ed25519/X25519
 * keypair → a userId. It is never stored as keys; it is re-derived from the seed, and the
 * seed lives in SecureStore (see lib/bulle-registry.ts).
 */

import { Linking, Platform } from 'react-native';
import {
  DEFAULT_SYNC_NAMESPACE,
  decodeSpaceInviteLink,
  deriveSession,
  generateSeedWords,
  getSyncNamespace,
  isValidSeed,
  type Session,
  type SpaceInviteLinkToken,
} from '@bulle/sdk';
import { SYNC_BASE } from './config';

/** A fresh 12-word recovery seed. This IS the user's identity — losing it loses the bulle. */
export function generatePassphrase(): string {
  return generateSeedWords().join(' ');
}

/** Tolerates hyphen-separated and multi-space input, so a pasted seed just works. */
export function normalizePhrase(phrase: string): string {
  return phrase.replace(/-/g, ' ').trim().replace(/\s+/g, ' ').toLowerCase();
}

export function isValidPhrase(phrase: string): boolean {
  return isValidSeed(normalizePhrase(phrase).split(' '));
}

/**
 * Derive a session from a seed phrase. Runs Argon2id, so it is slow by design (~150ms
 * native via the quick-crypto shim; see lib/hash-wasm-shim.native.ts).
 *
 * `autoProfile: false` — Bulle has no public profile feature, so the profile pull/write
 * would be two network round-trips on the boot path for a doc nothing ever reads.
 */
export async function deriveSessionFromPhrase(
  phrase: string,
  baseUrl: string = SYNC_BASE,
): Promise<Session> {
  const words = normalizePhrase(phrase).split(' ');
  let namespace: string = DEFAULT_SYNC_NAMESPACE;
  try {
    // Throws (not returns undefined) before configureBulle() runs, hence the try/catch;
    // the `??` covers a configured-but-empty namespace.
    namespace = getSyncNamespace() ?? DEFAULT_SYNC_NAMESPACE;
  } catch {
    // Not configured yet — fall back to the same literal configureBulle() would install.
  }
  return deriveSession(words, { baseUrl, namespace }, {
    sharedNamespace: DEFAULT_SYNC_NAMESPACE,
    autoProfile: false,
  });
}

// ─── Invite links ────────────────────────────────────────────────────────────

/**
 * The invite URL as it existed at MODULE LOAD, captured before Expo Router mounts.
 *
 * This is not defensive programming, it is the only way the web flow works: the invite's
 * secret lives in the URL fragment, and expo-router's `history.replaceState` strips the
 * fragment as soon as it mounts. By the time a component's effect runs, the token is gone.
 *
 * null on native, where there is no `window` — see `initialInviteUrl()`.
 */
export const bootHref: string | null =
  typeof window !== 'undefined' ? window.location.href : null;

/**
 * Parse an invite URL into its token, or null.
 *
 * The regex matters. Share targets (WhatsApp, Messages) append human text and often a
 * duplicate URL after the fragment, e.g. `#<token>%20Rejoins-nous%20!%20https://…`.
 * `new URL().hash` percent-encodes the space, so matching only the LEADING base64url run
 * terminates cleanly at the `%`.
 */
export function parseSpaceInviteUrl(url: string): SpaceInviteLinkToken | null {
  try {
    const hash = new URL(url).hash.slice(1);
    const token = hash.match(/^[A-Za-z0-9_-]+/)?.[0];
    if (!token) return null;
    return decodeSpaceInviteLink(token);
  } catch {
    return null;
  }
}

/**
 * The URL that opened the app, on any platform.
 * Web: the module-scope snapshot (see `bootHref`). Native: the cold-start link.
 */
export async function initialInviteUrl(): Promise<string | null> {
  if (Platform.OS === 'web') return bootHref;
  return Linking.getInitialURL();
}
