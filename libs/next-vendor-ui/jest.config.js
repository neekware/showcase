/** @type {import('jest').Config} */

const config = {
  displayName: 'next-vendor-ui',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: '../../.coverage/libs/next-vendor-ui',
};

module.exports = config;
