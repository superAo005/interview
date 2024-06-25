class Node {
  constructor(item) {
    this.item = item;
    this.next = null;
  }
}

class Linked {
  constructor() {
    this.size = 0;
    this.head = null;
  }

  add(item) {
    let node = new Node(item);
    if (this.head === null) {
      this.head = node;
    } else {
      let current = this.getNode(this.size - 1);
      current.next = node;
    }
    this.size++;
  }

  //追加插入
  insert(position, item) {
    //下标值越位判断
    if (position < 0 || position > this.size) {
      throw new Error("Position out range");
    }
    //创建新节点
    let node = new Node(item);
    //头部追加
    //如果插入下标为0则直接将head指向新创建的节点
    if (position === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      //中间追加
      let prevNode = this.getNode(position - 1);
      //将插入下标的指向域指向插入下标的上一个节点的指向指向域(下一个节点)
      node.next = prevNode.next;
      //将插入下标的上一个节点的指向域，指向当前节点
      prevNode.next = node;
    }
    //插入成功，长度加一
    this.size++;
  }

  delete(position) {
    //删除下标合法判断
    if (position < 0 || position >= this.size) {
      throw new Error("position out range");
    }
    //获取当前链表（head）
    let linkList = this.head;
    //如果删除的是链表的第一个元素则将head指向第一个元素的指针域（下一个元素）
    if (position === 0) {
      this.head = linkList.next;
    } else {
      //中间删除
      //获取删除元素的上一个节点
      let prevNode = this.getNode(position - 1);
      //将链表指向被删除元素上一个节点
      linkList = prevNode.next;
      //将链表的的上一个节点指向被删除元素的下一个节点
      prevNode.next = linkList.next;
    }
    //长度减一
    this.size--;
  }
  //查找指定元素下标
  findIndex(item) {
    //获取当前链表
    let current = this.head;
    //进行遍历操作依次比对获取查找元素下标
    for (let i = 0; i < this.size; i++) {
      if (current.item === item) {
        //如果current.item === item则说明该元素为需要查找的元素，返回下标
        return i;
      }
      //使聊表指向他的下一个元素，使循环可以继续
      current = current.next;
    }
    return null;
  }
  getNode(index) {
    if (index < 0 || index >= this.size) {
      throw new Error("out range");
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
  //修改操作
  //position为需要修改元素的下标,item为修改的值
  update(position, item) {
    let current = this.getNode(position);
    current.item = item;
  }
}
