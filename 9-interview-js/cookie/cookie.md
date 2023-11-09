## [Axios 封装一个完美的双 token 无感刷新](https://juejin.cn/post/7271139265442021391)

最新版chrome中cookie得samesite属性默认是lax，lax模式在很多情况都是不允许跨域携带cookie。
必须要把samesite设置为none，但是设置为none有一个要求，就是必须secure属性为true，也就是必须使用https

##  Secure 和 HttpOnly 标记
如果是 httpOnly 为 true 的 Cookie，那么就无法通过 JS 来操作了 设置 httpOnly 为 true 来防止 XSS 攻击
Secure 也需要特别提一下，它是用来指定 Cookie 是否只能通过 HTTPS 协议来传输

## JWT 会话流程

首先用户通过账号和密码向服务器请求登录。
服务端校验用户身份后，生成一个 Token，然后将 Token 返回给客户端。
客户端需要在本地保存这个 Token，以便后续的请求携带 Token。
客户端可以在本地存储或 sessionStorage 中保存 Token，也可以在 Cookie 中保存 Token。
客户端在后续请求中，都需要将 Token 发送给服务器验证。一般将 Token 放在 HTTP 请求头的 Authorization 字段中，发送给服务器。Bearer [Token]
服务端在接收到请求后，会从 Authorization 字段中获取 Token，并验证 token 是否有效，签名是否正确，是否过期等。通过后，再进行响应。

## [前端鉴权登录](https://juejin.cn/post/7214759986802114620)

