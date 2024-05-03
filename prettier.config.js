/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true, // Ensuring there's no duplicate key as mentioned previously
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    // React related imports
    '^(react/(.*)$)|^(react-(.*)$)|^(react$)',

    // Next.js related imports
    '^(next/(.*)$)|^(next-(.*)$)|^(next$)',

    // Third-party libraries (assuming you want to add a pattern for them)
    '^@?[^./]',

    // libs related imports
    '^@repo/libs/(.*)$',

    // apps related imports
    '^@repo/apps/(.*)$',

    // Local imports
    '^[./]',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderGroupNamespaceSpecifiers: true,
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  plugins: [
    require.resolve('@trivago/prettier-plugin-sort-imports'),
    // these two @softonus don't work at this time https://github.com/tailwindlabs/tailwindcss/discussions/13630
    require.resolve('@softonus/prettier-plugin-whitespace-remover'),
    require.resolve('@softonus/prettier-plugin-duplicate-remover'),
    require.resolve('prettier-plugin-tailwindcss'),
  ],
  tailwindFunctions: ['tw', 'clsx'],
  // Optional: Specify any other configurations or overrides needed
  overrides: [
    {
      files: '**/*.html',
      options: {
        printWidth: 100,
      },
    },
    {
      files: '**/*.ts',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '**/*.tsx',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '**/*.json',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '**/*.js',
      options: {
        printWidth: 80,
      },
    },
    {
      files: '*.svg',
      options: { parser: 'html' },
    },
  ],
};
