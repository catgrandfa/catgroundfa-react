declare namespace API {
  type SysLoginDto = {
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
  };
  type R = {
    message?: string;
    status?: number;
    data?: Record<string, any>;
  };
}
