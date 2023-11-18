## Cookie 的安全问题

1. Cookie 劫持
   升级为 HTTPS 协议加密传输数据，可以有效的防止中间人攻击和黑客窃听
   设置 HttpOnly 和 Secure 属性，限制 Cookie 只能在 HTTPS 协议下传输，避免被 XSS 攻击窃取
2. XSS 攻击