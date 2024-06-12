const path = require('path');

const fromRoot = (d) => path.join(__dirname, d);

module.exports = {
  roots: [fromRoot('apps/web')],
  resetMocks: true,
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '<rootDir>/build/',
    '<rootDir>/dist/',
    '<rootDir>/src/types/',
  ],
  collectCoverageFrom: [
    '<rootDir>/apps/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/libs/**/*.{js,jsx,ts,tsx}',
    '!<rootDir>/**/index.{js,ts}',
    '!<rootDir>/**/index.{jsx,tsx}',
    '!<rootDir>/**/*.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'json', 'lcov'],
  coverageThreshold: null,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': ['esbuild-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
    '^.+\\.jsx?$': ['esbuild-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  moduleNameMapper: {
    // Map for apps/web
    '@web/(.*)': fromRoot('apps/web/src/$1'),

    // Map for libs
    '@libs/(.*)': fromRoot('libs/$1'),
  },
};
