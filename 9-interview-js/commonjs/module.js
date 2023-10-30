// 自执行函数
(function (global) {
  function add(a, b) {
    return a + b;
  }
  global.addModule = {
    add,
  };
})(window);
(function (global) {
  function mins(a, b) {
    return a - b;
  }
  global.minsModule = {
    mins,
  };
})(window);
  
// common.js 循环引用
module.exports={

}