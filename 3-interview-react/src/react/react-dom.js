function render(element, container) {
  if (typeof element == "string") {
    return container.appendChild(document.createTextNode(element));
  }
  let type, props;
  type = element.type;
  props = element.props;
  if (type.isReactComponent) {
    //如果为true说明它是一个类组件
    element = new type(props).render();
    type = element.type;
    props = element.props;
  } else if (typeof type == "function") {
    element = type(props);
    type = element.type;
    props = element.props;
  }
  let domElement = document.createElement(type);
  for (let propName in props) {
    if (propName === "children") {
      let children = props[propName];
      children = Array.isArray(children) ? children : [children];
      children.forEach((child) => render(child, domElement));
    } else if (propName === "className") {
      domElement.className = props[propName];
    } else if (propName === "style") {
      let styleObj = props[propName];
      /**
          for(let attr in styleObj){
              domElement.style[attr] =  styleObj[attr];
          }
           */
      let cssText = Object.keys(styleObj)
        .map((attr) => {
          return `${attr.replace(/([A-Z])/g, function () {
            return "-" + arguments[1];
          })}:${styleObj[attr]}`;
        })
        .join(";");
      domElement.style.cssText = cssText;
    } else {
      domElement.setAttribute(propName, props[propName]);
    }
  }
  container.appendChild(domElement);
}
export default { render };
