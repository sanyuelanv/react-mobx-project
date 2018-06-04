const sourceMappingURL = require('source-map-url')
const _ = require('lodash')

function InlineChunkPlugin (options) {
  this.options = Object.assign({ inlineChunks: [], quiet: false }, options)
}

InlineChunkPlugin.prototype.log = function (message) {
  if (!this.options.quiet) {
    console.log(message)
  }
}

InlineChunkPlugin.prototype.performInlining = function (compilation, htmlPluginData, callback) {
  const me = this

  let publicPath = compilation.options.output.publicPath || ''
  if (publicPath && publicPath.substr(-1) !== '/') {
    publicPath += '/'
  }
  _.each(me.options.inlineChunks, function (name) {
    const chunkPath = (compilation.chunks.filter(function (chunk) {
      return chunk.name === name
    })[0] || { files: [] }).files[0]

    me.log('html-webpack-inline-chunk-plugin: Inlined ' + chunkPath)
    if (chunkPath) {
      const tag = _.find(htmlPluginData.body, { attributes: { src: publicPath + chunkPath }})
      if (tag) {
        delete tag.attributes.src
        tag.innerHTML = sourceMappingURL.removeFrom(compilation.assets[chunkPath].source())
      }
    }
  })
  callback(null, htmlPluginData)
}

InlineChunkPlugin.prototype.apply = function (compiler) {
  const me = this

  if (compiler.hooks) {
    // webpack 4 support
    compiler.hooks.compilation.tap('HtmlWebpackInlineChunkPlugin', function (compilation) {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync('HtmlWebpackInlineChunkPlugin', function (htmlPluginData, callback) {
        me.performInlining(compilation, htmlPluginData, callback)
      })
    })
  }
  else {
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('html-webpack-plugin-alter-asset-tags', function (htmlPluginData, callback) {
        me.performInlining(compilation, htmlPluginData, callback)
      })
    })
  }
}

module.exports = InlineChunkPlugin
