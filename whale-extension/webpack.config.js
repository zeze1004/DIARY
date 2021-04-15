const path = require('path');

const config = {
  mode: 'production',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@api': path.resolve(__dirname, 'src/api/'),
      '@localStorage': path.resolve(__dirname, 'src/localStorage/'),
      '@state': path.resolve(__dirname, 'src/state/'),
    },
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [{ test: /\.ts$/, loader: 'ts-loader' }],
  },
};

module.exports = [
  {
    ...config,
    entry: './src/index.ts',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
  {
    ...config,
    entry: './src/background.ts',
    output: {
      filename: 'background.js',
      path: path.resolve(__dirname, 'dist'),
    },
  },
];
