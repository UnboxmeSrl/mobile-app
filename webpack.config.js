const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, './src/components'),
      '@const': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@nav': path.resolve(__dirname, 'src/navigation'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@services': path.resolve(__dirname, 'src/services'),
    },
  },
}
