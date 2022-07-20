import { notification } from 'antd';
import { message } from 'antd';
import { removeUToken } from '../token';

const codeMessage: Record<number, string> = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '抱歉，无权访问该资源。',
  404: '抱歉，访问的资源不存在。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，接口调用失败。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

interface error {
  name: string;
  data: any;
  type: string;
  response: {
    status: number;
    message: string;
    url: string;
    msg?: string;
  };
}

/**
 * 异常处理程序
 */
// eslint-disable-next-line consistent-return
const errorHandler = (error: error) => {
  const { response } = error;
  return response;
};
export default errorHandler;
