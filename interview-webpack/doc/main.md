### webpack 原理
Webpack 能大行其道，归功于它划时代的采用了 bundle 机制。通过这种 bundle 机制，Webpack 可以将项目中各种类型的源文件转化供浏览器识别的 js、css、img 等文件，建立源文件之间的依赖关系，并将数量庞大的源文件合并为少量的几个输出文件。
bundle 工作机制的核心部分分为两块：
构建模块依赖图 - module graph
将 module graph 分解为最终供浏览器使用的几个输出文件。
构建 module graph 的过程可以简单归纳为:

获取配置文件中 entry 对应的 url (这个 url 一般为相对路径);
resolve - 将 url 解析为绝对路径，找到源文件在本地磁盘的位置，并构建一个 module 对象；
load - 读取源文件的内容;
transform - 使用对应的 loader 将源文件内容转化为浏览器可识别的类型；
parse - 将转化后的源文件内容解析为 AST 对象，分析 AST 对象，找到源文件中的静态依赖(import xxx from 'xxx') 和动态依赖(import('xx'))对应的 url, 并收集到 module 对象中；
遍历第 5 步收集到的静态依赖、动态依赖对应的 url，重复 2 - 6 步骤，直到项目中所有的源文件都遍历完成。

分解 module graph 的过程也可以简单归纳为:

预处理 module graph，对 module graph 做 tree shaking；
遍历 module graph，根据静态、动态依赖关系，将 module graph 分解为 initial chunk、async chunks；
优化 initial chunk、 async chunks 中重复的 module；
根据 optimization.splitChunks 进行优化，分离第三方依赖、被多个 chunk 共享的 module 到 common chunks 中；
根据 chunk 类型，获取对应的 template；
遍历每个 chunk 中收集的 module，结合 template，为每个 chunk 构建最后的输出内容；
将最后的构建内容输出到 output 指定位置；

Webpack 的这种 bundle 机制，奠定了现代静态打包器(如 Rollup、Parcel、Esbuild)的标准工作模式。
然而成也萧何败萧何，强大的 bundle 机制，也引发了构建速度缓慢的问题，而且项目规模越大，构建速度越是缓慢。其主要原因是构建 module graph 的过程中，涉及到大量的文件 IO、文件 transfrom、文件 parse 操作；以及分解 module graph 的过程中，需要遍历 module graph、文件 transform、文件 IO 等。这些操作，往往需要消耗大量的时间，导致构建速度变得缓慢。
开发模式下，dev server 需要 Webpack 完成整个工作链路才可以启动成功，这就导致构建过程耗时越久，dev server 启动越久。
为了加快构建速度，Webpack 也做了大量的优化，如 loader 的缓存功能、webpack5 的持久化缓存等，但这些都治标不治本，只要 Webpack 的核心工作机制不变，那 dev server 启动优化，依旧是一个任重道远的过程(基本上永远都达不到 Vite 那样的效果)。
### 热更新
dev server 启动以后，会 watch 源文件的变化。当源文件发生变化后，Webpack 会重新编译打包。这个时候，由于我们只修改了一个文件，因此只需要对这个源文件做 resolve、 load、 transfrom、parse 操作，依赖的文件直接使用缓存，因此 dev server 的响应速度比冷启动要好很多。
dev server 重新编译打包以后，会通过 ws 连接通知浏览器去获取新的打包文件，然后对页面做局部更新
### webpack 中有三种生成哈希值规则的方式，可以用来区分文件是否修
1. hash 与整个项目有关，项目里有文件修改，所有文件的哈希值都会变化
2. chunkhash 与入口有关，同一入口的文件被视为一个整体，当其中一个文件修改时，同入口的所有文件哈希值发生改变
3. contenthash 只与文件内容有关，文件内容发生改变，才会更改该文件的哈希值
