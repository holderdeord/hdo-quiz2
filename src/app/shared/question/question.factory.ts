import { Injectable } from '@angular/core';
import { Alternative, Question } from '..';

@Injectable()
export class QuestionFactory {
  public createPromiseQuestion(kept: string, answer: boolean): Question {
    const question = new Question(kept, answer);
    question.addAlternative(new Alternative(true, 'Holdt'));
    question.addAlternative(new Alternative(false, 'Ikke holdt'));
    return question;
  }
}