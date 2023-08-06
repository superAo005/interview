let arr = [12, 5, [10, 11, 14, [15, 17, 18, [19, 20, 30, 4]], 13], 6, 9];
//调用flat方法，数组扁平化
let newArr = arr.flat(Infinity);
//求最大值和下标。
let max = Math.max(...newArr);
let maxindex = newArr.indexOf(max);
console.log(max, maxindex); //最大值30,下标10
//求最小值和下标。
let min = Math.min(...newArr);
let minindex = newArr.indexOf(min);
console.log(min, minindex); //最小值4,下标11



