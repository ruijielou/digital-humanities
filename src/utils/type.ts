
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