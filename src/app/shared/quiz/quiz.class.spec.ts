import { Quiz, QuizState } from './quiz.class';
import { mockQuestion } from '../question/question.mock';

describe('Quiz, class (shared)', () => {
  let quiz;

  beforeEach(() => quiz = new Quiz(1, 'test'));

  it('exposes property id', () => expect(quiz.id).toBe(1));
  it('exposes property name', () => expect(quiz.name).toEqual('test'));
  it('exposes property answers', () => expect(quiz.answers).toEqual([]));
  it('exposes property current', () => expect(quiz.current).toBeNull());
  it('exposes property index', () => expect(quiz.index).toBeUndefined());
  it('exposes property questions', () => expect(quiz.questions).toEqual([]));
  it('exposes property state', () => expect(quiz.state).toBe(QuizState.NotStarted));

  describe('addQuestion', () => {
    it('throws error if quiz is started', () => {
      quiz.start([]);

      expect(() => quiz.addQuestion(mockQuestion())).toThrow();
    });

    it('throws error if quiz is ended', () => {
      quiz.addQuestion(mockQuestion());
      quiz.start([true]);

      expect(() => quiz.addQuestion(mockQuestion())).toThrow();
    });

    it('adds questions to quiz', () => {
      expect(quiz.questions.length).toBe(0);

      quiz.addQuestion(mockQuestion());

      expect(quiz.questions.length).toBe(1);

      quiz.addQuestion(mockQuestion());

      expect(quiz.questions.length).toBe(2);
    });
  });

  describe('getNumberOfCorrectResponses', () => {
    it('returns the number of correct responses', () => {
      expect(quiz.getNumberOfCorrectResponses()).toBe(0);

      quiz.addQuestion(mockQuestion());
      quiz.addQuestion(mockQuestion());
      quiz.start([]);

      expect(quiz.getNumberOfCorrectResponses()).toBe(0);

      quiz.setResponse(false);

      expect(quiz.getNumberOfCorrectResponses()).toBe(0);

      quiz.setResponse(true);

      expect(quiz.getNumberOfCorrectResponses()).toBe(1);
    });
  });

  describe('getNumberOfQuestions', () => {
    it('returns the number of questions', () => expect(quiz.getNumberOfQuestions()).toBe(quiz.questions.length));
  });

  describe('getNumberOfResponses', () => {
    it('returns the number of responses that has been given', () => {
      expect(quiz.getNumberOfResponses()).toBe(0);

      quiz.addQuestion(mockQuestion());
      quiz.addQuestion(mockQuestion());
      quiz.start([true]);

      expect(quiz.getNumberOfResponses()).toBe(1);

      quiz.setResponse(true);

      expect(quiz.getNumberOfResponses()).toBe(2);
    });
  });

  describe('getResponsesAsString', () => {
    it('returns responses given as string', () => {
      expect(quiz.getResponsesAsString()).toEqual('');

      quiz.addQuestion(mockQuestion());
      quiz.addQuestion(mockQuestion());
      quiz.start([true]);

      expect(quiz.getResponsesAsString()).toEqual('1');

      quiz.setResponse(false);

      expect(quiz.getResponsesAsString()).toEqual('10');
    });
  });

  describe('setResponse', () => {
    it('throws error if quiz is not started', () => expect(() => quiz.setResponse(true)).toThrow());
    it('throws error if quiz is ended', () => {
      quiz.addQuestion(mockQuestion());
      quiz.start([true]);

      expect(() => quiz.setResponse(true)).toThrow();
    });

    it('returns whether or not answer was correct', () => {
      quiz.addQuestion(mockQuestion());
      quiz.addQuestion(mockQuestion());
      quiz.addQuestion(mockQuestion({ kept: false }));
      quiz.start([]);

      expect(quiz.setResponse(true)).toBe(true);
      expect(quiz.setResponse(false)).toBe(false);
      expect(quiz.setResponse(false)).toBe(true);
    });

    it('ends quiz when all questions are answered', () => {
      quiz.addQuestion(mockQuestion());
      quiz.start([]);
      quiz.setResponse(true);

      expect(quiz.state).toBe(QuizState.Complete);
    });
  });

  describe('start', () => {
    it('alters state', () => {
      quiz.addQuestion(mockQuestion());
      quiz.start([]);

      expect(quiz.state).toBe(QuizState.InProgress);
    });

    it('can set responses at once', () => {
      quiz.addQuestion(mockQuestion());
      quiz.start([true]);

      expect(quiz.answers.length).toBe(1);
    });
  });
});
