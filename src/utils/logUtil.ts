import request from '@/utils/request/request';

/**
 * 新增日志
 * @param data 日志参数
 */
export async function addWebLog(data: any) {
  return request('/log/addLog', {
    method: 'post',
    data,
  });
}
