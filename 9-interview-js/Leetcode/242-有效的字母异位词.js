/**
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
   注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
 */
//思路：这个题一看字眼，出现次数相同，次数不就是记数吗，记数题型，map走起！
const isAnagram = (s, t) => {
  const sLen = s.length;
  const tLen = t.length;
  if (sLen !== tLen) {
    return false;
  }
  const obj = {};
  for (let i = 0; i < sLen; i++) {
    const currentS = s[i];
    const currentT = t[i];
    obj[currentS] ? obj[currentS]++ : (obj[currentS] = 1);
    obj[currentT] ? obj[currentT]-- : (obj[currentT] = -1);
  }
  return Object.values(obj).every((v) => v === 0);
};
console.log(isAnagram("anagram", "nagaram"));
