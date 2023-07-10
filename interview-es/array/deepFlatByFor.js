function deepFlatByFor(arr, depth = Infinity) {
  const res = [];
  for (let i = 0; i < arr.length; i++) {
    Array.isArray(arr[i]) && depth > 0
      ? res.push(...deepFlatByFor(arr[i], depth - 1))
      : res.push(arr[i]);
  }

  return res;
}

console.log(deepFlatByFor(sourceData)); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(deepFlatByFor(sourceData, 2)); // [1, 2, 3, 4, 5, [6, 7, 8, [9, 10]]]
const deepFlatByFor2 = (arr, depth = Infinity) => {
  let res = [];
  arr.forEach((item) => {
    Array.isArray(item) && depth > 0
      ? res.push(...deepFlatByFor2(item, depth - 1))
      : res.push(item);
  });
  return res;
};
