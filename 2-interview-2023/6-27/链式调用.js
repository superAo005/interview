// 链式调用
class Res {
  constructor() {
    this.wait = Promise.resolve();
  }
  print(val) {
    this.wait.then(() => {
      console.log(val);
    });
    return this;
  }
  timer(time) {
    this.wait = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, time);
    });
    return this;
  }
}
const res = new Res();
console.log(res.print(1).timer(1000).print(2).timer(5000).print(3));
