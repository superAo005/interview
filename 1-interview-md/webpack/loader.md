参考链接 [loader](https://zhuanlan.zhihu.com/p/659040417)
## 什么是 loader

loader 其实就是一个内容转换器，将 webpack 不能识别的文件，转换为标准的 js 模块，交给 webpack 处理
loader 的本质是一个导出一个函数的 JavaScript 模块

```js
/**
 * @param {string/Buffer} content源文件的内容
 * @param {object}[map] sourcemap相关的数据
 * @param {any} [meta] 元数据，可以是任何内容
 */
module.exports = function (content, map, meta) {
  // 将webpack不能识别的文件内容content，转换处理后，进行返回
  return content;
};
```
## loader分类
pre 前置 loader
normal 普通 loader
inline 内联 loader
post 后置 loader
其中 pre 和 post loader，可以通过 rule 对象的 enforce 属性来指定，不指定时，默认为normal loader。

```js
// webpack.config.js
const path = require("path");

module.exports = {
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: ["a-loader"],
        enforce: "post", // post loader
      },
      {
        test: /\.txt$/i,
        use: ["b-loader"], // normal loader
      },
      {
        test: /\.txt$/i,
        use: ["c-loader"],
        enforce: "pre", // pre loader
      },
    ],
  },
}
```
## loader执行顺序
1. 先执行前置 loader，再执行普通 loader，最后执行后置 loader
2. 普通 loader 之间执行顺序，从前往后
3. 前置 loader 和后置 loader 之间执行顺序，从后往前
4. loader执行过程分为两个阶段，分别是 pitching 和 normal 阶段
## loader 运行的总体流程

1. Compiler.js 中会将用户配置与默认配置合并，其中就包括了 loader 部分
2. webpack 就会根据配置创建两个关键的对象——NormalModuleFactory 和 ContextModuleFactory。它们相当于是两个类工厂，通过其可以创建相应的 NormalModule 和 ContextModule
3. 在工厂创建 NormalModule 实例之前还要通过 loader 的 resolver 来解析 loader 路径
4. 在 NormalModule 实例创建之后，则会通过其.build()方法来进行模块的构建。构建模块的第一步就是使用 loader 来加载并处理模块内容。而 loader-runner 这个库就是 webpack 中 loader 的运行器
5. 最后，将 loader 处理完的模块内容输出，进入后续的编译流程

## loader 配置

loader 是导出为一个函数的 node 模块。该函数在 loader 转换资源的时候调用。给定的函数将调用 loader API，并通过 this 上下文访问
