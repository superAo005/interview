const iBind = function (context, ...args) {
  const originFunc = this;
  const boundFunc = function (...args1) {
    // 解决 bind 之后对返回函数 new 的问题
    if (new.target) {
      if (originFunc.prototype) {
        boundFunc.prototype = originFunc.prototype;
      }
      const res = originFunc.apply(this, args.concat(args1));
      return res !== null &&
        (typeof res === "object" || typeof res === "function")
        ? res
        : this;
    } else {
      return originFunc.apply(context, args.concat(args1));
    }
  };
  // 解决length 和 name 属性问题
  const desc = Object.getOwnPropertyDescriptors(originFunc);
  Object.defineProperties(boundFunc, {
    length: Object.assign(desc.length, {
      value: desc.length < args.length ? 0 : desc.length - args.length,
    }),
    name: Object.assign(desc.name, {
      value: `bound ${desc.name.value}`,
    }),
  });
  return boundFunc;
};
// 原理就是将函数作为传入的上下文参数（context）的属性执行，这里为了防止属性冲突使用了 ES6 的 Symbol 类型
const iCall = function (context, ...args) {
  context =
    context === undefined || context === null ? window : Object(context);
  let fn = Symbol("fn");
  context[fn] = this;
  let res = context[fn](...args);
  delete context[fn];
  return res;
};
// 保持 call 的数据属性一致
Object.defineProperty(Function.prototype, "iCall", {
  value: iCall,
  configurable: true,
  enumerable: false,
  writable: true,
});
Function.prototype.bind = function (context, ...args) {
  // 不传默认是全局，window
  context = context || window;
  // 把this存到fn，这里的this是调用的函数
  let fn = this;
  return function newFn(...fnArgs) {
    let res;
    // 要考虑新函数是不是会当作构造函数
    if (this instanceof newFn) {
      // 如果是构造函数则调用new 并且合并参数args，fnArgs
      res = new fn(...args, ...fnArgs);
    } else {
      // 当作普通函数调用 也可以用上面定义的_call
      res = fn.call(context, ...args, ...fnArgs);
    }
    return res;
  };
};
Function.prototype.apply = function (context = window, args = []) {
  // 不传默认是全局，window
  // args不传时默认是空数组，防止下面用spread操作符时报错
  // 把this存到context.fn，这里的this是调用的函数
  context.fn = this;
  // 执行调用的函数，this指向context，参数用spread操作符扩展
  const res = context.fn(...args);
  // 删除，不污染context
  delete context.fn;
  // 返回res
  return res;
};
