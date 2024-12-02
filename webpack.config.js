const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '.env'),
});

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@container': path.resolve(__dirname, 'src/container'),
    },
  },
  output: {
    filename: 'depinjionary.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
