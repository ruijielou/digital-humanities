export interface Person {
  name: string;
  photo: string;
  id: string | number;
}

export interface CardType {
  title: string;
  code?: string;
  caseNumber: number;
  recentUpdates: string;
  comments?: Person[];
  viewsNumber: number;
  image: string;
}