module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier'],
  plugins: ['simple-import-sort'],
  rules: {
    'no-shadow': 'off',
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // Side effect imports.
          ['^\\u0000'],
          // Packages. `react` related packages come first.
          // Things that start with a letter (or digit or underscore), or `@` followed by a letter.
          [
            '^react$',
            '^react-native$',
            '^native-base$',
            '^react',
            '^@?\\w',
            '^[^.]',
          ],
          // Absolute imports - ts-alias
          ['(^~(.+))(.*|$)([^\\u0000$])'],
          // Relative imports.
          ['^\\.'],
          // for types imports
          [
            '^[^/\\.].*\u0000$',
            '^@types$',
            '^@app-types$',
            '/types$',
            '^\\..*\u0000$',
          ], // types (0 at end)
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
  },
};
