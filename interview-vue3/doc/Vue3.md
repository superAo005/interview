## Vue3 如何实现响应式

使用 Proxy 和 Reflect API 实现 vue3 响应式。
Reflect API 则可以更加方便地实现对对象的监听和更新，可以用来访问、检查和修改对象的属性和方法，比如 Reflect.get、Reflect.set、Reflect.has 等
Vue3 会将响应式对象转换为一个 Proxy 对象，并利用 Proxy 对象的 get 和 set 拦截器来实现对属性的监听和更新。
当访问响应式对象的属性时，get 拦截器会被触发，此时会收集当前的依赖关系，并返回属性的值；当
修改响应式对象的属性时，set 拦截器会被触发，此时会触发更新操作，并通知相关的依赖进行更新。
优点：可监听属性的变化、新增与删除，监听数组的变化

## vue3 的变化（改进）

1. 响应式方面
   vue3 的响应式是基于 Proxy 来实现的，利用代理来拦截对象的基本操作，配合 Refelect.\*方法来完成响应式的操作
   vue3 实现双向绑定的核心是 Proxy（代理的使用），它会对需要响应式处理的对象进行一层代理，对象的所有操作（get、set 等）都会被 Prxoy 代理到。在 vue 中，所有响应式对象相关的副作用函数会使用 weakMap 来存储。当执行对应的操作时，会去执行操作中所收集到的副作用函数

```js
// WeakMap常用于存储只有当key所引用的对象存在时（没有被回收）才有价值的消息，十分贴合双向绑定场景
const bucket = new WeakMap() // 存储副作用函数

let activeEffect // 用一个全局变量处理被注册的函数

const tempObj = {} // 临时对象，用于操作

const data = { text: 'hello world' } // 响应数据源

// 用于清除依赖
function cleanup(effectFn) {
  for (let i = 0; i < effectFn.deps.length; i++) {
    const deps = effectFn.deps[i]
    deps.delete(effectFn)
  }
  effectFn.deps.length = 0
}

// 处理依赖函数
function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    activeEffect = effectFn
    fn()
  }
  effectFn.deps = []
  effectFn()
}

// 在get时拦截函数调用track函数追踪变化
function track(target, key) {
  if (!activeEffect) return //
  let depsMap = bucket.get(target)
  if (!depsMap) {
    bucket.set(target, (depsMap = new Map()))
  }
  let deps = depsMap.get(key)
  if (!deps) {
    depsMap.set(key, (deps = new Set()))
  }

  deps.add(activeEffect)

  activeEffect.deps.push(deps)
}

// 在set拦截函数内调用trigger来触发变化
function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)
  const effectsToRun = new Set(effects)
  effectsToRun.forEach((effectFn) => effectFn())
  // effects && effects.forEach(fn => fn());
}

const obj = new Proxy(data, {
  // 拦截读取操作
  get(target, key) {
    if (!activeEffect) return //
    console.log('get -> key', key)
    track(target, key)
    return target[key]
  },

  // 拦截设置操作
  set(target, key, newValue) {
    console.log('set -> key: newValue', key, newValue)
    target[key] = newValue
    trigger(target, key)
  }
})

effect(() => {
  tempObj.text = obj.text
  console.log('tempObj.text :>> ', tempObj.text)
})

setTimeout(() => {
  obj.text = 'hi vue3'
}, 1000)
```

2. 书写方面
   提供了 setup 的方式，配合组合式 API，可以建立组合逻辑、创建响应式数据、创建通用函数、注册生命周期钩子等
3. diff 算法方面
4. 编译上的优化
