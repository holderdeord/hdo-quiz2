import { Component } from '@angular/core';
import { ChatMessageAnswer } from '.';

@Component({
  selector: 'hdo-chat-message-answer',
  styles: [`${require('!raw!sass!./chat-message-answer.scss')}`],
  template: require('./chat-message-answer.html')
})
export class ChatMessageAnswerComponent {
  public data: ChatMessageAnswer;

  constructor() {
  }
}
