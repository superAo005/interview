## vue nextTick
nextTick 可以让我们在下次 DOM 更新循环结束之后执行延迟回调，用于获得更新后的 DOM
1. nextTick 是异步的，在下次 DOM 更新循环结束之后执行延迟回调 
2. 在修改数据之后立即使用这个方法，获取更新后的 DOM
nextTick主要使用了宏任务和微任务。根据执行环境分别尝试采用
Promise
MutationObserver
setImmediate
如果以上都不行则采用setTimeout