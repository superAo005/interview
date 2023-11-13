// 参考文档: https://juejin.cn/post/7259647015604863013?utm_source=gold_browser_extension
// Promise 有 pending、fulfilled 和 rejected 三种状态，其中初始状态状态为 pending。
// 等待中
const PROMISE_PENDING_STATE = "pending";
// 成功
const PROMISE_FULFILLED_STATE = "fulfilled";
// 失败
const PROMISE_REJECTED_STATE = "rejected";

class Promise {
  constructor(execute) {
    this.PromiseState = PROMISE_PENDING_STATE;
    this.PromiseResult = undefined;
    // 存储当 Promise 状态改变后需要执行的回调方法
    // 当 Promise 状态由 pending -> fulfilled 或 pending -> rejected 时，
    // 循环执行 callbacks 存储的回调方法，使其支持异步修改 Promise 的状态
    this.callbacks = [];
    // 通过bind改变this指向
    // 执行函数抛出错误的时，Promise 的状态也将由 pending -> rejected，
    // 需要通过 try catch 捕获错误。
    // execute(this.resolve.bind(this), this.reject.bind(this));
    try {
      execute(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }
  // Promise 的状态转换是不可逆的，一旦由 pending -> fulfilled 或 pending -> rejected
  // 就不能再改变 Promise 的状态。
  resolve(result) {
    // 当PromiseState为初始状态时，才允许修改
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_FULFILLED_STATE;
      this.PromiseResult = result;
      // 循环执行成功回调
      this.callbacks.forEach((cb) => {
        cb.onResolved(this.PromiseResult);
      });
    }
  }
  reject(error) {
    if (this.PromiseState === PROMISE_PENDING_STATE) {
      this.PromiseState = PROMISE_REJECTED_STATE;
      this.PromiseResult = error;
      // 循环执行失败回调
      this.callbacks.forEach((cb) => {
        cb.onRejected(this.PromiseResult);
      });
    }
  }
  // then 方法返回一个新的 Promise，该 Promise 的状态由回调函数决定。
  // 如果回调函数返回的是一个 Promise 对象，那么新 Promise 的状态将与该 Promise 对象的状态相同。
  // 如果回调函数抛出错误，那么新 Promise 的状态将为 rejected，需要通过 try catch 捕获错误。
  //   then(onResolved, onRejected) {
  //     return new Promise((resolve, reject) => {
  //       // 成功
  //       if (this.PromiseState === PROMISE_FULFILLED_STATE) {
  //         try {
  //           const result = onResolved(this.PromiseResult);
  //           if (result instanceof Promise) {
  //             result.then(
  //               (res) => {
  //                 resolve(res);
  //               },
  //               (err) => {
  //                 reject(err);
  //               }
  //             );
  //           } else {
  //             resolve(result);
  //           }
  //         } catch (err) {
  //           reject(err);
  //         }
  //       }

  //       // 失败
  //       if (this.PromiseState === PROMISE_REJECTED_STATE) {
  //         try {
  //           const result = onRejected(this.PromiseResult);
  //           if (result instanceof Promise) {
  //             result.then(
  //               (res) => {
  //                 resolve(res);
  //               },
  //               (err) => {
  //                 reject(err);
  //               }
  //             );
  //           } else {
  //             resolve(result);
  //           }
  //         } catch (err) {
  //           reject(err);
  //         }
  //       }
  //     });
  //   }
  then(onResolved, onRejected) {
    return new Promise((resolve, reject) => {
      // 封装的公共方法
      const callback = (fn) => {
        try {
          // result可能是promise 或者是普通值
          const result = fn(this.PromiseResult);
          if (result instanceof Promise) {
            result.then(
              (res) => {
                resolve(res);
              },
              (err) => {
                reject(err);
              }
            );
          } else {
            resolve(result);
          }
        } catch (err) {
          reject(err);
        }
      };
      // 成功
      if (this.PromiseState === PROMISE_FULFILLED_STATE) {
        callback(onResolved);
      }
      // 失败
      if (this.PromiseState === PROMISE_REJECTED_STATE) {
        callback(onRejected);
      }
      // 等待中
      if (this.PromiseState === PROMISE_PENDING_STATE) {
        // 添加异步回调
        this.callbacks.push({
          onResolved: () => {
            callback(onResolved);
          },
          onRejected: () => {
            callback(onRejected);
          },
        });
      }
    });
  }
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(result) {
    return new Promise((resolve, reject) => {
      if (result instanceof Promise) {
        result.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      } else {
        resolve(result);
      }
    });
  }

  static reject(result) {
    return new Promise((resolve, reject) => {
      reject(result);
    });
  }

  static all(promises) {
    let result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        promises[i].then(
          (res) => {
            result[i] = res;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      }
    });
  }

  static race(promises) {
    return new Promise((resolve, reject) => {
      for (let i = 0; i < promises.length; i++) {
        // promises[i].then(
        //   (res) => {
        //     resolve(res);
        //   },
        //   (reason) => {
        //     reject(reason);
        //   }
        // );
        if (promises[i] instanceof Promise) {
          promises[i].then(resolve, reject);
        } else {
          Promise.resolve(promises[i]).then(resolve, reject);
        }
      }
    });
  }
}
export default Promise;

