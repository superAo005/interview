setTimeout(function () {
  console.log("timeout");
}, 0);
setImmediate(function () {
  console.log("immediate");
});
