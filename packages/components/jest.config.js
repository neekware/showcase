// Jest configuration for the ui package
module.exports = {
  preset: 'jest-presets/jest/node',
  displayName: '@showcase/components',
  rootDir: '.',
  coverageDirectory: '../../coverage/@showcase/components',
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../..' }]],
  testEnvironment: 'jsdom',
};
