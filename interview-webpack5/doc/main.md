### 优化构建速度
1. speed-measure-webpack-plugin 插件 适用于v4a版本 在 webpack5.x 中 不兼容 分析模块打包时间
2. 优化 resolve 配置
3. 缩小范围 loader 缩小范围
4. 多进程配置 thread-loader 在小型项目中，开启多进程打包反而会增加时间成本，因为启动进程和进程间通信都会有一定开销
5. 升级v5版本 因为cache 持久化缓存 

### 优化构建结果
1. webpack-bundle-analyzer 分析模块打包大小
2. 压缩css  optimize-css-assets-webpack-plugin 压缩css 
3. 压缩js webpack5内置了terser-webpack-plugin（在生成环境下打包默认会开启 js 压缩，但是当我们手动配置 optimization 选项之后，就不再默认对 js 进行压缩，需要我们手动去配置）
4. Tree-shaking 和Scope Hoisting 

### 优化运行时体验
1. 运行时优化的核心就是提升首屏的加载速度，主要的方式就是降低首屏加载文件体积，首屏不需要的文件进行预加载或者按需加载
2. 分包 optimization.splitChunks 是基于 SplitChunksPlugin
3. 代码延迟加载 
4. prefetch 浏览器空闲的时候进行资源的拉取 与 preload 提前加载后面会用到的关键资源
