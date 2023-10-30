import React from "react";
import ReactDOM from "react-dom";
let hookStates = []; //放着此组件的所有的hooks数据
let hookIndex = 0; //代表当前的hooks的索引
function useState(initialState) {
  //如果有老值取老值,没有取默认值
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  //暂存索引
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    render();
  }
  // 返回数组 好结构
  return [hookStates[hookIndex++], setState];
}
function useCallback(callback, dependencies) {
  if (hookStates[hookIndex]) {
    let [lastCallback, lastCallbackDeps] = hookStates[hookIndex];
    let same = dependencies.every(
      (item, index) => item === lastCallbackDeps[index]
    );
    if (same) {
      //如果老依赖和新的依赖都相同,则直接返回老的,如果不一相同,则返回新的
      hookIndex++;
      return lastCallback;
    } else {
      hookStates[hookIndex++] = [callback, dependencies];
      return callback;
    }
  } else {
    hookStates[hookIndex++] = [callback, dependencies];
    return callback;
  }
}

function useMemo(factory, dependencies) {
  if (hookStates[hookIndex]) {
    let [memo, lastDeps] = hookStates[hookIndex];
    let same = dependencies.every((item, index) => item === lastDeps[index]);
    if (same) {
      //如果老依赖和新的依赖都相同,则直接返回老的,如果不一相同,则返回新的
      hookIndex++;
      return memo;
    } else {
      let newMemo = factory();
      hookStates[hookIndex++] = [newMemo, dependencies];
      return newMemo;
    }
  } else {
    let newMemo = factory();
    hookStates[hookIndex++] = [newMemo, dependencies];
    return newMemo;
  }
}

let Child = ({ onButtonClick, data }) => {
  console.log("Child render");
  return <button onClick={onButtonClick}>{data.number}</button>;
};
Child = React.memo(Child);

function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("zhufeng");
  const addClick = useCallback(() => setNumber(number + 1), [number]);
  const data = useMemo(() => ({ number }), [number]);
  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Child onButtonClick={addClick} data={data} />
    </div>
  );
}
function render() {
  hookIndex = 0;
  ReactDOM.render(<App />, document.getElementById("root"));
}
render();
