import { Injectable } from '@angular/core';
import {
  Alternative,
  IManuscriptEntryMultipleAlternativeEntry,
  Question
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

  public createOpenQuestion(text: string, alternatives: any[]): Question {
    const question = new Question(text, null);
    alternatives.forEach(data => {
      const alternative = new Alternative(data.value, data.text, data.className || 'btn');
      question.addAlternative(alternative);
    });
    return question;
  }
}
