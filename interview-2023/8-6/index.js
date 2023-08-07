console.log(a);
function a() {}
var a = 1;
console.log(a);
// 深拷贝
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

[1, 2, 3].map(parseInt);
// 合并对象
// 传进来的是对象数组
const mergeObject = (...agrs) => {
  let mergeObj = {};
  args.forEach((item) => {
    for (const v in item) {
      if (item.hasOwnProperty(v)) {
        mergeObj[v] = item[v];
      }
    }
  });
  return mergeObj;
};
// 分割URL参数
// https://www.example.com/search?query=JavaScript&sort=desc&page=2
function splitUrlParams(url, res) {
  // 分割的第二个
  let params = url.split("?")[1];
  if (!params) return;
  params.spilt("&").forEach((items) => {
    let item = items.split("=");
    let paramsName = decodeURIComponent(item[0]);
    let paramsValue = decodeURIComponent(item[1]);
    if (paramsName === res) {
      return paramsValue;
    }
  });
}
// 尾递归优化
// 在进行递归调用时，在尾部进行调用自身函数，不带其他的任何参数
// 也就是单有函数本身，不能乘除加减，否则就会开辟内存来分配
// 数组扁平化,尾递归优化
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(5) // O(n)

// 尾递归优化
function factorial(n, total) {
  if (n === 1) return total;
  return factorial(n - 1, n * total);
}

factorial(5, 1) // O(1)

// 斐波那契数列
// 递归
function fn(n){
  if(n <= 1) return n;
  return fn(n - 1) + fn(n - 2);
}
// 尾递归优化
function fn(n, start = 1, total = 1) {
  if(n <= 2) return total;
  return fn(n - 1, total, total + start);
}
// 迭代
function fn(n){
  if(n === 0) return 0;
  if(n === 1) return 1;

  let prev = 0,curr = 0;
  for(let i = 2; i < n; i++){
    let next = prev + curr;
    prev = curr;
    curr = next;
  }
  return curr;
}
// 数组扁平化,尾递归优化
function flatten(arr = [], res = []) {
  arr.forEach((v)=>{
    if(Array.isArray(v)){
      res = [...res, ...flatten(v, [])];
    }else{
      res.push(v)
    }
  })
  return res;
}
// 将一个对象的所有属性改为小写
function converKeysToLowerCase(obj){
  // 创建新对象来存放
  const newObj = {};
  // Object.keys(obj)拿到的是属性组成的数组，便于遍历
  Object.keys(obj).forEach((key)=>{
    const value = obj[key];
    const newKey = key.toLowerCase();
    const newValue = typeof value === 'object' ? converKeysToLowerCase(value) : value;
    newObj[newKey] = newValue;
  })
  return newObj;
}


