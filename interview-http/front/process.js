const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
console.log(process.pid); // 每个进程都有一个id号

const cp = spawn("node", ["sum.js"], {
  cwd: path.resolve(__dirname, "worker"),
  stdio: "ignore",
});
cp.on("close", () => {
  console.log("子进程关闭了");
});
cp.on("error", () => {
  console.log("子进程报错了");
});
cp.on("exit", () => {
  console.log("子进程退出了");
});
