Promise.myAllSettled = (proms) => {
  return new Promise((resolve, reject) => {
    let resolvedCount = 0;
    let count = 0;
    const results = [];
    for (const prom of proms) {
      let i = count;
      count++;
      Promise.resolve(prom)
        .then(
          (data) => {
            resolvedCount++;
            results[i] = {
              status: "fullfilled",
              value: data,
            };
          },
          (reason) => {
            resolvedCount++;
            results[i] = {
              status: "rejected",
              reason,
            };
          }
        )
        .finally(() => {
          if (resolvedCount >= count) {
            resolve(results);
          }
        });
    }
  });
};
// 爬楼梯
let climbStairs = (n) => {
  let p = 0,
    q = 0,
    r = 1;
  for (let i = 1; i <= n; ++i) {
    p = q;
    q = r;
    r = p + q;
  }
  return r;
};
// 快速排序
function sort(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let pivotIndex = Math.floor(arr.length / 2);
  let pivot = arr.splice(pivotIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return sort(left).concat([pivot], sort(right));
}

// this
const name = "123";
const obj = {
  name: "456",
  getName: function () {
    console.log("getName", this.name);
    function printName() {
      console.log("printName", this.name);
    }
    printName();
  },
};
obj.getName();
let obj1 = obj.getName
obj1();
function sync() {
  console.log("sync end"); // 2
}
async function execAsync() {
  await sync();
  console.log("async end"); // 6
}
async function errorFunc() {
  try {
    await Promise.reject("error!!!");
  } catch (e) {
    console.log("error1"); // 3
  }
  return Promise.resolve("errorFunc end"); // 7
}

console.log("script start"); //1
setTimeout(() => {
  console.log("setTimeout 1"); //9
}, 0);
Promise.resolve()
  .then(function () {
    console.log("promise1"); // 5
  })
  .then(function () {
    console.log("promise2"); // 8
  });
execAsync();
errorFunc().then((res) => console.log(res));
console.log("script end"); // 4

/**
 *
 */
