const path = require('path')
const webpack = require('webpack')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ip = require('ip')
const childProcess = require('child_process')
let cmd
const port = 8080
const host = ip.address()
switch (process.platform) {
  case 'wind32': {
    cmd = 'start'
    break
  }
  case 'linux': {
    cmd = 'xdg-open'
    break
  }
  case 'darwin': {
    cmd = 'open'
    break
  }
}
module.exports = {
  entry: {
    'app': [
      // path.resolve(__dirname, 'app/console.js'),
      path.resolve(__dirname, 'app/main.js')
    ]
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://cnodejs.org',
        secure: false
      }
    },
    contentBase: path.join(__dirname, 'build'),
    compress: true,
    port,
    host,
    historyApiFallback: true,
    after (app) {
      childProcess.exec(`${cmd} http://${host}:${port}/`)
    }
  },
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'demo',
      template: 'app/index.html',
      inject: true,
      chunks: ['app']
    }),
    new webpack.ProvidePlugin({
      PropTypes: 'prop-types'
    })
  ],
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: { limit: 2500 }
      }],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }
    ]
  }
}
