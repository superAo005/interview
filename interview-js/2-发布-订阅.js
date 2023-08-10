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

class EventBus {
  events = {}; // 存储事件及其对应的回调函数列表
  // 订阅事件
  subscribe(eventName, callback) {
    this.events[eventName] = this.events[eventName] || []; // 如果事件不存在，创建一个空的回调函数列表
    this.events[eventName].push(callback); // 将回调函数添加到事件的回调函数列表中
  }
  // 发布事件
  publish(eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(data); // 执行回调函数，并传递数据作为参数
      });
    }
  }

  // 取消订阅事件
  unsubscribe(eventName, callback) {
    if (this.events[eventName]) {
      this.events[eventName] = this.events[eventName].filter(
        (cb) => cb !== callback
      ); // 过滤掉要取消的回调函数
    }
  }
}
class EventEmitter {
  constructor() {
    // 存储事件及其对应的回调函数
    this.events = new Map();
  }

  // 绑定事件和回调函数
  on(event, callback) {
    // 获取事件的回调函数列表
    let callbacks = this.events.get(event);

    // 如果回调函数列表不存在，则创建一个新的回调函数列表
    if (!callbacks) {
      callbacks = [];
      this.events.set(event, callbacks);
    }

    // 将回调函数添加到回调函数列表中
    callbacks.push(callback);
  }

  // 触发事件，执行回调函数
  emit(event, ...args) {
    // 获取事件的回调函数列表
    const callbacks = this.events.get(event);

    // 如果回调函数列表不存在，则不执行任何操作
    if (!callbacks) {
      return;
    }

    // 执行回调函数列表中的所有回调函数，并传入参数
    callbacks.forEach((callback) => {
      callback.apply(this, args);
    });
  }

  // 绑定事件和回调函数，只执行一次
  once(event, callback) {
    // 定义一个新的回调函数，它会在执行一次后被自动移除
    const wrapper = (...args) => {
      callback.apply(this, args);
      this.off(event, wrapper);
    };

    // 将新的回调函数添加到回调函数列表中，并且确保不会重复执行
    this.on(event, wrapper);
  }

  // 移除事件的所有回调函数，或指定的回调函数
  off(event, callback) {
    // 获取事件的回调函数列表
    const callbacks = this.events.get(event);

    // 如果回调函数列表不存在，则不执行任何操作
    if (!callbacks) {
      return;
    }

    // 如果没有指定回调函数，则移除事件的所有回调函数
    if (!callback) {
      this.events.delete(event);
      return;
    }

    // 移除指定的回调函数
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
    }
  }
}

// 使用如下
const event = new EventEmitter();

const handle = (...rest) => {
  console.log(rest);
};

event.on("click", handle);

event.emit("click", 1, 2, 3, 4);

event.off("click", handle);

event.emit("click", 1, 2);

event.once("dbClick", () => {
  console.log(123456);
});
event.emit("dbClick");
event.emit("dbClick");



// 测试用例
// 创建全局事件总线对象
const eventBus = new EventBus();
const callback1 = (data) => {
  console.log("Callback 1:", data);
};
const callback2 = (data) => {
  console.log("Callback 2:", data);
};
// 订阅事件
eventBus.subscribe("event1", callback1);
eventBus.subscribe("event1", callback2);
// 发布事件
eventBus.publish("event1", "Hello, world!");
// 取消订阅事件
eventBus.unsubscribe("event1", callback1);

// 发布事件
eventBus.publish("event1", "Goodbye!");

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
