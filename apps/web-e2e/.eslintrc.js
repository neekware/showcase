module.exports = {
  ...require('../../cfgs/eslint/e2e.js'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
};
