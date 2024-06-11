/** @type {import('jest').Config} */

const config = {
  displayName: 'ui-vendor-next',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'coverage',
};

module.exports = config;
