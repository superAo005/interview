// 泛型是 代码用来执行传入的类型 来确定结果
function crateArray<T>(len: number, val: T): T[] {
  let res = [];
  for (let index = 0; index < len; index++) {
    res.push(val);
  }
  return res;
}

let arr1 = crateArray(3, "测试");
// 多个泛型 元祖的切换 [string ,nunber]=[number,string]
const swap = <T, K>(tuple: [T, K]): [K, T] => {
  return [tuple[1], tuple[0]];
};
swap<number, number>([1, 2]);
