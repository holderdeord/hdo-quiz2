import { Chat, IChatUser, IChatMessage } from '..';

export class ChatEntry {
  public isWritingMessage: boolean = false;
  public messages: IChatMessage[] = [];

  constructor(public chat: Chat, public originUser: IChatUser) {}

  addMessage(message: IChatMessage): Promise<any> {
    return new Promise(resolve => {
      this.messages.push(message);
      message.resolve(resolve);
    });
  }
}
