// https://webpack.js.org/guides/production/#setup
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')

const webpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-source-map',//eval-source-map 是最慢的构建速度，显示源码，方便调试
  // https://webpack.js.org/configuration/stats/#statschildren
  stats: {
    // 告知stats是否添加有关子代的信息。
    children: false
  }
})

module.exports = webpackConfig