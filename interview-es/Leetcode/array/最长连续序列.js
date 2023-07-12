function findLongestConsecutiveSequence(nums) {
  if (nums.length === 0) {
    return 0; // 数组为空，返回0
  }
  nums.sort((a, b) => a - b); // 按升序排序数组
  let currentStreak = 1;
  let longestStreak = 0;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1] + 1) {
      currentStreak += 1; // 当前元素属于连续序列
    } else if (nums[i] !== nums[i - 1]) {
      currentStreak = 1; // 重新开始计数
    }
    if (currentStreak > longestStreak) {
      longestStreak = currentStreak; // 更新最长连续序列长度
    }
  }

  return longestStreak;
}

// 示例用法
const nums = [100, 4, 200, 1, 3, 2, 5];
const longestSequence = findLongestConsecutiveSequence(nums);
console.log(longestSequence); // 输出：5
