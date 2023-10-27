// 直接合并后排序
const merge = (nums1, m, nums2, n) => {
  nums1.splice(m, nums1.length - m, ...nums2);
  nums1.sort((a, b) => a - b);
};
// 因为是有序数组，第一个数组还有正好满足假如第二数组的空间，所以这里可以采取双指针来解答，从后往前遍历
const merge2= function (nums1, m, nums2, n) {
    let len = m + n - 1;
    m--, n--;
    while (m >= 0 && n >= 0) {
      if (nums1[m] > nums2[n]) {
        nums1[len] = nums1[m--]
      } else {
        nums1[len] = nums2[n--]
      }
      len--;
    }
    if(m === -1){
      return nums1.splice(0, len+1, ...nums2.slice(0, n + 1));
    }
    if(n === -1){
      return nums1;
    }
  };