// Jest configuration for the ui package
module.exports = {
  preset: 'jest-presets/jest/node',
  displayName: '@showcase/ui',
  rootDir: '.',
  coverageDirectory: '../../coverage/@showcase/ui',
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../..' }]],
  testEnvironment: 'jsdom',
};
