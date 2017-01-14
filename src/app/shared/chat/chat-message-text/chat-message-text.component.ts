import { Component } from '@angular/core';
import { ChatMessageText } from '..';

@Component({
  selector: 'hdo-chat-message-text',
  template: require('./chat-message-text.html')
})
export class ChatMessageTextComponent {
  public data: ChatMessageText;

  constructor() {
  }
}
