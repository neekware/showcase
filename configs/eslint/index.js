const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'plugin:import/recommended',
    'plugin:import/typescript',
    'prettier',
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
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: {
          order: 'asc', // Sort in ascending order
          caseInsensitive: true, // Ignore the case of imports
        },
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
