// 多叉树, 获取每一层的节点之和

const res = layerSum({
  value: 2,
  children: [
    { value: 6, children: [{ value: 1 }] },
    { value: 3, children: [{ value: 2 }, { value: 3 }, { value: 4 }] },
    { value: 5, children: [{ value: 7 }, { value: 8 }] },
  ],
});

console.log(res);
function layerSum(root) {
  if (!root) {
    return [];
  }
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    let levelSum = 0;
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.value;
      if (node.children && node.children.length > 0) {
        queue.push(...node.children);
      }
    }
    result.push(levelSum);
  }

  return result;
}

let preorder = []; // 前序结果
let inorder = []; // 中序结果
let postorder = []; // 后序结果
