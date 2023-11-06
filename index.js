class Person {
  constructor(x, y) {
    this.text = new Number(1);
    this.x = x;
    this.y = y;
    this.getText = () => {
      console.log(this.text);
    };
  }

  toString() {
    console.log(`${this.x}, ${this.y}`);
  }
}

const test1 = new Person("x", "y"),
  test2 = new Person("x2", "y2");

console.log(test1.getText()); // Number {1}
console.log(test2.getText()); // Number {1}
console.log(test1.x, test1.y); // x  y
console.log(test2.x, test2.y); // x2  y2

// console.log(test1.text === test2.text)  // false
// console.log(test1.getText === test2.getText)  // false

test1.text = "测试";

console.log(test1.getText()); // 测试
console.log(test2.getText()); // Number {1}

test1.toString(); // x, y
test2.toString(); // x2, y2

test1.hasOwnProperty("x"); // true
test1.hasOwnProperty("y"); // true
test1.hasOwnProperty("getText"); // true
test1.hasOwnProperty("toString"); // false
test1.__proto__.hasOwnProperty("toString"); // true

// 类的实例共享同一个原型对象
console.log(test1.__proto__ === test2.__proto__); // true

// 也可以使用ES6提供的 Object.getPrototypeOf 来获取prototype
const test1Prototype = Object.getPrototypeOf(test1);
test1.myName = "共享字段";

// test2 中也是能获取到
console.log(test2.myName); // 共享字段
