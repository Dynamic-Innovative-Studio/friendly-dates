import { defineConfig } from 'tsup';

export default defineConfig([
  // Main bundle
  {
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    clean: true,
    minify: true,
    treeshake: true,
    outDir: 'dist',
    external: [],
    platform: 'neutral',
  },
  // Individual locale bundles for tree-shaking
  {
    entry: ['src/locales/*.ts'],
    format: ['esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    treeshake: true,
    outDir: 'dist/locales',
    external: ['../friendly-dates'],
    platform: 'neutral',
  },
  // Validation bundle (optional)
  {
    entry: ['src/validation.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    treeshake: true,
    outDir: 'dist',
    external: ['./friendly-dates', './types'],
    platform: 'neutral',
  },
  // Types bundle
  {
    entry: ['src/types.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    treeshake: true,
    outDir: 'dist',
    external: ['./friendly-dates'],
    platform: 'neutral',
  },
  // Performance bundle
  {
    entry: ['src/performance.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    splitting: false,
    sourcemap: true,
    minify: true,
    treeshake: true,
    outDir: 'dist',
    external: ['./friendly-dates'],
    platform: 'neutral',
  }
]);
