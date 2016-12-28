import { Answer } from './';
import { mockPromise } from '../promise/promise.mock';

describe('Answer, class (shared)', () => {
  let promise;
  let answer;

  beforeEach(() => {
    promise = mockPromise();
    answer = new Answer(promise);
  });

  describe('hadCorrectResponse', () => {
    it('throws when nothings is set', () => expect(answer.hadCorrectResponse).toThrow());
    it('returns last set value', () => {
      answer.setResponse(true);
      expect(answer.hadCorrectResponse()).toBe(true);
      answer.setResponse(false);
      expect(answer.hadCorrectResponse()).toBe(false);
    });
  });

  describe('setResponse', () => {
    it('returns whether or not the response was correct or not', () => {
      expect(answer.setResponse(true)).toBe(true);
      expect(answer.setResponse(false)).toBe(false);

      promise.kept = false;
      expect(answer.setResponse(true)).toBe(false);
      expect(answer.setResponse(false)).toBe(true);
    });
  });
});
