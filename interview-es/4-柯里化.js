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
// 用法
function add(a, b, c, d) {
  return a + b + c + d;
}
console.log("柯里化：", curry(add)(1)(2)(3)(4));
function sum(a, b, c, d) {
  return a + b + c + d;
}
// 函数柯里化

let currying = (fn, ...args) =>
  fn.length > args.length
    ? (...args) => currying(fn, ...args, ...args)
    : fn(...args);

let addSum = (a, b, c) => a + b + c;
let add = currying(addSum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
