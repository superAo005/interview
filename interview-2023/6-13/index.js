function add(a, b, cb) {
  let c = a + b;
  setTimeout(() => {
    cb(c);
  }, 1000);
}

function injectFn(fn) {
  return (...args)=> {
    return new Promise((resolve) => {
      fn(...args, (result) => {
        resolve(result);
      });
    });
  };
}

let promise1 = injectFn(add);

promise1(1, 2).then((res) => console.log(res)); // 输出 3
promise1(3, 4).then((res) => console.log(res)); // 输出 7
