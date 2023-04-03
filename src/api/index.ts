import { request } from "@/utils/request";
import type {UserInfo} from "@/utils/type"

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
  },
  insert: (data: any) => {
    return request(
      {
        url: `/app/user/repository/insert`,
        method: "post",
        data
      },
    );
  },
}

// {{URL}}/app/user/dhuuser/findUserInfo

export const dhuuser = {
  findUserInfo: () => {
    return request(
      {
        url: `/app/user/dhuuser/findUserInfo`,
        method: "get",
      },
    );
  },
  update: (data: UserInfo) => {
    return request(
      {
        url: `/app/user/dhuuser/update`,
        method: "post",
        data,
      },
    );
  },
  // {{URL}}/app/user/dhuuser/updateAuth
  updateAuth: (data: UserInfo) => {
    return request(
      {
        url: `/app/user/dhuuser/updateAuth`,
        method: "post",
        data,
      },
    );
  },
  // {{URL}}/app/user/dhuuser/update
}
// {{URL}}/app/user/announcement/myPage
export const announcement = {
  myPage: () => {
    return request(
      {
        url: `/app/user/announcement/myPage`,
        method: "get",
      },
    );
  },
  // {{URL}}/app/user/announcement/updateRead?id=20
  updateRead: (id: number) => {
    return request(
      {
        url: `/app/user/announcement/updateRead?id=${id}`,
        method: "get",
      },
    );
  },
}
// {{URL}}/app/user/comment/myPage
export const comment = {
  myPage: () => {
    return request(
      {
        url: `/app/user/comment/myPage`,
        method: "get",
      },
    );
  },
  insert: (data: any) => {
    return request(
      {
        url: `/app/user/comment/insert`,
        method: "post",
        data
      },
    );
  },
}

// {{URL}}/app/user/favorite/myPage?type=2
export const favorite = {
  myPage: (type: number) => {
    return request(
      {
        url: `/app/user/favorite/myPage?type${type}`,
        method: "get",
      },
    );
  },
  insert: (data: any) => {
    return request(
      {
        url: `/app/user/favorite/insert`,
        method: "post",
        data
      },
    );
  },
}

// {{URL}}/app/user/favoritegroup/myPage
export const favoritegroup = {
  myPage: () => {
    return request(
      {
        url: `/app/user/favoritegroup/myPage`,
        method: "get",
      },
    );
  },
  // {{URL}}/app/user/favorite/myPage?type=1
}
// app/user/repository/insert
