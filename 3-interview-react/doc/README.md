# [我对 React 实现原理的理解](https://zhuanlan.zhihu.com/p/538096803)

React 是前端开发每天都用的前端框架，自然要深入掌握它的原理。我用 React 也挺久了，这篇文章就来总结一下我对 react 原理的理解
react 和 vue 都是基于 vdom 的前端框架，我们先聊下 vdom

## vdom

为什么 react 和 vue 都要基于 vdom 呢？直接操作真实 dom 不行么
渲染就是用 dom api 对真实 dom 做增删改，
如果已经渲染了一个 dom，后来要更新，那就要遍历它所有的属性，重新设置，比如 id、clasName、onclick 等
而 dom 的属性是很多的 有很多属性根本用不到，但在更新时却要跟着重新设置一遍

1. 单独摘出来用 JS 对象表示
2. 有了 vdom 之后，就没有和 dom 强绑定了，可以渲染到别的平台，比如 native、canvas 等等

```js
{
    type: 'div',
    props: {
        id: 'aaa',
        className: ['bbb', 'ccc'],
        onClick: function() {}
    },
    children: []
}
```

### dsl 的编译

dsl 是 domain specific language，领域特定语言的意思，html、css 都是 web 领域的 dsl
直接写 vdom 太麻烦了，所以前端框架都会设计一套 dsl，然后编译成 render function，执行后产生 vdom
前端领域大家熟悉的描述 dom 的方式是 html，最好的方式自然是也设计成那样
所以 vue 的 template，react 的 jsx 就都是这么设计的
vue 的 template compiler 是自己实现的，而 react 的 jsx 的编译器是 babel 实现的，是两个团队合作的结果
编译成 render function 后再执行就是我们需要的 vdom
接下来渲染器把它渲染出来就行了

### 渲染 vdom

渲染 vdom 也就是通过 dom api 增删改 dom
比如一个 div，那就要 document.createElement 创建元素，然后 setAttribute 设置属性，addEventListener 设置事件监听器
如果是文本，那就要 document.createTextNode 来创建
所以说根据 vdom 类型的不同，写个 if else，分别做不同的处理就行
没错，不管 vue 还是 react，渲染器里这段 if else 是少不了的

```js
switch (vdom.tag) {
  case HostComponent:
  // 创建或更新 dom
  case HostText:
  // 创建或更新 dom
  case FunctionComponent:
  // 创建或更新 dom
  case ClassComponent:
  // 创建或更新 dom
}
```

react 里是通过 tag 来区分 vdom 类型的，比如 HostComponent 就是元素，HostText 就是文本，FunctionComponent、ClassComponent 就分别是函数组件和类组件

### 组件

我们的目标是通过 vdom 描述界面，在 react 里会使用 jsx
这样的 jsx 有的时候是基于 state 来动态生成的。如何把 state 和 jsx 关联起来呢
封装成 function、class 或者 option 对象的形式。然后在渲染的时候执行它们拿到 vdom 就行了
这就是组件的实现原理

```js
switch (vdom.tag) {
  // 如果是函数组件，那就传入 props 执行它，拿到 vdom 之后再递归渲染
  case FunctionComponent:
    const childVdom = vdom.type(props);
    render(childVdom);
  //如果是 class 组件，那就创建它的实例对象，调用 render 方法拿到 vdom，然后递归渲染
  case ClassComponent:
    const instance = new vdom.type(props);
    const childVdom = instance.render();

    render(childVdom);
  //...
}
```

所以组件本质上只是对产生 vdom 的逻辑的封装，函数的形式、option 对象的形式、class 的形式都可以
真说起来，vue 和 react 最大的区别就是状态管理方式的区别，vue 有响应式，而 react 则是 setState 的 api 的方式
因为这个区别导致了后面架构演变方向的不同。

### 状态管理

1. react 是通过 setState 的 api 触发状态更新的，更新以后就重新渲染整个 vdom
2. vue 是通过对状态做代理，get 的时候收集依赖，然后修改状态的时候就可以触发对应组件的 render 了
   为什么 react 不直接渲染对应组件呢
   业务场景
   父组件把它的 setState 函数传递给子组件，子组件调用了它 这时候更新是子组件触发的，但是要渲染的就只有那个组件么？明显不是，还有它的父组件 同理，某个组件更新实际上可能触发任意位置的其他组件更新的
   所以必须重新渲染整个 vdom 才行
   那 vue 为啥可以做到精准的更新变化的组件呢？
   因为响应式的代理呀，不管是子组件、父组件、还是其他位置的组件，只要用到了对应的状态，那就会被作为依赖收集起来，状态变化的时候就可以触发它们的 render，不管是组件是在哪里的
   这就是为什么 react 需要重新渲染整个 vdom，而 vue 不用 这个问题也导致了后来两者架构上逐渐有了差异

### react 架构的演变

react15 的时候，和 vue 的渲染流程还是很像的，都是递归渲染 vdom，增删改 dom 就行
但是因为状态管理方式的差异逐渐导致了架构的差异

1. react 的 setState 会渲染整个 vdom，而一个应用的所有 vdom 可能是很庞大的，计算量就可能很大
2. 浏览器里 js 计算时间太长是会阻塞渲染的，会占用每一帧的动画、重绘重排的时间，这样动画就会卡顿。
   作为一个有追求的前端框架，动画卡顿肯定是不行的。但是因为 setState 的方式只能渲染整个 vdom，所以计算量大是不可避免的
   那能不能把计算量拆分一下，每一帧计算一部分，不要阻塞动画的渲染呢？

### fiber 架构

优化的目标是打断计算，分多次进行，但现在递归的渲染是不能打断的，有两个方面的原因导致的

1. 渲染的时候直接就操作了 dom 了，这时候打断了，那已经更新到 dom 的那部分怎么办？

   解决方法：

   1. 渲染的时候不要直接更新到 dom 了，只找到变化的部分，打个增删改的标记，创建好 dom，等全部计算完了一次性更新到 dom 就好了
   2. react 把渲染流程分为了两部分： render 和 commit
      render 阶段会找到 vdom 中变化的部分，创建 dom，打上增删改的标记，这个叫做 reconcile，调和。reconcile 是可以打断的，由 schedule 调度
      之后全部计算完了，就一次性更新到 dom，叫做 commit。

   3. react 就把之前的和 vue 很像的递归渲染，改造成了 render（reconcile + schdule） + commit 两个阶段的渲染。

2. 现在是直接渲染的 vdom，而 vdom 里只有 children 的信息，如果打断了，怎么找到它的父节点呢？
   现有的 vdom 是不行的，需要再记录下 parent、silbing 的信息。所以 react 创造了 fiber 的数据结构。
   除了 children 信息外，额外多了 sibling、return，分别记录着兄弟节点、父节点的信息。
   这个数据结构也叫做 fiber。（fiber 既是一种数据结构，也代表 render + commit 的渲染流程）

   ```js
   // react 里有一个 workLoop 循环，每次循环做一个 fiber 的 reconcile，
   // 当前处理的 fiber 会放在 workInProgress 这个全局变量上
   function workLoop() {
    //循环执行 reconcile，那每次处理之前判断一下是不是有更高优先级的任务，就能实现打断了
    // 每次处理 fiber 节点的 reconcile 之前，都先调用下 shouldYield 方法
    // shouldYiled 方法就是判断待处理的任务队列有没有优先级更高的任务，有的话就先处理那边的 fiber，这边的先暂停一下
    // 这就是 fiber 架构的 reconcile 可以打断的原理。通过 fiber 的数据结构，加上循环处理前每次判断下是否打断来实现的
     while (wip && shouldYield()) {
       performUnitOfWork();
     }
     //当循环完了，也就是 wip 为空了，那就执行 commit 阶段，把 reconcile 的结果更新到 dom
     if (!wip && wipRoot) {
       commitRoot();
     }
   }
   //每个 fiber 的 reconcile 是根据类型来做的不同处理。当处理完了当前 fiber 节点，就把 wip 指向 sibling、return 来切到下个 fiber 节点。
   function performUnitOfWork() {
     const { tag } = wip;

     switch (tag) {
       case HostComponent:
         updateHostComponent(wip);
         break;

       case FunctionComponent:
         updateFunctionComponent(wip);
         break;

       case ClassComponent:
         updateClassComponent(wip);
         break;
       case Fragment:
         updateFragmentComponent(wip);
         break;
       case HostText:
         updateHostTextComponent(wip);
         break;
       default:
         break;
     }
     if (wip.child) {
       wip = wip.child;
       return;
     }

     let next = wip;

     while (next) {
       if (next.sibling) {
         wip = next.sibling;
         return;
       }
       next = next.return;
     }

     wip = null;
   }
   ```

总结：shouldYiled 方法就是判断待处理的任务队列有没有优先级更高的任务，有的话就先处理那边的 fiber，这边的先暂停一下。
这就是 fiber 架构的 reconcile 可以打断的原理。通过 fiber 的数据结构，加上循环处理前每次判断下是否打断来实现的   
### commit 阶段
为了变为可打断的，reconcile 阶段并不会真正操作 dom，只会创建 dom 然后打个 effectTag 的增删改标记。
useEffect 被设计成了在 dom 操作前异步调用，useLayoutEffect 是在 dom 操作后同步调用。
实际上 react 把 commit 阶段也分成了 3 个小阶段。

before mutation、mutation、layout。
before mutation，会异步调度 useEffect 的回调函数。
mutation 就是遍历 effectList 来更新 dom 的。
layout 阶段了，因为这个阶段已经可以拿到布局信息了，会同步调用 useLayoutEffect 的回调函数。而且这个阶段可以拿到新的 dom 节点，还会更新下 ref。
### 总结
react 和 vue 都是基于 vdom 的前端框架，之所以用 vdom 是因为可以精准的对比关心的属性，而且还可以跨平台渲染。
但是开发不会直接写 vdom，而是通过 jsx 这种接近 html 语法的 DSL，编译产生 render function，执行后产生 vdom。
vdom 的渲染就是根据不同的类型来用不同的 dom api 来操作 dom。
渲染组件的时候，如果是函数组件，就执行它拿到 vdom。class 组件就创建实例然后调用 render 方法拿到 vdom。vue 的那种 option 对象的话，就调用 render 方法拿到 vdom。
组件本质上就是对一段 vdom 产生逻辑的封装，函数、class、option 对象甚至其他形式都可以。
react 和 vue 最大的区别在状态管理方式上，vue 是通过响应式，react 是通过 setState 的 api。我觉得这个是最大的区别，因为它导致了后面 react 架构的变更。
react 的 setState 的方式，导致它并不知道哪些组件变了，需要渲染整个 vdom 才行。但是这样计算量又会比较大，会阻塞渲染，导致动画卡顿。
所以 react 后来改造成了 fiber 架构，目标是可打断的计算。
为了这个目标，不能变对比变更新 dom 了，所以把渲染分为了 render 和 commit 两个阶段，render 阶段通过 schedule 调度来进行 reconcile，也就是找到变化的部分，创建 dom，打上增删改的 tag，等全部计算完之后，commit 阶段一次性更新到 dom。
打断之后要找到父节点、兄弟节点，所以 vdom 也被改造成了 fiber 的数据结构，有了 parent、sibling 的信息。
所以 fiber 既指这种链表的数据结构，又指这个 render、commit 的流程。
reconcile 阶段每次处理一个 fiber 节点，处理前会判断下 shouldYield，如果有更高优先级的任务，那就先执行别的。
commit 阶段不用再次遍历 fiber 树，为了优化，react 把有 effectTag 的 fiber 都放到了 effectList 队列中，遍历更新即可。
在dom 操作前，会异步调用 useEffect 的回调函数，异步是因为不能阻塞渲染。
在 dom 操作之后，会同步调用 useLayoutEffect 的回调函数，并且更新 ref。

所以，commit 阶段又分成了 before mutation、mutation、layout 这三个小阶段，就对应上面说的那三部分。

我觉得理解了 vdom、jsx、组件本质、fiber、render(reconcile + schedule) + commit(before mutation、mutation、layout)的渲染流程，就算是对 react 原理有一个比较深的理解了。