
// 从排好序的两个链表中，找到相同的节点，并输出链表
function findCommonNodes(list1, list2) {
  const result = [];
  let p1 = list1.head; // 假设链表节点有 head 属性指向头节点
  let p2 = list2.head;
  while (p1 && p2) {
    if (p1.value === p2.value) {
      result.push(p1.value); // 存储相同节点的值
      p1 = p1.next; // 移动指针到下一个节点
      p2 = p2.next;
    } else if (p1.value < p2.value) {
      p1 = p1.next;
    } else {
      p2 = p2.next;
    }
  }

  return result;
}

// 示例用法
const list1 = {
  head: {
    value: 1,
    next: {
      value: 3,
      next: {
        value: 5,
        next: null,
      },
    },
  },
};
const list2 = {
  head: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: {
          value: 5,
          next: null,
        },
      },
    },
  },
};
const commonNodes = findCommonNodes(list1, list2);
console.log(commonNodes); // 输出: [3, 5]
