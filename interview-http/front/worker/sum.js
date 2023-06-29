let total = 0;
for (let i = 0; i < 1000 * 10000; i++) {
  total += i;
}
console.log(process.pid)
console.log(total);