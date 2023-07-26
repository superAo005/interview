/**
 * 它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法
 */
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
function useReducer(reducer, initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function dispatch(action) {
    hookStates[currentIndex] = reducer(hookStates[currentIndex], action);
    render();
  }
  return [hookStates[hookIndex++], dispatch];
}
const reducer = (state = 0, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    default:
      return state;
  }
};
function Counter() {
  const [number1, setNumber1] = useState(0);
  const [number2, dispatch] = useReducer(reducer, 0);
  return (
    <>
      <p>{number1}</p>
      <button onClick={() => setNumber1(number1 + 1)}>+</button>
      <hr />
      <p>{number2}</p>
      <button onClick={() => dispatch({ type: "add" })}>+</button>
    </>
  );
}
function render() {
  hookIndex = 0;
  ReactDOM.render(<Counter />, document.getElementById("root"));
}
render();
