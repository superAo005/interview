/**
 * 函数式编程是一种编程范式
 */
//面向过程开发 C语言
let a = 1;
let b = 2;
let r1 = a+b;
console.log(r1);

//面向对象 Java面向对象的语言
class Calculator{
    add(a,b){
        return a+b;
    }
}
let c = new Calculator();
let r2 = c.add(1,2);

//函数式编程
//函数其实是数学上的概念 y = f(x)
//函数式编程 核心 不是一种映射关系 参数是输入，返回值是输出 相同的输出一般会产生相同的输出
function add(a,b){
    return a+b;
}
let r3 = add(1,2);