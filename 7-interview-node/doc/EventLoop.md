## Node 中的 EventLoop

Node.js 采用 V8 作为 js 的解析引擎，而 I/O 处理方面使用了自己设计的 libuv
libuv 是一个基于事件驱动的跨平台抽象层，封装了不同操作系统一些底层特性，对外提供统一的 API
事件循环机制也是它里面的实现

- V8 引擎解析 JavaScript 脚本并调用 Node API
- libuv 库负责 Node API 的执行。它将不同的任务分配给不同的线程,形成一个 Event Loop（事件循环），以异步的方式将任务的执行结果返回给 V8 引擎
- V8 引擎再将结果返回给用户

## libuv

1. 同步执行全局的脚本
2. 执行所有的微任务，先执行 nextTick 中的所有的任务，再执行其它微任务
3. 开始执行宏任务，共有 6 个阶段，从第 1 个阶段开始，会执行每一个阶段所有的宏任务

## setImmediate

setTimeout/setInterval 取值范围是[1,2 的 32 次方-1],超出范围初始化为 1，所以 setTimeout(fn,0) = setTimeout(fn,1)
## process.nextTick
1. nextTick独立于Event Loop,有自己的队列，每个阶段完成后如果存在nextTick队列会全部清空，优先级高于微任务