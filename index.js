function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  this.firends = ['zhangsan', 'lisi'];
}
Person.prototype = {
//让实例的原型，指向Person构造函数
  constructor: Person, 
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