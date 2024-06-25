/**
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 nums1 成为一个有序数组。
 * 示例 1：
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
示例 2：
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
 * @param {*} nums1 
 * @param {*} m 
 * @param {*} nums2 
 * @param {*} n 
 * @returns 
 */
// 因为是有序数组，第一个数组还有正好满足假如第二数组的空间，所以这里可以采取双指针来解答，从后往前遍历
// 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
// 你可以假设 nums1 的空间大小等于 m + n，这样它就有足够的空间保存来自 nums2 的元素。
const merge = (nums1, m, nums2, n) => {
  let len = m + n - 1;
  m--, n--;
  while (m >= 0 && n >= 0) {
    if (nums1[m] > nums2[n]) {
      nums1[len] = nums1[m--];
    } else {
      nums1[len] = nums2[n--];
    }
    len--;
  }
  if (m === -1) {
    return nums1.splice(0, len + 1, ...nums2.slice(0, n + 1));
  }
  if (n === -1) {
    return nums1;
  }
};
function merge2(nums1, m, nums2, n) {
  let i = m - 1; // nums1 的指针
  let j = n - 1; // nums2 的指针
  let k = m + n - 1; // nums1 的末尾
  // 从后向前合并两个数组
  while (i >= 0 && j >= 0) {
    if (nums1[i] > nums2[j]) {
      nums1[k] = nums1[i];
      i--;
    } else {
      nums1[k] = nums2[j];
      j--;
    }
    k--;
  }
  return nums1;
}
const nums1 = [1, 2, 3, 4, 5, 8];
const nums2 = [2, 9, 10];
const m = 3;
const n = 3;
console.log(merge2(nums1, m, nums2, n));
console.log(merge(nums1, m, nums2, n));