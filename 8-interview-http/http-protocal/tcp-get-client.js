let net = require("net"); //属于传输层的
const ReadState = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
};
class XMLHttpRequest {
  constructor() {
    this.readyState = ReadState.UNSENT; //默认是初始化的,未调用open方法
    this.headers = { Connection: "keep-alive" }; //请求头,可以设置
  }
  open(method, url) {
    this.method = method || "GET";
    this.url = url;
    //http://127.0.0.1:8080/get=>hostname=127.0.0.1  port=8080 path=/get
    let { hostname, port, path } = require("url").parse(url);
    this.hostname = hostname;
    this.port = port;
    this.path = path;
    this.headers["Host"] = `${hostname}:${port}`;
    // 通过传输层的net模 块发起请求
    const socket = (this.socket = net.createConnection(
      { hostname, port },
      () => {
        //连接成功之后可以监听服务器的数据
        socket.on("data", (data) => {
          data = data.toString();
          console.log("data", data);
          let [response, bodyRows] = data.split("\r\n\r\n");
          let [statusLine, ...headerRows] = response.split("\r\n");
          let [, status, statusText] = statusLine.split(" ");
          this.status = status;
          this.statusText = statusText;
          this.responseHeaders = headerRows.reduce((memo, row) => {
            let [key, value] = row.split(": ");
            memo[key] = value;
            return memo;
          }, {});
          this.readyState = ReadState.HEADERS_RECEIVED;
          this.onreadystatechange && this.onreadystatechange();
          let [, body] = bodyRows.split("\r\n");
          this.readyState = ReadState.LOADING;
          this.onreadystatechange && this.onreadystatechange();
          this.response = this.responseText = body;
          this.readyState = ReadState.DONE;
          this.onreadystatechange && this.onreadystatechange();
          this.onload && this.onload();
        });
      }
    ));
    this.readyState = ReadState.OPENED;
    this.onreadystatechange && this.onreadystatechange();
  }
  setRequestHeader(header, value) {
    this.headers[header] = value;
  }
  getAllResponseHeaders() {
    let result = "";
    for (let key in this.responseHeaders) {
      result += `${key}: ${this.responseHeaders[key]}\r\n`;
    }
    return result;
  }
  getResponseHeader(key) {
    return this.responseHeaders[key];
  }
  send() {
    let rows = [];
    rows.push(`${this.method} ${this.url} HTTP/1.1`);
    //this.headers={name:superao,age:11}
    //[name,age]=>['name=superao','age=11']
    rows.push(
      ...Object.keys(this.headers).map((key) => `${key}: ${this.headers[key]}`)
    );
    let request = rows.join("\r\n") + "\r\n\r\n";
    console.log("request", request);
    this.socket.write(request);
  }
}
/**
GET /get HTTP/1.1
Host: 127.0.0.1:8080
Connection: keep-alive
name: superao
age: 11

*/

let xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  console.log("onreadystatechange", xhr.readyState);
};
xhr.open("GET", "http://127.0.0.1:8080/get");
xhr.responseType = "text";
xhr.setRequestHeader("name", "superao");
xhr.setRequestHeader("age", "11");
xhr.onload = function () {
  console.log("readyState", xhr.readyState); //
  console.log("status", xhr.status);
  console.log("statusText", xhr.statusText);
  console.log("getAllResponseHeaders", xhr.getAllResponseHeaders());
  console.log("response", xhr.response);
};
xhr.send();
//http是应用层的是解析数据的 tcp是传输层的与内容无关的
