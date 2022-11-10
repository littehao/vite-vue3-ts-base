import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { BASE_URL, TIME_OUT } from './config'
  
const service = axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,  // 超时时间
  withCredentials: true,
  validateStatus: function (status) {
   return status >= 200 && status < 300; // 默认值
  },
});

// 定义接口
interface PendingType {
  url?: string;
  method?: Method | string;
  params: any;
  data: any;
  cancel: any;
}

// 取消重复请求
const pending: Array<PendingType> = [];
const CancelToken = axios.CancelToken;

// 移除重复请求
const removePending = (config: AxiosRequestConfig) => {
  for (const key in pending) {
    const item: number = +key;
    const list: PendingType = pending[key];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url && list.method === config.method && JSON.stringify(list.params) === JSON.stringify(config.params) && JSON.stringify(list.data) === JSON.stringify(config.data)) {
      // 执行取消操作
      list.cancel('操作太频繁，请稍后再试');
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePending(config);
    config.cancelToken = new CancelToken((c:any) => {
      pending.push(
        { 
          url: config.url, 
          method: config.method, 
          params: config.params, 
          data: config.data, 
          cancel: c 
        }
      );
    });
    // 添加请求头以及其他逻辑处理
    const token = localStorage.getItem('token')
    if(token && config.headers){
      config.headers.token = token
    }
    return config;
  },
  (error: any) => {
    Promise.resolve(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending( response.config );
    const res = response.data;
    // 后端status错误判断
    if ( res.code === 200 ) {
      return Promise.resolve(res.data);
    } else {
      // 错误状态码处理
      return Promise.reject(res.data);
    }
  },
  (error: any) => {
    // Http错误状态码处理
    return Promise.reject(error);
  }
);


export default service;

