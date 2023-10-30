```js
const obj = {
  name: "krry",
  age: 24,
  others: {
    mobile: "mi10",
    watch: "mi4",
  },
};
const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log("查看的属性为：" + key);
    // Reflect 是一个内置的对象，它提供拦截 JavaScript 操作的方法
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log("设置的属性为：" + key);
    console.log("新的属性：" + key, "值为：" + value);
    Reflect.set(target, key, value, receiver);
  },
});
p.age = 22;
console.log(p.age);
p.single = "NO";
console.log(p.single);
p.others.shoe = "boost";
console.log(p.others.shoe);
```
