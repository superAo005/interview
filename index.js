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

//二叉树的定义
function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val;
  this.left = left === undefined ? null : left;
  this.right = right === undefined ? null : right;
}

//二叉树的前序遍历 中左右
let fn1 = function (root) {
  //传入根节点
  let res = []; //返回遍历二叉树的数组
  const dfs = function (root) {
    if (!root) return;
    res.push(root.val); //中
    dfs(root.left); //遍历左子树，直到叶子节点 逐层返回
    dfs(root.right); //遍历右子树，直到叶子节点 逐层返回
  };
  dfs(root); //只使用一个参数，使用闭包进行储存结果
  console.log(res);
  return res;
};
//前序遍历  中左右  入栈顺序为 右左中
let fn2 = function (root) {
  let res = []; //存放元素
  if (!root) return res;
  let cur = null;
  const stack = [root]; //初始化栈
  while (stack.length) {
    cur = stack.pop();
    res.push(cur.val); //中
    //短路求值
    cur.right && stack.push(cur.right); //右
    cur.left && stack.push(cur.left); //左
  }
  return res;
};
//二叉树的中序遍历 左中右 与前序遍历相同，位置换一下
let fn3 = function (root) {
  let res = [];
  const dfs = function (root) {
    if (!root) return;
    dfs(root.left);
    res.push(root.val);
    dfs(root.right);
  };
  dfs(root);
  console.log(res);
  return res;
};
//中序遍历 左中右
let fn4 = function (root) {
  //中序遍历  左中右  左节点到叶子节点 然后弹出栈，中节点，然后右节点
  let res = [],
    cur = root;
  const stack = []; //中序遍历时，初始化栈，无数据
  if (!root) return res;
  while (stack.length || cur) {
    if (cur) {
      //一路到左叶子节点
      stack.push(cur);
      cur = cur.left;
    } else {
      //右节点
      cur = stack.pop();
      res.push(cur.val);
      cur = cur.right;
    }
  }
  return res;
};
//二叉树的后序遍历 左右中
let fn5 = function (root) {
  let res = [];
  const dfs = function (root) {
    if (!root) return;
    dfs(root.left);
    dfs(root.right);
    res.push(root.val);
  };
  dfs(root);
  console.log(res);
  return res;
};
//后序遍历 左右中 入栈顺序 中左右 将前序遍历反转reverse或者添加元素至数组时unshift
let fn6 = function (root) {
  let res = []; //存放元素
  if (!root) return res;
  let cur = null;
  const stack = [root]; //初始化栈
  while (stack.length) {
    cur = stack.pop();
    res.push(cur.val); //中
    //短路求值
    cur.left && stack.push(cur.left); //左
    cur.right && stack.push(cur.right); //右
  }
  return res;
};

fn1(root);
