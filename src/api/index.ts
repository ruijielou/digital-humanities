import { request } from "@/utils/request";

/**
 * @description 通过用户名登录
 * @returns Promise
 * @param {username, password}
 */
export function LoginByUser <T extends Record<string, any>>(data:T) {
  return request(
    {
      url: "/api/LoginByUser",
      method: "post",
      data,
    },
  );
}