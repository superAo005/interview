# 希音
pwa 
## serviceworker 
Service Worker是 Web Worker 的一种增强版，在后台独立于网页运行，和普通脚本拥有不同的运行容器，其中运行的代码不会被普通的JS阻塞，同时也不会阻塞其它页面的JS文件中的代码。
常见于 PWA 中，用于拦截全局的 fetch 事件，实现离线缓存、后台同步等操作。
1. 是后台线程，是独立于当前网页线程
2. 是网络代理，在网页发起请求时代理拦截，来返回缓存的文件
Service Worker就是一个运行在后台的Worker线程，然后它会长期运行，充当一个服务，很适合那些不需要独立的资源数据或用户互动的功能，最常见用途就是拦截和处理网络请求
 - 基于web worker(一个独立于JavaScript主线程的独立线程，在里面执行需要消耗大量资源的操作不会堵塞主线程)。
 - 在web worker的基础上增加了离线缓存的能力。
 - 本质上充当Web应用程序(服务器)与浏览器之间的代理服务器(可以拦截全站的请求，并作出相应的动作->由开发者指定的动作)。
 - 创建有效的离线体验(将一些不常更新的内容缓存在浏览器，提高访问体验)。
 - 由事件驱动的，具有生命周期。
 - 可以访问cache和indexDB。
 - 支持推送。
 - 可以让开发者自己控制管理缓存的内容以及版本。

## npm install的过程
 检查 npm 本身的配置，安装源，缓存等
 从 npm 服务端获取包信息，构建依赖树
 依赖扁平化处理，如果有同个依赖有不兼容的版本，则会按照 npm2 的方式，将依赖下载到对应包的 node_modules 下
 检查缓存，有缓存则直接解压到 node_modules
 无缓存则下载包，解压到 node_modules，添加到缓存
 生成 lock 文件
### webWorker
- js 单线程
- webWorker不能操作dom
- 场景
    - 计算密集型  大数据计算
    - postmessage
- 不会影响主线程
  - onerror    
## webpack5 模块联邦 Module Federation

## 计算首屏时间
- performance
- fcp
- 白屏 首屏 MutationObserver
  - body
  - 稳定 层级稳定
## babel
 - AST
 - type

## 自定义错误监控
 - 采集
   - onerror
   - 框架自带错误回调
# 哈啰
两个大整数相加
sleep函数
