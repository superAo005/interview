# 2023 面试总结
## 实现 compose 函数, 类似于 koa 的中间件洋葱模型

```js
// 题目需求

let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});

let fn = compose(middleware);
fn();

/*
1
2
3
3.1
2.1
1.1
*/

//实现compose函数
function compose(middleware) {
  return function () {
    dispatch(0);
    function dispatch(i) {
      if (i === middleware.length) {
        return;
      }
      const fn = middleware[i];
      fn(function next() {
        dispatch(i + 1);
      });
    }
  };
}
```


