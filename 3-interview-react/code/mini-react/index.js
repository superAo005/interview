import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import useTimes from "./components/hooks/useInterval";
import useInterval from "./components/hooks/useInterval2";
/**
 * 因为实例是同一个，状态对象也是同一个，如果是类组件的话，this.state永远是最新的值
 */

class PureComponent extends React.Component {
  shouldComponentUpdate(newProps, newState) {
    //如果新旧属性对象浅比较后不相等或者说如果新旧状态对象浅比较后不相等，那就返回true
    return (
      !shallowEqual(this.props, newProps) || !shallowEqual(this.state, newState)
    );
  }
}
let obj1 = { name: { id: 1 } };
let obj2 = { name: { id: 2 } };
// 深比较的话性能比较差了
// 又想实现深比较的效果，又想性能好，就得靠 immutablejs immer
function shallowEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }
  if (
    typeof obj1 != "object" ||
    obj1 === null ||
    typeof obj1 != "object" ||
    obj1 === null
  ) {
    return false;
  }
  let keys1 = Object.keys(obj1);
  let keys2 = Object.keys(obj2);
  if (keys1.length != keys2.length) {
    return false;
  }
  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
class ClassComponent extends PureComponent {
  state = { number: 0 };
  handleClick = (event) => {
    this.setState({ number: this.state.number + 1 });
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}

//如果是一个函数组件，如何跳过不必要的更新 React.memo
function FunctionComponent(props) {
  const [count, setCount] = useState(0);
  let number = useTimes(60);
  useInterval(() => {
    setCount(count + 1);
  }, 1000);
  console.log(number); //取的永远都 最新的值
  return (
    <>
      <h2>{props.name}</h2>
      <p>{count}</p>
      <p>{number}</p>
    </>
  );
}
let MemoFunctionComponent = React.memo(FunctionComponent);
class App extends React.Component {
  state = { number: 0, list: new Array(10000).fill(0) };
  handleClick = (event) => {
    this.setState({
      number: this.state.number + 1,
      list: [...this.state.list, 1],
    });
  };
  click() {
    console.log(this); //undefined
  }
  render() {
    return (
      <div>
        <input></input>
        <button onClick={this.handleClick}>+</button>
        <p>{this.state.number}</p>
        <MemoFunctionComponent name="superao" />
        {this.state.list.map((item, i) => {
          return <li key={i}>{item}</li>;
        })}
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
// ReactDOM.unstable_createRoot(root).render(<App />);

/**
 * 类组件复用逻辑一般用HOC 高阶组件
 * 1.写起来麻烦
 * 2.容易出BUG
 * 3.继承静态属性还需要额外处理
 * 4.如果复用的逻辑太多的，多层嵌套。非常复杂，可读性差
 *
 * 不如react hooks 自定义HOOK
 * 函数状态，更方便并发渲染，方便暂停和恢复
 */
