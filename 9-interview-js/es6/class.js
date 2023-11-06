// https://blog.csdn.net/m0_37824255/article/details/124799714
class Person {
  //类的私有属性
  static height = "180cm";
  // 构造函数方法，创建对象时自动调用该方法
  // 可以省略，程序亦可以调用
  constructor(surname, name) {
    // this指的是实例化对象
    this.surname = surname;
    this.name = name;
    return { a: 1 };
  }
  work() {
    console.log("我们会一直跑");
  }
  //实例属性都是挂在prototype
  getName() {
    return this.surname + this.name;
  }
  //实例属性是所有的实例都可以访问的属性，静态属性是只有类本身才能访问的，
  //静态属性通过static关键字来定义，或者直接Person.xxx
  //   static关键字设置的静态属性直接挂在Person类对象上
  static secret() {
    console.log(this.height);
    return "我的秘密是 xxxxxx";
  }
}
class Son extends Person {
  constructor(name, age, sex) {
    super(); //必须先调用super，才能使用constructor，才能使用this对象
    this.name = name;
    this.age = age;
    this.sex = sex;
  }
  getName() {
    // super.getName(); //调用super，才能调用父类同名函数getName
    console.log("我是子级类getName方法输出来的");
  }
}
const p1 = new Person("杨", "奥");
const son1 = new Son('杨','槿年');
son1.getName();
console.log(Person.secret());
console.log(Son.secret());
try {
  p1.secret();
} catch (error) {
  console.log(error);
}
console.dir(Person);
console.log(typeof Person); // function
console.log(Person.prototype.constructor === Person); //true
