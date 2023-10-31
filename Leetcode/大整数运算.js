//使用BigInt
function sum(a, b) {
  let B_a = BigInt(a);
  let B_b = BigInt(b);
  let res = B_a + B_b;
  return res.toString();
}
//使用正常方法相加
function sum1(a, b) {
  let result = "";
  //判断两个字符串的位数 取大的 短的在前面补0；
  let len = Math.max(a.length, b.length);
  a = a.padStart(len, "0"); //字符串补0
  b = b.padStart(len, "0");
  let curr = 0; //进位的参数 相加大于10
  for (let i = len - 1; i >= 0; i--) {
    const s = +a[i] + +b[i] + curr; //转换成Number相加
    curr = Math.floor(s / 10); //相加之后/10 向下取整 获取进位的数值
    result = (s % 10) + result; // s%10 取余
  }
  if (curr) {
    // 如果第一位相加大于10 ，则在最前面加1
    result = "1" + result;
  }
  return result;
}
function sum2(num1, num2) {
  let res = ""; //存放最后得到的结果
  let maxLength = Math.max(num1.length, num2.length);
  //num1和num2位数对齐，位数较小的前面补0
  num1 = num1.padStart(maxLength, "0");
  num2 = num2.padStart(maxLength, "0");
  let figure = 0; //figure = 两个数字对应位数数值相加 + 进位
  let currentNum = 0; //对应位数的结果
  let carry = 0; //进位
  for (let i = num1.length - 1; i >= 0; i--) {
    figure = parseInt(num1[i]) + parseInt(num2[i]) + carry;
    currentNum = figure % 10;
    carry = Math.floor(figure / 10);
    res = currentNum + res;
  }
  return res;
}
console.log(sum2("12883927392839810", "23793183088791481382380"));
