/**
 * 对于发布者订阅者模式，首先发布者与订阅者互相并不知道彼此的存在，他们是通过事件中心来进行调度的
 * 发布者在事件中心发布一个对应的事件主题，订阅者在事件中心订阅一个事件主体
 * 当订阅者去触发emit时就去执行发布者所发布的事件
 * 核心思路是：
使用一个对象作为缓存
on 负责把方法发布到缓存的 EventName 对应的数组
emit 负责遍历触发（订阅） EventName 下的方法数组
off 找方法的索引，并删除
 */

class Event {
  cache = {};
  on(eventName, fn) {
    this.cache[eventName] = this.cache[eventName] || [];
    this.cache[eventName].push(fn);
  }
  emit(eventName, ...regs) {
    this.cache[eventName].forEach((fn) => fn(...regs));
  }
  off(eventName, fn) {
    const index = this.cache[eventName].indexOf(fn);
    if (index === -1) return;
    this.cache[eventName].splice(index, 1);
  }
}
class Event2 {
  constructor() {
    // 存储事件的数据结构
    // 为了查找迅速，使用了对象（字典）
    this._cache = {};
  }
  // 绑定
  on(type, callback) {
    // 为了按类查找方便和节省空间，
    // 将同一类型事件放到一个数组中
    // 这里的数组是队列，遵循先进先出
    // 即先绑定的事件先触发
    let fns = (this._cache[type] = this._cache[type] || []);
    if (fns.indexOf(callback) === -1) {
      fns.push(callback);
    }
  }
  // 触发
  emit(type, data) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      fns.forEach((fn) => {
        fn(data);
      });
    }
  }
  // 解绑
  off(type, callback) {
    let fns = this._cache[type];
    if (Array.isArray(fns)) {
      if (callback) {
        let index = fns.indexOf(callback);
        if (index !== -1) {
          fns.splice(index, 1);
        }
      } else {
        //全部清空
        fns.length = 0;
      }
    }
    return this;
  }
}
class Event3 {
  constructor() {
    // 包含所有监听器函数的容器对象
    // 内部结构: {msg1: [listener1, listener2], msg2: [listener3]}
    this.cache = {};
  }
  // 实现订阅
  on(name, callback) {
    if (this.cache[name]) {
      this.cache[name].push(callback);
    } else {
      this.cache[name] = [callback];
    }
  }
  // 删除订阅
  off(name, callback) {
    if (this.cache[name]) {
      this.cache[name] = this.cache[name].filter((item) => item !== callback);
    }
    if (this.cache[name].length === 0) delete this.cache[name];
  }
  // 只执行一次订阅事件
  once(name, callback) {
    callback();
    this.off(name, callback);
  }
  // 触发事件
  emit(name, ...data) {
    if (this.cache[name]) {
      // 创建副本，如果回调函数内继续注册相同事件，会造成死循环
      let tasks = this.cache[name].slice();
      for (let fn of tasks) {
        fn(...data);
      }
    }
  }
}
class EventEmitter {
  constructor() {
    this.events = {}; // 用于存储事件及其对应的回调函数列表
  }

  // 订阅事件
  on(eventName, callback) {
    this.events[eventName] = this.events[eventName] || []; // 如果事件不存在，创建一个空的回调函数列表
    this.events[eventName].push(callback); // 将回调函数添加到事件的回调函数列表中
  }

  // 发布事件
  emit(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(data); // 执行回调函数，并传递数据作为参数
      });
    }
  }

  // 取消订阅事件
  off(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      ); // 过滤掉要取消的回调函数
    }
  }

  // 添加一次性的事件监听器
  once(eventName, callback) {
    const onceCallback = (data) => {
      callback(data); // 执行回调函数
      this.off(eventName, onceCallback); // 在执行后取消订阅该事件
    };
    this.on(eventName, onceCallback);
  }
}

// 测试用例
const event1 = new Event();
event1.on("test", (a) => {
  console.log(a);
});
event1.emit("test", "hello world");

event1.off("test");
event1.emit("test", "hello world");
/**
 * 被观察的目标，即发布者：Dep
 * 当对象之间存在一对多的依赖关系时，其中一个对象的状态发生改变，所有依赖它的对象都会收到通知，这就是观察者模式
 * 当被观察者的数据发生变化时，调用被观察者的notify方法，去通知所有观察者执行update方法进行更新。
 */
class Dep {
  constructor() {
    // 记录所有的观察者，即订阅者
    this.subs = [];
  }
  // 添加新的观察者
  addSub(sub) {
    // 该订阅者存在且有update方法,就将其添加到subs数组中
    if (sub && sub.update) {
      this.subs.push(sub);
    }
  }
  // 移除观察者
  removeSub(sub) {
    if (this.subs.length) {
      let index = this.subs.indexOf(sub);
      if (index > -1) {
        this.subs.splice(index, 1);
      }
    }
  }
  // 发布更新通知
  notify() {
    this.subs.forEach((item) => {
      item.update();
    });
  }
}

// 观察者，即订阅者
class Watcher {
  update() {
    console.log("****更新相关数据****");
  }
}

let dep = new Dep();
let watcher1 = new Watcher();
let watcher2 = new Watcher();

// 添加新的观察者
dep.addSub(watcher1);
dep.addSub(watcher2);
dep.removeSub(watcher2);
// 发布
dep.notify();
