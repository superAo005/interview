// 原理就是将函数作为传入的上下文参数（context）的属性执行，这里为了防止属性冲突使用了 ES6 的 Symbol 类型
const iCall = function (context, ...args) {
  context =
    context === undefined || context === null ? window : Object(context);
  let fn = Symbol("fn");
  context[fn] = this;
  Object.defineProperty(context, fn, {
    enumerable: false,
    value: this,
  });
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
// 实现call
Function.prototype.mycall = function () {
  let [thisArg, ...args] = [...arguments];
  thisArg = Object(thisArg) || window;
  let fn = Symbol();
  thisArg[fn] = this;
  let result = thisArg[fn](...args);
  delete thisArg[fn];
  return result;
};
// 实现apply
Function.prototype.myapply = function () {
  let [thisArg, args] = [...arguments];
  thisArg = Object(thisArg);
  let fn = Symbol();
  thisArg[fn] = this;
  let result = thisArg[fn](...args);
  delete thisArg.fn;
  return result;
};

////测试用例
let cc = {
  a: 1,
};

function demo(x1, x2) {
  console.log(typeof this, this.a, this);
  console.log(x1, x2);
}
demo.apply(cc, [2, 3]);
demo.myapply(cc, [2, 3]);
demo.call(cc, 33, 44);
demo.mycall(cc, 33, 44);
// 实现bind
Function.prototype.mybind = function (context, ...args) {
  return (...newArgs) => {
    return this.call(context, ...args, ...newArgs);
  };
};

// 测试用例
let cc1 = {
  name: "TianTian",
};
function say(something, other) {
  console.log(`I want to tell ${this.name} ${something}`);
  console.log("This is some" + other);
}
let tmp = say.mybind(cc1, "happy", "you are kute");
let tmp1 = say.bind(cc1, "happy", "you are kute");
tmp();
tmp1();