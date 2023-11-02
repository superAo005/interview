//promise.all 怎么把成功失败的都返回

let p1 = Promise.resolve("p1");
let p2 = Promise.resolve("p2");
let p3 = Promise.reject("p3-error");
let p4 = Promise.resolve("p4");
let p5 = Promise.reject("p5-error");

function handlePromise(arr) {
  return arr.map((item) => {
    return item
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  });
}

let fn1 = new Promise((resolve, reject) => {
  throw "fn1出错了";
});
let fn2 = new Promise((resolve, reject) => {
  reject("fn2出错了");
});
let fn3 = new Promise((resolve, reject) => {
  resolve("fn3成功了");
});
let fn4 = new Promise((resolve, reject) => {
  resolve("fn4成功了");
});
let fn5 = "我是fn5";
let res = [p1, p2, p3, p4, p5];
let res1 = [fn1, fn2, fn3, fn4, fn5];
let res2 = [p1, p2, p3, p4, p5].map((item) => {
  return item
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
});
Promise.all(res2).then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
