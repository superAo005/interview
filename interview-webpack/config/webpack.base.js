// webpack.base.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// friendly-errors-webpack-plugin在webpack5版本的不兼容
// const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
// 命令行提示优化插件
const FriendlyErrorsWebpackPlugin = require("@soda/friendly-errors-webpack-plugin");
const webpack = require("webpack");
const { IS_DEVELOPMENT, SRC_PATH } = require("./utils/constants");
const loadersPath = path.resolve(__dirname, "../loaders");

// const importPlugin = path.join(__dirname, "../plugins", "babel-plugin-import.js");
module.exports = {
  // 入口文件
  entry: path.resolve(__dirname, "../src/index.tsx"),
  // 打包文件出口
  output: {
    filename: "static/js/[name].[chunkhash:8].js", // 每个输出js的名称
    path: path.resolve(__dirname, "../dist"), // 打包的出口文件夹路径
    clean: true, // webpack4需要配置clean-webpack-plugin删除dist文件，webpack5内置了。
    publicPath: "/", // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        //oneOf只可能匹配数组中的某一个，找到一个之后就不再继续查找剩下的loader
        // 提升构建速度，避免每个文件都被所有loader过一遍
        oneOf: [
          {
            test: /\.css$/, //匹配所有的 less 文件
            enforce: "pre",
            include: [SRC_PATH],
            use: [
              IS_DEVELOPMENT ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
            ],
          },
          {
            test: /\.less$/, //匹配所有的 less 文件
            enforce: "pre",
            include: [SRC_PATH],
            use: [
              IS_DEVELOPMENT ? "style-loader" : MiniCssExtractPlugin.loader,
              "css-loader",
              "postcss-loader",
              "less-loader",
            ],
          },
          {
            test: /\.(ts|tsx|js|jsx)$/,
            include: [SRC_PATH],
            exclude: /node_modules/,
            enforce: "pre",
            // use: ["thread-loader", "babel-loader"],
            use: [
              //thread-loader开启线程池，开线程和线程通信都需要时间
              {
                loader: "thread-loader",
                options: { workers: 3 },
              },
              {
                loader: "babel-loader",
                options: {
                  cacheDirectory: true, //启动babel缓存
                  // plugins: [[importPlugin, { libraryName: "lodash" }]],
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        useBuiltIns: "usage",
                        corejs: { version: "3.29.0", proposals: true },
                      },
                    ],
                    ["@babel/preset-react", { runtime: "automatic" }],
                  ],
                },
              },
            ],
          },
          {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            type: "asset",
            parser: {
              //转base64的条件
              dataUrlCondition: {
                maxSize: 10 * 1024, // 10kb
              },
            },
            generator: {
              filename: "static/images/[name].[contenthash:6][ext]",
            },
          },
          {
            test: /\.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
            type: "asset", // type选择asset
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              },
            },
            generator: {
              filename: "static/fonts/[name].[contenthash:6][ext]", // 文件输出目录和命名
            },
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
            type: "asset", // type选择asset
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024, // 小于10kb转base64位
              },
            },
            generator: {
              filename: "static/media/[name].[contenthash:6][ext]", // 文件输出目录和命名
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
    alias: {
      "@": SRC_PATH,
    },
    modules: [path.resolve(__dirname, "../node_modules")],
  },
  resolveLoader: {
    //只对loader有用
    modules: [loadersPath, "node_modules"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      inject: true,
    }),
    // new webpack.IgnorePlugin(/^\.\/locale/, /moment$/),
    new webpack.DefinePlugin({
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    }),
    new FriendlyErrorsWebpackPlugin(),
  ],
  // 开启webpack持久化存储缓存
  cache: {
    type: "filesystem", // 使用文件缓存
  },
};
