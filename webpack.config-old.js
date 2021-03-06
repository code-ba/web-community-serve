const path = require('path')
// 排除一些不会使用到的模块
const nodeExcternals = require('webpack-node-externals')
// https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpackconfig = {
  target: "node",
  mode: "development",
  // https://webpack.js.org/configuration/devtool/
  devtool: 'eval-source-map',//eval-source-map 是最慢的构建速度，显示源码，方便调试
  entry: {
    server: path.join(__dirname, "src/app.js")
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, "./dist")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  // https://webpack.js.org/configuration/externals/
  externals: [nodeExcternals()],
  plugins: [new CleanWebpackPlugin()],
  // https://webpack.js.org/configuration/node/
  node: {
    /*
    设置 true: Provide a polyfill.（提供一个 polyfill）
    这里通过 babel-polyfill 来理解的 global 的 polyfill
    babel-polyfill的意思它是通过向全局对象和内置对象的prototype上添加方法来实现的。比如运行环境中不支持Array.prototype.find 方法，引入polyfill, 我们就可以使用es6方法来编写了，但是缺点就是会造成全局空间污染。
    其实意思差不多就是 全局对象兼容，this 兼容。
    */
    global: true // webpack5 只能设置 global、__filename、__dirname 这三个
  }
}
module.exports = webpackconfig;