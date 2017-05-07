import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Quiz } from './quiz.class';
import { Question } from '../question/question.class';
import { Observable } from 'rxjs';
import {
  TManuscript,
  TManuscriptsItem
} from '..';

@Injectable()
export class QuizService {
  constructor(private http: Http) {

  }

  getManuscripts(): Observable<TManuscriptsItem[]> {
    return this.http.get('http://hdo-quiz.herokuapp.com/api/manuscripts/')
      .map(response => response.json());
  }

  getManuscript(manuscriptId): Promise<TManuscript> {
    const id = parseInt(manuscriptId, 10);
    return new Promise(resolve => {
      if (isNaN(id)) {
        return this.getManuscriptByString(manuscriptId).subscribe(manuscript => resolve(manuscript));
      } else {
        return this.getManuscriptById(id).subscribe(manuscript => resolve(manuscript));
      }
    });
  }

  getManuscriptById(id: number): Observable<TManuscript> {
    // return this.http.get(`http://localhost:8000/api/manuscripts/${id}/`)
    return this.http.get(`http://hdo-quiz.herokuapp.com/api/manuscripts/${id}/`)
      .map(response => response.json());
  }

  getManuscriptByString(name: string): Observable<TManuscript> {
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
