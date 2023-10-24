// 计算数组深度
function getArrayDepth(array) {
  let depth = 1;
  if (Array.isArray(array)) {
    array.forEach(function (element) {
      if (Array.isArray(element)) {
        let nestedDepth = getArrayDepth(element) + 1;
        if (nestedDepth > depth) {
          depth = nestedDepth;
        }
      }
    });
  }
  return depth;
}
function getArrayDepth(arr) {
  let maxDepth = 1;
  function dfs(array, currentDepth) {
    if (Array.isArray(array)) {
      for (let i = 0; i < array.length; i++) {
        maxDepth = Math.max(maxDepth, currentDepth);
        dfs(array[i], currentDepth + 1);
      }
    }
  }

  dfs(arr, 1);
  return maxDepth;
}
// 示例用法
const arr1 = [1, [2, [3, 4]], [1, 2]];
const depth = getArrayDepth(arr1);
// console.log(depth); // 输出 3
