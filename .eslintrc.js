module.exports = {
  root: true,
  extends: ['standard-with-typescript', '@react-native-community'],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'import/ignore': ['react-native'],
  },
  rules: {
    '@typescript-eslint/space-before-function-paren': ['off'],
  },
}
