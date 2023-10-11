## 2023-6-12 白龙马面试

### 事件循环,宏任务和微任务的区别

JavaScript 是一门单线程语言 分为同步任务和异步任务
同步任务是指在主线程上排队执行的任务，只有前一个任务执行完毕，才能继续执行下一个任务
异步任务指的是，不进入主线程、而进入"任务队列"的任务；只有等主线程任务全部执行完毕，"任务队列"的任务才会进入主线程执行
异步任务分为宏任务和微任务
new promise()、console.log()属于同步任务
执行过程: 同步任务 —> 微任务 —> 宏任务 事件循环是 JavaScript 实现异步的一种方法，也是 JavaScript 的执行机制 1.先执行所有同步任务，碰到异步任务放到任务队列中 2.同步任务执行完毕，开始执行当前所有的异步任务 3.先执行任务队列里面所有的微任务 4.然后执行一个宏任务 5.然后再执行所有的微任务 6.再执行一个宏任务，再执行所有的微任务·······依次类推到执行结束。
3-6 的这个循环称为事件循环 Event Loop

| Tables               |                                                                 宏任务（macrotask）                                                                 |                                                                                      微任务（microtask） |
| -------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------: | -------------------------------------------------------------------------------------------------------: |
| 谁发起的             |                                                                宿主（Node、浏览器）                                                                 |                                                                                                  JS 引擎 |
| 具体事件             | 1. script (可以理解为外层同步代码) 2. setTimeout/setInterval 3. UI rendering/UI 事件 4. postMessage，MessageChannel 5. setImmediate，I/O（Node.js） | 1. Promise 2. MutaionObserver 3. Object.observe（已废弃；Proxy 对象替代） 4. process.nextTick（Node.js） |
| 谁先运行             |                                                                       后运行                                                                        |                                                                                                   先运行 |
| 会触发新一轮 Tick 吗 |                                                                         会                                                                          |                                                                                                     不会 |

## 虚拟 dom 原理

    	虚拟dom是用js模拟一颗dom树,放在浏览器内存中，相当于在js和真实dom中加了一个缓存，利用dom diff算法避免了没有必要的dom操作，从而提高性能。
    	优点：
    	（1）虚拟DOM具有批处理和高效的Diff算法,最终表现在DOM上的修改只是变更的部分，可以保证非常高效的渲染,优化性能；
    	（2）虚拟DOM不会立马进行排版与重绘操作，对虚拟DOM进行频繁修改，最后一次性比较并修改真实DOM中需要改的部分；
    	（3）虚拟 DOM 有效降低大面积真实 DOM 的重绘与排版，因为最终与真实 DOM 比较差异，可以只渲染局部；
    	缺点：
    	（1）首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢；

    	React组件的渲染过程：
    	（1）使用JSX编写React组件后所有的JSX代码会通过Babel转化为 React.createElement执行;
    	（2）createElement函数对 key和 ref等特殊的 props进行处理，并获取 defaultProps对默认 props进行赋值，并且对传入的子节点进行处理，最终构造成一个 ReactElement对象（所谓的虚拟 DOM）。
    	（3）ReactDOM.render将生成好的虚拟 DOM渲染到指定容器上，其中采用了批处理、事务等机制并且对特定浏览器进行了性能优化，最终转换为真实 DOM。

    	虚拟DOM的组成——ReactElementelement对象结构：
    	（1）type：元素的类型，可以是原生html类型（字符串），或者自定义组件（函数或class）
    	（2）key：组件的唯一标识，用于Diff算法，下面会详细介绍
    	（3）ref：用于访问原生dom节点
    	（4）props：传入组件的props，chidren是props中的一个属性，它存储了当前组件的孩子节点，可以是数组（多个孩子节点）或对象（只有一个孩子节点）
    	（5）owner：当前正在构建的Component所属的Component
    	（6）self：（非生产环境）指定当前位于哪个组件实例
    	（7）_source：（非生产环境）指定调试代码来自的文件(fileName)和代码行数(lineNumber)

### 设计模式 发布订阅模式和观察者模式

### react 组件设计

### 构建工具 webpack 和 vite

webpack 输入的是文件 输出的也是文件
module 一个文件
chunk 一条相互依赖模块关系的路径 是过程中的代码块
bundle 结果代码 chunk 打包之后就是 bundle

### react 渲染大量数据优化

1 react-window 虚拟列表滚动 也叫按需渲染或可视区域渲染
2 时间分片 时间分片主要是分批渲染DOM，使用 requestAnimationFrame 来让动画更加流畅

### 前端模块化

CommonJS 是一种使用广泛的 JavaScript 模块化规范，核心思想是通过 require 方法来同步地加载依赖的其他模块，通过 module.exports 导出需要暴露的接口
ES6 模块化是 ECMA 提出的 JavaScript 模块化规范，它在语言的层面上实现了模块化。浏览器厂商和 Node.js 都宣布要原生支持该规范。它将逐渐取代 CommonJS 和 AMD`规范，成为浏览器和服务器通用的模块解决方案。
1 语法不同 ES6 使用 import 和 export 关键字来实现模块化 CommonJS 使用 require()和 module.exports 实现模块化
2 加载方式不同 ES6 是静态加载，编译时就处理了模块依赖关系 CommonJS 是动态加载，运行时才处理模块依赖关系
3 应用场景不同 ES6 适用于浏览器端和 Node.js 中使用 CommonJS 适用于服务器端
4 对象引用不同 ES6 的模块导入通过对象引用来实现 CommonJS 的模块导入则是通过值拷贝的方式来实现

```js
// 导入
const someFun = require("./moduleA");
someFun();

// 导出
module.exports = someFunc;
//esmodule
// 导入
import { name } from "./person.js";
// 导出
export const name = "zfpx";
```

ES6 和 CommonJS 都是 JavaScript 模块化的规范，它们之间有以下区别：

语法不同：ES6 使用 import 和 export 关键字来实现模块化，而 CommonJS 使用 require() 和 module.exports。

加载方式不同：ES6 使用静态加载，即在编译时就处理模块依赖关系；而 CommonJS 使用动态加载，即在运行时处理模块依赖关系。

应用场景不同：ES6 的模块化适用于浏览器端和 Node.js 中使用，它采用了异步导入、编译时静态分析等技术，使得代码可读性更好，依赖关系更清晰，能够有效提高代码执行效率。而 CommonJS 则更适合于服务器端，因为 Node.js 中使用的大部分第三方模块都是基于 CommonJS 规范的。

对象引用不同：ES6 的模块导入是通过对象引用来实现的，即所有导入的变量都指向同一个引用；而 CommonJS 的模块导入则是通过值拷贝的方式来实现的，即每个变量都拷贝了一份导出变量的值。这意味着如果在 ES6 的模块中修改导出变量的属性，那么其他导入该变量的模块也会受到影响，而在 CommonJS 中则不会。

循环依赖处理不同：ES6 在编译时会进行循环依赖处理，即将模块中的循环依赖转换成静态的拓扑结构；而 CommonJS 则无法处理循环依赖。

总的来说，ES6 的模块化规范更加先进、灵活，能够适应更多的应用场景，而 CommonJS 则更加简单、易用，广泛应用于 Node.js 开发中。在实际应用中，可以根据具体情况选择使用不同的模块化方案。
