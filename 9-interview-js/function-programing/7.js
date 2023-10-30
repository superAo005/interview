let {join,toUpper,split,flowRight} = require('lodash/fp');
let str = 'click button';
//现在希望你把它转成这样的形式 CLICK_BUTTON

//按照过程思维
//lodash中的方法数据先行，先传数据，再传其它参数
//lodash/fp是针对函数式编程设计 的，数据放在最后 
let r1 = split(' ',str);
console.log(r1);
let r2 =toUpper(r1);
console.log(r2);
let r3 =split(',',r2);
console.log(r3);
let r4 = join('_',r3);
console.log(r4);


//函数式编程思维
/* let composed = flowRight(join('_'),split(','),toUpper,split(' '));
let r1 = composed(str);
console.log(r1); */