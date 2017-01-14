import { IChatMessage, ChatMessageTextComponent } from '..';

export class ChatMessageText implements IChatMessage {
  public type = ChatMessageTextComponent;
  public isWritingMessage: boolean = true;

  constructor(public message: string, public timeout: number = 0) {
  }

  public resolve(callback: Function) {
    setTimeout(() => {
      this.isWritingMessage = false;
      callback();
    }, this.timeout);
  }
}