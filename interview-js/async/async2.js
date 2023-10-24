async function async1() {
  console.log("1-async1 start");
  await async2();
  console.log("2-async1 end");
}
async function async2() {
  console.log("3-async2");
}
console.log("4-script start");
setTimeout(function () {
  console.log("5-setTimeout");
}, 0);
async1();
new Promise(function (resolve) {
  console.log("6-promise1");
  resolve();
}).then(function () {
  console.log("7-promise2");
});
console.log("8-script end");
function getJson() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('9');
      resolve('10');
    }, 2000);
  });
}
async function testAsync() {
  await getJson();
  console.log('11');
}
testAsync();
