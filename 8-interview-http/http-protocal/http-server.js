/**
 * 如果用到node.js
 * 如果你会node.js 学代码具体 实现
 * 如果不会node.js 学习思路
 */
const http = require("http"); //应用层的模块
const fs = require("fs");
const path = require("path");
const url = require("url");
//创建一个http服务器
let server = http.createServer(function (req, res) {
  let { pathname } = url.parse(req.url); // /get?id=1
  if (["/get.html", "/post.html"].includes(pathname)) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    //我要以同步模式读取文件内容
    let content = fs.readFileSync(
      path.join(__dirname, "static", pathname.slice(1))
    );
    res.write(content); //向客户端写响应
    res.end(); //结束 这次写入
  } else if (pathname === "/get") {
    console.log(req.method);
    console.log(req.url);
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.write("get");
    res.end();
  } else if (pathname === "/post") {
    let buffers = [];
    //tcp传输的时候,有可能会分包.客户给服务器发10M 可能分成10次发送,每次发1M
    //on data得到的只有请求体
    req.on("data", (data) => {
      buffers.push(data);
    });
    //Buffer是一个类,是一node里有一个类,类似于字节数组
    req.on("end", () => {
      console.log(req.method);
      console.log(req.url);
      console.log(req.headers);
      res.statusCode = 200;
      let body = Buffer.concat(buffers);
      console.log("body", body);
      res.setHeader("Content-Type", "text/plain");
      res.write(body);
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});
server.listen(8080);
