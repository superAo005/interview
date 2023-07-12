//['a','b'],['A','B'],['1','0']，输出['aA1','aA0','aB1','aB0','bA1','bA0','bB1','bB0']，
// 算法的排列组合问题
function permutation(arrays) {
  if (arrays.length === 0) {
    return [];
  }
  if (arrays.length === 1) {
    return arrays[0];
  }
  const result = [];
  const rest = permutation(arrays.slice(1));
  for (const char of arrays[0]) {
    for (const r of rest) {
      result.push(char + r);
    }
  }
  return result;
}

// 示例用法
const arrays = [
  ["a", "b"],
  ["A", "B"],
  ["1", "0"],
];
const result = permutation(arrays);
console.log(result); // 输出: ['aA1', 'aA0', 'aB1', 'aB0', 'bA1', 'bA0', 'bB1', 'bB0']
