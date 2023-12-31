## 链表 删除链表的一个节点

给定单向链表的头指针和一个要删除的节点的值，定义一个函数删除该节点。
返回删除后的链表的头节点。
示例 1:
输入: head = [4,5,1,9], val = 5
输出: [4,1,9]
解释: 给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.
示例 2:
输入: head = [4,5,1,9], val = 1
输出: [4,5,9]
解释: 给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.
说明：
• 题目保证链表中节点的值互不相同
删除链表中的指定元素，可以进行遍历每一个节点，当当前节点与指定值相同时，使上一个节点直接指向当前节点的下一个节点
此时有两种特殊情况，情况一：要删除的是头节点，此时直接返回头节点的 next;情况二：要删除的是尾节点，将上一个节点直接指向 null
具体步骤可以拆分如下：
• 第一步：判断是不是头节点：如果是直接返回 head.next，如果不是则往下进行
• 第二步：初始化一个变量，等于头节点，用于存储为当前变量；如果存在下一个节点则进行循环
• 判断下一个节点的值是否等于指定值 val,如果是则

```js

function (head, val) {
    if(head.val == val) return head.next;
    let cur = head;
    while(cur.next) {
        if(cur.next.val == val) {
            cur.next = cur.next.next;
            return head;
        }
        cur = cur.next;
    }
}
const removeElements =(head, val)=> {
    if(head==null) return null;
    head.next=removeElements(head.next,val);
    return head.val==val?head.next:head;
}
```

## 合并两个数组对象

## h5 通信 app 原理

## vue mixin

在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，原理类似 “对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行 “合并”。
