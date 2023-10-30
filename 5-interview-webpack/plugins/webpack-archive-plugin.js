const JSZip = require("jszip");
const { RawSource } = require("webpack-sources");
const { Compilation } = require("webpack");
/**
 * 1.如何获取打出后的文件名和文件内容
 * 2.如何打压缩包
 * 3.如何向目标目录输出压缩包
 */
class WebpackArchivePlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    //每当webpack开启一次新的编译 ，就会创建一个新的compilation
    // compiler.hooks.compilation.tap("WebpackArchivePlugin", (compilation) => {
    //
    //   compilation.hooks.chunkAsset.tap(
    //     "WebpackArchivePlugin",
    //     (chunk, filename) => {
    //       console.log(chunk.name || chunk.id, filename);
    //     }
    //   );
    // });
    compiler.hooks.compilation.tap("WebpackAssetsPlugin", (compilation) => {
      //当确定好文件，当你处理每个资源的时候处执行
      //每次根据chunk创建一个新的文件后会触发一次chunkAsset
      // 再回调里返回的是peomise 就使用tapPromise
      compilation.hooks.processAssets.tapPromise(
        { name: "WebpackArchivePlugin" },
        (assets) => {
          const zip = new JSZip();
          for (const filename in assets) {
            const sourceObj = assets[filename];
            const sourceCode = sourceObj.source(); //返回源代码字符串
            zip.file(filename, sourceCode);
          }
          return zip
            .generateAsync({ type: "nodebuffer" })
            .then((zipContent) => {
              assets[`archive_${Date.now()}.zip`] = new RawSource(zipContent);
              // assets[`archive_${Date.now()}.zip`] = {
              //   source: () => zipContent,
              //   size: () => zipContent.length,
              // };
            });
        }
      );
    });
  }
}
module.exports = WebpackArchivePlugin;
