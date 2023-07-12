// 遇到退格字符就删除前面的字符, 遇到两个退格就删除两个字符
// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

function processString(str) {
  const stack = [];
  for (let char of str) {
    if (char !== "<") {
      stack.push(char);
    } else {
      stack.pop();
    }
  }

  return stack.join("");
}

function fn(str1, str2) {
  const processedStr1 = processString(str1);
  const processedStr2 = processString(str2);
  return processedStr1 === processedStr2;
}
