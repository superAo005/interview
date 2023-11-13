/**
 * 讲函数式编程之前回顾三种基本概念
 * 函数是一等公司
 */
function add(a, b) {
  return a + b;
}
//可以赋值给变量
let add1 = add;
//函数可以作为参数
function exec(fn, a, b) {
  return fn(a, b);
}
exec(add, 1, 2);

function exec2(fn) {
  //函数可以作为返回值
  return function (a, b) {
    return fn(a, b);
  };
}
let r2 = exec2(add)(1, 2);
