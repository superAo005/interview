/**
 * promises-aplus-tests 测试脚本可以测试所编写的代码是否符合PromiseA+的规范
 * promises-aplus-tests promise.js
 */
//定义三种状态常量
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

const resolvePromise = (promise2, x, resolve, reject) => {
  // 判断promise和x是否相同  相同就不要等待了 直接出错即可
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  // 判断类型 typeof instanceof tostring constructor
  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let called = false; // 内部测试的时候 会成功和失败都调用
    try {
      let then = x.then; // 取then 有可能这个then属性是通过Object.defineProperty定义
      if (typeof then === "function") {
        then.call(
          x,
          (y) => {
            if (called) {
              return;
            }
            called = true; //防止多次调用成功或者失败
            //y可能是个promise 递归调用 直到解析出来普通值
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) {
              return;
            }
            called = true;
            reject(r);
          }
        );
      } else {
        // 说明x是个普通对象 直接返回
        resolve(x);
      }
    } catch (error) {
      // promise 失败了 有可能还调用成功
      if (called) {
        return;
      }
      called = true;
      reject(error);
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    //初始化状态
    this.status = PROMISE_STATUS_PENDING;
    //初始化成功值
    this.value = undefined;
    //初始化失败值
    this.reason = undefined;
    //初始化成功回调函数集
    this.onResolvedCallbacks = [];
    //初始化失败回调函数集
    this.onRejectedCallbacks = [];
    //执行器
    let resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_FULFILLED;
        this.value = value;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        this.status = PROMISE_STATUS_REJECTED;
        this.reason = reason;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }
  //then是异步的
  then(onFulfilled, onRejected) {
    // onFulfilled, onRejected是可选参数
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (v) => v;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === PROMISE_STATUS_FULFILLED) {
        // 宏任务 为了保证promise2已经new完了
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);
            // resolve(x);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PROMISE_STATUS_REJECTED) {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject); // 解析x 和 promise2的关系
          } catch (error) {
            reject(error);
          }
        }, 0);
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  }
  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }
  static all(arr) {
    return new Promise((resolve, reject) => {
      if (arr.length === 0) {
        return resolve([]);
      } else {
        let res = [],
          count = 0;
        for (let i = 0; i < arr.length; i++) {
          // 同时也能处理arr数组中非Promise对象
          if (!(arr[i] instanceof Promise)) {
            res[i] = arr[i];
            if (++count === arr.length) resolve(res);
          } else {
            arr[i].then(
              (data) => {
                res[i] = data;
                if (++count === arr.length) resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          }
        }
      }
    });
  }
  static race(arr) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < arr.length; i++) {
        // 同时也能处理arr数组中非Promise对象
        if (!(arr[i] instanceof Promise)) {
          Promise.resolve(arr[i]).then(resolve, reject);
        } else {
          arr[i].then(resolve, reject);
        }
      }
    });
  }
  static catch(onRejected) {
    return this.then(null, onRejected);
  }
  static allSettled(arr) {
    return new Promise((resolve, reject) => {
      let res = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Promise) {
          arr[i].then(
            (data) => {
              res[i] = {
                status: "fulfiled",
                value: data,
              };
            },
            (err) => {
              res[i] = {
                status: "rejected",
                reason: err,
              };
            }
          );
        } else {
          res[i] = {
            status: "fulfiled",
            value: arr[i],
          };
        }
      }
      resolve(res);
    });
  }
}
// 语法糖 简化问题 嵌套的问题 ，被废弃了 延迟对象
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};
module.exports = Promise;
