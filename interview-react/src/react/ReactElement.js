import { REACT_ELEMENT_TYPE } from "./ReactSymbols";
const RESERVED_PROPS = {
  key: true,
  ref: true,
  _store: true,
  __self: true,
  __source: true,
};
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

  const element = {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    props,
  };
  return element;
}