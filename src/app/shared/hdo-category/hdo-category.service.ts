import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { THdoCategory } from "./hdo-category.types";
import { TManuscript } from "../manuscript/manuscript.types";
import { QuizService } from "../quiz/quiz.service";
import { RandomService } from "../random/random.service";

const apiUrl = 'https://snakk.holderdeord.no/api';

@Injectable()
export class HdoCategoryService {
  constructor(private http: Http,
              private quizService: QuizService,
              private randomService: RandomService) {

  }

  getList(): Promise<THdoCategory[]> {
    return new Promise(resolve =>
      this.http.get(`${apiUrl}/hdo-categories/`)
        .subscribe(response => resolve(response.json())));
  }

  getRandomManuscriptInCategory(categoryName: string): Promise<TManuscript> {
    return new Promise((resolve, reject) => this.quizService.getManuscripts().subscribe(manuscripts => {
      const matchedManuscripts = manuscripts
        .filter(manuscript => manuscript.hdo_category === categoryName);
      if (matchedManuscripts.length === 0) {
        return reject(`Found no matching manuscripts for category ${categoryName}`);
      }
      const randomIndex = this.randomService.getRandomNumber(matchedManuscripts.length);
      resolve(matchedManuscripts[randomIndex]);
    }));
  }
}
