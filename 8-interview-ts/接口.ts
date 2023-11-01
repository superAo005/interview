/**
 * 用interface描述**数据结构**，用type描述**类型关系**
 * 相同点
 * 1.都可以描述一个对象或者函数
 * 2. 都允许拓展（extends）但是两者语法不同
 * 不同点
 * type 可以而 interface 不行
 * 1.type 可以声明基本类型别名，联合类型，元组等类型
 * 2.type 语句中还可以使用 typeof 获取实例的 类型进行赋值
 * interface 可以而 type 不行
 * 1 interface 能够声明合并
 * 2 interface 可以被 implements
 */
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
