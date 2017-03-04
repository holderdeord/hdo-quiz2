import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Quiz } from './quiz.class';
import { Question } from '../question/question.class';
import { Observable } from 'rxjs';

@Injectable()
export class QuizService {
  constructor(private http: Http) {

  }

  getManuscript(name: string): Observable<any> {
    return this.http.get(`/assets/mock-data/manuscript-${name}.json`)
      .map(response => response.json());
  }

  getStacks(): Observable<Quiz[]> {
    return this.http.get('/assets/mock-data/stacks.json')
      .map(res => res.json())
      .map(response => response.map(this.createStack));
  }

  getStack(id: number): Observable<Quiz> {
    return this.http.get('/assets/stacks.json')
      .map(res => res.json())
      .flatMap(response => {
        const stackData = response.filter(stack => stack.id === id);
        return stackData.length === 0 ? [null] : stackData;
      })
      .map(stackData => stackData ? this.createStack(stackData) : null);
  }

  private createStack(stackData: any): Quiz {
    const stack = new Quiz(stackData.id, stackData.name);
    stackData.promises.forEach(promiseData => {
      stack.addQuestion(new Question(promiseData.text, promiseData.answer));
    });
    return stack;
  }
}
