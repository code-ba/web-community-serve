// https://webpack.js.org/guides/production/#setup
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.config.base')
// https://webpack.js.org/plugins/terser-webpack-plugin/
const TerserPlugin = require("terser-webpack-plugin"); // 该插件使用terser来缩小JavaScript。

const webpackConfig = merge(baseWebpackConfig, {
  mode: "production",
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      // https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
      terserOptions: {
        // 点击 Terser minify options. 查看详细配置
        parse: {
          // parse options
        },
        compress: {
          // compress options
          drop_console: false,//（默认值：false）-传递true以放弃对console.*函数的调用 。如果您希望在删除函数调用后删除特定的函数调用，例如console.info和/或保留函数自变量的副作用，请pure_funcs改用。
          dead_code: true, //（默认值：true）-删除无法访问的代码
          drop_debugger: true, //（默认值：true）-删除debugger;语句
        },
        mangle: {
          // mangle options

          properties: {
            // mangle property options
          }
        },
        format: {
          // format options (can also use `output` for backwards compatibility)
          comments: false, //（默认"some"）- 默认情况下，它将保留包含“ @license”或“ @preserve”的JSDoc样式的注释，传递true或"all"保留所有注释，false以在输出中省略注释，正则表达式字符串（例如 /^ !/）或函数。
          beautify: false,//（默认false）-是否实际美化输出。通过-b会将其设置为true，但是-b即使要生成缩小的代码，也可能需要通过，以便指定其他参数，以便可以-b beautify=false覆盖它。
        },
        sourceMap: {
          // source map options
        },
        ecma: 5, // specify one of: 5, 2015, 2016, etc.
        keep_classnames: false,
        keep_fnames: false,
        ie8: false,
        module: false,
        nameCache: null, // or specify a name cache object
        safari10: false,
        toplevel: false,
        // 混淆js
        // mangle:true 默认混淆方法
        mangle: {// 要启用mangler，您需要传递--mangle（-m）。支持以下（逗号分隔）选项
          toplevel: true,//（默认false）-在顶级范围中声明的名称。
          eval: true //（默认false）-在使用eval或的范围中可见的名称with。
          // 如果启用了重整，但您想防止某些名称被重整，则可以使用--mangle reserved—传递以逗号分隔的名称列表来声明这些名称。例如：terser ... -m reserved=['$','require','exports']
        }
      },
      // https://webpack.js.org/plugins/terser-webpack-plugin/#parallel
      parallel: true,// 默认 true，并行化可以显著加快构建速度，因此强烈推荐使用并行化。
    })],
    // https://webpack.js.org/plugins/split-chunks-plugin/#split-chunks-example-1
    splitChunks: {
      cacheGroups: {
        // 创建一个commons块，其中包括入口点之间共享的所有代码。
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 3,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupenforce
          enforce: true // 默认false，WebPack会忽略splitChunks.minSize，splitChunks.minChunks，splitChunks.maxAsyncRequests和splitChunks.maxInitialRequests选项，只为这个高速缓存组创建块。开启强制后就不会忽略了
        }
      }
    }
  }
});
module.exports = webpackConfig