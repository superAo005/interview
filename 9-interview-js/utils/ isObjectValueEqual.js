let isObjectValueEqual1 = (a, b) => {
  //取对象a和b的属性名
  let aProps = Object.getOwnPropertyNames(a); //返回指定对象所有自身属性名
  let bProps = Object.getOwnPropertyNames(b);
  //判断属性名的length是否一致
  if (aProps.length != bProps.length) {
    return false;
  }
  //循环取出属性名，再判断属性值是否一致
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];
    if (a[propName] !== b[propName]) {
      return false;
    }
  }
  return true;
};
function isObjectValueEqual2(a, b) {
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    let propA = a[propName];
    let propB = b[propName];
    // 这里忽略了值为undefined的情况
    // 故先判断两边都有相同键名
    if (!b.hasOwnProperty(propName)) return false;
    if (propA instanceof Object) {
      if (this.isObjectValueEqual(propA, propB)) {
        // return true     这里不能return ,后面的对象还没判断
      } else {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    } else {
    }
  }
  return true;
}
function isObjectValueEqual3(a, b) {
  // 判断两个对象是否指向同一内存，指向同一内存返回 true
  if (a === b) return true; // 获取两个对象键值数组
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  // 判断两个对象键值数组长度是否一致，不一致返回 false
  if (aProps.length !== bProps.length) return false; // 遍历对象的键值
  for (let prop in a) {
    // 判断 a 的键值，在 b 中是否存在，不存在，返回 false
    if (b.hasOwnProperty(prop)) {
      // 判断 a 的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回 false
      if (typeof a[prop] === "object") {
        if (!isObjectValueEqual(a[prop], b[prop])) return false;
      } else if (a[prop] !== b[prop]) {
        return false;
      }
    } else {
      return false;
    }
  }
  return true;
}
let obj1 = {
  a: 1,
  b: { c: 2 },
};
let obj2 = {
  b: { c: 3 },
  a: 1,
};
let obj3 = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
let obj4 = {
  id: 1,
  name: 2,
  c: {
    age: 3,
  },
};
