module.exports = {
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: 'module',
  },
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'no-undef': ['error'],
    'no-var': ['error'],
    'object-curly-spacing': ['error', 'always'],
    quotes: ['error', 'single'],
    // we want to force semicolons
    semi: ['error', 'always'],
    // we use 2 spaces to indent our code
    indent: ['error', 2],
    // we want to avoid extraneous spaces
    'no-multi-spaces': ['error'],
  },
  env: {
    // change as necessary
    node: true,
  },
};
