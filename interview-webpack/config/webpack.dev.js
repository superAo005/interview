// webpack.dev.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const { PUBLIC_PATH, DIST_PATH } = require("./utils/constants.js");

// 合并公共配置，并添加开发环境配置
module.exports = merge(baseConfig, {
  mode: "development", // 开发模式，不会压缩最终代码
  devServer: {
    open: true, // 自动打开浏览器,不指定浏览器就打开默认浏览器
    port: 3000, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升速度
    // 解决路由跳转404问题
    historyApiFallback: true,
    hot: true,
    static: {
      //托管静态资源文件
      // directory: path.join(__dirname, "../public"),
      directory: PUBLIC_PATH,
    },
  },
  // 本地开发首次打包慢点没关系，因为 eval 缓存的原因，rebuild 会很快
  // 开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 cheap
  // 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 module
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin(),
  ],
});
