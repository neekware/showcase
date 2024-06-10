/** @type {import('jest').Config} */

const config = {
  displayName: 'ui-util-next',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: '../../tmp/coverage/libs/ui-util-next',
};

module.exports = config;
