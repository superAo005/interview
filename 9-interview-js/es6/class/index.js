class Person {
  static staticText = "staticText";
  #private = "private";

  static staticMethods1(person) {
    console.log("staticMethods1", this);
    person.#privateMethods();
  }

  #privateMethods() {
    console.log("#privateMethods", this);
  }
}

// 使用表达式格式 也是可以使用 extends 继承
const Child = class extends Person {
  methods() {
    console.log("methods", Child.staticText);
  }
};

const a = new Child();

a.methods(); // output: methods staticText

Child.staticMethods1(a);
// output: staticMethods1  class Child {}
// output: #privateMethods Child {}

Person.staticMethods1(a);
// output: staticMethods1  class Person {}
// output: #privateMethods Child {}
