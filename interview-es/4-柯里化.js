/**
 * 
 * 用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，就开始执行函数
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

//  高阶函数应用之柯里化
const curring = (fn) => {
  let args = []; //记录参数的个数 每次调用传入的总个数
  const innerFn = (arr = []) => {
    //每次调用的个数
    args.push(...arr);
    return args.length >= fn.length ? fn() : (...args) => innerFn(args);
  };
  return innerFn();
};
let currying = (fn, ...args) =>
  fn.length > args.length
    ? (...args) => currying(fn, ...args, ...args)
    : fn(...args);

let addSum = (a, b, c) => a + b + c;
let add = currying(addSum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
