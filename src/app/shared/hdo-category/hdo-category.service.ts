import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { THdoCategory } from "./hdo-category.types";

const apiUrl = 'https://snakk.holderdeord.no/api';

@Injectable()
export class HdoCategoryService {
  private _categories: Promise<THdoCategory[]>;

  constructor(private http: Http) {

  }

  public getList(): Promise<THdoCategory[]> {
    return this._categories || (this._categories = new Promise(resolve =>
      this.http.get(`${apiUrl}/hdo-categories/`)
        .subscribe(response => resolve(response.json()))));
  }

  // public getChatResponseForCategoryName(categoryName: string, voterGuide: VoterGuide): Promise<ChatResponse<any>> {
  //   const nextManuscript = voterGuide.getNextManuscript();
  //   return new Promise((resolve, reject) => this.quizService.getManuscripts().subscribe(manuscripts => {
  //     const matchedManuscripts = manuscripts
  //       .filter(manuscript =>
  //         manuscript.hdo_category === categoryName &&
  //         answeredManuscripts.indexOf(manuscript.pk) === -1);
  //     if (matchedManuscripts.length === 0) {
  //       return this.quizService.getDefaultVoterGuideManuscript()
  //         .then((defaultManuscript) => resolve(defaultManuscript));
  //     }
  //     const randomManuscript = this.randomService.getRandomFromList(matchedManuscripts);
  //     resolve(randomManuscript);
  //   }))
  //     .then((nextManuscript: TManuscript) => new ChatResponse(null, new Alternative(null, null, null, {
  //       next: nextManuscript.pk.toString()
  //     })));
  // }
  //
  // public getChatResponseForCategoryId(categoryId: number, answeredManuscripts: number[] = []): Promise<ChatResponse<any>> {
  //   return this.getList()
  //     .then(categories => {
  //       const category = categories.find(category => category.pk === categoryId);
  //       return this.getChatResponseForCategoryName(category.name, answeredManuscripts);
  //     });
  // }
}
