// 如何在不改变代码的情况下 修改obj对象
let o = (function () {
  //   let obj = Object.create(null);
  //   Object.setPrototypeOf(obj, null);
  let obj = {
    a: 1,
    b: "1",
  };

  return {
    get: function (k) {
      // if(obj.hasOwnProperty(k)){
      //     return obj[k];
      // }
      return obj[k];
    },
  };
})();
// Object.prototype.valueOf = function () {
//   return Object[this];
// };
// console.log(o.get("valueOf")());
Object.defineProperty(Object.prototype, "gets", {
  get() {
    return this;
  },
});
let res = o.get("gets");
res.a = 2;
res.b = "2";
console.log(o.get("a"));
