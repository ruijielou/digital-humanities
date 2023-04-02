import { request } from "@/utils/request";

/**
 * @description 通过用户名登录
 * @returns Promise
 * @param {phone, password}
 */
// {{URL}}/app/common/login/login?phone=15680696883&password=123456
export function LoginByUser <T extends Record<string, any>>(data:T) {
  let url = `/app/common/login/login?phone=${data.phone}`;
  if(data.password) {
    url += `&password=${data.password}`
  }
  if(data.code) {
    url += `&code=${data.password}`
  }
  return request(
    {
      url,
      method: "get",
    },
  );
}
// {{URL}}/app/common/login/reg?phone=15680696883&code=7527&password=123456&pwdLevel=3
export function LoginReg <T extends Record<string, any>>(data:T) {
  return request(
    {
      url: `/app/common/login/reg?phone=${data.phone}&code=${data.code}&password=${data.password}`,
      method: "get",
    },
  );
}
// {{URL}}/app/common/login/updatePwdByPhone?phone={{USERNAME}}&code=4316&newPwd=123456
export function updatePwdByPhone <T extends Record<string, any>>(data:T) {
  return request(
    {
      url: `/app/common/login/updatePwdByPhone?phone=${data.phone}&code=${data.code}&newPwd=${data.password}`,
      method: "get",
    },
  );
}
// {{URL}}/app/common/dhuvalidcode/send?phone={{USERNAME}}&type=1
export function dhuvalidcode <T extends Record<string, any>>(data:T) {
  return request(
    {
      url: `/app/common/dhuvalidcode/send?phone=${data.username}&type=${data.type}`,
      method: "get",
    },
  );
}

// {{URL}}/app/user/repository/page
export const repository = {
  page: () => {
    return request(
      {
        url: `/app/user/repository/page`,
        method: "get",
      },
    );
  }
}