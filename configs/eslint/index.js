const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
    'eslint-config-turbo',
  ],
  plugins: ['@typescript-eslint', 'import'],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'eslint-comments/require-description': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-default-export': 'off',
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
  ignorePatterns: [
    '.*.js', // Ignore specific JavaScript config files like .eslintrc.js
    'node_modules/', // Standard practice to ignore node_modules
    'dist/', // Ignore built files
  ],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      rules: {
        // Specify rules here that should only apply to JavaScript and TypeScript files
      },
    },
  ],
};
