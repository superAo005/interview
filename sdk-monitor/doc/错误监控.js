import { sendData } from "./per.js";

// 监听错误事件
window.addEventListener("error", function (event) {
  // 获取错误信息
  let message = event.message;
  let filename = event.filename;
  let lineno = event.lineno;
  let colno = event.colno;

  // 构造要发送的数据
  let data = {
    type: "error",
    message: message,
    filename: filename,
    lineno: lineno,
    colno: colno,
    // 其它你想要收集的信息
  };

  // 发送数据
  sendData(data);
});
// 劫持console.error
const originConsoleError = console.error;
// 上报每个error
console.error = (...errors) => {
  errors.forEach((e) => {
    handleError(e); // 处理错误并上报emit
  });
  originConsoleError.apply(console, errors);
};
