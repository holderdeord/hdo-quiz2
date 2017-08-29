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

  getNextManuscriptInCategoryName(categoryName: string, answeredManuscripts: number[] = []): Promise<TManuscript> {
    return new Promise((resolve, reject) => this.quizService.getManuscripts().subscribe(manuscripts => {
      const matchedManuscripts = manuscripts
        .filter(manuscript =>
          manuscript.hdo_category === categoryName &&
          answeredManuscripts.indexOf(manuscript.pk) === -1);
      if (matchedManuscripts.length === 0) {
        return this.quizService.getDefaultVoterGuideManuscript()
          .then(defaultManuscript => resolve(defaultManuscript));
      }
      const randomManuscript = this.randomService.getRandomFromList(matchedManuscripts);
      resolve(randomManuscript);
    }));
  }

  getNextManuscriptInCategoryId(categoryId: number, answeredManuscripts: number[] = []): Promise<TManuscript> {
    return this.getList()
      .then(categories => {
        const category = categories.find(category => category.pk === categoryId);
        return this.getNextManuscriptInCategoryName(category.name, answeredManuscripts);
      });
  }
}
