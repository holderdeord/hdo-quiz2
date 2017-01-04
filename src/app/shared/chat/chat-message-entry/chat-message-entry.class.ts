import { ChatMessageEntryComponent, IChatEntry, IChatUser } from '../';

export class ChatMessageEntry implements IChatEntry {
  isWritingMessage: boolean = false;
  messages: string[] = [];
  type: any = ChatMessageEntryComponent;

  constructor(public originUser: IChatUser) {
  }

  addMessage(message: string, timeout?: number): Promise<any> {
    this.isWritingMessage = true;
    timeout = timeout || 0;
    return new Promise(resolve => {
      if (timeout === 0) {
        return this.pushMessage(message, resolve);
      }
      setTimeout(() => this.pushMessage(message, resolve), timeout);
    });
  }

  private pushMessage(message: string, resolve: Function) {
    this.messages.push(message);
    this.isWritingMessage = false;
    resolve();
  }
}
