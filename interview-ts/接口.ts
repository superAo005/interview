interface Ischool {
  readonly name: String;
  age: Number;
  adress: String;
}
// 接口可以扩展
interface IsuperAo extends Ischool {
  type: string;
  [key: string]: any;
}
let school: Ischool = {
  name: "测试",
  age: 13,
  adress: "河南",
};
// 类型断言 表示这个对象就是这个类型
let superAo: Ischool = {
  ...school,
  type: "super",
  phone: "13122024207",
} as Ischool;
// 函数主要关心参数和返回值
function sum1(a: string, b: string): string {
  return a + b;
}
type Sum = ((a: number, b: number) => number) | string;
sum1("1", "2");
