### [CSS 的隔离](https://zhuanlan.zhihu.com/p/505092340)
CSS 的隔离主要有两类方案，
1. 一类是运行时的通过命名区分，
   运行时的方案最典型的就是 BEM，它是通过 .block__element--modifier 这种命名规范来实现的样式隔离，不同的组件有不同的 blockName，只要按照这个规范来写 CSS，是能保证样式不冲突的。
2. 一类是编译时的自动转换 CSS，添加上模块唯一标识 编译时的方案有两种，一种是 scoped，一种是 css modules
scoped 是 vue-loader 支持的方案，它是通过编译的方式在元素上添加了 data-xxx 的属性，然后给 css 选择器加上[data-xxx] 的属性选择器的方式实现 css 的样式隔离。
css-modules 是 css-loader 支持的方案，在 vue、react 中都可以用，它是通过编译的方式修改选择器名字为全局唯一的方式来实现 css 的样式隔离  css-modules 修改的是选择器名字，而且因为名字是编译生成的，所以组件里是通过 style.xx 的方式来写选择器名