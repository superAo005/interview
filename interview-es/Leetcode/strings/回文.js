// 1 判断一段字符是否为回文
const reverseFun = (str) => {
    let normalized = str.toLowerCase().match(/[a-z]/gi).reverse();
    return normalized.join("") === normalized.reverse().join("");
    //  return str == str.split(',').reverse().join('')
  };
  console.log("1-判断一段字符是否为回文---", reverseFun("abba"));
  
  