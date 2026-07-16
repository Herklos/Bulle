# Sync: what is built, and the two things that block it

Everything in the sync stack is implemented and unit-tested. None of it has ever run,
because of two independent blockers: a missing function that makes sharing impossible, and
a server host that does not exist.

The first is the important one. It is a code bug, it is in our code, and it means the
sharing feature has never worked at all.

## Blocker 1: sharing is dead on arrival (a code bug, not infrastructure)

Found by building a local dev server (`tools/dev-sync-server.mjs`) and watching a real
client against it: the app never sends a single request, and it never can.

There is a circular dependency with nothing to break it:

- `invite()` opens with `const session = getSession(); const spaceId = getSpaceId();
  if (!session || !spaceId || !active) return;` and **silently returns**.
- Both come from the sync singletons, which only `activateSync` sets.
- `activateSync` bails on `if (!bulle.seedPhrase || bulle.syncDisabled || !bulle.spaceId) return;`
- **Nothing ever sets `spaceId` for an owner.** The only writer is `lib/join-space.ts`,
  which is the *joiner's* side and needs a link that can never be minted.

So: you cannot invite without a space, and the space is only created by inviting. An owner
can never create their first invite link. The screen just does nothing, with no error. Sync
therefore never starts even if a server existed, which is why the missing host had never
been noticed.

**The missing piece is `ensureSpaceProvisioned`.** Fiancé has it at
`apps/mobile/lib/space-provision.ts`; Bulle never got it. It bootstraps the owner's space
and is not a small function: `writeSpaceAccess` (which succeeds by TOFU — with no `_access`
doc, the server enricher grants `[space:owner, space:member]` to any authenticated identity,
letting the owner bootstrap their own space), `seedSpaceObjectIndex`, `ownerEnsureSpaceKeyring`,
a `_spaces` registry entry, all under `withIndexLock`, then persists the `sp-` id onto the
registry entry. It is idempotent, and member entries short-circuit because join already set
their `spaceId`.

Porting it is the next piece of work. It was not done here because it is a real feature, not
a fix, and it needs a working server to verify against rather than being written blind.

## Blocker 2: there is no server

`SYNC_BASE` defaults to `https://sync.drakkar.software`, which **does not resolve**:

```
$ host sync.drakkar.software
Host sync.drakkar.software not found: 3(NXDOMAIN)

$ adb shell ping -c 1 sync.drakkar.software
ping: unknown host sync.drakkar.software
```

It fails **silently**, which is the dangerous part. A bulle with a seed phrase reports
itself as syncing: `activateSync` runs, every push throws, a `console.warn` swallows it. The
UI shows a healthy, shareable bulle whose co-parent will never receive anything. Nothing
surfaces because nothing is meant to — the offline path is a supported mode, and the code
cannot tell "offline right now" from "this host is a fiction". `configureOnBoot` now warns
in dev; see `apps/mobile/lib/config.ts`.

Note **Fiancé has no default server at all**: `serverUrl` lives on each registry entry and
is supplied by the user, so an unconfigured wedding is simply local and honest about it. A
hardcoded default that does not resolve is strictly worse than no default, because it looks
configured. Bulle diverging here was a mistake.

## Two ways to close it

1. **Deploy a Starfish server** and point `EXPO_PUBLIC_SYNC_BASE` at it.
2. **Adopt Fiancé's model**: drop the default, store `serverUrl` per registry entry, and
   treat an unconfigured bulle as local-only.

## What a local dev server would need

`@drakkar.software/starfish-server` is already installed, but it is a **library, not a
binary**: `createSyncRouter({ store, config, roleResolver })` returns a Hono app. Composing
one needs a `SyncConfig` for the `dk` namespace.

Most of that config is derivable from the client SDK. These were extracted by introspecting
`@drakkar.software/dk-spaces-sdk`:

**Collections** (from the cap scopes):

| Scope | Collections |
|---|---|
| `accountScope` | `profile`, `devices`, `spaces`, `spaceregistry`, `inbox` |
| `spaceMemberScope` | `spacekeyring`, `objindex`, `objlog`, `objsnap`, `objdoc`, `objblob`, `typeindex`, `objpub`, `objpublog`, `objparquet`, `objparquetpub`, `objparquetenc` |
| `spaceOwnerScope` | the member set, plus `objowner`, `objinvlog` |

**Client paths** (from the `*Name` / `*Push` / `*Pull` builders):

```
user/{userId}/profile                       profile
users/{userId}/_devices                     devices
user/{userId}/_spaces                       spaces
inbox/{userId}/{box}                        inbox
spaces/{spaceId}                            spacekeyring
spaces/{spaceId}/objects/_index             objindex
spaces/{spaceId}/objects/docs/{nodeId}      objdoc
spaces/{spaceId}/objects/n/{nodeId}/content ← see below
spaces/{spaceId}/objects/logs/{nodeId}      objlog
spaces/{spaceId}/objects/owner/{nodeId}     objowner
spaces/{spaceId}/types/_index               typeindex
_index/spaces/public                        spaceregistry
```

**The part that is NOT derivable.** A `CollectionConfig` maps a `storagePath` template to a
collection *name*, and the server synthesises cap roles by literal concatenation
(`cap:read:{collection}`). That mapping lives only in the server's own config: no client
package ships it (grepping every `@drakkar.software/*` dist for a `spaces/:id/objects/...`
template returns nothing). `objects/n/{nodeId}/content` is the clearest example — it is a
real client path, and which collection name owns it cannot be read off the client.

Inventing that mapping is possible, but a wrong guess produces 403s that look exactly like
client bugs, and a suite passing against an invented config would prove the client works
against *that* config rather than the real one. That is worse than a known gap, so it was
not done.

## What this blocks

The plan's end-to-end gates, and only these. Both blockers must clear: porting
`ensureSpaceProvisioned` without a server gets you a mint that fails on the first request,
and a server without it gets you a screen that still does nothing.

- Phase 4: "two simulators sharing a seed converge"
- Phase 6: "second device with the same seed converges"
- Phase 7: "device B joins via link and via QR; edits converge both ways; revoke on A → B
  loses write and sees the read-only banner"

## What is verified without a server

- `collection-doc` merge, LWW, add-wins-on-tie, tombstone TTL (unit-tested)
- `deep-merge` (unit-tested)
- Invite link encode/decode round-trip, including a share target appending text after the
  fragment (`__tests__/identity.test.ts`)
- Join-credential persistence and the identity-pinning order that made joining silently
  useless in wedding-os (`__tests__/join-credential.test.ts`)
- Invite QR density: `ecl="L"` is required, not preferred. At this payload L needs 125
  modules and M needs 137, so on a 320px phone that is 2.05 px/module versus 1.87. The
  default would ship a QR that works on a large phone and fails on a small one
  (`__tests__/invite-qr-density.test.ts`)
- Revocation ordering: assignment dropped and pushed *before* the keyring rotates, so the
  member can still decrypt the deletion (`lib/permissions/revoke.ts`)
