### keep-alive 原理

- 抽象组件：渲染虚拟 dom
- 作用：会缓存不活动的组件的状态，避免多次渲染降低性能
- include 的会被缓存 exclude 的不会被缓存 max 最多缓存几个

- 采用 LRU 缓存策略
- created 的时候创建缓存对象 destroyed 时清除
- 如果 keep-alive 存在多个子元素，keep-alive 要求同时只有一个子元素被渲染。所以在开头会获取插槽内的子元素，调用 getFirstComponentChild 获取到第一个子元素的 VNode
- 接着判断当前组件是否符合缓存条件，组件名与 include 不匹配或与 exclude 匹配都会直接退出并返回 VNode，不走缓存机制。
- 调用 pruneCacheEntry 对缓存的 Vnode 进行修剪
- 总结： cache 用于缓存组件，keys 存储组件的 key，根据 LRU 策略来调整缓存组件。keep-alive 的 render 中最后会返回组件的 VNode，因此我们也可以得出一个结论，keep-alive 并非真的不会渲染，而是渲染的对象是包裹的子组件。
