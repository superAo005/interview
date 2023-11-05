
function _runTask(task, cb) {
  requestIdleCallback((idle) => {
    if (idle.timeRemaining() > 0) {
      task();
      cb();
    } else {
      _runTask(task, cb);
    }
  });
}
/**
 * 运行一个耗时任务
 * 如果要异步执行任务 返回promise
 * 尽快完成任务 同时ui页面不卡顿
 * @param {*} task
 * @returns
 */
function runTask(task) {
  return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     task();
    //     resolve();
    //   }, 0);
    _runTask(task, resolve);
  });
}
// for (;;) {
  // 取出宏任务
  // 执行宏任务
  // if(渲染时机是否达到){
  //  渲染
  // }
// }
