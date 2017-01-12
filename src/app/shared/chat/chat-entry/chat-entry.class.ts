import { IChatUser, IChatMessage } from '..';

export class ChatEntry {
  public isWritingMessage: boolean = false;
  public messages: IChatMessage[] = [];

  constructor(public originUser: IChatUser) {}

  addMessage(message: IChatMessage, timeout?: number): Promise<any> {
    this.isWritingMessage = true;
    timeout = timeout || 0;
    return new Promise(resolve => {
      if (timeout === 0) {
        return this.pushMessage(message, resolve);
      }
      setTimeout(() => this.pushMessage(message, resolve), timeout);
    });
  }

  private pushMessage(message: IChatMessage, resolve: Function) {
    this.messages.push(message);
    this.isWritingMessage = false;
    resolve();
  }
}
