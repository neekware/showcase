/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ['@repo/eslint-cfg/react.js'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
  },
};
