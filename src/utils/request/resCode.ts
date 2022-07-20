import { message } from 'antd';
import { removeUToken } from '../token';
import { history } from 'umi';

interface response {
  code: number;
  data: any;
  msg: string;
}
export function handleResCode(res: response) {
  // console.log('res.code=', res.code);
  if (res.code) {
    // 此处框架约定为2000，1为调试使用
    if (
      res.code + '' === '2000' ||
      res.code + '' === '1' ||
      res.code + '' === '200'
    ) {
      return res;
    } else {
      message.error({ content: res.msg, key: 'error' });
      return res;
    }
  }
}

export function handleHttpCode(response: Response) {
  // let errorMessage = '接口调用失败'
  switch (response.status) {
    case 401:
      removeUToken();
      setTimeout(() => {
        history.push('/user/login');
      }, 1000);
      break;
    case 403:
      //message.error('抱歉，无权访问该资源')
      console.log('抱歉，无权访问该资源');
      break;
    case 404:
      //message.error('抱歉，访问的资源不存在')
      console.log('抱歉，访问的资源不存在');
      break;
    case 500:
      //message.error('接口调用失败')
      console.log('接口调用失败');
      break;
    default:
      console.log(response);
      break;
  }
}
