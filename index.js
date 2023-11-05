const isType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
};
let res = isType(null);
console.log(res);
