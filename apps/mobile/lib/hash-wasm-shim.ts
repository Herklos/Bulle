/**
 * Pure-JS Argon2id shim aliased over `hash-wasm` for web (see metro.config.js).
 *
 * starfish-identities imports `argon2id` from `hash-wasm`, which needs a `WebAssembly`
 * global. @noble/hashes' Argon2id is a pure-JS RFC 9106 implementation defaulting to
 * version 0x13 — identical to hash-wasm's default — so the derived userId is byte-identical
 * across web and native. That matters more than it looks: the userId IS the identity, so a
 * divergence here would silently strand a user's bulle on one platform.
 *
 * On native, metro redirects `hash-wasm` to hash-wasm-shim.native.ts instead.
 */
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

export async function argon2id(opts: Argon2idOptions): Promise<string | Uint8Array> {
  const out = nobleArgon2id(opts.password, opts.salt, {
    t: opts.iterations,
    m: opts.memorySize,
    p: opts.parallelism,
    dkLen: opts.hashLength,
  });
  if (opts.outputType === 'binary') return out;
  return Array.from(out, (b) => b.toString(16).padStart(2, '0')).join('');
}
