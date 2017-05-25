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
  TManuscriptImage,
  TManuscriptPromiseStatus,
  Question,
  RandomSpecialAlternatives,
  ChatResponse,
  TManuscriptRandom
} from '../../shared';
import { TManuscriptRandomItem } from "../manuscript/manuscript.types";
import { TChatLog, TChatLogTextEntry } from "./chat.types";

export class Chat {
  static DEFAULT_TIME_BEFORE_MESSAGE: number = 0;

  public events: EventEmitter<any> = new EventEmitter<any>();

  private _entries: ChatEntry[] = [];
  private _participants: IChatUser[] = [];
  private _currentEntry: ChatEntry = null;
  private _images: TManuscriptImage[] = [];

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

  public askMultipleSelectQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question<number>, response?: ChatResponse<number>): Promise<ChatResponse<number>> {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageButtons(this, question.alternatives));
      })
      .then(answer => {
        response = response || new ChatResponse(question);
        response.addAnswer(answer);
        return response;
      });
  }

  public askSingleSelectQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question<boolean>): Promise<ChatResponse<boolean>> {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageButtons(this, question.alternatives));
      })
      .then(answer => new ChatResponse(question, answer))
      .then(response => this.showAnswer(quizMaster, response))
      .then(response => {
        const buttonText = response.wasCorrect ? 'Jippi, gi meg neste spørsmål!' : 'Æsj, la meg prøve igjen';
        return this.addButton(responder, buttonText)
          .then(() => response);
      });
  }

  public askOpenQuestion(quizMaster: IChatUser, responder: IChatUser, question: Question<any>): Promise<ChatResponse<any>> {
    return this.addMessage(quizMaster, question.text)
      .then(() => {
        const entry = this.getOrCreateEntry(responder);
        return entry.addMessage(new ChatMessageButtons(this, question.alternatives))
      })
      .then((answer: Alternative<any>) => {
        console.log(answer.links);
        return new ChatResponse(question, answer)
      });
  }

  public askRandomQuestions(quizMaster: IChatUser, responder: IChatUser, questions: Question<TManuscriptRandomItem>[], randomManuscript: TManuscriptRandom): Promise<ChatResponse<TManuscriptRandomItem>> {
    const question = questions.shift();
    return this.askOpenQuestion(quizMaster, responder, question)
      .then((response: ChatResponse<TManuscriptRandomItem>) => {
        switch (response.answers[0].value.id) {
          case RandomSpecialAlternatives.ShowMeMore:
            return this.askRandomQuestions(quizMaster, responder, questions, randomManuscript);
          case RandomSpecialAlternatives.NoneAreInteresting:
            let alternative = new Alternative<TManuscriptRandomItem>({
              id: RandomSpecialAlternatives.NoneAreInteresting,
              text: randomManuscript.texts.end
            }, randomManuscript.texts.end);
            return new ChatResponse<TManuscriptRandomItem>(question, alternative)
        }
        return response;
      });
  }

  public askSingleSelectQuestions(quizMaster: IChatUser, responder: IChatUser, questions: Question<boolean>[], responses: ChatResponse<boolean>[] = []): Promise<ChatResponse<boolean>[]> {
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

  private getPicturesForStatus(images: TManuscriptImage[], status: TManuscriptPromiseStatus): string[] {
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

  public removeLastEntry(): void {
    this._entries.pop();
  }

  public setImages(images: TManuscriptImage[]) {
    this._images = images;
  }

  private showAnswer(quizMaster: IChatUser, response: ChatResponse<boolean>): Promise<any> {
    const entry = this.getOrCreateEntry(quizMaster);
    let images = this.getPicturesForStatus(this._images, response.wasCorrect ? 'fulfilled' : 'broken');
    const image = this.getRandomPicture(images);
    return entry.addMessage(new ChatMessageAnswer(response.wasCorrect, image))
      .then(() => response);
  }

  public toJson(): TChatLog {
    return {
      entries: this.entries.reduce((memo: TChatLogTextEntry[], entry: ChatEntry) => {
        entry.messages.forEach(message => memo.push({
          bot: entry.originUser.isBot,
          text: message.toText()
        }));
        return memo;
      }, [])
    };
  }
}
