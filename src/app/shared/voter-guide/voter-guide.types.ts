import { TManuscript, TManuscriptVoterGuideAlternative } from "../manuscript/manuscript.types";
import { THdoCategory } from "../hdo-category/hdo-category.types";

export type VoterGuideData = {
  answers: TManuscriptVoterGuideAlternative[]
  categories: THdoCategory[],
  completedManuscripts: TManuscript[],
  manuscripts: TManuscript[]
};