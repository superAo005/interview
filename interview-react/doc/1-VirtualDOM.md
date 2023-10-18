## 什么是虚拟 dom

React.createElement 函数所返回的就是一个虚拟 DOM
虚拟 DOM 就是一个描述真实 DOM 的纯 JS 对象

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

## 为什么需要虚拟 dom

1. 框架设计 数据驱动

```js
 data.xxx= 1
 render(){
   //全量更新
 }
```

2. 跨平台

## 虚拟 dom 优缺点

### 优点

1. 处理了浏览器兼容性问题，避免用户操作真实 DOM
2. 内容经过了 XSS 处理，可以防范 XSS 攻击
3. 容易实现跨平台开发 Android、iOS、VR 应用
4. 更新的时候可以实现差异化更新，减少更新 DOM 的操作

### 缺点

1. 虚拟 DOM 需要消耗额外的内存
2. 首次渲染其实并不一定会更快

```js
// 渲染 vdom
//不管 vue 还是 react，渲染器里这段 if else 是少不了的
switch (vdom.tag) {
  case HostComponent:
  // 创建或更新 dom
  case HostText:
  // 创建或更新 dom
  case FunctionComponent:
  // 创建或更新 dom
  case ClassComponent:
  // 创建或更新 dom
}
```
