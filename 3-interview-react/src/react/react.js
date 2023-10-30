import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
import { Component } from "./ReactBaseClasses";
/**
 *
 * @param {*} type 元素的类型
 * @param {*} config 配置对象
 * @param {*} children 大儿子
 */
const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true,
};
export function createElement(type, config, children) {
  const props = {};
  //key是用来标识每一个稳定的元素的
  let key = null;
  if (config !== null) {
    key = config.key;
  }
  for (let propName in config) {
    if (!RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName];
    }
  }
  const childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    const childArray = Array(childrenLength);
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }
  //React.createElement方法返回是一个普通的JS对象，它可以描述元素样子，它就是所谓的虚拟DOm/
  //虚拟DOM是跨平台，跟平台无关
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    props,
  };
  return element;
}
const React = {
  createElement,
  Component,
};
export default React;
/**
 * children
 * 有可能是一个元素，也有可能是一个字符串，也有可能是一个数字 NULL
 * 有可能有一个儿子，也有可能没有儿子，也有可能有多个儿子
 * props.children = null|string|number|React元素  [ null|string|number|React元素 ]
 * ReactNode ReactElement
 * ReactNode 表示一个可以渲染的值  null|string|number|React元素
 */
