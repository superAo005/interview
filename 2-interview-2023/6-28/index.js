// 爱数集团面试
const arrayData = [
  { id: 2, title: "中国", parent_id: 0 },
  { id: 3, title: "广东省", parent_id: 2 },
  { id: 4, title: "广州市", parent_id: 3 },
  { id: 5, title: "天河区", parent_id: 4 },
  { id: 6, title: "湖南省", parent_id: 2 },
  { id: 1, title: "俄罗斯", parent_id: 0 },
];
function arrayToTree(arr) {
  const map = {};
  const roots = [];

  // 构建节点映射表
  for (let i = 0; i < arr.length; i++) {
    const node = {
      id: arr[i].id,
      title: arr[i].title,
      children: [],
    };
    map[node.id] = node;
  }

  // 构建树结构
  for (let i = 0; i < arr.length; i++) {
    const node = map[arr[i].id];
    if (arr[i].parent_id) {
      const parent = map[arr[i].parent_id];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
function buildTree(data, parentId = 0) {
  const tree = [];
  data.forEach((node) => {
    if (node.parent_id === parentId) {
      const children = buildTree(data, node.id);
      if (children.length > 0) {
        node.children = children;
      }
      tree.push(node);
    }
  });

  return tree;
}

const treeData = buildTree(arrayData);
const treeData2 = arrayToTree(arrayData);
console.log(treeData2);
