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
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
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
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  arr = arr.sort();
  let arrry = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      arrry.push(arr[i]);
    }
  }
  return arrry;
}
