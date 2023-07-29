// 柯里化
const curry = (fn, ...args) =>
  args.length < fn.length
    ? (...arg) => curry(fn, ...args, ...arg)
    : fn(...args);

let addSum = (a, b, c) => a + b + c;
let add = curry(addSum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
