//Pointfree
//把数据处理的过程先定义成一种与参数无关的合成运算就叫PointFree

//PointFree 

const {compose} = require('lodash/fp');
//Pointed 有指向的
let money = 500;
money-=100;//买别墅
money-=100;//买跑车

//PointFree 
function buyHouse(money){
    return money-100;
}
function buyCar(money){
    return money-100;
}
let fn = compose(buyCar,buyHouse);
let r = fn(500);
console.log(r);