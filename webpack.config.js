  const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [
  {
    mode: 'development',
    entry: './electron/electron.ts',
     target: 'electron-main',
     module: {
       rules: [{
         test: /\.ts$/,
         include: /electron/,
         use: [{ loader: 'ts-loader' }]
       }]
    },
     output: {
       path: __dirname + '/dist',
       filename: 'electron.js'
     }
  },
  {
    mode: 'development',
    entry: './client/react.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: { rules: [{
      test: /\.ts(x?)$/,
      include: /client/,
      use: [{ loader: 'ts-loader' }]
    }] },
    output: {
      path: __dirname + '/dist',
      filename: 'react.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html'
      })
    ]
  }
];
