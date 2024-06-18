module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:playwright/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'import', 'playwright'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: ['apps/*-e2e/tsconfig.json'],
      },
    },
  },
  globals: {
    PlaywrightTestConfig: 'readonly',
  },
  rules: {
    'import/named': 'warn',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'playwright/no-skipped-test': 'warn',
    'playwright/no-focused-test': 'warn',
    'playwright/max-nested-describe': ['warn', { max: 2 }],
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
  ignorePatterns: [
    '**/*.js',
    '**/*.json',
    'node_modules',
    'public',
    'styles',
    '.next',
    'coverage',
    'dist',
    '.turbo',
  ],
};
