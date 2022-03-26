module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'google',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json', 'tsconfig.dev.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  ignorePatterns: [
    '/dist/**/*', // Ignore built files.
  ],
  plugins: [
    '@typescript-eslint',
    'import',
  ],
  rules: {
    'quotes': 0,
    'import/no-unresolved': 0,
    'object-curly-spacing': 0,
    'indent': 0,
    'new-cap': 0,
    'max-len': 0,
    "require-jsdoc": 0,
    "guard-for-in": 0,
    "space-before-function-paren": 0,
    "camlcase": "off",
    "padded-blocks": 0,
    '@typescript-eslint/camelcase': 'off',
    "@typescript-eslint/no-explicit-any": "off",
  },
};
