// webpack.prod.js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base.js");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //抽离css插件
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); //压缩css
const TerserPlugin = require("terser-webpack-plugin"); //压缩js
const PurgeCSSPlugin = require("purgecss-webpack-plugin"); //去除没用到的css插件
const CompressionPlugin = require("compression-webpack-plugin"); //打包生成gzip插件
const globAll = require("glob-all");
//自定义插件
const ZipPlugin = require("../plugins/zip-plugin");
const WebpackArchivePlugin = require("../plugins/webpack-archive-plugin");
const AutoExternalPlugin = require("../plugins/AutoExternalPlugin");
//自定义插件 --end
const { PUBLIC_PATH, DIST_PATH } = require("./utils/constants.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //速度分析插件
const smp = new SpeedMeasurePlugin();
const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map",
  // 告诉webpack这些包不用打包，直接在HTML中引入
  // externals: {
  //   jquery: "jQuery",
  //   react: "react",
  //   redux: "redux",
  //   "react-dom": "ReactDOM",
  //   "react-router-dom": "ReactRouterDOM",
  //   axios: "axios",
  // },
  plugins: [
    new AutoExternalPlugin({
      jquery: {
        //自动把jquery模块变成一个外部依赖模块
        variable: "jQuery", //不再打包，而是从window.jQuery变量上获取jquery对象
        url: "https://cdn.bootcss.com/jquery/3.1.0/jquery.js", //CDN脚本
      },
      lodash: {
        //自动把jquery模块变成一个外部依赖模块
        variable: "_", //不再打包，而是从window.jQuery变量上获取jquery对象
        url: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js", //CDN脚本
      },
    }),
    // 复制文件插件
    new CopyPlugin({
      patterns: [
        {
          from: PUBLIC_PATH, // 复制public下文件
          to: DIST_PATH, // 复制到dist目录中
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css",
    }),
    // 去除没用到的css插件
    new PurgeCSSPlugin({
      paths: globAll.sync([
        `${path.join(__dirname, "../src")}/**/*.tsx`,
        `${path.join(__dirname, "../public")}/index.html`,
      ]),
      safelist: {
        standard: [/^ant-/], // 过滤以ant-开头的类名，哪怕没用到也不删除
      },
    }),
    // 打包生成gzip插件
    new CompressionPlugin({
      test: /\.(js|css)$/, // 只生成css,js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式，默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8, // 压缩率,默认值是 0.8
    }),
    new ZipPlugin({
      filename: "assets.zip",
    }),
    // new WebpackArchivePlugin({
    //   filename: "[timestamp].zip",
    // }),
  ],
  // 优化配置
  optimization: {
    minimize: true, //开始最小化
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"],
          },
        },
      }),
    ],
    runtimeChunk: "single",
    splitChunks: {
      // 表示选择哪些 chunks 进行分割，可选值有：async，initial和all
      chunks: "all",
      // 表示新分离出的chunk必须大于等于minSize，默认为30000，约30kb。
      minSize: 30000,
      // 表示按需加载文件时，并行请求的最大数目。默认为5。
      maxAsyncRequests: 5,
      // 表示加载入口文件时，并行请求的最大数目。默认为3。
      maxInitialRequests: 3,
      // 表示拆分出的chunk的名称连接符。默认为~。如chunk~vendors.js
      automaticNameDelimiter: "~",
      // 设置chunk的文件名。默认为true。当为true时，splitChunks基于chunk和cacheGroups的key自动命名。
      // name: true,
      // 分隔代码
      //cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块，就分配到该组。
      // 模块可以被多个组引用，但最终会根据priority来决定打包到哪个组中。
      // 默认将所有来自node_modules目录的模块打包至vendors组，将两个以上的chunk所共享的模块打包至default组。
      cacheGroups: {
        vendors: {
          // 提取node_modules代码
          test: /node_modules/, // 只匹配node_modules里面的模块
          // name: "vendors", // 提取文件命名为vendors,js后缀和chunkhash会自动加
          name(module) {
            // 排除node_modules 然后吧 @ 替换为空 ,考虑到服务器的兼容
            //拆分第三方库
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];
            return `npm.${packageName.replace("@", "")}`;
          },
          minChunks: 1, // 只要使用一次就提取出来 表示一个模块至少应被minChunks个chunk所包含才能分割。默认为1
          chunks: "initial", // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
          priority: 1, // 提取优先级为1
        },
        commons: {
          // 提取页面公共代码
          name: "commons", // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 提取代码体积大于0就提取出来
        },
        // 增加antd提取
        antd: {
          name: "antd",
          test: /[\\/]node_modules[\\/](antd|@ant-design)/,
          chunks: "all",
          priority: 10,
          reuseExistingChunk: true,
        },
        react: {
          test(module) {
            return (
              module.resource && module.resource.includes("node_modules/react")
            );
          },
          chunks: "initial",
          filename: "react.[contenthash].js",
          priority: 1,
          maxInitialRequests: 1,
          minChunks: 1,
        },
      },
    },
    runtimeChunk: {
      //运行时代码要单独分割
      name: (entrypoint) => `runtime-${entrypoint.name}`,
    },
    // moduleIds: isEnvProduction ? "deterministic" : "named",
    // chunkIds: isEnvProduction ? "deterministic" : "named",
  },
  performance: {
    // hints: "warning",
    hints: false, //关闭 webpack 的性能提示
    maxEntrypointSize: 40000000,
    //生成文件的最大体积
    maxAssetSize: 20000000,
    assetFilter: function (assetFilename) {
      return assetFilename.endsWith(".js");
    },
  },
};
// module.exports = smp.wrap(merge(baseConfig, prodConfig));
module.exports = merge(baseConfig, prodConfig);
