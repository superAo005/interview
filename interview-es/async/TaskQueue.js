function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// 实现taskSum(1000,()=>{console.log(1)}).task(1200,()=>{console.log(2)}).task(1300,()=>{console.log(3)})，
// 这里等待1s，打印1，之后等待1.2s，打印2，之后打印1.3s，打印3
class TaskQueue {
  constructor() {
    this.queue = Promise.resolve();
  }
  async task(delayTime, callback) {
    await this.queue;
    await delay(delayTime);
    callback();
  }
}
function taskSum(initialDelay, initialCallback) {
  const taskQueue = new TaskQueue();
  taskQueue.task(initialDelay, initialCallback);
  return taskQueue;
}

// 示例用法
taskSum(1000, () => {
  console.log(1);
})
  .task(1200, () => {
    console.log(2);
  })
  .task(1300, () => {
    console.log(3);
  });
