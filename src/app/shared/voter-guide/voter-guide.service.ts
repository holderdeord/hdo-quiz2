import { Injectable } from "@angular/core";
import { TManuscript, TManuscriptVoterGuideAlternative } from "../manuscript/manuscript.types";

@Injectable()
export class VoterGuideService {
  private manuscripts: TManuscript[] = [];
  private answers: TManuscriptVoterGuideAlternative[] = [];

  public addAnswer(answer: TManuscriptVoterGuideAlternative, manuscript: TManuscript) {
    this.answers.push(answer);
    this.manuscripts.push(manuscript);
  }

  public getIdOfAnsweredManuscripts() {
    return this.manuscripts.map(manuscript => manuscript.pk);
  }

  public hasStartedAnswering(): boolean {
    return this.answers.length > 0;
  }
}