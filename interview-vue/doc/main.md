## vue2 和 vue3 响应原理对比

### vue2 缺点(解决方案)

1. 无法检测到对象属性的动态添加和删除-(提供 Vue.$set 动态给对象添加属性)
2. 无法检测到数组的下标和 length 属性的变更(Vue.$delete 动态删除对象属性)
3. 深度监听需要递归到底，性能层面考虑不太好(也可以通过 splice 解决数组中的问题，object.assign 解决批量添加对象属性的问题)
4. 不能检测数组变化。(通过重写数组方法实现的对数组的监听。)
   vue3 使用 proxy 实现响应式数据

### options API 和 composition API

1. options API 优缺点
   条例清晰：相同的放在相同的地方，比如方法都放在 methods 中，状态都在 data 中
   调用时使用 this，逻辑过多时 this 指向不明确
   代码分散：一个功能的代码往往散落在不同的 options 种，比如 data methods 等等，这也导致新添加功能的时候需要在各种 options 中反复横跳，这时候如果代码行数较多那是要命的
   逻辑过于复杂的场景可以将某个功能代码抽象出 mixin，但是这会导致数据来源不明确，在 template 中有个 count 变量，你会不知道他到底是来源于 data 还是 mixin 还是 vue.prototype 设置的全局变量。除此之外，如果存在多个 mixin 还可能存在同名变量被覆盖的问题

2. composition 优缺点
   更好的代码组织方式和更好的代码复用
   没有对 this 的使用，避免了指向不明确的情况
   全部都是函数，更加方便类型推断

### 生命周期钩子函数

Vue2--------------vue3
beforeCreate -> setup()开始创建组件之前，在 beforeCreate 和 created 之前执行。创建的是 data 和 method
created -> setup()
beforeMount -> onBeforeMount 组件挂载到节点上之前执行的函数。
mounted -> onMounted 组件挂载完成后执行的函数。
beforeUpdate -> onBeforeUpdate 组件更新之前执行的函数。
updated -> onUpdated 组件更新完成之后执行的函数。
beforeDestroy -> onBeforeUnmount 组件卸载之前执行的函数。
destroyed -> onUnmounted 组件卸载完成后执行的函数
activated -> onActivated 被包含在中的组件，会多出两个生命周期钩子函 数。被激活时执行 。
deactivated -> onDeactivated 比如从 A 组件，切换到 B 组件，A 组件消失 时执行。
