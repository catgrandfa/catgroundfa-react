import { aes_decrypt } from '@/utils/utils';
import request from '@/utils/request';

/** 登录接口 POST /sys/login */
export async function login(
  body: API.SysLoginDto,
  options?: { [key: string]: any },
) {
  return request<API.R>('/sys/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 用户登出 GET /sys/loginOut */
export async function loginOut(options?: { [key: string]: any }) {
  return 200;
}
