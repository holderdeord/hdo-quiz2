import { ChatMessageEntryComponent, IChatEntry, IChatUser } from '../';

export class ChatMessageEntry implements IChatEntry {
  isWritingMessage: boolean = false;
  messages: string[] = [];
  type: any = ChatMessageEntryComponent;

  constructor(public originUser: IChatUser) {
  }

  addMessage(message: string, timeout?: number): Promise<any> {
    this.isWritingMessage = true;
    return new Promise(resolve => {
      setTimeout(() => {
        this.messages.push(message);
        this.isWritingMessage = false;
        resolve();
      }, timeout || 0);
    });
  }
}
