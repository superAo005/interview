let _ = require("lodash");
let str = "a";
function add1(str) {
  return str + 1;
}
function add2(str) {
  return str + 2;
}
function add3(str) {
  return str + 3;
}
let r2 = add3(add2(add1(str)));
console.log(r2); //a123

//flow可以把三个函数组合成一个函数

function flow(...fns) {
  //fns=[add3,add2,add1]
  if (fns.length == 1) return fns[0];
  //如果大于等2个的话
  return fns.reduceRight(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
function flowRight(...fns) {
  //fns=[add3,add2,add1]
  if (fns.length == 1) return fns[0];
  //如果大于等2个的话
  return fns.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
//reduceRight从右向左计算出一个值
/**
 * 第一次执行a=add1,b=add2  返回仩  (...args)=>add1(add2(...args))
 * 第二次执行a= (...args)=>add1(add2(...args)),b=add3 返回 (...args)=>add1(add2(add3(...args)))
 */
/* let flowed = function(str){
    return add1(add2(add3(str)));
} */
let flowed = flowRight(add3, add2, add1);
let r1 = flowed("a");
console.log(r1); //a123

//redux compose=flowRight

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args))
  );
}
