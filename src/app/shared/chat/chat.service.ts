import { EventEmitter, Injectable } from '@angular/core';
import { IChatEntry, ChatMessageEntryComponent } from './';
import { ChatParticipant } from './chat-participant';

@Injectable()
export class ChatService {
  entries: EventEmitter<any> = new EventEmitter();


  constructor() {
    setTimeout(() => this.entries.emit({ type: ChatMessageEntryComponent }), 1000);
  }


}