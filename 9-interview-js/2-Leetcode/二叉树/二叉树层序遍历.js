// 二叉树层序遍历, 每层的节点放到一个数组里
// 给定一个二叉树，返回该二叉树层序遍历的结果，（从左到右，一层一层地遍历）
// 例如：
// 给定的二叉树是{3,9,20,#,#,15,7},
// 该二叉树层序遍历的结果是[[3],[9,20],[15,7]]
function levelOrder(root) {
  if (!root) {
    return [];
  }
  const result = [];
  const queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    result.push(currentLevel);
  }
  return result;
}
levelOrder(root);
/**
 * 层序遍历
 */
function fn7(root) {
  if (!root) return false;
  let res = [];
  let arr = [root];
  while (arr.length) {
    let p = arr.shift();
    res.push(p.val);
    if (p.left) arr.push(p.left);
    if (p.right) arr.push(p.right);
  }
  return res;
}
function fn8(root) {
  if (!root) return [];
  let res = [];
  let arr = [root];
  while (arr.length) {
    let len = arr.length;
    let st = [];
    while (len--) {
      let p = arr.shift();
      st.push(p.val);
      if (p.left) arr.push(p.left);
      if (p.right) arr.push(p.right);
    }
    res.push(st);
  }
  return res;
}
function fn9(root) {
  if (!root) return [];
  let res = [];
  let arr = [root];
  while (arr.length) {
    let len = arr.length;
    let st = [];
    while (len--) {
      let p = arr.shift();
      st.push(p.val);
      if (p.left) arr.push(p.left);
      if (p.right) arr.push(p.right);
    }
    res.unshift(st);
  }
  return res;
}