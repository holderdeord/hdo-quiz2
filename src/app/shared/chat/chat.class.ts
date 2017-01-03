import { ChatMessageEntry, IChatEntry, IChatUser } from './index';

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 2000;

  private _entries: IChatEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: IChatEntry = null;

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
  }

  public addMessage(participant: IChatUser, message: string, timeout?: number) {
    if (!this._currentEntry || this._currentEntry.originUser !== participant) {
      this._currentEntry = new ChatMessageEntry(participant);
      this._entries.push(this._currentEntry);
    }
    timeout = timeout !== undefined ? timeout : participant === this._subjectUser ? 0 : Chat.DEFAULT_TIME_BEFORE_MESSAGE;
    return this._currentEntry.addMessage(message, timeout);
  }

  public addParticipant(participant: IChatUser) {
    this._participants.push(participant);
  }

  public get entries(): IChatEntry[] {
    return this._entries;
  }

  public get participants(): IChatUser[] {
    return this._participants;
  }
}
