class EventBus {
  cash = {};
  on(eventName, cb) {
    this.cash[eventName] = this.cash[eventName] || [];
    this.cash[eventName].push(cb);
  }
  emit(eventName, data) {
    this.cash?.[eventName]?.forEach((cb) => {
      cb(data);
    });
  }
  off(eventName, cb) {
    this.cash[eventName] = this.cash?.[eventName]?.filter((item) => {
      return item !== cb;
    });
  }
}
// 创建全局事件总线对象
const eventBus = new EventBus();
const callback1 = (data) => {
  console.log("Callback 1:", data);
};
const callback2 = (data) => {
  console.log("Callback 2:", data);
};
// 订阅事件
eventBus.on("event1", callback1);
eventBus.on("event1", callback2);
// 发布事件
// eventBus.emit("event1", "Hello, world!");
// 取消订阅事件
eventBus.off("event1", callback1);
// 发布事件
eventBus.emit("event1", "Goodbye!")
