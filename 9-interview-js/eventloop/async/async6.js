// 快手面试
function sync() {
  console.log("1");
}
async function execAsync() {
  await sync();
  console.log("2");
}
async function errorFunc() {
  try {
    await Promise.reject("3");
  } catch (e) {
    console.log("4");
  }
  
  return Promise.reject("5");
}

console.log("6");
setTimeout(() => {
  console.log("7");
}, 0);
Promise.resolve()
  .then(function () {
    console.log("8");
  })
  .then(function () {
    console.log("9");
  });
execAsync();
errorFunc().then((res) => console.log(res)).catch((err) => console.log(err));
/**
 6-1-8-2-4-9-5-7
 */
