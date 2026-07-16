#!/usr/bin/env node
/**
 * A LOCAL Starfish sync server, for verifying the client end to end.
 *
 * Why this exists: `SYNC_BASE` defaults to `https://sync.drakkar.software`, which is
 * NXDOMAIN (see docs/SYNC.md). Without a server, the plan's convergence gates cannot be
 * exercised at all: "two simulators sharing a seed converge" (Phase 4/6) and "device B joins
 * via link and via QR; edits converge both ways" (Phase 7).
 *
 * WHAT THIS IS NOT: production config. The real `dk` namespace config lives on the real
 * server and is not shipped in any client package. This is a faithful-enough harness, and
 * the reason "faithful enough" is achievable rather than wishful is worth stating:
 *
 *   The client is PATH-driven. It only ever sends `/{ns}/push/<path>` and `/{ns}/pull/<path>`.
 *   The server maps a path to a collection via `storagePath`, then checks the presenter's cap
 *   for `cap:{op}:{collection}`. The caps the client mints (spaceMemberScope / spaceOwnerScope
 *   / accountScope, introspected from dk-spaces-sdk) grant EVERY collection in their set over
 *   `spaces/{id}/**`. So as long as each collection here is named from those same sets and its
 *   storagePath matches a real client path, authorisation resolves exactly as it would in
 *   production. The internal name attached to a given path is the server's business, and the
 *   cap covers the whole set either way.
 *
 * That is what makes this a real test of the CLIENT (merge, tombstones, invite, join,
 * revoke) rather than a test of my own guesses.
 *
 * Usage:
 *   node tools/dev-sync-server.mjs [--port 8788]
 *   EXPO_PUBLIC_SYNC_BASE=http://<lan-ip>:8788 pnpm --filter bulle android
 */
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import {
  createSyncRouter,
  MemoryObjectStore,
  createCapCertRoleResolver,
  createInMemoryNonceCache,
  createInMemoryRevocationStore,
} from '@drakkar.software/starfish-server';

const port = Number(process.argv[process.argv.indexOf('--port') + 1]) || 8788;

const MB = 1024 * 1024;

/**
 * One collection. Roles are the cap-synthesised ones the server builds by literal
 * concatenation: a cap granting collection `objdoc` becomes role `cap:read:objdoc`.
 */
const col = (name, storagePath, extra = {}) => ({
  name,
  storagePath,
  readRoles: [`cap:read:${name}`],
  writeRoles: [`cap:write:${name}`],
  encryption: 'none', // the CLIENT encrypts; the server stores opaque blobs
  maxBodyBytes: 8 * MB,
  allowedMimeTypes: ['application/json'],
  ...extra,
});

/**
 * The `dk` namespace.
 *
 * Collections and paths were extracted by introspecting @drakkar.software/dk-spaces-sdk:
 * the cap scopes name the collections, and the `*Name`/`*Push`/`*Pull` builders give the
 * exact path templates the client calls.
 */
const dkCollections = [
  // ── Account-scoped (accountScope) ──
  col('profile', 'user/:userId/profile'),
  col('devices', 'users/:userId/_devices'),
  col('spaces', 'user/:userId/_spaces'),
  col('inbox', 'inbox/:userId/:box'),
  col('spaceregistry', '_index/spaces/:shard'),

  // ── Space-scoped (spaceMemberScope / spaceOwnerScope) ──
  // `spaces/:spaceId` is the space keyring: the sealed space key per recipient. This is what
  // ensureSpaceKeyringRecipient writes and what a joiner reads to decrypt anything at all.
  col('spacekeyring', 'spaces/:spaceId'),
  col('objindex', 'spaces/:spaceId/objects/_index'),
  col('typeindex', 'spaces/:spaceId/types/_index'),
  col('objdoc', 'spaces/:spaceId/objects/docs/:nodeId'),
  col('objlog', 'spaces/:spaceId/objects/logs/:nodeId'),
  col('objowner', 'spaces/:spaceId/objects/owner/:nodeId'),
  col('objpub', 'spaces/:spaceId/objects/pub/:nodeId'),
  col('objpublog', 'spaces/:spaceId/objects/pub/:nodeId/log'),
  col('objblob', 'spaces/:spaceId/objects/blobs/:blobId'),

  // Per-node content + its log. `objects/n/:nodeId/content` is the one path whose production
  // collection name is NOT derivable from the client (no client package ships the mapping).
  // Any name from the member scope authorises identically, because the cap grants the whole
  // set over `spaces/:spaceId/**` — so this is a naming choice, not a behavioural guess.
  col('objsnap', 'spaces/:spaceId/objects/n/:nodeId/content'),
  col('objinvlog', 'spaces/:spaceId/objects/n/:nodeId/log'),
  col('nodekeyring', 'spaces/:spaceId/objects/n/:nodeId'),
];

const config = {
  version: 1,
  // Root collections: unused by the app (everything goes through /v1/dk), but SyncConfig
  // requires the field and validation rejects an empty server.
  collections: [col('health', '_health/:id')],
  namespaces: {
    dk: { collections: dkCollections },
  },
};

const store = new MemoryObjectStore();

const roleResolver = createCapCertRoleResolver({
  nonceCache: createInMemoryNonceCache(),
  revocationStore: createInMemoryRevocationStore(),
  // The app always presents a cap; anonymous reads are not part of any flow it uses.
  allowAnonymous: true,
});

const sync = createSyncRouter({ store, config, roleResolver, cors: true });

const app = new Hono();

// Log every request. Without this "is the client even calling?" is unanswerable, and the
// first thing you want to know is whether silence means a broken client or a broken route.
app.use('*', async (c, next) => {
  const started = Date.now();
  await next();
  console.log(
    `[dev-sync] ${c.req.method} ${c.req.path} -> ${c.res.status} (${Date.now() - started}ms)`,
  );
});

app.get('/health', (c) => c.json({ ok: true }));
// The SDK prefixes every call with /v1/{namespace}; see getSyncPrefix in dk-spaces-sdk.
app.route('/v1', sync);

serve({ fetch: app.fetch, port, hostname: '0.0.0.0' }, (info) => {
  console.log(`[dev-sync] listening on http://0.0.0.0:${info.port}`);
  console.log(`[dev-sync] namespace: dk (${dkCollections.length} collections)`);
  console.log('[dev-sync] in-memory store: everything is lost on restart, by design');
});
