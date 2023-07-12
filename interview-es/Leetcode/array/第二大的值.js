function findSecondLargestNumber(arr) {
  let max = -Infinity; // 最大值
  let secondMax = -Infinity; // 第二大值
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      // 如果当前元素大于最大值，则更新最大值和第二大值
      secondMax = max;
      max = arr[i];
    } else if (arr[i] > secondMax && arr[i] < max) {
      // 如果当前元素大于第二大值且小于最大值，则更新第二大值
      secondMax = arr[i];
    }
  }

  return secondMax;
}

// 示例用法
const numbers = [5, 10, 3, 8, 7];
const secondLargest = findSecondLargestNumber(numbers);
console.log(secondLargest); // 输出 8
