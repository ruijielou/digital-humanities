export interface MessageItemType {
    id: number;
    type: string;
    createTime: string;
    desc: string;
    isRead? :boolean;
  }
export interface CommentItemType {
    name: string;
    photo: string;
    casename: string;
    content:string;
}