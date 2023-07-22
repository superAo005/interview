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
function fn1(root) {
  if (root == null) return [];
  const result = [];
  function preorder(root) {
    if (root == null) return;
    result.push(root.val);
    preorder(root.left, result);
    preorder(root.right, result);
  }
  preorder(root);
  console.log(result);
  return result;
}
function fn2(root) {
  const res = [];
  function inorder(root) {
    if (root == null) return;
    inorder(root.left);
    res.push(root.val);
    inorder(root.right);
  }
  inorder(root);
  console.log(res);
  return res;
}
function fn3(root) {
  const res = [];
  function postOrder(root) {
    if (root == null) return;
    postOrder(root.left);
    postOrder(root.right);
    res.push(root.val);
  }
  postOrder(root);
  console.log(res);
  return res;
}
fn1(root);
