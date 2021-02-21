module.exports = {
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@components': './src/components',
          '@const': './src/constants',
          '@hooks': './src/hooks',
          '@nav': './src/navigation',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@services': './src/services',
          'src': './src',
        },
        root: ['.'],
      },
    ],
  ],
  presets: ['module:metro-react-native-babel-preset'],
}
