let _ = require('lodash');
function add(a,b,c){
    return a+b+c;
}
function curry(func){
    let argsLength = func.length;//形参的个数
    let curried = (...args)=>{
        //如果传过来的数组的长度小于实现需要参数长度
        if(args.length<argsLength){
            return (...rest)=>curried(...args,...rest);
        }
        return func(...args);
    }
    return curried;
}
let curriedAdd = curry(add);
//console.log(curriedAdd(1,2,3));
let fn1 = curriedAdd(1);//args的闭包变量args=[1]
let r = fn1(2,3);//args=[1,2,3]
console.log(r);
//console.log(curriedAdd(1)(2,3));
//console.log(curriedAdd(1)(2)(3));