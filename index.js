// 实现injectFn
function add(a, b, cb) {
  let c = a + b;
  setTimeout(() => {
    cb(c);
  }, 1000);
}

function injectFn(fn) {
  return (...args) => {
    return new Promise((resove) => {
      fn(...args, (res) => {
        resove(res);
      });
    });
  };
}
let promise1 = injectFn(add);
promise1(1, 2).then((res) => console.log(res)); // 输出 3
promise1(3, 4).then((res) => console.log(res)); // 输出 7

function binarySearch(arr, n, searchFirst) {
  let low = 0;
  let high = arr.length - 1;
  let result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === n) {
      result = mid;
      if (searchFirst) {
        high = mid - 1; // 继续向左搜索第一个匹配的元素
      } else {
        low = mid + 1; // 继续向右搜索最后一个匹配的元素
      }
    } else if (arr[mid] < n) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}
// 示例用法
const arr = [1, 1, 2, 3, 3, 3, 3, 4, 6, 6];
const n = 3;

const occurrences = countOccurrences(arr, n);
console.log(occurrences); // 输出: 4
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
