const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use in server-side
 * TypeScript packages.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    'eslint:recommended',
    require.resolve('@vercel/style-guide/eslint/node'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    'eslint-config-turbo',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import'],
  parserOptions: {
    project,
  },
  env: {
    node: true,
    es6: true,
  },
  plugins: ['only-warn'],
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**/*'],
      env: {
        jest: true,
      },
    },
  ],
  ignorePatterns: ['.*.js', 'node_modules/', 'dist/'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-default-export': 'off',
    'eslint-comments/require-description': 'off',
    'react-hooks/exhaustive-deps': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'import/order': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/no-unnecessary-condition': 'off',
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: false,
      },
    ],
  },
};
