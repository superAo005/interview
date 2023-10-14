# 希音
pwa 
serviceworker 
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
