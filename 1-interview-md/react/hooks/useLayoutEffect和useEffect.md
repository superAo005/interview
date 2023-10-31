## useLayoutEffect和useEffect的区别

1. useEffect 是异步执行的，而useLayoutEffect是同步执行的
2. useEffect 的执行时机是浏览器完成渲染之后，而 useLayoutEffect 的执行时机是浏览器把内容真正渲染到界面之前，和 componentDidMount 等价 ***(didmount并不意味着内容真正渲染到浏览器上了 只是在dom中更新了)***

## 应用场景
1. ssr-useLayoutEffect 是不会在服务端执行的，所以就有可能导致 ssr 渲染出来的内容和实际的首屏内容并不一致
2. 最好把操作 dom 的相关操作放到 useLayouteEffect 中去，避免导致闪烁
## 总结
优先使用 useEffect，因为它是异步执行的，不会阻塞渲染
会影响到渲染的操作尽量放到 useLayoutEffect中去，避免出现闪烁问题
useLayoutEffect和componentDidMount是等价的，会同步调用，阻塞渲染
在服务端渲染的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致
