let Promise = require("./promise");
// 测试用例
let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(11);
    reject(22);
  }, 2000);
});
let promise2 = p1.then(
  (res) => {
    console.log("测试-----" + res);
  },
  (err) => {
    console.log(err);
  }
);

let p2 = new Promise((resolve, reject) => {
  reject("asfs");
});
let p3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve(33);
  }, 4);
});
const p4 = new Promise((resolve, reject) => {
  reject("error");
}).then(
  () => {
    // ....
  },
  (err) => {
    console.log(err);
    return "error---2";
  }
);
const p5 = new Promise((resolve, reject) => {
  resolve("success");
}).then(
  (res) => {
    console.log(res); // success
    return "success----2";
  },
  () => {
    // ....
  }
);
const p6 = new Promise((resolve, reject) => {
  reject("error");
}).then(
  () => {
    // ....
  },
  (err) => {
    console.log(err); // error
    return "error---2";
  }
);
const p7 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 2000);
}).then(
  (res) => {
    console.log(res);
    return "success----2";
  },
  () => {
    // ...
  }
);
Promise.all([p3, p1, 3, 4]).then(
  (data) => {
    // 按传入数组的顺序打印
    console.log(data); // [3, 1, 2]
  },
  (err) => {
    console.log(err);
  }
);

Promise.race([p1, p2, p3]).then(
  (data) => {
    // 谁快就是谁
    console.log(data); // 2
  },
  (err) => {
    console.log("失败跑的最快");
  }
);
const pro = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject(3);
  }, 1000);
});

Promise.allSettled([pro, Promise.resolve(1), Promise.reject(2)]).then(
  (data) => {
    console.log(data);
  }
);
