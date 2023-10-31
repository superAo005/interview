// JS判断两个对象内容是否相等

const isObjectValueEqual = (a, b) => {
  let aProps = Object.getOwnPropertyNames(a);
  let bProps = Object.getOwnPropertyNames(b);
  if (aProps.length != bProps.length) {
    return false;
  }
  for (let i = 0; i < aProps.length; i++) {
    let propName = aProps[i];

    let propA = a[propName];
    let propB = b[propName];
    if (typeof propA === "object") {
      if (this.isObjectValueEqual(propA, propB)) {
        // return true 这个注释掉就OK了
      } else {
        return false;
      }
    } else if (propA !== propB) {
      return false;
    } else {
    }
  }
  return true;
};
// 深度对比两个对象是否完全相等
const deepCompare = (x, y) => {
  let i, l, leftChain, rightChain;

  function compare2Objects(x, y) {
    let p;

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (
      isNaN(x) &&
      isNaN(y) &&
      typeof x === "number" &&
      typeof y === "number"
    ) {
      return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (x === y) {
      return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
      (typeof x === "function" && typeof y === "function") ||
      (x instanceof Date && y instanceof Date) ||
      (x instanceof RegExp && y instanceof RegExp) ||
      (x instanceof String && y instanceof String) ||
      (x instanceof Number && y instanceof Number)
    ) {
      return x.toString() === y.toString();
    }

    // At last checking prototypes as good as we can
    if (!(x instanceof Object && y instanceof Object)) {
      return false;
    }

    if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
      return false;
    }

    if (x.constructor !== y.constructor) {
      return false;
    }

    if (x.prototype !== y.prototype) {
      return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
      return false;
    }

    // Quick checking of one object being a subset of another.
    // todo: cache the structure of arguments[0] for performance
    for (p in y) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }
    }

    for (p in x) {
      if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
        return false;
      } else if (typeof y[p] !== typeof x[p]) {
        return false;
      }

      switch (typeof x[p]) {
        case "object":
        case "function":
          leftChain.push(x);
          rightChain.push(y);

          if (!compare2Objects(x[p], y[p])) {
            return false;
          }

          leftChain.pop();
          rightChain.pop();
          break;

        default:
          if (x[p] !== y[p]) {
            return false;
          }
          break;
      }
    }

    return true;
  }

  if (arguments.length < 1) {
    return true; //Die silently? Don't know how to handle such case, please help...
    // throw "Need two or more arguments to compare";
  }

  for (i = 1, l = arguments.length; i < l; i++) {
    leftChain = []; //Todo: this can be cached
    rightChain = [];

    if (!compare2Objects(arguments[0], arguments[i])) {
      return false;
    }
  }

  return true;
};
// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
  // 定义一个变量
  let result;
  // 如果当前需要深拷贝的是一个对象的话
  if (typeof target === "object") {
    // 如果是一个数组的话
    if (Array.isArray(target)) {
      result = []; // 将result赋值为一个数组，并且执行遍历
      for (let i in target) {
        // 递归克隆数组中的每一项
        result.push(deepClone(target[i]));
      }
      // 判断如果当前的值是null的话；直接赋值为null
    } else if (target === null) {
      result = null;
      // 判断如果当前的值是一个RegExp对象的话，直接赋值
    } else if (target.constructor === RegExp) {
      result = target;
    } else {
      // 否则是普通对象，直接for in循环，递归赋值对象的所有值
      result = {};
      for (let i in target) {
        result[i] = deepClone(target[i]);
      }
    }
    // 如果不是对象的话，就是基本数据类型，那么直接赋值
  } else {
    result = target;
  }
  // 返回最终结果
  return result;
}
function deepClone2(obj) {
  if (obj === null) return null;
  if (obj instanceof RegExp) return new RegExp(obj);
  if (obj instanceof Date) return new Date(obj);
  if (typeof obj !== "object") {
    return obj;
  }
  let t = new obj.constructor();
  for (let key in obj) {
    t[key] = deepClone(obj[key]);
  }
  return t;
}
// 数字2位转换
function toDouble(num) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}
// 数字位数，只获取整数位
function getNumBit(num) {
  let intNum = num.toFixed(0);
  return intNum.length;
}
// 动态加载js
function loadApi(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "";
    script.src = src;
    script.async = "async";
    document.head.appendChild(script);

    script.onload = () => {
      resolve();
    };
    script.onerror = () => {
      reject();
    };
  });
}
// 动态加载css
function loadCss(src) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = src;
    document.head.appendChild(link);
  });
}
// 对象取值
function getVal(obj, path, returnedVal = "") {
  if (!path) return returnedVal;
  const pathArr = path.split(".");
  let current = obj;
  for (let i = 0, l = pathArr.length; i < l; i++) {
    if (!current) break;
    const prop = pathArr[i];
    current = current[prop];
  }
  if (current || current === 0) {
    return current;
  } else {
    return returnedVal;
  }
}

// 通过属性值冒泡排序
function bubbleSortByProp(arr, prop) {
  let i = arr.length - 1;
  while (i > 0) {
    let maxIndex = 0;
    for (let j = 0; j < i; j++) {
      if (arr[j][prop] > arr[j + 1][prop]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        maxIndex = j;
      }
    }
    i = maxIndex;
  }
  return arr;
}
// 按照属性值把数组分类
function arrClassifyByProp(arr, prop) {
  let result = {};
  arr.forEach((item) => {
    const key = item[prop];
    if (result[key]) {
      result[key].push(item);
    } else {
      result[key] = [item];
    }
  });
  return result;
}
// 通过属性值查找数组某一项
function findArrItemByPropVal(arr, prop, val) {
  let result = null;
  for (let i = 0, l = arr.length; i < l; i++) {
    if (arr[i][prop] === val) {
      result = arr[i];
      break;
    }
  }
  return result;
}
// 获取指定月份天数
function getDateByMon(year, month) {
  let d = new Date(year, month, 0);
  return d.getDate();
}
// 判断时间是不是今天
function isTodayDate(time) {
  if (time.toDateString() === new Date().toDateString()) {
    return true;
  } else {
    return false;
  }
}
// 对象判空
function isObjEmpty(obj) {
  if (obj && obj.constructor === Object) {
    return Object.keys(obj).length;
  }
  if (obj && obj.constructor === Array) {
    return obj.length;
  }
}
// 扁平化对象数组
function flatObjArr(obj) {
  let result = [];
  Object.keys(obj).forEach((key) => {
    const list = obj[key];
    result = result.concat(list);
  });
  return result;
}
// 数组对象属性值转换映射对象 (参数 'a:b' [{a: c, b: d}] --> {c: d})
function arrPropValToMap(arr, format) {
  const pArr = format.split(":");
  const p1 = pArr[0];
  const p2 = pArr[1];
  let res = {};
  for (let i = 0, l = arr.length; i < l; i++) {
    let v1 = arr[i][p1];
    let v2 = arr[i][p2];
    result[v1] = result[v2];
  }
  return res;
}
// 首字母大写
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
// 过滤值为空字符串或者为null的参数
function getQuery(query) {
  let res = {};
  for (let [key, val] of Object.entries(query)) {
    if (typeof val === "string") {
      if (!val.trim() || val === "null") continue;
    } else {
      if (val === null || val === undefined) continue;
    }
    res[key] = val;
  }
  return res;
}

function isImage(fileName) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return (
    name.endsWith(".png") ||
    name.endsWith(".jpeg") ||
    name.endsWith(".jpg") ||
    name.endsWith(".png") ||
    name.endsWith(".bmp")
  );
}

function isH5Video(fileName) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return (
    name.endsWith(".mp4") || name.endsWith(".webm") || name.endsWith(".ogg")
  );
}
function isPdf(fileName) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return name.endsWith(".pdf");
}

function isWord(fileName) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return name.endsWith(".doc") || name.endsWith(".docx");
}

function isExcel(fileName) {
  if (typeof fileName !== "string") return;
  let name = fileName.toLowerCase();
  return name.endsWith(".xlsx") || name.endsWith(".xls");
}

const sStorage = {
  set(key, val) {
    let valStr = JSON.stringify(val);
    if (sessionStorage !== null) {
      sessionStorage.setItem(key, valStr);
    }
  },
  get(key) {
    if (sessionStorage !== null) {
      let valStr = sessionStorage.getItem(key);
      return JSON.parse(valStr);
    } else {
      return null;
    }
  },
  clear() {
    if (sessionStorage !== null) {
      sessionStorage.clear();
    }
  },
};

const lStorage = {
  set(key, val) {
    let valStr = JSON.stringify(val);
    if (localStorage !== null) {
      localStorage.setItem(key, valStr);
    }
  },
  get(key) {
    if (localStorage !== null) {
      let valStr = localStorage.getItem(key);
      return JSON.parse(valStr);
    } else {
      return null;
    }
  },
  clear() {
    if (localStorage !== null) {
      localStorage.clear();
    }
  },
};

function openFullScreen(dom) {
  let el = dom,
    rfs =
      el.requestFullScreen ||
      el.webkitRequestFullScreen ||
      el.mozRequestFullScreen ||
      el.msRequestFullScreen,
    wscript;

  if (typeof rfs !== "undefined" && rfs) {
    rfs.call(el);
    return;
  }

  if (typeof window.ActiveXObject !== "undefined") {
    wscript = new ActiveXObject("WScript.Shell");
    if (wscript) {
      wscript.SendKeys("{F11}");
    }
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
// 将多维数组转化为一维
const newArr = function (arr) {
  return arr.reduce(
    (pre, cur) => pre.concat(Array.isArray(cur) ? newArr(cur) : cur),
    []
  );
};
// 输入一个值，返回其数据类型
const type = (para) => {
  return Object.prototype.toString.call(para);
};
function typeOf(obj) {
  let res = Object.prototype.toString.call(obj).split(" ")[1];
  res = res.substring(0, res.length - 1).toLowerCase();
  return res;
}
// 深拷贝
// 第一版:
function initRem() {
  const meta = document.querySelector('meta[name="viewport"]');;
  const html = document.documentElement;
  const cliW = html.clientWidth;
  const dpr = window.devicePixelRatio || 1;
  meta.setAttribute('name', 'viewport');
  meta.setAttribute(
      'content',
      `width=${cliW * dpr}, initial-scale=${1 /
          dpr} ,maximum-scale=${1 / dpr}, minimum-scale=${1 /
          dpr},user-scalable=no`
  );
  html.setAttribute('data-dpr', dpr);
  // 这样计算的好处是，你可以直接用ui的px/100得到的就是rem大小，方便快捷，无需mixin
  html.style.fontSize = 10 / 75 * cliW * dpr + 'px';
}
initRem();
window.onresize = window.onorientationchange = initRem();
