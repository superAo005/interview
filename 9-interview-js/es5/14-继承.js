// 继承 **寄生组合式继承**
function inheritPrototype(subType, superType) {
  // 创建对象，创建父类原型的一个副本
  let prototype = Object.create(superType.prototype);
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  prototype.constructor = subType;
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = prototype;
}
// 测试用例
// 父类初始化实例属性和原型属性
function Father(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
Father.prototype.sayName = function () {
  alert(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(Son, Father);

// 新增子类原型属性
Son.prototype.sayAge = function () {
  alert(this.age);
};

let demo1 = new Son("TianTian", 21);
let demo2 = new Son("TianTianUp", 20);

demo1.colors.push("2"); // ["red", "blue", "green", "2"]
demo2.colors.push("3"); // ["red", "blue", "green", "3"]

// 构造函数
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.firends = ['zhangsan', 'lisi'];
}
Person.prototype = {
//让实例的原型，指向Person构造函数
  // constructor: Person, 
  sayName: function () {
    console.log(this.name);
  }
};
let p1 = new Person('larry', 44, 'male');
let p2 = new Person('terry', 39, 'male');

p1.firends.push('robin');
console.log(p1.firends); // [ 'zhangsan', 'lisi', 'robin' ]
console.log(p2.firends); // [ 'zhangsan', 'lisi' ]
console.log(p1.firends === p2.firends); // false
console.log(p1.sayName === p2.sayName); // true

// 使用Class

class Rectangle {
  // constructor
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
const rectangle = new Rectangle(40, 20);
console.log(rectangle.area);
// 输出 800

// 继承
class Square extends Rectangle {
  constructor(len) {
    // 子类没有this,必须先调用super
    super(len, len);

    // 如果子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    this.name = "SquareIng";
  }

  get area() {
    return this.height * this.width;
  }
}
const square = new Square(20);
console.log(square.area);
