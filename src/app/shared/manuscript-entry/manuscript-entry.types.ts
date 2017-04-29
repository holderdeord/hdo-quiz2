import { Enum } from '../enum';

const ManuscriptEntryType = Enum.strEnum([
  'button',
  'electoralGuide',
  'promises',
  'random',
  'text'
]);

type ManuscriptEntryType = keyof typeof ManuscriptEntryType;
export {ManuscriptEntryType};
