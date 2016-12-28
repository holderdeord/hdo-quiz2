// import { addProviders, fakeAsync, inject } from '@angular/core/testing';
// import { MockBackend, MockConnection } from '@angular/http/testing';
// import { mockStackData } from './stack.mock';
// import { mockQuestion } from '../question/question.mock';

// import { Question } from '../question';
// import { Quiz, QuizService, QuizState } from './';
// import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';

// describe('Quiz (shared)', () => {
//   beforeEach(() => addProviders([
//     BaseRequestOptions,
//     MockBackend,
//     {
//       provide: Http,
//       useFactory: function (backend, defaultOptions) {
//         return new Http(backend, defaultOptions);
//       },
//       deps: [MockBackend, BaseRequestOptions]
//     },
//     QuizService
//   ]));

//   describe('Class', () => {
//     let stack;

//     beforeEach(() => {
//       stack = new Quiz(1, 'test');
//     });

//     it('exposes properties', () => {
//       expect(stack.id).toBe(1);
//       expect(stack.name).toEqual('test');
//       expect(stack.questions.length).toBe(0);
//       expect(stack.answers.length).toBe(0);
//       expect(stack.current).toBeNull();
//       expect(stack.state).toBe(QuizState.NotStarted);
//     });

//     it('exposes addQuestion', () => {
//       stack.addQuestion(mockQuestion());
//       expect(stack.questions.length).toBe(1);
//       expect(stack.answers.length).toBe(1);

//       stack.startQuiz([]);

//       expect(() => stack.addQuestion(mockQuestion())).toThrow();
//     });

//     it('exposes getNumberOfCorrectResponses', () => {
//       expect(stack.getNumberOfCorrectResponses()).toBe(0);

//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());
//       stack.startQuiz([]);

//       expect(stack.getNumberOfCorrectResponses()).toBe(0);

//       stack.setResponse(true);

//       expect(stack.getNumberOfCorrectResponses()).toBe(1);

//       stack.setResponse(false);
//       stack.setResponse(true);

//       expect(stack.getNumberOfCorrectResponses()).toBe(2);
//     });

//     it('exposes getNumberOfQuestions', () => {
//       expect(stack.getNumberOfQuestions()).toBe(0);

//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());

//       expect(stack.getNumberOfQuestions()).toBe(2);

//       stack.addQuestion(mockQuestion());

//       expect(stack.getNumberOfQuestions()).toBe(3);
//     });

//     it('exposes getNumberOfResponses', () => {
//       expect(stack.getNumberOfResponses()).toBe(0);

//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());
//       stack.startQuiz([]);
//       stack.setResponse(false);

//       expect(stack.getNumberOfResponses()).toBe(1);

//       stack.setResponse(true);

//       expect(stack.getNumberOfResponses()).toBe(2);
//     });

//     it('exposes getResponses', () => {
//       expect(stack.getResponses()).toEqual([]);

//       stack.addQuestion(mockQuestion());
//       stack.startQuiz([]);
//       stack.setResponse(true);

//       expect(stack.getResponses()).toEqual([true]);
//     });

//     it('exposes getResponsesAsString', () => {
//       expect(stack.getResponsesAsString()).toEqual('');

//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());
//       stack.startQuiz([true]);

//       expect(stack.getResponsesAsString()).toEqual('1');
//     });

//     it('exposes setResponse', () => {
//       expect(() => stack.setResponse(true)).toThrow();

//       stack.addQuestion(mockQuestion());
//       stack.addQuestion(mockQuestion());
//       stack.startQuiz([]);

//       expect(stack.setResponse(true)).toBe(true);
//       expect(stack.setResponse(false)).toBe(false);
//       expect(stack.state).toBe(QuizState.Complete);
//     });

//     describe('startQuiz', () => {
//       it('needs to have questions before it can start', () => {
//         expect(() => stack.startQuiz([true, true])).toThrow();
//       });

//       it('can be started at the beginning', () => {
//         stack.addQuestion(mockQuestion());
//         expect(stack.startQuiz([])).toBe(stack);

//         expect(stack.current).toBe(stack.questions[0]);
//         expect(stack.state).toBe(QuizState.InProgress);
//       });

//       it('can be started with a given preset of responses', () => {
//         stack.addQuestion(mockQuestion());
//         stack.addQuestion(mockQuestion());

//         stack.startQuiz([true]);

//         expect(stack.current).toBe(stack.questions[1]);
//         expect(stack.state).toBe(QuizState.InProgress);
//         expect(stack.index).toBe(1);
//       });

//       it('can be completed by giving all responses', () => {
//         stack.addQuestion(mockQuestion());
//         stack.addQuestion(mockQuestion());

//         stack.startQuiz([true, true]);

//         expect(stack.current).toBeNull();
//         expect(stack.state).toBe(QuizState.Complete);
//         expect(stack.index).toBe(2);
//       });
//     });
//   });

//   describe('Service', () => {
//     describe('getStacks', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStacks();
//       })));

//       it('transforms response to stacks', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ body: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new Response(response));
//         });

//         service.getStacks().subscribe(stacks => {
//           expect(stacks.length).toBe(1);
//           expect(stacks[0].id).toBe(1);
//           expect(stacks[0].name).toEqual('Parti');
//           expect(stacks[0].questions.length).toBe(2);
//         });
//       })));
//     });

//     describe('getStack', () => {
//       it('should get stacks from the server', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         // does not support fetching just one atm
//         backend.connections.subscribe((connection: MockConnection) => {
//           expect(connection.request.method).toBe(RequestMethod.Get);
//           expect(connection.request.url).toEqual('/assets/stacks.json');
//         });

//         service.getStack(1);
//       })));

//       it('transforms response to a stack', inject(
//         [MockBackend, QuizService],
//         fakeAsync((backend: MockBackend, service: QuizService) => {
//         backend.connections.subscribe((connection: MockConnection) => {
//           let response = new ResponseOptions({ body: JSON.stringify(mockStackData()) });
//           connection.mockRespond(new Response(response));
//         });

//         service.getStack(1).subscribe(stack => {
//           expect(stack.id).toBe(1);
//           expect(stack.name).toEqual('Parti');
//           expect(stack.questions.length).toBe(2);
//         });
//       })));
//     });
//   });
// });
