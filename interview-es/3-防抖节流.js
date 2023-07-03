// 2防抖
const debounce = (fun, wait = 500) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fun(...args);
    }, wait);
  };
};
// 3 节流
const throttle = (fun, wait = 500) => {
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fun(...args);
      timer = null;
    }, wait);
  };
};
const throttle2 = (fun, wait = 500) => {
  let lastTime = 0;
  return (...args) => {
    let now = +new Date();
    if (now - lastTime > wait) {
      lastTime = now;
      fun(...args);
    }
  };
};
function throttle(fn, delay) {
  let flag = true,
    timer = null;
  return function (...args) {
    let context = this;
    if (!flag) return;

    flag = false;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
      flag = true;
    }, delay);
  };
}

function debounce2(fn, delay) {
  let timer = null;
  return function (...args) {
    let context = this;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
