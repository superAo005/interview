const ReactElement = function (type, props) {
  const element = {
    type: type,
    props: props,
  };
  return element;
};
/**
 * 
 * @param {*} type 用于标识节点的类型。它可以是类似“h1”“div”这样的标准 HTML 标签字符串，也可以是 React 组件类型或 React fragment 类型。
 * @param {*} config 以对象形式传入，组件所有的属性都会以键值对的形式存储在 config 对象中
 * @param {*} children 以对象形式传入，它记录的是组件标签之间嵌套的内容，也就是所谓的“子节点”“子元素”
 * @returns 最后会 return 一个针对 ReactElement 的调用
 * createElement 中并没有十分复杂的涉及算法或真实 DOM 的逻辑，它的每一个步骤几乎都是在格式化数据。
 */
function createElement(type, config, children) {
  let propName;
  const props = {};
  for (propName in config) {
    props[propName] = config[propName];
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    props.children = Array.prototype.slice.call(arguments, 2);
  }
  return ReactElement(type, props);
}
export default createElement;
