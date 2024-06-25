let twoSum = (nums, targrt) => {
  const map = new Map();
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    const complement = targrt - nums[i];
    if (map.has(complement)) {
      res.push([map.get(complement), i]);
    } else {
      map.set(nums[i], i);
    }
  }
  return res;
};
console.log(twoSum([2, 7, 11, 15, 1, 8], 9));
// 20 stack
let isValid = (str) => {
  let map = new Map();
  let stack = [];
  map.set("(", ")");
  map.set("[", "]");
  map.set("{", "}");
  for (let i = 0; i < str.length; i++) {
    if (map.has(s[i])) {
      stack.push(map.get(s[i]));
    } else {
      if (stack.pop() !== s[i]) {
        return false;
      }
    }
  }
  if (stack.length !== 0) {
    return false;
  }
  return true;
};
