import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Quiz } from './quiz.class';
import { Question } from '../question/question.class';
import { Observable } from 'rxjs';
import { TManuscript } from "../manuscript/manuscript.types";

const apiUrl = 'http://localhost:8000/api';

@Injectable()
export class QuizService {
  private _manuscripts: Observable<TManuscript[]>;

  constructor(private http: Http) {

  }

  public getDefaultManuscript(): Promise<TManuscript> {
    return new Promise(resolve => this.getManuscripts()
      .subscribe(manuscripts => resolve(manuscripts.find(manuscript => manuscript.default === 'default'))));
  }

  public getManuscripts(): Observable<TManuscript[]> {
    // return this.http.get('http://hdo-quiz.herokuapp.com/api/manuscripts/')
    return this._manuscripts = (this._manuscripts = this.http.get('https://snakk.holderdeord.no/api/manuscripts/')
    // return this.http.get(`${apiUrl}/manuscripts`)
      .map(response => response.json()));
  }

  public getManuscript(manuscriptId: string): Promise<TManuscript> {
    const id = parseInt(manuscriptId, 10);
    return new Promise((resolve, reject) => {
      let manuscriptObservable: Observable<TManuscript>;
      if (isNaN(id)) {
        manuscriptObservable = this.getManuscriptByString(manuscriptId);
      } else {
        manuscriptObservable = this.getManuscriptById(id);
      }
      return manuscriptObservable.subscribe(manuscript => resolve(manuscript), error => reject(error));
    });
  }

  public getManuscriptById(id: number): Observable<TManuscript> {
    // return this.http.get(`http://localhost:8000/api/manuscripts/${id}/`)
    return this.http.get(`https://snakk.holderdeord.no/api/manuscripts/${id}/`)
    // return this.http.get(`${apiUrl}/manuscripts/${id}/`)
      .map(response => response.json());
  }

  public getManuscriptByString(name: string): Observable<TManuscript> {
    return this.http.get(`/assets/mock-data/manuscript-${name}.json`)
      .map(response => response.json());
  }

  public getStacks(): Observable<Quiz[]> {
    return this.http.get('/assets/mock-data/stacks.json')
      .map(res => res.json())
      .map(response => response.map(this.createStack));
  }

  public getStack(id: number): Observable<Quiz> {
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
