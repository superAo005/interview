/**
 * 其函数签名与 useEffect 相同，但它会在所有的 DOM 变更之后同步调用 effect
 * useEffect不会阻塞浏览器渲染，而 useLayoutEffect 会浏览器渲染
 * useEffect会在浏览器渲染结束后执行,useLayoutEffect 则是在 DOM 更新完成后,浏览器绘制之前执行
 */
import React from "react";
import ReactDOM from "react-dom";

let hookStates = [];
let hookIndex = 0;
function useEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let lastDeps = hookStates[hookIndex];
    let same = dependencies.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
    } else {
      hookStates[hookIndex++] = dependencies;
      setTimeout(callback);
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    setTimeout(callback);
  }
}
function useLayoutEffect(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let lastDeps = hookStates[hookIndex];
    let same = dependencies.every((item, index) => item === lastDeps[index]);
    if (same) {
      hookIndex++;
    } else {
      hookStates[hookIndex++] = dependencies;
      queueMicrotask(callback);
    }
  } else {
    hookStates[hookIndex++] = dependencies;
    queueMicrotask(callback);
  }
}
const Animate = () => {
  const red = React.useRef();
  const green = React.useRef();
  useLayoutEffect(() => {
    red.current.style.transform = `translate(500px)`;
    red.current.style.transition = `all 500ms`;
  });
  useEffect(() => {
    green.current.style.transform = `translate(500px)`;
    green.current.style.transition = `all 500ms`;
  });
  let style = { width: "100px", height: "100px" };
  return (
    <div>
      <div style={{ ...style, backgroundColor: "red" }} ref={red}></div>
      <div style={{ ...style, backgroundColor: "green" }} ref={green}></div>
    </div>
  );
};
function render() {
  ReactDOM.render(<Animate />, document.getElementById("root"));
}
render();
