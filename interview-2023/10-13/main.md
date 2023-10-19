# 希音面试

## Promise 获取全部异步的结果

1. 使用 Promise.all 一旦有一个结果为 rejected 就是走 catch
2. 只需要在.then 返回一个 promise 的对象，不管是 resolve 还是 reject 都执行.then 方法
3. 使用 Promise.allSettled 无论成功还是失败，都会执行

## vue nextTick

1.nextTick 是异步的，在下次 DOM 更新循环结束之后执行延迟回调 2.在修改数据之后立即使用这个方法，获取更新后的 DOM

## 如何实现判断一个元素是否在可视区中

1.window.innerHeight 是浏览器可视区的高度；
2.document.body.scrollTop || document.documentElement.scrollTop 是浏览器滚动的过的距离；
3.imgs.offsetTop 是元素顶部距离文档顶部的高度（包括滚动条的距离）； 4.内容达到显示区域的：img.offsetTop < window.innerHeight + document.body.scrollTop;
利用 api getBoundingClientRect

```js
function isInViewPort(element) {
  const viewWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const { top, right, bottom, left } = element.getBoundingClientRect();
  //如果一个元素在视窗之内的话，那么它一定满足下面四个条件
  return top >= 0 && left >= 0 && right <= viewWidth && bottom <= viewHeight;
}
```
