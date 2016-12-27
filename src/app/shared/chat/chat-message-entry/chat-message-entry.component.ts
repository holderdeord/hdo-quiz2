import { Component } from '@angular/core';
import { IChatEntry } from '../chat-entry';

@Component({
  selector: 'hdo-chat-message-entry',
  styles: [`${require('!raw!sass!./chat-message-entry.scss')}`],
  template: require('./chat-message-entry.html')
})
export class ChatMessageEntryComponent {
  constructor() {
  }

  ngOnInit() {
  }
}
