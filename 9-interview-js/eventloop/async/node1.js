setTimeout(() => {
  console.log("1-setTimeout1");
  Promise.resolve().then(function () {
    console.log("12-promise1");
  });
}, 0);
setTimeout(() => {
  console.log("2-setTimeout2");
  Promise.resolve().then(function () {
    console.log("11-promise2");
  });
}, 0);
setImmediate(() => {
  console.log("3-setImmediate1");
  Promise.resolve().then(function () {
    console.log("4-promise3");
  });
}, 0);

process.nextTick(() => {
  console.log("5-nextTick1");
  Promise.resolve().then(() => console.log("6-promise4"));
  process.nextTick(() => {
    console.log("7-nextTick2");
    Promise.resolve().then(() => console.log("8-promise5"));
    process.nextTick(() => {
      console.log("9-nextTick3");
      process.nextTick(() => {
        console.log("10-nextTick4");
      });
    });
  });
});
/**
 * 5-7-9-10-6-8-1-12-2-11-3-4
 */
