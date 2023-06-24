##  前端加载优化
做性能优化的目的
1 首屏时间
2 首次可交互时间
3 首次有意义内容渲染
页面性能检测
1 只请求当前需要的资源
异步加载 懒加载 polylill
2 缩减资源体积
打包压缩 webpack
gzip
图片格式的优化 压缩 根据不同分辨率展示不同分辨率的图片 webp
尽量控制cookie的大小 requst header 
3 时序优化
js promise.all
ssr 缓存
prefetch  prerender preload
<link rel='dns-prefetch' href=''>
4 合理利用缓存
 cdn预热 cdn刷新(大流量) 业务域名 douyin.com  cdn-douyin.com
2 如果一端js执行时间过长 怎么去分析
装饰器

## es6基础
闭包 事件循环 函数柯里化 节流和防抖 作用域 模块化和组件化

### 原型链 继承 
js 是基于原型的语言
所有的引用类型（数组、对象、函数），都具有对象特性，即可自由扩展属性（null除外）
所有的引用类型（数组、对象、函数），都有一个__proto__属性，属性值是一个普通的对象
所有的引用类型（数组、对象、函数），__proto__属性值指向它的构造函数的prototype属性值
所有的函数，都有一个prototype属性，属性值也是一个普通的对象
当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的__proto__（即它的构造函数的prototype）中寻找

```js
// 要点一：自由扩展属性
let obj = {}; obj.a = 100;
let arr = []; arr.a = 100;
function fn () {}
fn.a = 100;

// 要点二：__proto__
console.log(obj.__proto__);
console.log(arr.__proto__);
console.log(fn.__proto__);

// 要点三：函数有 prototype
console.log(fn.prototype)

// 要点四：引用类型的 __proto__ 属性值指向它的构造函数的 prototype 属性值
console.log(obj.__proto__ === Object.prototype) 
```
### 基本数据类型 原始类型
Boolean string Number null undefined Symbol
## 数据结构&算法 &设计模式
1 链表和二叉树的遍历 熟悉
2 发布订阅模式 观察者模式
3 常见排序算法 熟悉
```js
// 遍历二叉树
// 先序遍历: 根节点 -> 左子树 -> 右子树
// 中序遍历: 左子树 -> 根节点 -> 右子树
// 后序遍历: 左子树 -> 右子树 -> 根节点
const root = {
  val: "A",
  left: {
    val: "B",
    left: {
      val: "D"
    },
    right: {
      val: "E"
    }
  },
  right: {
    val: "C",
    right: {
      val: "F"
    }
  }
};

// 1————先序遍历
// 根结点 -> 左子树 -> 右子树
// 所有遍历函数的入参都是树的根结点对象
function preorder(root) {
  // 递归边界，root 为空
  if(!root) {
      return 
  }
   
  // 输出当前遍历的结点值
  console.log('当前遍历的结点值是：', root.val)  
  // 递归遍历左子树 
  preorder(root.left)  
  // 递归遍历右子树  
  preorder(root.right)
}
preorder(root)
```

## react和vue
1 setState更新原理 彻底理解
2 事件机制
3 Fiber了解
4 Redux 精通
5 reactHooks

## webpack和vite
1 webpack打包原理和热更新原理
2 loader和plugins区别  最好自己动手写几个
3 Babel原理 AST熟悉 

## https
1 Dns解析 
2 http三次握手和四次握手
3 https加密过程 中间劫持
## 浏览器缓存 cookie
1 了解cookie 怎么操作ccokie
