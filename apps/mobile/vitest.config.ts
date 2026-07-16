import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['__tests__/**/*.test.ts', 'lib/**/*.test.ts'],
  },
  resolve: {
    // Mirrors the tsconfig paths, so the sitemap builder can be run outside Metro.
    alias: {
      '@': path.resolve(__dirname),
      '@bulle/sdk': path.resolve(__dirname, '../../packages/sdk/src/index.ts'),
      '@bulle/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
});
