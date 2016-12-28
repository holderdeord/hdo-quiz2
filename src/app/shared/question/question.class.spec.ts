import { Question } from './question.class';

describe('Question, class (shared)', () => {
  let question;

  beforeEach(() => question = new Question('name', true));

  it('sets property body', () => expect(question.body).toEqual('name'));
  it('sets property kept', () => expect(question.kept).toBe(true));
});
