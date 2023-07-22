# React架构
1. Scheduler（调度器）—— 调度任务的优先级，高优任务优先进入Reconciler
2. Reconciler（协调器）—— 负责找出变化的组件 (render阶段)
3. Renderer（渲染器）—— 负责将变化的组件渲染到页面上 (commit阶段)
react是React核心，包含了React.createElement等代码
shared 存放各个模块公用的全局变量和方法
scheduler 实现了优先级调度功能
react-reconciler 提供了协调器的功能
react-dom 提供了渲染到DOM的功能
## Scheduler调度器-主要实现时间分片与优先级调度
## Reconciler协调器(render阶段)-负责找出变化的组件，具体实现就是构建或更新 Fiber 树
当 Scheduler 将任务分配给 Reconciler 后，Reconciler 会为变化的虚拟DOM节点打上增删改的标记。当所有组件都完成 Reconciler 操作之后在同一交给 Renderer。
render阶段开始于 performSyncWorkOnRoot 或 performConcurrentWorkOnRoot 方法的调用。这取决于本次更新是同步更新还是异步更新。具体过程分为两个阶段。
“递”阶段
从 rootFiber 开始向下深度优先遍历，为遍历的每一个 Fiber 节点调用 beginWork 方法。根据传入的 Fiber 节点，创建其子节点，并将其连接起来。（DIFF）
“归”阶段
相当于回溯，为遍历到底的 Fiber 叶子节点执行 completeWork 方法，再逐层向上执行。生成对应的DOM节点，将之前生成的子节点添加上去，并处理props。

## Renderer 根据 Reconciler 为虚拟DOM打的标记，同步执行对应的DOM操作