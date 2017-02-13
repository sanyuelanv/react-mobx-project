var path = require('path')
var webpack = require('webpack')
var node_module_dir = path.resolve(__dirname, 'node_module')
  // 能在所有JS模块里面读取“__DEV__”这个值
var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
})

module.exports = {
  entry: [
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
  },
	plugins: [
    definePlugin,
  ],
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
			include: [
        path.resolve(__dirname, 'app'),
      ],
      loader: 'style-loader!css-loader?modules&localIdentName=_[local]_[hash:base64:5]'
    }]
  }
}
