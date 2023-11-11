## 原生 APP 和 h5 之间可以使用 jsBridge 进行通信，也可以使用 postMessage 进行通信

```js
//接受APP消息：
// 安卓端
webView.loadUrl("javascript:window.postMessage('Hello H5 OnClick', '*');");

// H5 监听来自App的消息
window.addEventListener('message', (event) => {
  console.log('Received message from App:', event.data);
});
// 发送消息到APP：
// H5发送
const message = {
    data: 'h5 send',
};
const url = `/sendMsg/${encodeURIComponent(JSON.stringify(message))}`;
window.location.href = url;
// 安卓端
@Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
    LogUtils.e("shouldInterceptRequest", request.getUrl().toString());
    return super.shouldInterceptRequest(view, request);
}


```
