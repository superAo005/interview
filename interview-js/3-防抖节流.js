/**
 * 防抖函数 debounce 指的是某个函数在某段时间内，无论触发了多少次回调，都只执行最后一次
 * @param {*} fun 是需要执行的函数
 * @param {*} wait 是时间间隔
 * @returns
 */
const debounce = (fun, wait = 500) => {
  // 通过闭包缓存一个定时器 id
  let timer;
  // 将 debounce 处理结果当作函数返回
  // 触发事件回调时执行这个返回函数
  return function (...args) {
    // 如果已经设定过定时器就清空上一次的定时器
    timer && clearTimeout(timer);
    // 开始设定一个新的定时器，定时器结束后执行传入的函数 fn
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, wait);
  };
};
// 实现 2
// immediate 表示第一次是否立即执行
function debounce2(fn, wait = 50, immediate) {
  let timer = null;
  return function (...args) {
    if (timer) clearTimeout(timer);
    // ------ 新增部分 start ------
    // immediate 为 true 表示第一次触发后执行
    // timer 为空表示首次触发
    if (immediate && !timer) {
      fn.apply(this, args);
    }
    // ------ 新增部分 end ------
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  };
}
/**
 * 节流
 * 函数节流指的是某个函数在一定时间间隔内只执行一次，在这时间间隔内无视后来产生的函数调用请求，也不会延长时间间隔。
 * 间隔结束后第一次遇到新的函数调用会触发执行
 * 场景；函数节流适用于函数被频繁调用的场景，例如：window.onresize() 事件、mousemove 事件
 * @param {*} fun 是需要执行的函数
 * @param {*} wait 是时间间隔
 * @returns
 */
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
const throttle2 = (fn, wait = 50) => {
  // 上一次执行 fn 的时间
  let previous = 0;
  // 将 throttle 处理结果当作函数返回
  return function (...args) {
    // 获取当前时间，转换成时间戳，单位毫秒
    let now = +new Date();
    // 将当前时间和上一次执行函数的时间进行对比
    // 大于等待时间就把 previous 设置为当前时间并执行函数 fn
    if (now - previous > wait) {
      previous = now;
      fn.apply(this, args);
    }
  };
};
// 测试用例
const betterFn = throttle(() => console.log("fn 函数执行了"), 1000);
// 每 10 毫秒执行一次 betterFn 函数，但是只有时间差大于 1000 时才会执行 fn
setInterval(betterFn, 10);
const betterFn2 = debounce(() => console.log("fn 防抖执行了"), 1000);
// 停止滑动 1 秒后执行函数 () => console.log('fn 防抖执行了')
document.addEventListener("scroll", betterFn);
