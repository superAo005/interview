// 加一个简单算法，实现 [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14] => [ '1-5', '7-8', '10', '12-14' ]
function formatArray(nums) {
  const result = [];
  let start = nums[0];
  let end = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === end + 1) {
      end = nums[i];
    } else {
      if (start === end) {
        result.push(start.toString());
      } else {
        result.push(`${start}-${end}`);
      }
      start = nums[i];
      end = nums[i];
    }
  }

  if (start === end) {
    result.push(start.toString());
  } else {
    result.push(`${start}-${end}`);
  }

  return result;
}
const nums = [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14];
const formattedArray = formatArray(nums);
console.log(formattedArray);
