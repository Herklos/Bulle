/**
 * Native Argon2id shim aliased over `hash-wasm` for iOS/Android (see metro.config.js).
 *
 * Uses react-native-quick-crypto's OpenSSL Argon2id binding (~150ms on device) instead of
 * @noble/hashes' pure JS (~15–45s on Hermes, which has no JIT). This runs while the user
 * waits during onboarding, so the difference is the feature.
 *
 * DETERMINISM GATE: on the first call, a cheap self-test (m=8, t=1, p=1) checks the native
 * output against a pre-computed noble reference. If they differ, the native path is
 * permanently disabled for the process and noble is used instead.
 *
 * This gate is the important part. The Argon2id output IS the user's identity — every key,
 * every space, every synced byte derives from it. A native binding that disagreed with
 * noble by even one bit would silently mint a *different person* on that device, and the
 * user's bulle would simply be gone with no error to explain it. Failing over to the slow
 * path is always the right trade against that.
 *
 * Reference vector:
 *   password = "bulle-argon2-gate"  salt = "starfish-v3-gate"  m=8 t=1 p=1 dkLen=32
 *   → 547e7fb51b261771e73f69e4c6a2b0d6145950ca125d4f6691bb9d319680dac9
 */
import { argon2 } from 'react-native-quick-crypto';
import type { Argon2Params } from 'react-native-quick-crypto';
import { argon2id as nobleArgon2id } from '@noble/hashes/argon2.js';

interface Argon2idOptions {
  password: string | Uint8Array;
  salt: Uint8Array;
  parallelism: number;
  iterations: number;
  memorySize: number;
  hashLength: number;
  outputType?: 'hex' | 'binary' | 'encoded';
}

// ─── Determinism gate ────────────────────────────────────────────────────────

const GATE_EXPECTED_HEX = '547e7fb51b261771e73f69e4c6a2b0d6145950ca125d4f6691bb9d319680dac9';
let _gateResult: Promise<boolean> | null = null;

function runGate(): Promise<boolean> {
  if (_gateResult) return _gateResult;
  const enc = new TextEncoder();
  _gateResult = new Promise<boolean>((resolve) => {
    argon2(
      'argon2id',
      {
        message: enc.encode('bulle-argon2-gate'),
        nonce: enc.encode('starfish-v3-gate'),
        parallelism: 1,
        passes: 1,
        memory: 8,
        tagLength: 32,
      } as Argon2Params,
      (err, buf) => {
        if (err) {
          console.warn('[hash-wasm-shim] Native Argon2id gate error — using noble.', err);
          resolve(false);
          return;
        }
        const hex = buf.toString('hex');
        const ok = hex === GATE_EXPECTED_HEX;
        if (!ok) {
          console.warn(
            '[hash-wasm-shim] Native Argon2id output mismatch — using noble.\n' +
              `  got:      ${hex}\n` +
              `  expected: ${GATE_EXPECTED_HEX}`,
          );
        }
        resolve(ok);
      },
    );
  });
  return _gateResult;
}

// ─── Noble fallback ──────────────────────────────────────────────────────────

function nobleHex(out: Uint8Array): string {
  return Array.from(out, (b) => b.toString(16).padStart(2, '0')).join('');
}

async function argon2idNoble(opts: Argon2idOptions): Promise<string | Uint8Array> {
  const out = nobleArgon2id(opts.password, opts.salt, {
    t: opts.iterations,
    m: opts.memorySize,
    p: opts.parallelism,
    dkLen: opts.hashLength,
  });
  if (opts.outputType === 'binary') return out;
  return nobleHex(out);
}

// ─── Public export ───────────────────────────────────────────────────────────

export async function argon2id(opts: Argon2idOptions): Promise<string | Uint8Array> {
  const nativeOk = await runGate();
  if (!nativeOk) return argon2idNoble(opts);

  return new Promise<string | Uint8Array>((resolve, reject) => {
    argon2(
      'argon2id',
      {
        message: opts.password,
        nonce: opts.salt,
        parallelism: opts.parallelism,
        passes: opts.iterations,
        memory: opts.memorySize,
        tagLength: opts.hashLength,
      } as Argon2Params,
      (err, buf) => {
        if (err) {
          reject(err);
          return;
        }
        if (opts.outputType === 'binary') {
          resolve(new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength));
        } else {
          resolve(buf.toString('hex'));
        }
      },
    );
  });
}
