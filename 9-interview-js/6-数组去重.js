const arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
// 利用ES6 Set去重（ES6中最常用）
function unique1(arr) {
  return Array.from(new Set(arr));
}
// 利用for嵌套for，然后splice去重（ES5中最常用）
function unique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
// 利用indexOf去重
function unique3(arr) {
  let array = [];
  for (let i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
// 利用sort()排序方法，然后根据排序后的结果进行遍历及相邻元素比对。
function unique4(arr) {
  arr = arr.sort();
  let arrry = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}
let arr1 = [];
// 创建百万条百以内的整数数组数据
for (let i = 0; i < 1000000; i++) {
  arr1.push(parseInt(Math.random() * 5000));
}
/**
 * 利用for循环和对象的 key 唯一
 * 时间复杂度是O(n)
 * @param {*} arr
 * @returns
 */
function distinct(arr) {
  let result = [];
  let obj = {};
  for (let i of arr) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}
console.time("运行时间");
distinct(arr1);
console.timeEnd("运行时间"); // 运行时间: 35.403076171875 ms
// 使用Set
let unique_1 = (arr) => [...new Set(arr)];

// 使用filter
function unique_2(array) {
  let res = array.filter(function (item, index, array) {
    return array.indexOf(item) === index;
  });
  return res;
}

//Object 键值对
function unique_3(array) {
  let obj = {};
  return array.filter(function (item, index, array) {
    return obj.hasOwnProperty(typeof item + item)
      ? false
      : (obj[typeof item + item] = true);
  });
}

// 使用Map
function unique_4(arr) {
  const tmp = new Map();
  return arr.filter((item) => {
    return !tmp.has(item) && tmp.set(item, 1);
  });
}

// 使用reduce

let unique_5 = (arr) =>
  arr.reduce((pre, cur) => (pre.includes(cur) ? pre : [...pre, cur]), []);
