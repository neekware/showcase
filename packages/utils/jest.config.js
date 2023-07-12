// Jest configuration for the ui package
module.exports = {
  preset: 'jest-presets/jest/node',
  displayName: '@showcase/utils',
  rootDir: '.',
  coverageDirectory: '../../coverage/@showcase/utils',
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../..' }]],
};
