var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var node_module_dir = path.resolve(__dirname, 'node_module')

module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'app/main.js'), ]
  },
  output: {
    path: path.resolve(__dirname, 'build/static/js'),
    chunkFilename: '[name].[chunkhash:5].js',
    // 这里需要根据服务器来更改，
    publicPath:'/static/js/',
    filename: 'app.[chunkhash:5].js'
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: ["babel-loader"],
        include: [path.resolve(__dirname, 'app')],
        exclude: [node_module_dir],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: 'css-loader?minimize&modules&localIdentName=_[local]_[hash:base64:5]',
        }),
        include: [path.resolve(__dirname, 'app')],
        exclude: [node_module_dir],
      },

    ]
  },
  node: {Buffer: false},
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({minimize: true}),
    new webpack.optimize.UglifyJsPlugin({
      // 最紧凑的输出
      beautify: false,
      // 删除所有的注释
      comments: false,

      compress: {
        // 在UglifyJs删除没有用到的代码时不输出警告
        warnings: false,
        // 删除所有的 `console` 语句
        // 还可以兼容ie浏览器
        drop_console: true,
        // 内嵌定义了但是只用到一次的变量
        collapse_vars: true,
        // 提取出出现多次但是没有定义成变量去引用的静态值
        reduce_vars: true,
      }
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      // 把你用到的，存在在node_modules里面的都打包出来
      minChunks: function(module) {
        return module.context && module.context.indexOf('node_modules') !== -1;
      },
      filename: 'common.[chunkhash:5].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      filename: 'manifest.[chunkhash:5].js'
    }),
    new ExtractTextPlugin({
      filename:(getPath) => {
        return getPath('../css/[name].css').replace('css/js', 'css');
      },
      allChunks:true
    }),
  ],
}
