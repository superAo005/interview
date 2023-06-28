// 手写发布订阅模式
/**
 * 核心思路是：
使用一个对象作为缓存
on 负责把方法发布到缓存的 EventName 对应的数组
emit 负责遍历触发（订阅） EventName 下的方法数组
off 找方法的索引，并删除
 */
class Event {
  cache = {};
  on(event, fn) {
    this.cache[event] = this.cache[event] || [];
    this.cache[event].push(fn);
  }
  emit(event, res) {
    this.cache[event].forEach((fn) => {
      fn(res);
    });
  }
  off(event, fn) {
    const index = this.cache[event].indexOf(fn);
    if (index === -1) return;
    this.cache[event].splice(index, 1);
  }
}
// 测试用例
const event1 = new Event();
event1.on("test", (a) => {
  console.log(a);
});
event1.emit("test", "hello world");
event1.off("test");
event1.emit("test", "hello world");
// 手写promise
Promise.myAll = (arr) => {
  return new Promise((resolve, reject) => {
    let res = [];
    let count = 0;
    if (arr.length === 0) {
      resolve(res);
    } else {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Promise) {
          const item = arr[i];
          item.then(
            (data) => {
              res[i] = data;
              if (++count === arr.length) resolve(res);
            },
            (error) => {
              reject(error);
            }
          );
        } else {
          res[i] = arr[i];
          if (++count === arr.length) resolve(res);
        }
      }
    }
  });
};
// 测试用例
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11);
  }, 2000);
});
let p2 = new Promise((resolve, reject) => {
  reject("asfs");
});
let p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(33);
  }, 4);
});

Promise.myAll([p3, p1, 3, 4]).then(
  (data) => {
    // 按传入数组的顺序打印
    console.log(data); // [3, 1, 2]
  },
  (err) => {
    console.log(err);
  }
);
async function async1() {
  console.log("async1 start"); //2
  await async2();
  setTimeout(function () {
    console.log("setTimeout1"); //8
  }, 0);
}

async function async2() {
  setTimeout(function () {
    console.log("setTimeout2"); //7
  }, 0);
}

console.log("script start"); //1
setTimeout(function () {
  console.log("setTimeout3"); //6
}, 0);
async1();
new Promise(function (resolve) {
  console.log("promise1"); //3
  resolve();
}).then(function () {
  console.log("promise2"); //5
});
console.log("script end"); //4
