// 去除字符串中出现次数最少的字符，不改变原字符串的顺序
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
function removeLeastFrequentCharacters(str) {
  const charCount = {};
  let minCount = Infinity;
  // 统计字符出现次数
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
    minCount = Math.min(minCount, charCount[char]);
  }
  // 构建结果字符串
  let result = "";
  for (let char of str) {
    if (charCount[char] !== minCount) {
      result += char;
    }
  }

  return result;
}
const removeLeastFrequentCharacters2 = (str) => {
  let count = {};
  let minCount = Infinity;
  let result = "";
  for (let char of str) {
    count[char] = (count[char] || 0) + 1;
    minCount = Math.min(minCount, count[char]);
  }
  
  for (let char of str) {
    if (count[char] !== minCount) {
      result += char;
    }
  }
  return result;
};
// 示例用法
const str2 = "aaabbbcceeff";
const result2 = removeLeastFrequentCharacters2(str2);
console.log(result2); // 输出: "aaabbb"
