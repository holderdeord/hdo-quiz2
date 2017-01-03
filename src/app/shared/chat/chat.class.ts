import { EventEmitter } from '@angular/core';
import { ChatEvent, ChatMessageEntry, IChatEntry, IChatUser } from './index';

export class Chat {
  private _entries: IChatEntry[] = [];
  private _events: EventEmitter<ChatEvent> = new EventEmitter();
  private _participants: IChatUser[] = [];
  private _currentEntry: IChatEntry = null;

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
  }

  public addMessage(participant: IChatUser, message: string) {
    if (this._currentEntry && this._currentEntry.originUser === participant) {
      this._currentEntry.addMessage(message);
    } else {
      this._currentEntry = new ChatMessageEntry(participant, message);
      this._entries.push(this._currentEntry);
    }
    this._events.emit(new ChatEvent('new message'));
  }

  public addParticipant(participant: IChatUser) {
    this._participants.push(participant);
    this._events.emit(new ChatEvent('new participant'));
  }

  public get entries(): IChatEntry[] {
    return this._entries;
  }

  public get events(): EventEmitter<any> {
    return this._events;
  }

  public get participants(): IChatUser[] {
    return this._participants;
  }
}
