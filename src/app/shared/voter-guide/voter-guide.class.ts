import { TManuscript, TManuscriptVoterGuideAlternative } from "../manuscript/manuscript.types";
import { THdoCategory } from "../hdo-category/hdo-category.types";
import { ChatResponse } from "../chat/chat-response/chat-response.class";
import { Alternative } from "../alternative/alternative.class";
import { RandomService } from "../random/random.service";
import { LocalStorage } from "../local-storage/local-storage.class";

export class VoterGuide {
  private currentManuscript: TManuscript;
  private currentCategory: string;

  constructor(private localStorage: LocalStorage,
              private manuscriptId: number,
              private manuscripts: TManuscript[],
              private categories: THdoCategory[],
              private answers: TManuscriptVoterGuideAlternative[] = [],
              private completedManuscripts: TManuscript[] = []) {
    this.currentManuscript = manuscripts.find(manuscript => manuscript.pk === manuscriptId);
    this.currentCategory = (this.currentManuscript.hdo_category || '').toString();
  }

  public addAnswer(answer: TManuscriptVoterGuideAlternative, manuscript: TManuscript) {
    this.answers.push(answer);
    this.completedManuscripts.push(manuscript);
    this.save();
  }

  public getIdOfAnsweredManuscripts() {
    return this.completedManuscripts.map(manuscript => manuscript.pk);
  }

  public getChatResponseForNextManuscript(categoryName: string = this.currentCategory): ChatResponse<any> {
    const manuscripts = this.manuscripts.filter(manuscript => manuscript.hdo_category === categoryName);
    const nextManuscript = this.getNextManuscript(manuscripts);
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

  public getNextManuscript(manuscripts: TManuscript[] = this.manuscripts): TManuscript {
    const answeredManuscripts = this.getIdOfAnsweredManuscripts();
    const availableManuscripts = manuscripts.filter(manuscript => answeredManuscripts.indexOf(manuscript.pk) === -1);
    if (availableManuscripts.length === 0) {
      return this.getCategoryManuscript();
    }
    const randomManuscript = RandomService.getRandomFromList(availableManuscripts);
    return randomManuscript;
  }

  public get answersCount() {
    return this.answers.length;
  }

  public get manuscript(): TManuscript {
    return this.manuscripts.find(manuscript => manuscript.pk === this.manuscriptId);
  }

  public hasStartedAnswering(): boolean {
    return this.answers.length > 0;
  }

  private save() {
    this.localStorage.set({
      answers: [...this.answers],
      categories: [...this.categories],
      completedManuscripts: [...this.completedManuscripts],
      manuscripts: [...this.manuscripts]
    });
  }
}