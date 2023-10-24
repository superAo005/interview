function run(str) {
  let count = 0;
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
const input = "aabcccccaaad";
const compressedString = run(input);
console.log(compressedString);
