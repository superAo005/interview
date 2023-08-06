### React 路由原理

1. 不同的路径渲染不同的组件
2. 有两种实现方式
   1. HashRouter:利用 hash 实现路由切换
      改变URL以#分割的路径字符串，让页面感知路由变化的一种模式,通过hashchange事件触发
   2. BrowserRouter:实现 h5 Api 实现路由的切换 history.pushState()和 history.replaceState()，和 1 个事件 window.onpopstate

```js
// HashRouter
window.addEventListener("hashchange", () => {
  console.log(window.location.hash);
  let pathname = window.location.hash.slice(1); //把最前面的那个#删除
  root.innerHTML = pathname;
});
//BrowserRouter
```
