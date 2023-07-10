// 实现compose函数

function compose(...fns) {
  return function (...arg) {
    return fns.reduce((acc, cur) => {
      return typeof acc === "function" ? cur(acc(...arg)) : cur(acc);
    });
  };
}
//使用箭头函数优化
const compose2 =
  (...fns) =>
  (...args) =>
    fns
      .reverse()
      .reduce((acc, cur) =>
        typeof acc === "function" ? cur(acc(...args)) : cur(acc)
      );
function compose4(...fns) {
  let len = fns.length;
  let res = null;
  return function fn(...arg) {
    res = fns[len - 1].apply(null, arg); // 每次函数运行的结果
    if (len > 1) {
      len--;
      return fn.call(null, res); // 将结果递归传给下一个函数
    } else {
      return res; //返回结果
    }
  };
}
const compose6 = (...fns) => {
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
};
function fn1(x) {
  return x + 1;
}

function fn2(x) {
  return x * 10;
}

function fn3(x) {
  return x - 1;
}

let x = 10;
let res1 = fn3(fn2(fn1(x))); // 109
let fn = compose2(fn3, fn2, fn1);
let res2 = fn(x);
console.log(res1, res2);
