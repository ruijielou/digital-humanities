import { request } from "@/utils/request";
import type { UserInfo } from "@/utils/type"

/**
 * @description 通过用户名登录
 * @returns Promise
 * @param {phone, password}
 */
// {{URL}}/app/common/login/login?phone=15680696883&password=123456
export function LoginByUser<T extends Record<string, any>>(data: T) {
  let url = `/app/common/login/login?phone=${data.phone}`;
  if (data.password) {
    url += `&password=${data.password}`
  }
  if (data.code) {
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
export function LoginReg<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/login/reg?phone=${data.phone}&code=${data.code}&password=${data.password}`,
      method: "get",
    },
  );
}
// {{URL}}/app/common/login/updatePwdByPhone?phone={{USERNAME}}&code=4316&newPwd=123456
export function updatePwdByPhone<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/login/updatePwdByPhone?phone=${data.phone}&code=${data.code}&newPwd=${data.password}`,
      method: "get",
    },
  );
}
// {{URL}}/app/common/dhuvalidcode/send?phone={{USERNAME}}&type=1
export function dhuvalidcode<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/dhuvalidcode/send?phone=${data.username}&type=${data.type}`,
      method: "get",
    },
  );
}
// sys/common/upload
export function commonUpload(formData: any) {
  return request(
    {
      url: `/app/common/upload`,
      // /app/common/upload
      method: "post",
      data: formData,
    },
  );
}


// {{URL}}/app/user/repository/page
// {{URL}}/app/user/repository/findRepositoryGroupIndex
export const repository = {
  page: () => {
    return request(
      {
        url: `/app/user/repository/page`,
        method: "get",
      },
    );
  },
  findRepositoryGroupIndex: () => {
    return request(
      {
        url: `/app/user/repository/findRepositoryGroupIndex`,
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
  page: (id: string) => {
    return request(
      {
        url: `/app/user/comment/page?contentId=${id}`,
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

export const favoritegroup = {
  myPage: () => {
    return request(
      {
        url: `/app/user/favoritegroup/myPage`,
        method: "get",
      },
    );
  },
}

export const repositorygroup = {
  findList: () => {
    return request(
      {
        url: `/app/user/repositorygroup/findList`,
        method: "get",
      },
    );
  },
  findAllFormInput: (ids: string) => {
    return request(
      {
        url: `/app/user/repositorygroup/findFormListGroup?repositoryIds=${ids}`,
        method: "get",
      },
    );
  },
}

export const caseApi = {
  add: (data: any) => {
    return request(
      {
        url: `/app/user/case/add`,
        method: "post",
        data
      },
    );
  },
  myPage: () => {
    return request(
      {
        url: `/app/user/case/myPage`,
        method: "get",
      },
    );
  },
  findDetail: (id: string) => {
    return request(
      {
        url: `/app/user/case/findViewDetail?id=${id}`,
        method: "get",
      },
    );
  },
}
// {{URL}}/app/user/repository/findRepositoryGroupIndex
// user/caseinfo/page
// {{URL}}/app/user/caseinfo/page?pageSize=10&current=2
export const caseinfo = {
  page: () => {
    return request(
      {
        url: `/app/user/caseinfo/page`,
        method: "get",
      },
    );
  },
 }