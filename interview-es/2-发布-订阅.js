/**
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
