class SuperTask {
  constructor(count = 2) {
    this.count = count;
    this.tasks = [];
    this.runCount = 0; //正在执行的任务
  }
  add(task) {
    return new Promise((resolve, reject) => {
      this.tasks.push({
        task,
        resolve,
        reject,
      });
      this._run();
    });
  }
  // 执行任务
  _run() {
    while (this.tasks.length && this.runCount < this.count) {
      const { task, reject, resolve } = this.tasks.shift();
      this.runCount++;
      task()
        .then(resolve, reject)
        .finally(() => {
          this.runCount--;
          this._run();
        });
    }
  }
}
function timeout(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}
const superTask = new SuperTask();
function addTask(time, name) {
  superTask
    .add(() => timeout(time))
    .then(() => {
      console.log(`任务${name}完成`);
    });
}
addTask(10000, "1"); //10s之后执行
addTask(5000, "2"); //5s后执行
addTask(3000, "3"); //8s后执行
addTask(4000, "4"); //12s后执行
addTask(5000, "5"); // 15s后执行
