import { Quiz, QuizState } from './quiz.class';
import { mockQuestion } from '../question/question.mock';

describe('Quiz, class (shared)', () => {
  let stack;

  beforeEach(() => stack = new Quiz(1, 'test'));

  it('sets property id', () => expect(stack.id).toBe(1));
  it('sets property name', () => expect(stack.name).toEqual('test'));
  it('exposes answers', () => expect(stack.answers).toEqual([]));
  it('exposes current', () => expect(stack.current).toBeNull());
  it('exposes index', () => expect(stack.index).toBeUndefined());
  it('exposes questions', () => expect(stack.questions).toEqual([]));
  it('exposes state', () => expect(stack.state).toBe(QuizState.NotStarted));

  describe('addQuestion', () => {
    it('throws error if quiz is started', () => {
      stack.startQuiz([]);

      expect(() => stack.addQuestion(mockQuestion())).toThrow();
    });

    it('throws error if quiz is ended', () => {
      stack.addQuestion(mockQuestion());
      stack.startQuiz([]);
      stack.setResponse(true);

      expect(() => stack.addQuestion(mockQuestion())).toThrow();
    });

    it('adds questions to quiz', () => {
      expect(stack.questions.length).toBe(0);

      stack.addQuestion(mockQuestion());

      expect(stack.questions.length).toBe(1);

      stack.addQuestion(mockQuestion());

      expect(stack.questions.length).toBe(2);
    });
  });

  describe('setResponse', () => {
    it('throws error if quiz is not started', () => expect(() => stack.setResponse(true)).toThrow());
    it('throws error if quiz is ended', () => {
      stack.addQuestion(mockQuestion());
      stack.startQuiz([]);
      stack.setResponse(true);

      expect(() => stack.setResponse(true)).toThrow();
    });

    it('returns whether or not answer was correct', () => {
      stack.addQuestion(mockQuestion());
      stack.addQuestion(mockQuestion());
      stack.startQuiz([]);

      expect(stack.setResponse(true)).toBe(true);
    });
  });
});
