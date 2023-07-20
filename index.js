const obj1 = {
  fn: () => {
    return this
  }
}
const obj2 = {
  fn: function(){
    return this
  }
}

console.log(obj1.fn());
console.log(obj2.fn());