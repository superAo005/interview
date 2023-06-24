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
const debonce2 = (fun, wait = 500) => {
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
  let timer;
  return (...args) => {
    if (timer) return;
    timer = setTimeout(() => {
      fun(...args);
      timer = null;
    }, wait);
  };
};
const throttle3 = (fun, wait = 500) => {
  let lastTime = 0;
  return (...args) => {
    let now = +new Date();
    if (now - lastTime > wait) {
      lastTime = now;
      fun(...args);
    }
  };
};
