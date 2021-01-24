module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          src: './src',
          '@components': './src/components',
          '@const': './src/constants',
          '@hooks': './src/hooks',
          '@nav': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@redux': './src/redux',
        },
      },
    ],
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
}
