module.exports = {
  env: {
    browser: false,
    es2021: true,
  },
  extends: ['airbnb-base', 'airbnb-typescript/base', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: './',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'prefer-const': 2,
    'no-console': 1,
    'no-const-assign': 2,
    'no-dupe-keys': 2,
    'no-empty': 2,
    'no-inline-comments': 1,
    'import/prefer-default-export': 0,
    'global-require': 0,
    '@typescript-eslint/return-await': 0,
    '@typescript-eslint/parser': 0,
  },
  ignorePatterns: ['.eslintrc.js', 'tsconfig.json'],
};
