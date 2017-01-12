import { IChatMessage, ChatMessageTextComponent } from '..';

export class ChatMessageText implements IChatMessage {
  public type = ChatMessageTextComponent;

  constructor(public message: string) {}
}