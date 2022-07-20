import { getDecrypt } from '@/utils/encrypt';
import { getUToken } from '@/utils/token';
import { message } from 'antd';
import { history } from 'umi';
import { extend } from 'umi-request';

const errorCodeMessage: Record<number, string> = {
  5000: '服务器内部异常,请联系管理员',
  5001: '该登录账号已存在!',
  5002: '该手机号已注册,请联系管理员',
  5003: '密码已过期,请联系管理员',
  5004: '验证码错误',
  5005: '用户名或密码错误',
};
/** 异常处理程序 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    if (response.status === 401) {
      message.error('您的登录已失效,请重新登录', 1);
      history.push('/user/login');
      localStorage.clear(); //跳到登录页时需要将存储在本地的信息全部清除掉
    }
    if (response.status === 403) {
      message.error('您无权访问该资源', 1);
    }
    if (response.status === 404) {
      message.error('您访问的资源不存在', 1);
    }
  } else if (!response) {
    message.error('您的网络发生异常，无法连接服务器', 1);
  }

  return response; //reject出去之后使用时才可通过.catch对异常情况进行处理
};

/** 配置request请求时的默认参数 */
const request = extend({
  prefix: API_URL,
  timeout: 60000,
  errorHandler, // 默认错误处理
});

// request拦截器, 改变url 或 options.
request.interceptors.request.use((url: string, options: any) => {
  const token = getUToken(); //获取存储在本地的token
  const { headers = {} } = options || {};
  const tokenHeaders = {
    'x-token': token,
    ...headers,
  };
  if (token) {
    return {
      url,
      options: { ...options, interceptors: true, headers: tokenHeaders },
    };
  }
  return {
    url,
    options: { ...options },
  };
});

request.interceptors.response.use(async (response: any) => {
  const { status } = response;
  if (status === 200) {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    if (isJson === true) {
      const resp = response.clone();
      let data = await resp.json();
      if (typeof data === 'string') data = getDecrypt('AES', data, 'json');
      if (data) {
        const { code } = data;
        if (code && code !== 2000) {
          const msg =
            data.msg || errorCodeMessage[code] || errorCodeMessage[10000];
          message.error(`${msg}`);
        } else {
          return data;
        }
      }
    }
  } else {
    return response;
  }
});

export default request;
