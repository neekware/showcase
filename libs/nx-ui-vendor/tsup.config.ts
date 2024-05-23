import { defineConfig, type Options } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['./index.ts'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react'],
  banner: {
    js: "'use client'",
  },
  ...options,
}));
