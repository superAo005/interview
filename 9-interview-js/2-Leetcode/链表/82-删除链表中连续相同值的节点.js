/**
 * @param {ListNode} head
 * @return {ListNode}
 */
let deleteDuplicates = (head) => {
  // 空指针或者只有一个节点不需要处理
  if (head === null || head.next === null) return head;

  let dummy = new ListNode();
  let oldLinkCurrent = head;
  let newLinkCurrent = dummy;

  while (oldLinkCurrent) {
    let next = oldLinkCurrent.next;
    // 如果当前节点和下一个节点的值相同 就要一直向前直到出现不同的值
    if (next && oldLinkCurrent.val === next.val) {
      while (next && oldLinkCurrent.val === next.val) {
        next = next.next;
      }
      oldLinkCurrent = next;
    } else {
      newLinkCurrent = newLinkCurrent.next = oldLinkCurrent;
      oldLinkCurrent = oldLinkCurrent.next;
    }
  }
  newLinkCurrent.next = null; // 记得结尾置空~
  logList(dummy.next);
  return dummy.next;
};

deleteDuplicates(getListFromArray([1, 2, 3, 3, 4, 4, 5]));
deleteDuplicates(getListFromArray([1, 1, 2, 2, 3, 3, 4, 4, 5]));
deleteDuplicates(getListFromArray([1, 1]));
deleteDuplicates(getListFromArray([1, 2, 2, 3, 3]));
