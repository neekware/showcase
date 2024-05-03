import { type Options, defineConfig } from 'tsup';

export default defineConfig((options: Options) => ({
  entry: ['./index.tsx'],
  format: ['cjs', 'esm'],
  dts: true,
  external: ['react'],
  banner: {
    js: "'use client'",
  },
  ...options,
}));
