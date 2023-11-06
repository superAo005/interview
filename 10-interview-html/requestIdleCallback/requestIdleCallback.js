/**
 * window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队
 * 这使开发者能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应
 * 页面是一帧一帧绘制出来的，当每秒绘制的帧数（FPS）达到 60 时，页面是流畅的，小于这个值时，用户会感觉到卡顿
 * 1s 60帧，所以每一帧分到的时间是 1000/60 ≈ 16 ms。所以我们书写代码时力求不让一帧的工作量超过 16ms
 */

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
