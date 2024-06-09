module.exports = {
  displayName: 'next-vendor-ui',
  roots: ['<rootDir>'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  modulePathIgnorePatterns: [
    '<rootDir>/test/__fixtures__',
    '<rootDir>/node_modules',
    '<rootDir>/dist',
  ],
  coverageDirectory: '../../coverage/libs/next-vendor-ui',
};
