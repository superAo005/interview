# 2023面试总结
## 1 数组转树结构 如果要在树中新增节点或者删除节点, 函数应该怎么扩展

```js
const arr = [
  {
    id: 2,
    name: "部门B",
    parentId: 0,
  },
  {
    id: 3,
    name: "部门C",
    parentId: 1,
  },
  {
    id: 1,
    name: "部门A",
    parentId: 2,
  },
  {
    id: 4,
    name: "部门D",
    parentId: 1,
  },
  {
    id: 5,
    name: "部门E",
    parentId: 2,
  },
  {
    id: 6,
    name: "部门F",
    parentId: 3,
  },
  {
    id: 7,
    name: "部门G",
    parentId: 2,
  },
  {
    id: 8,
    name: "部门H",
    parentId: 4,
  },
];
function arrayToTree(arr) {
  const map = {};
  const roots = [];

  // 构建节点映射表
  for (let i = 0; i < arr.length; i++) {
    const node = {
      id: arr[i].id,
      name: arr[i].name,
      children: [],
    };
    map[node.id] = node;
  }

  // 构建树结构
  for (let i = 0; i < arr.length; i++) {
    const node = map[arr[i].id];
    if (arr[i].parentId) {
      const parent = map[arr[i].parentId];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

// 添加节点
function addNode(tree, parentId, newNode) {
  const node = {
    id: newNode.id,
    name: newNode.name,
    children: [],
  };

  if (parentId === null) {
    tree.push(node);
  } else {
    const parent = findNode(tree, parentId);
    if (parent) {
      parent.children.push(node);
    }
  }
}

// 删除节点
function removeNode(tree, nodeId) {
  const parent = findParentNode(tree, nodeId);
  if (parent) {
    const index = parent.children.findIndex((child) => child.id === nodeId);
    if (index !== -1) {
      parent.children.splice(index, 1);
    }
  }
}

// 辅助函数：查找节点
function findNode(tree, nodeId) {
  for (let i = 0; i < tree.length; i++) {
    if (tree[i].id === nodeId) {
      return tree[i];
    }
    const found = findNode(tree[i].children, nodeId);
    if (found) {
      return found;
    }
  }
  return null;
}

// 辅助函数：查找父节点
function findParentNode(tree, nodeId) {
  for (let i = 0; i < tree.length; i++) {
    const children = tree[i].children;
    for (let j = 0; j < children.length; j++) {
      if (children[j].id === nodeId) {
        return tree[i];
      }
      const found = findParentNode(children[j].children, nodeId);
      if (found) {
        return found;
      }
    }
  }
  return null;
}
```

## 2 去除字符串中出现次数最少的字符，不改变原字符串的顺序

```js
// “ababac” —— “ababa”
// “aaabbbcceeff” —— “aaabbb”
```

## 3 给一个字符串, 找到第一个不重复的字符

```js
// ababcbdsa
// abcdefg
```

## 实现 compose 函数, 类似于 koa 的中间件洋葱模型

```js
// 题目需求

let middleware = [];
middleware.push((next) => {
  console.log(1);
  next();
  console.log(1.1);
});
middleware.push((next) => {
  console.log(2);
  next();
  console.log(2.1);
});
middleware.push((next) => {
  console.log(3);
  next();
  console.log(3.1);
});

let fn = compose(middleware);
fn();

/*
1
2
3
3.1
2.1
1.1
*/

//实现compose函数
function compose(middlewares) {}
```

## 遇到退格字符就删除前面的字符, 遇到两个退格就删除两个字符

```js
// 比较含有退格的字符串，"<-"代表退格键，"<"和"-"均为正常字符
// 输入："a<-b<-", "c<-d<-"，结果：true，解释：都为""
// 输入："<-<-ab<-", "<-<-<-<-a"，结果：true，解释：都为"a"
// 输入："<-<ab<-c", "<<-<a<-<-c"，结果：false，解释："<ac" !== "c"

function fn(str1, str2) {}
```

## 多叉树, 获取每一层的节点之和

```js
function layerSum(root) {}

const res = layerSum({
  value: 2,
  children: [
    { value: 6, children: [{ value: 1 }] },
    { value: 3, children: [{ value: 2 }, { value: 3 }, { value: 4 }] },
    { value: 5, children: [{ value: 7 }, { value: 8 }] },
  ],
});

console.log(res);
```

### 二叉树层序遍历, 每层的节点放到一个数组里

```js
// 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
// 例如：
// 给定的二叉树是{3,9,20,#,#,15,7},
// 该二叉树层序遍历的结果是[[3],[9,20],[15,7]]
```
