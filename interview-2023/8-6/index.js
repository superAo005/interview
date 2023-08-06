console.log(a);
function a() {}
var a = 1;
console.log(a);
function deepCopy(obj, cache = new WeakMap()) {
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  // 检查是否为基本数据类型，如果是，则直接返回
  if (obj === null || typeof obj !== "object") {
    return obj;
  }
  // 检查缓存，如果已经拷贝过该对象，则直接返回缓存的结果
  if (cache.has(obj)) {
    return cache.get(obj);
  }
  // 创建新的对象或数组
  const copy = Array.isArray(obj) ? [] : {};
  // 将新对象添加到缓存中
  cache.set(obj, copy);
  // 遍历原对象的属性
  for (let key in obj) {
    // if (Object.prototype.hasOwnProperty.call(obj, key)) {
    if (obj.hasOwnProperty(key)) {
      // 递归拷贝子属性
      copy[key] = deepCopy(obj[key], cache);
    }
  }

  return copy;
}
// 测试用例
let de = {
  b: {
    b: "name2",
    c: {
      c: "name3",
    },
  },
};

de.c = de;

let obj = {
  a: 1,
  b: [1, 2, 3],
  c: { name: 12 },
  ob: de,
};
let res = deepCopy(obj);
console.log(res.a === obj.a);
console.log(res.b === obj.b);
console.log(res.c === obj.c);
console.log(res.ob === obj.ob);
