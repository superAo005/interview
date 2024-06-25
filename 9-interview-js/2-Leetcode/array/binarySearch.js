function binarySearch(arr, n, searchFirst) {
  let low = 0;
  let high = arr.length - 1;
  let result = -1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === n) {
      result = mid;
      if (searchFirst) {
        high = mid - 1; // 继续向左搜索第一个匹配的元素
      } else {
        low = mid + 1; // 继续向右搜索最后一个匹配的元素
      }
    } else if (arr[mid] < n) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return result;
}
// 示例用法
const arr = [1, 1, 2, 3, 3, 3, 3, 4, 6, 6];
const n = 3;

const occurrences = countOccurrences(arr, n);
console.log(occurrences); // 输出: 4
