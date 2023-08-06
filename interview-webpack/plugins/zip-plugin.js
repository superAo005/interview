const { RawSource } = require("webpack-sources"); //内置模块
const JSZip = require("jszip");
// const { Compilation } = require("webpack");
// const path = require("path");
class ZipPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let that = this;
    // 编译完成后 把dist目录下的资源
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      let zip = new JSZip();
      for (let filename in compilation.assets) {
        const source = compilation.assets[filename].source();
        zip.file(filename, source);
      }
      zip.generateAsync({ type: "nodebuffer" }).then((content) => {
        compilation.assets[that.options.filename] = new RawSource(content);
        callback();
      });
    });
    //同步
    compiler.hooks.done.tap("DonePlugin", (stats) => {
      console.log("同步-压缩文件已完成:", that.options.filename);
    });
    // 异步
    compiler.hooks.done.tapAsync("DonePlugin", (stats, callback) => {
      console.log("异步-压缩文件已完成:", that.options.filename);
      callback();
    });
    
  }
}
module.exports = ZipPlugin;
