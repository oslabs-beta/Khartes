const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
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
   },
  resolve: {
    extensions: ['.ts', ".js", ".tsx"],
  }
},
{
  mode: 'development',
  entry: './client/index.tsx',
  target: 'electron-renderer',
  devtool: 'source-map',
  module: { 
    rules: [
      {
    test: /\.ts(x?)$/,
    include: /client/,
    use: [{ loader: 'ts-loader' }]
  },
  {
    test: /css$/,
    exclude: /node_modules/,
    use: ['style-loader', 'css-loader', 'sass-loader'],
},
{
  test: /\.(svg|png|jpg|gif|jpeg)$/,
  type: "asset/resource"
}
] },
  output: {
    path: __dirname + '/dist',
    filename: 'index.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    }),
  ],
  resolve: {
    extensions: ['.ts', ".js", ".tsx"],
  },
}
];
