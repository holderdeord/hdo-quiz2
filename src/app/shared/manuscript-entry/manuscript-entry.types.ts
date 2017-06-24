import { Enum } from '../enum';

const ManuscriptEntryType = Enum.strEnum([
  'button',
  'electoralGuide',
  'promises',
  'quick_reply',
  'random',
  'text'
]);

type ManuscriptEntryType = keyof typeof ManuscriptEntryType;
export {ManuscriptEntryType};
