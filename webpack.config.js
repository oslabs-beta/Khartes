  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CopyPlugin = require('copy-webpack-plugin');
  const fs = require('fs');
module.exports = [
  {
    mode: 'development',
    entry: './client/react.tsx',
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
     },
    //  devServer: {
    //   contentBase: path.join(__dirname, './client'),
    //   compress: true,
    //   hot: true,
    //   host,
    //   port: 3000,
    //   publicPath: '/',
    // },
    // plugins: [
    //   new HtmlWebpackPlugin({
    //     template: './client/index.html'
    //   }),
      // new CopyPlugin({
      //   patterns: [
      //     {from: './dist'}
      //   ]
      // })
    // ],
    resolve: {
      extensions: ['.ts', ".js", ".tsx"],
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
    // devServer: {
    //   contentBase: path.join(__dirname, 'dist'),
    //   port: 9002,
    // },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html'
      }),
      // new CopyPlugin({
      //   patterns: [
      //     {from: './dist'}
      //   ]
      // })
    ],
    resolve: {
      extensions: ['.ts', ".js", ".tsx"],
    },
  }
];
