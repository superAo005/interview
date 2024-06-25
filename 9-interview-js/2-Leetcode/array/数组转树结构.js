// 数组转树结构 如果要在树中新增节点或者删除节点, 函数应该怎么扩展
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
