import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class ChatService {
  entries: EventEmitter<any> = new EventEmitter();


  constructor() {
    // setTimeout(() => this.entries.emit({ type: ChatMessageEntryComponent }), 1000);
  }


}
