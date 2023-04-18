
class Constant {
  code: number
  name: string
  desc: string

  constructor(code?: number, name?: string, desc?: string) {
    this.code = code || 0;
    this.name = name || '';
    this.desc = desc || '';
  }
}
export interface CategoryItem {
  name: string;
  label: string;
  type: number;
}

export enum BooleanStatus {
  True = 1,
  False = 2
}
export enum LikeStatus {
  Favorite = 1,
  Like = 2
}

export enum CategoryType {
  CaseLibrary, //案例库
  CaseSpectrum, //案例谱
  Visualization, //可视化
  About, //关于
}

export enum LoginTypeMap {
  Password = 1,
  Code = 2,
  Logon = 3,
  NewPassword = 4
}

export interface UserInfo {
  avatar?: string | null;
  code?: string;
  company?: string;
  id?: number;
  idNumber?: number | null;
  idType?: number | null;
  lastLoginTime?: string;
  phone?: string;
  professionField?: string | null;
  realName?: string | null;
  regTime?: string | null;
  researchField?: string | null;
  status?: number;
  username?: string;
}

export interface PageinationType {
  total: number;
  current: number;
  pageSize: number;
  column?: string;
  order?: string;
}
export const categoryList: CategoryItem[] = [
  {
    name: "home",
    label: "首页",
    type: 9,
  },
  {
    name: "CaseLibrary",
    label: "案例库",
    type: CategoryType.CaseLibrary,
  },
  {
    name: "CaseSpectrum",
    label: "案例谱",
    type: CategoryType.CaseSpectrum,
  },
  {
    name: "Visualization",
    label: "可视化",
    type: CategoryType.Visualization,
  },
  {
    name: "About",
    label: "关于",
    type: CategoryType.About,
  },
];

export const Colors = ['#9292F5', '#C987FA', '#F5A95D', '#26D7BF', '#AF90F0', '#D852FA', '#FA836F', '#4383FA', '#5B3DF2', '#5B3DF2', '#F243D9', '#5B3DF2'];

// metaList中 dataType:
// 1:单行文本, 2:多行文本, 3:日期时间, 4:数字, 5:单选, 6:多选, 7:下拉框, 8:地址, 9:图片, 10:手机号, 11:邮箱, 12:链接

// /app/user/repositorygroup/findAllFormInput?repositoryIds=17
// 合并之后的接口,
// 参数传案例库id, 多个id用逗号隔开

export const AuthType = {
  /** 公开  */
  1: new Constant(1, "公开"),
  /** 仅自己看  */
  2: new Constant(2, "仅自己看"),
  /** 默认字段  */
  3: new Constant(3, "默认字段"),
};