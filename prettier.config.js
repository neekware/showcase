/** @type {import('prettier').Config} */
module.exports = {
  endOfLine: 'lf',
  semi: true,
  singleQuote: true, // Ensuring there's no duplicate key as mentioned previously
  tabWidth: 2,
  trailingComma: 'es5',
  importOrder: [
    // Node itself
    '^node$',

    // Node related imports
    '^(node/(.*)|node:(.*))$',

    // React itself
    '^react$',

    // React related imports
    '^(react/(.*)|react-(.*))$',

    // Next itself
    '^next$',

    // Next.js related imports
    '^(next/(.*)|next-(.*))$',

    // Third-party libraries (anything that doesn't match the other rules)
    '^(?!node$|node/|node:|react$|react/|react-|next$|next/|next-|@repo/|./|../)(.*)$',

    // Libs related imports (@repo)
    '^@repo/(.*)$',

    // Local imports (only match relative imports starting with ./ or ../)
    '^(?:./|../).*',
  ],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  importOrderCaseInsensitive: true,
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
