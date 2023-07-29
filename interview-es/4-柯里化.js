/**
 *
 * 用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，就开始执行函数
 * 函数柯里化的是一个为多参函数实现递归降解的方式
 *
 */
const curry = function (targetFn) {
  return function fn(...rest) {
    if (targetFn.length === rest.length) {
      return targetFn.apply(null, rest);
    } else {
      return fn.bind(null, ...rest);
    }
  };
};
let currying = (fn, ...args) =>
  args.length < fn.length
    ? (...arg) => currying(fn, ...args, ...arg)
    : fn(...args);

let addSum = (a, b, c) => a + b + c;
let add = curry(addSum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
