// 1 判断一段字符是否为回文
const reverseFun = (str) => {
  let normalized = str.toLowerCase().match(/[a-z]/gi).reverse();
  return normalized.join("") === normalized.reverse().join("");
  //  return str == str.split(',').reverse().join('')
};
console.log("1-判断一段字符是否为回文---", reverseFun("abba"));
function compressString(str) {
  let compressed = "";
  let count = 1;
  for (let i = 0; i < str.length; i++) {
    // 检查下一个字符是否与当前字符相同
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      // 当下一个字符与当前字符不相同时，将当前字符及其出现次数添加到压缩字符串中
      compressed += count + str[i];
      count = 1;
    }
  }

  return compressed;
}
