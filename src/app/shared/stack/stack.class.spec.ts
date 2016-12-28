import { Stack, StackState } from './stack.class';
import { mockPromise } from '../promise/promise.mock';

describe('Stack, class (shared)', () => {
  let stack;

  beforeEach(() => stack = new Stack(1, 'test'));

  it('sets property id', () => expect(stack.id).toBe(1));
  it('sets property name', () => expect(stack.name).toEqual('test'));
  it('exposes answers', () => expect(stack.answers).toEqual([]));
  it('exposes current', () => expect(stack.current).toBeNull());
  it('exposes index', () => expect(stack.index).toBeUndefined());
  it('exposes promises', () => expect(stack.promises).toEqual([]));
  it('exposes state', () => expect(stack.state).toBe(StackState.NotStarted));

  describe('addPromise', () => {
    it('throws error if quiz is started', () => {
      stack.startQuiz([]);

      expect(() => stack.addPromise(mockPromise())).toThrow()
    });

    it('throws error if quiz is ended', () => {
      stack.addPromise(mockPromise());
      stack.startQuiz([]);
      stack.setResponse(true);

      expect(() => stack.addPromise(mockPromise())).toThrow();
    });

    it('adds promises to stack', () => {
      expect(stack.promises.length).toBe(0);

      stack.addPromise(mockPromise());

      expect(stack.promises.length).toBe(1);

      stack.addPromise(mockPromise());

      expect(stack.promises.length).toBe(2);
    });
  });

  describe('setResponse', () => {
    it('throws error if quiz is not started', () => expect(() => stack.setResponse(true)).toThrow());
    it('throws error if quiz is ended', () => {
      stack.addPromise(mockPromise());
      stack.startQuiz([]);
      stack.setResponse(true);

      expect(() => stack.setResponse(true)).toThrow();
    });

    it('returns whether or not answer was correct', () => {
      stack.addPromise(mockPromise());
      stack.addPromise(mockPromise());
      stack.startQuiz([]);

      expect(stack.setResponse(true)).toBe(true);
    });
  });
});