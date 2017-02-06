import { Chat } from '..'

export interface IChatMessage {
  type: any;
  resolve(callback: Function): void;
}
