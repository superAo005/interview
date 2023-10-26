## vue2和3有什么区别?如何回答才能体现水平

1. 用组合式api替换选项式api，方便逻辑更加的聚合
2. 一些细节改变

具体细节：1，因为改成组合式api所以没有this

2，生命周期没有creat，setup等同于create，卸载改成unmount

3，vue3中v-if高于v-for的优先级

4，根实例的创建从new app变成了createApp方法

5，一些全局注册，比如mixin，注册全局组件，use改成了用app实例调用，而不是vue类调用

6，新增了传送门teleport组件

7，template模板可以不包在一个根div里

3. 响应式原理改成了用proxy，解决了数组无法通过下标修改，无法监听到对象属性的新增和删除的问题。也提升了响应式的效率
Vue.js 3.0使用了Proxy替代Object.defineProperty实现响应式，并且使用了静态提升技术来提高渲染性能。新增了编译时优化，在编译时进行模板静态分析，并生成更高效的渲染函数
深入回答：vue3并不是完全抛弃了defineProperty，通过reactive定义的响应式数据使用proxy包装出来，而ref还是用的defineProperty去给一个空对象，定义了一个value属性来做的响应式

4. 支持按需引入，可以更好tree-shaking

5. 性能优化，增加了静态节点标记。会标记静态节点，不对静态节点进行比对。从而增加效率
Vue3 则是先通过 patchFlag 来标记动态节点  然后配合 dynamicChildren 将动态节点进行收集，从而完成在 diff 阶段只做靶向更新的目的
深入回答：文本内容为变量会标记为1，属性为动态会标记为2，如果静态则不标记跳过比对

进阶回答点：

1，vue3不推荐使用mixin进行复用逻辑提取，而是推荐写成hook

2，v-model应用于组件时，监听的事件和传递的值改变

3，ts更好地配合

 