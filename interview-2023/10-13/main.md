# 希音面试

## Promise 获取全部异步的结果 

1. 使用 Promise.all一旦有一个结果为 rejected 就是走 catch
2. 只需要在.then返回一个promise的对象，不管是resolve还是reject都执行.then方法
3. 使用 Promise.allSettled 无论成功还是失败，都会执行
## vue nextTick

1.nextTick 是异步的，在下次 DOM 更新循环结束之后执行延迟回调 2.在修改数据之后立即使用这个方法，获取更新后的 DOM
