///给一个字符串, 找到第一个不重复的字符
// ababcbdsa
// abcdefg
function findFirstUniqueCharacter(str) {
  const charCount = {};
  // 统计字符出现次数
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  // 找到第一个不重复的字符
  for (let char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }

  return null; // 如果没有不重复的字符，则返回 null
}

// 示例用法
const str3 = "ababcbdsa";
const result3 = findFirstUniqueCharacter(str3);
console.log(result3); // 输出: "c"

const str4 = "abcdefg";
const result4 = findFirstUniqueCharacter(str4);
console.log(result4); // 输出: "a"
