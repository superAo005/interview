// setTimeout实现setInterval
let startTime = new Date().getTime();
let count = 0;
setInterval(function () {
  count++;
  console.log(
    `与原设定的间隔时差了${
      new Date().getTime() - (startTime + count * 1000)
    }毫秒`
  );
}, 1000);

let timeWorker = {};
let mySetInterval = function (fn, time) {
  // 定义一个key，来标识此定时器
  let key = Symbol();
  // 定义一个递归函数，持续调用定时器
  let execute = function (fn, time) {
    timeWorker[key] = setTimeout(function () {
      fn();
    }, time);
  };
  execute(fn, time);
  // 返回key
  return key;
};
let myClearInterval = function (key) {
  if (key in timeWorker) {
    clearTimeout(timeWorker[key]);
    delete timeWorker[key];
  }
};
let time1 = mySetInterval(() => {
  console.log(111);
}, 3000);
let time2 = mySetInterval(() => {
  console.log(222);
}, 3000);

setTimeout(() => {
  myClearInterval(time2);
}, 4000);
