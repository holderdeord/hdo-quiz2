import { EventEmitter } from '@angular/core';
import { ChatEntry, ChatMessageAnswer, ChatMessageButtons, ChatMessageQuestion, ChatMessageText, IChatUser } from './index';
import { Alternative, Question, Response } from '../../shared';

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 0;

  public events: EventEmitter<any> = new EventEmitter<any>();

  private _entries: ChatEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: ChatEntry = null;
  private _images: {correct: string[], wrong: string[]};

  constructor(private _subjectUser: IChatUser) {
    this._participants.push(_subjectUser);
    this._images = {correct: [], wrong: []};
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

  public askQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question): Promise<Response> {
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

  public askQuestions(quizMaster: IChatUser, responder: IChatUser, questions: Question[], responses: Response[] = []): Promise<Response[]> {
    if (questions.length === 0) {
      return new Promise(resolve => resolve(responses));
    }
    const question = questions.shift();
    return this.askQuestion(quizMaster, responder, question)
      .then(response => {
        responses.push(response);
        return this.askQuestions(quizMaster, responder, questions, responses);
      });
  }

  public get entries(): ChatEntry[] {
    return this._entries;
  }

  private getRandomPicture(images: string[]): string {
    return images[Math.floor(Math.random() * images.length)];
  }


  public get images(): string[] {
    return this._images.correct.concat(this._images.wrong);
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

  public setImages(images: {correct, wrong}) {
    this._images = images;
  }

  private showAnswer(quizMaster: IChatUser, response: Response): Promise<any> {
    const entry = this.getOrCreateEntry(quizMaster);
    const image = this.getRandomPicture(response.wasCorrect ? this._images.correct : this._images.wrong);
    return entry.addMessage(new ChatMessageAnswer(response.wasCorrect, image))
      .then(() => response);
  }
}
