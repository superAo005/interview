class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
function insertionSortList(head) {
  if (!head || !head.next) {
    return head;
  }
  let dummy = new ListNode(0); // 创建一个哑节点作为排序链表的头部
  let current = head;
  while (current) {
    let previous = dummy;
    while (previous.next && previous.next.value < current.value) {
      previous = previous.next;
    }
    let nextNode = current.next;
    current.next = previous.next;
    previous.next = current;
    current = nextNode;
  }

  return dummy.next;
}
console.log(insertionSortList());
