## 什么是虚拟 dom

React.createElement 函数所返回的就是一个虚拟 DOM
虚拟 DOM 就是一个描述真实 DOM 的纯 JS 对象

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
4. 更新的时候可以实现差异化更新，减少更新DOM的操作

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
