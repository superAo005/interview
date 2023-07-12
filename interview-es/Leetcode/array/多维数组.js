// [1, 2, 3, 4, 5, 6, 7, 8, 9] => [[1, 2, 3],[4, 5, 6],[7, 8, 9]]，
//把一个一维数组变成三个三个的二维数组
function convertTo2DArray(arr, chunkSize) {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
}

let inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let outputArray = convertTo2DArray(inputArray, 3);

console.log(outputArray);
