async function a() {
  console.log("4");
  await b();
  console.log("10");
}
async function b() {
  console.log("5");
  await new Promise((resove, reject) => {
    console.log("6");
    resove();
  }).then(() => {
    console.log("8");
  });
  setTimeout(() => {
    console.log("13");
  });
  console.log("9");
}
new Promise((resove, reject) => {
  console.log("1");
  resove();
  console.log("2");
  reject();
})
  .then(() => {
    console.log("7");
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
console.log("3");
a();

