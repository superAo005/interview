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

// 1————先序遍历
// 根结点 -> 左子树 -> 右子树
// 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
  // 递归边界，root 为空
  if (!root) {
    return;
  }

  // 输出当前遍历的结点值
  console.log("当前遍历的结点值是：", root.val);
  // 递归遍历左子树
  preorder(root.left);
  // 递归遍历右子树
  preorder(root.right);
}
preorder(root);
// 加一个简单算法，实现 [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14] => [ '1-5', '7-8', '10', '12-14' ]
function formatArray(nums) {
  const result = [];
  let start = nums[0];
  let end = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === end + 1) {
      end = nums[i];
    } else {
      if (start === end) {
        result.push(start.toString());
      } else {
        result.push(`${start}-${end}`);
      }
      start = nums[i];
      end = nums[i];
    }
  }

  if (start === end) {
    result.push(start.toString());
  } else {
    result.push(`${start}-${end}`);
  }

  return result;
}
const nums = [1, 2, 3, 4, 5, 7, 8, 10, 12, 13, 14];
const formattedArray = formatArray(nums);
console.log(formattedArray);
