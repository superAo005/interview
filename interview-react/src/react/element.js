const ReactElement = function (type, props) {
  const element = {
    type: type,
    props: props,
  };
  return element;
};

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
