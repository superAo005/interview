import NProgress from "../helper/nprogress";
import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { AxiosCanceler } from "../helper/axiosCanceler";
const axiosInstance = axios.create({
  // baseURL: "http://10.17.17.58:8877/sso-server",
  baseURL: '',
  timeout: 60 * 1000,
});

/** 当前请求的配置 */
let currentConfig: AxiosRequestConfig = {};

/** 请求拦截器 */
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (AxiosCanceler.getInstance().hasPending(config)) {
      /** 返回一个问题config，阻止重复的请求流转到后端 */
      return { headers: config.headers };
    }
    /**开启进度条 */
    NProgress.start();
    // 将请求缓存起来，方便后续取消
    AxiosCanceler.getInstance().addPending(config);
    // 记录下当前的请求配置
    currentConfig = config;
    // Do something before request is sent
    return config;
  },
  (error: any) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

/** 响应拦截器 */
axiosInstance.interceptors.response.use(
  (response: any) => {
    /** 请求结束后移除进度条 */
    NProgress.done();
    //在请求结束后，移除本次请求
    AxiosCanceler.getInstance().removePending(currentConfig);
    return response.data;
  },
  (error: any) => {
    NProgress.done();
    /**
     * Any status codes that falls outside the range of 2xx cause this function to trigger
     * 任何超出2xx范围的状态码都会触发此函数
     * Do something with response error
     */
    return Promise.reject(error);
  }
);

export default axiosInstance;
