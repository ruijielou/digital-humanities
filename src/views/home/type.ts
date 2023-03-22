export enum CategoryType {
    CaseLibrary, //案例库
    CaseSpectrum, //案例谱
    Visualization, //可视化
    About, //关于
}

export interface CategoryItem {
    name: string;
    label: string;
    type: number;
}

export interface LoginState {
    username: string;
    password: string;
}
