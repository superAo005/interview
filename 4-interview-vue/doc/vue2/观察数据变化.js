function notify() {
  console.log("视图更新");
}
let data = {
  name: "jw",
  age: 18,
  arr: [],
};
// 重写数组的方法
let oldProtoMehtods = Array.prototype;
let proto = Object.create(oldProtoMehtods);
["push", "pop", "shift", "unshift"].forEach((method) => {
  proto[method] = function () {
    notify();
    oldProtoMehtods[method].call(this, ...arguments);
  };
});
function observer(obj) {
  if (Array.isArray(obj)) {
    obj.__proto__ = proto;
    return;
  }
  if (typeof obj === "object") {
    for (let key in obj) {
      defineReactive(obj, key, obj[key]);
    }
  }
}
function defineReactive(obj, key, value) {
  observer(value); // 再一次循环value
  Object.defineProperty(obj, key, {
    // 不支持数组
    get() {
      return value;
    },
    set(val) {
      notify();
      observer(val);
      value = val;
    },
  });
}
observer(data);
data.arr.push(1);
//创建一个Obj对象
let Obj = {
  name: "mini",
  age: 3,
  show: function () {
    console.log(this.name + " is " + this.age);
  },
};