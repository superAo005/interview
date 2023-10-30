等会可以解析下redux么？

社区繁荣导致，好多人写，好多写法，好多api，各式各样的都有，导致api从来都不统一 。
react 是一个 lib，不是一个框架
也有一些全家桶dva umi
dva不维护了吗
react不是所有的都为你做，不像vue一样
现在在讲的是张仁阳老师吗
语速有点快
姜老师吧
1
小顶堆在哪用上了。。
在最新的更新调试的时候，方便的找到优先有最高的任务，小顶堆

React17 增加更新优先级的功能lane模型 




属于堆的一种数据结构。。
没声音了？
会发课件吗？
今天都讲完吗
全局样式怎么解决啊
react fiber 吗
优先队列
Workinprogress 树
css 样式会直接写在jsx文件里面吗
肯定分开啊
jsx相对vue的template的优点在哪里

更灵活
语法糖
React 17.0之后，好像创建组件的本质
变成了 引入一个jsx/runtime
同问：jsx相对vue的template的优点在哪里
angular 为了引入模板，引入很多的概念

babeljs原理会讲吗 本课不讲
正式课里我们会讲完整的实现
从零其于编译原理实现完整的babel 

template会反复横跳
高内聚地耦合vue也可以
他要问行内会不会太乱咋整
发条招聘信息有需要的朋友可以看下
https://job.toutiao.com/s/JoCWVaB
该发言可能违规，仅老师可见
更接近js吧
?
angular是框架 react是库
符合函数式编程思想
抽象语法树的写法和vonde很像  具体区别再那里
感觉都是对象
抽象语法树是用对象描述语法的，vnode是用对象描述dom元素
AST是描述语法的
vnode是描述界面的样子的
跟执行上下文有点像
文档一会儿给不
页面怎么老卡住 声音正常
词法分析，语法分析，语义分析。
说了jsx优点 那模板有什么优点呢？
同问
2.js可以写成webpack的loader吗
 runtime: classic  啥意思？
classic 是老的转换  jsx  react.createElement
automatic是新的转换 import jsx jsx() 
reactDOM没了
为什么要换这个新的呢
以前我自己手工引入React. eslint会报错
import React from 'react' 不用写了
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
感觉就是重命名了 一次
新的 以后不需要再引入react了？不需要了
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
React.createElement没了
不用import React了?
ReactNode  和  ReactElement 区别在啥地方

typescript里的一个类型




ort React了?
ReactNode  和  ReactElement 区别在啥地方
所以17可以不引入react 是因为这个原因吗？是的
jsx-runtime封装了react.createElement?是的
咱们现在react-react-app也是用的新的吧是的
react 17 有新的 jsx 转换啊是的
第二种什么时候用
平时都用classic
react17就能用第二种吗
录播哪里有呀？
runtime 是什么
一年半没听张老师的课了。今天一听瞬间就感觉到了差距
那用最新的打包页面加载的是jsx/runtime的js是的
那template比jsx优胜在哪。。

怎么还有发招聘的……
直观易读
张老师，我看头条、阿里都能给到90k、100k。怎样才能让自己再有一个突破呢？
P7的水平

闭上眼睛睡一觉
给到90k? 怕不是在做梦，你问问阿里P8能给到90k么
react是mvvm的 是什么意思
React官方并不是
该发言可能违规，仅老师可见
是在打包以后自动引入的是么
架构师
reactDOM没了？？咋回事、
你想渲染到页面还是需要的
babel咋这么多插件 
服了
hooks的实现原理是啥?
后面会讲
请问老师本次直播有录屏吗，我刚来看
可以讲一下react hooks么 20
原理实现
webpack4吗
react面试题，问到源码的时候一般都咋回答阿
为什么不用eval-cheap-source-map
15行少了个jsx?
这个配置里面 可以配置babel的runtime：‘automatic’??
没有Script标签为什么能打印出react
???
可以写类似antd组件库组件的前端开发,大概可以拿多少的薪资
25k
public里面的html不是要引入script标签吗  我有点纳闷不需要
这只是一个模板
16版本的某些生命周期在17删除了，如果我的项目版本升级之前写的那些生命周期如果兼容17版本？
打包的收回自动把打包好的j引入
用了html-webpack-plugin会自动把打包好的js文件引入，而且会是defer形式引入
时候
我学废了
$$typeof是啥来的，什么用
标识符，表示是一个React元素，也就是所谓的虚拟DOM
key如果不写，源码会自己加上去吗 不会
如果没有key.null  在DOM-DIFF的时候就会使用索引来对比 
会加上index
会,默认是undefined
会还报警告吗
为什么要引入 虚拟Dom
儿子不是字符串？
编辑时 key 不给，或者给index，或者给id 有什么区别。  id如果没有 给index和不给 有区别吗？
后面我们写一套完整的DOM-DIFF
是字符串
key要唯一
不然diff算法会出问题
可以看一下 diff三大策略中的element diff
出现一些很傻逼的问题
该发言可能违规，仅老师可见
出什么问题~
怎么页面 老师会卡住
源码中dom-diff是用key来判断一个节点的。。如果key相同，它会认为是同一个节点的，会出bug
想知道如果我们不写key，源码是啥时候添加上的。。
children不是余下元素吗
..
遍历children的时候会加key
$$typeof s是啥意思
就是一个唯一标识而已
obj的一个key
ReactElement 是 ReactNode 中的一种
Array不用new吗？
new Array(n) 和 Array() 一样的？
可以不用
react合成事件 可以解析下么？
事件合成
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
react在底层抹平浏览器的差异了？
冒泡到document绑定事件，可以统一管理，可以在event.nativeEvent拿到真实event，解决平台兼容性
老师打字 能把我急出尿来
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
原来如此，感谢～～
看处理的dom量级
挂了
react-reconciler
react-reconciler和react-dom的关系是
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
diff会讲下面试怎么答吗
react-reconciler和react-dom的关系是？
原声的innerhtml也是精准更新的？是的，但是需要手工操作
svelte
vdom渲染成真实dom后，占用内存会释放吗 会的


看处理的dom量级
挂了
react-reconciler
react-reconciler和react-dom的关系是
欢迎大家来参加珠峰架构公开课，我是珠峰客服老师，本次课程是我们正式课一部分，想了解课程可以加我好友，获取课程大纲，和更多视频资料18910092296
diff会讲下面试怎么答吗
react-reconciler和react-dom的关系是？
原声的innerhtml也是精准更新的？
svelte
vdom渲染成真实dom后，占用内存会释放吗
不会吧 释放了还怎么做diff
如何解决兼容性问题的呀
首次加载会很慢  如何优化呀
不会 fiber还在
jsx不需要了
类组件中的 this.state 和 state 定义的数据，有什么区别，老师
为什么大数据过万条的时候react在赋值的时候比vue快好几倍
老师我只会vue可以拿30k吗
那为什么Vue使用模板
jsx 比 模板灵活
那vue竟然还用模板。。估计就是为了上手简单
高T  P 都是只写ppt   没有写代码的了
P6多少
函数组件与class组件优缺点
hooks第一次渲染为什么获取不到节点？
还没挂到dom上吧
为啥vue有个index.html，但是react没html的
初始化时是一次渲染整个dom还是一个个的append
同一个组件换成class写就可以获取到节点
面试被问到antd input多了出现卡顿怎么处理
class只有新状态 函数组件 你也可以用ref
只会vue可以拿30k吗
函数组件是快照
休息5分钟

有录播吗
老师P6大概多少薪资
这些面试题讲几天
react合成事件能解析下么？
p8一般都写啥啊，年薪200多w
P6要到什么水平 
老师你那个html资料哪里获取？
老师你那个html资料哪里获取？
哈哈
老师你那个html资料哪里获取？
张老师webgl有前途吗？
有项目课么
栈一般分配多少内存啊？
已经报过架构课的可以学吗？
老师你那个html资料哪里获取？
 太强了吧，这得研究多少东西
虚拟dom到浏览器真实dom是什么样的过程？
     张老师计算机网络今年面试还考吗
reconcile会讲么
老师你那个html资料哪里获取？
React不算mvvm的话




6多少
函数组件与class组件优缺点
hooks第一次渲染为什么获取不到节点？
还没挂到dom上吧
为啥vue有个index.html，但是react没html的
初始化时是一次渲染整个dom还是一个个的append
同一个组件换成class写就可以获取到节点
面试被问到antd input多了出现卡顿怎么处理
class只有新状态 函数组件 你也可以用ref
只会vue可以拿30k吗
函数组件是快照
休息5分钟

有录播吗
老师P6大概多少薪资
这些面试题讲几天
react合成事件能解析下么？
p8一般都写啥啊，年薪200多w
P6要到什么水平 
老师你那个html资料哪里获取？
老师你那个html资料哪里获取？
哈哈
老师你那个html资料哪里获取？
张老师webgl有前途吗？
有项目课么
栈一般分配多少内存啊？
已经报过架构课的可以学吗？
老师你那个html资料哪里获取？
 太强了吧，这得研究多少东西
虚拟dom到浏览器真实dom是什么样的过程？
     张老师计算机网络今年面试还考吗
reconcile会讲么
老师你那个html资料哪里获取？
React不算mvvm的话，算mvc？

能众筹买吗
算v把
调度
2个小时不够吧...
定战略的比写代码难多了
今天讲不完吧
react中的useducer的dispatch稳定性怎么解决
源码咋区分是普通函数还是组件
isReactCompoent

类组件和函数组件




定战略的比写代码难多了 是的

今天讲不完吧 分几节课
react中的useducer的dispatch稳定性怎么解决
源码咋区分是普通函数还是组件
isReactCompoent
怎么区分是类组件还是普通函数。
extends React.component是为了拿到什么，render和生命周期吗
继承React.component是为了获取 Component类里定义的 方法 比如说setState
vue和react在长列表赋值和遍历的耗时比react慢为什么
class B extends React.Component {}  这个里面的  class B 是es6 的 函数 继承吗 是的
因为类组件里面有一个静态变量isReactComponent
Component.prototype.isReactComponent 类的原型上的属性
为什么React还留着类组件，主张函数式编程不是最好直接推广函数组件吗
应该是通过原型对象的标识区分的吧 是的
类组建编译出来代码会多很多
类组件为啥要保存实例 
如果你渲染之后把实例销毁了，还能更新不了
今天直播的笔记会发吗
不会保存 触发事件时的值
函数式组件如果有定义使用内部变量，不一样要保存引用
state = { number : 0}
state={number:0}  和 this.state={number:0}，有什么区别？？？
state={number:0}和this.state={number:0}，有什么区别？？？
state={number:0}和this.state={number:0}，有什么区别？？？
同问。以前constructor就是this.state的
this.state写在constructor中 初始化
一样的
就是作用域的问题吧
es7定义属性方式    es6定义属性只能在constructor里 定义属性
主要是不知道为啥会state={}等价constructor里thistate
es7的 特性   可以这样定义实例属性  加上static 会定义静态属性
class 语法糖编译成es5会处理。都是实例属性
这种 es7 特性，让你不用写constructor和super了
函数式组件什么时候会被更新？后面
不是加入队列吗。
谢谢解释
函数组件渲染的特性，和异步有关系吗？后面后写这个逻辑
没关系  就是理念不同吧
function组件不用定时器呢 还能获取到渲染时候定义的值么。
这个课件有地方可以看吗
同文
同问
不用定时器不就是改变之前的值吗
老师可以发一下课件吗？
组合优于继承
值捕获特性 是定时器 产生的闭包， 如果没有定时器， 是可以拿改变的值的吧。
少了return
钱比较
这个钱 有点意思
如果 你想在属性和状态不变的时候不更新，就可以pruecomponent
如果你想每次都更新component
什么场景用pruecomponent什么时候用component
数据结构简单就可以用p
这个纯组件，数据复杂的时候,判断不出来数据变化了
在这个方就要请出 immutablejS

那为了不要重复渲染子组件，不就要在所有子组件里加shouldComponentUpdate？或者extends pureComponent？
怎么高效实现新旧对象的值比较，引用变了值没变不更新
immutablejs
666
对象太深的话，频繁做shouldupdat的shallowequal会有效率问题，
转成JSON字符串比较呢。
deepEqual是什么呢
react实现浅比较的原理就是老师写的那么多吗 是的。
转json不行，对象是无序的属性值对。
hoc
也可以吧， 反正不一样就更新
{a: 1, b: 2} 和 {b: 2, a: 1}转json后是不一样的，但是用老师写的方法是会返回true的。

为什么函数组件就可以不用this
this是指的组件的实例
函数组件没有实例
类组件也可以不用this吧。。可以不用，但是肯定有
父组件更新，子组件更新渲染是默认行为
不用Memo的函数组件props不变时，diff为什么没筛掉
类组件复用逻辑不是用继承吗
HOC 写 ts类型props 也麻烦 各种& 是的
函数组件里可以用hoc吗 是的可以的
react怎么实现keep-alive react-keeper 
但是类最后不也是函数 
Gillian:但是类最后不也是函数



函数组件里可以用hoc吗
react怎么实现keep-alive
但是类最后不也是函数
是的
老师自定义hooks 是不是还有解耦的作用 不用 无用的 wrapper 了
不是缓存，memo的原理和PureComponent是一样的
memo怎么让函数组件不刷新的呢，做缓存嘛
内部返回的一个类组件继承PueComponent
代码逻辑复用的话有几种方式呢
HOC
render props
自定义hooks
App 忘了 extends
React.Component
IE 10
类组件应该是实例化的时候消耗大 先要创建原型对象上面一堆属性
是因为类组件保存了实例所以document可以获取节点，但是函数组件的函数被销毁了？所以document获取不到节点了？
如果阅读 react 源码 应该从哪几个模块开始
scheduler react react-dom react-reconciler share
react react
dva和redux有什么区别
dva封装 了redux
dva是一个全家桶=react+react-router+connected-react(react-router-redux)-router+redux+redux-saga
刚才那个state 定义的方式： construtor(){}  中定义是实例上；  下面的定义在es6中是原型上的属性 ；
你这 id ……
撑了
哈哈哈
老师以后周末能改为周日吗，周一上班，周日晚上一般都归位了
下节课也会在周末吗？
       老师下夹克哪天讲
周二讲吧  周六太远了
文件 能不能发一下
后面的都是正式课里面的吗？？
文件能不能发一下
.
张老师 强
下节课哪天讲
课件能发一下吗
介绍一下 架构课课程内容
强
课件会发吗
下节课什么时候呢
明天再来一播嘛
张老师66
文件在哪呢
lhw:文件在哪呢