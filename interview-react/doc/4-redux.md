### redux

store + action + reducer
store 派发的 action 和 reducer 函数联系在一起的对象
action 本质上就是一个简单的js对象，内部必须要有一个type的属性，用来表示将要执行的动作
reducer reducer 是一个纯函数，它接受先前的 state，action，并且返回一个新的 state
redux中的combineReducers redux给我们提供的一个函数，可以方便的让我们对多个reducer进行合并
```js
const store = createStore(reducer); // createStore方法是redux提供的
store.getState(); //获取reducer中返回的state数据；
store.subscribe(); //用来注册监听state是否改变；
store.dispatch(); //用于发送action，来修改reducer中的state数据；
```
### react-redux
配合react的绑定库，它有两个很重要的成员：Provider、connect 原理是react的Context
Provider 为后代组件提供store
connect 为组件提供数据和变更方法
### redux 中间件

```js
/**
 * redux中间件接受一个对象作为参数，对象的参数上有两个字段 dispatch 和 getState，分别代表着 Redux Store 上的两个同名函数。
 * 柯里化函数两端一个是 middewares，一个是store.dispatch
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) =>
    (...args) => {
      // 利用传入的createStore和reducer和创建一个store
      const store = createStore(...args);
      let dispatch = () => {
        throw new Error();
      };
      const middlewareAPI = {
        getState: store.getState,
        dispatch: (...args) => dispatch(...args),
      };
      // 让每个 middleware 带着 middlewareAPI 这个参数分别执行一遍
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      // 接着 compose 将 chain 中的所有匿名函数，组装成一个新的函数，即新的 dispatch
      dispatch = compose(...chain)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
}
```

### react-redux

Provider、connect
通过 redux 和 react context 配合使用，并借助高阶函数，实现了 react-redux

### redux-thunk

主要作用就是可以使 action 可以变成函数形式，接收两个参数 dispatch、getState

````js

const store = createStore(reducer, applyMiddleware(thunk));

function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) =>
    (next) =>
    (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
}
const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
export default thunk;
```js
````
