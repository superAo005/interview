//定义三种状态常量
const PROMISE_STATUS_PENDING = "pending";
const PROMISE_STATUS_FULFILLED = "fulfilled";
const PROMISE_STATUS_REJECTED = "rejected";

class myPromise {
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

    return new myPromise((resolve, reject) => {
      //1. 直接new 一个mypromise 作为then 方法的返回值 既可实现 .then.then.thne.then.....等等链式调用

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
// 三种状态
const PENDING = "pending";
const RESOLVED = "resolved";
const REJECTED = "rejected";
// promise 接收⼀个函数参数，该函数会⽴即执⾏
class MyPromise {
  constructor(fn) {
    this.value;
    this.status = PENDING; // 默认状态
    // 解决问题：缓存回调，等待执行
    this.onResolveCallBack = []; // 缓存 onResolve
    this.onRejectCallBack = []; // 缓存 onReject
    // 这里使用 try catch 捕获中可能发生的错误
    let resove = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        // 遍历调用 onResolveCallBack
        this.onResolveCallBack.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.value = reason;
        this.status = REJECTED;
        // 遍历调用 onRejectCallBack
        this.onRejectCallBack.forEach((fn) => fn());
      }
    };
    try {
      // 这里必须要绑定 this，否则在外部调用时 this 就不会执行当前实例
      // fn(this.resolve.bind(this), this.reject.bind(this));
      fn(resove, reject);
    } catch (error) {
      // this.reject.bind(this, error);
      reject(error);
    }
  }
  // resolve(value) {
  //   if (this.status === PENDING) {
  //     this.value = value;
  //     this.status = RESOLVED;
  //     // 遍历调用 onResolveCallBack
  //     this.onResolveCallBack.forEach((fn) => fn());
  //   }
  // }
  // reject(reason) {
  //   if (this.status === PENDING) {
  //     this.value = reason;
  //     this.status = REJECTED;
  //     // 遍历调用 onRejectCallBack
  //     this.onRejectCallBack.forEach((fn) => fn());
  //   }
  // }
  then(onResolve, onReject) {
    // 当前 promise 实例调用了 resolve
    if (this.status === RESOLVED) {
      onResolve(this.value);
    }
    // 当前 promise 实例调用了 reject
    if (this.status === REJECTED) {
      onReject(this.value);
    }
    // 当前 promise 状态为 pending，把当前的 onResolve & onReject 缓存起来
    if (this.status === PENDING) {
      this.onResolveCallBack.push(() => {
        onResolve(this.value);
      });
      this.onRejectCallBack.push(() => {
        onReject(this.value);
      });
    }
  }
}

// es5模拟Promise
function Promise(fn) {
  fn(
    (data) => {
      this.success(data);
    },
    (error) => {
      this.error();
    }
  );
}

Promise.prototype.resolve = function (data) {
  this.success(data);
};

Promise.prototype.reject = function (error) {
  this.error(error);
};

Promise.prototype.then = function (success, error) {
  this.success = success;
  this.error = error;
};
class Promise {
  constructor(fn) {
    fn(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.error();
      }
    );
  }

  resolve(data) {
    this.success(data);
  }

  reject(error) {
    this.error(error);
  }

  then(success, error) {
    this.success = success;
    this.error = error;
    console.log(this);
  }
}
// 实现Promise.all 以及 race

Promise.myall = function (arr) {
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

Promise.myrace = function (arr) {
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

Promise.myall([p3, p1, 3, 4]).then(
  (data) => {
    // 按传入数组的顺序打印
    console.log(data); // [3, 1, 2]
  },
  (err) => {
    console.log(err);
  }
);

Promise.myrace([p1, p2, p3]).then(
  (data) => {
    // 谁快就是谁
    console.log(data); // 2
  },
  (err) => {
    console.log("失败跑的最快");
  }
);

// Promise allSetted
Promise.mySettled = function (arr) {
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
