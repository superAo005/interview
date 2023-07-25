let obj = {
  a: 1,
};
let temp1 = obj.a;
let temp2 = obj;
obj.a = 2;
console.log(temp1.a); //undefined
console.log(temp1); //1
console.log(temp2.a); //2
const promise = new Promise((resolve, reject) => {
  console.log(1);
  setTimeout(() => {
    console.log("time begin");
    resolve("succ"); //最后执行
    console.log("time end");
  }, 0);
  console.log(2);
});

promise.then((res) => {
  console.log(res);
});
console.log(4);
// 给出HTML结构，用JS构建出DOM树
const _createElm = (vnode) => {
  //解构 递归
  let { tag, props, text, children } = vnode;
  let dom;
  if (typeof tag === "string") {
    dom = document.createElement(tag);
    for (let prop in props) {
      dom.setAttribute(prop, props[prop]);
    }
    dom.innerText = text;
    if (children.length) {
      children.forEach((child) => dom.appendChild(_createElm(child)));
    }
  } else {
    dom = document.createTextNode(text);
  }
  return dom;
};
// 农夫收蛋，鸡舍间隔大于2 鸡才不会被惊醒
function getArr(arr) {
  let res = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i + 1] - arr[i] > 2) res += arr[i + 1];
  }
  console.log(res);
  return res;
}
getArr([2, 4, 9, 1, 0, 3]);
// 在数组中实现indexOf
Array.prototype.indexOf = function (searchElement, fromIndex) {
  let length = this.length;
  let fi = +fromIndex || 0;
  if (fi > length || length === 0) return -1;
  // 处理传入fromIndex为负数的情况
  fi = fi >= 0 ? fi : length - Math.abs(fi);
  for (let index = fi; index < length; index++) {
    if (this[index] === searchElement) return index;
  }
  return -1;
};
// 数组去重排序
function unique2(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
/**
 * 利用for循环和对象的 key 唯一
 * 时间复杂度是O(n)
 * @param {*} arr
 * @returns
 */
function distinct(arr) {
  let result = [];
  let obj = {};
  for (let i of arr) {
    if (!obj[i]) {
      result.push(i);
      obj[i] = 1;
    }
  }
  return result;
}
// 只含有字母和数组的长度为6到12的正则表达式
let patt = /^\w{6,12}$/; // 表示字符串长度在6-12之间，且必须是字母、数字、下划线组成
let str = "Abcs213214";
console.log(patt.test(str));
