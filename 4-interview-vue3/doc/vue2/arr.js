// defineProperty本身是可以监控到数组下标的变化的，
// 只是Vue 从通过对性能/体验的性价比考虑放弃了这个特性
const arr = ["a", "b", "c", "d"];
function defineReactive(data, key) {
  Object.defineProperty(data, key, {
    get: function () {
      console.log("key:" + key);
    },
    set: function (value) {
      console.log("value:" + value);
    },
  });
}
function Observe(data) {
  Object.keys(data).forEach(function (key) {
    defineReactive(data, key, data[key]);
  });
}
Observe(arr);

arr[1];
arr[2] = "3";
