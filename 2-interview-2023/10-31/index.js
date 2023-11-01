let tree = {
  value: "1",
  children: [
    {
      value: "1.1",
      children: [
        {
          value: "1.1.1",
          children: [],
        },
      ],
    },
    {
      value: "1.2",
      children: [
        {
          value: "1.2.1",
          children: [],
        },
        {
          value: "1.2.2",
          children: [],
        },
      ],
    },
  ],
};
// 广度优先遍历
function bfs(tree) {
  const queue = [tree];
  let res = [];
  while (queue.length > 0) {
    const current = queue.shift();
    res.push(current.value);
    if (current.children) {
      for (const child of current.children) {
        queue.push(child);
      }
    }
  }
  return res;
}
// 深度优先遍历
function dfs(tree) {
  let res = [];
  function fn(tree) {
    res.push(tree.value);
    const child = tree.children || [];
    if (child.length > 0) {
      child.forEach((item) => {
        fn(item);
      });
    }
  }
  fn(tree);
  return res;
}
console.log(dfs(tree));
console.log(bfs(tree));
