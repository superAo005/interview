const list = {
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
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

const removeNthFromEnd = (head, n) => {
  let slow = (slowCopy = fast = new ListNode());
  slow.next = head;
  while (n--) {
    fast = fast.next;
  }
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return slowCopy.next;
};
console.log(removeNthFromEnd(list.head, 2));
