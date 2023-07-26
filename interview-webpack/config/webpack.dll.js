const path = require("path");
const DllPlugin = require("webpack/lib/DllPlugin");
// webpack5 开箱即用的持久缓存是比 dll 更优的解决方案
// 不用再配置 dll 了，开启webpack持久化存储缓存
module.exports = {
  mode: "development",
  entry: {
    react: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].dll.js", //react.dll.js
    library: "_dll_[name]",//库的名字叫 _dll_[name]
  },
  plugins: [
    new DllPlugin({
      name: "_dll_[name]",
      path: path.join(__dirname, "dist", "[name].manifest.json"), //react.manifest.json
    }),
  ],
};
