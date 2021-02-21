var path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.vue'],
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@const': path.resolve(__dirname, 'src/constants'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@nav': path.resolve(__dirname, 'src/navigation'),
      '@redux': path.resolve(__dirname, 'src/redux'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@services': path.resolve(__dirname, 'src/services'),
      'src': path.resolve(__dirname, 'src'),
    },
  },
};
