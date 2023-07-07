// 函数柯里化
const currying2 = function (targetFn) {
  return function fn(...args) {
    if (targetFn.length === args.length) {
      return targetFn.apply(null, args);
    } else {
      return fn.bind(null, ...args);
    }
  };
};
function currying3(fn) {
  return function (...args) {
    return args.length >= fn.length
      ? fn.apply(this, args)
      : currying(fn.bind(this, ...args), length - args.length);
  };
}
const currying = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (...moreArgs) => currying(fn, ...args, ...moreArgs);
};
let addSum = (a, b, c) => a + b + c;
let add = currying(addSum);
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1, 2, 3));
function compressString(str) {
  let compressed = "";
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    // 检查下一个字符是否与当前字符相同
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // 当下一个字符与当前字符不相同时，将当前字符及其出现次数添加到压缩字符串中
      compressed += count + str[i];
      count = 1;
    }
  }

  return compressed;
}


