// 1 判断一段字符是否为回文
const reverseFun = (str) => {
  let normalized = str.toLowerCase().match(/[a-z]/gi).reverse();
  return normalized.join("") === normalized.reverse().join("");
  //  return str == str.split(',').reverse().join('')
};
const reverseFun2 = (str) => {
  let i = 0,
    j = str.length - 1;
  while (i < j) {
    if (str[i] !== str[j]) {
      return false;
    }
    i++;
    j--;
  }
  return true;
};
console.log("1-判断一段字符是否为回文---", reverseFun2("a bba"));