const Koa = require("koa");
const { serveStaticPlugin } = require("./plugins/serverPluginServeStatic.js");
const {
  moduleRewritePlugin,
} = require("./plugins/serverPluginModuleRewrite.js");
const {
  moduleResolvePlugin,
} = require("./plugins/serverPluginModuleResolve.js");
const { htmlRewritePlugin } = require("./plugins/serverPluginHtml.js");
const { vuePlugin } = require("./plugins/serverPluginVue.js");

function createServer() {
  const app = new Koa(); // 创建一个koa实例
  const root = process.cwd();
  // 当用户运行 npm run my-dev时 会创建服务
  // koa是基于中间件来运行的
  const context = {
    app,
    root, // 当前的根的位置
  };
  // koa的中间件的执行顺序  中间件的原理
  const resolvedPlugins = [
    // 插件的集合
    htmlRewritePlugin,
    // 2) 解析import重写路径
    moduleRewritePlugin,
    // 3) 解析 以/@modules文件开头的内容 找到对应的结果
    moduleResolvePlugin,
    // 1) 要实现静态服务的功能
    vuePlugin,
    serveStaticPlugin, // 功能是读取文件将文件的结果放到了ctx.body上
  ];

  resolvedPlugins.forEach((plugin) => plugin(context));
  return app; // 返回app 中有listen方法
}

module.exports = createServer;
