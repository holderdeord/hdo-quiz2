import { ChatMessageEntryComponent, IChatEntry, IChatUser } from '../';

export class ChatMessageEntry implements IChatEntry {
  type: any = ChatMessageEntryComponent;
  messages: string[];

  constructor(public originUser: IChatUser, firstMessage: string) {
    this.messages = [firstMessage];
  }

  addMessage(message: string): void {
    this.messages.push(message);
  }
}
