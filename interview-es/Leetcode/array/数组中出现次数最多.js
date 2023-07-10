// [1,1,2,2,2,1,3,1] => 2 求出数组中出现次数最多的值
function findMostFrequentElement(arr) {
  const counter = {};
  let maxCount = 0;
  let mostFrequentElement;

  for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    if (counter[element]) {
      counter[element]++;
    } else {
      counter[element] = 1;
    }
    if (counter[element] > maxCount) {
      maxCount = counter[element];
      mostFrequentElement = element;
    }
  }

  return mostFrequentElement;
}
