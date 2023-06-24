import React from "react";
let virtualDOM = (
  <div id="A1" key="A1">
    <div id="B1" key="B1">
      B1
    </div>
    <div id="B2" key="B2">
      B2
    </div>
  </div>
);
function FunctionComponent(props) {
  return virtualDOM;
}
let FunctionComponentVDOM = FunctionComponent(props);

class ClassComponent extends React.Component {
  render() {
    return virtualDOM;
  }
}

let classComponent = new ClassComponent();
let classComponentVDOM = classComponent.render();
///然后渲染classComponentVDOM
let functionVirtualDOM = <FunctionComponent />;
let classVirtualDOM = <ClassComponent />;
//至于在底层是如何绑定，如何给真DOM绑定的，你不会规定

console.log(functionVirtualDOM);
console.log(classVirtualDOM);
//更新的时候可以实现差异化更新，减少更新DOM的操作
//虚拟DOM是不是不快？
/**
 * 
 * let virtualDOM = React.createElement('div',{id:'A1',key:'A1',onClick:()=>console.log('A1')},
  React.createElement('div',{id:'B1',key:'B1'},'<script>B2</script>'),
  React.createElement('div',{id:'B2',key:'B2'},'B2'),
);
 * 在初次渲染的时候，其实并不快
 * 在更新时候，更新的元素内容比较少，它可以实现精准的定量更新，不需把全部的DOM元素删除重添加
 * 虚拟DOM的优势肯定不是更快
 * 1.跨平台
 * 2.增量更新
 * 3.处理兼容性问题。。。。
 */
