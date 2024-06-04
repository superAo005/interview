import React from "react";
import { PureComponent, memo } from "./utils";
import { Map } from "immutable";
/**
 * shouldComponentUpdate来优化我们的项目
 * PureComponent React.memo immutable 可视化工具
 */
export default class App extends React.Component {
  constructor() {
    super();
    this.state = { count: Map({ number: 0 }) };
  }
  add = (amount) => {
    let count = this.state.count.set(
      "number",
      this.state.count.get("number") + amount
    );
    this.setState({ count });
  };
  render() {
    console.log("App render");
    return (
      <div>
        <button onClick={() => this.add(1)}>+1</button>
        <button onClick={() => this.add(0)}>+0</button>
        <Counter number={this.state.count.get("number")} />
      </div>
    );
  }
}
//只要属性不更新，不需要重新渲染
class Counter extends PureComponent {
  render() {
    console.log("Counter render");
    return <p>Counter:{this.props.number}</p>;
  }
}

/**
 * Map 不可变数据
 * 每次操作都会返回一个不同的对象，引用地址
 * 但是会尽可以复用老的属性。另外可以非常快速进行深度比较
 */
