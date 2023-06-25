# react fiber 架构

## 1 Fiber 之前的协调

React 会递归比对 VirtualDOM 树，找出需要变动的节点，然后同步更新它们。这个过程 React 称为 Reconcilation(协调)
在 Reconcilation 期间，React 会一直占用着浏览器资源，一则会导致用户触发的事件得不到响应, 二则会导致掉帧，用户可能会感觉到卡顿
react 工作过程 当我们通过 render()和 setState() 进行组件渲染和更新的时候，React 主要有两个阶段
调和阶段(Reconciler):React 会自顶向下通过递归，遍历新数据生成新的 Virtual DOM，然后通过 Diff 算法，找到需要变更的元素(Patch)（如果树结构很多，将非常耗时），放到更新队列里面去
渲染阶段(Renderer):遍历更新队列，通过调用宿主环境的 API，实际更新渲染对应元素。宿主环境，比如 DOM、Native、WebGL 等

## 2 Fiber 是什么

1. 我们可以通过某些调度策略合理分配 CPU 资源，从而提高用户的响应速度
2. 通过 Fiber 架构，让自己的 Reconcilation 过程变成可被中断。 适时地让出 CPU 执行权，除了可以让浏览器及时地响应用户的交互

### 2.1Fiber 是一个执行单元

Fiber 是一个执行单元,每次执行完一个执行单元, React 就会检查现在还剩多少时间，如果没有时间就将控制权让出去

### 2.2 Fiber 是一种数据结构

React 目前的做法是使用链表, 每个 VirtualDOM 节点内部表示为一个 Fiber

```js
type Fiber = {
  tag:WorkTag
  //类型
  type: any,
  //父节点
  return: Fiber,
  // 指向第一个子节点
  child: Fiber,
  // 指向下一个弟弟
  sibling: Fiber,
};
```

## 3 Fiber 的主要工作流程

ReactDOM.render() 引导 React 启动或调用 setState() 的时候开始创建或更新 Fiber 树

### 3.1 每次渲染有两个阶段：Reconciliation(协调\render 阶段)和 Commit(提交阶段)

### 3.2 协调阶段: 可以认为是 Diff 阶段, 这个阶段可以被中断, 这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等, 这些变更 React 称之为副作用(Effect)

从根节点开始遍历 Fiber Node Tree， 并且构建 WokeInProgress Tree（reconciliation 阶段）
本阶段可以暂停、终止、和重启，会导致 react 相关生命周期重复执行 将创建的更新任务加入任务队列，等待调度

```js
let rootFiber = require("./element");
//下一个工作单元
let nextUnitOfWork = null;
//render工作循环
function workLoop() {
  while (nextUnitOfWork) {
    //执行一个任务并返回下一个任务
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  //render阶段结束
}
function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    //如果子节点就返回第一个子节点
    return fiber.child;
  }
  while (fiber) {
    //如果没有子节点说明当前节点已经完成了渲染工作
    completeUnitOfWork(fiber); //可以结束此fiber的渲染了
    if (fiber.sibling) {
      //如果它有弟弟就返回弟弟
      return fiber.sibling;
    }
    fiber = fiber.return; //如果没有弟弟让爸爸完成，然后找叔叔
  }
}
function beginWork(fiber) {
  console.log("beginWork", fiber.key);
  //fiber.stateNode = document.createElement(fiber.type);
}
function completeUnitOfWork(fiber) {
  console.log("completeUnitOfWork", fiber.key);
}
nextUnitOfWork = rootFiber;
workLoop();
```

### 3.3 提交阶段: 将上一个阶段计算出来的需要处理的副作用(Effects)一次性执行了。这个阶段必须同步执行，不能被打断

根据 Effect List 更新 DOM （commit 阶段）

```js
let container = document.getElementById("root");
let C1 = { type: "div", key: "C1", props: { id: "C1", children: [] } };
let C2 = { type: "div", key: "C2", props: { id: "C2", children: [] } };
let B1 = { type: "div", key: "B1", props: { id: "B1", children: [C1, C2] } };
let B2 = { type: "div", key: "B2", props: { id: "B2", children: [] } };
let A1 = { type: "div", key: "A1", props: { id: "A1", children: [B1, B2] } };

let nextUnitOfWork = null;
let workInProgressRoot = null;
function workLoop() {
  while (nextUnitOfWork) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (!nextUnitOfWork) {
    //render阶段结束
    commitRoot();
  }
}
function commitRoot() {
  let fiber = workInProgressRoot.firstEffect;
  while (fiber) {
    console.log(fiber.key); //C1 C2 B1 B2 A1
    commitWork(fiber);
    fiber = fiber.nextEffect;
  }
  workInProgressRoot = null;
}
function commitWork(currentFiber) {
  currentFiber.return.stateNode.appendChild(currentFiber.stateNode);
}
function performUnitOfWork(fiber) {
  beginWork(fiber);
  if (fiber.child) {
    return fiber.child;
  }
  while (fiber) {
    completeUnitOfWork(fiber);
    if (fiber.sibling) {
      return fiber.sibling;
    }
    fiber = fiber.return;
  }
}
function beginWork(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = document.createElement(currentFiber.type); //创建真实DOM
    for (let key in currentFiber.props) {
      //循环属性赋赋值给真实DOM
      if (key !== "children" && key !== "key")
        currentFiber.stateNode.setAttribute(key, currentFiber.props[key]);
    }
  }
  let previousFiber;
  currentFiber.props.children.forEach((child, index) => {
    let childFiber = {
      tag: "HOST",
      type: child.type,
      key: child.key,
      props: child.props,
      return: currentFiber,
      effectTag: "PLACEMENT",
      nextEffect: null,
    };
    if (index === 0) {
      currentFiber.child = childFiber;
    } else {
      previousFiber.sibling = childFiber;
    }
    previousFiber = childFiber;
  });
}
function completeUnitOfWork(currentFiber) {
  const returnFiber = currentFiber.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect;
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect;
      }
      returnFiber.lastEffect = currentFiber.lastEffect;
    }

    if (currentFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber;
      } else {
        returnFiber.firstEffect = currentFiber;
      }
      returnFiber.lastEffect = currentFiber;
    }
  }
}
console.log(container);

workInProgressRoot = {
  key: "ROOT",
  stateNode: container,
  props: { children: [A1] },
};
nextUnitOfWork = workInProgressRoot; //从RootFiber开始，到RootFiber结束
workLoop();
```
