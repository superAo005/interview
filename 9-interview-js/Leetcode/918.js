/**
 * 该问题的要求是将给定的整数数组进行排序，其中每个元素都是正整数，
 * 并且要求排序后的数组中元素按照其平方后的值从小到大排序。
 * 该算法使用双指针方法进行排序。
 * 首先，我们定义一个结果数组 result，然后使用两个指针 left 和 right 分别指向数组的第一个元素和最后一个元素。
 * 在每次循环中，我们计算 left 指向的元素的平方和 leftSquare，以及 right 指向的元素的平方和 rightSquare。
 * 然后，我们将较大的平方值放入结果数组的最后位置，并将相应的指针向内移动，直到两个指针相遇为止。最后，我们返回结果数组。
 * @param {number[]} nums
 * @return {number[]}
 */
const sortedSquares = function (nums) {
  const n = nums.length;
  const result = [];
  let left = 0;
  let right = n - 1;
  let index = n - 1;

  while (left <= right) {
    const leftSquare = Math.pow(nums[left], 2);
    const rightSquare = Math.pow(nums[right], 2);

    if (leftSquare > rightSquare) {
      result[index] = leftSquare;
      left++;
    } else {
      result[index] = rightSquare;
      right--;
    }

    index--;
  }

  return result;
};
