module.exports = {
  env: {
    'react-native/react-native': true
  },
  extends: ['@react-native-community/eslint-config', 'standard-with-typescript', 'eslint-config-prettier'],
  parserOptions: {
    'ecmaFeatures': {
      'jsx': true
    },
    'project': './tsconfig.json' // Required for Standard plugin
  },
  plugins: [
    '@typescript-eslint',
    'react',
    'react-native',
    "sort-keys-fix",
    'typescript-sort-keys',
    "better-styled-components",
    "simple-import-sort"
  ],
  root: true,
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/space-before-function-paren': ['off'],
    '@typescript-eslint/strict-boolean-expressions': 'off',
    'better-styled-components/sort-declarations-alphabetically': 2,
    'prettier/prettier': 'off',
    'react/jsx-sort-props': 2,
    "simple-import-sort/exports": "error",
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          // Node.js builtins. You could also generate this regex if you use a `.js` config.
          // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
          [
            "^react", "^"
          ],
          ["^(@components|@const|@hooks|@types|@services|@nav|@redux)(/.*|$)"],
          // Parent imports. Put `..` last.
          ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
          // Other relative imports. Put same-folder imports and `.` last.
          ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
          // Style imports.
          ["^.+\\.s?css$"]
        ]
      }
    ],
    "sort-keys-fix/sort-keys-fix": "warn",
    "typescript-sort-keys/interface": "error",
    "typescript-sort-keys/string-enum": "error",
  },
  settings: {
    'import/ignore': ['react-native'],
  },
}
