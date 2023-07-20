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
  devtool: "eval-cheap-module-source-map",
  plugins: [
    // 开启react模块热替换插件
    new ReactRefreshWebpackPlugin(),
  ],
});
