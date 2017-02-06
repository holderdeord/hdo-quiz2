import { ChatEntry, ChatMessageButtons, ChatMessageQuestion, ChatMessageText, IChatUser } from './index';
import { Alternative, Question } from '../../shared';

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 0;

  private _entries: ChatEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: ChatEntry = null;

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
  }

  public addButton(responder: IChatUser, buttonText: string): Promise<any> {
    const entry = this.getOrCreateEntry(responder);
    const alternative = new Alternative(null, buttonText);
    return entry.addMessage(new ChatMessageButtons([alternative]));
  }

  public addMessage(participant: IChatUser, message: string, timeout: number = Chat.DEFAULT_TIME_BEFORE_MESSAGE): Promise<any> {
    const entry = this.getOrCreateEntry(participant);
    return entry.addMessage(new ChatMessageText(message, timeout));
  }

  public addMessages(participant: IChatUser, messages: string[], timeout?: number): Promise<any> {
    if (messages.length === 0) {
      return new Promise(resolve => resolve());
    }
    const currentMessage = messages.shift();
    return this.addMessage(participant, currentMessage, timeout).then(() => {
      return this.addMessages(participant, messages);
    });
  }

  public addQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question) {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageQuestion(question))
      });
  }

  public addParticipant(participant: IChatUser) {
    this._participants.push(participant);
  }

  public get entries(): ChatEntry[] {
    return this._entries;
  }

  public get participants(): IChatUser[] {
    return this._participants;
  }

  private getOrCreateEntry(participant: IChatUser) {
    if (!this._currentEntry || this._currentEntry.originUser !== participant) {
      this._currentEntry = new ChatEntry(participant);
      this._entries.push(this._currentEntry);
    }
    return this._currentEntry;
  }
}
