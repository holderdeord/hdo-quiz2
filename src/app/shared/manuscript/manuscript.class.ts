import { TManuscript, TManuscriptItem, TManuscriptRandomItem } from "./manuscript.types";
import { ManuscriptEntryType } from "../manuscript-entry/manuscript-entry.types";
import { Chat } from "../chat/chat.class";
import { ChatUser } from "../chat/chat-user/chat-user.class";
import { RandomSpecialAlternatives } from "../random/random.enums";
import { QuestionFactory } from "../question/question.factory";
import { ChatResponse } from "../chat/chat-response/chat-response.class";

export class Manuscript {
  public responses: ChatResponse<any>[] = [];

  constructor(private manuscript: TManuscript, private questionFactory: QuestionFactory, private chat: Chat,
              private bot: ChatUser, private responder: ChatUser, private onParsed: Function) {
    this.parseManuscript(manuscript, manuscript.items);
  }

  private parseManuscript(manuscript: TManuscript, items: TManuscriptItem[]): Promise<any> {
    if (!items || items.length === 0) {
      return this.onParsed(this, this.responses.slice(-1)[0]);
    }
    const currentEntry = items.shift();
    return this.parseManuscriptEntry(manuscript, currentEntry)
      .then((response) => this.responses.push(response))
      .then(() => this.parseManuscript(manuscript, items));
  }

  private parseManuscriptEntry(manuscript: TManuscript, entry: TManuscriptItem): Promise<any> {
    switch (entry.type) {
      case ManuscriptEntryType.button:
        return this.chat.addButton(this.responder, entry.text);
      case ManuscriptEntryType.electoralGuide:
        return this.chat.addMessage(this.responder, entry.text);
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
        return this.chat.askRandomQuestions(this.bot, this.responder, [randomQuestion], manuscript.random)
          .then((response: ChatResponse<TManuscriptRandomItem>) => {
            let responseValue = response.answers[0].value;
            return responseValue.id === RandomSpecialAlternatives.NoneAreInteresting ?
              manuscript.random.links.next :
              responseValue.links ?
                responseValue.links.next :
                manuscript.random.links.next;
          });
      case ManuscriptEntryType.text:
        return this.chat.addMessage(this.bot, entry.text);
      default:
        console.log('Håndterer ikke typen enda', entry.type);
    }
    return new Promise(resolve => resolve());
  }
}
