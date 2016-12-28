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
      stack.start([]);

      expect(() => stack.addQuestion(mockQuestion())).toThrow();
    });

    it('throws error if quiz is ended', () => {
      stack.addQuestion(mockQuestion());
      stack.start([]);
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

  describe('getNumberOfCorrectResponses', () => {
    it('returns the number of correct responses', () => {
      expect(stack.getNumberOfCorrectResponses()).toBe(0);

      stack.addQuestion(mockQuestion());
      stack.addQuestion(mockQuestion());
      stack.start([]);

      expect(stack.getNumberOfCorrectResponses()).toBe(0);

      stack.setResponse(false);

      expect(stack.getNumberOfCorrectResponses()).toBe(0);

      stack.setResponse(true);

      expect(stack.getNumberOfCorrectResponses()).toBe(1);
    });
  });

  describe('getNumberOfQuestions', () => {
    it('returns the number of questions', () => expect(stack.getNumberOfQuestions()).toBe(stack.questions.length));
  });

  describe('getResponsesAsString', () => {
    it('returns responses given as string', () => {
      expect(stack.getResponsesAsString()).toEqual('');

      stack.addQuestion(mockQuestion());
      stack.addQuestion(mockQuestion());
      stack.start([]);
      stack.setResponse(true);

      expect(stack.getResponsesAsString()).toEqual('1');

      stack.setResponse(false);

      expect(stack.getResponsesAsString()).toEqual('10');
    });
  });

  describe('setResponse', () => {
    it('throws error if quiz is not started', () => expect(() => stack.setResponse(true)).toThrow());
    it('throws error if quiz is ended', () => {
      stack.addQuestion(mockQuestion());
      stack.start([]);
      stack.setResponse(true);

      expect(() => stack.setResponse(true)).toThrow();
    });

    it('returns whether or not answer was correct', () => {
      stack.addQuestion(mockQuestion());
      stack.addQuestion(mockQuestion());
      stack.start([]);

      expect(stack.setResponse(true)).toBe(true);
    });

    it('ends quiz when all questions are answered', () => {
      stack.addQuestion(mockQuestion());
      stack.start([]);
      stack.setResponse(true);

      expect(stack.state).toBe(QuizState.Complete);
    });
  });

  describe('start', () => {
    it('alters state', () => {
      stack.addQuestion(mockQuestion());
      stack.start([]);

      expect(stack.state).toBe(QuizState.InProgress);
    });

    it('can set responses at once', () => {
      stack.addQuestion(mockQuestion());
      stack.start([true]);

      expect(stack.answers.length).toBe(1);
    });
  });
});
