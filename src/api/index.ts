import { request } from "@/utils/request";

/**
 * @description 通过用户名登录
 * @returns Promise
 * @param {phone, password}
 */
// {{URL}}/app/common/login/login?phone=15680696883&password=123456
export function LoginByUser <T extends Record<string, any>>(data:T) {
  return request(
    {
      url: `/app/common/login/login?phone=${data.username}&password=${data.password}`,
      method: "get",
      // data,
    },
  );
}