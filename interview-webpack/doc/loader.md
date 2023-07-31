### loader运行的总体流程
1. Compiler.js中会将用户配置与默认配置合并，其中就包括了loader部分
2. webpack就会根据配置创建两个关键的对象——NormalModuleFactory和ContextModuleFactory。它们相当于是两个类工厂，通过其可以创建相应的NormalModule和ContextModule
3. 在工厂创建NormalModule实例之前还要通过loader的resolver来解析loader路径
4. 在NormalModule实例创建之后，则会通过其.build()方法来进行模块的构建。构建模块的第一步就是使用loader来加载并处理模块内容。而loader-runner这个库就是webpack中loader的运行器
5. 最后，将loader处理完的模块内容输出，进入后续的编译流程
### loader配置
loader是导出为一个函数的node模块。该函数在loader转换资源的时候调用。给定的函数将调用loader API，并通过this上下文访问