
function fn1(matrix, k) {
  if (k > matrix.length * matrix[0].length) {
    return -1; // 如果k大于矩阵中元素的数量，返回-1
  }
  let row = 0;
  let col = matrix[0].length - 1;
  let count = 1;
  while (row < matrix.length - 1 && col >= 0) {
    if (matrix[row][col] > matrix[row + 1][col - 1]) {
      // 如果当前元素大于其右下角的元素，说明第k小的元素在右下角
      col--;
    } else {
      // 否则，第k小的元素在左上角
      row++;
    }
    count++;
    if (count === k) {
      return matrix[row][col]; // 找到第k小的元素
    }
  }
  return -1; // 没找到第k小的元素，返回-1
}
const m = [[1,5,9],[10,11,13],[12,13,15]] 
const k = 8
console.log(fn1(m, k));
