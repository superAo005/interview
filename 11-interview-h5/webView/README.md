## 通信原理之先了解 webview

IOS 容器 在 IOS 客户端中，我们首先要提到的是一个叫 UIWebView 的容器
Android 容器 在安卓客户端中，webView 容器与手机自带的浏览器内核一致，多为 android-chrome。不存在兼容性和性能问题。
RN 容器 在 react-native 开发中，从 rn 0.37 版本开始官方引入了组件，在安卓中调用原生浏览器，在 IOS 中默认调用的是 UIWebView 容器。从 IOS12 开始，苹果正式弃用 UIWebView，统一采用 WKWebView

```js
// rn js code
// WebView组件不要嵌套在或原生点击组件中，会造成H5内页面滚动失效
<WebView useWebKit={true} source={{ url: "https://m.douyu.com" }} />
```
## h5向ios客户端发送消息
UIWebView与WKWebView能够拦截h5内发起的所有网络请求。所以我们的思路就是通过在h5内发起约定好的特定协议的网络请求
在H5中发起这种特定协议的请求方式分两种
1. 通过localtion.href
2. 使用iframe方式，以唤起Native