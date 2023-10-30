/**
 * 反转链表
 * 输入: 1->2->3->4->5->NULL
 * 输出: 5->4->3->2->1->NULL
 */
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}
const head = new ListNode(1);
let current = head;
for (let i = 2; i <= 5; i++) {
  current.next = new ListNode(i);
  current = current.next;
}
console.log("head-----" + head);
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
function printListFromTailToHead(head) {
  let arr = [];
  let start = head;
  while (start) {
    arr.push(start.val);
    start = start.next;
  }
  return arr.reverse();
}
const reverseList = (head) => {
  let cur = head; // 正向链表的头指针
  let pre = null; // 反向链表的头指针
  while (cur) {
    const temp = cur.next; // 暂存当前节点的后续节点，用于更新正向链表
    cur.next = pre; // 将当前节点指向反向链表，这是一个建立反向链接的过程
    pre = cur; // 更新反向链表的头指针为当前已处理的节点，反向链表的该轮构建完成
    cur = temp; // 将正向链表头指针替换为暂存的节点，正向链表处理完成，开始下一轮处理
  }
  return pre;
};
console.log(reverseList(head));
