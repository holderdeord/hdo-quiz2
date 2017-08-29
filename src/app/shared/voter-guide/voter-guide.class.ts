import { TManuscript, TManuscriptVoterGuideAlternative } from "../manuscript/manuscript.types";
import { THdoCategory } from "../hdo-category/hdo-category.types";
import { ChatResponse } from "../chat/chat-response/chat-response.class";
import { Alternative } from "../alternative/alternative.class";
import { RandomService } from "../random/random.service";
import { LocalStorage } from "../local-storage/local-storage.class";
import { VoterGuideData } from "./voter-guide.types";

export class VoterGuide {
  private currentManuscript: TManuscript;
  private currentCategory: string;

  constructor(private localStorage: LocalStorage,
              private currentManuscriptId: number,
              private manuscripts: TManuscript[],
              private categories: THdoCategory[],
              private answers: TManuscriptVoterGuideAlternative[] = [],
              private completedManuscripts: TManuscript[] = []) {
    this.currentManuscript = manuscripts.find(manuscript => manuscript.pk === currentManuscriptId);
    this.currentCategory = this.currentManuscript ?
      (this.currentManuscript.hdo_category || '').toString() :
      '';
  }

  public addAnswer(answer: TManuscriptVoterGuideAlternative, manuscript: TManuscript) {
    this.answers.push(answer);
    this.completedManuscripts.push(manuscript);
  }

  public getIdOfAnsweredManuscripts() {
    return this.completedManuscripts.map(manuscript => manuscript.pk);
  }

  public getChatResponseForNextManuscript(categoryName: string = this.currentCategory): ChatResponse<any> {
    const nextManuscript = this.getNextManuscript(categoryName);
    return new ChatResponse(null, new Alternative(null, null, null, {
      next: nextManuscript.pk.toString()
    }));
  }

  public getCategoryManuscript(): TManuscript {
    return this.manuscripts.find(manuscript => manuscript.default === 'default_vg');
  }

  public getCategories(): string[] {
    const answeredManuscripts = this.getIdOfAnsweredManuscripts();
    return this.manuscripts.filter(manuscript => !!manuscript.hdo_category)
      .filter(manuscript => answeredManuscripts.indexOf(manuscript.pk) === -1)
      .map(manuscript => manuscript.hdo_category.toString())
      .filter((value, index, self) => self.indexOf(value) === index)
      .sort();
  }

  public getNextManuscript(categoryName: string = this.currentCategory): TManuscript {
    if (!categoryName) {
      throw new Error(`Require categoryName to load next manuscript`)
    }
    const answeredManuscripts = this.getIdOfAnsweredManuscripts();
    const availableManuscripts = this.manuscripts
      .filter(manuscript => manuscript.hdo_category === categoryName)
      .filter(manuscript => answeredManuscripts.indexOf(manuscript.pk) === -1);
    if (availableManuscripts.length === 0) {
      return this.getCategoryManuscript();
    }
    const randomManuscript = RandomService.getRandomFromList(availableManuscripts);
    return randomManuscript;
  }

  public getStartManuscript(): TManuscript {
    return this.manuscripts.find(manuscript => manuscript.default === 'default');
  }

  public get answersCount() {
    return this.answers.length;
  }

  public get manuscript(): TManuscript {
    return this.manuscripts.find(manuscript => manuscript.pk === this.currentManuscriptId);
  }

  public hasMoreQuestionsInCategory(): boolean {
    const answeredManuscripts = this.getIdOfAnsweredManuscripts();
    return this.manuscripts
      .filter(manuscript => manuscript.hdo_category === this.currentCategory)
      .filter(manuscript => answeredManuscripts.indexOf(manuscript.pk) === -1)
      .length > 0;
  }

  public hasStartedAnswering(): boolean {
    return this.answersCount > 0;
  }

  public save() {
    let voterGuideData: VoterGuideData = {
      answers: this.answers,
      categories: this.categories,
      completedManuscripts: this.completedManuscripts,
      manuscripts: this.manuscripts
    };
    this.localStorage.set(voterGuideData);
  }
}