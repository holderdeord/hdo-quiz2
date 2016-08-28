import { Answer } from './';
import { mockPromise } from '../promise/promise.mock';

describe('Answer (shared)', () => {
  describe('Class', () => {
    let promise;
    let answer;

    beforeEach(() => {
      promise = mockPromise();
      answer = new Answer(promise);
    });

    it('exposes hadCorrectResponse', () => {
      expect(answer.hadCorrectResponse).toThrow();
      answer.setResponse(true);
      expect(answer.hadCorrectResponse()).toBe(true);
      answer.setResponse(false);
      expect(answer.hadCorrectResponse()).toBe(false);
    });

    it('exposes setResponse', () => {
      expect(answer.setResponse(true)).toBe(true);
      expect(answer.setResponse(false)).toBe(false);

      promise.kept = false;
      expect(answer.setResponse(true)).toBe(false);
      expect(answer.setResponse(false)).toBe(true);
    });
  });
});
