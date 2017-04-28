import { Injectable } from '@angular/core';
import {
  Alternative,
  IManuscriptEntryMultipleAlternativeEntry,
  IManuscriptRandom,
  IManuscriptRandomItem,
  Question,
  RandomSpecialAlternatives
} from '..';

@Injectable()
export class QuestionFactory {
  public createQuestionFromPromise(text: string, answer: boolean): Question {
    const question = new Question(text, answer);
    question.addAlternative(new Alternative(true, 'Holdt', 'btn btn-success'));
    question.addAlternative(new Alternative(false, 'Ikke holdt', 'btn btn-danger'));
    return question;
  }

  public createQuestionFromMultiple(text: string, alternatives: IManuscriptEntryMultipleAlternativeEntry[]) {
    const question = new Question(text, null);
    alternatives.forEach(data => {
      question.addAlternative(new Alternative(data.id, data.text));
    });
    return question;
  }

  public createQuestionFromRandom(text: string, random: IManuscriptRandom, items: IManuscriptRandomItem[]): Question {
    const question = new Question(text, null);
    const selection = [];
    while (selection.length < random.selection && items.length > 0) {
      const index = Math.floor(Math.random()*items.length);
      const item = items.splice(index, 1);
      selection.push(item[0]);
    }
    selection.forEach(item => question.addAlternative(new Alternative(item.id, item.text, 'btn btn-primary')));
    question.addAlternative(items.length > 0 ?
      new Alternative(RandomSpecialAlternatives.ShowMeMore, random.texts.more, 'btn') :
      new Alternative(RandomSpecialAlternatives.NoneAreInteresting, random.texts.end, 'btn'));
    return question;
  }

  public createQuestionsFromRandom(random: IManuscriptRandom): Question[] {
    const items = [...random.items];
    const questions = [this.createQuestionFromRandom(random.texts.introduction, random, items)];
    while (items.length > 0) {
      questions.push(this.createQuestionFromRandom(random.texts.followup, random, items))
    }
    return questions;
  }

  public createOpenQuestion(text: string, alternatives: any[]): Question {
    const question = new Question(text, null);
    alternatives.forEach(data => {
      const alternative = new Alternative(data.value, data.text, data.className || 'btn');
      question.addAlternative(alternative);
    });
    return question;
  }
}
