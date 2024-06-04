## 
- 编译阶段的优化


react 17 不需要直接导入React了
jsx转译器已经
let element = <div>hello</div>
React.createElement('div');
React17 新的转译器 ;
require('runtime')('div');
把 entry  出入到index。html？
看看index。html
以前模式就是memory吧？
webpack  5  会把 环境传入
一直都有的
不是只是 webpack 5 才有的哦
这些配置用脚手架生成的react 项目默认都配置好的吧，不用再单独配置了吧
按需加载
这个课程大概多久？
感觉讲到链表 会不会都12点了。。。
课件从哪获取哈
webpack这么多特性是怎么记忆的，我感觉我记不住
多写多实战
react用函数组件好一些，还是类组件好一点
怎么实现一个,  动态加载组件,按照传入的组件名称,去自己加载这个组件呢 ?
还有数据状态管理，感觉redux-react太麻烦了
React.lazy 加suspense ？
懒加载是直接将组建单独打包成一个分片吗    然后路由切换的时候去动态加载这个切片？
切这么细好么
我感觉这样切片  配合prefetch 性能会好一点
肯定好, 可以减少首次加载啊时间, 我觉得
lazy是不是也可以写成函数组件 使用useeffect替代componentdidmount
课件和代码会提供吗



用hooks useMemo更形象一点
两个概念
不用Object.is吗
可以直接用 Object.is 把
后边的代码会执行吗？
你们卡不卡？
建议省略这种每个库都有的工具方法，刚才不是引入了lodash
运用了高阶组件的思想
memo这么草率吗
用高阶组件实现memo会导致Ref的丢失？
React.forwardRef()
DomDiff Vs shouldComponentUpdate
每次做对象的深度比较  可能比直接重新渲染还耗性能
基于副本操作的把
forward就行
immutable 应该很消耗内存把
数据不可变的目的是什么
直接 is(obj1, obj2)可以吗？?
源码也是这么写的嘛？写了类似immutable 库中的is?
Use Immer for Writing Immutable Updates
深比较使用栈机构进行比较的?
还是
PureComponent的特点就是浅比较，改成深比较意义就变了，请问下PureComponent到底是怎么写的
用Immer是不也可以
用这个 写法麻烦
这个Map 和 es6的Map数据结构一样吗
useimmer就不麻烦了
是么 还没用过 就是看过课程 各种get set的
可视化工具那个是什么
老师，对比的代码注释，别删除。方便我们对比，深浅比较代码区别。 
tools
这是什么插件 ?
这个火焰图有调用过程吗
这是什么插件?
immutable 的is 方法是深比较吗？能比较对象吗？
明哥哥:immutable 的is 方法是深比较吗？能比较对象吗？


useSelector有记忆功能吗？
这个是不是对应的 useSelector
useSelector应该只是单纯的返回statE
react fiber ?
什么时候停止调用
这个violation是哪个插件提示的？
fiber不就是这样的吗
 fiber是自己实现了一套requestIdleCallback
 MessageChannel 基于宏任务实现的
react16不是已经实现了这套吗，为什么还会卡顿
react16 17 异步模式到现在也没有发布
时间片什么时候执行完成
老师用的react是什么版本的
如果是 5w 条数据怎么写？
requestIdleCallback 浏览器不兼容
mode 不是 concurrent， 17 版本也需要使用 concurrent 模式
react.render是默认模式