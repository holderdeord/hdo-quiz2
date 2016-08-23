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

    it('exposes giveAnswer', () => {
      expect(answer.giveAnswer(true)).toBe(true);
      expect(answer.giveAnswer(false)).toBe(false);

      promise.kept = false;
      expect(answer.giveAnswer(true)).toBe(false);
      expect(answer.giveAnswer(false)).toBe(true);
    });

    it('exposes hadCorrectAnswer', () => {
      expect(answer.hadCorrectAnswer).toThrow();
      answer.giveAnswer(true);
      expect(answer.hadCorrectAnswer()).toBe(true);
      answer.giveAnswer(false);
      expect(answer.hadCorrectAnswer()).toBe(false);
    });
  });
});