import { TestBed } from '@angular/core/testing';
import { QuizService } from './';
import { mockManuscriptData, mockStackData } from './quiz.mock';
import { configureTestBedWithHttp, mockResponse } from '../../../../testing';

describe('Quiz, service (shared)', () => {
  let testBed: TestBed;
  let quizService: QuizService;

  beforeEach(() => {
    testBed = configureTestBedWithHttp([QuizService]);
    quizService = testBed.get(QuizService);
  });

  describe('getManuscript', () => {
    beforeEach(() => mockResponse(testBed, mockManuscriptData('introduction')));

    xit('returns a manuscript', () => quizService.getManuscript('introduction').subscribe(manuscript => {
      expect(manuscript.introduction).toBeDefined();
      expect(manuscript.promises).toBeDefined();
    }));
  });

  describe('getStacks', () => {
    beforeEach(() => mockResponse(testBed, mockStackData()));

    it('returns a list of stacks', () => quizService.getStacks().subscribe(stacks => {
      expect(stacks.length).toBe(1);
      expect(stacks[0].id).toBe(1);
      expect(stacks[0].name).toEqual('Parti');
      expect(stacks[0].questions.length).toBe(2);
    }));
  });

  describe('getStack', () => {
    beforeEach(() => mockResponse(testBed, mockStackData()));

    it('returns a specific stack if it exists', () => quizService.getStack(1).subscribe(stack => expect(stack).toBeDefined()));
    it('returns null if it does not exist', () => quizService.getStack(666).subscribe(stack => expect(stack).toBeNull()));
  });
});
