// Jest configuration for the ui package
module.exports = {
  preset: 'jest-presets/jest/node',
  displayName: 'ui',
  rootDir: '.',
  coverageDirectory: '../../coverage/ui',
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../..' }]],
};
