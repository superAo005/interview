## [react18新特性](https://zhuanlan.zhihu.com/p/500072933)()
React未来的定位是：一个前端底层操作系统，足够复杂，一般开发者慎用
而开发者使用的是「基于该操作系统实现的各种上层应用」
### Concurrent Mode 并发模式 简称 CM
 - 在以前，React 在状态变更后，会开始准备虚拟 DOM，然后渲染真实 DOM，整个流程是串行的。一旦开始触发更新，只能等流程完全结束，期间是无法中断的
 - 在 CM 模式下，React 在执行过程中，每执行一个 Fiber，都会看看有没有更高优先级的更新，如果有，则当前低优先级的的更新会被暂停，待高优先级任务执行完之后，再继续执行或重新执行
 - 过对于普通开发者来说，我们一般是不会感知到 CM 的存在的，在升级到 React 18 之后，我们的项目不会有任何变化。
   我们需要关注的是基于 CM 实现的上层功能，比如 Suspense、Transitions、streaming server rendering（流式服务端渲染）
### 新hooks useDeferredValue和useTransition useId useSyncExternalStore useInsertionEffect
useDeferredValue 可以让一个 state 延迟生效，只有当前没有紧急更新时，该值才会变为最新值。
useDeferredValue 和 startTransition 一样，都是标记了一次非紧急更新
```js
const [treeLeanInput, setTreeLeanInput] = useState(0);
const deferredValue = useDeferredValue(treeLeanInput);

function changeTreeLean(event) {
  const value = Number(event.target.value);
  setTreeLeanInput(value)
}

return (
  <>
    <input type="range" value={treeLeanInput} onChange={changeTreeLean} />
    <Pythagoras lean={deferredValue} />
  </>
)
```
### startTransition
  - startTransition可以让用户在不同视图间切换的同时，不阻塞用户输入
  - 这一API很可能会由各种Router实现，再作为一个配置项开放给开发者
React 的状态更新可以分为两类：

紧急更新（Urgent updates）：比如打字、点击、拖动等，需要立即响应的行为，如果不立即响应会给人很卡
过渡更新（Transition updates）：将 UI 从一个视图过渡到另一个视图。不需要即时响应，有些延迟是可以接受的。
### 自动批处理 Automatic Batching
批处理是指 React 将多个状态更新，聚合到一次 render 中执行，以提升性能
在 React 18 之前，React 只会在事件回调中使用批处理，而在 Promise、setTimeout、原生事件等场景下，是不能使用批处理的。
而在 React 18 中，所有的状态更新，都会自动使用批处理，不关心场景。
```js
function handleClick() {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 只会 re-render 一次，这就是批处理
}
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // React 会 render 两次，每次 state 变化更新一次
  // React18 只会 re-render 一次，这就是批处理
}, 1000);
// 如果你在某种场景下不想使用批处理，你可以通过 flushSync来强制同步执行（比如：你需要在状态更新后，立刻读取新 DOM 上的数据等。
import { flushSync } from 'react-dom';

function handleClick() {
  flushSync(() => {
    setCounter(c => c + 1);
  });
  // React 更新一次 DOM
  flushSync(() => {
    setFlag(f => !f);
  });
  // React 更新一次 DOM
}
```

### 万物皆可Suspense
对于React来说，有两类瓶颈需要解决：
- CPU的瓶颈，如大计算量的操作导致页面卡顿 
- IO的瓶颈，如请求服务端数据时的等待时间 
其中CPU的瓶颈通过并发特性的优先级中断机制解决。
IO的瓶颈则交给Suspense解决。所以，未来一切与IO相关的操作，都会收敛到Suspense这一解决方案内。
从最初的React.lazy到如今仍在开发中的Server Components，最终万物皆可Suspense。这其中有些逻辑是很复杂的，比如：Server Components 新的服务端渲染方案 所以，这些操作不大可能是直接面向开发者的。这又回到了上一条，这些操作会交由各种库实现。如果复杂度更高，则会交由基于React封装的框架实现，比如Next.js、Remix。
### 流式 SSR
在 React 18 中，基于全新的 Suspense，支持了流式 SSR，也就是允许服务端一点一点的返回页面。


