/**
 * 类相当于实例的原型， 所有在类中定义的方法， 都会被实例继承。 如果在一个方法前， 加上static关键字， 就表示该方法不会被实例继承， 而是直接通过类来调用， 这就称为“ 静态方法”
 */
class Foo {
  static classMethod() {
    return "hello";
  }
}
class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + ", too";
  }
}
Foo.classMethod(); // 'hello'
let foo = new Foo();
foo.classMethod();
// TypeError: foo.classMethod is not a function

Bar.classMethod();
