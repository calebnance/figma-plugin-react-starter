const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');

const path = require('path');
const webpack = require('webpack');

module.exports = (env, argv) => ({
  mode: argv.mode === 'production' ? 'production' : 'development',

  // this is necessary because Figma's 'eval' works differently than normal eval
  devtool: argv.mode === 'production' ? false : 'inline-source-map',
  devServer: {
    open: ['/ui.html'],
    static: './dist'
  },

  entry: {
    ui: './src/ui.js', // entry point for ui code
    code: './src/code.js' // entry point for plugin code
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: argv.mode === 'production' ? 'production' : 'development'
          }
        }
      },
      // enables including CSS by doing "import './file.css'" in your code
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // allows you to use "<%= require('./file.svg') %>" in your HTML code to get a data URI
      // { test: /\.(png|jpg|gif|webp|svg|zip)$/, loader: [{ loader: 'url-loader' }] }
      {
        test: /\.svg/,
        type: 'asset/inline'
      }
    ]
  },

  // webpack tries these extensions for you if you omit the extension like "import './file'"
  resolve: { extensions: ['.js'] },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'), // compile into a folder called "dist"
    publicPath: '/'
  },

  // tells webpack to generate "ui.html" and to inline "ui.js" into it
  plugins: [
    new webpack.DefinePlugin({
      global: {} // fix missing symbol error when running in developer VM
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: './src/ui.html',
      filename: 'ui.html',
      chunks: ['ui']
    }),
    new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/ui/])
  ]
});
