Promise.resolve().then(() => {
  console.log("1-Promise1");
  setTimeout(() => {
    console.log("2-setTimeout2");
  }, 0);
});
setTimeout(() => {
  console.log("3-setTimeout1");
  Promise.resolve().then(() => {
    console.log("4-Promise2");
  });
}, 0);
/**
 * 1-3-4-2
 */