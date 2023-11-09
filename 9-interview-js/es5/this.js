var name = '小张',
  age = 17
var obj = {
  name: '小刘',
  objAge: this.age,
  myFun: function () {
    console.log(this.name + '年龄' + this.age)
    console.log('查看对象内' + this.objAge)
  },
}
obj.myFun()
//小刘年龄undefined
//查看对象内17
var db = {
  name: '德玛',
  age: 99,
}
var db2 = {
  name: '伽罗',
}
obj.myFun()
obj.myFun.call() //小张年龄17 此时this指向window
obj.myFun.call(db) //德玛年龄99
obj.myFun.call(db2) //伽罗年龄undefined 说明传入对象替换了this，
obj.myFun.apply(db) //德玛年龄99
obj.myFun.bind(db)() //德玛年龄99---->bind 返回的是函数，必需调用执行
var obj2 = {
  name: '小刘',
  objAge: this.age,
  myFun: function (fm, t) {
    console.log(this.name + '年龄' + this.age, '来自' + fm + '去往' + t)
  },
}
//call、 bind、 apply 这三个函数的第一个参数都是this的指向对象
//|->call可以传入多个参数,多个参数逗号隔开
obj2.myFun.call(db, '江西', '深圳') //德玛年龄99 来自江西去往深圳
//|->apply只能传入两个参数，所以其第二个参数往往是作为数组形式传入
obj2.myFun.apply(db, ['江西', '深圳']) //德玛年龄99 来自江西去往深圳
//|->bind除了返回函数以外，它的参数和call 一样
obj2.myFun.bind(db, '江西', '深圳')() //德玛年龄99 来自江西去往深圳
//|->此处测试是吧'江西，深圳'作为一个数组传进去，所以参数fm就是'江西,深圳',中间的逗号应该是数组转义的时候产生的
obj2.myFun.bind(db, ['江西', '深圳'])() //德玛年龄99 来自江西,深圳去往undefined

function fun1() {
  this.ccfun1 = '命名函数_1'
  return this
}
function fun2() {
  this.ccfun2 = '命名函数_2'
}
var unnameFun1 = function () {
  this.ccunnameFun1 = '匿名函数_return this 1'
  return this
}
var unnameFun2 = function () {
  this.ccunnameFun2 = '匿名函数_2 un return'
}

var arrowFun1 = () => {
  this.ccarrow1 = '箭头函数_1'
  debugger
  return this
}
var arrowFun2 = function () {
  this.ccarrow2 = '箭头函数__2'
}
//测试命名函数
console.log('----------return this;new----------')
// 带this返回
var fun1_new = new fun1()
console.log(fun1_new.ccfun1) //命名函数_1  返回的this中绑定了指定变量
console.log(window.ccfun1) //undefined  此变了未绑定在window上 说明函数创建的时候 this是函数内部的this，或者调用者非window
console.log('----------return this;un new----------')
var fun1_unnew = fun1()
console.log(fun1_unnew === window) //true 此处证明 直接调用函数，不使用new创建，函数内部的this指向window
console.log(window.ccfun1) //命名函数_1
console.log('----------unreturn this;new----------')
var fun2_new = new fun2()
console.log(fun2_new.ccfun2) //命名函数_2  此处证明 return this不重要可以省略
console.log(window.ccfun2) //undefined
var fun2_unnew = fun2()
console.log(fun2_unnew === window) //此处证明 在不使用new 和return的情况 返回值既不是函数调用者也不是window
console.log(fun2_unnew) //undefined 此处证明 直接调用函数，不适用new创建，函数内部的
console.log(window.ccfun2) //命名函数_2

/*  总结 命名函数
    1：new 一定会有返回 返回值是其调用者
    var fun1_new=new fun1() <==> var fun1_new=new fun1(this:fun1_new);
    2：直接调用函数，函数内部的this会指向window 此时return 决定是否有返回
    var fun1_new=fun1() <==> var fun1_new=fun1(this:window);
*/

//测试匿名函数
console.log('------匿名函数----return this;new----------')
// 带this返回
var unnameFun1_new = new unnameFun1()
console.log(unnameFun1_new.ccunnameFun1) //匿名函数_return this 1  同上命名函数测试
console.log(window.ccunnameFun1) //undefined  同上命名函数
console.log('----------return this;un new----------')
var unnameFun1_unnew = unnameFun1()
console.log(unnameFun1_unnew === window) //true 此处证明 直接调用函数，不使用new创建，函数内部的this指向window
console.log(unnameFun1_unnew.ccunnameFun1) //命名匿名函数_return this 1函数_1
console.log('----------unreturn this;new----------')
var unnameFun2_new = new unnameFun2()
console.log(unnameFun2_new.ccunnameFun2) //命名函数_2  此处证明 return this不重要可以省略
console.log(window.ccunnameFun2) //undefined
var unnameFun2_unnew = unnameFun2()
console.log(unnameFun2_unnew === window) //此处证明 在不使用new 和return的情况 返回值既不是函数调用者也不是window
console.log(unnameFun2_unnew) //undefined 此处证明 直接调用函数，不适用new创建，函数内部的
console.log(window.ccunnameFun2) //命名函数_2

/*  总结 匿名函数
    1：new 一定会有返回 返回值是其调用者
    var fun1_new=new fun1() <==> var fun1_new=new fun1(this:fun1_new);
    2：直接调用函数，函数内部的this会指向window 此时return 决定是否有返回
    var fun1_new=fun1() <==> var fun1_new=fun1(this:window);
*/
console.log('------箭头函数----return this;new----------')
//var arrowFun1_new = new arrowFun1();
//console.log(arrowFun1_new.ccarrow1)//error 箭头函数不能new 使用
var arrowFun1_unnew = arrowFun1()
console.log(arrowFun1_unnew.ccarrow1) //error 箭头函数不能new 使用
console.log(window == arrowFun1_unnew) //true  箭头函数内部使用this==window
var arrowFun2_unnew = arrowFun2()
console.log(window == arrowFun2_unnew) //false  箭头函数是否有返回值由return决定
