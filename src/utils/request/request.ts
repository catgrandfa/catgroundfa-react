/** Request 网络请求工具 更详细的 api 文档: https://github.com/umijs/umi-request */
import { extend } from 'umi-request';
import type { RequestOptionsInit } from 'umi-request';
import { getUToken } from '@/utils/token';
import errorHttpHandler from './errorHandle';
import { handleResCode, handleHttpCode } from './resCode';

/** 配置request请求时的默认参数 */

const request = extend({
  prefix:
    //process.env.NODE_ENV === 'production' ? 'http://10.35.35.78:18001' : 'http://10.35.35.78:18001', // 监测开发环境
    process.env.NODE_ENV === 'production'
      ? 'http://127.0.0.1:3000'
      : 'http://127.0.0.1:3000', // 监测开发环境
  timeout: 20000, //请求超时时间
  middlewares: [],
  errorHttpHandler, // 默认错误处理
});

//添加请求头
request.interceptors.request.use(
  (url: string, options: RequestOptionsInit) => {
    const token = getUToken();
    const customHeaders = { 'x-token': token };
    return {
      url: `${url}`,
      options: { ...options, interceptors: true, headers: customHeaders }, // headers: authHeader 配置统一token使用
    };
  },
  { global: false },
);

// 响应后拦截
// eslint-disable-next-line @typescript-eslint/no-unused-vars
request.interceptors.response.use(
  async (response: Response, options: RequestOptionsInit) => {
    const responseType = options.responseType;
    // blob类型直接返回
    if (responseType === 'blob' && response.status == 200) {
      return response;
    }
    const data = await response.clone().json();
    handleResCode(data);
    handleHttpCode(response);
    return response;
  },
  { global: false },
);
export default request;
