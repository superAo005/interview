// 函数柯里化
const currying2 = function (targetFn) {
  return function fn(...rest) {
    if (targetFn.length === rest.length) {
      return targetFn.apply(null, rest);
    } else {
      return fn.bind(null, ...rest);
    }
  };
};
function currying3(fn, length) {
  length = length || fn.length;
  return function (...args) {
    return args.length >= length
      ? fn.apply(this, args)
      : currying(fn.bind(this, ...args), length - args.length);
  };
}
function currying4(fn) {
  let length = fn.length;
  return function (...args) {
    return args.length >= length
      ? fn.apply(this, args)
      : currying(fn.bind(this, ...args), length - args.length);
  };
}
const currying5 = (fn) =>
  (judge = (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...arg) => judge(...args, ...arg));
const currying = (fn, ...args) => {
  return args.length >= fn.length
    ? fn(...args)
    : (...moreArgs) => currying(fn, ...args, ...moreArgs);
};

// 使用 reduce 实现函数柯里化
const currying6 = (...args) => {
  return args.reduce((fn, arg) => {
    return typeof fn === "function" ? fn(arg) : currying6.bind(null, arg);
  });
};

let addSum = (a, b, c) => a + b + c;
let add = currying6(addSum);
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

// 测试压缩函数
const originalString = "aaaabbccc";
const compressedString = compressString(originalString);
console.log(compressedString); // 输出: "4a2b3c"
function calculateExecutionTime(fn) {
  return function (...args) {
    console.time(fn.name); // 开始计时
    const result = fn.apply(this, args); // 执行目标函数
    console.timeEnd(fn.name); // 结束计时并输出执行时间
    return result;
  };
}

// 目标函数
function myFunction() {
  // 执行一些耗时的操作
  for (let i = 0; i < 10000000; i++) {
    // console.log(i);
    // ...
  }
}

// 使用函数增强计算函数执行时间
const enhancedFunction = calculateExecutionTime(myFunction);

// 调用增强后的函数
enhancedFunction();
function deepCopy(obj, cache = new WeakMap()) {
  // 检查是否为基本数据类型，如果是，则直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 检查缓存，如果已经拷贝过该对象，则直接返回缓存的结果
  if (cache.has(obj)) {
    return cache.get(obj);
  }

  // 创建新的对象或数组
  const copy = Array.isArray(obj) ? [] : {};

  // 将新对象添加到缓存中
  cache.set(obj, copy);

  // 遍历原对象的属性
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      // 递归拷贝子属性
      copy[key] = deepCopy(obj[key], cache);
    }
  }

  return copy;
}
