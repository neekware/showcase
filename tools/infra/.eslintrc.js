module.exports = {
  ...require('../../cfgs/eslint/tool.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
