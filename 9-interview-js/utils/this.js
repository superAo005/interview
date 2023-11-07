/* 
 * JS中this的五种情况 
 *   + 元素的事件绑定，事件触发，方法执行，方法中的this一般都是当前元素
 *   + 函数执行，看前面是否有“点”，有，“点”前面是谁this就是是，没有，this就是window（严格模式下是undefined）
 *     + 匿名函数或者回调函数中的this，window居多
 *   + 构造函数体中的this是当前类的实例
 *   + 箭头函数中没有自己的this，this都是上下文中的
 *   + 基于 call / apply / bind 流氓暴力式改变this
 */

Function.prototype.call = function call(context, ...args) {
    // context -> obj
    // this -> fn
    // args -> [10,20]
    context = context == null ? window : context;
    if (!/^(object|function)$/i.test(typeof context)) {
        context = Object(context);
    }
    let result,
        key = Symbol('key');
    context[key] = this;
    result = context[key](...args);
    delete context[key];
    return result;
};

Function.prototype.bind = function bind(context, ...outerArgs) {
    // this -> fn
    // context -> obj
    // outerArgs -> [10,20]
    let _this = this;
    return function (...innerArgs) {
        _this.call(context, ...outerArgs.concat(innerArgs));
    };
};


let obj = {
    name: '珠峰',
    $$: 10
};

function fn(x, y) {
    console.log(this, x + y);
}

// fn.call(obj, 10, 20);

setTimeout(fn.bind(obj, 10, 20), 1000);
// setTimeout(function () {
//     fn.call(obj, 10, 20);
// }, 1000);
document.body.onclick = function (ev) {};

/* 

obj.$$ = fn;
obj.$$(10, 20); */

/* function fn() {
    // console.log(arguments);
    // 鸭子类型：忽略本身类型，让其用一些原本不能直接使用的办法
    [].forEach.call(arguments, item => {
        console.log(item);
    });
}
fn(10, 20, 30, 40); */

// [].forEach()
// 把forEach执行，this->[] 相当于在遍历数组的每一项