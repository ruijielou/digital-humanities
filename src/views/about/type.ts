import type {BooleanStatus} from "@/utils/type";

export enum MessageType {
  Announ = 1,
  Verify = 2,
  All = ''
}
export interface MessageItemType {
    id: number;
    type: MessageType;
    createTime: string;
    content: string;
    isRead?: BooleanStatus;
    title: string;
  }
export interface CommentItemType {
    username: string;
    remark: string;
    caseName: string;
    userAvatar:string;
}