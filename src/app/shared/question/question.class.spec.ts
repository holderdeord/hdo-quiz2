import { Question } from './question.class';

describe('Question, class (shared)', () => {
  let question;

  beforeEach(() => question = new Question('name', true));

  it('sets property text', () => expect(question.text).toEqual('name'));
  it('sets property answer', () => expect(question.answer).toBe(true));
});
