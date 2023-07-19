Function.prototype.forEach = function forEach(cb, context = window) {
  let self = this;
  let len = self.length;
  for (let i = 0; i < len; i++) {
    typeof cb === "function" ? cb.call(context, self[i], i) : null;
  }
};
Function.prototype.map = function map(cb, context = window) {
  let self = this;
  let res = [];
  for (let i of self) {
    res.push(cb(self[i]));
  }
};
Function.prototype.reduce = function reduce(arr, cb, initialValue) {
  let num = initValue ? (num = arr[0]) : initValue;
  let i = initValue ? 1 : 0;
  for (i; i < arr.length; i++) {
    num = cb(num, arr[i], i);
  }
  return num;
};
// 实现reduce
Array.prototype.myreduce = function (fn, initVal) {
  let result = initVal,
    i = 0;
  if (typeof initVal === "undefined") {
    result = this[i];
    i++;
  }
  while (i < this.length) {
    result = fn(result, this[i]);
  }
  return result;
};
//实现Object.create方法
function create(proto) {
  function Fn() {}
  Fn.prototype = proto;
  Fn.prototype.constructor = Fn;
  return new Fn();
}
// let demo = {
//   c : '123'
// }
// let cc = Object.create(demo)

// 实现new操作
function _new(constructor, ...args) {
  let obj = {};
  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, args);
  if ((result && typeof result === "function") || typeof result === "object") {
    return result;
  }
  return obj;
}
