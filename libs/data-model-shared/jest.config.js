/** @type {import('jest').Config} */
const config = {
  displayName: 'data-util-shared',
  preset: 'ts-jest',
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(t|j)sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  coverageReporters: ['lcov', 'html'],
  coverageDirectory: 'coverage',
};

module.exports = config;
