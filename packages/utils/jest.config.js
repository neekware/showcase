// Jest configuration for the ui package
module.exports = {
  preset: 'jest-presets/jest/node',
  displayName: 'utils',
  rootDir: '.',
  coverageDirectory: '../../coverage/utils',
  coverageReporters: ['html', 'json', ['lcov', { projectRoot: '../..' }]],
};
