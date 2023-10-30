interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
/**
 * Pick<T, K> 类型用于从T类型中选择部分属性K来构造新的类型。
 * 首先，我们需要遍历对象 T。那就要使用映射类型来遍历
 * keyof T用于从对象类型T中获取键值 key；
   in用于对对象键值key进行迭代；
   Key 就是对象键值 key 本身；
   T[Key]是指定 Key 的值；
 */

type MyPick<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key];
};
/**
不能将类型“Keys”分配给类型“string | number | symbol”。
类型“Key”无法用于索引类型“T”。
这两个错误都与迭代规则有关：
key 可以是string、number、symbol；
如果T中不存在Key，就不能调用T[Key]。
如果规则 2 成立，那么规则 1 一定是成立的，因为现有的 keys 是指定类型之一。为了迭代现有的 key，
我们需要使用extends关键字进行约束。
这样，如果指定不存在的 key，TypeScript 将抛出一个错误，如果T中不存在这个 key，就不能调用T[key]。
**/
// type MappedType<T, Keys> = {
//     [Key in Keys]: T[Key];
//   };
type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
