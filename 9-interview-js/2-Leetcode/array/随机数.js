let json = {};
let arr = [];
// while (arr.length < 10) {
//   let k = Math.round(Math.random() * 100);
//   if (!json[k]) {
//     json[k] = true;
//     arr.push(k);
//   }
// }
// function random(len, start, end) {
//   let arr = [];
//   function _inner(start, end) {
//     let span = end - start;
//     return parseInt(Math.random() * span + start);
//   }
//   while (arr.length < len) {
//     let num = _inner(start, end);
//     if (arr.indexOf(num) == -1) {
//       arr.push(num);
//     }
//   }
//   arr.sort();
//   console.log(arr);
//   return arr;
// }
// random(10, 0, 100);


// 生成两个数之间的随机数
// 表示生成 n~m+n 之间的随机数
// 语法: Math.random() * m + n
// 范围：n ~ m+n
Math.random() * 10 + 8; // 8 ~ 18
// 语法: Math.floor(Math.random() * (m - n)) + n
// 范围：n ~ m
// 生成 n~m 之间的随机整数（包括n与m）
Math.floor(Math.random() * (8 - 100)) + 100; // 8~100
for (let i = 0; i < 100; i += 10) {
  let num = Math.floor(Math.random() * 10 + i);
  arr.push(num);
}
console.log(arr);
