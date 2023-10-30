/**
 * 纯函数
 * 1.相同的输入一定会产生相同的输出
 * 2.执行过程没有副作用
 */
function add(a,b){
    return a+b;
}

let c=2;
let d =2;
function add2(a,b){
    d++;//修改了除自己作用域外的外部变量
    return a+b+c;//它的返回值不单 依赖参数，还依赖外部变量
}
add2(1,2);