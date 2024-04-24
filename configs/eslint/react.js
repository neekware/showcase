const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use in a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    'eslint:recommended',
    'prettier',
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
    require.resolve('@vercel/style-guide/eslint/react'),
    'eslint-config-turbo',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'tailwindcss'],
  parserOptions: {
    project,
    ecmaFeatures: {
      jsx: true, // Enables JSX parsing
    },
  },
  globals: {
    React: 'writable', // Defines React as a global variable. Adjust as 'readonly' if necessary
    JSX: true,
  },
  plugins: ['only-warn', 'react'], // Added 'react' plugin if you need specific React rules
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
    react: {
      version: 'detect', // Automatically detect the React version
    },
  },
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@next/next/no-html-link-for-pages': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-shorthand': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    'import/no-default-export': 'off',
    'react/prop-types': 'off', // Example rule, disable if using TypeScript for prop validation
    'react/react-in-jsx-scope': 'off', // Not needed for React 17+
    'import/order': [
      'warn',
      {
        'newlines-between': 'never',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        alphabetize: {
          // order: 'asc', // Sort in ascending order
          caseInsensitive: true, // Ignore the case of imports
        },
      },
    ],
  },
};
