import { request } from "@/utils/request";
import type { UserInfo } from "@/utils/type"
import type { MessageType } from "@/views/about/type"

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

export const repository = {
  myPage: () => {
    return request(
      {
        url: `/app/user/repository/myPage`,
        method: "get",
      },
    );
  },
  page: (query: string) => {
    return request(
      {
        url: `/app/common/repository/page?${query}`,
        method: "get",
      },
    );
  },
  findRepositoryGroupIndex: () => {
    return request(
      {
        url: `/app/common/repository/findRepositoryGroupIndex`,
        method: "get",
      },
    );
  },
  suggest: () => {
    return request(
      {
        url: `/app/common/repository/suggest`,
        method: "get",
      },
    );
  },
  queryById: (id: any) => {
    return request(
      {
        url: `/app/common/repository/queryById?id=${id}`,
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
  myPage: (type?: MessageType) => {
    return request(
      {
        url: `/app/user/announcement/myPage?type=${type}&column=createTime&order=desc`,
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
  myPage: (query?:string) => {
    return request(
      {
        url: `/app/user/comment/myPage?${query || ''}&column=createTime&order=desc`,
        method: "get",
      },
    );
  },
  // {{URL}}/app/user/comment/del?id=2
  del: (id: number) => {
    return request(
      {
        url: `/app/user/comment/del?id=${id}`,
        method: "get",
      },
    );
  },
  page: (id: string) => {
    return request(
      {
        url: `/app/common/comment/page?contentId=${id}`,
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
  myPage: (type: number, groupId:any) => {
    let url = '';
    if(groupId){
      url = `/app/user/favorite/myPage?type=${type}&groupId=${groupId}`;
    }else{
      url = `/app/user/favorite/myPage?type=${type}`;
    }

    return request(
      {
        url: url,
        method: "get",
      },
    );
  },
  findFavoStatus: (id: string | number) => {
    return request(
      {
        url: `/app/common/favorite/findFavoStatus?contentId=${id}`,
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
  del: (data: any) => {
    return request(
      {
        url: `/app/user/favorite/del`,
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
  page: () => {
    return request(
      {
        url: `/app/common/favoritegroup/page`,
        method: "get",
      },
    );
  },
  insert: (data: {authType: number,title: string}) => {
    return request(
      {
        url: `/app/user/favoritegroup/insert`,
        method: "post",
        data
      },
    );
  },
}

export const repositorygroup = {
  list: () => {
    return request(
      {
        url: `/app/common/repositorygroup/list`,
        method: "get",
      },
    );
  },
  findList: () => {
    return request(
      {
        url: `/app/common/repositorygroup/findList`,
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
  findViewDetail: (id: string) => {
    return request(
      {
        url: `/app/common/case/findViewDetail?id=${id}`,
        method: "get",
      },
    );
  },
  findDetail: (id: string) => {
    return request(
      {
        url: `/app/common/case/findDetail?id=${id}`,
        method: "get",
      },
    );
  },
}

// @ts-ignore
export const caseinfo = {
  page: (data?:any) => {
    return request(
      {
        url: `/app/common/caseinfo/page`,
        method: "get",
        params: data
      },
    );
  },
  myPage: (query?:string) => {
    return request(
      {
        url: `/app/user/caseinfo/myPage?${query}`,
        method: "get",
      },
    );
  },
 }

export const meta = {
  findSearchCondition: () => {
    return request(
      {
        url: `/app/common/meta/findSearchCondition`,
        method: "get",
      },
    );
  },
  findFormListGroup: (ids: string) => {
    return request(
      {
        url: `/app/common/meta/findFormListGroup?repositoryIds=${ids}`,
        method: "get",
      },
    );
  },
 }

export const labgroup = {
  loadList: () => {
    return request(
      {
        url: `/app/common/labgroup/loadList`,
        method: "get",
      },
    );
  },
 }

export const caseLocation = {
  list: () => {
    return request(
      {
        url: `/app/common/caselocation/list`,
        method: "get",
        params:{}
      },
    );
  },
 }

//  {{URL}}/app/user/favorite/findFavoStatus?contentId=80