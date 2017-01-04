import { ChatMessageEntry, IChatEntry, IChatUser } from './index';

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 2000;

  private _entries: ChatMessageEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: ChatMessageEntry = null;

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
  }

  public addMessage(participant: IChatUser, message: string, timeout?: number): Promise<any> {
    if (!this._currentEntry || this._currentEntry.originUser !== participant) {
      this._currentEntry = new ChatMessageEntry(participant);
      this._entries.push(this._currentEntry);
    }
    timeout = timeout !== undefined ? timeout : participant === this._subjectUser ? 0 : Chat.DEFAULT_TIME_BEFORE_MESSAGE;
    return this._currentEntry.addMessage(message, timeout);
  }

  public addMessages(participant: IChatUser, messages: string[], timeout?: number): Promise<any> {
    if (messages.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentMessage = messages.shift();
    return this.addMessage(participant, currentMessage, timeout || Chat.DEFAULT_TIME_BEFORE_MESSAGE).then(() => {
      return this.addMessages(participant, messages);
    });
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
