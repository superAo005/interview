// 二分查找的原理是 将目标与数组中间的数比较 如果相等 则直接返回
// 如果大于 则从中间数后面的部分继续二分查找 反之 则从前面的部分继续查找。
// 使用二分查找的前提是 数组是有序的并且目标在数组内。

// 递归实现
function binarySearch2(target, arr, start, end) {
  let s = start || 0;
  let e = end || arr.length - 1;
  let mid = parseInt(s + (e - s) / 2);
  if (target == arr[mid]) {
    return mid;
  } else if (target > arr[mid]) {
    return binarySearch2(target, arr, mid + 1, end);
  } else {
    return binarySearch2(target, arr, start, mid - 1);
  }
  return -1;
}
function binarySearch(target, arr) {
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    let mid = parseInt(start + (end - start) / 2);
    if (target == arr[mid]) {
      return mid;
    } else if (target > arr[mid]) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1;
}
