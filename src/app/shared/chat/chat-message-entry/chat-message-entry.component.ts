import { Component } from '@angular/core';
import { ChatMessageEntry } from '../';

@Component({
  selector: 'hdo-chat-message-entry',
  styles: [`${require('!raw!sass!./chat-message-entry.scss')}`],
  template: require('./chat-message-entry.html')
})
export class ChatMessageEntryComponent {
  public data: ChatMessageEntry;

  constructor() {
  }
}
