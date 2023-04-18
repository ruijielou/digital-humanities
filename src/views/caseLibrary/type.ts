export interface Person {
  name: string;
  photo: string;
  id: string | number;
}

export interface CardType {
  id: number;
  caseId: number;
  lastCaseId: number;
  name: string;
  code?: string;
  caseName?: string;
  caseQuantity: number;
  lastCaseName: string;
  userAvatarList?: Person[];
  visitQuantity?: number;
  cover: string;
  lastCover: string;
  favoriteId?:string | number,
  title?:string

  // name: "交通运输",
  // caseQuantity: 11,
  // visitQuantity: 0,
  // userAvatarList: [],
  // caseId: 70,
  // lastCaseId: 70,
  // caseName: "商用车管控平台",
  // lastCaseName: "商用车管控平台",
  // cover: "temp/639_1680648689078.jpg",
  // lastCover: "temp/639_1680648689078.jpg",
}