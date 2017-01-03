import { IChatUser } from '..';

export interface IChatEntry {
  originUser: IChatUser;
  type: any;
  addMessage(message: string): void;
}
