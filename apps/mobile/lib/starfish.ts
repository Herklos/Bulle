/**
 * Sync session singletons + the in-process change bus.
 *
 * Exactly ONE bulle syncs at a time. These are module-level globals, which is why
 * `ActiveBulleRuntime` must unmount its initializers during a bulle switch — otherwise an
 * in-flight push would land against the wrong bulle's session while these swap underneath.
 */

import { dispatchDocChange, emitSseStatus, type Session } from '@bulle/sdk';

let _session: Session | null = null;
let _spaceId: string | null = null;
let _rootNodeId: string | null = null;
let _active = false;

export interface InitSyncArgs {
  session: Session;
  spaceId: string;
  rootNodeId: string;
}

export function initSync({ session, spaceId, rootNodeId }: InitSyncArgs): void {
  _session = session;
  _spaceId = spaceId;
  _rootNodeId = rootNodeId;
  _active = true;

  // Optimistically report the stream as healthy. Push-sync works whether or not SSE ever
  // connects, so the status must not wait on it — otherwise a working app shows an
  // "offline" banner purely because a long-poll hasn't established yet.
  emitSseStatus(true);
}

export function teardownSync(): void {
  _session = null;
  _spaceId = null;
  _rootNodeId = null;
  _active = false;
}

export function isSyncActive(): boolean {
  return _active;
}

export function getSession(): Session | null {
  return _session;
}

export function getSpaceId(): string | null {
  return _spaceId;
}

export function getRootNodeId(): string | null {
  return _rootNodeId;
}

/**
 * Signal that local content changed. THE single connection between a store mutation and the
 * network: `registerPull('*', …)` in SyncInitializer picks this up and schedules a push.
 *
 * A no-op returning false when sync is off or uninitialised — not an error. A bulle with no
 * seed phrase never syncs, and every mutator calls this unconditionally.
 */
export function notifySync(): boolean {
  return dispatchDocChange('*');
}
