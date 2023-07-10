const arr = [
  {
    id: 2,
    name: "部门B",
    parentId: 0,
  },
  {
    id: 3,
    name: "部门C",
    parentId: 1,
  },
  {
    id: 1,
    name: "部门A",
    parentId: 2,
  },
  {
    id: 4,
    name: "部门D",
    parentId: 1,
  },
  {
    id: 5,
    name: "部门E",
    parentId: 2,
  },
  {
    id: 6,
    name: "部门F",
    parentId: 3,
  },
  {
    id: 7,
    name: "部门G",
    parentId: 2,
  },
  {
    id: 8,
    name: "部门H",
    parentId: 4,
  },
];
const arrayToTree = (arr) => {
  let roots = [];
  let map = {};
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    const node = {
      id: ele.id,
      name: ele.name,
      children: [],
    };
    map[node.id] = node;
  }
  for (let i = 0; i < arr.length; i++) {
    const node = map[arr[i].id];
    if (arr[i].parentId) {
      const parent = map[arr[i].parentId];
      parent.children.push(node);
    }
    roots.push(node);
  }
  return roots;
};
// console.log(arrayToTree(arr));
Array.prototype.forEach = function forEach(cb, context = window) {
  let self = this;
  let len = self.length;
  for (let i = 0; i < len; i++) {
    typeof cb === "function" ? cb.call(context, self[i], i) : null;
  }
};
