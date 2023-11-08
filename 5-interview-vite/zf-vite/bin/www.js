#! /usr/bin/env node
// 可以运行的脚本

// 需要通过http启动一个模块 内部是基于koa的
const createServer = require('../index')

// 创建一个koa的服务

createServer().listen(4000,()=>{
    console.log('server start 4000 port','http://localhost:4000')
});