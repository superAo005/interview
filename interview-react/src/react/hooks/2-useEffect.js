import React from "react";
import ReactDOM from "react-dom";

let hookStates = [];
let hookIndex = 0;
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState;
    render();
  }
  return [hookStates[hookIndex++], setState];
}

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

function Counter() {
  const [name, setName] = useState("superao");
  const [number, setNumber] = useState(0);
  useEffect(() => {
    console.log(number);
  }, [number]);
  return (
    <>
      <p>
        {name}:{number}
      </p>
      <button onClick={() => setName("架构")}>修改名称</button>
      <button onClick={() => setNumber(number + 1)}>+</button>
    </>
  );
}
function render() {
  hookIndex = 0;
  ReactDOM.render(<Counter />, document.getElementById("root"));
}
render();
