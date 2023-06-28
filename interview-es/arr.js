let arr = [12, 5, [10, 11, 14, [15, 17, 18, [19, 20, 30, 4]], 13], 6, 9];
//调用flat方法，数组扁平化
let newArr = arr.flat(Infinity);
//求最大值和下标。
let max = Math.max(...newArr);
let maxindex = newArr.indexOf(max);
console.log(max, maxindex); //最大值30,下标10
//求最小值和下标。
let min = Math.min(...newArr);
let minindex = newArr.indexOf(min);
console.log(min, minindex); //最小值4,下标11

function deepFlatByFor(arr, depth = Infinity) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) && depth > 0
      ? res.push(...deepFlatByFor(arr[i], depth - 1))
      : res.push(arr[i]);
  }

  return res;
}

console.log(deepFlatByFor(sourceData)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(deepFlatByFor(sourceData, 2)); // [1, 2, 3, 4, 5, [6, 7, 8, [9, 10]]]
const deepFlatByFor2 = (arr, depth = Infinity) => {
  let res = [];
  arr.forEach((item) => {
    Array.isArray(item) && depth > 0
      ? res.push(...deepFlatByFor2(item, depth - 1))
      : res.push(item);
  });
  return res;
};
// 计算数组深度/
function getArrayDepth(array) {
  let depth = 1;
  if (Array.isArray(array)) {
    array.forEach(function (element) {
      if (Array.isArray(element)) {
        let nestedDepth = getArrayDepth(element) + 1;
        if (nestedDepth > depth) {
          depth = nestedDepth;
        }
      }
    });
  }
  return depth;
}
function getArrayDepth(arr) {
  let maxDepth = 1;
  function dfs(array, currentDepth) {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        maxDepth = Math.max(maxDepth, currentDepth);
        dfs(array[i], currentDepth + 1);
      }
    }
  }

  dfs(arr, 1);
  return maxDepth;
}

// 示例用法
const arr1 = [1, [2, [3, 4]], [1, 2]];
const depth = getArrayDepth(arr1);
// console.log(depth); // 输出 3

// [1,1,2,2,2,1,3,1] => 2 求出数组中出现次数最多的值
function findMostFrequentElement(arr) {
  const counter = {};
  let maxCount = 0;
  let mostFrequentElement;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (element === undefined || isNaN(element)) {
      continue;
    }

    if (counter[element] === undefined) {
      counter[element] = 1;
    } else {
      counter[element]++;
    }

    if (counter[element] > maxCount) {
      maxCount = counter[element];
      mostFrequentElement = element;
    }
  }

  return mostFrequentElement;
}
