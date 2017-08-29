import { Injectable } from "@angular/core";
import { QuizService } from "../quiz/quiz.service";
import { VoterGuide } from "./voter-guide.class";
import { HdoCategoryService } from "../hdo-category/hdo-category.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { VoterGuideData } from "./voter-guide.types";

@Injectable()
export class VoterGuideFactory {
  constructor(private quizService: QuizService,
              private hdoCategoryService: HdoCategoryService,
              private localStorageService: LocalStorageService) {

  }

  public create(manuscriptId: number): Promise<VoterGuide> {
    const localStorage = this.localStorageService.setupStorage('voterGuide');
    const data: VoterGuideData = localStorage.get();
    if (data) {
      return new Promise(resolve => resolve(new VoterGuide(
        localStorage,
        manuscriptId,
        data.manuscripts,
        data.categories,
        data.answers,
        data.completedManuscripts
      )))
    }
    return Promise
      .all([
        new Promise(resolve => this.quizService.getManuscripts().subscribe(list => resolve(list))),
        this.hdoCategoryService.getList()
      ])
      .then((results: any[]) => new VoterGuide(localStorage, manuscriptId, results[0], results[1]));
  }
}