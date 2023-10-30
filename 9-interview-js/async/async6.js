// 快手面试
function sync() {
  console.log("sync end"); 
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

console.log("script start"); 
setTimeout(() => {
  console.log("setTimeout 1"); 
}, 0);
Promise.resolve()
  .then(function () {
    console.log("promise1"); 
  })
  .then(function () {
    console.log("promise2");
  });
execAsync();
errorFunc().then((res) => console.log(res));
console.log("script end"); 

/**
 *
 */
