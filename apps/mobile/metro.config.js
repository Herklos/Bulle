const path = require('node:path')
const { getDefaultConfig } = require('expo/metro-config')

const projectRoot = __dirname
const workspaceRoot = path.resolve(projectRoot, '../..')
const config = getDefaultConfig(projectRoot)

// ─── Monorepo wiring ─────────────────────────────────────────────────────────
// Watch the workspace root so edits in packages/* trigger a rebuild, and let Metro resolve
// from both the app's and the root's node_modules (the .npmrc uses a hoisted linker).
config.watchFolders = [workspaceRoot]
config.resolver.unstable_enableSymlinks = true
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

// Prefer CJS over ESM: zustand's ESM build uses `import.meta.env`, which Hermes chokes on.
if (!config.resolver.unstable_conditionNames.includes('require'))
  config.resolver.unstable_conditionNames.unshift('require')

const workspacePackagesRoot = path.resolve(workspaceRoot, 'packages')
const originalResolveRequest = config.resolver.resolveRequest

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolve = originalResolveRequest ?? context.resolveRequest

  // Fix @babel/runtime's ESM helpers crashing on web.
  if (platform === 'web' && moduleName.startsWith('@babel/runtime/helpers/esm/'))
    return resolve(
      context,
      moduleName.replace('@babel/runtime/helpers/esm/', '@babel/runtime/helpers/'),
      platform,
    )

  // hash-wasm (Argon2id, used by starfish-identities to derive the root identity from the
  // seed phrase) requires a WebAssembly global, which Hermes does not have
  // ("WebAssembly is not supported in this environment"). On native, redirect to a shim
  // backed by react-native-quick-crypto's native Argon2id (OpenSSL, ~150ms vs ~15-45s for
  // the pure-JS fallback — and this runs on the onboarding path, so it is not optional).
  // On web, keep the original @noble/hashes-backed shim.
  //
  // This must live here rather than in a package's exports map: hash-wasm is imported deep
  // inside a third-party dependency, and an exports map cannot remap someone else's
  // specifier.
  if (moduleName === 'hash-wasm') {
    const isNative = platform === 'ios' || platform === 'android'
    const shimFile = isNative ? 'lib/hash-wasm-shim.native.ts' : 'lib/hash-wasm-shim.ts'
    return { type: 'sourceFile', filePath: path.resolve(projectRoot, shimFile) }
  }

  // The workspace packages author ESM imports with explicit `.js` extensions (NodeNext
  // style, required for tsup/ESM output). Metro resolves them straight from TS source, so
  // the .js files don't exist — strip the extension so `./deep-merge.js` finds
  // `./deep-merge.ts`. Scoped to packages/ so app and node_modules imports are untouched.
  if (moduleName.endsWith('.js') && context.originModulePath.startsWith(workspacePackagesRoot))
    return resolve(context, moduleName.slice(0, -3), platform)

  return resolve(context, moduleName, platform)
}

module.exports = config
