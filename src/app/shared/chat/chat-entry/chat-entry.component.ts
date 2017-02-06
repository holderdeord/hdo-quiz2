import { Component, Input } from '@angular/core';
import { ChatEntry } from '.';

@Component({
  selector: 'hdo-chat-entry',
  styles: [`${require('!raw!sass!./chat-entry.scss')}`],
  template: require('./chat-entry.html')
})
export class ChatEntryComponent {
  @Input() entry: ChatEntry;

  constructor() {
  }
}
