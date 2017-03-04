import { EventEmitter } from '@angular/core';
import {
  ChatEntry,
  ChatMessageAnswer,
  ChatMessageButtons,
  ChatMessageText,
  IChatUser
} from './index';
import {
  Alternative,
  IManuscriptImage,
  ManuscriptPromiseStatus,
  Question,
  Response
} from '../../shared';

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 0;

  public events: EventEmitter<any> = new EventEmitter<any>();

  private _entries: ChatEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: ChatEntry = null;
  private _images: IManuscriptImage[] = [];

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
  }

  public addButton(responder: IChatUser, buttonText: string): Promise<any> {
    const entry = this.getOrCreateEntry(responder);
    const alternative = new Alternative(null, buttonText);
    return entry.addMessage(new ChatMessageButtons(this, [alternative]));
  }

  public addMessage(participant: IChatUser, message: string, timeout: number = Chat.DEFAULT_TIME_BEFORE_MESSAGE): Promise<any> {
    const entry = this.getOrCreateEntry(participant);
    return entry.addMessage(new ChatMessageText(this, message, timeout));
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

  public addParticipant(participant: IChatUser): void {
    this._participants.push(participant);
  }

  public askMultipleSelectQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question, response?: Response): Promise<Response> {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageButtons(this, question.alternatives));
      })
      .then(answer => {
        response = response || new Response(question);
        response.addAnswer(answer);
        return response;
      });
  }

  public askSingleSelectQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question): Promise<Response> {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageButtons(this, question.alternatives));
      })
      .then(answer => new Response(question, answer))
      .then(response => this.showAnswer(quizMaster, response))
      .then(response => {
        const buttonText = response.wasCorrect ? 'Jippi, gi meg neste spørsmål!' : 'Æsj, la meg prøve igjen';
        return this.addButton(responder, buttonText)
          .then(() => response);
      });
  }

  public askSingleSelectQuestions(quizMaster: IChatUser, responder: IChatUser, questions: Question[], responses: Response[] = []): Promise<Response[]> {
    if (questions.length === 0) {
      return new Promise(resolve => resolve(responses));
    }
    const question = questions.shift();
    return this.askSingleSelectQuestion(quizMaster, responder, question)
      .then(response => {
        responses.push(response);
        return this.askSingleSelectQuestions(quizMaster, responder, questions, responses);
      });
  }

  public get entries(): ChatEntry[] {
    return this._entries;
  }

  private getRandomPicture(images: string[]): string {
    return images[Math.floor(Math.random() * images.length)];
  }

  private getPicturesForStatus(images: IManuscriptImage[], status: ManuscriptPromiseStatus): string[] {
    return images
      .filter(image => image.type === status)
      .map(image => image.url);
  }

  public get images(): string[] {
    return this._images.map(image => image.url);
  }

  public isInitiator(user: IChatUser): boolean {
    return this._subjectUser === user;
  }

  public get participants(): IChatUser[] {
    return this._participants;
  }

  private getOrCreateEntry(participant: IChatUser): ChatEntry {
    if (!this._currentEntry || this._currentEntry.originUser !== participant) {
      this._currentEntry = new ChatEntry(this, participant);
      this._entries.push(this._currentEntry);
    }
    return this._currentEntry;
  }

  public setImages(images: IManuscriptImage[]) {
    this._images = images;
  }

  private showAnswer(quizMaster: IChatUser, response: Response): Promise<any> {
    const entry = this.getOrCreateEntry(quizMaster);
    let images = this.getPicturesForStatus(this._images, response.wasCorrect ? 'fulfilled' : 'broken');
    const image = this.getRandomPicture(images);
    return entry.addMessage(new ChatMessageAnswer(response.wasCorrect, image))
      .then(() => response);
  }
}
