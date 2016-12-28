import { TestBed } from '@angular/core/testing';
import { QuizService } from './';
import { mockStackData } from './quiz.mock';
import { configureTestBed, mockResponse } from '../http/http.mock';

describe('Quiz, service (shared)', () => {
  let testBed: TestBed;
  let quizService: QuizService;

  beforeEach(() => {
    testBed = configureTestBed([QuizService]);
    quizService = testBed.get(QuizService);
  });

  describe('getStacks', () => {
    beforeEach(() => mockResponse(testBed, mockStackData()));

    it('returns a list of stacks', () => quizService.getStacks().subscribe(stacks => {
      expect(stacks.length).toBe(1);
      expect(stacks[ 0 ].id).toBe(1);
      expect(stacks[ 0 ].name).toEqual('Parti');
      expect(stacks[ 0 ].questions.length).toBe(2);
    }));
  });
});
