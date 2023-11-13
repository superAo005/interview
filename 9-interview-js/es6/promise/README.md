## [手写promise](https://juejin.cn/post/7259647015604863013)
## [手写promise源码](https://juejin.cn/post/6850037281206566919)

```js
// es5模拟Promise
function Promise(fn) {
  fn(
    (data) => {
      this.success(data);
    },
    (error) => {
      this.error();
    }
  );
}

Promise.prototype.resolve = function (data) {
  this.success(data);
};

Promise.prototype.reject = function (error) {
  this.error(error);
};

Promise.prototype.then = function (success, error) {
  this.success = success;
  this.error = error;
};
class Promise {
  constructor(fn) {
    fn(
      (data) => {
        this.success(data);
      },
      (error) => {
        this.error();
      }
    );
  }

  resolve(data) {
    this.success(data);
  }

  reject(error) {
    this.error(error);
  }

  then(success, error) {
    this.success = success;
    this.error = error;
    console.log(this);
  }
}
```