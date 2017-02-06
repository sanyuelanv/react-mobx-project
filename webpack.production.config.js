var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var node_module_dir = path.resolve(__dirname, 'node_module')
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
})

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'app/main.js'), ],
    react: ['react', 'react-dom', 'babel-polyfill']
  },
  output: {
    path: path.resolve(__dirname, 'build/static/js'),
    filename: 'app.js'
  },
  module: {
    loaders: [{
      loader: "babel-loader", //加载babel模块
      include: [
        path.resolve(__dirname, 'app'),
      ],
      exclude: [
        node_module_dir
      ],
      test: /\.jsx?$/,
      query: {
        plugins: ['transform-runtime',"transform-decorators-legacy","transform-class-properties"],
        presets: ['es2015', 'stage-0', 'react']
      }
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=_[local]_[hash:base64:5]")
    }]
  },
  plugins: [
    definePlugin,
    new ExtractTextPlugin("../css/style.css"),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('react', 'react.js'),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
  ]
}

/*
	new webpack.DefinePlugin({"process.env": {NODE_ENV: JSON.stringify("production")}}),
	由于官方的React是已经合并过的了，所以Webpack是不提倡这样去合并React因此需要这一句去设置环境变量去再定制
*/
