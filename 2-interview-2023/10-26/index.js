const treeData = [
  {
    name: "1",
    id: "1",
    children: [
      {
        name: "2",
        id: "2",
        children: [
          {
            name: "3",
            id: "3",
          },
          {
            name: "4",
            id: "4",
          },
        ],
      },
      {
        name: "5",
        id: "5",
        children: [
          {
            name: "33",
            id: "33",
          },
          {
            name: "46",
            id: "46",
          },
          {
            name: "55",
            id: "55",
          },
        ],
      },
    ],
  },
];
const res = [
  {
    name: "1",
    id: "1",
    children: [{ name: "5", id: "5", children: [{ name: "55", id: "55" }] }],
  },
];
function filterTree(tree, filterFn) {
  return tree
    .map((node) => {
      const children = node.children
        ? filterTree(node.children, filterFn)
        : undefined;
      return {
        name: node.name,
        id: node.id,
        children: children,
      };
    })
    .filter(
      (node) => filterFn(node) || (node.children && node.children.length > 0)
    );
}

const filteredTreeData = filterTree(
  treeData,
  (node) => node.id === "1" || node.id === "5" || node.id === "55"
);
const searchFromTree = (list, searchKey, hitFn) => {
  const filterFn = (list, searchKeyStr) => {
    const filterResList = list.filter((child) => {
      const hit = child.name.indexOf(searchKeyStr) !== -1;
      if (hit && typeof hitFn === "function") {
        // 查找成功
        hitFn(child);
      }
      if (hit) {
        // 当前节点满足查找条件，直接保留，返回
        return true;
      }
      if (child.children) {
        // 处理子节点裁减
        child.children = filterFn(child.children, searchKeyStr);
      }
      // 只要有子节点，父节点就保留
      const res = child.children && child.children.length;
      return res;
    });
    return filterResList;
  };
  return filterFn(list, searchKey);
};

const hitFn = (node) => {
  console.log(node);
};
function findChildrenById(tree, parentId) {
  function findChildren(node) {
    if (node.id === parentId) {
      return node.children || [];
    }

    if (node.children) {
      for (const child of node.children) {
        const result = findChildren(child);
        if (result) {
          return result;
        }
      }
    }

    return null;
  }
  const children = [];
  for (const rootNode of tree) {
    const result = findChildren(rootNode);
    if (result) {
      children.push(...result);
    }
  }

  return children;
}

const parentId = "5"; // 要查找子节点的 ID
const children = findChildrenById(treeData, parentId);

console.log(children);
