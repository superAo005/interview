## Promise获取全部异步的结果
1.使用Promise.all一旦有一个结果为rejected就是走catch

## vue nextTick
1.nextTick是异步的，在下次DOM更新循环结束之后执行延迟回调
2.在修改数据之后立即使用这个方法，获取更新后的DOM