import { Injectable } from '@angular/core';
import { Alternative, Question } from '..';

@Injectable()
export class QuestionFactory {
  public createQuestionFromPromise(kept: string, answer: boolean): Question {
    const question = new Question(kept, answer);
    question.addAlternative(new Alternative(true, 'Holdt', 'btn btn-success'));
    question.addAlternative(new Alternative(false, 'Ikke holdt', 'btn btn-danger'));
    return question;
  }

  public createOpenQuestion(text: string, alternatives: any[]): Question {
    const question = new Question(text, null);
    // alternatives
    return question;
  }
}