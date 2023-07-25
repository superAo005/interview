// 求斐波那契数列（兔子数列） 1,1,2,3,5,8,13,21,34,55,89...中的第 n 项
let count = 0;
let count2 = 0;
function fn(n) {
  let cache = {};
  function _fn(n) {
    if (cache[n]) {
      return cache[n];
    }
    count++;
    if (n == 1 || n == 2) {
      return 1;
    }
    let prev = _fn(n - 1);
    cache[n - 1] = prev;
    let next = _fn(n - 2);
    cache[n - 2] = next;
    return prev + next;
  }
  return _fn(n);
}
function fn2(n) {
  count2++;
  if (n == 1 || n == 2) {
    return 1;
  }
  return fn2(n - 1) + fn2(n - 2);
}
function fibonacci(n) {
  if (n <= 1) return n;
  let fib = [0, 1]; // 保存斐波那契数列的结果
  for (let i = 2; i <= n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2]; // 计算第i个斐波那契数
  }
  return fib[n];
}

console.log(fn(20), count); // 6765 20
console.log(fn2(20), count2); // 6765 13529
