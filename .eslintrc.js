module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@react-native',
    'prettier/@typescript-eslint',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': 0,
    semi: ['error', 'always'],
    'no-bitwise': 0,
    'no-prototype-builtins': 0,
    curly: 'off',
    'comma-dangle': ['error', 'never'],
    // 'react-native/no-unused-styles': 2,
    'react-native/no-inline-styles': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, {extensions: ['.js', '.jsx']}],

    'newline-before-return': ['error'],
    'comma-dangle': ['error', 'never'],
    'no-void': 'off',
    'no-shadow': 'off',
    'no-extra-boolean-cast': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'import/no-duplicates': 'error',
    'import/no-self-import': 'error',
    'import/no-cycle': 'error',
    'import/order': [
      'error',
      {
        pathGroups: [
          {
            pattern: 'react|react-native',
            group: 'external',
            position: 'before',
          },
        ],
        groups: [
          ['external', 'builtin'],
          'internal',
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/strict-boolean-expressions': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unnecessary-type-constraint': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'jest/no-done-callback': 'off',
  },
};
