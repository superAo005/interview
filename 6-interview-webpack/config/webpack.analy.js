const prodConfig = require("./webpack.prod.js");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const chalk = require("chalk");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
       // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(":percent")} (:elapsed s)`,
    }),
      // 分析webpack构建结果文件
      new BundleAnalyzerPlugin({
        generateStatsFile: true, // 是否生成stats.json文件
      }),
    ],
  })
);
