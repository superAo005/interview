/**
示例 1：
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
示例 2：

输入：nums = [3,2,4], target = 6
输出：[1,2]
示例 3：

输入：nums = [3,3], target = 6
输出：[0,1]
**/
// 给定一个整数数组 nums 和一个整数目标值 target，
// 请你在该数组中找出 和为目标值 target 的那 两个 整数，并返回它们的数组下标。
const twoSum = (nums, target) => {
  const map = new Map();
  const len = nums.length;
  for (let i = 0; i < len; i++) {
    const num = nums[i];
    const anotherNum = target - num;
    if (map.has(anotherNum)) {
      return [map.get(anotherNum), i];
    } else {
      map.set(num, i);
    }
  }
  return [];
};
console.log(twoSum([2, 5, 11, 15], 9));
