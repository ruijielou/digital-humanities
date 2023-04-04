export interface Person {
  name: string;
  photo: string;
  id: string | number;
}

export interface CardType {
  id: number;
  title: string;
  code?: string;
  caseNumber: number;
  recentUpdates: string;
  comments?: Person[];
  viewsNumber?: number;
  image: string;
}