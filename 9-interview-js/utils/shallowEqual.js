// shallowEqual.js 浅层对比
/** 
 * 
 * @param {*} objA 
 * @param {*} objB 
 * @returns boolean
 * 先判断两者是否为同一对象。
   判断两者的值是否不为object或为null。
   对比两者key的长度。
   判断两者key对应的值是否相同。
   浅层对比就是只会对比前后两次props对象引用是否相同，不会对比对象里面的内容是否相同
   当对比的类型为Object的时候并且key的长度相等的时候，浅比较也仅仅是用Object.is()对Object的value做了一个基本数据类型的比较，所以如果key里面是对象的话，有可能出现比较不符合预期的情况，所以浅比较是不适用于嵌套类型的比较的。
 */
const hasOwn = Object.prototype.hasOwnProperty;
// 修复=== 这两种判断不符合预期的情况
function is(x, y) {
  if (x === y) {
    // 处理为+0 != -0的情况
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // 处理 NaN === NaN的情况
    return x !== x && y !== y;
  }
}
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (let i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

