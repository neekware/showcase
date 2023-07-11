module.exports = {
  roots: ['<rootDir>'],
  // map commonjs modules to es modules
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^crypto-es$': 'crypto-js',
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.(ts|js|html)$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__fixtures__',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
  ],
  preset: 'ts-jest',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../../../..' }]],
  coverageThreshold: null,
};
