const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
  },
  devServer: {
    static: {
      publicPath: '/dist',
      directory: path.resolve(__dirname, 'dist')
    },
    port: 8080,
    proxy: {
      '/': 'http://localhost:3000',
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './client/index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve:{
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        //handling react code with JS and JSX
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      //css
      {
        test: /\.s?css$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }
    ],
  },
};