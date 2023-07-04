const { RawSource } = require("webpack-sources");
const JSZip = require("jszip");
// const path = require("path");
class ZipPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    let that = this;
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
  }
}
module.exports = ZipPlugin;
