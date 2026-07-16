/**
 * Key→JSON KV storage — NATIVE (iOS/Android). `kv-storage.web.ts` serves web.
 *
 * The whole offline story rests on this file being SYNCHRONOUS. `expo-sqlite/kv-store`
 * reads and writes synchronously, which is why hydration can be a plain function and why
 * every store mutator persists inline without an `await` — a mutation can never be left
 * half-applied.
 *
 * One KV file per bulle (`bulle_{uuid}.db`) gives hard data isolation between bulles.
 *
 * The platform split is a real file split rather than a `Platform.OS` branch, deliberately:
 * a static `expo-sqlite` import drags its wa-sqlite WASM engine into the web bundle, and
 * the web build stores nothing in SQLite at all.
 */
import { SQLiteStorage } from 'expo-sqlite/kv-store';

/**
 * Opaque handle. Callers only ever check it for truthiness ("is storage open yet?"), so the
 * concrete type is deliberately not part of the API — that is what lets web back this with
 * something else entirely.
 */
export type StorageHandle = object;

let nativeStorage: SQLiteStorage | null = null;

export async function initStorage(databaseName: string): Promise<StorageHandle | null> {
  nativeStorage = new SQLiteStorage(databaseName);
  return nativeStorage;
}

export function getStorage(): StorageHandle | null {
  return nativeStorage;
}

export function closeStorage(): void {
  nativeStorage?.closeSync();
  nativeStorage = null;
}

export function readCollection<T>(key: string): T | null {
  const raw = nativeStorage?.getItemSync(key) ?? null;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

/**
 * Writes a WHOLE collection under one key. Fine at a bulle's scale (tens of tasks); do not
 * assume it generalises — every single-task edit re-serialises every task.
 */
export function writeCollection<T>(key: string, data: T): void {
  nativeStorage?.setItemSync(key, JSON.stringify(data));
}

export function removeCollection(key: string): void {
  nativeStorage?.removeItemSync(key);
}
