## es6 基础

闭包 事件循环 函数柯里化 节流和防抖 作用域 模块化和组件化

### 基本数据类型 原始类型

Boolean string Number null undefined Symbol

## 数据结构&算法 &设计模式

1 链表和二叉树的遍历 熟悉
2 发布订阅模式 观察者模式
3 常见排序算法 熟悉

```js
// 遍历二叉树
// 先序遍历: 根节点 -> 左子树 -> 右子树
// 中序遍历: 左子树 -> 根节点 -> 右子树
// 后序遍历: 左子树 -> 右子树 -> 根节点
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D",
    },
    right: {
      val: "E",
    },
  },
  right: {
    val: "C",
    right: {
      val: "F",
    },
  },
};

// 1————先序遍历
// 根结点 -> 左子树 -> 右子树
// 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
  // 递归边界，root 为空
  if (!root) {
    return;
  }

  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
  // 递归遍历左子树
  preorder(root.left);
  // 递归遍历右子树
  preorder(root.right);
}
preorder(root);
```

## react 和 vue

1 setState 更新原理 彻底理解
2 事件机制
3 Fiber 了解
4 Redux 精通
5 reactHooks

## webpack 和 vite

1 webpack 打包原理和热更新原理
2 loader 和 plugins 区别 最好自己动手写几个
3 Babel 原理 AST 熟悉

## https

1 Dns 解析
2 http 三次握手和四次握手
3 https 加密过程 中间劫持

## 浏览器缓存 cookie

1 了解 cookie 怎么操作 ccokie
