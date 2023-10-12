// Js实现一个函数,判断入参的数据类型
const isType = (val) => {
  return Object.prototype.toString.call(val).slice(8, -1);
};
// 如何手动实现个promise.all
Promise.myall = function (arr) {
  return new Promise((resolve, reject) => {
    if (arr.length === 0) {
      return resolve([]);
    } else {
      let res = [],
        count = 0;
      for (let i = 0; i < arr.length; i++) {
        // 同时也能处理arr数组中非Promise对象
        if (!(arr[i] instanceof Promise)) {
          res[i] = arr[i];
          if (++count === arr.length) resolve(res);
        } else {
          arr[i].then(
            (data) => {
              res[i] = data;
              if (++count === arr.length) resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        }
      }
    }
  });
};

Promise.myrace = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      // 同时也能处理arr数组中非Promise对象
      if (!(arr[i] instanceof Promise)) {
        Promise.resolve(arr[i]).then(resolve, reject);
      } else {
        arr[i].then(resolve, reject);
      }
    }
  });
};
// react的useMemo,useCallback 循环渲染,key的作用
// 事件循环,宏任务和微任务的区别
// hook和vue的computed有什么区别
// 如何避免rerender

// 加一个简单算法，实现 [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14] => [ '1-5', '7-8', '10', '12-14' ]
function formatArray(nums) {
  const result = [];
  let start = nums[0];
  let end = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === end + 1) {
      end = nums[i];
    } else {
      if (start === end) {
        result.push(start.toString());
      } else {
        result.push(`${start}-${end}`);
      }
      start = nums[i];
      end = nums[i];
    }
  }

  if (start === end) {
    result.push(start.toString());
  } else {
    result.push(`${start}-${end}`);
  }

  return result;
}
const nums = [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14];
const formattedArray = formatArray(nums);
console.log(formattedArray);
// hooks都有哪些/怎么用的 虚拟dom原理 taro 相关问题 在项目中使用taro的功能和遇到问题/怎么解决的
// 前端缓存机制- compose实现- ts泛型的使用- react组件性能优化，usecallback、usememo这种
