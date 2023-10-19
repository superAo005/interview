// 快手面试
function sync() {
  console.log("sync end"); // 2
}
async function execAsync() {
  await sync();
  console.log("async end"); // 5
}
async function errorFunc() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log("error1"); // 6
  }
  return Promise.resolve("errorFunc end"); // 8
}

console.log("script start"); //1
setTimeout(() => {
  console.log("setTimeout 1"); //9
}, 0);
Promise.resolve()
  .then(function () {
    console.log("promise1"); // 4
  })
  .then(function () {
    console.log("promise2"); // 7
  });
execAsync();
errorFunc().then((res) => console.log(res));
console.log("script end"); // 3

/**
 *
 */
