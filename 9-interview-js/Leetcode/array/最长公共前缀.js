/**
 * @param {string[]} strs
 * @return {string}
 */

const longestCommonPrefix = (strs) => {
  if (strs.length === 0) {
    return "";
  }
  // 先赋初始值，后续不断缩小
  let prefix = strs[0];
  for (let i = 0; i < strs.length; i++) {
    // 对于单层的字符串，不断缩小公共前缀
    // 注意此时要求的.indexOf()不为0，意思就是直到匹配到
    while (strs[i].indexOf(prefix) !== 0) {
      // 缩短字符串,不断缩短
      prefix = prefix.slice(0, prefix.length - 1);
      // prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") {
        return "";
      }
    }
  }
  return prefix;
};
let longestCommonPrefix2 = (strs) => {
  if (strs.length === 0) return "";
  let curr = strs[0];
  for (let str of strs) {
    let temp = "";
    for (
      let i = 0, j = 0, leni = curr.length, lenj = str.length;
      (i < leni) & (j < lenj);
      i++, j++
    ) {
      if (curr[i] !== str[j]) {
        break;
      } else {
        temp += str[j];
      }
    }
    curr = temp;
  }
  return curr;
};
let longestCommonPrefix3 = (strs) => {
  if (strs.length === 0) return "";
  let res = strs.reduce((x, y) => {
    let temp = "";
    for (
      let i = 0, j = 0, leni = x.length, lenj = y.length;
      (i < leni) & (j < lenj);
      i++, j++
    ) {
      if (x[i] === y[j]) {
        temp += x[i];
      } else {
        break;
      }
    }
    return temp;
  });
  return res;
};
let longestCommonPrefix4 = (arr) => {
  if (arr.length) {
    //判断数组是否为空
    let res = ""; //记录公共前缀
    for (let i = 0; i < arr[0].length; i++) {
      let temp = arr[0][i];
      //每个字符串是否都有相同的字符
      if (
        arr.every((el) => {
          return el.charAt(i) == temp;
        })
      ) {
        res += temp; //记录公共前缀
      } else break; //如果返回false，就停止判断，说明不是前缀了
    }
    return res;
  }
  return ""; //说明是空数组
};
/**
 * 先拿前两个比较，求出他们两个的最长公共前缀
 * 然后上面求出的结果去跟第三个元素求最长公共前缀
 * n个元素就一直这么reduce下去
 */
let longestCommonPrefix5 = (strs) => {
  if (strs.length === 0) return "";
  if (strs.length === 1) return strs[0];
  function getSameStr(curr, str) {
    let res = "";
    for (let i = 0; i < curr.length; i++) {
      if (curr[i] === str[i]) {
        res += curr[i];
      } else {
        return res;
      }
    }
    return res;
  }
  return strs.reduce(getSameStr, strs[0]);
};
const strings = ["fluat", "flaat", "fleet"];
const commonPrefix = longestCommonPrefix4(strings);
console.log(commonPrefix); // Output: "fl"
