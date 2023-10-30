import { setInitialProperties } from "../../utils";
let style = { border: "1px solid red", color: "red", margin: "5px" };
// 虚拟dom
let A = {
  type: "div",
  key: "A",
  props: {
    style,
    children: [
      "A文本",
      { type: "div", key: "B1", props: { style, children: "B1文本" } },
      { type: "div", key: "B2", props: { style, children: "B2文本" } },
    ],
  },
};
let workInProgress; //当前正在处理的fiber
const TAG_ROOT = "TAG_ROOT";
const TAG_TEXT = "TAG_TEXT";
const TAG_HOST = "TAG_HOST";
const Placement = "Placement";
// 创建根fiber节点
let rootFiber = {
  tag: TAG_ROOT,
  key: "ROOT",
  stateNode: document.getElementById("root"),
  props: { children: [A] },
};

workInProgress = rootFiber;
workLoop();
function workLoop() {
  while (workInProgress) {
    workInProgress = performUnitOfWork(workInProgress);
  }
  console.log(rootFiber);
  commitRoot(rootFiber);
}
function commitRoot(rootFiber) {
  let currentEffect = rootFiber.firstEffect;
  while (currentEffect) {
    let flags = currentEffect.flags;
    switch (flags) {
      case Placement:
        commitPlacement(currentEffect);
        break;
    }
    currentEffect = currentEffect.nextEffect;
  }
}
function commitPlacement(currentFiber) {
  let parent = currentFiber.return.stateNode;
  parent.appendChild(currentFiber.stateNode);
}

/**
 *
 * @param {*} fiber
 * @returns
 */
// 开始工作单元
function performUnitOfWork(fiber) {
  beginWork(fiber); // 构建子fiber树
  //   让父Fiber.child=大儿子.sibling=二儿子.sibling.=三儿子
  if (fiber.child) {
    //如果子节点就返回第一个子节点
    return fiber.child;
  }
  //如果没有子节点说明当前节点已经完成了渲染工作
  while (fiber) {
    completeUnitOfWork(fiber); //可以结束此fiber的渲染了
    // 如果没有儿子 接着构建弟弟
    if (fiber.sibling) {
      //如果它有弟弟就返回弟弟
      return fiber.sibling;
    }
    fiber = fiber.return; //如果没有弟弟让爸爸完成，然后找叔叔
    // 如果没有父亲 全部结束了
  }
}
// fiber在结构的时候创建真实的dom 创建副作用域链 链表的合作过程
// effect副作用表示对一个dom操作 dom更新插入 删除 没有变化的节点不会
function completeUnitOfWork(workInProgress) {
  console.log("completeUnitOfWork", workInProgress.key);
  let stateNode;
  switch (workInProgress.tag) {
    case TAG_HOST:
      stateNode = createStateNode(workInProgress);
      // 绘制样式
      setInitialProperties(stateNode, workInProgress.props);
      break;
    case TAG_TEXT:
      createStateNode(workInProgress);
      break;
  }
  // 在完成工作单元的时候 判断当前的fiber节点有没有对应的dom操作
  makeEffectList(workInProgress);
}
function createStateNode(fiber) {
  if (fiber.tag === TAG_TEXT) {
    let stateNode = document.createTextNode(fiber.props);
    fiber.stateNode = stateNode;
  } else if (fiber.tag === TAG_HOST) {
    let stateNode = document.createElement(fiber.type);
    if (typeof fiber.props.children === "string") {
      stateNode.appendChild(document.createTextNode(fiber.props.children));
    }
    fiber.stateNode = stateNode;
  }
  return fiber.stateNode;
}
// effectlist副作用链 不包含所有的fiber节点 而是包含有副作用的fiber节点 对于初次渲染
// 向上回溯的过程
function makeEffectList(completedWork) {
  const returnFiber = completedWork.return;
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      //父亲为空就指向儿子的子链表
      returnFiber.firstEffect = completedWork.firstEffect;
    }
    if (completedWork.lastEffect) {
      //父亲非空就父亲老尾下一个指向儿子子链表头,父亲尾指出儿子子链表头
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = completedWork.firstEffect;
      }
      returnFiber.lastEffect = completedWork.lastEffect; //父亲的尾指向自己的尾
    }
    if (completedWork.flags) {
      if (returnFiber.lastEffect) {
        //如果父亲有尾，尾巴下一个指向自己
        returnFiber.lastEffect.nextEffect = completedWork;
      } else {
        //如果父亲没有尾，父亲的头毛都指向自己
        returnFiber.firstEffect = completedWork;
      }
      returnFiber.lastEffect = completedWork;
    }
  }
}

/**
 * 根据当前的fiber和子JSX构建子fiber树
 * @param {*} fiber
 * @returns
 */
function beginWork(fiber) {
  console.log("beginWork", fiber.key);
  let nextChildren = fiber.props.children;
  if (typeof nextChildren === "string") {
    nextChildren = null;
  }
  return reconcileChildren(fiber, nextChildren);
}
// 根据父fiber和子虚拟dom数组 构建当前returnFiber的子fiber树
function reconcileChildren(returnFiber, nextChildren) {
  let firstChild = null;
  let previousNewFiber = null;
  let newChildren = [];
  if (Array.isArray(nextChildren)) {
    newChildren = nextChildren;
  } else if (!!nextChildren) {
    newChildren = [nextChildren];
  }
  for (let newIdx = 0; newIdx < newChildren.length; newIdx++) {
    let newFiber = createFiber(newChildren[newIdx]);
    newFiber.return = returnFiber;
    newFiber.flags = Placement;
    if (!previousNewFiber) {
      firstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  returnFiber.child = firstChild;
  return firstChild;
}
function createFiber(element) {
  if (typeof element === "string") {
    return { tag: TAG_TEXT, type: element.type, key: element, props: element };
  } else {
    return {
      tag: TAG_HOST,
      type: element.type,
      key: element.key,
      props: element.props,
    };
  }
}
