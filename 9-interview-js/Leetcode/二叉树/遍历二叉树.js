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
      left: {
        val: "H",
      },
      right: {
        val: "G",
      },
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
// 二叉树节点的构造函数
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

// 1————先序遍历
// 根结点 -> 左子树 -> 右子树
// 所有遍历函数的入参都是树的根结点对象
// 递归
function fn1(root) {
  if (root == null) return [];
  const result = [];
  function preorder(root) {
    if (root == null) return;
    result.push(root.val);
    preorder(root.left);
    preorder(root.right);
  }
  preorder(root);
  return result;
}
// 非递归
function fn2(root) {
  const res = [];
  const stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    const n = stack.pop();
    res.push(n.val);
    if (n.right) stack.push(n.right);
    if (n.left) stack.push(n.left);
  }
  return res;
}
/**
 * 中序遍历（左根右）
 */
function fn3(root) {
  const res = [];
  function inorder(root) {
    if (root == null) return;
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root);
  return res;
}
function fn4(root) {
  const stack = [];
  const result = [];
  while (root || stack.length > 0) {
    // 先把当前节点的左节点入栈，及root.left，root.left.left，......
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop();
    result.push(root.val);
    root = root.right;
  }
  return result;
}
/**
 * 后序遍历（左右根）
 */
function fn5(root) {
  const res = [];
  function postOrder(root) {
    if (root == null) return;
    postOrder(root.left);
    postOrder(root.right);
    res.push(root.val);
  }
  postOrder(root);
  return res;
}
function fn6(root) {
  if (!root) return [];
  const arr = [root];
  const res = [];
  while (arr.length) {
    const n = arr.pop();
    res.unshift(n.val);
    n.left && arr.push(n.left);
    n.right && arr.push(n.right);
  }
  return res;
}

//二叉树的前序遍历 中左右
let preorderTraversal = function (root) {
  //传入根节点
  let res = []; //返回遍历二叉树的数组
  const dfs = function (root) {
    if (root === null) return;
    res.push(root.val); //中
    dfs(root.left); //遍历左子树，直到叶子节点 逐层返回
    dfs(root.right); //遍历右子树，直到叶子节点 逐层返回
  };
  dfs(root); //只使用一个参数，使用闭包进行储存结果
  return res;
};

//二叉树的中序遍历 左中右 与前序遍历相同，位置换一下
let inorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) return;
    dfs(root.left);
    res.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  return res;
};

//二叉树的后序遍历 左右中
let postorderTraversal = function (root) {
  let res = [];
  const dfs = function (root) {
    if (root === null) return;
    dfs(root.left);
    dfs(root.right);
    res.push(root.val);
  };
  dfs(root);
  return res;
};
console.log("递归-----" + fn5(root));
console.log("非递归---" + fn6(root));
