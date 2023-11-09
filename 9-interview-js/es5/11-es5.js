/**
 * boolean、string、number、bigint、undefined、symbol、null
 * typeof能识别所有的值类型，识别函数，不能区分是否是引用类型。
 */
/*
 * 数据类型检测：
 *   + typeof
 *     + 直接在计算机底层基于数据类型的值（二进制）进行检测
 *     + tyepof null  "object"   对象存储在计算机中，都是以000开始的二进制存储，null也是，所以检测出来的结果是对象
 *     + typeof 普通对象/数组对象/正则对象/日期对象  "object"
 *
 *   + instanceof  检测当前实例是否属于这个类的
 *     + 底层机制：只要当前类出现在实例的原型链上，结果都是true
 *     + 由于我们可以肆意的修改原型的指向，所以检测出来的结果是不准的
 *     + 不能检测基本数据类型
 *
 *   + constructor
 *     + 用起来看似比instanceof还好用一些（基本类型支持的）
 *     + constructor可以随便改，所以也不准
 *
 *   + Object.prototype.toString.call([value])
 *     + 标准检测数据类型的办法：Object.prototype.toString不是转换为字符串，是返回当前实例所属类的信息
 *     + 标准检测的办法 "[object Number/String/Boolean/Null/Undefined/Symbol/Object/Array/RegExp/Date/Function]"
 */
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
//实现Object.create方法
// 创建空（构造）函数，关联它的原型（实现继承）
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
// 手写 instanceof
//instanceof用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。
function myInstanceOf(object, constructor) {
  // Object.prototype.__proto__属性来访问一个对象的原型
  let prototype = Object.getPrototypeOf(object);
  while (prototype !== null) {
    if (prototype === constructor.prototype) {
      return true;
    }
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}

(function () {
  var class2type = {};
  var toString = class2type.toString; //=>Object.prototype.toString

  // 设定数据类型的映射表
  [
    "Boolean",
    "Number",
    "String",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Error",
    "Symbol",
  ].forEach((name) => {
    class2type[`[object ${name}]`] = name.toLowerCase();
  });

  function toType(obj) {
    if (obj == null) {
      // 传递的值是null或者undefined，就返回对应的字符串
      return obj + "";
    }
    // 基本数据类型都采用typeof检测
    return typeof obj === "object" || typeof obj === "function"
      ? class2type[toString.call(obj)] || "object"
      : typeof obj;
  }

  window.toType = toType;
})();

//==================

// let obj = {
//     name: '珠峰培训'
// };
// obj.toString(); =>"[object Object]"
// -> toString方法执行，this是obj，所以检测是obj它的所属类信息
// 推测：是不是只要把Object.prototype.toString执行，让它里面的this变为要检测的值，那就能返回当前值所属类的信息

//==================

/* 
let arr = [];
console.log(arr.constructor === Array); // true
console.log(arr.constructor === RegExp); // false
console.log(arr.constructor === Object); // false

Number.prototype.constructor = 'AA';
let n = 1;
console.log(n.constructor === Number); // false 
*/

//==================

/* function instance_of(example, classFunc) {
  let classFuncPrototype = classFunc.prototype,
      proto = Object.getPrototypeOf(example); // example.__proto__
  while (true) {
      if (proto === null) {
          // Object.prototype.__proto__ => null
          return false;
      }
      if (proto === classFuncPrototype) {
          // 查找过程中发现有，则证明实例是这个类的一个实例
          return true;
      }
      proto = Object.getPrototypeOf(proto);
  }
}

// 实例.__proto__===类.prototype

let arr = [];
console.log(instance_of(arr, Array));
console.log(instance_of(arr, RegExp));
console.log(instance_of(arr, Object)); */

/* let arr = [];
console.log(arr instanceof Array); //=>true 
console.log(arr instanceof RegExp); //=>false
console.log(arr instanceof Object); //=>true */

/* function Fn() {
  this.x = 100;
}
Fn.prototype = Object.create(Array.prototype);
let f = new Fn;
console.log(f, f instanceof Array); */

// console.log(1 instanceof Number); // false
