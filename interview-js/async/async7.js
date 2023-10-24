const a = new Promise((resolve, reject) => {
  console.log(1);
  resolve(2);
});
Promise.resolve(a).then((res) => {
  console.log(res);
});
Promise.resolve(9)
  .then((res) => {
    console.log(res);
    console.log(5);
  })
  .then((res) => {
    console.log(res);
    console.log(6);
  })
  .then((res) => {
    console.log(res);
    console.log(7);
  });
