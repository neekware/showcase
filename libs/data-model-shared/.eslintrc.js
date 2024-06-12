module.exports = {
  ...require('../../cfgs/eslint/node.js'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
