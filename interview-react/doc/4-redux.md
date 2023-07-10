### redux

store + action + reducer

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
