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
