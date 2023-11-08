const static = require('koa-static');
const path = require('path');

function serveStaticPlugin({app,root}){

    // vite在哪里运行 就以哪个目录启动静态服务
    app.use(static(root));
    // 以public作为静态服务
    app.use(static(path.join(root,'public')));
}


// 导出静态服务插件
exports.serveStaticPlugin = serveStaticPlugin;