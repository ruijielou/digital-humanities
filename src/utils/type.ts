
export interface CategoryItem {
  name: string;
  label: string;
  type: number;
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
}
export const categoryList: CategoryItem[] = [
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

export const Colors = ['#9292F5', '#C987FA', '#F5A95D', '#26D7BF', '#AF90F0', '#D852FA', '#FA836F', '#4383FA', '#5B3DF2', '#5B3DF2', '#F243D9', '#5B3DF2']