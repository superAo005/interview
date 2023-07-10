function compressString(str) {
  if (str.lenth <= 1) {
    return str;
  }
  let count = 1;
  let res = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      res += str[i] + (count > 1 ? count : "");
      count = 1;
    }
  }
  return res;
}
const input = "aabcccccaaa";
const compressedString = compressString(input);
console.log(compressedString);

// 实现injectFn
function add(a, b, cb) {
  let c = a + b;
  setTimeout(() => {
    cb(c);
  }, 1000);
}

function injectFn(fn) {
  return (...args) => {
    return new Promise((resolve) => {
      fn(...args, (result) => {
        resolve(result);
      });
    });
  };
}
let promise1 = injectFn(add);
promise1(1, 2).then((res) => console.log(res)); // 输出 3
promise1(3, 4).then((res) => console.log(res)); // 输出 7