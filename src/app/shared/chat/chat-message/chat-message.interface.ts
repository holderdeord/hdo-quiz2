import { Chat } from '..'

export interface IChatMessage {
  chat: Chat;
  type: any;
  resolve(callback: Function): void;
}
