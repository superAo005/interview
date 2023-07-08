import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
const RESERVED_PROPS = {
  key: true,
  ref: true,
  _store: true,
  __self: true,
  __source: true,
};
/**
 * 处理了浏览器兼容性问题，避免用户操作真实 DOM，那么又麻烦又容易出错
   内容经过了 XSS 处理，可以防范 XSS 攻击
   容易实现跨平台开发 Android、iOS、VR 应用
   更新的时候可以实现差异化更新，减少更新 DOM 的操作
 * @param {*} type 
 * @param {*} config 
 * @param {*} children 
 * @returns 
 * createElement函数所返回的就是一个虚拟 DOM 虚拟 DOM 就是一个描述真实 DOM 的纯 JS 对象
 */
export function createElement(type, config, children) {
  const props = {};
  let key = null;
  if (config != null) {
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
  //
  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    props,
  };
  return element;
}
