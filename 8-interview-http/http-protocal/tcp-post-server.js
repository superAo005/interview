let net = require('net');
let Parser = require('./Parser');
/**
 * 创建一个tcp服务器,每当有客户端来连接了,就会为他创建一个socket
 */
const server = net.createServer(socket=>{
   socket.on('data',(data)=>{
    //解析请求
    let parser = new Parser();
    let {method,url,headers,body} = parser.parse(data);
    /* let [requestLine,...headerRows] = request.split('\r\n');
    let [method,url] = requestLine.split(' ');
    let headers  = headerRows.slice(0,-2).reduce((memo,row)=>{
        let [key,value] = row.split(': ');
        memo[key]=value;
        return memo;
    },{}); */
    console.log('method',method);
    console.log('url',url);
    console.log('headers',headers);

    //构建响应
    let rows = [];
    rows.push(`HTTP/1.1 200 OK`);
    rows.push(`Content-Type: text/plain`);
    rows.push(`Date: ${new Date().toGMTString()}`);
    rows.push(`Connection: keep-alive`);
    rows.push(`Transfer-Encoding: chunked`);
    rows.push(`Content-Length: ${Buffer.byteLength(body)}`);//返回这个字符串的字节长度 一般body.length
    rows.push(`\r\n${Buffer.byteLength(body).toString(16)}\r\n${body}\r\n0`);
    let response = rows.join('\r\n');

    console.log('response',response);

    socket.end(response);
   });
});
server.listen(8080);
/**
HTTP/1.1 200 OK
Content-Type: text/plain
Date: Sat, 15 Aug 2020 12:50:53 GMT
Connection: keep-alive
Content-Length: 3

TCP是协议名 net是实现TCP协议的node模块
HTTP就协议名 http是实现http协议的模 块
 */
/**
GET /get HTTP/1.1
Host: 127.0.0.1:8080
Connection: keep-alive
name: superao
age: 11\r\n
\r\n

 */