import { TManuscript, TManuscriptItem } from "./manuscript.types";
import { ManuscriptEntryType } from "../manuscript-entry/manuscript-entry.types";
import { Chat } from "../chat/chat.class";
import { ChatUser } from "../chat/chat-user/chat-user.class";
import { QuestionFactory } from "../question/question.factory";
import { ChatResponse } from "../chat/chat-response/chat-response.class";

export class Manuscript {
  public responses: ChatResponse<any>[] = [];
  public done: Promise<Manuscript>;

  constructor(private manuscript: TManuscript, private questionFactory: QuestionFactory, private chat: Chat,
              private bot: ChatUser, private responder: ChatUser) {
    this.done = new Promise(resolve => this.parseManuscript(manuscript, manuscript.items).then(() => resolve(this)));
  }

  public getNextManuscriptUrl(): string {
    let lastResponse = this.responses.slice(-1)[0];
    if (lastResponse && lastResponse.answers) {
      let lastResponseAnswer = lastResponse.answers[0];
      if (lastResponseAnswer.links && lastResponseAnswer.links.next) {
        return lastResponseAnswer.links.next;
      }
    }
    if (this.manuscript.links && this.manuscript.links.next) {
      return this.manuscript.links.next;
    }
    return null;
  }

  private parseManuscript(manuscript: TManuscript, items: TManuscriptItem[]): Promise<any> {
    if (!items || items.length === 0) {
      return null;
    }
    const currentEntry = items.shift();
    return this.parseManuscriptEntry(manuscript, currentEntry)
      .then((response) => this.responses.push(response))
      .then(() => this.parseManuscript(manuscript, items));
  }

  private parseManuscriptEntry(manuscript: TManuscript, entry: TManuscriptItem): Promise<ChatResponse<any>> {
    switch (entry.type) {
      case ManuscriptEntryType.button:
        return this.chat.addButton(this.responder, entry.text);
      case ManuscriptEntryType.electoralGuide:
        return this.chat.addMessage(this.bot, entry.text);
      // case 'multiple':
      //   const multipleEntry: IManuscriptEntryMultiple = entry;
      //   promise = this.askMultipleQuestions(multipleEntry.texts, multipleEntry.alternatives)
      //     .then(response => response.answers.length > 0 ?
      //       this.chat.addMessage(this.bot, StringTools.interpolate(multipleEntry.texts.conclusion, {
      //         answers: response.answers
      //           .filter(answer => answer.value !== -1)
      //           .map(answer => answer.text)
      //           .join(', ')
      //       })) :
      //       this.chat.addMessage(this.bot, multipleEntry.texts.cancelConclusion));
      //   break;
      case ManuscriptEntryType.promises:
        this.chat.setImages(manuscript.images);
        const promiseQuestions = manuscript.promises.map(promise => this.questionFactory.createQuestionFromPromise(promise.body, promise.status === 'fulfilled'));
        return this.chat.askSingleSelectQuestions(this.bot, this.responder, promiseQuestions)
          .then((responses: ChatResponse<boolean>[]) => {
            const numberOfCorrectAnswers = responses.filter(response => response.wasCorrect).length;
            return this.chat.addMessage(this.bot, `Du fikk ${numberOfCorrectAnswers} av ${responses.length} riktige!`);
          });
      case ManuscriptEntryType.random:
        const randomQuestion = this.questionFactory.createQuestionsFromRandom(manuscript.random);
        return this.chat.askRandomQuestions(this.bot, this.responder, [randomQuestion], manuscript.random);
      case ManuscriptEntryType.text:
        return this.chat.addMessage(this.bot, entry.text);
      default:
        console.log('Håndterer ikke typen enda', entry.type);
    }
    return new Promise(resolve => resolve());
  }
}
