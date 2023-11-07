/**
 * 封装 axios 拦截器实现用户无感刷新 access_token
 * 登录状态的标识有 session 和 jwt 两种方案。
1. session 是通过 cookie 携带 sid，关联服务端的 session，用户信息保存在服务端。
2. jwt 是 token 保存用户信息，在 authorization 的 header 里通过 Bearer xxx 的方式携带，用户信息保存在客户端。
jwt 的方式因为天然支持分布式，用的比较多
但是只有一个 token 会有过期后需要重新登录的问题，为了更好的体验，一般都是通过双 token 来做无感刷新。
也就是通过 access_token 标识用户身份，过期时通过 refresh_token 刷新，拿到新 token。
 */
import axios from "axios";
import { getToken, setToken, getRefreshToken } from "@utils/auth";

// 刷新 access_token 的接口
const refreshToken = () => {
  return instance.post(
    "/auth/refresh",
    { refresh_token: getRefreshToken() },
    true
  );
};

// 创建 axios 实例
const instance = axios.create({
  baseURL: process.env.GATSBY_API_URL,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false; // 标记是否正在刷新 token
let requests = []; // 存储待重发请求的数组
// 判断返回的如果是 401 就调用刷新接口刷新 token，之后重发请求
// 如果 token 过期，会把请求放到队列里，只刷新一次，刷新完批量重发请求
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !error.config.url.includes("/auth/refresh")
    ) {
      const { config } = error;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((res) => {
            const { access_token } = res.data;
            setToken(access_token);
            config.headers.Authorization = `Bearer ${access_token}`;
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => cb(access_token));
            requests = []; // 重新请求完清空
            return instance(config);
          })
          .catch((err) => {
            console.log("抱歉，您的登录状态已失效，请重新登录！");
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token) => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(instance(config));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

// 给请求头添加 access_token
// 读取 localStorage或者cookie 里的 access_token 放到 header 里
const setHeaderToken = (isNeedToken) => {
  const accessToken = isNeedToken ? getToken() : null;
  if (isNeedToken) {
    // api 请求需要携带 access_token
    if (!accessToken) {
      console.log("不存在 access_token 则跳转回登录页");
    }
    instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  }
};

// 有些 api 并不需要用户授权使用，则无需携带 access_token；默认不携带，需要传则设置第三个参数为 true
export const get = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken);
  return instance({
    method: "get",
    url,
    params,
  });
};

export const post = (url, params = {}, isNeedToken = false) => {
  setHeaderToken(isNeedToken);
  return instance({
    method: "post",
    url,
    data: params,
  });
};
