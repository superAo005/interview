let arr = [1, 3, 5, 7, 9, 11, 13, 100, 200, 2, 4, 6];
// 1冒泡排序
function sort1(arr) {
  let len = arr.length;
  //比较轮数 外层控制循环多少趟
  for (let i = 0; i < len - 1; i++) {
    // 内层控制每一趟的循环次数 每轮比较次数，次数=长度-1-此时的轮数
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        
      }
    }
  }
  return arr;
}

// 2选择排序
// 在时间复杂度上表现最稳定的排序算法之一，因为无论什么数据进去都是O(n²)的时间复杂度。。。所以用到它的时候，数据规模越小越好。唯一的好处可能就是不占用额外的内存空间了吧。
function sort2(arr) {
  let len = arr.length;
  let minIndex, temp;
  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {
        //寻找最小的数
        minIndex = j; //将最小数的索引保存
      }
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  return arr;
}
// 3快速排序
function sort3(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return sort3(left).concat([pivot], sort3(right));
}
/**
 * 方法说明：冒泡排序
 * @param {Array} arr
 * @return {Array}
 */
function bubbleSort(arr) {
  let len = arr.length;
  console.time("改进前冒泡排序耗时");
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        //相邻元素两两对比
        // let temp = arr[j + 1]; //元素交换
        // arr[j + 1] = arr[j];
        // arr[j] = temp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // ES6 的解构来进行元素交换
      }
    }
  }
  console.timeEnd("改进前冒泡排序耗时");
  return arr;
}
//1.改进冒泡排序
function bubbleSort2(arr) {
  console.time("1.改进后冒泡排序耗时");
  let i = arr.length - 1; //初始时,最后位置保持不变
  while (i > 0) {
    let pos = 0; //每趟开始时,无记录交换
    for (let j = 0; j < i; j++)
      if (arr[j] > arr[j + 1]) {
        pos = j; //记录交换的位置
        // let tmp = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = tmp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // ES6 的解构来进行元素交换
      }
    i = pos; //为下一趟排序作准备
  }
  console.timeEnd("1.改进后冒泡排序耗时");
  return arr;
}
//2.改进冒泡排序
function bubbleSort3(arr) {
  let low = 0;
  let high = arr.length - 1; //设置变量的初始值
  let tmp, j;
  console.time("2.改进后冒泡排序耗时");
  while (low < high) {
    for (
      j = low;
      j < high;
      ++j //正向冒泡,找到最大者
    )
      if (arr[j] > arr[j + 1]) {
        // tmp = arr[j];
        // arr[j] = arr[j + 1];
        // arr[j + 1] = tmp;
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // ES6 的解构来进行元素交换
      }
    --high; //修改high值, 前移一位
    for (
      j = high;
      j > low;
      --j //反向冒泡,找到最小者
    )
      if (arr[j] < arr[j - 1]) {
        // tmp = arr[j];
        // arr[j] = arr[j - 1];
        // arr[j - 1] = tmp;
        [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]; // ES6 的解构来进行元素交换
      }
    ++low; //修改low值,后移一位
  }
  console.timeEnd("2.改进后冒泡排序耗时");
  return arr;
}
// 冒泡排序
function bubbleSort(arr) {
  let i = arr.length - 1;
  while (i > 0) {
    let maxIndex = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        maxIndex = j;
      }
    }
    i = maxIndex;
  }
  return arr;
}
let arr1 = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48];
console.log(bubbleSort(arr1)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(bubbleSort2(arr1)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]
console.log(bubbleSort3(arr1)); //[2, 3, 4, 5, 15, 19, 26, 27, 36, 38, 44, 46, 47, 48, 50]

const arr2 = sort3(arr);
console.log(arr2);
