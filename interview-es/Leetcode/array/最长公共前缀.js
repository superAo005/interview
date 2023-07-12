function getCommonPrefix(arr) {
  if (arr.length === 0) {
    return "";
  }
  let prefix = arr[0];
  for (let i = 1; i < arr.length; i++) {
    while (arr[i].indexOf(prefix) !== 0) {
      prefix = prefix.substring(0, prefix.length - 1);
      if (prefix === "") {
        return "";
      }
    }
  }

  return prefix;
}
/**
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix = function (strs) {
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
/**
 * @param {string[]} strs
 * @return {string}
 */
let longestCommonPrefix2 = function (strs) {
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
let longestCommonPrefix3 = function (arr) {
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
const strings = ["fluat", "flaat", "fleet"];
const commonPrefix = getCommonPrefix(strings);
console.log(commonPrefix); // Output: "fl"
