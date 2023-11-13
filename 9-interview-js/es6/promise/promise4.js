//定义三种状态常量
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class Promise {
  constructor(executor) {
    this.status = PROMISE_STATUS_PENDING;
    this.value = undefined;
    this.error = undefined;
    this.resfns = [];
    this.errfns = [];
    const resolve = (value) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return; //避免 调用resolve 后又调用 reject 多次执行
          this.status = PROMISE_STATUS_FULFILLED;
          this.value = value;
          this.resfns.forEach((fn) => {
            fn(this.value);
          });
        });
      }
    };
    const reject = (error) => {
      if (this.status === PROMISE_STATUS_PENDING) {
        queueMicrotask(() => {
          if (this.status !== PROMISE_STATUS_PENDING) return;
          this.status = PROMISE_STATUS_REJECTED;
          this.error = error;
          this.errfns.forEach((fn) => {
            fn(this.error);
          });
        });
      }
    };
    executor(resolve, reject);
  }
  then(resfn, errfn) {
    // 1.利用抛错让下一个promise的catch帮忙处理  防止catch方法让链式调用断层
    const defaultOnRejected = (err) => {
      throw err;
    };
    errfn = errfn || defaultOnRejected;

    const defaultOnFulfilled = (value) => {
      return value;
    };
    resfn = resfn || defaultOnFulfilled;

    return new Promise((resolve, reject) => {
      //1. 直接new 一个promise 作为then 方法的返回值 
      // 既可实现 .then.then.then.....等等链式调用
      if (this.status === PROMISE_STATUS_FULFILLED && resfn) {
        try {
          //2. 异常处理：若成功则继续执行then链式调用 的第一个回调，失败则执行then 的第二个回调
          const value = resfn(this.value);
          resolve(value);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status === PROMISE_STATUS_REJECTED && errfn) {
        try {
          const value = errfn(this.error);
          resolve(value);
        } catch (err) {
          reject(err);
        }
      }
      if (this.status === PROMISE_STATUS_PENDING) {
        if (resfn) {
          this.resfns.push(() => {
            //push 回调函数
            try {
              const value = resfn(this.value);
              resolve(value);
            } catch (err) {
              reject(err); //tips:****利用抛出的错误 使得下一个promise的catch帮忙处理
            }
          });
        }
        if (errfn) {
          this.errfns.push(() => {
            try {
              const value = errfn(this.error);
              resolve(value);
            } catch (err) {
              reject(err);
            }
          });
        }
      }
    });
  }
  catch(errfn) {
    //2.catch 方法
    return this.then(undefined, errfn);
  }
  finally(fn) {
    setTimeout(() => {
      fn();
    }, 0);
  }
}
// 实现Promise.all 以及 race
Promise.all = function (arr) {
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
};

Promise.race = function (arr) {
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
};
// Promise allSetted
Promise.allSettled = function (arr) {
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
};

export default Promise;


