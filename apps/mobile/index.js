/**
 * Custom entry point. Exists for exactly one reason: import ORDER.
 *
 * `@noble/hashes` captures `globalThis.crypto` at MODULE LOAD:
 *
 *     export const crypto = 'crypto' in globalThis ? globalThis.crypto : undefined;
 *
 * If that module evaluates before the polyfill installs, it captures `undefined` and stays
 * that way for the life of the process — and minting the seed phrase throws
 * "crypto.getRandomValues must be defined" at the exact moment onboarding creates the bulle.
 *
 * Putting the polyfill at the top of `app/_layout.tsx` is NOT sufficient: expo-router loads
 * routes through `require.context`, which evaluates every file under `app/`. Several of
 * those import `@bulle/sdk` → starfish-spaces → @noble/hashes, and any one of them can win
 * the race before `_layout` runs.
 *
 * A dedicated entry is the only place that is provably first.
 */
import 'react-native-get-random-values';

import 'expo-router/entry';
