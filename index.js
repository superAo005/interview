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

// 辅助函数：查找父节点
function findParentNode(tree, nodeId) {
  for (let i = 0; i < tree.length; i++) {
    const children = tree[i]?.children || [];
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
console.log(findParentNode(treeData, "55"));