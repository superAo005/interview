/**
 * 通过Object.defineProperty使普通对象变为响应式对象，核心原理就是在getter中收集依赖，在sette中触发事件。
 * 但是，该方法有个缺点：在进行劫持之前必须知道所要拦截的属性key是什么，因此，它不无法拦截对象的属性的增加和删除
 * Vue2为了解决这个问题提供了set和delete 实例方法
 */
class Observer {
  constructor(data) {
    // 遍历参数 data 的属性，给添加到 this 上
    for (let key of Object.keys(data)) {
      if (typeof data[key] === "object") {
        data[key] = new Observer(data[key]);
      }
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          console.log("你访问了" + key); //你访问了age
          return data[key]; //20
        },
        set(newVal) {
          console.log("你设置了" + key); //你设置了age
          console.log("新的" + key + "=" + newVal); //新的age=20
          if (newVal === data[key]) {
            return;
          }
          data[key] = newVal;
        },
      });
    }
  }
}
const obj = {
  name: "app",
  age: "18",
  a: {
    b: 1,
    c: 2,
  },
};
const app = new Observer(obj);
app.age = 20;
console.log(app.age);
app.newPropKey = "新属性";
console.log(app.newPropKey); //新属性
