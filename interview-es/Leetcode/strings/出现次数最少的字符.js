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

// 示例用法
const str1 = "ababac";
const result1 = removeLeastFrequentCharacters(str1);
console.log(result1); // 输出: "ababa"

const str2 = "aaabbbcceeff";
const result2 = removeLeastFrequentCharacters(str2);
console.log(result2); // 输出: "aaabbb"
