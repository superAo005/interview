/**
 * 能链集团面试
 * 利用字符重复出现的次数，编写一种方法，实现基本的字符串压缩功能。比如，字符串aabcccccaaa会变为a2bc5a3。
    1.如果只有一个字符，1不用写
    2.字符串中只包含大小写英文字母（a至z）。
    数据范围:
    0<=字符串长度<=50000
    要求：时间复杂度O(N）
 */
function compressString(str) {
  if (str.length <= 1) {
    return str;
  }
  let compressed = "";
  let count = 1;

  for (let i = 1; i < str.length; i++) {
    if (str[i] === str[i - 1]) {
      count++;
    } else {
      compressed += str[i - 1] + (count > 1 ? count : "");
      count = 1;
    }
  }

  // 处理最后一个字符
  compressed += str[str.length - 1] + (count > 1 ? count : "");

  return compressed;
}
