## 2023-6-13 中通快递面试

### https 和 hhtp 加密原理

内容加密：采用混合加密技术，中间者无法直接查看明文内容。
验证身份：通过证书认证客户端访问的是自己的服务器。
保护数据完整性：防止传输的内容被中间人冒充或者篡改

### react fiber

### 浏览器缓存 强缓存和协商缓存

### react dom-diff

diff 算法即差异查找算法，对于 DOM 结构即为 tree 的差异查找算法，只有在 React 更新阶段才会有 Diff 算法的运用；react 的 diff 运算为了降低时间复杂度，是按层比较新旧两个虚拟 dom 树的。diff 运算的主要流程见下：
1、tree diff : 新旧两棵 dom 树，逐层对比的过程就是 tree diff, 当整棵 DOM 树逐层对比完毕，则所有需要被按需更新的元素，必然能够被找到。
2、component diff ： 在进行 tree diff 的时候，每一层中，都有自己的组件，组件级别的对比，叫做 component diff。如果对比前后，组件的类型相同，则暂时认为此组件不需要更新；如果对比前后，组件的类型不同，则需要移除旧组件，创建新组件，并渲染到页面上。
React 只会匹配类型相同的组件，也就是说如果<A>被<B>替换，那么 React 将直接删除 A 组件然后创建一个 B 组件；如果某组件 A 转移到同层 B 组件上，那么这个 A 组件会先被销毁，然后在 B 组件下重新生成，以 A 为根节点的树整个都被重新创建，这会比较耗费性能，但实际上我们很少跨层移动 dom 节点，一般都是同层横向移动；
3、element diff ：在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比，这叫做 element diff。
对于列表渲染，react 会在创建时要求为每一项输入一个独一无二的 key，这样就能进行高效的 diff 运算了。比如我们要在 b 和 c 节点中间插入一个节点 f，jquery 会将 f 这个节点后面的每一个节点都进行更新，比如 c 更新成 f，d 更新成 c，e 更新成 d，这样操作的话就会特别多，而加了 key 的 react 咋不会频繁操作 dom，而是优先采用移动的方式，找到正确的位置去插入新节点；所以我们不能省略 key 值，因为在对比两个新旧的子元素是，是通过 key 值来精确地判断两个节点是否为同一个，如果没有 key 的话则是见到谁就更新谁，非常耗费性能。
当我们通过 this.setState()改变数据的时候，React 会将其标记为脏节点，在事件循环的最后才会重新渲染所有的脏节点以及脏节点的子树；另外我们可以使用 shouldComponentUpdate 这个生命周期来选择性的渲染子树，可以基于组件之前的状态或者下一个状态来决定它是否需要重新渲染，这样的话可以组织重新渲染大的子树。

### react-hooks useLayoutEffect 高阶组件
函数组件有值捕获特性 可以拿到当时渲染时的state
useEffect 和 useLayout 都是副作用 hooks，两则非常相似，同样都接收两个参数：
(1)第一个参数为函数，第二个参数为依赖列表，只有依赖更新时才会执行函数；返回一个函数，当页面刷新的或销毁的时候执行 return 后的代码；
(2)如果不接受第二个参数，那么在第一次渲染完成之后和每次更新渲染页面的时候，都会调用 useEffect 的回调函数；
useEffect 和 useLayout 的主要区别就是他们的执行时机不同，在浏览器中 js 线程与渲染线程是互斥的，当 js 线程执行时，渲染线程呈挂起状态，只有当 js 线程空闲时渲染线程才会执行，将生成的 dom 绘制。useLayoutEffect 在 js 线程执行完毕即 dom 更新之后立即执行，而 useEffect 是在渲染结束后才执行，也就是说 useLayoutEffect 比 useEffect 先执行。

### react 新旧版本生命周期

```js
// react16 中废弃了三个钩子
componentWillMount; // 组件将要挂载的钩子
componentWillReceiveProps; // 组件将要接收一个新的参数时的钩子
componentWillUpdate; // 组件将要更新的钩子

// 新增了方法
getDerivedStateFromProps; // 静态方法
getSnapshotBeforeUpdate;

/*
		在16.8版本以后，react将diff运算改进为Fiber，这样的话当我们调用setState方法进行更新的时候，在reconciler 层中js运算会按照节点为单位拆分成一个个小的工作单元，在render前可能会中断或恢复，就有可能导致在render前这些生命周期在进行一次更新时存在多次执行的情况，此时如果我们在里面使用ref操作dom的话，就会造成页面频繁重绘，影响性能。
		所以废弃了这几个will系列的勾子，增加了 getDerivedStateFromProps这个静态方法，这样的话我们就不能在其中使用this.refs以及this上的方法了；getSnapshotBeforeUpdate 这个方法已经到了commit阶段，只会执行一次，给想读取 dom 的用户一些空间。
*/
/*
		当我们需要修改store中值的时候，我们是通过 dispatch(action)将要修改的值传到reducer中的，这个过程是同步的，如果我们要进行异步操作的时候，就需要用到中间件；中间件其实是提供了一个分类处理action的机会，在 middleware 中，我们可以检阅每一个流过的action，并挑选出特定类型的 action进行相应操作，以此来改变 action；
		
		 applyMiddleware 是个三级柯里化的函数。它将陆续的获得三个参数：第一个是 middlewares 数组，第二个是 Redux 原生的 createStore，最后一个是 reducer；然后applyMiddleware会将不同的中间件一层一层包裹到原生的 dispatch 之上；
		 redux-thunk 中间件的作用就是让我们可以异步执行redux，首先检查参数 action 的类型，如果是函数的话，就执行这个 action这个函数，并把 dispatch, getState, extraArgument 作为参数传递进去，否则就调用next让下一个中间件继续处理action。
*/

// redux-thunk部分源码
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;

```

jsx vdom 渲染 挂载 更新 调度 协调 渲染

