// 手写一个sleep
function sleep(fn, time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fn);
    }, time);
  });
}
let saySomething = (name) => console.log(`hello,${name}`);
async function autoPlay() {
  let demo = await sleep(saySomething("TianTian"), 1000);
  let demo2 = await sleep(saySomething("李磊"), 1000);
  let demo3 = await sleep(saySomething("掘金的好友们"), 1000);
}
autoPlay();

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

function _new() {
  let obj = {};
  const [constructor, ...args] = [...arguments];
  obj.__proto__ = constructor.prototype;
  let result = constructor.apply(obj, args);
  if ((result && typeof result === "function") || typeof result === "object") {
    return result;
  }
  return obj;
}

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

// 数组去重的几种方式

let array = [
  1,
  1,
  "1",
  "1",
  null,
  null,
  undefined,
  undefined,
  new String("1"),
  new String("1"),
  /a/,
  /a/,
  NaN,
  NaN,
];

// 使用Set
let unique_1 = (arr) => [...new Set(arr)];

// 使用filter
function unique_2(array) {
  let res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

//Object 键值对

function unique_3(array) {
  let obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

// 使用Map

function unique_4(arr) {
  const tmp = new Map();
  return arr.filter((item) => {
    return !tmp.has(item) && tmp.set(item, 1);
  });
}

// 使用reduce

let unique_5 = (arr) =>
  arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), []);

// 继承 **寄生组合式继承**

function inheritPrototype(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  let prototype = Object.create(superType.prototype);
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  prototype.constructor = subType;
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = prototype;
}

// 测试用例
// 父类初始化实例属性和原型属性
function Father(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Father.prototype.sayName = function () {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(Son, Father);

// 新增子类原型属性
Son.prototype.sayAge = function () {
  alert(this.age);
};

let demo1 = new Son("TianTian", 21);
let demo2 = new Son("TianTianUp", 20);

demo1.colors.push("2"); // ["red", "blue", "green", "2"]
demo2.colors.push("3"); // ["red", "blue", "green", "3"]

// 使用Class

class Rectangle {
  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  // Getter
  get area() {
    return this.calcArea();
  }

  // Method
  calcArea() {
    return this.height * this.width;
  }
}

const rectangle = new Rectangle(40, 20);
console.log(rectangle.area);
// 输出 800

// 继承
class Square extends Rectangle {
  constructor(len) {
    // 子类没有this,必须先调用super
    super(len, len);

    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = "SquareIng";
  }

  get area() {
    return this.height * this.width;
  }
}

const square = new Square(20);
console.log(square.area);
// 正则把手机号中间四位变为星号*
const replacePhoneToStar = (phone) => {
  if (phone) {
    const p1 = phone.slice(0, 3);
    const p2 = phone.slice(7, 11);
    const res2 = `${p1}****${p2}`;
    let res = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    console.log(res);
    return res;
  }
};
replacePhoneToStar("13122024207");
// Js解析url,包括重复的Key转化为数组，未指定值约定为1
const obj = (url) => {
  return url
    .match(/([^=?&]+)(=[^=?&]+)?/g)
    .map((match) => match.split("="))
    .reduce((acc, [key, valueStr]) => {
      const value = decodeURIComponent(valueStr || "") || true;
      return {
        ...acc,
        [key]: acc[key] === undefined ? value : [].concat(acc[key], value),
      };
    }, {});
};
const obj2 = (url) => {
  return url.match(/([^=?&]+)(=[^=?&]+)?/g).reduce(function (acc, match) {
    let splits = match.split("="),
      key = splits[0],
      value = decodeURIComponent(splits[1] || "") || true;
    if (acc[key] === undefined) acc[key] = value;
    else acc[key] = [].concat(acc[key], value);
    return acc;
  }, {});
};
function parse(string) {
  let query = string.replace(/^\?/, "");
  return query.split("&").reduce((obj, next) => {
    let parts = next.split("=");
    let key = parts[0];
    let value = parts[1];
    if (obj.hasOwnProperty(key)) {
      obj[key] = Array.isArray(obj[key])
        ? [...obj[key], value]
        : [obj[key], value];
    } else {
      obj[key] = value ? value : true;
    }
    return obj;
  }, {});
}
const obj3 = (url) => {
  return url
    .substr(1)
    .split("&")
    .reduce((o, p) => {
      let [k, v = ""] = p.split("=");
      v = v === "" || (isNaN(v) ? v : Number(v));
      o[k] = o[k] ? (Array.isArray(o[k]) ? [...o[k], v] : [o[k], v]) : v;
      return o;
    }, {});
};
const query = obj3("?a=1&a=2&c=3&b=4");
console.log(query);
