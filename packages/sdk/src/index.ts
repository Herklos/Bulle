// ─── Bulle domain ─────────────────────────────────────────────────────────────
export * from './domain/types.js';
export * from './domain/schema.js';
export * from './domain/pregnancy.js';
export * from './domain/readiness.js';
export * from './domain/projects.js';
export * from './domain/tasks.js';
export * from './domain/events.js';
export * from './domain/templates.js';
export * from './domain/suggest.js';
export * from './domain/permissions.js';

// ─── Bulle object model ───────────────────────────────────────────────────────
export * from './objects/object-types.js';
export * from './objects/mappers.js';

// ─── Bulle sync ───────────────────────────────────────────────────────────────
export * from './sync/deep-merge.js';
export * from './sync/collection-doc.js';

// Named (not `export *`): starfish-spaces also exports a `buildAuthHeaders` (the
// bare-`btoa` version ours replaces — see events.ts's doc comment). A named export here
// wins over the ambiguous `export *` collision with the starfish-spaces re-export below.
export { parseSpaceChange, buildAuthHeaders, subscribeSpaceChanges } from './sync/events.js';
export type { SpaceChange, SubscribeSpaceChangesOptions } from './sync/events.js';

// ─── Bulle config ─────────────────────────────────────────────────────────────
export { configureBulle, DEFAULT_SYNC_NAMESPACE } from './core/config.js';
export type { BulleConfig, KvAdapter } from './core/config.js';
export { bulleLayout } from './core/layout.js';

// ─── Re-export from dk-spaces-sdk: transport config + getters ─────────────────
// Source of truth for the sync namespace ('dk') — the app reads getSyncNamespace()
// instead of hardcoding the string.
export {
  configureDKSpaces, getSyncBase, getSyncNamespace, getSharedSpacesNamespace,
} from '@drakkar.software/dk-spaces-sdk';

// ─── Re-export from dk-spaces-sdk: per-node content-doc path builders ─────────
// starfish-spaces' SpaceLayout does not expose per-node objdoc/objinv paths.
export { objDocPush, objDocPull, objInvPush, objInvPull } from '@drakkar.software/dk-spaces-sdk';

// ─── Re-export from dk-spaces-sdk: in-process live-sync bus ───────────────────
export {
  registerPull, dispatchDocChange,
  onSseStatus, emitSseStatus, clearLiveSyncBus,
} from '@drakkar.software/dk-spaces-sdk';

// ─── Re-export from starfish-spaces (all public API) ──────────────────────────
export * from '@drakkar.software/starfish-spaces';

// ─── Re-export from starfish-protocol (re-homed symbols) ──────────────────────
// configurePlatform is deliberately NOT re-exported — platform crypto setup goes through
// @drakkar.software/dk-spaces-platform-sdk's configureStarfishPlatform(), and exposing a
// second entry point here would invite booting it twice with different providers.
export { randomId, encodeLinkFragment, decodeLinkFragment } from '@drakkar.software/starfish-protocol';
