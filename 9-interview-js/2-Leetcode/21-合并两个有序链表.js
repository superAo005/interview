// 链表定义函数
class ListNode {
  constructor(val, next = null) {
    this.val = val === undefined ? 0 : val;
    this.next = next;
  }
}
const mergeTwoLists = (l1, l2) => {
  const dummpy = (node = new ListNode());
  while (l1 && l2) {
    if (l1.val >= l2.val) {
      node.next = l2;
      node = node.next;
      l2 = l2.next;
    } else {
      node.next = l1;
      node = node.next;
      l1 = l1.next;
    }
  }
  node.next = l1 || l2;
  return dummpy.next;
};
console.log(mergeTwoLists([], []));
