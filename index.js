let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});
//实现compose函数
function compose(middleware) {
  return function () {
    dispatch(0);
    function dispatch(i) {
      if (i === middleware.length) {
        return;
      }
      const fn = middleware[i];
      fn(function next() {
        dispatch(i + 1);
      });
    }
  };
}
let fns = compose(middleware);
fns();
