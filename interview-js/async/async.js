async function a() {
  console.log("1");
  await b();
  console.log("2");
}
async function b() {
  console.log("3");
  await new Promise((resove, reject) => {
    console.log("4");
    resove();
  }).then(() => {
    console.log("5");
  });
  setTimeout(() => {
    console.log("6");
  });
  console.log("7");
}
new Promise((resove, reject) => {
  console.log("8");
  resove();
  console.log("9");
  reject();
})
  .then(() => {
    console.log("10");
    setTimeout(() => {
      console.log("11");
      new Promise((resove, reject) => {
        resove();
      }).then(() => {
        console.log("12");
      });
    });
  })
  .catch(() => {
    console.log("13");
  });
console.log("14");
a();
/**
 * 8-9-14-1-3-4-10-5-7-2-11-12-6
 */
