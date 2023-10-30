// 测试压缩函数

function calculateExecutionTime(fn) {
  return function (...args) {
    console.time(fn.name); // 开始计时
    const result = fn.apply(this, args); // 执行目标函数
    console.timeEnd(fn.name); // 结束计时并输出执行时间
    return result;
  };
}
// 目标函数
function myFunction() {
  // 执行一些耗时的操作
  for (let i = 0; i < 10000000; i++) {
    // console.log(i);
    // ...
  }
}

// 使用函数增强计算函数执行时间
const enhancedFunction = calculateExecutionTime(myFunction);
// 调用增强后的函数
enhancedFunction();
