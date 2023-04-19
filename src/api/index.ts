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

export function LoginReg<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/login/reg?phone=${data.phone}&code=${data.code}&password=${data.password}`,
      method: "get",
    },
  );
}

export function updatePwdByPhone<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/login/updatePwdByPhone?phone=${data.phone}&code=${data.code}&newPwd=${data.password}`,
      method: "get",
    },
  );
}

export function dhuvalidcode<T extends Record<string, any>>(data: T) {
  return request(
    {
      url: `/app/common/dhuvalidcode/send?phone=${data.username}&type=${data.type}`,
      method: "get",
    },
  );
}

export function commonUpload(formData: any) {
  return request(
    {
      url: `/app/common/upload`,
      method: "post",
      data: formData,
    },
  );
}

export const repository = {
  del: (data: any) => {
    return request(
      {
        url: `/app/user/repository/del`,
        method: "post",
        data
      },
    );
  },
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
  // repository/update
  update: (data: any) => {
    return request(
      {
        url: `/app/user/repository/update`,
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
  myPage: (data: any) => {

    return request(
      {
        url: `/app/user/favorite/myPage`,
        method: "get",
        params: data
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
  myPage: (data?: any) => {
    return request(
      {
        url: `/app/user/favoritegroup/myPage`,
        method: "get",
        params: data
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
  del: (data:any) => {
    return request(
      {
        url: `/app/user/favoritegroup/del`,
        method: "post",
        data
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
  delBatch: (data: any) => {
    return request(
      {
        url: `/app/user/case/delBatch`,
        method: "post",
        data
      },
    );
  },
  transferRepository: (data: any) => {
    return request(
      {
        url: `/app/user/case/transferRepository`,
        method: "post",
        data
      },
    );
  },
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
  findTimeReport: () => {
    return request(
      {
        url: `/app/common/case/findTimeReport`,
        method: "get",
      },
    );
  },
  findCaseCharGraphDto: (id: string) => {
    return request(
      {
        url: `/app/common/case/findCaseCharGraphDto?id=${id}`,
        method: "get",
      },
    );
  },
  findCaseRelationCharGraphDto: () => {
    return request(
      {
        url: `/app/common/case/findCaseRelationCharGraphDto`,
        method: "get",
      },
    );
  },
  findThemeCharGraph: () => {
    return request(
      {
        url: `/app/common/case/findThemeCharGraph`,
        method: "get",
      },
    );
  },
  findCharSankey: () => {
    return request(
      {
        url: `/app/common/case/findCharSankey`,
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
  myPage: (data?:any) => {
    return request(
      {
        url: `/app/user/caseinfo/myPage`,
        method: "get",
        params: data
      },
    );
  },
 }

export const meta = {
  findSearchCondition: (data?:any) => {
    return request(
      {
        url: `/app/common/meta/findSearchCondition`,
        method: "get",
        params: data
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
  list: (data?:any) => {
    return request(
      {
        url: `/app/common/caselocation/list`,
        method: "get",
        params:data
      },
    );
  },
 }

//  {{URL}}/app/user/favorite/findFavoStatus?contentId=80