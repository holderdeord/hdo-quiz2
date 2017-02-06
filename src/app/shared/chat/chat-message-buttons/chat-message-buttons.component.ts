import { Component } from '@angular/core';
import { ChatMessageButtons } from '.';
import { Alternative } from '../../../shared';

@Component({
  selector: 'hdo-chat-message-buttons',
  styles: [`${require('!raw!sass!./chat-message-buttons.scss')}`],
  template: require('./chat-message-buttons.html')
})
export class ChatMessageButtonsComponent {
  public data: ChatMessageButtons;

  constructor() {
  }

  answer(answer: Alternative) {
    this.data.answer = answer;
    this.data.giveAnswer(answer);
  }
}
