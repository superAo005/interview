## Express 和 Koa 框架中间件有什么不同

中间件： app.use 方法就是往中间件队列中塞入新的中间件，express 中间件处理方式是线性的，next 过后继续寻找下一个中间件，当然如果没有调用 next()的话，就不会调用下一个函数了，调用就会被终止
express 中间件：是通过 next 的机制，即上一个中间件会通过 next 触发下一个中间件
koa2 中间件：是通过 async await 实现的，中间件执行顺序是“洋葱圈”模型（推荐）

### node 有哪些相关的文件路径

Node 中的文件路径有 **dirname, **filename, process.cwd(), ./ 或者 ../
**dirname: 总是返回被执行的 js 所在文件夹的绝对路径
**filename: 总是返回被执行的 js 的绝对路径
process.cwd(): 总是返回运行 node 命令时所在的文件夹的绝对路径

### node 相关 path API 有哪些？

path.dirname()： 返回 path 的目录名
path.join()：所有给定的 path 片段连接到一起，然后规范化生成的路径
path.resolve()：方法会将路径或路径片段的序列解析为绝对路径，解析为相对于当前目录的绝对路径，相当于 cd 命令
